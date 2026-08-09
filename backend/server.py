from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

import logging
import os
import re
import uuid
from datetime import datetime, timedelta, timezone
from typing import List, Optional

import bcrypt
import jwt
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Request, Response
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field
from starlette.middleware.cors import CORSMiddleware

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI()
api_router = APIRouter(prefix="/api")

JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_MINUTES = 720
LOCKOUT_MINUTES = 15
MAX_FAILED_ATTEMPTS = 5

logger = logging.getLogger(__name__)


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "type": "access",
        "exp": datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_MINUTES),
    }
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm=JWT_ALGORITHM)


class LoginInput(BaseModel):
    email: str
    password: str


class EnquiryCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    company: Optional[str] = ""
    service: Optional[str] = "General enquiry"
    message: str = Field(min_length=1, max_length=4000)


class PostCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    excerpt: Optional[str] = ""
    content: str = Field(min_length=1)
    cover: Optional[str] = ""
    author: Optional[str] = "Duodecimal Team"
    tags: Optional[List[str]] = []


class HappeningCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    excerpt: Optional[str] = ""
    link: Optional[str] = ""


class StoryCreate(BaseModel):
    client: str = Field(min_length=1, max_length=120)
    industry: Optional[str] = ""
    title: str = Field(min_length=1, max_length=200)
    excerpt: Optional[str] = ""
    challenge: Optional[str] = ""
    solution: Optional[str] = ""
    results: Optional[List[str]] = []
    quote: Optional[str] = ""
    quote_author: Optional[str] = ""
    quote_role: Optional[str] = ""
    metric: Optional[str] = ""
    metric_label: Optional[str] = ""
    cover: Optional[str] = ""


def slugify(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-") or "post"


security = HTTPBearer(auto_error=False)


async def get_current_admin(
    request: Request, creds: HTTPAuthorizationCredentials = Depends(security)
):
    token = request.cookies.get("access_token")
    if not token and creds:
        token = creds.credentials
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(
            token, os.environ["JWT_SECRET"], algorithms=[JWT_ALGORITHM]
        )
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    if payload.get("type") != "access":
        raise HTTPException(status_code=401, detail="Invalid token type")
    user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
    if not user or user.get("role") != "admin":
        raise HTTPException(status_code=401, detail="User not found")
    return user


@api_router.get("/")
async def root():
    return {"message": "Duodecimal API"}


@api_router.post("/auth/login")
async def login(input: LoginInput, request: Request, response: Response):
    email = input.email.strip().lower()
    identifier = f"{request.client.host}:{email}"
    attempts = await db.login_attempts.find_one({"identifier": identifier})
    if attempts and attempts.get("count", 0) >= MAX_FAILED_ATTEMPTS:
        locked_until = attempts.get("locked_until")
        if locked_until and datetime.fromisoformat(locked_until) > datetime.now(
            timezone.utc
        ):
            raise HTTPException(
                status_code=429, detail="Too many failed attempts. Try again later."
            )
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(input.password, user["password_hash"]):
        await db.login_attempts.update_one(
            {"identifier": identifier},
            {
                "$inc": {"count": 1},
                "$set": {
                    "locked_until": (
                        datetime.now(timezone.utc) + timedelta(minutes=LOCKOUT_MINUTES)
                    ).isoformat()
                },
            },
            upsert=True,
        )
        raise HTTPException(status_code=401, detail="Invalid email or password")
    await db.login_attempts.delete_one({"identifier": identifier})
    token = create_access_token(user["id"], email)
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=ACCESS_TOKEN_MINUTES * 60,
        path="/",
    )
    return {
        "token": token,
        "user": {
            "id": user["id"],
            "email": email,
            "name": user.get("name", "Admin"),
            "role": user.get("role", "admin"),
        },
    }


@api_router.get("/auth/me")
async def me(admin=Depends(get_current_admin)):
    return admin


@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    return {"message": "Logged out"}


@api_router.post("/enquiries", status_code=201)
async def create_enquiry(input: EnquiryCreate):
    doc = {
        "id": str(uuid.uuid4()),
        "name": input.name.strip(),
        "email": input.email.strip().lower(),
        "company": (input.company or "").strip(),
        "service": input.service or "General enquiry",
        "message": input.message.strip(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.enquiries.insert_one(doc)
    return {"id": doc["id"], "message": "Enquiry received"}


@api_router.get("/enquiries")
async def list_enquiries(admin=Depends(get_current_admin)):
    return await db.enquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)


@api_router.get("/posts")
async def list_posts():
    return await db.posts.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)


@api_router.get("/posts/{slug}")
async def get_post(slug: str):
    post = await db.posts.find_one({"slug": slug}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@api_router.post("/posts", status_code=201)
async def create_post(input: PostCreate, admin=Depends(get_current_admin)):
    base = slugify(input.title)
    slug = base
    i = 2
    while await db.posts.find_one({"slug": slug}):
        slug = f"{base}-{i}"
        i += 1
    doc = {
        "id": str(uuid.uuid4()),
        "slug": slug,
        "title": input.title.strip(),
        "excerpt": (input.excerpt or "").strip(),
        "content": input.content.strip(),
        "cover": (input.cover or "").strip(),
        "author": (input.author or "Duodecimal Team").strip(),
        "tags": input.tags or [],
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.posts.insert_one(doc)
    return {"id": doc["id"], "slug": slug}


@api_router.delete("/posts/{post_id}")
async def delete_post(post_id: str, admin=Depends(get_current_admin)):
    await db.posts.delete_one({"id": post_id})
    return {"message": "Deleted"}


@api_router.get("/happenings")
async def list_happenings():
    return await db.happenings.find({}, {"_id": 0}).sort("created_at", -1).to_list(50)


@api_router.post("/happenings", status_code=201)
async def create_happening(input: HappeningCreate, admin=Depends(get_current_admin)):
    doc = {
        "id": str(uuid.uuid4()),
        "title": input.title.strip(),
        "excerpt": (input.excerpt or "").strip(),
        "link": (input.link or "").strip(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.happenings.insert_one(doc)
    return {"id": doc["id"]}


@api_router.delete("/happenings/{happening_id}")
async def delete_happening(happening_id: str, admin=Depends(get_current_admin)):
    await db.happenings.delete_one({"id": happening_id})
    return {"message": "Deleted"}


@api_router.get("/stories")
async def list_stories():
    return await db.stories.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)


@api_router.get("/stories/{slug}")
async def get_story(slug: str):
    story = await db.stories.find_one({"slug": slug}, {"_id": 0})
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    return story


@api_router.post("/stories", status_code=201)
async def create_story(input: StoryCreate, admin=Depends(get_current_admin)):
    base = slugify(input.client)
    slug = base
    i = 2
    while await db.stories.find_one({"slug": slug}):
        slug = f"{base}-{i}"
        i += 1
    doc = {
        "id": str(uuid.uuid4()),
        "slug": slug,
        "client": input.client.strip(),
        "industry": (input.industry or "").strip(),
        "title": input.title.strip(),
        "excerpt": (input.excerpt or "").strip(),
        "challenge": (input.challenge or "").strip(),
        "solution": (input.solution or "").strip(),
        "results": input.results or [],
        "quote": (input.quote or "").strip(),
        "quote_author": (input.quote_author or "").strip(),
        "quote_role": (input.quote_role or "").strip(),
        "metric": (input.metric or "").strip(),
        "metric_label": (input.metric_label or "").strip(),
        "cover": (input.cover or "").strip(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.stories.insert_one(doc)
    return {"id": doc["id"], "slug": slug}


@api_router.delete("/stories/{story_id}")
async def delete_story(story_id: str, admin=Depends(get_current_admin)):
    await db.stories.delete_one({"id": story_id})
    return {"message": "Deleted"}


def _sample_stories():
    now = datetime.now(timezone.utc).isoformat()
    return [
        {
            "id": str(uuid.uuid4()),
            "slug": "meridian-bank",
            "client": "Meridian Bank",
            "industry": "Fintech & Banking",
            "title": "Core banking modernization without a minute of downtime",
            "excerpt": "Re-platformed a 20-year-old core banking stack into event-driven microservices while the bank kept serving customers.",
            "challenge": "Meridian's core banking platform had been running for two decades. Every new product launch took quarters, release windows were dreaded, and the board wanted digital-first growth that the legacy stack simply could not support. The catch: the bank serves millions of customers daily, so a big-bang migration was never an option.",
            "solution": "Duodecimal re-platformed the core incrementally using a strangler pattern — building event-driven microservices around the legacy core and migrating capability by capability, account by account. DD Ledger powered the new double-entry core, with automated reconciliation running in parallel against the legacy system for every release.",
            "results": [
                "38% faster release cycles — from quarterly releases to weekly deploys",
                "Zero minutes of customer-facing downtime across the entire migration",
                "New product launch time cut from months to weeks",
                "Full audit trail and reconciliation on every migrated account",
            ],
            "quote": "Duodecimal rebuilt our core platform while the plane was in the air. Not one minute of downtime, not one missed milestone in eighteen months.",
            "quote_author": "Elena Marsh",
            "quote_role": "CTO, Meridian Bank",
            "metric": "38%",
            "metric_label": "faster release cycles",
            "cover": "https://images.pexels.com/photos/21418687/pexels-photo-21418687.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "created_at": now,
        },
        {
            "id": str(uuid.uuid4()),
            "slug": "northwind-health",
            "client": "Northwind Health",
            "industry": "Healthcare & Life Sciences",
            "title": "One patient platform for 140 clinics",
            "excerpt": "Designed and built a unified patient platform spanning 140 clinics — appointments, records and telehealth in one experience.",
            "challenge": "Northwind's 140 clinics each ran their own scheduling, records and billing systems. Patients repeated their history at every visit, staff juggled five logins a day, and leadership had no unified view of care quality or capacity across the network.",
            "solution": "Duodecimal built DD Care as the network's single patient platform — one experience for appointments, records, reminders and telehealth — with DD Bridge, a FHIR-native interoperability layer, synchronizing data from every clinic's existing systems without ripping them out.",
            "results": [
                "2.4M patients onboarded onto a single platform",
                "140 clinics connected through one FHIR-native data layer",
                "Patient check-in time reduced by half",
                "First unified view of capacity and outcomes across the network",
            ],
            "quote": "The engineering rigor is unmatched. Every deliverable arrived documented, tested and measured against the outcomes we agreed on day one.",
            "quote_author": "Priya Raman",
            "quote_role": "VP Product, Northwind Health",
            "metric": "2.4M",
            "metric_label": "patients onboarded",
            "cover": "https://images.pexels.com/photos/25630348/pexels-photo-25630348.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "created_at": now,
        },
        {
            "id": str(uuid.uuid4()),
            "slug": "atlas-freight",
            "client": "Atlas Freight",
            "industry": "Logistics & Supply Chain",
            "title": "Real-time visibility for 12,000 vehicles across 24 countries",
            "excerpt": "Real-time telemetry for 12,000 vehicles with ML-driven ETA prediction that cut missed delivery windows by half.",
            "challenge": "Atlas Freight operated across 24 countries with no live picture of its fleet. Dispatchers planned on spreadsheets, customers called for updates nobody could give, and missed delivery windows were eroding the contracts that mattered most.",
            "solution": "Duodecimal deployed DD Fleet for real-time telematics across all 12,000 vehicles and DD Route for continuous, constraint-aware route optimization. ML arrival prediction, trained on Atlas's own network history, feeds customers ETAs they can actually trust.",
            "results": [
                "99.99% platform uptime since launch",
                "Missed delivery windows cut by 50%",
                "12,000 vehicles streaming live telemetry across 24 countries",
                "Dispatch planning time reduced from hours to minutes",
            ],
            "quote": "They are the rare partner that tells you what you need to hear, not what you want to hear. Our board now asks for them by name.",
            "quote_author": "David Okafor",
            "quote_role": "CEO, Atlas Freight",
            "metric": "99.99%",
            "metric_label": "platform uptime",
            "cover": "https://images.pexels.com/photos/411011/sun-energy-solar-electricity-411011.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "created_at": now,
        },
    ]


def _sample_posts():
    now = datetime.now(timezone.utc).isoformat()
    return [
        {
            "id": str(uuid.uuid4()),
            "slug": "dont-just-fix-it-anticipate-it",
            "title": "Don't just fix it. Anticipate it.",
            "excerpt": "Reactive maintenance is a tax on every operation. Predictive systems flip the equation — here's how we build them.",
            "content": "Most enterprise systems are built to respond. Something breaks, an alert fires, a team scrambles. It works — until you count the cost of every minute between failure and fix.\n\nAnticipation is a different architecture entirely. Instead of waiting for thresholds to trip, predictive systems read the weak signals — vibration drift, latency creep, error-rate wobble — and raise the flag days or weeks before the failure would ever happen.\n\nThe hard part is not the model. It is the plumbing: getting clean, time-aligned data out of systems that were never designed to share it, and delivering the prediction into the workflow of the person who can act on it. A brilliant model trapped in a dashboard nobody opens is worth nothing.\n\nOur rule of thumb: start with the decision, not the data. Define who acts, on what signal, with how much lead time — then build the smallest pipeline that delivers that signal reliably. Precision beats sophistication every time.",
            "cover": "https://images.pexels.com/photos/25630348/pexels-photo-25630348.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "author": "Duodecimal Team",
            "tags": ["Predictive Systems", "AI"],
            "created_at": now,
        },
        {
            "id": str(uuid.uuid4()),
            "slug": "will-the-mind-meet-the-machine",
            "title": "Will the mind meet the machine?",
            "excerpt": "Enterprise AI is past the demo stage. The real question is how humans and models share the work — and who stays accountable.",
            "content": "Every enterprise we work with has moved past asking whether AI belongs in their stack. The question now is sharper: which decisions stay human, which go to the machine, and how do you design the handoff?\n\nThe failures we see are rarely model failures. They are handoff failures — a recommendation with no context, an automation with no override, a confidence score nobody was trained to read. The technology works; the collaboration does not.\n\nWell-designed AI systems make the division of labour explicit. The machine drafts, the human decides. The machine flags, the human investigates. The machine handles the routine at scale, the human handles the exception with judgment.\n\nGetting this right is a design problem before it is an engineering problem. Sit with the people doing the work. Map where judgment actually lives. Then build the machine around it — not the other way around.",
            "cover": "https://images.pexels.com/photos/21418687/pexels-photo-21418687.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "author": "Duodecimal Team",
            "tags": ["AI", "Enterprise"],
            "created_at": now,
        },
        {
            "id": str(uuid.uuid4()),
            "slug": "batch-vs-stream-data-backbone",
            "title": "Batch vs Stream: choosing your data backbone",
            "excerpt": "Data, like DNA, is replicated, transferred and modified over time. The question is how fast yours needs to move.",
            "content": "Every data platform conversation eventually arrives at the same fork: batch or streaming? The honest answer is that it is not a technology question — it is a latency question. How old can the data be when someone acts on it?\n\nBatch is not legacy; it is discipline. Nightly reconciliations, financial reporting, model training — these workloads reward correctness and completeness over speed, and batch delivers both at a fraction of the cost.\n\nStreaming earns its complexity when minutes matter: fraud scoring, fleet telemetry, live inventory. But streaming everything is a tax you pay forever — in infrastructure, in operational overhead, and in the debugging sessions nobody budgets for.\n\nOur default architecture is deliberately boring: stream the few signals that genuinely need to be live, batch everything else, and keep one clean layer where both meet. Know your data. Unlock your DNA.",
            "cover": "https://images.pexels.com/photos/411011/sun-energy-solar-electricity-411011.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "author": "Duodecimal Team",
            "tags": ["Data Engineering", "Architecture"],
            "created_at": now,
        },
    ]


def _sample_happenings():
    now = datetime.now(timezone.utc).isoformat()
    return [
        {
            "id": str(uuid.uuid4()),
            "title": "Join us at Airport360 2026",
            "excerpt": "India's most comprehensive airport innovation expo — Hall 4, Bombay Exhibition Centre, Mumbai, April 23-24, 2026. Come see our work live.",
            "link": "https://www.linkedin.com/",
            "created_at": now,
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Launching our 'Data is your DNA' practice",
            "excerpt": "A dedicated practice helping enterprises treat data as their genetic code — replicated, transferred and modified into new insights and innovations.",
            "link": "https://www.linkedin.com/",
            "created_at": now,
        },
        {
            "id": str(uuid.uuid4()),
            "title": "We are hiring senior data engineers",
            "excerpt": "Our Bengaluru studio is growing. Come build data platforms and AI systems that enterprises stake their operations on.",
            "link": "https://www.linkedin.com/",
            "created_at": now,
        },
    ]


@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")
    admin_email = os.environ.get("ADMIN_EMAIL")
    admin_password = os.environ.get("ADMIN_PASSWORD")
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        await db.users.insert_one(
            {
                "id": str(uuid.uuid4()),
                "email": admin_email,
                "password_hash": hash_password(admin_password),
                "name": "Duodecimal Admin",
                "role": "admin",
                "created_at": datetime.now(timezone.utc).isoformat(),
            }
        )
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one(
            {"email": admin_email},
            {"$set": {"password_hash": hash_password(admin_password)}},
        )
    if await db.posts.count_documents({}) == 0:
        await db.posts.insert_many(_sample_posts())
    if await db.happenings.count_documents({}) == 0:
        await db.happenings.insert_many(_sample_happenings())
    if await db.stories.count_documents({}) == 0:
        await db.stories.insert_many(_sample_stories())


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

import logging
import os
import uuid
from datetime import datetime, timedelta, timezone
from typing import Optional

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

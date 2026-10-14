export const slugify = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const products = [
  {
    name: "QTap",
    industry: "Education",
    industrySlug: "education",
    tagline: "Tap in. You are present.",
    blurb: "The register, replaced. One tap. Attendance, access and reports update at once.",
    description:
      "The register, replaced. Students tap a card or phone. Attendance, access and reports update at once. No roll call. No delay. No proxy that holds.",
    features: [
      {
        title: "Present in a tap.",
        copy: "NFC card or phone. Instant. Timestamped. Proxy-proof.",
      },
      {
        title: "Access that follows attendance.",
        copy: "Labs, libraries, hostels. The same tap that marks presence opens the door.",
      },
      {
        title: "Every system, updated.",
        copy: "MUOne and existing ERPs receive the record as it happens.",
      },
      {
        title: "Works when the network does not.",
        copy: "Readers keep taking taps. Then they sync.",
      },
      {
        title: "Teaching time, returned.",
        copy: "The first minutes of class belong to the lecture. Not the list.",
      },
    ],
    ctaTitle: "See a campus take attendance in a tap.",
    ctaCopy: "An engineer will show QTap on your campus. Readers. Records. The systems they update.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "QFace",
    industry: "Education",
    industrySlug: "education",
    tagline: "Walk past. You are marked.",
    blurb: "Face-first attendance. Contactless. Fast. Proxy does not pass.",
    description:
      "Face-first attendance and identity. A student walks past a camera and is present. Contactless. Fast. Proxy-proof. Biometric data kept protected.",
    features: [
      {
        title: "Presence without a pause.",
        copy: "Walk past a camera. Marked. No card. No queue at the door.",
      },
      {
        title: "Proxy does not pass.",
        copy: "Liveness detection stops photos, screens and stand-ins.",
      },
      {
        title: "Identity, held with care.",
        copy: "Encrypted templates. Privacy by design. Not a photo library.",
      },
      {
        title: "Cameras you already have.",
        copy: "Works with existing CCTV and entry cameras. No new theatre at the gate.",
      },
      {
        title: "One record, everywhere.",
        copy: "Attendance and access land in MUOne as they happen.",
      },
    ],
    ctaTitle: "See attendance without the register.",
    ctaCopy: "An engineer will show QFace on a live entry. Presence. Identity. The record it writes.",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "MUOne",
    industry: "Education",
    industrySlug: "education",
    tagline: "The university. One system.",
    blurb: "Admissions to alumni. One student. One record.",
    description:
      "The system of record for the whole institution. Admissions to alumni. Academics to fees. Students, faculty, parents and leadership work from the same truth.",
    features: [
      {
        title: "Admissions to alumni. One record.",
        copy: "The student does not live in five tools. They live here.",
      },
      {
        title: "Academics, exams, results.",
        copy: "Grading, transcripts and the calendar in one place. Closed. Current. Trusted.",
      },
      {
        title: "Fees without a second ledger.",
        copy: "Finance, scholarships and collections sit on the same student record.",
      },
      {
        title: "Risk, seen early.",
        copy: "Attendance and engagement flag students in trouble before results do.",
      },
      {
        title: "A portal for every role.",
        copy: "Students, faculty, parents, leadership. Each sees what they need. Nothing more. Nothing less.",
      },
    ],
    ctaTitle: "See the campus on one platform.",
    ctaCopy: "An engineer will map MUOne to how your institution actually runs.",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "MITHR",
    industry: "Aviation",
    industrySlug: "aviation",
    tagline: "Assistance that feels human. Answers that are exact.",
    blurb: "A digital human for the terminal. Speaks like a person. Closes the query on the spot.",
    description:
      "An AI-powered digital human for the terminal. It meets passengers like a skilled agent. Speaks clearly. Knows the airport as it stands. Closes the query on the spot. No counter. No wait. No guesswork.",
    features: [
      {
        title: "Speaks like a person.",
        copy: "Natural conversation in the passenger's language. No menus. No script they have to follow.",
      },
      {
        title: "Knows the airport as it is.",
        copy: "Answers from live flight and terminal data. Right now. Not from the last board update.",
      },
      {
        title: "Closes the query there.",
        copy: "Gate changes, connections, delays, bags. Resolved where the passenger stands.",
      },
      {
        title: "Always on. Never out of depth.",
        copy: "Ready every hour the terminal is open. Accurate when the desk is busy. Present when it is not.",
      },
      {
        title: "People for the work only people can do.",
        copy: "Routine questions leave the queue. Staff keep the moments that still need a human.",
      },
    ],
    ctaTitle: "See MITHR meet a passenger.",
    ctaCopy: "An engineer will show how it answers, assists, and closes queries. In your terminal. With your data.",
    image: "https://images.unsplash.com/photo-1570710891163-6d3b5c969366?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "Airport CDPs",
    industry: "Aviation",
    industrySlug: "aviation",
    tagline: "One timeline. Every team.",
    blurb: "Shared milestones. Shared times. The next move, agreed.",
    description:
      "Airlines, handlers, ATC and the airport on one timeline. Shared milestones. Shared times. The next move is agreed. Not guessed. Not called around.",
    features: [
      {
        title: "A-CDM, as it should run.",
        copy: "Shared milestones. Shared times. Aligned with how the airport is meant to decide.",
      },
      {
        title: "One clock for the turn.",
        copy: "Target off-block and take-off. Every team works to the same time.",
      },
      {
        title: "Every team, the same truth.",
        copy: "Airline, handler, ATC, airport. One picture. Each sees the view they need.",
      },
      {
        title: "Sequence that holds.",
        copy: "Departures sequenced. Slots kept. No chain of calls.",
      },
      {
        title: "Less talk. More movement.",
        copy: "The plan is on the screen. The stand is ready. The aircraft leaves.",
      },
    ],
    ctaTitle: "See every team on one timeline.",
    ctaCopy: "An engineer will show Airport CDPs against your operation. Milestones. Targets. Who acts next.",
    image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "Turnaround Intelligence",
    industry: "Aviation",
    industrySlug: "aviation",
    tagline: "Delay stops before it travels.",
    blurb: "Off-block risk, seen early. Act where it counts.",
    description:
      "Every aircraft turn, read. Off-block risk, seen early. Where delay will spread, shown. Where to act first, clear.",
    features: [
      {
        title: "Off-block, seen ahead.",
        copy: "Each turnaround, modelled. Target times you can plan to. Not hope for.",
      },
      {
        title: "Delay that does not cascade.",
        copy: "A late inbound should not write the rest of the day. We show the spread. Then we cut it off.",
      },
      {
        title: "The turn, live.",
        copy: "Every milestone on the stand. Visible. Timed. Owned.",
      },
      {
        title: "Act here. First.",
        copy: "Alerts come with the next move. Not a dashboard to decode under pressure.",
      },
      {
        title: "The stand, remembered.",
        copy: "History by stand, airline and handler. Pattern. Not anecdote.",
      },
    ],
    ctaTitle: "See a delay stopped before it moves.",
    ctaCopy: "An engineer will run a day of turns. Risk. Spread. Where to act.",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "DD Twin",
    industry: "Manufacturing & IoT",
    industrySlug: "manufacturing-iot",
    tagline: "The plant. Live. In full.",
    blurb: "A live replica of the floor. Change it here first.",
    description:
      "A live replica of your lines and plants. Simulate a change. Run the what-if. Plan capacity against the floor as it is. Not last month's report.",
    features: [
      {
        title: "The floor, mirrored.",
        copy: "A live replica of lines and plants. What you see is what is running.",
      },
      {
        title: "Change it here first.",
        copy: "What-if and scenario planning before a wrench turns on the line.",
      },
      {
        title: "See the plant, not the spreadsheet.",
        copy: "Layout. Flow. Where work is waiting. The floor, as it stands.",
      },
      {
        title: "Wired to the machines.",
        copy: "Sensors and PLCs. The twin moves because the plant moves.",
      },
      {
        title: "Capacity, without the guess.",
        copy: "Bottlenecks and headroom against the real state of the floor.",
      },
    ],
    ctaTitle: "See your plant, live.",
    ctaCopy: "An engineer will show DD Twin against a line like yours. State. Scenarios. The plan it supports.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "DD Sense",
    industry: "Manufacturing & IoT",
    industrySlug: "manufacturing-iot",
    tagline: "Service the machine that needs it.",
    blurb: "The machine, heard. Failure flagged early. Service when it asks.",
    description:
      "Vibration, temperature, load. Failure flagged before the line stops. Maintenance when the machine asks. Not when the calendar does.",
    features: [
      {
        title: "The machine, heard.",
        copy: "Vibration, temperature, load. Signal. Not noise.",
      },
      {
        title: "Failure, flagged early.",
        copy: "The warning arrives while you can still plan the stop. Not after the line is down.",
      },
      {
        title: "Work orders that follow condition.",
        copy: "The right job, raised at the right time. Into the systems you already run.",
      },
      {
        title: "Decisions at the edge.",
        copy: "Processing on site where latency matters. The cloud gets the picture. The line gets the speed.",
      },
      {
        title: "Downtime you can see.",
        copy: "Health. Stops. What they cost. The next action, obvious.",
      },
    ],
    ctaTitle: "See a failure caught before the stop.",
    ctaCopy: "An engineer will show DD Sense on machine signals. What it hears. What it flags. When it asks for service.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1400&auto=format&fit=crop",
  },
];

export const getProduct = (slug) =>
  products.find((p) => slugify(p.name) === slug);

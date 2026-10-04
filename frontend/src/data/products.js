export const slugify = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const IMGS = [
  "https://images.pexels.com/photos/20697911/pexels-photo-20697911.png?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/21418687/pexels-photo-21418687.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/25630348/pexels-photo-25630348.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/411011/sun-energy-solar-electricity-411011.jpeg?auto=compress&cs=tinysrgb&w=1200",
];

export const products = [
  {
    name: "QTap",
    industry: "Education",
    industrySlug: "education",
    tagline: "Attendance at the tap of a card.",
    description:
      "QTap replaces roll calls and registers with tap-based attendance and campus access. Students tap in with a card or phone, and every system — timetables, reports, parent alerts — updates instantly.",
    features: [
      "Instant tap-in attendance with NFC cards or phones",
      "Campus access control for labs, libraries and hostels",
      "Real-time sync with MUOne and existing ERPs",
      "Proxy-proof, timestamped attendance records",
      "Offline-capable readers for large campuses",
    ],
    image: IMGS[3],
  },
  {
    name: "QFace",
    industry: "Education",
    industrySlug: "education",
    tagline: "Contactless attendance, face-first.",
    description:
      "QFace brings face-recognition attendance and identity to the campus — contactless, fast and proxy-proof. Walk past a camera, and you are marked present. Privacy-conscious design keeps biometric data protected.",
    features: [
      "Face-recognition check-in in under a second",
      "Anti-spoofing with liveness detection",
      "Privacy-conscious, encrypted biometric templates",
      "Works with existing CCTV and entry cameras",
      "Syncs attendance and access events to MUOne",
    ],
    image: IMGS[2],
  },
  {
    name: "MUOne",
    industry: "Education",
    industrySlug: "education",
    tagline: "One platform for the entire university.",
    description:
      "MUOne unifies the full institutional lifecycle — admissions, academics, exams, fees and analytics — into a single system of record, with portals for students, faculty, parents and leadership.",
    features: [
      "Admissions to alumni in one system of record",
      "Academics, exams, grading and transcripts",
      "Fees, finance and scholarship management",
      "Analytics with at-risk student early warnings",
      "Dedicated portals for students, faculty and parents",
    ],
    image: IMGS[0],
  },
  {
    name: "MITHR",
    industry: "Aviation",
    industrySlug: "aviation",
    tagline: "The airport's single operational picture.",
    description:
      "MITHR gives airport operators one live view of airside, terminal and landside operations. Every stand, vehicle, queue and milestone on one screen — so the operations centre always works from the truth.",
    features: [
      "Real-time airside, terminal and landside picture",
      "AOCC-grade operational dashboards",
      "Stand, gate and resource management",
      "Disruption and irregular-operations management",
      "KPI and SLA monitoring across stakeholders",
    ],
    image: IMGS[0],
  },
  {
    name: "Airport CDPs",
    industry: "Aviation",
    industrySlug: "aviation",
    tagline: "Everyone on the same timeline.",
    description:
      "Airport CDPs is our collaborative decision-making platform — airlines, ground handlers, ATC and the airport working from shared milestones and target times instead of phone calls and guesswork.",
    features: [
      "Milestone-based Airport Collaborative Decision-Making",
      "Shared target off-block and take-off times",
      "Airline, handler and ATC collaboration views",
      "Aligned with international A-CDM standards",
      "Departure sequencing and slot adherence",
    ],
    image: IMGS[1],
  },
  {
    name: "Turnaround Intelligence",
    industry: "Aviation",
    industrySlug: "aviation",
    tagline: "Predict delays before they cascade.",
    description:
      "Turnaround Intelligence applies machine learning to every aircraft turnaround — predicting off-block times, spotting delay propagation early, and telling ground teams where to act first.",
    features: [
      "ML prediction of target off-block times",
      "Delay propagation analysis across the day's schedule",
      "Live turnaround milestone tracking",
      "Proactive alerting with recommended actions",
      "Historical benchmarking per stand, airline and handler",
    ],
    image: IMGS[2],
  },
  {
    name: "DD Pay",
    industry: "Fintech & Banking",
    industrySlug: "fintech-banking",
    tagline: "Payments that never sleep.",
    description:
      "DD Pay is a real-time payment orchestration engine — ISO 20022-native routing, intelligent retries and reconciliation built in, so money moves reliably at any hour.",
    features: [
      "ISO 20022-native payment processing",
      "Smart routing, retries and failover",
      "Real-time reconciliation and settlement views",
      "Wallets, payouts and collections in one API",
      "Fraud and compliance hooks on every transaction",
    ],
    image: IMGS[1],
  },
  {
    name: "DD Risk",
    industry: "Fintech & Banking",
    industrySlug: "fintech-banking",
    tagline: "Fraud decisions in milliseconds.",
    description:
      "DD Risk scores every transaction in milliseconds using streaming machine learning — combining rules and models, with case management for the alerts that matter.",
    features: [
      "Streaming ML transaction scoring",
      "Rules and models working together",
      "Case management for fraud teams",
      "Explainable, auditable decisions",
      "Adaptive thresholds that learn your traffic",
    ],
    image: IMGS[3],
  },
  {
    name: "DD Ledger",
    industry: "Fintech & Banking",
    industrySlug: "fintech-banking",
    tagline: "A core ledger you can audit to the last paisa.",
    description:
      "DD Ledger is a modern core ledger platform — event-driven, double-entry correct, with an immutable audit trail. The foundation for banks and fintechs building products that must balance, always.",
    features: [
      "Double-entry correctness by construction",
      "Event-driven architecture with full replay",
      "Immutable audit trail and data lineage",
      "Multi-currency and multi-entity support",
      "Product factory for accounts, loans and deposits",
    ],
    image: IMGS[2],
  },
  {
    name: "DD Care",
    industry: "Healthcare & Life Sciences",
    industrySlug: "healthcare-life-sciences",
    tagline: "The patient platform clinics actually use.",
    description:
      "DD Care gives care networks one patient platform — appointments, records, reminders and telehealth in a single experience patients love and staff actually adopt.",
    features: [
      "Appointments, reminders and self-scheduling",
      "Unified patient records across clinics",
      "Built-in telehealth and e-prescriptions",
      "Multi-clinic, multi-speciality support",
      "Secure patient messaging and notifications",
    ],
    image: IMGS[0],
  },
  {
    name: "DD Bridge",
    industry: "Healthcare & Life Sciences",
    industrySlug: "healthcare-life-sciences",
    tagline: "FHIR-native interoperability, done right.",
    description:
      "DD Bridge connects EMRs, labs, devices and partners through standards-native HL7 and FHIR APIs — one clean interoperability layer instead of a web of brittle point-to-point integrations.",
    features: [
      "HL7 v2 and FHIR R4 native APIs",
      "Pre-built EMR and lab connectors",
      "Terminology and code-set mapping",
      "Consent management and audit trails",
      "Real-time and batch synchronization",
    ],
    image: IMGS[1],
  },
  {
    name: "DD Commerce",
    industry: "Retail & E-Commerce",
    industrySlug: "retail-ecommerce",
    tagline: "Headless commerce at enterprise scale.",
    description:
      "DD Commerce is an API-first commerce core — catalog, cart, checkout and promotions decoupled from the storefront, so your team ships experiences as fast as marketing can imagine them.",
    features: [
      "API-first catalog, cart and checkout",
      "Sub-second storefront performance",
      "Promotions and pricing engine",
      "Multi-storefront and multi-region support",
      "OMS and payments integration out of the box",
    ],
    image: IMGS[3],
  },
  {
    name: "DD Stock",
    industry: "Retail & E-Commerce",
    industrySlug: "retail-ecommerce",
    tagline: "One truth for every unit of inventory.",
    description:
      "DD Stock gives retailers real-time inventory intelligence across every channel, warehouse and store — ending overselling, stockouts and dead stock with a single source of truth.",
    features: [
      "Real-time multi-channel inventory",
      "Intelligent allocation and routing",
      "Low-stock and demand prediction",
      "Warehouse and store synchronization",
      "Returns and exchange tracking",
    ],
    image: IMGS[2],
  },
  {
    name: "DD Fleet",
    industry: "Logistics & Supply Chain",
    industrySlug: "logistics-supply-chain",
    tagline: "Every vehicle, live.",
    description:
      "DD Fleet streams real-time telemetry from your entire fleet — location, driver behaviour, vehicle health — into one operational picture your dispatchers can actually act on.",
    features: [
      "Real-time GPS tracking and telematics",
      "Driver behaviour and safety scoring",
      "Vehicle health and maintenance signals",
      "Geofencing and route adherence alerts",
      "Fuel and cost analytics per vehicle",
    ],
    image: IMGS[0],
  },
  {
    name: "DD Route",
    industry: "Logistics & Supply Chain",
    industrySlug: "logistics-supply-chain",
    tagline: "Routes that re-plan themselves.",
    description:
      "DD Route is a constraint-aware optimization engine that plans your network and keeps re-planning it — as traffic, weather, priorities and failures change through the day.",
    features: [
      "Constraint-aware route optimization",
      "Continuous re-planning as conditions change",
      "Traffic, weather and window awareness",
      "Multi-depot and multi-shift planning",
      "Driver app with live task updates",
    ],
    image: IMGS[1],
  },
  {
    name: "DD Twin",
    industry: "Manufacturing & IoT",
    industrySlug: "manufacturing-iot",
    tagline: "Your plant, mirrored live.",
    description:
      "DD Twin builds a live digital replica of your lines and plants — simulate changes, run what-if analysis and plan capacity against the real state of the floor, not last month's report.",
    features: [
      "Live digital replica of lines and plants",
      "What-if simulation and scenario planning",
      "3D visualization of the shop floor",
      "Direct sensor and PLC integration",
      "Capacity and bottleneck analysis",
    ],
    image: IMGS[2],
  },
  {
    name: "DD Sense",
    industry: "Manufacturing & IoT",
    industrySlug: "manufacturing-iot",
    tagline: "Maintenance by condition, not calendar.",
    description:
      "DD Sense reads vibration, temperature and load signals from your machines and predicts failures weeks ahead — scheduling maintenance when it is needed, not when the calendar says so.",
    features: [
      "ML models for vibration, temperature and load",
      "Failure prediction with weeks of lead time",
      "Work-order and CMMS integration",
      "Edge processing for low-latency sites",
      "Downtime and ROI dashboards",
    ],
    image: IMGS[3],
  },
  {
    name: "DD Meter",
    industry: "SaaS & Platforms",
    industrySlug: "saas-platforms",
    tagline: "Usage-based billing without the pain.",
    description:
      "DD Meter is metering and billing infrastructure for product companies — accurate usage tracking, entitlements and invoicing that make usage-based pricing actually shippable.",
    features: [
      "Accurate, idempotent usage metering",
      "Entitlements and plan management",
      "Usage-based invoicing and proration",
      "Real-time usage APIs for customers",
      "Revenue and expansion analytics",
    ],
    image: IMGS[0],
  },
  {
    name: "DD Tenant",
    industry: "SaaS & Platforms",
    industrySlug: "saas-platforms",
    tagline: "Multi-tenancy that scales cleanly.",
    description:
      "DD Tenant is a multi-tenancy toolkit for SaaS platforms — isolation models, tenant-aware data layers and self-serve provisioning that keep architecture clean as tenants multiply.",
    features: [
      "Flexible tenant isolation models",
      "Self-serve tenant provisioning",
      "Tenant-aware data and caching layers",
      "Per-tenant configuration and feature flags",
      "Tenant usage and health monitoring",
    ],
    image: IMGS[1],
  },
];

export const getProduct = (slug) =>
  products.find((p) => slugify(p.name) === slug);

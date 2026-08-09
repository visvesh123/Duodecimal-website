export const industries = [
  {
    n: "01",
    slug: "fintech-banking",
    title: "Fintech & Banking",
    copy: "Core banking modernization, payment rails, fraud detection and regulatory-grade reporting systems built for zero-failure tolerance.",
    tags: ["Payments", "Core banking", "RegTech"],
    tagline: "Banking-grade software for a real-time world.",
    heroCopy:
      "Money never sleeps, and neither can your systems. Duodecimal builds the payment rails, core platforms and risk engines that banks and fintechs stake their licences on — engineered for zero-failure tolerance and audited to regulatory standards.",
    img: "https://images.pexels.com/photos/21418687/pexels-photo-21418687.jpeg?auto=compress&cs=tinysrgb&w=1200",
    stats: [
      { value: "38%", label: "Faster release cycles" },
      { value: "99.99%", label: "Platform uptime" },
      { value: "PCI-DSS", label: "Aligned delivery" },
    ],
    challenges: [
      { title: "Legacy cores blocking innovation", copy: "Decades-old core systems make every product launch a multi-quarter risk exercise. We re-platform incrementally — strangler patterns, event-driven cores — without customer-facing downtime." },
      { title: "Real-time payments, real-time fraud", copy: "Instant payment rails demand fraud decisions in milliseconds. We build streaming risk engines that score every transaction without slowing a single one down." },
      { title: "Regulatory pressure that never eases", copy: "From PCI-DSS to regional reporting mandates, compliance is a moving target. We bake audit trails, lineage and reporting into the platform itself." },
    ],
    offerings: [
      { title: "Core banking modernization", copy: "Event-driven microservices replacing monolithic cores, migrated account-by-account with zero downtime." },
      { title: "Payment rails & wallets", copy: "ISO 20022-native payment processing, wallet infrastructure and open banking APIs." },
      { title: "Fraud & risk engines", copy: "ML-powered transaction scoring, anomaly detection and case management for fraud teams." },
      { title: "RegTech & reporting", copy: "Automated regulatory reporting, immutable audit trails and data lineage across every system." },
    ],
  },
  {
    n: "02",
    slug: "healthcare-life-sciences",
    title: "Healthcare & Life Sciences",
    copy: "HIPAA-conscious patient platforms, clinical workflow systems and interoperable data exchange across care networks.",
    tags: ["Patient platforms", "HL7 / FHIR", "Clinical data"],
    tagline: "Software that cares for the people who care.",
    heroCopy:
      "Clinicians should fight disease, not their software. Duodecimal builds patient platforms, clinical workflows and interoperable data systems that give care teams their time back — with privacy and security engineered in from the first commit.",
    img: "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?q=80&w=1400&auto=format&fit=crop",
    stats: [
      { value: "2.4M", label: "Patients onboarded" },
      { value: "140+", label: "Clinics connected" },
      { value: "HIPAA", label: "Conscious delivery" },
    ],
    challenges: [
      { title: "Fragmented patient data", copy: "Records scattered across EMRs, labs and devices mean incomplete pictures at the point of care. We unify clinical data into a single, reliable patient view." },
      { title: "Interoperability that actually works", copy: "HL7 and FHIR are easy to claim and hard to do well. We build standards-native exchange layers that connect care networks without brittle point-to-point integrations." },
      { title: "Clinician burnout from bad UX", copy: "Every extra click is time stolen from patients. Our design research happens on the ward, not in a boardroom — workflows shaped around how care actually happens." },
    ],
    offerings: [
      { title: "Patient engagement platforms", copy: "Appointments, records, reminders and telehealth in one experience patients actually use." },
      { title: "Clinical workflow systems", copy: "Triage, e-prescribing and care coordination tools designed with clinicians, for clinicians." },
      { title: "Clinical data pipelines", copy: "FHIR-native interoperability layers and analysis-ready data platforms for research and operations." },
      { title: "Compliance & security", copy: "HIPAA-conscious architecture, consent management and end-to-end audit trails." },
    ],
  },
  {
    n: "03",
    slug: "retail-ecommerce",
    title: "Retail & E-Commerce",
    copy: "Headless commerce, inventory intelligence and personalization engines that convert at enterprise scale.",
    tags: ["Headless commerce", "OMS", "Personalization"],
    tagline: "Commerce experiences that convert at scale.",
    heroCopy:
      "Every millisecond of load time and every irrelevant recommendation costs you revenue. Duodecimal builds headless commerce platforms, inventory intelligence and personalization engines that turn traffic into loyal customers.",
    img: "https://images.pexels.com/photos/411011/sun-energy-solar-electricity-411011.jpeg?auto=compress&cs=tinysrgb&w=1200",
    stats: [
      { value: "3x", label: "Conversion uplift" },
      { value: "60+", label: "Storefronts powered" },
      { value: "<1s", label: "Page load targets" },
    ],
    challenges: [
      { title: "Monolithic platforms slowing you down", copy: "When every campaign needs a release cycle, marketing moves faster than your stack. We decouple storefronts from commerce engines so teams ship daily." },
      { title: "Inventory blindness", copy: "Overselling, stockouts and dead stock all trace back to one cause: no single source of truth. We build real-time inventory intelligence across every channel and warehouse." },
      { title: "One-size-fits-all experiences", copy: "Customers expect relevance. We build personalization engines that adapt assortment, pricing and content to every segment — without creepy data practices." },
    ],
    offerings: [
      { title: "Headless commerce", copy: "API-first storefronts with sub-second loads, independent deploys and unlimited front-end freedom." },
      { title: "Order management systems", copy: "Distributed OMS with real-time inventory, intelligent routing and unified returns." },
      { title: "Personalization engines", copy: "Segment-aware recommendations, search and merchandising driven by your first-party data." },
      { title: "Mobile commerce", copy: "Native-quality apps and PWAs that turn your best customers into repeat buyers." },
    ],
  },
  {
    n: "04",
    slug: "logistics-supply-chain",
    title: "Logistics & Supply Chain",
    copy: "Real-time fleet visibility, route optimization and warehouse automation platforms moving millions of shipments.",
    tags: ["Fleet telematics", "WMS", "Route optimization"],
    tagline: "Visibility for every shipment, everywhere.",
    heroCopy:
      "Supply chains fail in the dark. Duodecimal builds the telemetry, optimization and control-tower platforms that give logistics operators a live, truthful picture of every vehicle, warehouse and shipment — and the intelligence to act on it.",
    img: "https://images.pexels.com/photos/20697911/pexels-photo-20697911.png?auto=compress&cs=tinysrgb&w=1200",
    stats: [
      { value: "12K", label: "Vehicles tracked" },
      { value: "24", label: "Countries live" },
      { value: "50%", label: "Fewer missed windows" },
    ],
    challenges: [
      { title: "Black-box supply chains", copy: "When you cannot see it, you cannot fix it. We stream telemetry from vehicles, containers and warehouses into one live operational picture." },
      { title: "Manual dispatch and planning", copy: "Spreadsheet dispatch cannot survive contact with reality. Our optimization engines re-plan routes continuously as traffic, weather and priorities change." },
      { title: "ETAs nobody trusts", copy: "Missed windows erode customer trust faster than late freight. Our ML arrival prediction learns your network and cuts missed windows dramatically." },
    ],
    offerings: [
      { title: "Fleet telematics", copy: "Real-time tracking, driver behaviour and vehicle health streamed from edge devices to cloud." },
      { title: "Route optimization", copy: "Constraint-aware planning engines that re-optimize continuously across your whole network." },
      { title: "Warehouse management", copy: "WMS platforms with automation integration, slotting intelligence and live inventory accuracy." },
      { title: "Supply chain control towers", copy: "Exception-driven dashboards that surface problems before your customers feel them." },
    ],
  },
  {
    n: "05",
    slug: "manufacturing-iot",
    title: "Manufacturing & IoT",
    copy: "Industrial IoT pipelines, digital twins and predictive maintenance systems for the factory floor.",
    tags: ["Digital twins", "Edge computing", "Predictive maintenance"],
    tagline: "The factory floor, digitized.",
    heroCopy:
      "Machines have been talking for years — most factories just cannot hear them. Duodecimal connects the factory floor to the cloud with industrial IoT pipelines, digital twins and predictive maintenance that turn downtime into a solved problem.",
    img: "https://images.pexels.com/photos/25630348/pexels-photo-25630348.jpeg?auto=compress&cs=tinysrgb&w=1200",
    stats: [
      { value: "30%", label: "Less unplanned downtime" },
      { value: "500+", label: "Machines connected" },
      { value: "Edge", label: "To-cloud architecture" },
    ],
    challenges: [
      { title: "Unplanned downtime", copy: "A single failed bearing can halt a line for days. Our predictive maintenance models read vibration, temperature and load signals to flag failures weeks ahead." },
      { title: "Siloed machine data", copy: "PLCs, SCADA and MES systems all speak different dialects. We normalize machine data at the edge into one clean, queryable stream." },
      { title: "Paper on the factory floor", copy: "Clipboards do not scale. We digitize inspections, quality checks and shift handovers into guided mobile workflows." },
    ],
    offerings: [
      { title: "Industrial IoT pipelines", copy: "Edge-to-cloud ingestion for thousands of sensors with protocol translation and buffering." },
      { title: "Digital twins", copy: "Live virtual replicas of lines and plants for simulation, planning and what-if analysis." },
      { title: "Predictive maintenance", copy: "ML models that schedule maintenance by machine condition, not calendar." },
      { title: "MES integration", copy: "Connecting shop-floor execution with ERP and quality systems into one operational loop." },
    ],
  },
  {
    n: "06",
    slug: "saas-platforms",
    title: "SaaS & Platforms",
    copy: "Multi-tenant architecture, usage-based billing and platform engineering for product companies scaling past product-market fit.",
    tags: ["Multi-tenancy", "Billing", "Platform engineering"],
    tagline: "Platform engineering for product companies.",
    heroCopy:
      "Product-market fit is the beginning, not the end. Duodecimal helps SaaS companies re-architect for scale — multi-tenant platforms, usage-based billing and the engineering discipline that keeps velocity high as teams and tenants multiply.",
    img: "https://images.pexels.com/photos/21418687/pexels-photo-21418687.jpeg?auto=compress&cs=tinysrgb&w=1200",
    stats: [
      { value: "10x", label: "Tenant scale achieved" },
      { value: "99.99%", label: "SLA delivery" },
      { value: "-40%", label: "Cloud cost reduction" },
    ],
    challenges: [
      { title: "Scaling past the MVP", copy: "The architecture that won your first hundred customers breaks at a thousand. We re-platform hot paths without freezing feature delivery." },
      { title: "Multi-tenancy complexity", copy: "Tenant isolation, noisy neighbours and per-tenant configuration are hard problems. We design tenancy models that scale cleanly and stay secure." },
      { title: "Cloud cost sprawl", copy: "Growth should not mean a cloud bill that grows faster than revenue. Our FinOps practice typically cuts spend by a third while improving performance." },
    ],
    offerings: [
      { title: "Multi-tenant architecture", copy: "Isolation models, tenant-aware data layers and self-serve provisioning built for scale." },
      { title: "Billing & metering", copy: "Usage-based pricing infrastructure with accurate metering, entitlements and invoicing." },
      { title: "Platform re-engineering", copy: "Strangler-pattern modernization of monoliths into services your team can actually own." },
      { title: "DevOps & SRE", copy: "CI/CD, observability and incident practices that keep SLAs green as you grow." },
    ],
  },
];

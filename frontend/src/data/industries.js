export const industries = [
  {
    n: "01",
    slug: "manufacturing-iot",
    title: "Manufacturing & IoT",
    copy: "Hear the floor. Twin the plant. Service the machine that needs it.",
    tags: ["Digital twins", "Predictive maintenance", "Edge"],
    tagline: "Hear the floor. Act before it stops.",
    heroCopy:
      "Machines already speak. Most floors cannot hear them. We connect the line, twin the plant, and flag failure while you can still plan the stop.",
    img: "https://images.unsplash.com/photo-1565043666747-69f6646db940?q=80&w=1400&auto=format&fit=crop",
    stats: [
      { value: "Always heard", label: "The floor, as it runs" },
      { value: "Condition", label: "Service when the machine asks" },
      { value: "Live twin", label: "Plan against the plant as it is" },
    ],
    challenges: [
      {
        title: "Downtime stops before the line does.",
        copy: "A failed bearing should not take the shift with it. We read vibration, temperature and load — and flag failure while you can still plan the stop.",
      },
      {
        title: "One stream. Every machine.",
        copy: "PLCs, SCADA and MES each speak a different dialect. We normalize at the edge into one clean stream you can trust.",
      },
      {
        title: "The clipboard leaves the floor.",
        copy: "Inspections, quality checks and shift handovers become guided digital workflows. Paper does not scale. This does.",
      },
    ],
    offerings: [
      { title: "Industrial IoT pipelines", copy: "Edge to cloud. Protocol translation. Buffering when the line cannot wait." },
      { title: "Digital twins", copy: "The plant, mirrored live. Change it here first." },
      { title: "Predictive maintenance", copy: "Service by condition. Not by calendar." },
      { title: "MES integration", copy: "Shop floor and ERP in one loop. Execution that closes." },
    ],
    products: [
      { name: "DD Twin", copy: "The plant, live. Simulate the change. Plan against the floor as it is.", tags: ["Digital twin", "Simulation"] },
      { name: "DD Sense", copy: "The machine, heard. Failure flagged early. Service when it is needed.", tags: ["IoT", "ML"] },
    ],
    clients: ["ForgeWell", "PrecisionParts", "AutoFab", "SteelArc", "MachNine", "Vertex Industries"],
  },
  {
    n: "02",
    slug: "healthcare-life-sciences",
    title: "Healthcare & Life Sciences",
    copy: "Patient platforms. Clinical workflows. Data that moves with the patient.",
    tags: ["Patient platforms", "HL7 / FHIR", "Clinical data"],
    tagline: "Clinicians treat. Software stays out of the way.",
    heroCopy:
      "Clinicians should fight disease, not their software. We build the platforms, workflows and data systems that give care teams their time back. Privacy in from the first commit.",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1400&auto=format&fit=crop",
    stats: [
      { value: "One patient", label: "One reliable view" },
      { value: "Connected", label: "Care networks that talk" },
      { value: "HIPAA", label: "Privacy engineered in" },
    ],
    challenges: [
      {
        title: "One patient. One view.",
        copy: "Records scattered across EMRs, labs and devices leave care incomplete. We unify clinical data into a picture the clinician can trust.",
      },
      {
        title: "Interop that holds.",
        copy: "HL7 and FHIR are easy to claim and hard to do well. We build exchange that connects care networks — without brittle point-to-point glue.",
      },
      {
        title: "Time back to the ward.",
        copy: "Every extra click is time stolen from patients. Workflows shaped on the ward. Not in a boardroom.",
      },
    ],
    offerings: [
      { title: "Patient engagement platforms", copy: "Appointments, records, reminders and telehealth. One experience patients actually use." },
      { title: "Clinical workflow systems", copy: "Triage, prescribing, coordination. Designed with clinicians. For clinicians." },
      { title: "Clinical data pipelines", copy: "FHIR-native exchange. Data ready for care, research and operations." },
      { title: "Compliance and security", copy: "HIPAA from the first commit. Consent. Audit. No afterthought." },
    ],
    products: [],
    clients: ["Northwind Health", "CarePoint", "MediCore Labs", "Vitalis", "HealthGrid", "SanoLife"],
  },
  {
    n: "03",
    slug: "education",
    title: "Education",
    copy: "Attendance. Academics. One campus record.",
    tags: ["Campus automation", "Attendance", "Learning platforms"],
    tagline: "Teach. We run the rest.",
    heroCopy:
      "Admissions to alumni should not live in five tools. We unify attendance, academics and analytics so educators spend their time teaching.",
    img: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1400&auto=format&fit=crop",
    stats: [
      { value: "Tap in", label: "Present. Instant. Proven." },
      { value: "One record", label: "Admissions to alumni" },
      { value: "Early", label: "Risk seen before results" },
    ],
    challenges: [
      {
        title: "Teaching time, returned.",
        copy: "The register burns the start of the lecture and is easy to proxy. Tap and face-based attendance gives that time back to teaching.",
      },
      {
        title: "One campus. One system.",
        copy: "Admissions, academics, exams and finance each live in their own tool. We unify them. One student. One record.",
      },
      {
        title: "Risk, seen early.",
        copy: "By the time grades arrive, it is already too late. Attendance and engagement flag students in trouble before results do.",
      },
    ],
    offerings: [
      { title: "Campus automation", copy: "Attendance. Access. Timetables. Notifications. Running without a chase." },
      { title: "Learning platforms", copy: "Content, assessments and classrooms built for the institution — not a classroom of one." },
      { title: "Student analytics", copy: "Engagement, performance and early warning. Faculty see risk before results do." },
      { title: "Institution ERP", copy: "Admissions to alumni. Academics, exams, fees, placements. One system of record." },
    ],
    products: [
      { name: "QTap", copy: "Tap in. You are present. Attendance, access and reports update at once.", tags: ["Attendance", "NFC"] },
      { name: "QFace", copy: "Walk past. You are marked. Contactless. Proxy-proof. Privacy held with care.", tags: ["Face recognition", "Identity"] },
      { name: "MUOne", copy: "The university. One system. Admissions to alumni, one student record.", tags: ["University ERP", "Analytics"] },
    ],
    clients: ["Greenfield University", "Lakeview Institute", "Nova Academy", "EduTrust Colleges", "CityTech University", "St. Mary's Group"],
  },
  {
    n: "04",
    slug: "aviation",
    title: "Aviation",
    copy: "Live operations. Agentic workflows. Passenger help that feels human.",
    tags: ["Live ops", "Digital human", "Agentic"],
    tagline: "The airport, on time. The passenger, answered.",
    heroCopy:
      "An airport moves when every team sees the same truth. We put operations on one timeline, stop delay before it travels, and meet passengers with a digital human that closes the query on the spot.",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1400&auto=format&fit=crop",
    stats: [
      { value: "Always live", label: "The airport, as it happens" },
      { value: "Digital human", label: "Accurate, instant passenger help" },
      { value: "Agentic", label: "From request to closed action" },
    ],
    challenges: [
      {
        title: "Delay stops where it starts.",
        copy: "A late inbound should not write the rest of the day. We see delay forming and cut it off before it travels.",
      },
      {
        title: "One view. Every team.",
        copy: "Airlines, handlers and the airport each hold a piece of the truth. We put the whole operation in one place, so the next move is obvious — and agreed.",
      },
      {
        title: "Every passenger question, closed.",
        copy: "The answer already exists. The passenger cannot reach it. A digital human meets them where they stand, answers with accuracy, and resolves the query there.",
      },
    ],
    offerings: [
      { title: "Airport operations platforms", copy: "Airside to landside. One live picture." },
      { title: "A-CDM implementation", copy: "Shared milestones. Shared times. The next move, agreed." },
      { title: "Turnaround analytics", copy: "See delay forming. Cut it off before it travels." },
      { title: "Agentic workflows", copy: "Read the picture. Decide. Close the action." },
    ],
    products: [
      { name: "MITHR", copy: "An AI digital human for the terminal. Speaks like a person. Answers with accuracy. Closes the query on the spot.", tags: ["Digital human", "Passenger AI"] },
      { name: "Airport CDPs", copy: "One timeline. Every team. Shared milestones. The next move, agreed.", tags: ["A-CDM", "Collaboration"] },
      { name: "Turnaround Intelligence", copy: "Delay stops before it travels. Off-block risk, seen early. Act where it counts.", tags: ["AI", "Turnaround"] },
    ],
    clients: ["Airport360", "SkyPort Airports", "AeroBridge", "IndiGround Services", "TerminalOne", "AeroNexus"],
  },
  {
    n: "05",
    slug: "structural-engineering",
    title: "Structural Engineering",
    copy: "Live structural health. Vision that finds what the eye misses.",
    tags: ["Structural health monitoring", "Vision inspection", "Bridges"],
    tagline: "The bridge speaks. We listen early.",
    heroCopy:
      "Bridges warn before they fail. We read the signs. Live monitoring and AI vision catch cracks, corrosion and movement early — so engineers fix the small problem before it becomes the big one.",
    img: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1400&auto=format&fit=crop",
    stats: [
      { value: "Always watched", label: "The bridge, as it stands" },
      { value: "Vision AI", label: "Cracks the eye can miss" },
      { value: "Early", label: "Warning before damage spreads" },
    ],
    challenges: [
      {
        title: "Watched every day. Not inspection day.",
        copy: "Manual inspections are slow and leave long blind spots between visits. Continuous monitoring watches the structure as it stands — always.",
      },
      {
        title: "Cracks the eye can miss.",
        copy: "Hairline cracks, corrosion and spalling hide under decks and behind bearings. AI vision finds them, measures them, and tracks how they grow.",
      },
      {
        title: "Readings into a decision.",
        copy: "Sensors produce noise until they do not. We turn strain, vibration and tilt into a clear health picture and alerts engineers can act on.",
      },
    ],
    offerings: [
      { title: "Structural health monitoring", copy: "Strain, vibration, tilt, temperature. Live from every critical member." },
      { title: "Vision-based inspection", copy: "AI that finds cracks, corrosion and deformation in drone, camera and CCTV imagery." },
      { title: "Drone inspection workflows", copy: "Repeatable capture of decks, piers and bearings. Fewer closures. No rope access." },
      { title: "Bridge health dashboards", copy: "Every bridge. One living view. Health, trend, and the alert to act on." },
    ],
  },
];

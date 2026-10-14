import { Database, Cloud, BrainCircuit, Bot, ScanEye, Activity, Boxes, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { scrollToSection } from "@/components/Nav";

const services = [
  {
    n: "01",
    icon: Database,
    title: "Data Platforms and Engineering",
    span: "md:col-span-7",
    tagline: "The foundation of every enduring insight.",
    copy: "We design unified, well-governed data architectures that give the enterprise a trusted basis for analytics and artificial intelligence.",
    tags: ["Lakehouse architecture", "Data pipelines", "Governance"],
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
  },
  {
    n: "02",
    icon: Cloud,
    title: "Cloud-Native and Platform Engineering",
    span: "md:col-span-5",
    tagline: "Resilient platforms, built for lasting performance.",
    copy: "Secure, scalable environments across AWS, Azure, and Google Cloud, continuously optimized for reliability, efficiency, and cost.",
    tags: ["Kubernetes", "CI/CD", "FinOps"],
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
  },
  {
    n: "03",
    icon: BrainCircuit,
    title: "Enterprise AI and Intelligent Systems",
    span: "md:col-span-5",
    tagline: "Intelligence, integrated into the fabric of the enterprise.",
    copy: "Production-grade AI that learns from your operations and strengthens decision-making at every level of the organization.",
    tags: ["Predictive systems", "Decision intelligence", "MLOps"],
    img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
  },
  {
    n: "04",
    icon: Bot,
    title: "Generative AI and Agentic Systems",
    span: "md:col-span-7",
    tagline: "Institutional knowledge, put to work.",
    copy: "Secure, governed assistants and autonomous agents that understand your organization and carry work from request through to completion.",
    tags: ["LLM integration", "AI agents", "Retrieval-augmented generation"],
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
  },
  {
    n: "05",
    icon: ScanEye,
    title: "Computer Vision and Multimodal AI",
    span: "md:col-span-4",
    tagline: "Systems that perceive, interpret, and understand.",
    copy: "Models that read images, video, documents, and language together, converting what your business observes into what it knows.",
    tags: ["Visual inspection", "Document intelligence", "Multimodal models"],
    img: "https://images.unsplash.com/photo-1557597776-9c8fbb1407cd?q=80&w=1200&auto=format&fit=crop",
  },
  {
    n: "06",
    icon: Activity,
    title: "Real-Time Analytics and Decision Intelligence",
    span: "md:col-span-4",
    tagline: "The right insight, at the moment it matters.",
    copy: "Live data transformed into clear, timely guidance, enabling leaders and teams to act with confidence as events unfold.",
    tags: ["Streaming analytics", "Decision support", "Live dashboards"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
  },
  {
    n: "07",
    icon: Boxes,
    title: "Digital Twins and Simulation",
    span: "md:col-span-4",
    tagline: "Foresight, before commitment.",
    copy: "Living models of your operations that allow strategies to be tested, refined, and validated before they are put into practice.",
    tags: ["Operational twins", "Scenario modeling", "Predictive simulation"],
    img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop",
  },
];

export const Services = () => (
  <section id="services" className="py-24 lg:py-32" data-testid="services-section">
    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
      <Reveal>
        <h2 className="max-w-3xl font-display text-4xl font-bold tracking-[-0.01em] text-ink sm:text-5xl lg:text-6xl">
          Every discipline. One standard of precision.
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-12">
        {services.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.06} className={`${s.span} bg-white`}>
            <div
              className="spotlight group flex h-full flex-col justify-between p-8 transition-colors duration-300 hover:bg-ink lg:p-10"
              data-testid={`service-card-${s.n}`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <s.icon className="h-7 w-7 text-brand" strokeWidth={1.5} />
                  <span className="font-display text-sm font-medium text-slate-400 transition-colors duration-300 group-hover:text-slate-500">
                    /{s.n}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-2xl font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-white lg:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-3 font-display text-base font-medium tracking-tight text-brand lg:text-lg">
                  {s.tagline}
                </p>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-300">
                  {s.copy}
                </p>
                {s.img && (
                  <div className="mt-6 h-40 overflow-hidden border border-line">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>
                )}
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="border border-line px-3 py-1 text-xs font-medium text-slate-500 transition-colors duration-300 group-hover:border-slate-700 group-hover:text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <button
          data-testid="services-cta"
          onClick={() => scrollToSection("#contact")}
          className="group mt-12 flex items-center gap-2 text-sm font-semibold text-ink"
        >
          <span className="border-b border-ink pb-0.5 transition-colors duration-200 group-hover:border-brand group-hover:text-brand">
            Discuss your requirements
          </span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </Reveal>
    </div>
  </section>
);

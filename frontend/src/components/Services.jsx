import { Code2, Smartphone, Cloud, BrainCircuit, PenTool, Compass, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { scrollToSection } from "@/components/Nav";

const services = [
  {
    n: "01",
    icon: Code2,
    title: "Custom Software",
    span: "md:col-span-7",
    copy: "Bespoke platforms engineered around your business logic — not the other way around. From legacy modernization to greenfield builds.",
    tags: ["Enterprise platforms", "API engineering", "Legacy modernization"],
    img: "https://images.pexels.com/photos/411011/sun-energy-solar-electricity-411011.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    n: "02",
    icon: Smartphone,
    title: "Web & Mobile Apps",
    span: "md:col-span-5",
    copy: "High-performance web applications and native-quality mobile experiences that users actually love.",
    tags: ["React / Next.js", "iOS & Android", "PWAs"],
  },
  {
    n: "03",
    icon: Cloud,
    title: "Cloud & DevOps",
    span: "md:col-span-5",
    copy: "Cloud-native architecture, migration and managed operations across AWS, Azure and Google Cloud.",
    tags: ["Kubernetes", "CI/CD", "FinOps"],
  },
  {
    n: "04",
    icon: BrainCircuit,
    title: "AI / ML",
    span: "md:col-span-7",
    copy: "Production-grade machine learning — from data pipelines to LLM-powered products that ship real business value.",
    tags: ["LLM integration", "MLOps", "Predictive systems"],
    img: "https://images.pexels.com/photos/25630348/pexels-photo-25630348.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    n: "05",
    icon: PenTool,
    title: "UI/UX Design",
    span: "md:col-span-6",
    copy: "Research-driven product design that turns complex enterprise workflows into effortless interfaces.",
    tags: ["Design systems", "Product research", "Prototyping"],
  },
  {
    n: "06",
    icon: Compass,
    title: "Technology Consulting",
    span: "md:col-span-6",
    copy: "Fractional CTO guidance, architecture reviews and delivery audits for boards and engineering leaders.",
    tags: ["Architecture", "Due diligence", "Team scaling"],
  },
];

export const Services = () => (
  <section id="services" className="py-24 lg:py-32" data-testid="services-section">
    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
      <Reveal>
        <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
          <span className="h-px w-10 bg-brand" /> Capabilities
        </p>
        <h2 className="max-w-3xl font-display text-4xl font-bold tracking-[-0.03em] text-ink sm:text-5xl lg:text-6xl">
          Six disciplines. One standard of precision.
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-12">
        {services.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.06} className={`${s.span} bg-white`}>
            <div
              className="group flex h-full flex-col justify-between p-8 transition-colors duration-300 hover:bg-ink lg:p-10"
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

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const cases = [
  {
    client: "Meridian Bank",
    field: "Core banking modernization",
    metric: "38%",
    metricLabel: "faster release cycles",
    copy: "Re-platformed a 20-year-old core banking stack into event-driven microservices without a single minute of customer-facing downtime.",
    img: "https://images.pexels.com/photos/21418687/pexels-photo-21418687.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    client: "Northwind Health",
    field: "Patient engagement platform",
    metric: "2.4M",
    metricLabel: "patients onboarded",
    copy: "Designed and built a unified patient platform spanning 140 clinics — appointments, records and telehealth in one experience.",
    img: "https://images.pexels.com/photos/25630348/pexels-photo-25630348.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    client: "Atlas Freight",
    field: "Logistics visibility suite",
    metric: "99.99%",
    metricLabel: "platform uptime",
    copy: "Real-time telemetry for 12,000 vehicles across 24 countries, with ML-driven ETA prediction that cut missed windows by half.",
    img: "https://images.pexels.com/photos/411011/sun-energy-solar-electricity-411011.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

export const CaseStudies = () => (
  <section id="work" className="border-t border-line bg-ink py-24 text-white lg:py-32" data-testid="case-studies-section">
    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
      <Reveal>
        <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
          <span className="h-px w-10 bg-brand" /> Selected Work
        </p>
        <h2 className="max-w-3xl font-display text-4xl font-bold tracking-[-0.01em] sm:text-5xl lg:text-6xl">
          Proof, not promises.
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-px border border-slate-800 bg-slate-800 lg:grid-cols-3">
        {cases.map((c, i) => (
          <Reveal key={c.client} delay={i * 0.08} className="bg-ink">
            <article className="group flex h-full flex-col" data-testid={`case-study-${i + 1}`}>
              <div className="relative h-56 overflow-hidden border-b border-slate-800">
                <img
                  src={c.img}
                  alt={c.client}
                  className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <span className="absolute left-4 top-4 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-ink">
                  {c.client}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  {c.field}
                </p>
                <p className="mt-6 font-display text-5xl font-bold tracking-tight text-brand">
                  {c.metric}
                </p>
                <p className="mt-1 text-sm font-medium text-white">{c.metricLabel}</p>
                <p className="mt-6 flex-1 text-sm leading-relaxed text-slate-400">
                  {c.copy}
                </p>
                <span className="mt-8 flex items-center gap-2 text-sm font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Read the story
                  <ArrowUpRight className="h-4 w-4 text-brand" />
                </span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

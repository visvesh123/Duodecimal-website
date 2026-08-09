import { useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { industries } from "@/data/industries";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal, MaskedLine } from "@/components/Reveal";

export default function IndustryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const industry = industries.find((i) => i.slug === slug);

  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [slug]);

  if (!industry) return <Navigate to="/" replace />;

  const goContact = () => navigate("/#contact");

  return (
    <main className="bg-white" data-testid={`industry-page-${industry.slug}`}>
      <Nav />

      <section className="border-b border-line pt-16">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 pb-16 pt-16 lg:grid-cols-12 lg:px-12 lg:pt-24">
          <div className="lg:col-span-7">
            <button
              data-testid="industry-back-link"
              onClick={() => navigate("/#industries")}
              className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 transition-colors duration-200 hover:text-brand"
            >
              <ArrowLeft className="h-4 w-4" /> All industries
            </button>
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              <span className="h-px w-10 bg-brand" /> Industry {industry.n} — {industry.title}
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.01em] text-ink sm:text-5xl lg:text-6xl">
              <MaskedLine delay={0.1}>{industry.tagline}</MaskedLine>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg" data-testid="industry-hero-copy">
              {industry.heroCopy}
            </p>
            <div className="mt-10">
              <button
                data-testid="industry-cta-button"
                onClick={goContact}
                className="group flex items-center gap-2 bg-ink px-7 py-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand"
              >
                Discuss your project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <Reveal delay={0.2}>
              <div className="absolute -left-4 -top-4 h-full w-full border border-brand" />
              <div className="relative aspect-[4/3] overflow-hidden border border-line bg-paper">
                <img
                  src={industry.img}
                  alt={industry.title}
                  className="h-full w-full object-cover"
                  data-testid="industry-hero-image"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-3" data-testid="industry-stats">
            {industry.stats.map((s) => (
              <div key={s.label} className="border-b border-r border-line px-6 py-8">
                <p className="font-display text-4xl font-bold tracking-tight text-ink">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32" data-testid="industry-challenges">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              <span className="h-px w-10 bg-brand" /> The Problems
            </p>
            <h2 className="max-w-3xl font-display text-4xl font-bold tracking-[-0.01em] text-ink sm:text-5xl">
              What we solve in {industry.title.toLowerCase()}.
            </h2>
          </Reveal>
          <div className="mt-12">
            {industry.challenges.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="grid grid-cols-12 gap-6 border-t border-line py-10" data-testid={`industry-challenge-${i + 1}`}>
                  <span className="col-span-2 font-display text-4xl font-light text-slate-300 lg:text-6xl">
                    0{i + 1}
                  </span>
                  <div className="col-span-10">
                    <h3 className="font-display text-xl font-bold tracking-tight text-ink lg:text-3xl">
                      {c.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
                      {c.copy}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-24 lg:py-32" data-testid="industry-offerings">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              <span className="h-px w-10 bg-brand" /> What We Deliver
            </p>
            <h2 className="max-w-3xl font-display text-4xl font-bold tracking-[-0.01em] text-ink sm:text-5xl">
              Capabilities, ready to deploy.
            </h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
            {industry.offerings.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.06} className="bg-white">
                <div className="group h-full p-8 transition-colors duration-300 hover:bg-ink lg:p-10" data-testid={`industry-offering-${i + 1}`}>
                  <span className="font-display text-sm font-medium text-slate-400 transition-colors duration-300 group-hover:text-slate-500">
                    /0{i + 1}
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-white lg:text-2xl">
                    {o.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-300">
                    {o.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800 bg-ink py-24 text-white" data-testid="industry-cta-band">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-8 px-6 lg:flex-row lg:items-end lg:justify-between lg:px-12">
          <Reveal>
            <h2 className="max-w-2xl font-display text-4xl font-bold tracking-[-0.01em] sm:text-5xl">
              Building in {industry.title.toLowerCase()}? Let's talk.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
              A senior engineer — not a sales rep — will respond within one business day.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <button
              data-testid="industry-bottom-cta"
              onClick={goContact}
              className="group flex items-center gap-2 bg-white px-7 py-4 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-brand hover:text-white"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}

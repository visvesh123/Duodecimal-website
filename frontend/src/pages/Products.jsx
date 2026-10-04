import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { industries } from "@/data/industries";
import { products, slugify } from "@/data/products";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal, MaskedLine } from "@/components/Reveal";

export default function Products() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, []);

  const groups = industries
    .map((ind) => ({
      industry: ind,
      items: products.filter((p) => p.industrySlug === ind.slug),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <main className="bg-white" data-testid="products-page">
      <Nav />
      <section className="border-b border-line pt-16">
        <div className="mx-auto max-w-[1440px] px-6 pb-16 pt-16 lg:px-12 lg:pt-24">
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            <span className="h-px w-10 bg-brand" /> Products
          </p>
          <h1 className="font-display text-5xl font-bold leading-[0.98] tracking-[-0.01em] text-ink sm:text-6xl lg:text-7xl">
            <MaskedLine delay={0.1}>Built by us.</MaskedLine>
            <MaskedLine delay={0.25} className="text-brand">
              Proven in the field.
            </MaskedLine>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
            Platforms and products engineered by Duodecimal — from campus
            attendance to airport turnaround intelligence.
          </p>
        </div>
      </section>

      {groups.map(({ industry, items }) => (
        <section key={industry.slug} className="border-b border-line py-16 lg:py-20" data-testid={`products-group-${industry.slug}`}>
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <Reveal>
              <div className="flex items-baseline justify-between gap-6">
                <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  {industry.title}
                </h2>
                <button
                  data-testid={`products-industry-link-${industry.slug}`}
                  onClick={() => navigate(`/industries/${industry.slug}`)}
                  className="group hidden items-center gap-2 text-sm font-semibold text-ink sm:flex"
                >
                  <span className="border-b border-ink pb-0.5 transition-colors duration-200 group-hover:border-brand group-hover:text-brand">
                    Explore industry
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
              {items.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.05} className="bg-white">
                  <article
                    className="group flex h-full cursor-pointer flex-col p-8 transition-colors duration-300 hover:bg-ink"
                    onClick={() => navigate(`/products/${slugify(p.name)}`)}
                    data-testid={`product-card-${slugify(p.name)}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="border border-brand px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-brand">
                        Product
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-slate-300 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                    </div>
                    <h3 className="mt-8 font-display text-3xl font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-white">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-slate-500 transition-colors duration-300 group-hover:text-slate-400">
                      {p.tagline}
                    </p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-300">
                      {p.description}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}
      <Footer />
    </main>
  );
}

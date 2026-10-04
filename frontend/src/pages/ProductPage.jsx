import { useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { ArrowUpRight, ArrowLeft, Check } from "lucide-react";
import { getProduct } from "@/data/products";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal, MaskedLine } from "@/components/Reveal";

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProduct(slug);

  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [slug]);

  if (!product) return <Navigate to="/products" replace />;

  const requestDemo = () =>
    navigate("/#contact", { state: { product: product.name } });

  return (
    <main className="bg-white" data-testid={`product-page-${slug}`}>
      <Nav />

      <section className="border-b border-line pt-16">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 pb-16 pt-16 lg:grid-cols-12 lg:px-12 lg:pt-24">
          <div className="lg:col-span-7">
            <button
              data-testid="product-back-link"
              onClick={() => navigate("/products")}
              className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 transition-colors duration-200 hover:text-brand"
            >
              <ArrowLeft className="h-4 w-4" /> All products
            </button>
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              <span className="h-px w-10 bg-brand" /> Product — {product.industry}
            </p>
            <h1 className="font-display text-5xl font-bold leading-[0.98] tracking-[-0.01em] text-ink sm:text-6xl lg:text-7xl">
              <MaskedLine delay={0.1}>{product.name}</MaskedLine>
            </h1>
            <p className="mt-4 font-display text-2xl font-medium tracking-tight text-brand sm:text-3xl" data-testid="product-tagline">
              {product.tagline}
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg" data-testid="product-description">
              {product.description}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                data-testid="product-demo-button"
                onClick={requestDemo}
                className="group flex items-center gap-2 bg-ink px-7 py-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand"
              >
                Request a demo
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button
                data-testid="product-industry-link"
                onClick={() => navigate(`/industries/${product.industrySlug}`)}
                className="group flex items-center gap-2 border border-ink px-7 py-4 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-ink hover:text-white"
              >
                Explore {product.industry}
              </button>
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <Reveal delay={0.2}>
              <div className="absolute -left-4 -top-4 h-full w-full border border-brand" />
              <div className="relative aspect-[4/3] overflow-hidden border border-line bg-paper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  data-testid="product-image"
                />
                <span className="absolute left-4 top-4 bg-ink px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white">
                  {product.name}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32" data-testid="product-features">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              <span className="h-px w-10 bg-brand" /> Key Capabilities
            </p>
            <h2 className="max-w-3xl font-display text-4xl font-bold tracking-[-0.01em] text-ink sm:text-5xl">
              What {product.name} does.
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
            {product.features.map((f, i) => (
              <Reveal key={f} delay={i * 0.05} className="bg-white">
                <div className="flex h-full items-start gap-4 p-6 lg:p-8" data-testid={`product-feature-${i + 1}`}>
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-brand">
                    <Check className="h-4 w-4 text-white" />
                  </span>
                  <p className="text-sm leading-relaxed text-slate-700 md:text-base">{f}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800 bg-ink py-24 text-white" data-testid="product-cta-band">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-8 px-6 lg:flex-row lg:items-end lg:justify-between lg:px-12">
          <Reveal>
            <h2 className="max-w-2xl font-display text-4xl font-bold tracking-[-0.01em] sm:text-5xl">
              See {product.name} in action.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
              Book a demo and we will walk you through {product.name} with your
              own use case in mind — an engineer, not a sales rep, will host it.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <button
              data-testid="product-bottom-demo-button"
              onClick={requestDemo}
              className="group flex items-center gap-2 bg-white px-7 py-4 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-brand hover:text-white"
            >
              Request a demo
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}

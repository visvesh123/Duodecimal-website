import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal, MaskedLine } from "@/components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Clients() {
  const [stories, setStories] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    axios
      .get(`${API}/stories`)
      .then(({ data }) => setStories(data))
      .catch(() => setStories([]));
  }, []);

  return (
    <main className="bg-white" data-testid="clients-page">
      <Nav />
      <section className="border-b border-line pt-16">
        <div className="mx-auto max-w-[1440px] px-6 pb-16 pt-16 lg:px-12 lg:pt-24">
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            <span className="h-px w-10 bg-brand" /> Our Clients
          </p>
          <h1 className="font-display text-5xl font-bold leading-[0.98] tracking-[-0.01em] text-ink sm:text-6xl lg:text-7xl">
            <MaskedLine delay={0.1}>Client stories.</MaskedLine>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
            Real engagements, real numbers. How enterprises use Duodecimal to
            solve the problems their business depends on.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          {stories === null ? (
            <p className="py-20 text-center text-sm text-slate-500" data-testid="clients-loading">
              Loading stories…
            </p>
          ) : stories.length === 0 ? (
            <p className="py-20 text-center text-sm text-slate-500" data-testid="clients-empty">
              No client stories yet. Check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
              {stories.map((s, i) => (
                <Reveal key={s.id} delay={i * 0.05} className="bg-white">
                  <article
                    className="group flex h-full cursor-pointer flex-col"
                    onClick={() => navigate(`/clients/${s.slug}`)}
                    data-testid={`client-card-${i + 1}`}
                  >
                    {s.cover && (
                      <div className="relative h-52 overflow-hidden border-b border-line">
                        <img
                          src={s.cover}
                          alt={s.client}
                          className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                        />
                        <span className="absolute left-4 top-4 bg-ink px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white">
                          {s.client}
                        </span>
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-8">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        {s.industry}
                      </p>
                      <h2 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight text-ink transition-colors duration-200 group-hover:text-brand">
                        {s.title}
                      </h2>
                      {s.metric && (
                        <p className="mt-6 font-display text-4xl font-bold tracking-tight text-brand">
                          {s.metric}
                          <span className="ml-2 align-middle font-sans text-sm font-medium text-slate-600">
                            {s.metric_label}
                          </span>
                        </p>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}

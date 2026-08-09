import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, ArrowUpRight, Check, Quote } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MaskedLine, Reveal } from "@/components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ClientStory() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    setStory(null);
    setNotFound(false);
    axios
      .get(`${API}/stories/${slug}`)
      .then(({ data }) => setStory(data))
      .catch(() => setNotFound(true));
  }, [slug]);

  return (
    <main className="bg-white" data-testid="client-story-page">
      <Nav />
      <section className="pt-16">
        <div className="mx-auto max-w-[1440px] px-6 pt-16 lg:px-12 lg:pt-24">
          <button
            data-testid="story-back-link"
            onClick={() => navigate("/clients")}
            className="mb-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 transition-colors duration-200 hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" /> All client stories
          </button>

          {notFound ? (
            <div className="pb-24" data-testid="story-not-found">
              <h1 className="font-display text-4xl font-bold tracking-tight text-ink">
                Story not found.
              </h1>
              <p className="mt-4 text-sm text-slate-600">
                It may have been removed. Head back to see all client stories.
              </p>
            </div>
          ) : story === null ? (
            <p className="py-20 text-center text-sm text-slate-500" data-testid="story-loading">
              Loading story…
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-12 pb-16 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                    <span className="h-px w-10 bg-brand" /> Client Story — {story.industry}
                  </p>
                  <h1 className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.01em] text-ink sm:text-5xl lg:text-6xl">
                    <MaskedLine delay={0.1}>{story.title}</MaskedLine>
                  </h1>
                  {story.excerpt && (
                    <p className="mt-8 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg" data-testid="story-excerpt">
                      {story.excerpt}
                    </p>
                  )}
                </div>
                <div className="lg:col-span-4">
                  <Reveal delay={0.2}>
                    <div className="border border-line bg-paper p-8" data-testid="story-facts">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Client</p>
                      <p className="mt-1 font-display text-2xl font-bold tracking-tight text-ink">
                        {story.client}
                      </p>
                      <p className="mt-6 text-xs uppercase tracking-[0.2em] text-slate-500">Industry</p>
                      <p className="mt-1 text-sm font-medium text-ink">{story.industry}</p>
                      {story.metric && (
                        <>
                          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-slate-500">Headline result</p>
                          <p className="mt-1 font-display text-4xl font-bold tracking-tight text-brand">
                            {story.metric}
                          </p>
                          <p className="text-sm text-slate-600">{story.metric_label}</p>
                        </>
                      )}
                    </div>
                  </Reveal>
                </div>
              </div>

              {story.cover && (
                <Reveal delay={0.1}>
                  <div className="overflow-hidden border border-line">
                    <img src={story.cover} alt={story.client} className="max-h-[480px] w-full object-cover" data-testid="story-cover" />
                  </div>
                </Reveal>
              )}

              <div className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-12 lg:py-24">
                <div className="lg:col-span-6" data-testid="story-challenge">
                  <Reveal>
                    <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                      <span className="h-px w-10 bg-brand" /> Business Challenge
                    </p>
                    <p className="text-base leading-relaxed text-slate-700">{story.challenge}</p>
                  </Reveal>
                </div>
                <div className="lg:col-span-6" data-testid="story-solution">
                  <Reveal delay={0.1}>
                    <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                      <span className="h-px w-10 bg-brand" /> Solution
                    </p>
                    <p className="text-base leading-relaxed text-slate-700">{story.solution}</p>
                  </Reveal>
                </div>
                {story.results?.length > 0 && (
                  <div className="lg:col-span-12" data-testid="story-results">
                    <Reveal>
                      <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                        <span className="h-px w-10 bg-brand" /> Results & Benefits
                      </p>
                      <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
                        {story.results.map((r, i) => (
                          <div key={i} className="flex items-start gap-4 bg-white p-6" data-testid={`story-result-${i + 1}`}>
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-brand">
                              <Check className="h-4 w-4 text-white" />
                            </span>
                            <p className="text-sm leading-relaxed text-slate-700">{r}</p>
                          </div>
                        ))}
                      </div>
                    </Reveal>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {story?.quote && (
          <section className="border-t border-slate-800 bg-ink py-24 text-white" data-testid="story-quote">
            <div className="mx-auto max-w-[900px] px-6">
              <Reveal>
                <Quote className="h-8 w-8 text-brand" strokeWidth={1.5} />
                <blockquote className="mt-8 font-display text-2xl font-medium leading-snug sm:text-3xl lg:text-4xl">
                  {story.quote}
                </blockquote>
                <footer className="mt-8 border-t border-slate-800 pt-6">
                  <p className="text-sm font-semibold">{story.quote_author}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                    {story.quote_role}
                  </p>
                </footer>
              </Reveal>
            </div>
          </section>
        )}

        {story && (
          <section className="border-t border-line py-24" data-testid="story-cta">
            <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-8 px-6 lg:flex-row lg:items-end lg:justify-between lg:px-12">
              <Reveal>
                <h2 className="max-w-2xl font-display text-4xl font-bold tracking-[-0.01em] text-ink sm:text-5xl">
                  Your story could be next.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
                  Tell us about the problem you are solving. A senior engineer
                  will respond within one business day.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <button
                  data-testid="story-cta-button"
                  onClick={() => navigate("/#contact")}
                  className="group flex items-center gap-2 bg-ink px-7 py-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand"
                >
                  Start a project
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </Reveal>
            </div>
          </section>
        )}
      </section>
      <Footer />
    </main>
  );
}

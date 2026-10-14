import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const CaseStudies = () => {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/stories`)
      .then(({ data }) => setStories(data.slice(0, 3)))
      .catch(() => {});
  }, []);

  if (!stories.length) return null;

  return (
  <section id="work" className="border-t border-line bg-ink py-24 text-white lg:py-32" data-testid="case-studies-section">
    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-3xl font-display text-4xl font-bold tracking-[-0.01em] sm:text-5xl lg:text-6xl">
            Proof, not promises.
          </h2>
          <button
            data-testid="case-studies-view-all"
            onClick={() => navigate("/clients")}
            className="group flex items-center gap-2 text-sm font-semibold text-white"
          >
            <span className="border-b border-white pb-0.5 transition-colors duration-200 group-hover:border-brand group-hover:text-brand">
              All client stories
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-px border border-slate-800 bg-slate-800 lg:grid-cols-3">
        {stories.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.08} className="bg-ink">
            <article
              className="spotlight group flex h-full cursor-pointer flex-col"
              onClick={() => navigate(`/clients/${s.slug}`)}
              data-testid={`case-study-${i + 1}`}
            >
              <div className="relative h-56 overflow-hidden border-b border-slate-800">
                <img
                  src={s.cover}
                  alt={s.client}
                  className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <span className="absolute left-4 top-4 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-ink">
                  {s.client}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  {s.industry}
                </p>
                <p className="mt-6 font-display text-5xl font-bold tracking-tight text-brand">
                  {s.metric}
                </p>
                <p className="mt-1 text-sm font-medium text-white">{s.metric_label}</p>
                <p className="mt-6 flex-1 text-sm leading-relaxed text-slate-400">
                  {s.excerpt}
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
};

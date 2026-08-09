import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const Insights = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/posts`)
      .then(({ data }) => setPosts(data.slice(0, 3)))
      .catch(() => {});
  }, []);

  if (!posts.length) return null;

  return (
    <section className="border-t border-line py-24 lg:py-32" data-testid="insights-section">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                <span className="h-px w-10 bg-brand" /> Insights
              </p>
              <h2 className="font-display text-4xl font-bold tracking-[-0.01em] text-ink sm:text-5xl lg:text-6xl">
                From the journal.
              </h2>
            </div>
            <button
              data-testid="insights-view-all"
              onClick={() => navigate("/blog")}
              className="group flex items-center gap-2 text-sm font-semibold text-ink"
            >
              <span className="border-b border-ink pb-0.5 transition-colors duration-200 group-hover:border-brand group-hover:text-brand">
                All articles
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08} className="bg-white">
              <article
                className="group flex h-full cursor-pointer flex-col"
                onClick={() => navigate(`/blog/${p.slug}`)}
                data-testid={`insight-card-${i + 1}`}
              >
                {p.cover && (
                  <div className="h-48 overflow-hidden border-b border-line">
                    <img
                      src={p.cover}
                      alt={p.title}
                      className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    {new Date(p.created_at).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <h3 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight text-ink transition-colors duration-200 group-hover:text-brand">
                    {p.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                    {p.excerpt}
                  </p>
                  <span className="mt-6 flex items-center gap-2 text-sm font-semibold text-ink">
                    <span className="border-b border-ink pb-0.5 transition-colors duration-200 group-hover:border-brand group-hover:text-brand">
                      Read article
                    </span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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

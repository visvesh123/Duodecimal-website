import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal, MaskedLine } from "@/components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Blog() {
  const [posts, setPosts] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    axios
      .get(`${API}/posts`)
      .then(({ data }) => setPosts(data))
      .catch(() => setPosts([]));
  }, []);

  return (
    <main className="bg-white" data-testid="blog-page">
      <Nav />
      <section className="border-b border-line pt-16">
        <div className="mx-auto max-w-[1440px] px-6 pb-16 pt-16 lg:px-12 lg:pt-24">
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            <span className="h-px w-10 bg-brand" /> Insights
          </p>
          <h1 className="font-display text-5xl font-bold leading-[0.98] tracking-[-0.01em] text-ink sm:text-6xl lg:text-7xl">
            <MaskedLine delay={0.1}>The journal.</MaskedLine>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
            Notes on engineering, data and building software that enterprises
            stake their operations on.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          {posts === null ? (
            <p className="py-20 text-center text-sm text-slate-500" data-testid="blog-loading">
              Loading articles…
            </p>
          ) : posts.length === 0 ? (
            <p className="py-20 text-center text-sm text-slate-500" data-testid="blog-empty">
              No articles yet. Check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.05} className="bg-white">
                  <article
                    className="group flex h-full cursor-pointer flex-col"
                    onClick={() => navigate(`/blog/${p.slug}`)}
                    data-testid={`blog-card-${i + 1}`}
                  >
                    {p.cover && (
                      <div className="h-52 overflow-hidden border-b border-line">
                        <img
                          src={p.cover}
                          alt={p.title}
                          className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-8">
                      <div className="flex flex-wrap gap-2">
                        {p.tags?.map((t) => (
                          <span key={t} className="border border-line px-2.5 py-1 text-xs font-medium text-slate-500">
                            {t}
                          </span>
                        ))}
                      </div>
                      <h2 className="mt-5 font-display text-2xl font-bold leading-tight tracking-tight text-ink transition-colors duration-200 group-hover:text-brand">
                        {p.title}
                      </h2>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                        {p.excerpt}
                      </p>
                      <p className="mt-6 text-xs uppercase tracking-[0.2em] text-slate-500">
                        {new Date(p.created_at).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        · {p.author}
                      </p>
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

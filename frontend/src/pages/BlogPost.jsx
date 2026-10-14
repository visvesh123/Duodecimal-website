import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MaskedLine, Reveal } from "@/components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    setPost(null);
    setNotFound(false);
    axios
      .get(`${API}/posts/${slug}`)
      .then(({ data }) => setPost(data))
      .catch(() => setNotFound(true));
  }, [slug]);

  return (
    <main className="bg-white" data-testid="blog-post-page">
      <Nav />
      <section className="pt-16">
        <div className="mx-auto max-w-[900px] px-6 pb-16 pt-16 lg:pt-24">
          <button
            data-testid="blog-back-link"
            onClick={() => navigate("/blog")}
            className="mb-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 transition-colors duration-200 hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" /> All articles
          </button>

          {notFound ? (
            <div data-testid="blog-not-found">
              <h1 className="font-display text-4xl font-bold tracking-tight text-ink">
                Article not found.
              </h1>
              <p className="mt-4 text-sm text-slate-600">
                It may have been removed. Head back to the journal for more.
              </p>
            </div>
          ) : post === null ? (
            <p className="py-20 text-center text-sm text-slate-500" data-testid="blog-post-loading">
              Loading article…
            </p>
          ) : (
            <article>
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((t) => (
                  <span key={t} className="border border-line px-2.5 py-1 text-xs font-medium text-slate-500">
                    {t}
                  </span>
                ))}
              </div>
              <h1 className="mt-6 font-display text-4xl font-bold leading-[1.02] tracking-[-0.01em] text-ink sm:text-5xl">
                <MaskedLine delay={0.1}>{post.title}</MaskedLine>
              </h1>
              <p className="mt-6 text-xs uppercase tracking-[0.2em] text-slate-500" data-testid="blog-post-meta">
                {new Date(post.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                · {post.author}
              </p>
              {post.cover && (
                <Reveal delay={0.15}>
                  <div className="mt-10 overflow-hidden border border-line">
                    <img src={post.cover} alt={post.title} className="w-full object-cover" data-testid="blog-post-cover" />
                  </div>
                </Reveal>
              )}
              <div className="mt-12 space-y-6" data-testid="blog-post-content">
                {post.content.split("\n\n").map((para, i) => (
                  <p key={i} className="text-base leading-relaxed text-slate-700">
                    {para}
                  </p>
                ))}
              </div>
              <div className="mt-16 border border-line bg-paper p-8 lg:p-10">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Building something similar?
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-600">
                  Tell us about the problem you are solving. A senior engineer
                  will respond within one business day.
                </p>
              </div>
            </article>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}

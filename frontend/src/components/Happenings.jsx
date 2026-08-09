import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const Happenings = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/happenings`)
      .then(({ data }) => setItems(data))
      .catch(() => {});
  }, []);

  if (!items.length) return null;

  return (
    <section className="border-t border-line bg-paper py-24 lg:py-32" data-testid="happenings-section">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <Reveal>
          <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            <span className="h-px w-10 bg-brand" /> Happenings
          </p>
          <h2 className="max-w-3xl font-display text-4xl font-bold tracking-[-0.01em] text-ink sm:text-5xl lg:text-6xl">
            Life at Duodecimal.
          </h2>
        </Reveal>

        <div className="mt-16 border-t border-line">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05}>
              <div
                className="grid grid-cols-1 gap-4 border-b border-line py-8 md:grid-cols-12 md:items-center"
                data-testid={`happening-${i + 1}`}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 md:col-span-2">
                  {new Date(item.created_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <div className="md:col-span-8">
                  <h3 className="font-display text-xl font-bold tracking-tight text-ink lg:text-2xl">
                    {item.title}
                  </h3>
                  {item.excerpt && (
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                      {item.excerpt}
                    </p>
                  )}
                </div>
                {item.link && (
                  <div className="md:col-span-2 md:text-right">
                    <a
                      data-testid={`happening-link-${i + 1}`}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-sm font-semibold text-ink"
                    >
                      <span className="border-b border-ink pb-0.5 transition-colors duration-200 group-hover:border-brand group-hover:text-brand">
                        View post
                      </span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

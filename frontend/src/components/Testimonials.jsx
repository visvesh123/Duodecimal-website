import { Quote } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const testimonials = [
  {
    quote:
      "Duodecimal rebuilt our core platform while the plane was in the air. Not one minute of downtime, not one missed milestone in eighteen months.",
    name: "Elena Marsh",
    role: "CTO, Meridian Bank",
    img: "https://images.pexels.com/photos/27086922/pexels-photo-27086922.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    quote:
      "They are the rare partner that tells you what you need to hear, not what you want to hear. Our board now asks for them by name.",
    name: "David Okafor",
    role: "CEO, Atlas Freight",
    img: "https://images.pexels.com/photos/9623645/pexels-photo-9623645.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    quote:
      "The engineering rigor is unmatched. Every deliverable arrived documented, tested and measured against the outcomes we agreed on day one.",
    name: "Priya Raman",
    role: "VP Product, Northwind Health",
    img: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?q=80&w=400&auto=format&fit=crop",
  },
];

export const Testimonials = () => (
  <section className="border-t border-line py-24 lg:py-32" data-testid="testimonials-section">
    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
      <Reveal>
        <h2 className="max-w-3xl font-display text-4xl font-bold tracking-[-0.01em] text-ink sm:text-5xl lg:text-6xl">
          Trusted by the people who sign the checks.
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08} className="bg-white">
            <figure className="spotlight flex h-full flex-col p-8 lg:p-10" data-testid={`testimonial-${i + 1}`}>
              <Quote className="h-6 w-6 text-brand" strokeWidth={1.5} />
              <blockquote className="mt-6 flex-1 text-base leading-relaxed text-ink">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                <img
                  src={t.img}
                  alt={t.name}
                  className="h-12 w-12 border border-line object-cover grayscale"
                />
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs uppercase tracking-[0.15em] text-slate-500">
                    {t.role}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

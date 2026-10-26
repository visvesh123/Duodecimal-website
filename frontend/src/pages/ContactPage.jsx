import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const EMAIL = "founders@duodecimal.in";

const linkCls = "text-brand underline-offset-4 hover:underline";

const faqs = [
  {
    q: "How is my data used?",
    a: (
      <>
        We take your privacy seriously. See our{" "}
        <a href="/privacy-policy" className={linkCls}>
          Privacy Policy
        </a>{" "}
        for details.
      </>
    ),
  },
  {
    q: "I found a bug or have a feature idea.",
    a: (
      <>
        We’d love to hear it. Email us at{" "}
        <a href={`mailto:${EMAIL}`} className={linkCls}>
          {EMAIL}
        </a>
        , with a screenshot if possible.
      </>
    ),
  },
];

export default function ContactPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    document.title = "Contact · Duodecimal";
  }, []);

  return (
    <main className="bg-white" data-testid="contact-page">
      <Nav />
      <section className="pt-16">
        <div className="mx-auto max-w-[900px] px-6 pb-24 pt-16 lg:pt-24">
          <button
            data-testid="contact-back-link"
            onClick={() => navigate("/")}
            className="mb-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 transition-colors duration-200 hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" /> Home
          </button>

          <h1 className="font-display text-5xl font-bold leading-[0.98] tracking-[-0.01em] text-ink sm:text-6xl">
            Contact
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-700">
            Questions, feedback or need help with any of our products and services? Get in touch and we’ll get back to you within 48 hours.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 border-t border-line pt-8 sm:grid-cols-2" data-testid="contact-details">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Email</p>
              <a href={`mailto:${EMAIL}`} className="mt-1 inline-block text-base font-medium text-ink hover:text-brand">
                {EMAIL}
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Address</p>
              <p className="mt-1 text-base font-medium text-ink">Hyderabad, Telangana, India</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Response time</p>
              <p className="mt-1 text-base font-medium text-ink">Within 48 hours</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Hours</p>
              <p className="mt-1 text-base font-medium text-ink">Monday to Friday, 10:00 to 18:00 IST</p>
            </div>
          </div>

          <div className="mt-16" data-testid="contact-faqs">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">FAQs</h2>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {faqs.map((f) => (
                <div key={f.q} className="py-6">
                  <dt className="text-base font-semibold text-ink">{f.q}</dt>
                  <dd className="mt-2 text-base leading-relaxed text-slate-700">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

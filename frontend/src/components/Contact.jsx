import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const serviceOptions = [
  "Custom Software Development",
  "Web & Mobile Apps",
  "Cloud & DevOps",
  "AI / ML",
  "UI/UX Design",
  "Technology Consulting",
  "Other",
];

const inputCls =
  "w-full border border-line bg-white px-4 py-3.5 text-sm text-ink outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-brand";

export const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: serviceOptions[0],
    message: "",
  });
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post(`${API}/enquiries`, form);
      toast.success("Enquiry received. Our team will respond within one business day.");
      setForm({ name: "", email: "", company: "", service: serviceOptions[0], message: "" });
    } catch (err) {
      const detail = err.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Could not send your enquiry. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="border-t border-line bg-paper py-24 lg:py-32" data-testid="contact-section">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              <span className="h-px w-10 bg-brand" /> Contact
            </p>
            <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.01em] text-ink sm:text-5xl lg:text-6xl">
              Let's build something that lasts.
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-slate-600">
              Tell us about the problem you are solving. A senior engineer —
              not a sales rep — will respond within one business day.
            </p>
            <div className="mt-12 space-y-6 border-t border-line pt-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Email</p>
                <p className="mt-1 text-sm font-medium text-ink">hello@duodecimal.tech</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Studios</p>
                <p className="mt-1 text-sm font-medium text-ink">
                  London · Bengaluru · Toronto
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <form
            onSubmit={submit}
            className="border border-line bg-white p-8 lg:p-12"
            data-testid="contact-form"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                  Name *
                </label>
                <input
                  id="contact-name"
                  data-testid="contact-name-input"
                  required
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Jane Cooper"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                  Work email *
                </label>
                <input
                  id="contact-email"
                  data-testid="contact-email-input"
                  required
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="jane@company.com"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="contact-company" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                  Company
                </label>
                <input
                  id="contact-company"
                  data-testid="contact-company-input"
                  value={form.company}
                  onChange={set("company")}
                  placeholder="Acme Corp"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="contact-service" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                  Service needed
                </label>
                <select
                  id="contact-service"
                  data-testid="contact-service-select"
                  value={form.service}
                  onChange={set("service")}
                  className={inputCls}
                >
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="contact-message" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                  Project details *
                </label>
                <textarea
                  id="contact-message"
                  data-testid="contact-message-input"
                  required
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="What are you building, and what does success look like?"
                  className={`${inputCls} resize-none`}
                />
              </div>
            </div>
            <button
              data-testid="contact-submit-button"
              type="submit"
              disabled={sending}
              className="group mt-8 flex items-center gap-2 bg-ink px-8 py-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand disabled:opacity-60"
            >
              {sending ? (
                <>
                  Sending
                  <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  Send enquiry
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

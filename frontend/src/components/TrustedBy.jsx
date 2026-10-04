import { industries } from "@/data/industries";
import { Reveal } from "@/components/Reveal";

const clients = industries.flatMap((i) => i.clients?.slice(0, 2) ?? []);

export const TrustedBy = () => (
  <section className="border-b border-line bg-white py-16 lg:py-20" data-testid="trusted-by-section">
    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
      <Reveal>
        <p className="mb-10 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
          <span className="h-px w-10 bg-brand" /> Clients who trust us
        </p>
      </Reveal>
      <div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4 lg:grid-cols-8">
        {clients.map((c, i) => (
          <Reveal key={c} delay={i * 0.03} className="bg-white">
            <div
              className="flex h-full items-center justify-center px-4 py-8"
              data-testid={`trusted-client-${i + 1}`}
            >
              <span className="text-center font-display text-base font-semibold uppercase tracking-wide text-slate-400 transition-colors duration-200 hover:text-ink">
                {c}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

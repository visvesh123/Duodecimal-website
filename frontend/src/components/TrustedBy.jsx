import Marquee from "react-fast-marquee";
import { Asterisk } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const clients = [
  { name: "Mahindra University", logo: null },
  { name: "Dormakaba", logo: "/clients/dormakaba.svg" },
  { name: "Deccan Tobacco", logo: "/clients/deccan-tobacco.svg" },
  { name: "EMSE", logo: null },
  { name: "Murugappa", logo: "/clients/murugappa.svg" },
];

export const TrustedBy = () => (
  <section className="border-b border-line bg-white py-14 lg:py-16" data-testid="trusted-by-section">
    <div className="mx-auto mb-10 max-w-[1440px] px-6 lg:px-12">
      <Reveal>
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
          <span className="h-px w-10 bg-brand" /> Clients who trust us
        </p>
      </Reveal>
    </div>
    <Marquee speed={30} gradient={false} pauseOnHover>
      {[...clients, ...clients].map((c, i) => (
        <span key={i} className="flex items-center">
          <span className="mx-12 flex items-center">
            {c.logo ? (
              <img
                src={c.logo}
                alt={c.name}
                className="h-9 w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-10"
              />
            ) : (
              <span className="font-display text-2xl font-semibold uppercase tracking-wide text-slate-300 transition-colors duration-200 hover:text-ink md:text-3xl">
                {c.name}
              </span>
            )}
          </span>
          <Asterisk className="h-6 w-6 text-brand" strokeWidth={1.5} />
        </span>
      ))}
    </Marquee>
  </section>
);

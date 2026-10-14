import Marquee from "react-fast-marquee";
import { Asterisk } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const clients = [
  { name: "Mahindra University", logo: "/clients/mahindra-university.png" },
  { name: "Dormakaba", logo: "/clients/dormakaba.png" },
  { name: "Deccan Tobacco", logo: "/clients/deccan-tobacco.svg" },
  { name: "EMSE", logo: "/clients/emse.png" },
  { name: "Murugappa", logo: "/clients/murugappa.svg" },
];

export const TrustedBy = () => (
  <section className="border-t border-line bg-white py-24 lg:py-32" data-testid="trusted-by-section">
    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
      <Reveal>
        <h2 className="max-w-3xl font-display text-4xl font-bold tracking-[-0.01em] text-ink sm:text-5xl lg:text-6xl">
          Trusted by.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
          Operators who run factories, campuses and airports. We build. They keep it running.
        </p>
      </Reveal>
    </div>
    <div className="mt-16">
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
    </div>
  </section>
);

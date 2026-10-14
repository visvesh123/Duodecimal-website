import Marquee from "react-fast-marquee";
import { Asterisk } from "lucide-react";

const items = [
  "Data Platforms",
  "Cloud-Native",
  "Enterprise AI",
  "Generative AI",
  "Computer Vision",
  "Real-Time Analytics",
  "Digital Twins",
];

export const EditorialMarquee = () => (
  <section className="border-y border-line bg-paper py-12" data-testid="editorial-marquee">
    <Marquee speed={35} gradient={false} pauseOnHover>
      {items.map((item, i) => (
        <span key={item} className="flex items-center">
          <span
            className={`mx-10 font-display text-4xl font-semibold uppercase tracking-tight transition-colors duration-300 md:text-6xl ${
              i % 2 ? "text-outline-ink hover:text-brand" : "text-ink hover:text-brand"
            }`}
          >
            {item}
          </span>
          <Asterisk className="h-8 w-8 animate-[spin_10s_linear_infinite] text-brand" strokeWidth={1.5} />
        </span>
      ))}
    </Marquee>
  </section>
);

import Marquee from "react-fast-marquee";
import { Asterisk } from "lucide-react";

const items = [
  "Custom Software",
  "Cloud & DevOps",
  "AI / ML",
  "Product Design",
  "Mobile Engineering",
  "Data Platforms",
  "Enterprise Consulting",
];

export const EditorialMarquee = () => (
  <section className="border-y border-line bg-paper py-12" data-testid="editorial-marquee">
    <Marquee speed={35} gradient={false} pauseOnHover>
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="mx-10 font-display text-4xl font-light uppercase tracking-tight text-slate-300 md:text-6xl">
            {item}
          </span>
          <Asterisk className="h-8 w-8 text-brand" strokeWidth={1.5} />
        </span>
      ))}
    </Marquee>
  </section>
);

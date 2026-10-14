import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { MaskedLine } from "@/components/Reveal";
import { scrollToSection } from "@/components/Nav";

const HERO_IMG =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400&auto=format&fit=crop";

const stats = [
  { value: "Data + AI", label: "Engineering that ships" },
  { value: "Embedded", label: "Engineers with your team" },
  { value: "End to end", label: "First idea to live system" },
  { value: "Owned", label: "Accountable past launch" },
];

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const reduce = useReducedMotion();

  return (
    <section ref={ref} className="relative isolate overflow-hidden pt-16" data-testid="hero-section">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-grid absolute inset-0" />
        <motion.div
          className="absolute -left-32 top-24 h-[420px] w-[420px] rounded-full bg-brand/20 blur-[120px]"
          animate={reduce ? undefined : { x: [0, 80, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-0 top-0 h-[360px] w-[360px] rounded-full bg-brandlight/20 blur-[120px]"
          animate={reduce ? undefined : { x: [0, -60, 0], y: [0, 60, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 pb-16 pt-16 lg:grid-cols-12 lg:px-12 lg:pt-24">
        <div className="lg:col-span-7">
          <h1 className="font-display text-5xl font-bold leading-[0.98] tracking-[-0.03em] text-ink sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            <MaskedLine delay={0.15}>
              We solve what <span className="text-brand">matters.</span>
            </MaskedLine>
            {/* <MaskedLine delay={0.3}>with data, AI, and engineering.</MaskedLine> */}
            {/* <MaskedLine delay={0.45} className="text-brand">
              base twelve.
            </MaskedLine> */}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg"
            data-testid="hero-subcopy"
          >
            We help enterprises build better technology, then keep building it better. Custom software, cloud, data, and AI, taken from first idea to a system that grows with you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              data-testid="hero-cta-secondary"
              onClick={() => scrollToSection("#services")}
              className="group flex items-center gap-2 border border-ink px-7 py-4 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-ink hover:text-white"
            >
              Explore capabilities
              <ArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
            </button>
          </motion.div>
        </div>

        <div className="relative lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -left-4 -top-4 h-full w-full border border-brand" />
            <div className="relative aspect-[4/5] overflow-hidden border border-line bg-paper">
              <motion.img
                src={HERO_IMG}
                alt="Enterprise architecture — Duodecimal"
                style={{ y: imgY }}
                className="h-[115%] w-full object-cover"
                data-testid="hero-image"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              className="absolute -bottom-6 -left-6 border border-line bg-white px-6 py-4"
              data-testid="hero-floating-stat"
            >
              <p className="font-display text-3xl font-bold text-ink">Always on</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Platforms we run and keep
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mx-auto max-w-[1440px] px-6 lg:px-12"
      >
        <div className="grid grid-cols-2 border-l border-t border-line md:grid-cols-4" data-testid="hero-stats">
          {stats.map((s, i) => (
            <div key={s.label} className="spotlight border-b border-r border-line bg-white/60 px-6 py-8 backdrop-blur-sm">
              <p className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

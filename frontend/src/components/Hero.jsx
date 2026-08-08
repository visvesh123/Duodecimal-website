import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { MaskedLine } from "@/components/Reveal";
import { scrollToSection } from "@/components/Nav";

const HERO_IMG =
  "https://images.pexels.com/photos/20697911/pexels-photo-20697911.png?auto=compress&cs=tinysrgb&w=1200";

const stats = [
  { value: "12+", label: "Years engineering" },
  { value: "120+", label: "Engineers & designers" },
  { value: "60+", label: "Products shipped" },
  { value: "24", label: "Countries served" },
];

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-16" data-testid="hero-section">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 pb-16 pt-16 lg:grid-cols-12 lg:px-12 lg:pt-24">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500"
            data-testid="hero-eyebrow"
          >
            <span className="h-px w-10 bg-brand" />
            Software Development Consultancy
          </motion.p>

          <h1 className="font-display text-5xl font-bold leading-[0.98] tracking-[-0.03em] text-ink sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            <MaskedLine delay={0.15}>Enterprise software,</MaskedLine>
            <MaskedLine delay={0.3}>engineered in</MaskedLine>
            <MaskedLine delay={0.45} className="text-brand">
              base twelve.
            </MaskedLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg"
            data-testid="hero-subcopy"
          >
            Duodecimal designs and builds mission-critical software for enterprises
            that cannot afford to fail — custom platforms, cloud, AI and product
            engineering delivered with duodecimal precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              data-testid="hero-cta-primary"
              onClick={() => scrollToSection("#contact")}
              className="group flex items-center gap-2 bg-ink px-7 py-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
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
                alt="Abstract architectural glass — Duodecimal"
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
              <p className="font-display text-3xl font-bold text-ink">99.99%</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Uptime across managed platforms
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
          {stats.map((s) => (
            <div key={s.label} className="border-b border-r border-line px-6 py-8">
              <p className="font-display text-4xl font-bold tracking-tight text-ink">
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

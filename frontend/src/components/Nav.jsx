import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { industries } from "@/data/industries";

const links = [
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "About", href: "#about" },
  { label: "Products", href: "/products" },
];

export const scrollToSection = (href) => {
  if (window.__lenis) {
    window.__lenis.scrollTo(href, { offset: -64 });
  } else {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }
};

export const Nav = () => {
  const [open, setOpen] = useState(false);
  const [indOpen, setIndOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  const goIndustry = (slug) => {
    setIndOpen(false);
    setOpen(false);
    navigate(`/industries/${slug}`);
  };

  const go = (href) => {
    setOpen(false);
    if (href.startsWith("/")) {
      navigate(href);
      return;
    }
    if (location.pathname !== "/") {
      navigate("/" + href);
    } else {
      scrollToSection(href);
    }
  };

  const goHome = () => {
    if (location.pathname !== "/") navigate("/");
    else window.__lenis?.scrollTo(0);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-white/70 backdrop-blur-xl">
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute -bottom-px left-0 right-0 h-0.5 origin-left bg-brand"
        data-testid="scroll-progress"
      />
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:px-12">
        <button
          data-testid="nav-logo"
          onClick={goHome}
          className="flex items-center"
        >
          <img src="/logo.png" alt="Duodecimal" className="h-10 w-auto" />
        </button>

        <nav className="hidden items-center gap-10 lg:flex">
          {links.map((l) =>
            l.label === "Industries" ? (
              <div
                key={l.href}
                className="relative"
                onMouseEnter={() => setIndOpen(true)}
                onMouseLeave={() => setIndOpen(false)}
              >
                <button
                  data-testid="nav-link-industries"
                  onClick={() => go(l.href)}
                  className="relative flex items-center gap-1 text-sm font-medium text-slate-600 transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100"
                >
                  Industries
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${indOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {indOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-1/2 top-full -translate-x-1/2 pt-4"
                      data-testid="nav-industries-dropdown"
                    >
                      <div className="grid w-[540px] grid-cols-2 gap-px border border-line bg-line">
                        {industries.map((ind) => (
                          <button
                            key={ind.slug}
                            data-testid={`nav-industry-${ind.slug}`}
                            onClick={() => goIndustry(ind.slug)}
                            className="group flex items-baseline gap-3 bg-white px-5 py-4 text-left transition-colors duration-200 hover:bg-paper last:odd:col-span-2"
                          >
                            <span className="font-display text-xs font-medium text-slate-400">
                              {ind.n}
                            </span>
                            <span className="text-sm font-semibold text-ink transition-colors duration-200 group-hover:text-brand">
                              {ind.title}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                key={l.href}
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                onClick={() => go(l.href)}
                className="relative text-sm font-medium text-slate-600 transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100"
              >
                {l.label}
              </button>
            )
          )}
        </nav>

        <button
          data-testid="nav-mobile-toggle"
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-white lg:hidden">
          {[...links, { label: "Contact", href: "#contact" }].map((l) => (
            <div key={l.href}>
              <button
                data-testid={`nav-mobile-link-${l.label.toLowerCase()}`}
                onClick={() => go(l.href)}
                className="block w-full border-b border-line px-6 py-4 text-left text-base font-medium text-ink"
              >
                {l.label}
              </button>
              {l.label === "Industries" &&
                industries.map((ind) => (
                  <button
                    key={ind.slug}
                    data-testid={`nav-mobile-industry-${ind.slug}`}
                    onClick={() => goIndustry(ind.slug)}
                    className="block w-full border-b border-line bg-paper px-10 py-3 text-left text-sm text-slate-600"
                  >
                    {ind.title}
                  </button>
                ))}
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

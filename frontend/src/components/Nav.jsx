import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
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

  const go = (href) => {
    setOpen(false);
    scrollToSection(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:px-12">
        <button
          data-testid="nav-logo"
          onClick={() => window.__lenis?.scrollTo(0)}
          className="flex items-center"
        >
          <img src="/logo.png" alt="Duodecimal" className="h-7 w-auto" />
        </button>

        <nav className="hidden items-center gap-10 lg:flex">
          {links.map((l) => (
            <button
              key={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              onClick={() => go(l.href)}
              className="text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-ink"
            >
              {l.label}
            </button>
          ))}
          <button
            data-testid="nav-cta-button"
            onClick={() => go("#contact")}
            className="group flex items-center gap-2 bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-brand"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
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
            <button
              key={l.href}
              data-testid={`nav-mobile-link-${l.label.toLowerCase()}`}
              onClick={() => go(l.href)}
              className="block w-full border-b border-line px-6 py-4 text-left text-base font-medium text-ink"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

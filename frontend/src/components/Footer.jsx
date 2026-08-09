import { scrollToSection } from "@/components/Nav";

export const Footer = () => (
  <footer className="border-t border-line bg-white" data-testid="footer">
    <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-12">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <div className="flex items-center">
            <img src="/logo.png" alt="Duodecimal" className="h-9 w-auto" />
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-600">
            Enterprise software, engineered in base twelve. London · Bengaluru ·
            Toronto.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Sitemap
          </p>
          <div className="mt-4 flex flex-col items-start gap-3">
            {["Services", "Industries", "About", "Work", "Contact"].map((l) => (
              <button
                key={l}
                data-testid={`footer-link-${l.toLowerCase()}`}
                onClick={() => scrollToSection(`#${l.toLowerCase()}`)}
                className="text-sm text-slate-600 transition-colors duration-200 hover:text-brand"
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Contact
          </p>
          <p className="mt-4 text-sm text-slate-600">hello@duodecimal.tech</p>
          <a
            data-testid="footer-admin-link"
            href="/admin/login"
            className="mt-3 inline-block text-sm text-slate-400 transition-colors duration-200 hover:text-brand"
          >
            Admin sign in
          </a>
        </div>
      </div>
    </div>
    <div className="overflow-hidden border-t border-line">
      <p className="text-outline whitespace-nowrap text-center font-display text-[18vw] font-black leading-none tracking-tight">
        DUODECIMAL
      </p>
    </div>
    <div className="border-t border-line">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-2 px-6 py-6 text-xs text-slate-500 sm:flex-row sm:items-center lg:px-12">
        <p>© {new Date().getFullYear()} Duodecimal Technologies. All rights reserved.</p>
        <p>Precision in every base.</p>
      </div>
    </div>
  </footer>
);

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const industries = [
  {
    n: "01",
    title: "Fintech & Banking",
    copy: "Core banking modernization, payment rails, fraud detection and regulatory-grade reporting systems built for zero-failure tolerance.",
    tags: ["Payments", "Core banking", "RegTech"],
  },
  {
    n: "02",
    title: "Healthcare & Life Sciences",
    copy: "HIPAA-conscious patient platforms, clinical workflow systems and interoperable data exchange across care networks.",
    tags: ["Patient platforms", "HL7 / FHIR", "Clinical data"],
  },
  {
    n: "03",
    title: "Retail & E-Commerce",
    copy: "Headless commerce, inventory intelligence and personalization engines that convert at enterprise scale.",
    tags: ["Headless commerce", "OMS", "Personalization"],
  },
  {
    n: "04",
    title: "Logistics & Supply Chain",
    copy: "Real-time fleet visibility, route optimization and warehouse automation platforms moving millions of shipments.",
    tags: ["Fleet telematics", "WMS", "Route optimization"],
  },
  {
    n: "05",
    title: "Manufacturing & IoT",
    copy: "Industrial IoT pipelines, digital twins and predictive maintenance systems for the factory floor.",
    tags: ["Digital twins", "Edge computing", "Predictive maintenance"],
  },
  {
    n: "06",
    title: "SaaS & Platforms",
    copy: "Multi-tenant architecture, usage-based billing and platform engineering for product companies scaling past product-market fit.",
    tags: ["Multi-tenancy", "Billing", "Platform engineering"],
  },
];

export const Industries = () => {
  const [open, setOpen] = useState(0);

  return (
    <section id="industries" className="border-t border-line bg-paper py-24 lg:py-32" data-testid="industries-section">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <Reveal>
          <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            <span className="h-px w-10 bg-brand" /> Industries
          </p>
          <h2 className="max-w-3xl font-display text-4xl font-bold tracking-[-0.03em] text-ink sm:text-5xl lg:text-6xl">
            Deep in the domains that run the world.
          </h2>
        </Reveal>

        <div className="mt-16 border-t border-line">
          {industries.map((ind, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={ind.n} delay={i * 0.04}>
                <div className="border-b border-line" data-testid={`industry-item-${ind.n}`}>
                  <button
                    data-testid={`industry-toggle-${ind.n}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group flex w-full items-center justify-between py-6 text-left lg:py-8"
                  >
                    <div className="flex items-baseline gap-6 lg:gap-12">
                      <span className="font-display text-sm font-medium text-slate-400">
                        {ind.n}
                      </span>
                      <span
                        className={`font-display text-2xl font-bold tracking-tight transition-colors duration-200 sm:text-3xl lg:text-4xl ${
                          isOpen ? "text-brand" : "text-ink group-hover:text-brand"
                        }`}
                      >
                        {ind.title}
                      </span>
                    </div>
                    <Plus
                      className={`h-6 w-6 shrink-0 text-slate-400 transition-transform duration-300 ${
                        isOpen ? "rotate-45 text-brand" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-6 pb-8 pl-10 md:grid-cols-2 lg:pl-24">
                          <p className="max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
                            {ind.copy}
                          </p>
                          <div className="flex flex-wrap content-start gap-2">
                            {ind.tags.map((t) => (
                              <span
                                key={t}
                                className="border border-line bg-white px-3 py-1 text-xs font-medium text-slate-500"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

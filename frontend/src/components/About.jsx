import { Reveal } from "@/components/Reveal";

const chapters = [
  {
    n: "01",
    title: "Precision",
    copy: "Twelve is the most divisible number in common use — divisible by two, three, four and six. We named ourselves after it because we believe great software decomposes cleanly: problems split into parts, parts into systems, systems into products that hold together under load.",
  },
  {
    n: "02",
    title: "Partnership",
    copy: "We do not take tickets and disappear. Our engineers embed with your teams, challenge your assumptions and stay accountable past launch day. We stay. So do the systems.",
  },
  {
    n: "03",
    title: "Proof",
    copy: "Deckware is easy. Shipping is hard. We take work to live, then we stay until it holds — in the field, under load, on the days that matter.",
  },
];

export const About = () => (
  <section id="about" className="border-t border-line py-24 lg:py-32" data-testid="about-section">
    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.01em] text-ink sm:text-5xl lg:text-6xl">
              We think in
              <br />
              <span className="text-brand">twelves.</span>
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-slate-600">
              Duodecimal was founded on a simple conviction: enterprise software
              deserves the same craft as the products consumers love. That
              conviction now runs platforms for factories, hospitals, campuses,
              airports and bridges.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative mt-12">
              <div className="absolute -left-3 -top-3 h-full w-full border border-brand" />
              <div className="relative aspect-[4/3] overflow-hidden border border-line">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop"
                  alt="Engineers collaborating"
                  className="h-full w-full object-cover"
                  data-testid="about-image"
                />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          {chapters.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.1}>
              <div
                className="grid grid-cols-12 gap-6 border-t border-line py-10 lg:py-14"
                data-testid={`manifesto-chapter-${c.n}`}
              >
                <span className="col-span-2 font-display text-5xl font-light text-slate-300 lg:text-7xl">
                  {c.n}
                </span>
                <div className="col-span-10">
                  <h3 className="font-display text-2xl font-bold tracking-tight text-ink lg:text-4xl">
                    {c.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
                    {c.copy}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

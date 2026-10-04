import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Nav, scrollToSection } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TrustedBy } from "@/components/TrustedBy";
import { EditorialMarquee } from "@/components/Marquee";
import { Services } from "@/components/Services";
import { Industries } from "@/components/Industries";
import { About } from "@/components/About";
import { CaseStudies } from "@/components/CaseStudies";
import { Testimonials } from "@/components/Testimonials";
import { Insights } from "@/components/Insights";
import { Happenings } from "@/components/Happenings";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const t = setTimeout(() => scrollToSection(location.hash), 400);
      return () => clearTimeout(t);
    }
  }, [location.hash]);

  return (
    <main className="bg-white">
      <Nav />
      <Hero />
      <TrustedBy />
      <EditorialMarquee />
      <Services />
      <Industries />
      <About />
      <CaseStudies />
      <Testimonials />
      <Insights />
      <Happenings />
      <Contact />
      <Footer />
    </main>
  );
}

import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { EditorialMarquee } from "@/components/Marquee";
import { Services } from "@/components/Services";
import { Industries } from "@/components/Industries";
import { About } from "@/components/About";
import { CaseStudies } from "@/components/CaseStudies";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-white">
      <Nav />
      <Hero />
      <EditorialMarquee />
      <Services />
      <Industries />
      <About />
      <CaseStudies />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}

import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";
import Benefits from "./components/Benefits";
import CTA from "./components/CTA";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className='min-h-screen bg-[var(--bg-dark)] text-white'>
      {/* Header rendered in app/layout.tsx */}

      <main>
        <Hero />
        <Benefits />
        <CTA />
        <FAQ />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

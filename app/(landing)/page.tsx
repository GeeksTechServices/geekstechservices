import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import Benefits from "../components/Benefits";
import CTA from "../components/CTA";
import Integrations from "../components/Integrations";
import ResourcesPreview from "../components/ResourcesPreview";
import FAQ from "../components/FAQ";

export default function Home() {
  return (
    <div className='min-h-screen bg-[var(--bg-dark)] text-white'>
      <main>
        <Hero />
        <Benefits />
        <Integrations />
        <ResourcesPreview />
        <FAQ />
        <Testimonials />
        <CTA />
      </main>
    </div>
  );
}

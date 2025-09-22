import Hero from "./components/Hero";
import Features from "./components/Features";

export default function Home() {
  return (
    <div className='min-h-screen bg-[var(--bg-dark)] text-white'>
      {/* Header rendered in app/layout.tsx */}

      <main>
        <Hero />
        <Features />
      </main>

      <footer className='max-w-6xl mx-auto px-4 py-10 text-center text-sm text-gray-400'>
        © {new Date().getFullYear()} GeekStechServices — AI-powered IoT network
        health.
      </footer>
    </div>
  );
}

import Image from "next/image";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div className='min-h-screen bg-[var(--bg-dark)] text-white'>
      <header className='max-w-6xl mx-auto px-4 py-6 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Image src='/file.svg' alt='logo' width={34} height={34} />
          <span className='font-semibold'>GeekStechServices</span>
        </div>
        <nav className='hidden sm:flex gap-6 text-sm text-gray-200'>
          <a href='#'>Home</a>
          <a href='#features'>Features</a>
          <a href='#pricing'>Pricing</a>
          <a href='#blog'>Blog</a>
          <a href='#contact'>Contact</a>
        </nav>
      </header>

      <main>
        <Hero />
      </main>

      <footer className='max-w-6xl mx-auto px-4 py-10 text-center text-sm text-gray-400'>
        © {new Date().getFullYear()} GeekStechServices — AI-powered IoT network
        health.
      </footer>
    </div>
  );
}

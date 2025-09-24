import React from "react";

export const metadata = {
  title: "Privacy Policy — GeekStechServices",
  description: "Privacy policy for GeekStech Services.",
};

export default function PrivacyPage() {
  return (
    <main className='min-h-screen bg-black/95 text-white'>
      <div className='container mx-auto max-w-4xl px-6 py-20'>
        <header className='mb-8'>
          <h1 className='text-4xl font-extrabold'>Privacy Policy</h1>
          <p className='text-sm text-gray-400 mt-2'>
            Last updated: <time>September 24, 2025</time>
          </p>
        </header>

        <nav className='mb-8'>
          <ul className='flex flex-wrap gap-3 text-sm text-gray-300'>
            <li className='hover:text-white'>
              <a href='#introduction'>Introduction</a>
            </li>
            <li className='hover:text-white'>
              <a href='#data-we-collect'>Data we collect</a>
            </li>
            <li className='hover:text-white'>
              <a href='#how-we-use'>How we use data</a>
            </li>
            <li className='hover:text-white'>
              <a href='#contact'>Contact</a>
            </li>
          </ul>
        </nav>

        <article className='prose prose-invert max-w-none text-gray-200 bg-white/2 p-8 rounded-lg'>
          {/* Paste your HTML content here. We render it inside a nicely styled container. */}
          <section id='introduction'>
            <h2>Introduction</h2>
            <p>
              This document explains how we collect and use personal data.
              Replace this text with your full policy HTML.
            </p>
          </section>

          <section id='data-we-collect'>
            <h3>Data we collect</h3>
            <p>Placeholder content. Paste your HTML here when ready.</p>
          </section>

          <section id='how-we-use'>
            <h3>How we use your data</h3>
            <p>Placeholder content. Paste your HTML here when ready.</p>
          </section>

          <section id='contact'>
            <h3>Contact</h3>
            <p>
              Questions? Contact us at{" "}
              <a
                href='mailto:hello@geekstech.services'
                className='text-[var(--accent)]'
              >
                hello@geekstech.services
              </a>
              .
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}

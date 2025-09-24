import React from "react";

export const metadata = {
  title: "Terms & Conditions — GeekStechServices",
  description: "Terms and conditions for using GeekStech Services.",
};

export default function TermsPage() {
  return (
    <main className='min-h-screen bg-black/95 text-white'>
      <div className='container mx-auto max-w-4xl px-6 py-20'>
        <header className='mb-8'>
          <h1 className='text-4xl font-extrabold'>Terms & Conditions</h1>
          <p className='text-sm text-gray-400 mt-2'>
            Effective date: <time>September 24, 2025</time>
          </p>
        </header>

        <nav className='mb-8'>
          <ul className='flex flex-wrap gap-3 text-sm text-gray-300'>
            <li className='hover:text-white'>
              <a href='#acceptance'>Acceptance of terms</a>
            </li>
            <li className='hover:text-white'>
              <a href='#use-of-service'>Use of service</a>
            </li>
            <li className='hover:text-white'>
              <a href='#limitations'>Limitations</a>
            </li>
            <li className='hover:text-white'>
              <a href='#governing-law'>Governing law</a>
            </li>
          </ul>
        </nav>

        <article className='prose prose-invert max-w-none text-gray-200 bg-white/2 p-8 rounded-lg'>
          {/* Paste your HTML content here. */}
          <section id='acceptance'>
            <h2>Acceptance of terms</h2>
            <p>
              Placeholder text. Replace with your full terms and conditions
              HTML.
            </p>
          </section>

          <section id='use-of-service'>
            <h3>Use of service</h3>
            <p>
              Placeholder text. Replace with your full terms and conditions
              HTML.
            </p>
          </section>

          <section id='limitations'>
            <h3>Limitations</h3>
            <p>
              Placeholder text. Replace with your full terms and conditions
              HTML.
            </p>
          </section>

          <section id='governing-law'>
            <h3>Governing law</h3>
            <p>
              Placeholder text. Replace with your full terms and conditions
              HTML.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}

import React from "react";
import contactData from "@/lib/contact.json";
import Image from "next/image";
import Turnstile from "@/app/(landing)/contact/Turnstile.client";

export const metadata = {
  title: "Contact — GeekStechServices",
};

export default function ContactPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    contactData.address
  )}&z=15&output=embed`;

  return (
    <main className='min-h-screen bg-black/95 text-white'>
      <div className='container mx-auto max-w-6xl px-6 py-20'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
          <div className='space-y-6'>
            <h1 className='text-5xl font-extrabold'>Get in touch</h1>
            <p className='text-lg text-gray-300 max-w-xl'>
              We&apos;re happy to help. Whether you&apos;re evaluating our
              services or ready to start, tell us a little about your project
              and we&apos;ll respond within one business day.
            </p>

            <div className='space-y-3 mt-6'>
              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-full bg-[var(--accent)]/20 flex items-center justify-center'>
                  📍
                </div>
                <div>
                  <div className='text-sm text-gray-400'>Address</div>
                  <div className='font-medium'>{contactData.address}</div>
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-full bg-[var(--accent)]/20 flex items-center justify-center'>
                  📞
                </div>
                <div>
                  <div className='text-sm text-gray-400'>Phone</div>
                  <div className='font-medium'>{contactData.phone}</div>
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-full bg-[var(--accent)]/20 flex items-center justify-center'>
                  ✉️
                </div>
                <div>
                  <div className='text-sm text-gray-400'>Email</div>
                  <div className='font-medium'>{contactData.email}</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className='bg-white/5 p-6 rounded-xl'>
              <form
                action='https://formspree.io/f/your-form-id' /* replace with your Formspree endpoint */
                method='POST'
                className='space-y-4'
              >
                <input
                  type='hidden'
                  name='_subject'
                  value='New contact from website'
                />
                <div>
                  <label className='text-sm text-gray-300'>Name</label>
                  <input
                    name='name'
                    required
                    className='w-full bg-transparent border border-white/10 rounded px-3 py-2 mt-1'
                  />
                </div>
                <div>
                  <label className='text-sm text-gray-300'>Email</label>
                  <input
                    name='email'
                    type='email'
                    required
                    className='w-full bg-transparent border border-white/10 rounded px-3 py-2 mt-1'
                  />
                </div>
                <div>
                  <label className='text-sm text-gray-300'>Message</label>
                  <textarea
                    name='message'
                    rows={4}
                    required
                    className='w-full bg-transparent border border-white/10 rounded px-3 py-2 mt-1'
                  />
                </div>

                <div className='mt-2'>
                  {/* placeholder Turnstile widget - replace siteKey with env variable */}
                  <Turnstile
                    siteKey={
                      process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY ||
                      "your-site-key"
                    }
                  />
                </div>

                <div className='flex justify-end'>
                  <button
                    type='submit'
                    className='bg-[var(--accent)] px-4 py-2 rounded'
                  >
                    Send message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className='mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='h-96 rounded-lg overflow-hidden'>
            <iframe
              src={mapSrc}
              className='w-full h-full border-0'
              loading='lazy'
            />
          </div>

          <div className='space-y-6'>
            <h3 className='text-2xl font-bold'>Our office</h3>
            <p className='text-gray-300'>{contactData.address}</p>
            <p className='text-gray-400'>Business hours: {contactData.hours}</p>

            <div className='mt-4'>
              <h4 className='text-lg font-medium mb-2'>Need help deciding?</h4>
              <p className='text-gray-300'>
                Book a quick 15-minute discovery call and we&apos;ll point you
                in the right direction.
              </p>
              <div className='mt-4'>
                <button className='bg-transparent border border-white/10 px-4 py-2 rounded'>
                  Book a call
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Optional team or FAQ section - quick suggestions */}
        <div className='mt-20'>
          <h3 className='text-2xl font-bold mb-6'>Meet the team</h3>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
            <div className='p-4 bg-white/5 rounded-lg'>
              <div className='h-24 w-24 rounded-full bg-gray-700 mb-4' />
              <div className='font-medium'>Alex Morgan</div>
              <div className='text-sm text-gray-400'>Founder</div>
            </div>
            <div className='p-4 bg-white/5 rounded-lg'>
              <div className='h-24 w-24 rounded-full bg-gray-700 mb-4' />
              <div className='font-medium'>Priya Patel</div>
              <div className='text-sm text-gray-400'>Head of Ops</div>
            </div>
            <div className='p-4 bg-white/5 rounded-lg'>
              <div className='h-24 w-24 rounded-full bg-gray-700 mb-4' />
              <div className='font-medium'>Lee Chang</div>
              <div className='text-sm text-gray-400'>Engineer</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

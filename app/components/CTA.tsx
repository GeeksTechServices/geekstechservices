"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className='w-full max-w-6xl mx-auto px-4 sm:px-6 my-16'>
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.995 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        className='rounded-2xl p-6 sm:p-8 glass-strong'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-center'>
          {/* Left: headline + benefits */}
          <div className='text-center md:text-left'>
            <div className='inline-flex items-center gap-3'>
              <span className='px-2 py-1 rounded-full bg-[rgba(179,45,255,0.12)] text-[var(--accent)] text-xs font-medium'>
                14‑day free trial
              </span>
            </div>

            <h3 className='mt-4 text-3xl sm:text-4xl font-extrabold text-white'>
              Reduce downtime. Increase uptime.
            </h3>

            <p className='mt-3 text-gray-300 max-w-xl'>
              Get an instant IoT Network Health score and AI remediation steps
              that proactively reduce incidents and keep devices operating
              smoothly.
            </p>

            <ul className='mt-4 space-y-2 text-sm text-gray-300'>
              <li className='flex items-start gap-3'>
                <svg
                  className='flex-shrink-0 mt-1 h-4 w-4 text-[var(--accent)]'
                  viewBox='0 0 24 24'
                  fill='none'
                  aria-hidden
                >
                  <path
                    d='M20 6L9 17l-5-5'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <span>Zero config onboarding — connect devices in minutes</span>
              </li>

              <li className='flex items-start gap-3'>
                <svg
                  className='flex-shrink-0 mt-1 h-4 w-4 text-[var(--accent)]'
                  viewBox='0 0 24 24'
                  fill='none'
                  aria-hidden
                >
                  <path
                    d='M20 6L9 17l-5-5'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <span>AI-powered recommendations prioritized by impact</span>
              </li>
            </ul>
          </div>

          {/* Right: action area */}
          <div className='flex items-center justify-center'>
            <div className='w-full max-w-md'>
              <div className='text-center'>
                <div className='text-sm text-gray-400'>
                  Start your free trial or request a demo
                </div>
              </div>

              <div className='mt-4 flex flex-col sm:flex-row items-center justify-center gap-3'>
                <Link
                  href={"/auth/signup?trial=14"}
                  className='inline-block w-full sm:w-auto'
                >
                  <Button
                    className='w-full sm:w-auto px-6 py-3 shadow-lg bg-[var(--accent)] text-white'
                    aria-label='Start 14 day free trial'
                  >
                    Start free 14‑day trial
                  </Button>
                </Link>

                <Link
                  href={"/contact?request=demo"}
                  className='inline-block w-full sm:w-auto'
                >
                  <Button
                    variant='ghost'
                    className='w-full sm:w-auto px-6 py-3'
                    aria-label='Request demo'
                  >
                    Request demo
                  </Button>
                </Link>
              </div>

              <div className='mt-3 text-xs text-gray-400 text-center md:text-right'>
                No credit card required • 24/7 support during trial
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

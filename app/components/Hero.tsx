import React from "react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";

const accent = "#b32dff";

const container = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      when: "beforeChildren",
    },
  },
} as Variants;

const item = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
} as Variants;

export default function Hero() {
  return (
    <section className='w-full max-w-6xl mx-auto px-4 sm:px-6'>
      <motion.div
        variants={container}
        initial='hidden'
        animate='show'
        className='relative overflow-hidden rounded-2xl'
      >
        {/* Background gradient + subtle shapes */}
        <div
          aria-hidden
          className='absolute inset-0 -z-10 bg-gradient-to-br from-[#07070a] via-[rgba(179,45,255,0.08)] to-transparent'
        />

        <div className='flex flex-col-reverse md:flex-row items-center gap-10 py-16 md:py-28'>
          <motion.div
            variants={item}
            className='flex-1 text-center md:text-left'
          >
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white'>
              GeekStechServices — AI-powered IoT Network Health
            </h1>
            <p className='mt-4 text-lg sm:text-xl text-gray-200 max-w-2xl'>
              Intelligent monitoring and management for smart offices and
              factories. Get a single, actionable “IoT Network Health” score and
              AI-driven recommendations to keep your devices performing at peak
              levels.
            </p>

            <div className='mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center md:justify-start'>
              <Link href='#' className='w-full sm:w-auto'>
                <a
                  className='inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-[var(--accent)] text-black font-semibold shadow-lg hover:brightness-95 transition'
                  style={{ backgroundColor: accent }}
                >
                  Get started
                </a>
              </Link>

              <Link href='#' className='w-full sm:w-auto'>
                <a className='inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-white/6 border border-white/10 text-white hover:bg-white/8 transition'>
                  Request demo
                </a>
              </Link>
            </div>

            <div className='mt-6 text-sm text-gray-300'>
              Enterprise-ready • Secure • Scalable
            </div>
          </motion.div>

          {/* Visual: glass card with IoT Network Health score and animated dots */}
          <motion.div
            variants={item}
            className='flex-1 max-w-md w-full relative'
            aria-hidden
          >
            <div className='relative'>
              <div className='backdrop-blur-[8px] bg-white/4 dark:bg-black/20 border border-white/6 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'>
                <div className='flex items-center justify-between'>
                  <div>
                    <div className='text-sm text-gray-300'>
                      IoT Network Health
                    </div>
                    <div className='mt-2 flex items-end gap-3'>
                      <div className='text-5xl font-extrabold text-white'>
                        92
                      </div>
                      <div className='text-sm text-gray-400'>/100</div>
                    </div>
                    <div className='mt-3 text-xs text-gray-400'>
                      Stable — 3 devices need attention
                    </div>
                  </div>

                  <div className='flex flex-col items-end'>
                    <div className='text-xs text-gray-400'>Last checked</div>
                    <div className='text-sm text-gray-200'>2m ago</div>
                  </div>
                </div>

                <div className='mt-6 grid grid-cols-3 gap-2'>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        delay: 0.12 + i * 0.04,
                        type: "spring",
                        stiffness: 110,
                      }}
                      className='h-12 rounded-lg bg-gradient-to-b from-white/4 to-white/2 flex items-center justify-center text-xs text-gray-200'
                    >
                      Device {i + 1}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Accent floating glow */}
              <div
                className='pointer-events-none absolute -right-10 -top-8 w-48 h-48 rounded-full blur-3xl opacity-60'
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(179,45,255,0.35), transparent 40%)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

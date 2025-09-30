"use client";
import React from "react";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { LuArrowRight, LuPlayCircle, LuSparkles } from "react-icons/lu";

const container = {
  hidden: { opacity: 0, y: 24 },
  show: (shouldReduce: boolean) => ({
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: shouldReduce ? 0 : 0.08,
      when: "beforeChildren",
    },
  }),
} as unknown as Variants;

const item = {
  hidden: { opacity: 0, y: 8 },
  show: (shouldReduce: boolean) => ({
    opacity: 1,
    y: 0,
    transition: shouldReduce
      ? { duration: 0.25 }
      : { type: "spring", stiffness: 120, damping: 14 },
  }),
} as unknown as Variants;

export default function Hero() {
  const shouldReduce = useReducedMotion();
  return (
    <section className='w-full max-w-6xl mx-auto px-4 sm:px-6 '>
      <motion.div
        variants={container}
        initial='hidden'
        animate='show'
        custom={shouldReduce}
        className='relative overflow-hidden rounded-2xl'
      >
        {/* Background gradient + subtle shapes */}
        <div
          aria-hidden
          className='absolute inset-0 -z-10 bg-gradient-to-br from-[#07070a] via-[rgba(179,45,255,0.08)] to-transparent'
        />
        {/* Floating accent orbs */}
        {!shouldReduce && (
          <>
            <motion.div
              aria-hidden
              className='absolute -z-10 top-[-40px] right-[-60px] h-48 w-48 rounded-full blur-3xl opacity-40'
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(179,45,255,0.35), transparent 50%)",
              }}
              animate={{ y: [0, 10, 0], x: [0, -6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className='absolute -z-10 bottom-[-50px] left-[-50px] h-56 w-56 rounded-full blur-3xl opacity-30'
              style={{
                background:
                  "radial-gradient(circle at 70% 70%, rgba(88,101,242,0.3), transparent 55%)",
              }}
              animate={{ y: [0, -8, 0], x: [0, 8, 0] }}
              transition={{
                duration: 8.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        )}

        <div className='flex flex-col md:flex-row items-center gap-10 py-16 md:py-28'>
          <motion.div
            variants={item}
            custom={shouldReduce}
            className='flex-1 text-center md:text-left'
          >
            {/* Eyebrow badge */}
            <div className='flex items-center justify-center md:justify-start'>
              <Link
                href='/features'
                className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-200 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]'
              >
                <LuSparkles
                  className='h-3.5 w-3.5 text-[var(--accent)]'
                  aria-hidden='true'
                />
                Introducing our AI-powered IoT insights
              </Link>
            </div>
            <h1 className='text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white'>
              Seamless IoT Management
              <span className='ml-2 bg-gradient-to-r from-[#b32dff] via-fuchsia-400 to-[#b32dff] bg-clip-text text-transparent'>
                for Instant Network Insights
              </span>
            </h1>
            <p className='mt-4 text-lg sm:text-xl text-gray-200 max-w-2xl'>
              Intelligent monitoring and management for smart offices and
              factories. Get a single, actionable “IoT Network Health” score and
              AI-driven recommendations to keep your devices performing at peak
              levels.
            </p>

            <div className='mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center md:justify-start'>
              <motion.div
                whileHover={shouldReduce ? undefined : { y: -2 }}
                whileTap={shouldReduce ? undefined : { scale: 0.98 }}
              >
                <Link href='/auth/signup' className='w-full sm:w-auto'>
                  <Button className='w-full sm:w-auto inline-flex items-center gap-2'>
                    Get started
                    <LuArrowRight className='h-4 w-4' aria-hidden='true' />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                whileHover={shouldReduce ? undefined : { y: -2 }}
                whileTap={shouldReduce ? undefined : { scale: 0.98 }}
              >
                <Link href='/contact?request=demo' className='w-full sm:w-auto'>
                  <Button
                    variant='ghost'
                    className='w-full sm:w-auto inline-flex items-center gap-2'
                  >
                    <LuPlayCircle className='h-4 w-4' aria-hidden='true' />
                    Request demo
                  </Button>
                </Link>
              </motion.div>
            </div>

            <motion.div
              className='mt-6 text-sm text-gray-300'
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduce ? 0.2 : 0.35 }}
            >
              Enterprise-ready • Secure • Scalable — No credit card required
            </motion.div>
          </motion.div>

          {/* Visual: glass card with IoT Network Health score and animated dots */}
          <motion.div
            variants={item}
            custom={shouldReduce}
            className='flex-1 max-w-md w-full relative'
            aria-hidden
            whileHover={shouldReduce ? undefined : { y: -6, scale: 1.01 }}
            whileTap={shouldReduce ? undefined : { scale: 0.995 }}
          >
            <div className='relative'>
              <Card className='glass glass-strong rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.6)] relative overflow-hidden'>
                {/* subtle border gradient */}
                <div
                  className='absolute inset-0 rounded-2xl pointer-events-none glass-border'
                  aria-hidden
                />
                {/* animated accent overlay */}
                <div
                  className='absolute -inset-1 pointer-events-none opacity-30 animate-accentGlow'
                  aria-hidden
                />
                <CardHeader className='p-0'>
                  <div className='flex items-center justify-between w-full'>
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
                </CardHeader>

                <CardContent className='p-0 mt-4'>
                  <div className='mt-6 grid grid-cols-3 gap-2'>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          delay: shouldReduce ? 0 : 0.12 + i * 0.04,
                          type: shouldReduce ? undefined : "spring",
                          stiffness: shouldReduce ? undefined : 110,
                          damping: shouldReduce ? undefined : 12,
                        }}
                        whileHover={
                          shouldReduce ? undefined : { y: -4, scale: 1.02 }
                        }
                        className='h-12 rounded-lg glass-faint flex items-center justify-center text-xs text-gray-200'
                      >
                        Device {i + 1}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

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

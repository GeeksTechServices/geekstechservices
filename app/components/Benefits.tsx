"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";
import benefits from "@/lib/benefits.json";
import * as icons from "react-icons/md";
import type { IconType } from "react-icons";
import Image from "next/image";

export default function Benefits() {
  const reduce = useReducedMotion();

  const container = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
  };

  const item = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <section
      className='w-full max-w-6xl mx-auto px-4 sm:px-6 my-24 relative'
      id='benefits'
    >
      {/* real placeholder image from public/ */}
      <div className='hidden lg:block absolute left-0 top-8 -z-10 pointer-events-none'>
        <Image
          src='/window.svg'
          alt='section decor'
          width={420}
          height={420}
          className='opacity-10'
        />
      </div>
      <div className='mb-8 text-center'>
        <h2 className='text-2xl sm:text-3xl font-semibold'>Key Benefits</h2>
        <p className='mt-2 text-gray-300 max-w-2xl mx-auto'>
          Enterprise-grade monitoring with AI-driven insights.
        </p>
      </div>

      <motion.div
        variants={container}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.2 }}
        className='grid grid-cols-1 md:grid-cols-2 gap-6'
      >
        {benefits.map((b, i) => {
          const Icon =
            (icons as unknown as Record<string, IconType>)[b.icon] ??
            (icons as unknown as Record<string, IconType>).MdInfo;
          return (
            <motion.div
              key={b.title}
              variants={item}
              transition={{ duration: reduce ? 0.18 : 0.45, delay: i * 0.06 }}
              className='mb-0'
            >
              <Card className='p-6 sm:p-8 glass-faint hover:shadow-2xl transition-transform transform-gpu hover:-translate-y-2 border-l-4 border-transparent hover:border-[rgba(179,45,255,0.22)]'>
                <div className='flex items-start gap-5'>
                  <div className='relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[rgba(179,45,255,0.12)] to-transparent ring-1 ring-white/6 accent-strong'>
                    <span
                      className='absolute -inset-1 rounded-xl pointer-events-none opacity-60 blur-[10px]'
                      style={{
                        background:
                          "radial-gradient(circle at 30% 30%, rgba(179,45,255,0.25), transparent 40%)",
                      }}
                    />
                    <Icon className='text-3xl sm:text-4xl text-[var(--accent)]' />
                  </div>

                  <div className='flex-1'>
                    <div className='text-xl sm:text-2xl font-semibold leading-tight'>
                      {b.title}
                    </div>
                    <div className='mt-3 text-sm sm:text-base text-gray-300'>
                      {b.description}
                    </div>
                    {/* link removed per request */}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import faqs from "@/lib/faq.json";
import { MdKeyboardArrowDown } from "react-icons/md";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1 },
};

interface FAQItem {
  id?: string;
  category?: string;
  tags?: string[];
  question: string;
  answer: string;
  updatedAt?: string;
}

export default function FAQ() {
  const [open, setOpen] = useState<string | null>(null);

  const reduce = useReducedMotion();

  return (
    <section id='faq' className='w-full max-w-6xl mx-auto px-4 sm:px-6 my-20'>
      <div className='mb-8 text-center'>
        <h2 className='text-2xl sm:text-3xl font-semibold'>Help Center</h2>
        <p className='mt-2 text-gray-300 max-w-2xl mx-auto'>
          Common questions and guidance for getting the most from the platform.
        </p>
      </div>

      <motion.div
        variants={container}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className='glass-faint p-6 sm:p-8 rounded-2xl'>
          <div className='space-y-4'>
            {faqs.map((f: FAQItem, i: number) => {
              const id = `faq-item-${i}`;
              const isOpen = open === id;
              return (
                <motion.div
                  key={f.id ?? i}
                  variants={item}
                  className='rounded-lg'
                >
                  <button
                    aria-expanded={isOpen}
                    aria-controls={`${id}-content`}
                    onClick={() => setOpen(isOpen ? null : id)}
                    className='w-full flex items-center justify-between gap-4 text-left p-4 rounded-lg transition-transform duration-150 hover:scale-[1.01]'
                  >
                    <div>
                      <div className='font-medium text-lg'>{f.question}</div>
                      <div className='mt-1 flex items-center gap-2'>
                        <span className='text-xs text-gray-400'>
                          {f.category}
                        </span>
                        {(f.tags || []).length > 0 && (
                          <span className='text-xs px-2 py-1 rounded-full bg-[rgba(179,45,255,0.08)] text-[var(--accent)]'>
                            {(f.tags || []).join(", ")}
                          </span>
                        )}
                      </div>
                    </div>

                    <MdKeyboardArrowDown
                      className={`h-6 w-6 text-gray-300 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[var(--accent)]" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`${id}-content`}
                        initial={
                          reduce
                            ? { opacity: 1, height: "auto" }
                            : { opacity: 0, height: 0 }
                        }
                        animate={
                          reduce
                            ? { opacity: 1, height: "auto" }
                            : { opacity: 1, height: "auto" }
                        }
                        exit={
                          reduce
                            ? { opacity: 1, height: "auto" }
                            : { opacity: 0, height: 0 }
                        }
                        transition={{
                          duration: 0.36,
                          ease: [0.2, 0.8, 0.2, 1],
                        }}
                        className='overflow-hidden'
                      >
                        <div className='px-4 pb-4 text-sm text-gray-300 leading-relaxed'>
                          {f.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

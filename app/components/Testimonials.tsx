"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import testimonials from "@/lib/testimonials.json";

type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  avatar?: string;
  rating?: number;
};

const items: Testimonial[] = testimonials as Testimonial[];

export default function Testimonials() {
  const reduce = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const count = items.length;

  const clampIndex = useCallback(
    (i: number) => {
      // wrap around
      return ((i % count) + count) % count;
    },
    [count]
  );

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setIndex((prev) => clampIndex(prev + dir));
    },
    [clampIndex]
  );

  // timer helpers: start / stop autoplay
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const startTimer = useCallback(() => {
    if (reduce) return;
    stopTimer();
    timerRef.current = window.setInterval(() => {
      setDirection(1);
      setIndex((prev) => clampIndex(prev + 1));
    }, 2000);
    setIsPlaying(true);
  }, [clampIndex, reduce, stopTimer]);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [startTimer, stopTimer]);

  // user interactions pause autoplay
  const handleUserNavigate = (dir: number) => {
    stopTimer();
    go(dir);
  };

  const handleMouseEnter = () => stopTimer();
  const handleMouseLeave = () => startTimer();
  const handleFocus = () => stopTimer();
  const handleBlur = () => startTimer();

  // keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handleUserNavigate(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleUserNavigate(1);
    }
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.98,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.98,
    }),
  };

  const Stars = ({ value }: { value: number }) => {
    const full = Math.round(value);
    return (
      <div className='flex items-center gap-1' aria-hidden>
        {Array.from({ length: 5 }).map((_, idx) => (
          <svg
            key={idx}
            className={`w-4 h-4 ${
              idx < full ? "text-yellow-400" : "text-white/20"
            }`}
            viewBox='0 0 24 24'
            fill={idx < full ? "currentColor" : "none"}
            stroke='currentColor'
            strokeWidth='1.2'
            aria-hidden
          >
            <path d='M12 .587l3.668 7.431L23 9.75l-5.5 5.366L18.335 24 12 19.897 5.665 24 7.5 15.116 2 9.75l7.332-1.732z' />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className='w-full max-w-6xl mx-auto px-4 sm:px-6 my-24'>
      <div className='mb-8 text-center'>
        <h3 className='text-xl sm:text-2xl font-semibold'>
          What customers say
        </h3>
        <p className='mt-2 text-gray-300 max-w-2xl mx-auto'>
          Short customer testimonials from teams using GeekStechServices.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-center'>
        {/* Left image */}
        <div className='order-2 md:order-1 flex items-center justify-center'>
          <div className='w-full max-w-lg rounded-xl overflow-hidden shadow-lg glass-faint'>
            <Image
              src='/images/testimonial.webp'
              alt='Customers using product'
              width={720}
              height={540}
              className='w-full h-auto object-cover block'
            />
          </div>
        </div>

        {/* Right: carousel */}
        <div className='order-1 md:order-2 flex flex-col items-center'>
          <div
            className='w-full max-w-xl'
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <div className='relative h-56'>
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={variants}
                  initial='enter'
                  animate='center'
                  exit='exit'
                  transition={{
                    duration: reduce ? 0 : 0.45,
                    ease: [0.2, 0.8, 0.2, 1],
                  }}
                  className='absolute inset-0'
                >
                  <Card className='h-full p-6 glass-faint flex flex-col justify-between cursor-default select-none'>
                    <div>
                      <CardHeader className='p-0'>
                        <div className='flex items-center gap-4'>
                          <Avatar>
                            {items[index].avatar ? (
                              <AvatarImage
                                src={items[index].avatar}
                                alt={items[index].name}
                              />
                            ) : (
                              <AvatarFallback>
                                {items[index].name[0]}
                              </AvatarFallback>
                            )}
                          </Avatar>

                          <div>
                            <div className='font-semibold'>
                              {items[index].name}
                            </div>
                            <div className='text-sm text-gray-300'>
                              {items[index].role}
                            </div>
                          </div>

                          <div className='ml-auto'>
                            <Stars value={items[index].rating ?? 5} />
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className='p-0 mt-4 text-sm text-gray-300'>
                        <blockquote className='italic text-lg'>
                          “{items[index].quote}”
                        </blockquote>
                      </CardContent>
                    </div>

                    <div className='mt-4 text-xs text-gray-400 flex justify-between items-center'>
                      <div>Verified customer</div>
                      <div className='text-right'>
                        <span className='text-[var(--accent)] font-medium'>
                          Case Study
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* position dots */}
            <div className='mt-4 flex items-center justify-center gap-3'>
              {items.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => {
                    stopTimer();
                    const dir = i > index ? 1 : i < index ? -1 : 1;
                    setDirection(dir);
                    setIndex(i);
                  }}
                  className='flex items-center justify-center'
                >
                  {i === index ? (
                    <div
                      className='testimonial-dot-bar'
                      style={
                        {
                          // set CSS custom property so animation duration follows autoplay
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          "--dot-duration": `${2000}ms`,
                        } as React.CSSProperties
                      }
                    >
                      {!reduce && isPlaying ? (
                        <span className='testimonial-dot-fill' aria-hidden />
                      ) : (
                        <span
                          className='testimonial-dot-fill'
                          aria-hidden
                          style={{ width: "100%" }}
                        />
                      )}
                    </div>
                  ) : (
                    <div className='testimonial-dot' aria-hidden />
                  )}
                </button>
              ))}
            </div>

            {/* controls */}
            <div className='mt-3 flex items-center justify-center gap-3'>
              <button
                aria-label='Previous testimonial'
                onClick={() => handleUserNavigate(-1)}
                className='h-11 w-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/14 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2'
              >
                <svg
                  className='h-5 w-5 text-white'
                  viewBox='0 0 24 24'
                  fill='none'
                  aria-hidden
                >
                  <path
                    d='M15 18l-6-6 6-6'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>

              <button
                aria-label='Next testimonial'
                onClick={() => handleUserNavigate(1)}
                className='h-11 w-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/14 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2'
              >
                <svg
                  className='h-5 w-5 text-white'
                  viewBox='0 0 24 24'
                  fill='none'
                  aria-hidden
                >
                  <path
                    d='M9 6l6 6-6 6'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

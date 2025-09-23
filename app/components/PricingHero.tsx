"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import pricingData from "@/lib/pricing.json";

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const float = {
  hover: { y: -6, transition: { duration: 0.35 } },
  tap: { scale: 0.98, transition: { duration: 0.08 } },
};

export default function PricingHero() {
  return (
    <header className='py-20 md:py-32 mb-12 md:mb-20'>
      <div className='container max-w-6xl mx-auto px-6'>
        <motion.div initial='hidden' animate='visible' variants={cardVariants}>
          <Card className='p-8 md:p-12 glass'>
            <div className='flex flex-col-reverse md:flex-row items-center gap-8'>
              <div className='w-full md:w-1/2 text-center md:text-left'>
                <h1 className='text-4xl md:text-5xl font-extrabold leading-tight'>
                  Pricing built for operations
                </h1>
                <p className='mt-4 text-lg text-white/80 max-w-xl'>
                  Predictable plans for teams that run IoT at scale. Start small
                  and scale to enterprise-grade support and integrations.
                </p>

                <div className='mt-6 flex items-center justify-center md:justify-start gap-4'>
                  <motion.div
                    whileHover='hover'
                    whileTap='tap'
                    variants={float}
                  >
                    <Button variant='accent' asChild>
                      <Link href='#pricing-comparison'>Compare the plans</Link>
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Button variant='default' asChild>
                      <Link href='/contact'>Contact sales</Link>
                    </Button>
                  </motion.div>
                </div>

                {/* Pricing summary */}
                <PricingSummary />

                <div className='mt-6 flex flex-wrap gap-3 justify-center md:justify-start text-sm text-white/70'>
                  <span className='inline-flex items-center gap-2 bg-white/3 rounded-full px-3 py-1'>
                    14‑day trial — no card required
                  </span>
                  <span className='inline-flex items-center gap-2 bg-white/3 rounded-full px-3 py-1'>
                    Monthly & yearly billing
                  </span>
                  <span className='inline-flex items-center gap-2 bg-white/3 rounded-full px-3 py-1'>
                    Scale to Enterprise
                  </span>
                </div>
              </div>

              <div className='w-full md:w-1/2 flex justify-center md:justify-end'>
                <motion.div
                  whileHover={{ y: -8, rotate: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className='relative w-64 h-64 md:w-80 md:h-80'
                >
                  <Image
                    src='/placeholder.svg'
                    alt='IoT globe'
                    fill
                    className='object-contain'
                  />
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </header>
  );
}

function PricingSummary() {
  try {
    const data = pricingData as {
      plans?: Array<{ price_monthly?: number }>;
      currency?: string;
    };

    const plans = Array.isArray(data?.plans) ? data.plans : [];
    const monthlyPrices = plans
      .map((p) =>
        typeof p.price_monthly === "number" ? p.price_monthly : null
      )
      .filter((v): v is number => typeof v === "number");

    if (monthlyPrices.length === 0) return null;

    const minPrice = Math.min(...monthlyPrices);
    const currency = data.currency || "USD";
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(minPrice);

    return (
      <div className='mt-4 text-sm text-white/75 w-full md:w-auto text-center md:text-left'>
        <span className='text-white/90'>Starts at </span>
        <span className='font-semibold text-white'>{formatted}</span>
        <span className='text-white/75'>/mo</span>
      </div>
    );
  } catch {
    return null;
  }
}

"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import pricingData from "@/lib/pricing.json";
import Link from "next/link";

function persistSelectedPlan(plan: string, billing: string) {
  try {
    const hasConsent =
      typeof document !== "undefined" &&
      document.cookie
        .split(";")
        .some((c) => c.trim().startsWith("cookie_consent="));
    const payload = { plan, billing, savedAt: Date.now() };
    if (hasConsent) {
      const expires = new Date(Date.now() + 365 * 864e5).toUTCString();
      document.cookie =
        "selected_plan=" +
        encodeURIComponent(JSON.stringify(payload)) +
        "; expires=" +
        expires +
        "; path=/; Secure; SameSite=Lax";
    } else {
      localStorage.setItem("selected_plan", JSON.stringify(payload));
    }
  } catch (e) {
    try {
      const expires = new Date(Date.now() + 365 * 864e5).toUTCString();
      document.cookie =
        "selected_plan=" +
        encodeURIComponent(
          JSON.stringify({ plan, billing, savedAt: Date.now() })
        ) +
        "; expires=" +
        expires +
        "; path=/; Secure; SameSite=Lax";
    } catch (err) {
      console.error("Failed to persist selected plan", err);
    }
  }
}

type Plan = {
  id: string;
  name: string;
  slug?: string;
  short_description?: string;
  price_monthly?: number | null;
  price_yearly?: number | null;
  included_devices?: number | null;
  recommended?: boolean;
};

function formatCurrency(value: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(value);
}

export default function PricingCards() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const data = pricingData as { currency?: string; plans?: Plan[] };
  const plans = useMemo(
    () => (Array.isArray(data?.plans) ? data.plans! : []),
    [data?.plans]
  );
  const currency = data.currency || "USD";

  // compute the maximum annual discount available to advertise
  const maxAnnualDiscount = useMemo(() => {
    const discounts = plans
      .map((p) => {
        if (
          typeof p.price_monthly !== "number" ||
          typeof p.price_yearly !== "number"
        )
          return 0;
        const monthlyTotal = p.price_monthly * 12;
        if (monthlyTotal <= 0) return 0;
        const discount = Math.round(
          ((monthlyTotal - p.price_yearly) / monthlyTotal) * 100
        );
        return discount > 0 ? discount : 0;
      })
      .filter(Boolean);
    return discounts.length ? Math.max(...discounts) : 0;
  }, [plans]);

  const priceVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.28 } },
    exit: { opacity: 0, y: -6, transition: { duration: 0.18 } },
  } as const;

  const subVariants = {
    hidden: { opacity: 0, y: 4 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.28 } },
    exit: { opacity: 0, y: -4, transition: { duration: 0.18 } },
  } as const;

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.36, ease: "easeOut" },
    },
  } as const;

  return (
    <section aria-labelledby='plans' className='mb-16'>
      <div className='container max-w-6xl mx-auto px-6'>
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6'>
          <div>
            <h2 id='plans' className='text-3xl font-extrabold'>
              Flexible pricing for every fleet
            </h2>
            <p className='mt-2 text-sm text-white/70 max-w-xl'>
              Simple, transparent pricing — start small and scale to
              enterprise-grade support. Switch between monthly and yearly
              billing to see savings.
            </p>
          </div>

          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-3'>
              <span className='text-sm text-white/80'>Monthly</span>
              <Switch
                checked={billing === "yearly"}
                onCheckedChange={(v: boolean) =>
                  setBilling(v ? "yearly" : "monthly")
                }
                aria-label='Toggle yearly billing'
              />
              <span className='text-sm text-white/80'>Yearly</span>
            </div>

            {maxAnnualDiscount > 0 && (
              <div className='text-sm text-white/80'>
                Save up to {maxAnnualDiscount}% per year
              </div>
            )}
          </div>
        </div>

        <Separator className='mb-6' />

        <motion.div
          id='plans-grid'
          className='grid grid-cols-1 md:grid-cols-3 gap-6'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          {plans.map((p) => {
            const isRecommended = !!p.recommended;
            const monthly =
              typeof p.price_monthly === "number" ? p.price_monthly : null;
            const yearly =
              typeof p.price_yearly === "number" ? p.price_yearly : null;

            const planDiscount =
              monthly && yearly
                ? Math.round(((monthly * 12 - yearly) / (monthly * 12)) * 100)
                : 0;

            const { displayMain, displaySub } = (() => {
              if (billing === "monthly") {
                if (monthly === null)
                  return { displayMain: "Contact sales", displaySub: null };
                return {
                  displayMain: `${formatCurrency(monthly, currency)}`,
                  displaySub: (
                    <span className='text-sm text-white/70'>/mo</span>
                  ),
                };
              }
              // yearly
              if (yearly !== null) {
                const perMonth = yearly / 12;
                return {
                  displayMain: `${formatCurrency(yearly, currency)} per year`,
                  displaySub: (
                    <span className='ml-2 text-xs md:text-sm text-white/60'>
                      ({formatCurrency(perMonth, currency)}/mo)
                    </span>
                  ),
                };
              }
              return { displayMain: "Contact sales", displaySub: null };
            })();
            return (
              <motion.div
                key={p.id}
                variants={itemVariants}
                initial='hidden'
                animate='visible'
              >
                <Card
                  className={`relative overflow-visible p-6 ${
                    isRecommended
                      ? "bg-gradient-to-br from-[rgba(255,255,255,0.02)] to-[rgba(255,255,255,0.01)] ring-1 ring-[var(--accent)]/20 shadow-2xl scale-105"
                      : "glass-faint"
                  }`}
                >
                  {isRecommended && (
                    <div className='absolute -top-3 left-4 inline-flex items-center bg-[var(--accent)] text-black text-xs font-semibold px-3 py-1 rounded-full'>
                      Popular
                    </div>
                  )}

                  <div className='flex flex-col'>
                    <div>
                      <h3 className='text-lg font-semibold'>{p.name}</h3>
                      <p className='mt-1 text-sm text-white/70 max-w-md'>
                        {p.short_description}
                      </p>
                    </div>

                    {/* Price + CTA grouped and centered */}
                    <div className='mt-6 flex flex-col items-center gap-3'>
                      <div className='text-center'>
                        <AnimatePresence mode='wait' initial={false}>
                          <motion.div
                            key={billing + p.id + String(displayMain)}
                            variants={priceVariants}
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            className='text-2xl md:text-3xl font-extrabold leading-tight text-center'
                          >
                            {displayMain}
                          </motion.div>
                        </AnimatePresence>

                        <AnimatePresence mode='wait' initial={false}>
                          {displaySub && (
                            <motion.div
                              key={billing + p.id + "-sub"}
                              variants={subVariants}
                              initial='hidden'
                              animate='visible'
                              exit='exit'
                              className='mt-1'
                            >
                              {displaySub}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {billing === "monthly" && planDiscount > 0 && (
                          <div className='mt-2 text-sm text-green-400'>
                            Save {planDiscount}% per year if billed yearly
                          </div>
                        )}
                      </div>

                      <div className='w-full md:w-auto'>
                        {displayMain !== "Contact sales" ? (
                          <div className='flex items-center justify-center'>
                            <Button
                              variant={isRecommended ? "accent" : "default"}
                              asChild
                              onClick={() =>
                                persistSelectedPlan(
                                  p.slug ?? p.id ?? p.name ?? "",
                                  billing
                                )
                              }
                            >
                              <Link
                                href={{
                                  pathname: "/auth/signup",
                                  query: {
                                    plan: p.name ?? p.slug ?? p.id,
                                    billing,
                                  },
                                }}
                              >
                                Get started
                              </Link>
                            </Button>
                          </div>
                        ) : (
                          <div className='flex items-center justify-center'>
                            <Button variant='outline' asChild>
                              <Link href='/contact'>Contact sales</Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator className='my-4' />

                    <ul className='mt-2 space-y-2 text-sm text-white/80'>
                      <li>
                        {p.included_devices
                          ? `${p.included_devices} devices included`
                          : "Custom device limits"}
                      </li>
                      <li>AI health scoring</li>
                      <li>Real-time alerts</li>
                    </ul>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <p className='mt-6 text-sm text-white/60'>
          Prices shown in {currency}. Taxes and third-party fees may apply.
        </p>
      </div>
    </section>
  );
}

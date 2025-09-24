import React from "react";
import Link from "next/link";
import PricingHero from "../../components/PricingHero";
import PricingCards from "../../components/PricingCards";
import ComparisonTable from "../../components/ComparisonTable";
import PricingFAQ from "../../components/PricingFAQ";

export const metadata = {
  title: "Pricing — GeekStechServices",
  description:
    "Simple, predictable pricing for IoT fleet health and monitoring.",
};

export default function PricingPage() {
  return (
    <main className='min-h-screen pb-20'>
      <div className='max-w-6xl mx-auto px-6 pt-12'>
        <PricingHero />
        <PricingCards />
        <ComparisonTable />
        <PricingFAQ />

        <div className='text-center mt-6'>
          <Link
            href='/contact'
            className='text-[var(--accent)] hover:underline'
          >
            Contact sales for enterprise pricing
          </Link>
        </div>
      </div>
    </main>
  );
}

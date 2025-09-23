import React from "react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import faqs from "@/lib/pricing-faq.json";

type FAQ = { q: string; a: string; examples?: string[] };

export default function PricingFAQ() {
  return (
    <section className='mb-20 md:mb-32'>
      <Card className='p-6 glass-faint'>
        <div className='flex items-center justify-between gap-4'>
          <h4 className='text-lg font-semibold'>Frequently asked questions</h4>
          <div className='text-xs text-white/60'>
            Still have questions? Contact sales or start a trial.
          </div>
        </div>

        <Accordion type='single' collapsible className='mt-4 space-y-3'>
          {faqs.map((f: FAQ, i: number) => (
            <AccordionItem
              value={`faq-${i}`}
              key={i}
              className='rounded-md overflow-hidden'
            >
              <h5>
                <AccordionTrigger className='py-4 px-3 text-sm font-medium text-left'>
                  {f.q}
                </AccordionTrigger>
              </h5>
              <AccordionContent>
                <div className='mt-2  p-4 bg-[rgba(255,255,255,0.02)] rounded-md'>
                  <p className='text-sm text-white/80 leading-relaxed'>{f.a}</p>
                  {/* optional: quick bullets or action */}
                  {f.examples && (
                    <ul className='mt-3 list-inside list-disc text-sm text-white/70 space-y-1 pl-4'>
                      {f.examples.map((ex: string, idx: number) => (
                        <li key={idx}>{ex}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </section>
  );
}

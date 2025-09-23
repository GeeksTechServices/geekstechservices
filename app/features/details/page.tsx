import React from "react";
import { Card } from "@/components/ui/card";
import benefits from "@/lib/benefits.json";
import Link from "next/link";

export const metadata = {
  title: "Features Reference — GeekStechServices",
  description:
    "Detailed reference for each core capability provided by the platform.",
};

export default function FeatureDetailsPage() {
  return (
    <main className='min-h-screen py-12'>
      <div className='max-w-6xl mx-auto px-6'>
        <div className='mb-6 flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-extrabold'>Features reference</h1>
            <p className='mt-2 text-white/70'>
              Operational details and implementation notes for each capability.
            </p>
          </div>
          <Link
            href='/features'
            className='text-sm text-white/70 hover:underline'
          >
            Back to features
          </Link>
        </div>

        <div className='grid grid-cols-1 gap-6'>
          {benefits.map((b) => {
            const id = b.title.replace(/\s+/g, "-").toLowerCase();
            return (
              <Card key={b.title} id={id} className='p-6 glass-faint'>
                <h2 className='text-xl font-semibold'>{b.title}</h2>
                <p className='mt-2 text-sm text-white/80'>{b.description}</p>

                <div className='mt-4 text-sm text-white/70'>
                  <h3 className='font-medium'>Implementation notes</h3>
                  <ul className='list-inside list-disc mt-2 space-y-1'>
                    <li>Design telemetry sampling and retention policies.</li>
                    <li>
                      Expose health checks and standardized device metadata.
                    </li>
                    <li>Provide canary rollout hooks for firmware updates.</li>
                  </ul>
                </div>

                <div className='mt-4 text-sm text-white/70'>
                  <h3 className='font-medium'>Operational playbook</h3>
                  <ol className='list-inside list-decimal mt-2 space-y-1'>
                    <li>Set alert thresholds and escalation paths.</li>
                    <li>
                      Automate remediation where safe (restarts, retries).
                    </li>
                    <li>Run post-incident reviews and adjust dashboards.</li>
                  </ol>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}

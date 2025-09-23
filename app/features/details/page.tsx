import React from "react";
import { Card } from "@/components/ui/card";
import benefits from "@/lib/benefits.json";
import Link from "next/link";

function slugify(title: string) {
  return title
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .toLowerCase();
}

const highlights: { title: string; description: string }[] = [
  {
    title: "AI-Powered IoT Network Health Score",
    description:
      "A single health score that summarizes network reliability and device performance using AI-driven signals.",
  },
  {
    title: "Device Status Monitoring",
    description:
      "Real-time status for smart office and factory devices, with inventory and connectivity insights.",
  },
  {
    title: "Real-Time Alerts & Notifications",
    description:
      "Instant alerts for anomalies and failures with customizable notification channels for on-call teams.",
  },
  {
    title: "Predictive Maintenance Recommendations",
    description:
      "AI suggests maintenance actions before failures occur, lowering downtime and maintenance costs.",
  },
  {
    title: "Historical Analytics & Performance Trends",
    description:
      "Drill into historical metrics to spot trends, regressions, and long-term improvements.",
  },
  {
    title: "Exportable Reports for IT/Operations Teams",
    description:
      "Generate PDF/CSV reports for audits, SLAs, and executive summaries tailored for teams.",
  },
];

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
          {/* Table of contents */}
          <Card className='p-5 glass-faint'>
            <h2 className='text-lg font-semibold'>On this page</h2>
            <div className='mt-3 text-sm text-white/80'>
              <h3 className='font-medium'>Highlights</h3>
              <ul className='list-inside list-disc mt-2 ml-4'>
                {highlights.map((h) => (
                  <li key={h.title}>
                    <a
                      href={`#${slugify(h.title)}`}
                      className='text-[var(--accent)] hover:underline'
                    >
                      {h.title}
                    </a>
                  </li>
                ))}
              </ul>

              <h3 className='font-medium mt-3'>Core capabilities</h3>
              <ul className='list-inside list-disc mt-2 ml-4'>
                {benefits.map((b) => (
                  <li key={b.title}>
                    <a
                      href={`#${slugify(b.title)}`}
                      className='text-[var(--accent)] hover:underline'
                    >
                      {b.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Render the highlights first */}
          {highlights.map((h) => (
            <Card
              key={h.title}
              id={slugify(h.title)}
              className='p-5 glass-faint'
            >
              <h2 className='text-xl font-semibold'>{h.title}</h2>
              <p className='mt-2 text-sm text-white/80'>{h.description}</p>

              <div className='mt-3 text-sm text-white/70'>
                <h3 className='font-medium'>How it works</h3>
                <p className='mt-2'>
                  This section provides a short overview of architecture and
                  operational considerations. You can expand these notes based
                  on your integration needs.
                </p>
              </div>

              <div className='mt-3 text-sm text-white/70'>
                <h3 className='font-medium'>Next steps</h3>
                <ul className='list-inside list-disc mt-2 ml-4'>
                  <li>Configure telemetry and retention.</li>
                  <li>Define alert policies and notification channels.</li>
                  <li>
                    Integrate with CMDB and asset inventory for device context.
                  </li>
                </ul>
              </div>

              <div className='mt-4'>
                <a
                  href='#top'
                  className='text-sm text-white/70 hover:underline'
                >
                  Back to top
                </a>
              </div>
            </Card>
          ))}

          {/* Then render the existing benefits list (core capabilities) */}
          {benefits.map((b) => {
            const id = slugify(b.title);
            return (
              <Card key={b.title} id={id} className='p-5 glass-faint'>
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

                <div className='mt-4'>
                  <a
                    href='#top'
                    className='text-sm text-white/70 hover:underline'
                  >
                    Back to top
                  </a>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}

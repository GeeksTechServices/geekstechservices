"use client";

import React, { useEffect, useState } from "react";
import type { JSX } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import benefits from "@/lib/benefits.json";
import metrics from "@/lib/metrics.json";
import * as icons from "react-icons/md";
import type { IconType } from "react-icons";
import type { ChartOptions } from "chart.js";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { stiffness: 300, damping: 30 },
  },
};

const SkeletonCard = () => (
  <div className='animate-pulse p-4 rounded-2xl glass-faint'>
    <div className='h-44 w-full bg-white/6 rounded-lg mb-4' />
    <div className='h-6 bg-white/6 rounded w-3/4 mb-2' />
    <div className='h-4 bg-white/5 rounded w-5/6' />
  </div>
);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FeatureChart = ({
  labels,
  latencyData,
  errorData,
  showError,
}: {
  labels: string[];
  latencyData: number[];
  errorData: number[];
  showError?: boolean;
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Avg latency (ms)",
        data: latencyData,
        borderColor: "rgba(179,45,255,0.95)",
        backgroundColor: "rgba(179,45,255,0.18)",
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: "rgba(179,45,255,1)",
      },
      {
        label: "Error rate (per 1k)",
        data: errorData,
        borderColor: "rgba(255,255,255,0.6)",
        backgroundColor: "rgba(255,255,255,0.06)",
        tension: 0.3,
        pointRadius: 2,
        hidden: showError === false,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#eaeaea" } },
    },
    scales: {
      x: {
        ticks: { color: "#cfc9ff" },
        grid: { color: "rgba(255,255,255,0.03)" },
      },
      y: {
        ticks: { color: "#cfc9ff" },
        grid: { color: "rgba(255,255,255,0.03)" },
      },
    },
  };

  return (
    <div className='w-full h-72 bg-gradient-to-br from-[rgba(179,45,255,0.03)] to-transparent rounded-2xl glass p-4'>
      <Line data={data} options={options} />
    </div>
  );
};

function slugify(title: string) {
  return title
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .toLowerCase();
}

export default function ClientFeatures(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<"1M" | "3M" | "6M" | "1Y">("3M");
  const [chartLoading, setChartLoading] = useState(true);
  const [showError, setShowError] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setChartLoading(true);
    const t = setTimeout(() => setChartLoading(false), 450);
    return () => clearTimeout(t);
  }, [range]);

  // persist preferences
  useEffect(() => {
    const storedRange =
      typeof window !== "undefined" ? localStorage.getItem("fts_range") : null;
    const storedShowError =
      typeof window !== "undefined"
        ? localStorage.getItem("fts_show_error")
        : null;
    if (
      storedRange === "1M" ||
      storedRange === "3M" ||
      storedRange === "6M" ||
      storedRange === "1Y"
    )
      setRange(storedRange);
    if (storedShowError !== null) setShowError(storedShowError === "1");
  }, []);

  useEffect(() => {
    localStorage.setItem("fts_range", range);
  }, [range]);

  useEffect(() => {
    localStorage.setItem("fts_show_error", showError ? "1" : "0");
  }, [showError]);

  // prepare filtered metrics according to range
  const rows = metrics.map((m) => ({
    date: new Date(m.date),
    avgLatency: m.avgLatency,
    errorRate: m.errorRate,
  }));

  function lastN(months: number) {
    const now = new Date(rows[rows.length - 1].date);
    const cutoff = new Date(
      now.getFullYear(),
      now.getMonth() - (months - 1),
      1
    );
    return rows.filter((r) => r.date >= cutoff);
  }

  let filtered = rows;
  if (range === "1M") filtered = lastN(1);
  if (range === "3M") filtered = lastN(3);
  if (range === "6M") filtered = lastN(6);
  if (range === "1Y") filtered = lastN(12);

  const labels = filtered.map((r) =>
    r.date.toLocaleString("en-US", { month: "short" })
  );
  const latencyData = filtered.map((r) => r.avgLatency);
  const errorData = filtered.map((r) => r.errorRate);

  const highlights: { title: string; description: string; icon: string }[] = [
    {
      title: "AI-Powered IoT Network Health Score",
      description:
        "A single health score that summarizes network reliability and device performance using AI-driven signals.",
      icon: "MdAnalytics",
    },
    {
      title: "Device Status Monitoring",
      description:
        "Real-time status for smart office and factory devices, with inventory and connectivity insights.",
      icon: "MdSensors",
    },
    {
      title: "Real-Time Alerts & Notifications",
      description:
        "Instant alerts for anomalies and failures with customizable notification channels for on-call teams.",
      icon: "MdNotificationsActive",
    },
    {
      title: "Predictive Maintenance Recommendations",
      description:
        "AI suggests maintenance actions before failures occur, lowering downtime and maintenance costs.",
      icon: "MdBuild",
    },
    {
      title: "Historical Analytics & Performance Trends",
      description:
        "Drill into historical metrics to spot trends, regressions, and long-term improvements.",
      icon: "MdHistory",
    },
    {
      title: "Exportable Reports for IT/Operations Teams",
      description:
        "Generate PDF/CSV reports for audits, SLAs, and executive summaries tailored for teams.",
      icon: "MdFileDownload",
    },
  ];

  return (
    <main className='min-h-screen pb-24'>
      <div className='max-w-7xl mx-auto px-6 pt-14'>
        <div className='mb-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start'>
          <div className='lg:col-span-7 min-h-[400px] flex flex-col justify-center'>
            <h1 className='text-4xl sm:text-5xl font-extrabold tracking-tight'>
              Features
            </h1>
            <p className='mt-3 text-white/80 text-lg max-w-3xl'>
              An elegant, operational-first dashboard for IoT fleets. Monitor
              health, automate remediation, and visualize trends — all from a
              single pane.
            </p>

            <div className='mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3'>
              <Button asChild variant='default'>
                <Link href='/auth/signup'>Get started</Link>
              </Button>

              <div className='flex items-center gap-3'>
                <Link
                  href='/contact'
                  className='text-sm text-white/70 hover:underline'
                >
                  Contact sales
                </Link>
              </div>

              <span className='ml-auto sm:ml-0 text-xs text-white/60'>
                Trusted by operators worldwide
              </span>
            </div>

            {/* Search / filter features */}
            <div className='mt-8'>
              <label htmlFor='features-search' className='sr-only'>
                Search features
              </label>
              <input
                id='features-search'
                type='search'
                placeholder='Search features (e.g. alerts, analytics, reports)'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className='w-full sm:w-80 bg-white/5 focus:bg-white/6 focus:ring-1 focus:ring-[var(--accent)] rounded-full px-4 py-2 text-sm placeholder:text-white/50 transition'
              />
            </div>
          </div>

          <aside className='lg:col-span-5 min-h-[400px] flex flex-col justify-center'>
            <Card className='p-6 rounded-3xl'>
              <h4 className='font-semibold text-lg'>
                Why choose our dashboard?
              </h4>
              <p className='mt-2 text-sm text-white/70'>
                Operational insights, built for scale and privacy.
              </p>
              <ul className='mt-4 text-sm text-white/80 space-y-2'>
                <li>• AI-driven insights that reduce mean time to repair</li>
                <li>
                  • Privacy-first edge processing for sensitive deployments
                </li>
                <li>• Integrations with popular observability tools</li>
              </ul>
            </Card>
          </aside>
          <Card className='mt-12 col-span-full p-6 lg:p-8 rounded-3xl'>
            <div className='flex flex-col lg:flex-row lg:items-start gap-6'>
              <div className='flex-1'>
                <h3 className='text-lg font-semibold'>Live overview</h3>
                <p className='text-sm text-white/70 mt-1'>
                  Real-time trends and alerts across your fleet.
                </p>

                <div className='mt-4'>
                  <div className='flex flex-wrap items-center justify-center gap-3 mb-4'>
                    <div className='text-xs text-white/70 mr-2'>Range</div>
                    {(["1M", "3M", "6M", "1Y"] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => setRange(r)}
                        className={`text-sm px-3 py-1 rounded-full ${
                          range === r
                            ? "bg-[var(--accent)] text-white"
                            : "bg-white/3 text-white/80"
                        }`}
                      >
                        {r}
                      </button>
                    ))}

                    <div className='ml-3 flex items-center gap-2'>
                      <label
                        htmlFor='show-error'
                        className='text-xs text-white/70'
                      >
                        Show error rate
                      </label>
                      <Switch
                        id='show-error'
                        checked={showError}
                        onCheckedChange={(val) => setShowError(Boolean(val))}
                        className={
                          showError ? "bg-[var(--accent)]" : "bg-white/6"
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='w-full lg:w-64'>
                <div className='text-xs text-white/70 mb-2'>Quick actions</div>
                <div className='flex flex-col gap-2'>
                  <Link
                    href='/features/details'
                    className='text-[var(--accent)] hover:underline'
                  >
                    See detailed reference
                  </Link>
                </div>
              </div>
            </div>
            <div>
              {chartLoading ? (
                <div className='h-72 w-full rounded-2xl glass-faint animate-pulse' />
              ) : (
                <FeatureChart
                  labels={labels}
                  latencyData={latencyData}
                  errorData={errorData}
                  showError={showError}
                />
              )}
            </div>
          </Card>
        </div>

        <section aria-labelledby='features-heading'>
          <div className='mb-6 flex items-center justify-between'>
            <h2 id='features-heading' className='text-2xl font-semibold'>
              Core capabilities
            </h2>
            <Link
              href='/features/details'
              className='text-sm text-white/70 hover:underline'
            >
              See detailed reference
            </Link>
          </div>

          <motion.div
            initial='hidden'
            animate='show'
            variants={container}
            className='grid grid-cols-1 md:grid-cols-2 gap-8'
          >
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className='p-0'>
                    <SkeletonCard />
                  </div>
                ))
              : benefits
                  .filter(
                    (b) =>
                      b.title.toLowerCase().includes(query.toLowerCase()) ||
                      b.description.toLowerCase().includes(query.toLowerCase())
                  )
                  .map((b) => {
                    const Icon: IconType =
                      (icons as unknown as Record<string, IconType>)[b.icon] ||
                      (icons as unknown as Record<string, IconType>).MdInfo;
                    return (
                      <motion.div
                        key={b.title}
                        variants={item}
                        className='mb-4'
                      >
                        <Card className='p-5 glass-faint transition-transform transform-gpu hover:-translate-y-1 hover:shadow-md border-l-2 border-transparent hover:border-[rgba(179,45,255,0.12)]'>
                          <div className='flex items-start gap-3'>
                            <div className='flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-br from-[rgba(179,45,255,0.06)] to-transparent'>
                              <Icon className='text-2xl text-[var(--accent)]' />
                            </div>

                            <div className='flex-1'>
                              <div className='text-lg font-semibold'>
                                {b.title}
                              </div>
                              <div className='mt-2 text-sm text-white/80'>
                                {b.description}
                              </div>
                              <div className='mt-3'>
                                <Link
                                  href={`/features/details#${slugify(b.title)}`}
                                  className='text-[var(--accent)] text-sm hover:underline'
                                >
                                  Learn more →
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
          </motion.div>
        </section>

        <section aria-labelledby='highlights-heading' className='mt-8'>
          <div className='mb-4'>
            <h2 id='highlights-heading' className='text-2xl font-semibold'>
              Highlighted features
            </h2>
            <p className='text-sm text-white/70 mt-1'>
              Key capabilities that show our platform operational value.
            </p>
          </div>

          <motion.div
            initial='hidden'
            animate='show'
            variants={container}
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
          >
            {highlights.map((h) => {
              const Icon: IconType =
                (icons as unknown as Record<string, IconType>)[h.icon] ||
                (icons as unknown as Record<string, IconType>).MdInfo;
              return (
                <motion.div key={h.title} variants={item}>
                  <Card className='p-5 glass-faint transition-transform transform-gpu hover:-translate-y-1 hover:shadow-md border-l-2 border-transparent hover:border-[rgba(179,45,255,0.12)]'>
                    <div className='flex items-start gap-3'>
                      <div className='flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-br from-[rgba(179,45,255,0.06)] to-transparent'>
                        <Icon className='text-2xl text-[var(--accent)]' />
                      </div>

                      <div className='flex-1'>
                        <div className='text-lg font-semibold'>{h.title}</div>
                        <div className='mt-2 text-sm text-white/80'>
                          {h.description}
                        </div>
                        <div className='mt-3'>
                          <Link
                            href={`/features/details#${slugify(h.title)}`}
                            className='text-[var(--accent)] text-sm hover:underline'
                          >
                            Learn more →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      </div>
    </main>
  );
}

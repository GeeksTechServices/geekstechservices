"use client";

import React from "react";
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
import type { ChartOptions, ChartData } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// avoid touching DOM during SSR; defaults will be adjusted client-side in effect

interface ObservabilityDatum {
  date: string;
  avgLatency: number;
  errorRate: number;
  [key: string]: unknown;
}

export default function ObservabilityChart({
  data,
}: {
  data: ObservabilityDatum[];
}): React.ReactElement {
  const labels = data.map((d: ObservabilityDatum) => d.date);

  // initialize client-side state with base data and apply jitter periodically
  const [latency, setLatency] = React.useState<number[]>(() =>
    data.map((d) => d.avgLatency)
  );
  const [errorRate, setErrorRate] = React.useState<number[]>(() =>
    data.map((d) => d.errorRate)
  );

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setLatency((prev) =>
        prev.map((v) =>
          Math.max(0, Math.round(v + (Math.random() - 0.5) * v * 0.05))
        )
      );
      setErrorRate((prev) =>
        prev.map((v) =>
          Math.max(
            0,
            Math.round(v + (Math.random() - 0.5) * Math.max(1, v * 0.06))
          )
        )
      );
    }, 3000);

    return () => window.clearInterval(id);
  }, []);

  // runtime: read CSS variables so colors match theme (dark/light)
  function getCssColor(varName: string, fallback = "#b32dff") {
    if (typeof window === "undefined") return fallback;
    const el = document.createElement("div");
    el.style.color = `var(${varName}, ${fallback})`;
    el.style.display = "none";
    document.body.appendChild(el);
    const color = getComputedStyle(el).color || fallback;
    document.body.removeChild(el);
    return color;
  }

  function rgbaFromCssColor(cssColor: string, alpha = 1) {
    // cssColor expected as rgb(...) or rgba(...)
    const m = cssColor.match(/rgba?\(([^)]+)\)/);
    if (!m) return cssColor; // fallback to raw string
    const parts = m[1].split(",").map((s) => s.trim());
    const r = parts[0];
    const g = parts[1];
    const b = parts[2];
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const accentCss = getCssColor("--accent", "#b32dff");
  const accentBg = rgbaFromCssColor(accentCss, 0.12);
  const accentLine = accentCss;
  const altCss = getCssColor("--sidebar-accent-foreground", "#60a5fa");
  const altBg = rgbaFromCssColor(altCss, 0.12);

  const fgCss = getCssColor("--muted-foreground", "rgb(180,180,180)");
  const borderCss = getCssColor("--border", "rgb(70,70,70)");
  const gridCss = rgbaFromCssColor(borderCss, 0.08);

  // set ChartJS defaults for text color once client-side
  React.useEffect(() => {
    try {
      ChartJS.defaults.color = fgCss;
    } catch {
      // ignore
    }
  }, [fgCss]);

  const chartData: ChartData<"line", number[], string> = React.useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: "Avg latency (ms)",
          data: latency,
          borderColor: accentLine,
          backgroundColor: accentBg,
          borderWidth: 2.5,
          pointRadius: 0,
          tension: 0.2,
        },
        {
          label: "Error rate (%)",
          data: errorRate,
          borderColor: altCss,
          backgroundColor: altBg,
          borderWidth: 2.5,
          pointRadius: 0,
          tension: 0.2,
          yAxisID: "y1",
        },
      ],
    };
  }, [labels, latency, errorRate, accentLine, accentBg, altCss, altBg]);

  const options: ChartOptions<"line"> = React.useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: { labels: { color: fgCss } },
        tooltip: {
          mode: "index",
          intersect: false,
          titleColor: fgCss,
          bodyColor: fgCss,
        },
      },
      scales: {
        x: {
          ticks: { color: fgCss },
          grid: { color: gridCss },
        },
        y: {
          beginAtZero: true,
          ticks: { color: fgCss },
          grid: { color: gridCss },
        },
        y1: {
          position: "right",
          beginAtZero: true,
          ticks: { color: fgCss },
          grid: { drawOnChartArea: false },
        },
      },
    }),
    [fgCss, gridCss]
  );

  return <Line data={chartData} options={options} />;
}

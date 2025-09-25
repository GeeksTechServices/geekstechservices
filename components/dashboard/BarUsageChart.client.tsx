"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);
ChartJS.defaults.color = "hsl(var(--muted-foreground))";

interface BarUsageChartProps {
  days?: number;
  colorVar?: string;
}

export default function BarUsageChart({
  days = 14,
  colorVar = "--chart-3",
}: BarUsageChartProps) {
  const labels = Array.from({ length: days }, (_, i) => `D${i + 1}`);
  const values = React.useMemo(
    () => Array.from({ length: days }, () => Math.round(Math.random() * 100)),
    [days]
  );
  const data = {
    labels,
    datasets: [
      {
        label: "Calls",
        data: values,
        backgroundColor: `hsl(var(${colorVar}) / 0.65)`,
        borderRadius: 6,
        maxBarThickness: 22,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { tooltip: { enabled: true } },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "hsl(var(--muted-foreground))" },
      },
      y: {
        grid: { color: "hsl(var(--border))" },
        ticks: { color: "hsl(var(--muted-foreground))" },
      },
    },
  } as const;
  return (
    <div className='h-48'>
      <Bar data={data} options={options} />
    </div>
  );
}

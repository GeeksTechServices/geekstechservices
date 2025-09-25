"use client";
import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip
);
// Improve default contrast on dark backgrounds
ChartJS.defaults.color = "hsl(var(--muted-foreground))";

interface MiniSparklineProps {
  values?: number[];
  colorVar?: string; // CSS var e.g. --chart-1
}

export default function MiniSparkline({
  values,
  colorVar = "--chart-1",
}: MiniSparklineProps) {
  const data = React.useMemo(() => {
    const vals =
      values ?? Array.from({ length: 14 }, () => 10 + Math.random() * 90);
    return {
      labels: vals.map((_, i) => `${i}`),
      datasets: [
        {
          data: vals,
          borderColor: `hsl(var(${colorVar}))`,
          backgroundColor: `hsl(var(${colorVar}) / 0.18)`,
          borderWidth: 2.5,
          tension: 0.4,
          fill: true,
          pointRadius: 0,
        },
      ],
    };
  }, [values, colorVar]);

  const options = React.useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: { tooltip: { enabled: false } },
      elements: { line: { borderJoinStyle: "round" as const } },
      scales: { x: { display: false }, y: { display: false } },
    }),
    []
  );

  return (
    <div className='h-10 w-full'>
      <Line data={data} options={options} />
    </div>
  );
}

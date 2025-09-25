"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { TooltipItem } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  data: Array<{ label: string; value: number; color: string }>;
  centerText?: string;
  size?: number;
}

export default function DonutChart({
  data,
  centerText,
  size = 200,
}: DonutChartProps) {
  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        data: data.map((d) => d.value),
        backgroundColor: data.map((d) => d.color),
        borderColor: "hsl(var(--background))",
        borderWidth: 2,
        cutout: "70%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: { color: "hsl(var(--muted-foreground))" },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'doughnut'>) =>
            `${context.label}: ${context.parsed}%`,
        },
      },
      },
    },
  };

  return (
    <div className='relative' style={{ width: size, height: size }}>
      <Doughnut data={chartData} options={options} />
      {centerText && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center'>
            <div className='text-2xl font-bold'>{centerText}</div>
          </div>
        </div>
      )}
    </div>
  );
}

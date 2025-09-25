"use client";

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

// Type for individual chart data points (optional, for future enhancements)

interface DataSet {
  data: (number | null)[];
  label: string;
  borderColor: string;
  backgroundColor: string;
  borderDash?: number[];
  fill: boolean;
}

interface ChartData {
  labels: string[];
  datasets: DataSet[];
}

interface ForecastChartProps {
  data: ChartData;
  height?: number;
  type?: "line" | "bar";
  showLegend?: boolean;
}

const ForecastChart: React.FC<ForecastChartProps> = ({
  data,
  height = 240,
  type = "line",
  showLegend = true,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: showLegend,
            position: "top",
            labels: {
              usePointStyle: true,
              boxWidth: 6,
              padding: 15,
              font: {
                size: 11,
              },
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "hsl(var(--card))",
            titleColor: "hsl(var(--foreground))",
            bodyColor: "hsl(var(--muted-foreground))",
            borderColor: "hsl(var(--border))",
            borderWidth: 1,
            padding: 10,
            titleFont: {
              size: 12,
              weight: "bold",
            },
            bodyFont: {
              size: 11,
            },
            callbacks: {
              label: function (context) {
                const value = context.parsed.y;
                if (value === null)
                  return `${context.dataset.label}: Predicted`;
                const label = context.dataset.label || "";
                if (label.toLowerCase().includes("cost")) {
                  return `${label}: $${value}`;
                } else if (label.toLowerCase().includes("calls")) {
                  return `${label}: ${value.toLocaleString()}`;
                }
                return `${label}: ${value}`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 10,
              },
            },
          },
          y: {
            beginAtZero: false,
            grid: {
              color: "hsl(var(--border) / 0.3)",
            },
            ticks: {
              font: {
                size: 10,
              },
              callback: function (value) {
                if (data.datasets[0].label.toLowerCase().includes("cost")) {
                  return `$${value}`;
                } else if (
                  data.datasets[0].label.toLowerCase().includes("calls")
                ) {
                  const num = Number(value);
                  if (num >= 1000) {
                    return `${Math.round(num / 1000)}k`;
                  }
                  return value;
                }
                return value;
              },
            },
          },
        },
        elements: {
          line: {
            tension: 0.2, // Smoother curves
          },
          point: {
            radius: 2,
            hoverRadius: 4,
          },
        },
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, type, showLegend]);

  return (
    <div style={{ height: `${height}px`, width: "100%" }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default ForecastChart;

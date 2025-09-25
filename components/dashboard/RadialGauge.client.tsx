"use client";
import React from "react";

interface RadialGaugeProps {
  value: number; // 0-100
  size?: number;
  label?: string;
  colorVar?: string;
}

export default function RadialGauge({
  value,
  size = 120,
  label,
  colorVar = "--primary",
}: RadialGaugeProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      style={{ width: size, height: size }}
      className='relative flex items-center justify-center'
    >
      <svg width={size} height={size} className='rotate-[-90deg]'>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke='hsl(var(--muted-foreground)/0.15)'
          strokeWidth={stroke}
          fill='transparent'
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`hsl(var(${colorVar}))`}
          strokeWidth={stroke}
          fill='transparent'
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap='round'
          className='transition-[stroke-dashoffset] duration-700 ease-out'
        />
      </svg>
      <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
        <span className='text-xl font-semibold'>{Math.round(clamped)}%</span>
        {label && (
          <span className='text-xs text-muted-foreground mt-0.5'>{label}</span>
        )}
      </div>
    </div>
  );
}

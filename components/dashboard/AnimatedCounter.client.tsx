"use client";
import React from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  // serializable formatting options (functions cannot be passed from server components)
  format?: "default" | "k" | "locale" | "percent" | "gb" | "currency";
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export default function AnimatedCounter({
  value,
  duration = 2000,
  format = "default",
  decimals,
  prefix = "",
  suffix = "",
}: AnimatedCounterProps) {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const increment = end / (duration / 16);
    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCurrent(end);
        clearInterval(counter);
      } else {
        setCurrent(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [value, duration]);

  const formatValue = (n: number) => {
    const d =
      typeof decimals === "number"
        ? decimals
        : format === "k"
        ? 1
        : format === "percent"
        ? 2
        : 0;
    switch (format) {
      case "k":
        return `${prefix}${(n / 1000).toFixed(d)}k${suffix}`;
      case "locale":
        return `${prefix}${n.toLocaleString()}${suffix}`;
      case "percent":
        return `${prefix}${n.toFixed(d)}%${suffix}`;
      case "gb":
        return `${prefix}${n.toFixed(d)}GB${suffix}`;
      case "currency":
        return `${prefix}${n.toFixed(d)}${suffix}`;
      case "default":
      default:
        return `${prefix}${n.toLocaleString()}${suffix}`;
    }
  };

  const display = formatValue(current);

  return (
    <span className='inline-block tabular-nums transition-all duration-300'>
      {display}
    </span>
  );
}

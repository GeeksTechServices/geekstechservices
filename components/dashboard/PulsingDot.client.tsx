"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface PulsingDotProps {
  color?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
}

export default function PulsingDot({
  color = "green",
  size = "md",
  label,
}: PulsingDotProps) {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  const colorClasses = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
  };

  return (
    <div className='flex items-center gap-2'>
      <div className='relative'>
        <div
          className={cn(
            "rounded-full animate-pulse",
            sizeClasses[size],
            colorClasses[color as keyof typeof colorClasses] || "bg-green-500"
          )}
        />
        <div
          className={cn(
            "absolute inset-0 rounded-full animate-ping opacity-30",
            sizeClasses[size],
            colorClasses[color as keyof typeof colorClasses] || "bg-green-500"
          )}
        />
      </div>
      {label && <span className='text-xs text-muted-foreground'>{label}</span>}
    </div>
  );
}

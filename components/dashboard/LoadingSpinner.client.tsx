"use client";
import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

export default function LoadingSpinner({
  size = "md",
  color = "currentColor",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className={`${sizeClasses[size]} animate-spin`}>
      <div
        className='w-full h-full rounded-full border-2 border-transparent'
        style={{
          borderTopColor: color,
          borderRightColor: `${color}30`,
        }}
      />
    </div>
  );
}

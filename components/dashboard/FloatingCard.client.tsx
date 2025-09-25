"use client";
import React from "react";

interface FloatingCardProps {
  children: React.ReactNode;
  // keep delay prop for backward compatibility; no longer used
  delay?: number;
}

// Simplified: remove bounce / hover scale so cards are static per user request
export default function FloatingCard({ children }: FloatingCardProps) {
  return <div className='w-full h-full'>{children}</div>;
}

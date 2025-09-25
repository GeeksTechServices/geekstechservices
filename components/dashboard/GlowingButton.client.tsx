"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface GlowingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  glowColor?: "blue" | "purple" | "green" | "red";
  intensity?: "low" | "medium" | "high";
}

export default function GlowingButton({
  children,
  glowColor = "blue",
  intensity = "medium",
  className,
  ...props
}: GlowingButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const glowIntensity = {
    low: "shadow-md",
    medium: "shadow-lg",
    high: "shadow-xl",
  };

  const glowColors = {
    blue: "shadow-blue-500/25",
    purple: "shadow-purple-500/25",
    green: "shadow-green-500/25",
    red: "shadow-red-500/25",
  };

  return (
    <Button
      className={cn(
        "relative px-4 py-2 rounded-lg font-medium transition-all duration-300",
        "bg-gradient-to-r from-primary/90 to-primary",
        "hover:from-primary hover:to-primary/90",
        isHovered && glowIntensity[intensity],
        isHovered && glowColors[glowColor],
        "transform hover:scale-105 active:scale-95",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <span className='relative z-10 text-primary-foreground'>{children}</span>
      {isHovered && (
        <div className='absolute inset-0 bg-gradient-to-r from-primary/50 to-primary/30 rounded-lg animate-pulse' />
      )}
    </Button>
  );
}

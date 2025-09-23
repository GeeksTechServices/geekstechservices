"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 motion-safe:will-change-transform",
  {
    variants: {
      variant: {
        default: "bg-[var(--accent)] text-white shadow hover:brightness-105",
        destructive:
          "bg-[var(--destructive)] text-white shadow-sm hover:brightness-95",
        outline:
          "border border-[var(--accent)] bg-transparent shadow-sm text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white",
        secondary:
          "bg-[var(--secondary)] text-[var(--secondary-foreground)] shadow-sm hover:brightness-105",
        ghost:
          "bg-transparent hover:bg-[rgba(179,45,255,0.06)] hover:text-[var(--accent)]",
        link: "text-[var(--accent)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, onFocus, onBlur, ...props },
    ref
  ) => {
    const Comp: React.ElementType = asChild ? Slot : motion.button;

    const [focused, setFocused] = React.useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
      setFocused(true);
      if (onFocus) onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
      setFocused(false);
      if (onBlur) onBlur(e);
    };

    // motion props only apply when we're rendering a real button (not asChild)
    const motionProps = !asChild
      ? {
          whileHover: { scale: 1.02, y: -2 },
          whileTap: { scale: 0.985 },
          animate: focused ? { scale: 1.02, y: -2 } : { scale: 1, y: 0 },
          transition: { type: "spring", stiffness: 400, damping: 28 },
        }
      : {};

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...motionProps}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

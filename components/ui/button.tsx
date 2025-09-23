"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--accent)] text-white shadow hover:bg-[var(--accent)]/90",
        accent:
          "bg-[var(--accent)] text-white shadow hover:bg-[var(--accent)]/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-[var(--accent)] hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-[var(--accent)] hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
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

type MotionButtonProps = HTMLMotionProps<"button">;

const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  (props, ref) => {
    return <motion.button ref={ref} {...props} />;
  }
);
MotionButton.displayName = "MotionButton";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));

    if (asChild) {
      const Comp = Slot;
      return (
        <Comp
          className={classes}
          ref={ref}
          {...(props as React.ComponentPropsWithoutRef<"button">)}
        />
      );
    }

    // Subtle motion on hover/press
    return (
      <MotionButton
        ref={ref}
        className={classes}
        whileHover={{ translateY: -2 }}
        whileTap={{ translateY: 0, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        {...(props as unknown as MotionButtonProps)}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

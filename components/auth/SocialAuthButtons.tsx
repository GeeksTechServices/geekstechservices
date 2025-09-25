"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

interface SocialAuthButtonsProps {
  onGoogle: () => void;
  onGitHub: () => void;
  disabled?: boolean;
  size?: "default" | "sm" | "lg" | null;
  layout?: "stack" | "row";
}

// Branded social auth buttons consistent across auth pages.
export function SocialAuthButtons({
  onGoogle,
  onGitHub,
  disabled,
  size = "default",
  layout = "stack",
}: SocialAuthButtonsProps) {
  const common =
    "relative w-full justify-center gap-2 font-medium transition disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <div className={layout === "stack" ? "space-y-3" : "flex gap-3"}>
      <Button
        type='button'
        onClick={onGoogle}
        disabled={disabled}
        size={size || undefined}
        aria-label='Sign in with Google'
        isLoading={disabled}
        className={[
          common,
          "border border-white/15 bg-white text-neutral-900 shadow-sm hover:brightness-95 active:brightness-90",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/60",
        ].join(" ")}
      >
        <FcGoogle className='text-lg' />
        <span className='text-sm'>Continue with Google</span>
      </Button>
      <Button
        type='button'
        onClick={onGitHub}
        disabled={disabled}
        size={size || undefined}
        aria-label='Sign in with GitHub'
        isLoading={disabled}
        className={[
          common,
          "border border-white/15 bg-[#0d1117] text-white hover:bg-[#161b22]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/60",
        ].join(" ")}
      >
        <FaGithub className='text-base' />
        <span className='text-sm'>Continue with GitHub</span>
      </Button>
    </div>
  );
}

export default SocialAuthButtons;

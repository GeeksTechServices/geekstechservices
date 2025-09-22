import React from "react";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "ghost";
};

export default function Button({
  children,
  variant = "solid",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 font-semibold transition";
  const variants = {
    solid: "bg-accent text-black shadow-md hover:brightness-95",
    ghost: "bg-white/6 border border-white/10 text-white hover:bg-white/8",
  } as const;

  return (
    <button className={cx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

import React from "react";

export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`glass border border-white/6 rounded-2xl p-4 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

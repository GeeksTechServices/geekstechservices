import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth — GeekStechServices",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen bg-black/95 text-white flex items-center justify-center'>
      {children}
    </div>
  );
}

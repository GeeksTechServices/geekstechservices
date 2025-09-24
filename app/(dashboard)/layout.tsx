import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — GeekStechServices",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen bg-[var(--bg-dark)] text-white'>
      <main className='container mx-auto px-6 py-8'>{children}</main>
    </div>
  );
}

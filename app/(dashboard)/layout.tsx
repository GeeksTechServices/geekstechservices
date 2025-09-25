import React from "react";
import type { Metadata } from "next";

import DashboardClientWrapper from "@/components/dashboard/DashboardClientWrapper";

export const metadata: Metadata = {
  title: "Dashboard  GeekStechServices",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen bg-[var(--bg-dark)] text-white'>
      <DashboardClientWrapper>{children}</DashboardClientWrapper>
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import the client DashboardShell with ssr:false from inside a
// client component to satisfy Next.js rules when the parent layout is a
// server component.
const DashboardShell = dynamic(() => import("./DashboardShell.client"), {
  ssr: false,
});

export default function DashboardClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}

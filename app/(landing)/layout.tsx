import React from "react";
import type { Metadata } from "next";
import Header from "../components/ui/Header";

export const metadata: Metadata = {
  title: "GeekStechServices",
};

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
}

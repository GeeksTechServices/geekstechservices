import React from "react";
import type { Metadata } from "next";
import Header from "../components/ui/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner.client";

export const metadata: Metadata = {
  title: "GeekStechServices",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
      <CookieBanner />
      <Footer />
    </div>
  );
}

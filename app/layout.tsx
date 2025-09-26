import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// root layout: global providers only. Group-specific layouts will handle the header.
import { ToastProvider, ToastViewport } from "@/components/ui/toast";
import SupportChatbot from "@/components/chat/SupportChatbot.client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GeekStechServices",
  description: "AI powered IoT netork health monitoring and management",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--bg-dark)] text-white`}
      >
        <ToastProvider>
          {children}
          <ToastViewport />
          {/* Site-wide AI Support Chatbot */}
          <SupportChatbot />
        </ToastProvider>
      </body>
    </html>
  );
}

"use client";
import React from "react";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface AuthShellProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  side?: React.ReactNode; // optional side illustration / marketing block
  footer?: React.ReactNode;
  narrow?: boolean;
}

// Ambient gradient / particles backdrop kept lightweight to avoid heavy canvas libs.
const Backdrop = () => (
  <div
    aria-hidden
    className='pointer-events-none absolute inset-0 overflow-hidden'
  >
    <div className='absolute -top-32 left-1/2 h-[640px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_62%)] opacity-[0.14] blur-3xl' />
    <div className='absolute top-1/3 left-[12%] h-72 w-72 rounded-full bg-[linear-gradient(135deg,#b32dff33,#ffffff05)] blur-2xl' />
    <div className='absolute bottom-0 right-[10%] h-80 w-80 rounded-full bg-[linear-gradient(45deg,#b32dff22,#ffffff03)] blur-2xl' />
  </div>
);

export function AuthShell({
  children,
  title,
  subtitle,
  side,
  footer,
  narrow,
}: AuthShellProps) {
  return (
    <main className='relative min-h-screen bg-[var(--bg-dark)] text-white'>
      <Backdrop />
      <div className='relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-14 md:py-20'>
        <div
          className={cn("mx-auto w-full", narrow ? "max-w-lg" : "max-w-6xl")}
        >
          <div
            className={cn(
              "grid w-full items-stretch gap-12",
              side ? "md:grid-cols-2" : ""
            )}
          >
            {side && (
              <div className='hidden flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.035] p-10 backdrop-blur-sm md:flex'>
                <div>
                  <Logo />
                  {title && (
                    <h1 className='mt-10 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight'>
                      {title}
                    </h1>
                  )}
                  {subtitle && (
                    <p className='mt-4 max-w-md text-base leading-relaxed text-gray-300'>
                      {subtitle}
                    </p>
                  )}
                </div>
                <div className='mt-12 text-xs text-gray-500'>
                  <p>IoT Network Health • Edge AI • Predictive Ops</p>
                </div>
              </div>
            )}

            <div className='flex flex-col'>
              <div
                className={cn(
                  "relative w-full rounded-2xl border border-white/10 bg-white/[0.045] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_4px_30px_-8px_#000] backdrop-blur-md md:p-10",
                  side ? "mx-auto max-w-md" : "mx-auto max-w-md"
                )}
              >
                <div className='mb-4'>
                  <Link
                    href='/'
                    className='group inline-flex items-center gap-1 text-xs font-medium text-gray-400 transition hover:text-white'
                  >
                    <span className='inline-block transition group-hover:-translate-x-0.5'>
                      ←
                    </span>
                    <span>Home</span>
                  </Link>
                </div>
                {!side && (
                  <div className='mb-6 flex items-center justify-between'>
                    <Logo compact />
                    {title && (
                      <h1 className='text-lg font-semibold tracking-tight text-white/80'>
                        {title}
                      </h1>
                    )}
                  </div>
                )}
                {side && (
                  <div className='mb-8 block md:hidden'>
                    <Logo />
                    {title && (
                      <h1 className='mt-6 text-3xl font-extrabold leading-tight'>
                        {title}
                      </h1>
                    )}
                    {subtitle && (
                      <p className='mt-3 text-sm leading-relaxed text-gray-300'>
                        {subtitle}
                      </p>
                    )}
                  </div>
                )}
                {children}
              </div>
              {footer && (
                <div className='mx-auto mt-6 w-full max-w-md text-center text-xs text-gray-500'>
                  {footer}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AuthShell;

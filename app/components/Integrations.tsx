"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import integrations from "../../lib/integrations.json";
import { motion } from "framer-motion";
import IntegrationModal from "@/app/components/IntegrationModal";
import Image from "next/image";

function ClientAnimatedGrid() {
  const gridClass = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  } as const;

  const item = {
    hidden: { y: 8, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.36, ease: "easeOut" } },
  } as const;

  return (
    <motion.div
      className={gridClass}
      initial='hidden'
      animate='show'
      variants={container}
    >
      {integrations.map((it) => (
        <motion.div key={it.name} variants={item}>
          <Card className='glass-strong card-elevated bg-[rgba(255,255,255,0.02)] backdrop-blur-sm border border-[var(--accent)]/12 text-white hover:shadow-[0_8px_30px_rgba(179,45,255,0.08)] hover:-translate-y-1 transition-transform'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div
                  className={`flex items-center justify-center gap-3 ${
                    it.name === "Scaleway" || it.name === "Grafana"
                      ? "bg-black"
                      : "bg-white"
                  } p-2 rounded-lg`}
                >
                  <Image
                    src={it.logo}
                    alt={`${it.name} logo`}
                    width={32}
                    height={32}
                    className='h-8 w-auto'
                  />
                </div>
                <div>
                  <Link href={it.docs} target='_blank'>
                    <Button
                      variant='ghost'
                      size='icon'
                      aria-label={`Open ${it.name} docs`}
                    >
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                        className='text-white/80'
                        aria-hidden
                      >
                        <path
                          d='M14 3h7v7'
                          stroke='currentColor'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M10 14L21 3'
                          stroke='currentColor'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M21 21H3V3'
                          stroke='currentColor'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </Button>
                  </Link>
                </div>
              </div>
              <div className='pt-5'>
                <CardTitle>{it.name}</CardTitle>
                <CardDescription className='text-xs'>
                  {it.category}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-white/80'>{it.description}</p>
            </CardContent>
            <CardFooter className='flex items-center justify-between'>
              <div className='text-xs text-white/70'>Docs available</div>
              <div className='flex items-center gap-2'>
                <IntegrationModal integration={it} />
                <a href={it.href} target='_blank' rel='noreferrer'>
                  <Button variant='default' size='sm'>
                    Connect
                  </Button>
                </a>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function Integrations() {
  return (
    <section className='my-20'>
      <div className='mx-auto max-w-6xl px-6'>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h3 className='text-sm font-semibold uppercase tracking-wider text-[var(--accent)]'>
              Integrations
            </h3>
            <p className='mt-1 text-2xl font-extrabold'>
              Work with your existing stack
            </p>
            <p className='mt-2 text-sm text-white/80 max-w-xl'>
              Prebuilt connectors, SDKs, and webhooks to integrate device health
              and alerts into the tools your teams already use.
            </p>
          </div>
        </div>
        {/* Only trigger the staggered animation after the component mounts on the client
            to avoid server-rendered inline styles setting opacity:0 and causing invisible cards */}
        <ClientAnimatedGrid />
      </div>
    </section>
  );
}

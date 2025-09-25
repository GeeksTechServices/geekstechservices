import React from "react";
import ObservabilityChart from "@/components/dashboard/ObservabilityChart.client";
import RecentLogs from "@/components/dashboard/RecentLogs.client";
import metricsData from "@/lib/metrics.json";
import MiniSparkline from "@/components/dashboard/MiniSparkline.client";
import RadialGauge from "@/components/dashboard/RadialGauge.client";
import FloatingCard from "@/components/dashboard/FloatingCard.client";
import AnimatedCounter from "@/components/dashboard/AnimatedCounter.client";
import SystemStatusWidget from "@/components/dashboard/SystemStatusWidget.client";
import NotificationsWidget from "@/components/dashboard/NotificationsWidget.client";
import GlowingButton from "@/components/dashboard/GlowingButton.client";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Overview" };

export default function DashboardPage() {
  return (
    <main className='min-h-screen p-8'>
      <div className='w-full'>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h1 className='text-3xl font-semibold'>Overview</h1>
            <p className='text-muted-foreground'>
              A quick glance at your account.
            </p>
          </div>
          <GlowingButton glowColor='blue'>Quick Deploy</GlowingButton>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
          <FloatingCard delay={0}>
            <div className='p-4 bg-card rounded-lg space-y-2'>
              <div className='flex items-center justify-between text-xs text-muted-foreground'>
                <span>Active Projects</span>
                <span className='font-medium text-primary'>+1</span>
              </div>
              <div className='text-3xl font-bold'>
                <AnimatedCounter value={3} />
              </div>
              <MiniSparkline />
            </div>
          </FloatingCard>

          <FloatingCard delay={200}>
            <div className='p-4 bg-card rounded-lg space-y-2'>
              <div className='flex items-center justify-between text-xs text-muted-foreground'>
                <span>MTH Revenue</span>
                <span className='font-medium text-primary'>+8%</span>
              </div>
              <div className='text-3xl font-bold'>
                <AnimatedCounter
                  value={2300}
                  format='k'
                  prefix='$'
                  decimals={1}
                />
              </div>
              <MiniSparkline colorVar='--chart-2' />
            </div>
          </FloatingCard>

          <FloatingCard delay={400}>
            <div className='p-4 bg-card rounded-lg space-y-2'>
              <div className='flex items-center justify-between text-xs text-muted-foreground'>
                <span>Requests</span>
                <span className='font-medium text-primary'>+12%</span>
              </div>
              <div className='text-3xl font-bold'>
                <AnimatedCounter value={12400} format='k' decimals={1} />
              </div>
              <MiniSparkline colorVar='--chart-3' />
            </div>
          </FloatingCard>

          <FloatingCard delay={600}>
            <div className='p-4 bg-card rounded-lg space-y-2 flex flex-col items-center justify-center'>
              <RadialGauge value={72} label='Uptime' />
              <Button size='sm' variant='secondary' className='mt-2 w-full'>
                View Status
              </Button>
            </div>
          </FloatingCard>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6'>
          <div className='lg:col-span-2 p-4 bg-card rounded-lg flex flex-col'>
            <div className='flex items-center justify-between mb-3'>
              <h4 className='font-semibold'>Latency & Error Rate</h4>
              <Button variant='outline' size='sm'>
                Details
              </Button>
            </div>
            <div className='w-full h-64'>
              <ObservabilityChart data={metricsData} />
            </div>
          </div>

          <div className='p-4 bg-card rounded-lg'>
            <RecentLogs />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <SystemStatusWidget />
          <NotificationsWidget />
        </div>
      </div>
    </main>
  );
}

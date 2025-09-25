import React from "react";
import BarUsageChart from "@/components/dashboard/BarUsageChart.client";
import UsageBreakdown from "@/components/dashboard/UsageBreakdown.client";
import RadialGauge from "@/components/dashboard/RadialGauge.client";
import AnimatedCounter from "@/components/dashboard/AnimatedCounter.client";
import FloatingCard from "@/components/dashboard/FloatingCard.client";
import GlowingButton from "@/components/dashboard/GlowingButton.client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Usage" };

export default function UsagePage() {
  return (
    <main className='p-6 space-y-8'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-semibold'>Usage</h1>
          <p className='text-muted-foreground'>
            Monitor consumption across key dimensions.
          </p>
        </div>
        <GlowingButton glowColor='purple'>Upgrade Plan</GlowingButton>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <FloatingCard delay={0}>
          <div className='p-4 rounded-lg bg-card flex flex-col items-center justify-center relative'>
            <RadialGauge value={58} label='API' />
            <Badge className='absolute top-2 right-2 text-xs'>
              <AnimatedCounter value={58} />%
            </Badge>
          </div>
        </FloatingCard>

        <FloatingCard delay={200}>
          <div className='p-4 rounded-lg bg-card flex flex-col items-center justify-center relative'>
            <RadialGauge value={27} label='Compute' colorVar='--chart-2' />
            <Badge className='absolute top-2 right-2 text-xs'>
              <AnimatedCounter value={27} />%
            </Badge>
          </div>
        </FloatingCard>

        <FloatingCard delay={400}>
          <div className='p-4 rounded-lg bg-card flex flex-col items-center justify-center relative'>
            <RadialGauge value={12} label='Storage' colorVar='--chart-3' />
            <Badge className='absolute top-2 right-2 text-xs'>
              <AnimatedCounter value={12} />%
            </Badge>
          </div>
        </FloatingCard>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        <Card>
          <CardContent className='p-4 text-center'>
            <div className='text-3xl font-bold text-blue-600'>
              <AnimatedCounter value={12400} format='k' decimals={1} />
            </div>
            <p className='text-sm text-muted-foreground'>Total Requests</p>
            <div className='text-xs text-green-600 mt-1'>+12% this month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-4 text-center'>
            <div className='text-3xl font-bold text-purple-600'>
              <AnimatedCounter value={2200} format='locale' />
            </div>
            <p className='text-sm text-muted-foreground'>Compute Minutes</p>
            <div className='text-xs text-green-600 mt-1'>+5% this month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-4 text-center'>
            <div className='text-3xl font-bold text-orange-600'>
              <AnimatedCounter value={12.3} format='gb' decimals={1} />
            </div>
            <p className='text-sm text-muted-foreground'>Storage Used</p>
            <div className='text-xs text-yellow-600 mt-1'>+2% this month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-4 text-center'>
            <div className='text-3xl font-bold text-green-600'>
              <AnimatedCounter value={86.5} format='gb' decimals={1} />
            </div>
            <p className='text-sm text-muted-foreground'>Bandwidth</p>
            <div className='text-xs text-green-600 mt-1'>+18% this month</div>
          </CardContent>
        </Card>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2 p-6 rounded-lg bg-card space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Daily Requests</h2>
            <div className='flex items-center gap-2'>
              <span className='text-xs text-muted-foreground'>
                Last 14 days
              </span>
              <Badge variant='outline'>Live</Badge>
            </div>
          </div>
          <BarUsageChart />
        </div>
        <div className='p-6 rounded-lg bg-card'>
          <h2 className='text-lg font-semibold mb-4'>Quota Breakdown</h2>
          <UsageBreakdown />

          <div className='mt-6 pt-4 border-t'>
            <h3 className='text-sm font-semibold mb-3'>Usage Alerts</h3>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-yellow-500 rounded-full' />
                <span className='text-xs'>API calls at 58% of limit</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-green-500 rounded-full' />
                <span className='text-xs'>Storage usage healthy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

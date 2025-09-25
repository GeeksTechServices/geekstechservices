import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InvoicesTable from "@/components/dashboard/InvoicesTable.client";
import UsageBreakdown from "@/components/dashboard/UsageBreakdown.client";
import AnimatedCounter from "@/components/dashboard/AnimatedCounter.client";
import FloatingCard from "@/components/dashboard/FloatingCard.client";
import GlowingButton from "@/components/dashboard/GlowingButton.client";
import DonutChart from "@/components/dashboard/DonutChart.client";
import BillingAIPredictor from "@/components/dashboard/BillingAIInsights.client";
import PredictiveCostForecast from "@/components/dashboard/PredictiveCostForecast.client";

export const metadata = { title: "Billing" };

export default function BillingPage() {
  const spendingData = [
    { label: "API Calls", value: 45, color: "hsl(var(--chart-1))" },
    { label: "Compute", value: 30, color: "hsl(var(--chart-2))" },
    { label: "Storage", value: 15, color: "hsl(var(--chart-3))" },
    { label: "Bandwidth", value: 10, color: "hsl(var(--chart-4))" },
  ];

  return (
    <main className='p-6 space-y-8'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-semibold'>Billing</h1>
          <p className='text-muted-foreground'>
            Manage subscription, usage and invoices.
          </p>
        </div>
        <div className='flex gap-2'>
          <Button size='sm' variant='secondary'>
            Update Payment Method
          </Button>
          <GlowingButton glowColor='blue' className='text-sm px-3 py-2'>
            Upgrade Plan
          </GlowingButton>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
        <FloatingCard delay={0}>
          <Card>
            <CardContent className='p-4 text-center'>
              <div className='text-2xl font-bold text-blue-600'>
                $<AnimatedCounter value={29} />
              </div>
              <p className='text-sm text-muted-foreground'>Current Bill</p>
              <Badge variant='secondary' className='text-xs mt-1'>
                Pro Plan
              </Badge>
            </CardContent>
          </Card>
        </FloatingCard>

        <FloatingCard delay={200}>
          <Card>
            <CardContent className='p-4 text-center'>
              <div className='text-2xl font-bold text-green-600'>
                $<AnimatedCounter value={347} />
              </div>
              <p className='text-sm text-muted-foreground'>Total Spent</p>
              <div className='text-xs text-muted-foreground mt-1'>
                This year
              </div>
            </CardContent>
          </Card>
        </FloatingCard>

        <FloatingCard delay={400}>
          <Card>
            <CardContent className='p-4 text-center'>
              <div className='text-2xl font-bold text-purple-600'>
                <AnimatedCounter value={12} />
              </div>
              <p className='text-sm text-muted-foreground'>
                Days Until Renewal
              </p>
              <div className='text-xs text-green-600 mt-1'>Auto-renewal on</div>
            </CardContent>
          </Card>
        </FloatingCard>

        <FloatingCard delay={600}>
          <Card>
            <CardContent className='p-4 text-center'>
              <div className='text-2xl font-bold text-orange-600'>
                <AnimatedCounter value={6} />
              </div>
              <p className='text-sm text-muted-foreground'>Invoices</p>
              <div className='text-xs text-muted-foreground mt-1'>
                This year
              </div>
            </CardContent>
          </Card>
        </FloatingCard>
      </div>

      <div className='mb-8'>
        <Tabs defaultValue='overview' className='w-full'>
          <TabsList className='grid grid-cols-4 max-w-md'>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='ai-insights'>AI Insights</TabsTrigger>
            <TabsTrigger value='usage'>Usage</TabsTrigger>
            <TabsTrigger value='invoices'>Invoices</TabsTrigger>
          </TabsList>

          <TabsContent value='overview' className='pt-6'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              <div className='lg:col-span-2 space-y-6'>
                <div className='p-6 rounded-lg bg-card space-y-4'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h2 className='text-lg font-semibold'>Current Plan</h2>
                      <p className='text-xs text-muted-foreground'>
                        Pro — $<AnimatedCounter value={29} duration={1000} /> /
                        month
                      </p>
                    </div>
                    <GlowingButton
                      glowColor='green'
                      className='text-sm px-3 py-1'
                    >
                      Upgrade
                    </GlowingButton>
                  </div>
                  <UsageBreakdown />
                </div>

                <div className='p-6 rounded-lg bg-card'>
                  <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-lg font-semibold'>Recent Invoices</h2>
                    <Badge variant='outline'>6 Total</Badge>
                  </div>
                  <InvoicesTable />
                </div>
              </div>

              <div className='space-y-6'>
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Invoice</CardTitle>
                    <CardDescription>Next billing cycle</CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='text-center'>
                      <div className='text-3xl font-bold'>
                        $<AnimatedCounter value={29} />
                      </div>
                      <p className='text-xs text-muted-foreground'>
                        Renews{" "}
                        {new Date(
                          Date.now() + 1000 * 60 * 60 * 24 * 12
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <Button size='sm' variant='outline' className='w-full'>
                      Download Preview
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Spending Breakdown</CardTitle>
                    <CardDescription>
                      Current month distribution
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='flex justify-center'>
                    <DonutChart
                      data={spendingData}
                      centerText='$29'
                      size={140}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-3'>
                    <div className='flex items-center justify-between p-2 border rounded'>
                      <div className='flex items-center gap-2'>
                        <div className='w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold'>
                          VISA
                        </div>
                        <span className='font-mono text-sm'>•••• 4242</span>
                      </div>
                      <Badge variant='default' className='text-xs'>
                        Default
                      </Badge>
                    </div>

                    <div className='flex items-center justify-between p-2 border rounded'>
                      <div className='flex items-center gap-2'>
                        <div className='w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold'>
                          MC
                        </div>
                        <span className='font-mono text-sm'>•••• 1881</span>
                      </div>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='text-xs h-6 px-2'
                      >
                        Make Default
                      </Button>
                    </div>

                    <Button variant='outline' size='sm' className='w-full mt-3'>
                      + Add Payment Method
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='ai-insights' className='pt-6'>
            <div className='mb-6'>
              <BillingAIPredictor />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='md:col-span-2'>
                {/* Other content can go here */}
                <Card>
                  <CardHeader>
                    <CardTitle>Usage Trends</CardTitle>
                    <CardDescription>Historical data analysis</CardDescription>
                  </CardHeader>
                  <CardContent className='h-[300px] flex items-center justify-center text-muted-foreground'>
                    Usage trend charts would be displayed here
                  </CardContent>
                </Card>
              </div>
              <div className='md:col-span-1'>
                <PredictiveCostForecast />
              </div>
            </div>
          </TabsContent>

          <TabsContent value='usage'>
            <div className='flex justify-center items-center min-h-[300px] text-muted-foreground'>
              Detailed usage statistics will be displayed here
            </div>
          </TabsContent>

          <TabsContent value='invoices'>
            <div className='flex justify-center items-center min-h-[300px] text-muted-foreground'>
              Invoice history will be displayed here
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

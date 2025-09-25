"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowRight, Bell, Clock, Calendar } from "lucide-react";

// Import AI components
import DashboardSmartSummary from "@/components/dashboard/DashboardSmartSummary.client";
import DashboardInsightAI from "@/components/dashboard/DashboardInsightAI.client";
import DashboardProjectStatus from "@/components/dashboard/DashboardProjectStatus.client";
import DashboardAssistant from "@/components/dashboard/DashboardAssistant.client";
import ProjectAIAssistant from "@/components/dashboard/ProjectAIAssistant.client";

// Import existing dashboard components
import ObservabilityChart from "@/components/dashboard/ObservabilityChart.client";
import RecentLogs from "@/components/dashboard/RecentLogs.client";
import MiniSparkline from "@/components/dashboard/MiniSparkline.client";
import RadialGauge from "@/components/dashboard/RadialGauge.client";
import FloatingCard from "@/components/dashboard/FloatingCard.client";
import AnimatedCounter from "@/components/dashboard/AnimatedCounter.client";
import SystemStatusWidget from "@/components/dashboard/SystemStatusWidget.client";
import NotificationsWidget from "@/components/dashboard/NotificationsWidget.client";
import GlowingButton from "@/components/dashboard/GlowingButton.client";

// Import data
import metricsData from "@/lib/metrics.json";

export default function DashboardPage() {
  return (
    <main className='min-h-screen p-4 md:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto'>
      <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
        <div>
          <div className='flex items-center gap-2'>
            <h1 className='text-2xl font-semibold tracking-tight'>Dashboard</h1>
            <div className='bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-md font-medium flex items-center gap-1'>
              <Sparkles className='h-3 w-3' />
              <span>AI Enhanced</span>
            </div>
          </div>
          <p className='text-sm text-muted-foreground mt-1'>
            Get insights and optimize your services with AI-powered analytics
          </p>
        </div>

        <div className='flex items-center gap-2'>
          <ProjectAIAssistant />

          <div className='flex items-center gap-2'>
            <Button variant='outline' size='sm' className='h-9'>
              <Bell className='h-4 w-4 mr-1' />
              <span>Alerts</span>
            </Button>
            <GlowingButton glowColor='blue'>Quick Deploy</GlowingButton>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
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

      <DashboardSmartSummary />

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <div className='lg:col-span-2 space-y-4'>
          <Card className='border shadow-md'>
            <CardHeader className='pb-2 border-b'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-base'>System Performance</CardTitle>
                <Tabs defaultValue='realtime' className='h-7'>
                  <TabsList className='h-7 p-0'>
                    <TabsTrigger
                      value='realtime'
                      className='text-[10px] px-2 h-6'
                    >
                      Realtime
                    </TabsTrigger>
                    <TabsTrigger value='daily' className='text-[10px] px-2 h-6'>
                      Daily
                    </TabsTrigger>
                    <TabsTrigger
                      value='weekly'
                      className='text-[10px] px-2 h-6'
                    >
                      Weekly
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className='p-4'>
              <div className='w-full h-64'>
                <ObservabilityChart data={metricsData} />
              </div>
            </CardContent>
          </Card>

          <DashboardProjectStatus />
        </div>

        <div className='space-y-4'>
          <DashboardInsightAI />

          <Card className='border shadow-md'>
            <CardHeader className='pb-2 border-b'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-base flex items-center gap-2'>
                  <Clock className='h-4 w-4 text-primary' />
                  <span>Recent Activity</span>
                </CardTitle>
                <Button variant='ghost' size='sm' className='h-7 text-xs'>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className='p-0 max-h-[300px] overflow-auto'>
              <RecentLogs />
            </CardContent>
          </Card>

          <Card className='border shadow-md'>
            <CardHeader className='pb-2 border-b'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-base flex items-center gap-2'>
                  <Calendar className='h-4 w-4 text-primary' />
                  <span>Upcoming</span>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className='p-3'>
              <div className='space-y-2'>
                <div className='bg-muted/30 p-2 rounded-md'>
                  <div className='flex items-center justify-between mb-1'>
                    <p className='text-xs font-medium'>
                      API Gateway Deployment
                    </p>
                    <p className='text-xs text-muted-foreground'>Today</p>
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    Scheduled for 4:00 PM
                  </p>
                </div>

                <div className='bg-muted/30 p-2 rounded-md'>
                  <div className='flex items-center justify-between mb-1'>
                    <p className='text-xs font-medium'>Security Audit</p>
                    <p className='text-xs text-muted-foreground'>Tomorrow</p>
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    Scheduled for 10:00 AM
                  </p>
                </div>

                <div className='bg-muted/30 p-2 rounded-md'>
                  <div className='flex items-center justify-between mb-1'>
                    <p className='text-xs font-medium'>Quarterly Review</p>
                    <p className='text-xs text-muted-foreground'>Oct 3</p>
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    Scheduled for 2:00 PM
                  </p>
                </div>
              </div>

              <Button
                variant='outline'
                size='sm'
                className='w-full mt-2 text-xs h-7'
              >
                <span>View Calendar</span>
                <ArrowRight className='h-3 w-3 ml-1' />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <SystemStatusWidget />
        <NotificationsWidget />
      </div>

      {/* Add the floating assistant */}
      <DashboardAssistant />
    </main>
  );
}

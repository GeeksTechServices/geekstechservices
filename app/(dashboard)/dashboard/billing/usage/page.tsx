"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  Lightbulb,
  LineChart,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import UsagePredictor from "@/components/dashboard/UsagePredictor.client";
import UsageOptimizationAI from "@/components/dashboard/UsageOptimizationAI.client";
import UsageAnalysis from "@/components/dashboard/UsageAnalysis.client";
import UsageCostBreakdown from "@/components/dashboard/UsageCostBreakdown.client";

export default function UsagePage(): React.ReactElement {
  return (
    <div className='container py-6 space-y-6 max-w-7xl'>
      <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
        <div>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Usage & Analytics
          </h1>
          <p className='text-sm text-muted-foreground'>
            Monitor your API usage and get AI-powered insights to optimize your
            resources.
          </p>
        </div>

        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm'>
            <Settings className='h-4 w-4 mr-1' />
            <span>Settings</span>
          </Button>
          <Button size='sm'>
            <Lightbulb className='h-4 w-4 mr-1' />
            <span>AI Advisor</span>
          </Button>
        </div>
      </div>

      <Card className='border shadow-sm'>
        <CardHeader className='pb-3'>
          <CardTitle className='text-base'>API Usage Overview</CardTitle>
          <CardDescription>
            At-a-glance metrics for your current billing period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            <MetricCard
              title='API Calls'
              value='1,253,842'
              change={12.4}
              icon={<BarChart3 className='h-4 w-4 text-primary' />}
            />
            <MetricCard
              title='Data Transfer'
              value='328.5 GB'
              change={7.2}
              icon={<ArrowRight className='h-4 w-4 text-primary' />}
            />
            <MetricCard
              title='Average Response'
              value='142 ms'
              change={-3.1}
              icon={<LineChart className='h-4 w-4 text-primary' />}
              positiveIsGood={false}
            />
            <MetricCard
              title='Error Rate'
              value='0.42%'
              change={-1.5}
              icon={<LineChart className='h-4 w-4 text-primary' />}
              positiveIsGood={false}
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue='analysis' className='space-y-4'>
        <TabsList className='grid w-full grid-cols-3 md:w-auto'>
          <TabsTrigger value='analysis'>Usage Analysis</TabsTrigger>
          <TabsTrigger value='predictions'>Usage Predictions</TabsTrigger>
          <TabsTrigger value='optimization'>AI Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value='analysis' className='space-y-4'>
          <UsageAnalysis />
          <UsageCostBreakdown />
        </TabsContent>

        <TabsContent value='predictions' className='space-y-4'>
          <UsagePredictor />
        </TabsContent>

        <TabsContent value='optimization' className='space-y-4'>
          <UsageOptimizationAI />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  positiveIsGood?: boolean;
}

function MetricCard({
  title,
  value,
  change,
  icon,
  positiveIsGood = true,
}: MetricCardProps): React.ReactElement {
  const isPositive = change >= 0;
  const isGood =
    (positiveIsGood && isPositive) || (!positiveIsGood && !isPositive);

  return (
    <div className='bg-muted/30 rounded-lg p-4'>
      <div className='flex justify-between items-start'>
        <div>
          <p className='text-sm font-medium text-muted-foreground'>{title}</p>
          <p className='text-2xl font-semibold mt-1'>{value}</p>
        </div>
        <div className='mt-1'>{icon}</div>
      </div>

      <div
        className={`text-xs font-medium mt-2 flex items-center ${
          isGood ? "text-green-600" : "text-red-600"
        }`}
      >
        {isPositive ? "+" : ""}
        {change}% from last period
      </div>
    </div>
  );
}

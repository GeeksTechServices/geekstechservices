"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  BarChart,
  ScatterChart,
  Lightbulb,
  AlertTriangle,
  RefreshCcw,
} from "lucide-react";

interface InsightData {
  date: string;
  value: number;
}

// Mock data
const performanceData: InsightData[] = Array.from({ length: 14 }, (_, i) => ({
  date: `${i + 1}`,
  value: 80 + Math.random() * 15 + Math.sin(i / 2) * 10,
}));

const anomalyData: InsightData[] = Array.from({ length: 14 }, (_, i) => ({
  date: `${i + 1}`,
  value: 2 + Math.random() * 3 + (i === 9 ? 15 : 0),
}));

const insightsMessages = [
  "API response times improved by 23% after recent optimization",
  "Potential anomaly detected in 'payment-service' project (8:23 PM)",
  "3 endpoints have consistently high error rates (>2%)",
  "Project 'dashboard-api' is showing memory leaks during peak usage",
  "Unused dependency detected in 'user-service' (express-validator)",
];

export default function SmartProjectInsights(): React.ReactElement {
  const [activeTab, setActiveTab] = useState("performance");
  const [insightIndex, setInsightIndex] = useState(0);

  const cycleInsight = () => {
    setInsightIndex((prev) => (prev + 1) % insightsMessages.length);
  };

  return (
    <Card>
      <CardHeader className='pb-2'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg flex items-center gap-2'>
            <Lightbulb className='h-4 w-4 text-yellow-500' />
            <span>AI Project Insights</span>
          </CardTitle>
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8'
            onClick={cycleInsight}
          >
            <RefreshCcw className='h-4 w-4' />
          </Button>
        </div>
      </CardHeader>

      <CardContent className='px-4 pb-3'>
        <div className='flex items-start gap-3 mb-4 p-3 bg-muted/30 rounded-md'>
          <div className='mt-0.5'>
            {insightIndex === 1 ? (
              <AlertTriangle className='h-5 w-5 text-orange-500' />
            ) : (
              <Lightbulb className='h-5 w-5 text-yellow-500' />
            )}
          </div>
          <div>
            <p className='text-sm'>{insightsMessages[insightIndex]}</p>
            <Button variant='link' className='h-auto p-0 text-xs'>
              View details
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className='mt-2'>
          <TabsList className='grid grid-cols-3 mb-2'>
            <TabsTrigger
              value='performance'
              className='text-xs flex items-center gap-1'
            >
              <LineChart className='h-3 w-3' />
              <span>Performance</span>
            </TabsTrigger>
            <TabsTrigger
              value='anomalies'
              className='text-xs flex items-center gap-1'
            >
              <BarChart className='h-3 w-3' />
              <span>Anomalies</span>
            </TabsTrigger>
            <TabsTrigger
              value='patterns'
              className='text-xs flex items-center gap-1'
            >
              <ScatterChart className='h-3 w-3' />
              <span>Patterns</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value='performance' className='pt-2'>
            <ChartPlaceholder
              data={performanceData}
              height={140}
              color='hsl(var(--primary))'
              label='Response time (ms)'
              showAxis={true}
            />
          </TabsContent>

          <TabsContent value='anomalies' className='pt-2'>
            <ChartPlaceholder
              data={anomalyData}
              height={140}
              color='hsl(var(--destructive))'
              label='Anomaly score'
              showAxis={true}
            />
            <div className='mt-2 p-2 bg-destructive/10 text-destructive rounded border border-destructive/20 text-xs'>
              Anomaly detected on day 10. Review logs for details.
            </div>
          </TabsContent>

          <TabsContent
            value='patterns'
            className='pt-2 min-h-[180px] flex items-center justify-center text-xs text-muted-foreground'
          >
            <div className='text-center'>
              <p>Collecting more data to identify patterns</p>
              <p className='mt-1 text-[10px]'>
                At least 30 days of data required
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Simple placeholder component to visualize chart data
function ChartPlaceholder({
  data,
  height,
  color,
  label,
  showAxis = false,
}: {
  data: InsightData[];
  height: number;
  color: string;
  label: string;
  showAxis?: boolean;
}) {
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const range = max - min;

  return (
    <div className='relative' style={{ height: `${height}px` }}>
      <div className='absolute top-0 left-0 text-[10px] text-muted-foreground'>
        {label}
      </div>
      <div className='absolute bottom-0 left-0 right-0 flex items-end h-[calc(100%-20px)]'>
        {data.map((point, i) => (
          <div
            key={i}
            className='flex-1 flex items-end justify-center'
            style={{ height: "100%" }}
          >
            <div
              className='w-full mx-px rounded-t'
              style={{
                height: `${((point.value - min) / (range || 1)) * 100}%`,
                backgroundColor: color,
                opacity: 0.7,
              }}
            ></div>
          </div>
        ))}
      </div>
      {showAxis && (
        <div className='absolute bottom-0 left-0 right-0 flex justify-between text-[9px] text-muted-foreground border-t pt-1'>
          <span>1</span>
          <span>7</span>
          <span>14</span>
        </div>
      )}
    </div>
  );
}

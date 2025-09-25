"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  BarChart,
  Percent,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: {
    value: number;
    isPositive: boolean;
    isGood: boolean;
  };
  icon: React.ReactNode;
}

interface SummaryStats {
  timeRange: string;
  metrics: MetricCardProps[];
  recommendations: string[];
}

export default function DashboardSmartSummary(): React.ReactElement {
  // Mock data that would come from an analytics service
  const summaryData: SummaryStats = {
    timeRange: "Last 30 days",
    metrics: [
      {
        title: "Total API Calls",
        value: "1.43M",
        change: {
          value: 12.5,
          isPositive: true,
          isGood: true,
        },
        icon: <Layers className='h-4 w-4 text-primary' />,
      },
      {
        title: "Avg. Response Time",
        value: "121ms",
        change: {
          value: 8.2,
          isPositive: false,
          isGood: true,
        },
        icon: <Clock className='h-4 w-4 text-amber-500' />,
      },
      {
        title: "Error Rate",
        value: "0.4%",
        change: {
          value: 0.2,
          isPositive: false,
          isGood: true,
        },
        icon: <Percent className='h-4 w-4 text-green-500' />,
      },
      {
        title: "Active Users",
        value: "2,834",
        change: {
          value: 7.4,
          isPositive: true,
          isGood: true,
        },
        icon: <BarChart className='h-4 w-4 text-blue-500' />,
      },
    ],
    recommendations: [
      "Consider implementing caching to improve response times for frequently accessed endpoints",
      "Update security protocols for authentication services",
      "Upgrade database tier to accommodate increased user load",
    ],
  };

  return (
    <Card className='border shadow-md overflow-hidden'>
      <CardHeader className='pb-2 border-b'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-base flex items-center gap-2'>
            <Sparkles className='h-4 w-4 text-primary' />
            <span>Smart Summary</span>
            <span className='text-xs text-muted-foreground font-normal ml-2'>
              {summaryData.timeRange}
            </span>
          </CardTitle>
          <Button variant='outline' size='sm' className='h-8'>
            Customize
          </Button>
        </div>
      </CardHeader>

      <CardContent className='p-4'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4'>
          {summaryData.metrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              icon={metric.icon}
            />
          ))}
        </div>

        <div className='mt-2 pt-2 border-t'>
          <h4 className='text-sm font-medium mb-2 flex items-center gap-2'>
            <Sparkles className='h-3.5 w-3.5 text-primary' />
            AI Recommendations
          </h4>
          <ul className='space-y-1.5 text-sm'>
            {summaryData.recommendations.map((recommendation, index) => (
              <li
                key={index}
                className='flex gap-2 items-start text-muted-foreground hover:text-foreground transition-colors'
              >
                <div className='mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0'></div>
                <span className='text-xs'>{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

function MetricCard({
  title,
  value,
  change,
  icon,
}: MetricCardProps): React.ReactElement {
  const { value: changeValue, isPositive, isGood } = change;

  return (
    <div className='bg-muted/30 rounded-lg p-3'>
      <div className='flex justify-between items-start mb-1'>
        <span className='text-xs text-muted-foreground'>{title}</span>
        <div className='mt-0.5'>{icon}</div>
      </div>

      <div className='font-semibold text-lg'>{value}</div>

      <div
        className={`
        text-xs font-medium flex items-center mt-1
        ${isGood ? "text-green-500" : "text-red-500"}
      `}
      >
        {isPositive ? (
          <ArrowUpRight className='h-3 w-3 mr-1' />
        ) : (
          <ArrowDownRight className='h-3 w-3 mr-1' />
        )}
        <span>
          {isPositive ? "+" : "-"}
          {Math.abs(changeValue)}%
        </span>
      </div>
    </div>
  );
}

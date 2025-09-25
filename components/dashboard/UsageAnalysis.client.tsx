"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Calendar,
  Download,
  FilterX,
  BarChart4,
  PieChart,
  Activity,
} from "lucide-react";

interface UsageDataPoint {
  date: string;
  value: number;
}

interface UsageService {
  name: string;
  usage: number;
  change: number;
}

export default function UsageAnalysis(): React.ReactElement {
  const [dateRange, setDateRange] = useState<string>("30d");

  // Mock data for different date ranges
  const mockData: Record<
    string,
    { daily: UsageDataPoint[]; services: UsageService[] }
  > = {
    "7d": {
      daily: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(
          Date.now() - (6 - i) * 24 * 60 * 60 * 1000
        ).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        value: 5000 + Math.random() * 3000,
      })),
      services: [
        { name: "Authentication", usage: 12500, change: 5.2 },
        { name: "Data Storage", usage: 8700, change: -2.1 },
        { name: "Compute", usage: 5300, change: 12.7 },
        { name: "Messaging", usage: 3200, change: 1.5 },
      ],
    },
    "30d": {
      daily: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(
          Date.now() - (29 - i) * 24 * 60 * 60 * 1000
        ).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        value: 5000 + Math.random() * 3000 + Math.sin(i / 3) * 2000,
      })),
      services: [
        { name: "Authentication", usage: 52500, change: 7.8 },
        { name: "Data Storage", usage: 38700, change: 3.2 },
        { name: "Compute", usage: 22300, change: 15.6 },
        { name: "Messaging", usage: 14200, change: -1.3 },
      ],
    },
    "90d": {
      daily: Array.from({ length: 12 }, (_, i) => ({
        date: new Date(
          Date.now() - (90 - i * 7) * 24 * 60 * 60 * 1000
        ).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        value: 20000 + Math.random() * 15000 + Math.sin(i / 2) * 8000,
      })),
      services: [
        { name: "Authentication", usage: 152500, change: 22.1 },
        { name: "Data Storage", usage: 98700, change: 15.7 },
        { name: "Compute", usage: 62300, change: 31.2 },
        { name: "Messaging", usage: 44200, change: 8.5 },
      ],
    },
  };

  const currentData = mockData[dateRange];

  return (
    <Card className='overflow-hidden'>
      <CardHeader className='pb-3 border-b'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg flex items-center gap-2'>
            <BarChart3 className='h-4 w-4 text-primary' />
            <span>Usage Analysis</span>
          </CardTitle>
          <div className='flex items-center gap-2'>
            <Button size='sm' variant='outline' className='h-8'>
              <Calendar className='h-3.5 w-3.5 mr-1' />
              <span className='text-xs'>Custom Range</span>
            </Button>
            <Button size='sm' variant='outline' className='h-8'>
              <Download className='h-3.5 w-3.5 mr-1' />
              <span className='text-xs'>Export</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className='p-4'>
        <div className='flex items-center justify-between mb-4'>
          <Tabs defaultValue={dateRange} onValueChange={setDateRange}>
            <TabsList>
              <TabsTrigger value='7d'>7 days</TabsTrigger>
              <TabsTrigger value='30d'>30 days</TabsTrigger>
              <TabsTrigger value='90d'>90 days</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button size='sm' variant='ghost' className='text-xs h-8'>
            <FilterX className='h-3 w-3 mr-1' />
            <span>Clear filters</span>
          </Button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
          <Card className='col-span-1 md:col-span-2 h-[300px] flex flex-col bg-muted/30'>
            <CardHeader className='py-2 px-3 border-b'>
              <div className='flex items-center justify-between'>
                <h3 className='text-sm font-medium'>Daily API Calls</h3>
                <Tabs defaultValue='bar' className='h-7'>
                  <TabsList className='h-7'>
                    <TabsTrigger value='bar' className='text-[10px] h-6 px-2'>
                      <BarChart4 className='h-3 w-3' />
                    </TabsTrigger>
                    <TabsTrigger value='line' className='text-[10px] h-6 px-2'>
                      <Activity className='h-3 w-3' />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>

            <CardContent className='flex-1 p-3 flex items-center justify-center'>
              {/* Chart placeholder */}
              <UsageBarChart data={currentData.daily} />
            </CardContent>
          </Card>

          <Card className='bg-muted/30 h-[300px] flex flex-col'>
            <CardHeader className='py-2 px-3 border-b'>
              <div className='flex items-center justify-between'>
                <h3 className='text-sm font-medium'>Usage by Service</h3>
                <PieChart className='h-4 w-4 text-muted-foreground' />
              </div>
            </CardHeader>

            <CardContent className='flex-1 p-0 overflow-auto'>
              <table className='w-full'>
                <thead className='bg-muted/50 sticky top-0'>
                  <tr>
                    <th className='text-xs font-medium text-muted-foreground text-left py-1.5 px-3'>
                      Service
                    </th>
                    <th className='text-xs font-medium text-muted-foreground text-right py-1.5 px-3'>
                      Usage
                    </th>
                    <th className='text-xs font-medium text-muted-foreground text-right py-1.5 px-3'>
                      Change
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.services.map((service, index) => (
                    <tr
                      key={index}
                      className='border-t hover:bg-muted/40 transition-colors'
                    >
                      <td className='py-2 px-3 text-sm'>{service.name}</td>
                      <td className='py-2 px-3 text-sm text-right'>
                        {service.usage.toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-3 text-sm text-right ${
                          service.change >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {service.change > 0 ? "+" : ""}
                        {service.change}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        <div className='bg-muted/30 rounded-lg p-3 text-sm'>
          <h3 className='font-medium mb-1'>AI Insights</h3>
          <ul className='space-y-1 text-xs text-muted-foreground list-disc pl-4'>
            <li>
              Usage has{" "}
              {dateRange === "7d"
                ? "remained stable"
                : "increased by approximately 15%"}{" "}
              during this period.
            </li>
            <li>Peak usage occurs on weekdays between 2-4 PM.</li>
            <li>
              The Compute service is showing the highest growth rate at{" "}
              {dateRange === "7d"
                ? "12.7%"
                : dateRange === "30d"
                ? "15.6%"
                : "31.2%"}
              .
            </li>
            {dateRange === "90d" && (
              <li>
                Seasonal patterns show higher usage at the start of each month.
              </li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

// Simple chart component for visualization
function UsageBarChart({ data }: { data: UsageDataPoint[] }) {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className='w-full h-full flex flex-col'>
      <div className='flex-1 flex items-end gap-px'>
        {data.map((point, i) => (
          <div
            key={i}
            className='relative flex-1 flex items-end justify-center'
            title={`${point.date}: ${point.value.toLocaleString()} API calls`}
          >
            <div
              className='w-full mx-0.5 bg-primary/80 hover:bg-primary transition-colors rounded-t'
              style={{ height: `${(point.value / max) * 100}%` }}
            ></div>
          </div>
        ))}
      </div>

      <div className='h-6 flex text-[9px] text-muted-foreground mt-1 overflow-hidden'>
        {data.map((point, i) => (
          <div key={i} className='flex-1 text-center truncate px-0.5'>
            {i % Math.ceil(data.length / 7) === 0 ? point.date : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

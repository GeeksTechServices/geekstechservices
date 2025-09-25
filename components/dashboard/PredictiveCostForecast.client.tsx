"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Calendar,
  ReceiptText,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import ForecastChart from "./ForecastChart";

// Data for monthly cost forecasting
const getMonthlyData = () => ({
  labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
  datasets: [
    {
      data: [19, 22, 25, 27, 29, 33, 36],
      label: "Actual Cost",
      borderColor: "hsl(var(--primary))",
      backgroundColor: "hsl(var(--primary) / 0.1)",
      fill: false,
    },
    {
      data: [null, null, null, null, null, 33, 36],
      label: "Predicted Cost",
      borderColor: "hsl(var(--accent) / 0.8)",
      backgroundColor: "hsl(var(--accent) / 0.1)",
      borderDash: [5, 5],
      fill: false,
    },
  ],
});

// Data for quarterly cost forecasting
const getQuarterlyData = () => ({
  labels: ["Q1", "Q2", "Q3", "Q4", "Q1 (Next)"],
  datasets: [
    {
      data: [65, 78, 92, 110, 125],
      label: "Actual Cost",
      borderColor: "hsl(var(--primary))",
      backgroundColor: "hsl(var(--primary) / 0.1)",
      fill: false,
    },
    {
      data: [null, null, null, null, 125],
      label: "Predicted Cost",
      borderColor: "hsl(var(--accent) / 0.8)",
      backgroundColor: "hsl(var(--accent) / 0.1)",
      borderDash: [5, 5],
      fill: false,
    },
  ],
});

// Data for yearly cost forecasting
const getYearlyData = () => ({
  labels: ["2021", "2022", "2023", "2024", "2025"],
  datasets: [
    {
      data: [220, 305, 375, 450, 520],
      label: "Actual Cost",
      borderColor: "hsl(var(--primary))",
      backgroundColor: "hsl(var(--primary) / 0.1)",
      fill: false,
    },
    {
      data: [null, null, null, null, 520],
      label: "Predicted Cost",
      borderColor: "hsl(var(--accent) / 0.8)",
      backgroundColor: "hsl(var(--accent) / 0.1)",
      borderDash: [5, 5],
      fill: false,
    },
  ],
});

// Data for monthly usage forecasting
const getMonthlyUsageData = () => ({
  labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
  datasets: [
    {
      data: [125000, 142000, 156000, 172000, 185000, 198000, 213000],
      label: "API Calls",
      borderColor: "hsl(215, 70%, 60%)",
      backgroundColor: "hsl(215, 70%, 60% / 0.1)",
      fill: false,
    },
    {
      data: [null, null, null, null, null, 198000, 213000],
      label: "Predicted Calls",
      borderColor: "hsl(215, 70%, 60% / 0.6)",
      backgroundColor: "hsl(215, 70%, 60% / 0.05)",
      borderDash: [5, 5],
      fill: false,
    },
  ],
});

export default function PredictiveCostForecast(): React.ReactElement {
  const [forecastPeriod, setForecastPeriod] = useState<
    "month" | "quarter" | "year"
  >("month");
  const [showSavingsTips, setShowSavingsTips] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Choose data based on selected period
  const getForecastData = () => {
    switch (forecastPeriod) {
      case "month":
        return getMonthlyData();
      case "quarter":
        return getQuarterlyData();
      case "year":
        return getYearlyData();
      default:
        return getMonthlyData();
    }
  };

  // Get prediction amount based on forecast period
  const getPredictionAmount = () => {
    switch (forecastPeriod) {
      case "month":
        return "$36";
      case "quarter":
        return "$125";
      case "year":
        return "$520";
      default:
        return "$36";
    }
  };

  // Get prediction label based on forecast period
  const getPredictionLabel = () => {
    switch (forecastPeriod) {
      case "month":
        return "Predicted next month";
      case "quarter":
        return "Predicted next quarter";
      case "year":
        return "Predicted next year";
      default:
        return "Predicted next month";
    }
  };

  return (
    <Card className='overflow-hidden'>
      <CardHeader className='pb-3 border-b'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <BarChart3 className='h-5 w-5 text-[var(--accent)]' />
            <CardTitle className='text-lg'>Cost Forecast</CardTitle>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              size='sm'
              className='flex items-center gap-1'
              onClick={() => setShowSavingsTips(!showSavingsTips)}
            >
              <Sparkles className='h-4 w-4 text-[var(--accent)]' />
              <span className='text-xs'>Savings Tips</span>
            </Button>
          </div>
        </div>
        <CardDescription>
          AI-powered cost predictions based on your usage patterns
        </CardDescription>
      </CardHeader>

      <CardContent className='p-4'>
        <Tabs defaultValue='forecast' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='forecast' className='flex items-center gap-1'>
              <TrendingUp className='h-4 w-4' />
              <span>Forecast</span>
            </TabsTrigger>
            <TabsTrigger value='usage' className='flex items-center gap-1'>
              <ReceiptText className='h-4 w-4' />
              <span>Usage</span>
            </TabsTrigger>
          </TabsList>

          <div className='flex items-center justify-between'>
            <h3 className='text-sm font-medium'>
              {forecastPeriod === "month"
                ? "Next 30 Days"
                : forecastPeriod === "quarter"
                ? "Next Quarter"
                : "Annual Projection"}
            </h3>
            <div className='flex gap-1'>
              <Button
                size='sm'
                variant={forecastPeriod === "month" ? "default" : "outline"}
                className={
                  forecastPeriod === "month"
                    ? "bg-[var(--accent)] hover:bg-[var(--accent)]/90"
                    : ""
                }
                onClick={() => {
                  setIsLoading(true);
                  setForecastPeriod("month");
                  // Simulate loading state
                  setTimeout(() => setIsLoading(false), 800);
                }}
              >
                Month
              </Button>
              <Button
                size='sm'
                variant={forecastPeriod === "quarter" ? "default" : "outline"}
                className={
                  forecastPeriod === "quarter"
                    ? "bg-[var(--accent)] hover:bg-[var(--accent)]/90"
                    : ""
                }
                onClick={() => {
                  setIsLoading(true);
                  setForecastPeriod("quarter");
                  // Simulate loading state
                  setTimeout(() => setIsLoading(false), 800);
                }}
              >
                Quarter
              </Button>
              <Button
                size='sm'
                variant={forecastPeriod === "year" ? "default" : "outline"}
                className={
                  forecastPeriod === "year"
                    ? "bg-[var(--accent)] hover:bg-[var(--accent)]/90"
                    : ""
                }
                onClick={() => {
                  setIsLoading(true);
                  setForecastPeriod("year");
                  // Simulate loading state
                  setTimeout(() => setIsLoading(false), 800);
                }}
              >
                Year
              </Button>
            </div>
          </div>

          <TabsContent value='forecast' className='space-y-4'>
            <div className='h-[240px] relative'>
              {isLoading ? (
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='w-full max-w-md space-y-4'>
                    <div className='h-2 w-full rounded-full bg-muted animate-pulse' />
                    <div className='h-2 w-3/4 rounded-full bg-muted animate-pulse' />
                    <div className='h-2 w-1/2 rounded-full bg-muted animate-pulse' />
                  </div>
                </div>
              ) : (
                <ForecastChart data={getForecastData()} height={240} />
              )}
            </div>

            <div className='flex justify-around mt-4 text-center'>
              <div>
                <div className='text-xs text-muted-foreground'>
                  Current Cost
                </div>
                <div className='font-bold'>
                  {forecastPeriod === "month"
                    ? "$29"
                    : forecastPeriod === "quarter"
                    ? "$92"
                    : "$375"}
                </div>
              </div>
              <div>
                <div className='text-xs text-muted-foreground'>
                  {getPredictionLabel()}
                </div>
                <div className='font-bold text-[var(--accent)]'>
                  {getPredictionAmount()}
                </div>
              </div>
              <div>
                <div className='text-xs text-muted-foreground'>Increase</div>
                <div className='font-bold text-amber-500'>
                  {forecastPeriod === "month"
                    ? "+24%"
                    : forecastPeriod === "quarter"
                    ? "+36%"
                    : "+39%"}
                </div>
              </div>
            </div>

            {showSavingsTips && (
              <div className='mt-4 p-3 rounded-lg border bg-muted/30'>
                <div className='flex items-center gap-2 mb-2'>
                  <Sparkles className='h-4 w-4 text-[var(--accent)]' />
                  <h4 className='font-medium text-sm'>
                    AI-Generated Saving Tips
                  </h4>
                </div>
                <ul className='space-y-2 text-xs'>
                  <li className='flex items-start gap-2'>
                    <span className='min-w-4 h-4 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center text-[10px]'>
                      1
                    </span>
                    <span>
                      Consolidate API calls during off-peak hours to reduce
                      rate-limiting charges.
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='min-w-4 h-4 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center text-[10px]'>
                      2
                    </span>
                    <span>
                      Enable data compression to reduce bandwidth costs (could
                      save 15%).
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='min-w-4 h-4 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center text-[10px]'>
                      3
                    </span>
                    <span>
                      Consider annual billing to unlock 12% discount on your
                      current plan.
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </TabsContent>

          <TabsContent value='usage' className='h-[240px]'>
            {isLoading ? (
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-full max-w-md space-y-4'>
                  <div className='h-2 w-full rounded-full bg-muted animate-pulse' />
                  <div className='h-2 w-3/4 rounded-full bg-muted animate-pulse' />
                  <div className='h-2 w-1/2 rounded-full bg-muted animate-pulse' />
                </div>
              </div>
            ) : (
              <ForecastChart data={getMonthlyUsageData()} height={240} />
            )}
          </TabsContent>
        </Tabs>

        <div className='mt-4 flex items-center justify-between text-xs text-muted-foreground'>
          <div className='flex items-center gap-1'>
            <Calendar className='h-3 w-3' />
            <span>Updated 2 hours ago</span>
          </div>
          <Button variant='ghost' size='sm' className='h-7 text-xs'>
            View detailed forecast
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

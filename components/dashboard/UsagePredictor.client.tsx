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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Zap, TrendingUp, Calendar } from "lucide-react";

interface PredictionPeriod {
  label: string;
  value: string;
  current: number;
  projected: number;
  change: number;
}

export default function UsagePredictor(): React.ReactElement {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("month");

  const predictionPeriods: Record<string, PredictionPeriod> = {
    week: {
      label: "Next Week",
      value: "week",
      current: 45000,
      projected: 48500,
      change: 7.8,
    },
    month: {
      label: "Next Month",
      value: "month",
      current: 185000,
      projected: 213000,
      change: 15.1,
    },
    quarter: {
      label: "Next Quarter",
      value: "quarter",
      current: 540000,
      projected: 650000,
      change: 20.4,
    },
  };

  const generatePrediction = () => {
    setIsGenerating(true);
    // Simulate API call to generate prediction
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const selectedData = predictionPeriods[selectedPeriod];

  return (
    <Card>
      <CardHeader className='pb-3'>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='text-lg flex items-center gap-2'>
              <Zap className='h-4 w-4 text-amber-500' />
              <span>Usage Predictor</span>
            </CardTitle>
            <CardDescription>AI-powered usage forecasting</CardDescription>
          </div>
          <Button
            variant='outline'
            size='sm'
            className='h-8'
            onClick={generatePrediction}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <span className='flex items-center gap-2'>
                <span className='h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent'></span>
                <span>Analyzing</span>
              </span>
            ) : (
              <span className='flex items-center gap-2'>
                <span>Refresh Prediction</span>
                <ArrowRight className='h-3 w-3' />
              </span>
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs
          value={selectedPeriod}
          onValueChange={setSelectedPeriod}
          className='mb-4'
        >
          <TabsList className='grid grid-cols-3'>
            <TabsTrigger value='week'>Week</TabsTrigger>
            <TabsTrigger value='month'>Month</TabsTrigger>
            <TabsTrigger value='quarter'>Quarter</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className='space-y-4'>
          <div className='grid grid-cols-3 gap-3'>
            <div className='p-3 bg-muted/30 rounded-lg text-center'>
              <div className='text-xs text-muted-foreground mb-1'>Current</div>
              <div className='text-2xl font-semibold'>
                {formatNumber(selectedData.current)}
              </div>
              <div className='text-xs text-muted-foreground'>API calls</div>
            </div>

            <div className='p-3 bg-muted/30 rounded-lg text-center'>
              <div className='text-xs text-muted-foreground mb-1'>
                Projected
              </div>
              <div className='text-2xl font-semibold text-primary'>
                {formatNumber(selectedData.projected)}
              </div>
              <div className='text-xs text-muted-foreground'>API calls</div>
            </div>

            <div className='p-3 bg-muted/30 rounded-lg text-center'>
              <div className='text-xs text-muted-foreground mb-1'>Growth</div>
              <div className='text-2xl font-semibold text-amber-500'>
                +{selectedData.change}%
              </div>
              <div className='text-xs text-muted-foreground'>
                {selectedData.label}
              </div>
            </div>
          </div>

          {/* Usage prediction visualization */}
          <Card className='overflow-hidden border border-dashed'>
            <div className='h-[150px] relative flex items-center justify-center'>
              <div className='text-center'>
                <div className='flex items-center justify-center gap-2'>
                  <TrendingUp className='h-5 w-5 text-primary' />
                  <span className='text-sm font-medium'>
                    Usage Prediction Visualization
                  </span>
                </div>
                <div className='text-xs text-muted-foreground mt-1'>
                  Historical and predicted API calls
                </div>
              </div>
            </div>
          </Card>

          <div className='space-y-3 p-3 border rounded-lg bg-muted/20'>
            <h3 className='text-sm font-medium flex items-center gap-2'>
              <Zap className='h-4 w-4 text-amber-500' />
              <span>AI Insights</span>
            </h3>
            <ul className='space-y-2 text-xs text-muted-foreground'>
              <li className='flex items-start gap-2'>
                <span className='bg-primary/20 text-primary text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center mt-0.5'>
                  1
                </span>
                <span>
                  Your usage is trending{" "}
                  {selectedData.change > 10 ? "significantly" : "slightly"}{" "}
                  higher for this {selectedPeriod} compared to previous periods.
                </span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='bg-primary/20 text-primary text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center mt-0.5'>
                  2
                </span>
                <span>
                  Peak usage typically occurs on{" "}
                  {selectedPeriod === "week"
                    ? "Wednesdays"
                    : "the 15th day of each month"}
                  .
                </span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='bg-primary/20 text-primary text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center mt-0.5'>
                  3
                </span>
                <span>
                  Consider{" "}
                  {selectedData.projected > selectedData.current * 1.2
                    ? "upgrading your plan"
                    : "optimizing API call batching"}{" "}
                  to handle the projected increase.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-4 flex items-center justify-between text-xs text-muted-foreground border-t pt-3'>
          <div className='flex items-center gap-1'>
            <Calendar className='h-3 w-3' />
            <span>Last updated 2 hours ago</span>
          </div>
          <Button variant='link' className='p-0 h-auto text-xs'>
            View historical data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

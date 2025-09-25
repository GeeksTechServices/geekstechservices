"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CircleDollarSign,
  TrendingUp,
  BrainCircuit,
  AlertCircle,
  Sparkles,
} from "lucide-react";

type InsightType = {
  id: string;
  category: "saving" | "anomaly" | "trend" | "suggestion";
  title: string;
  description: string;
  impact: number;
  actionable: boolean;
};

export default function BillingAIInsights(): React.ReactElement {
  const [insights, setInsights] = useState<InsightType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeInsight, setActiveInsight] = useState<string | null>(null);

  // Simulate fetching AI insights
  useEffect(() => {
    const timer = setTimeout(() => {
      setInsights([
        {
          id: "insight-1",
          category: "saving",
          title: "Optimize API usage",
          description:
            "Based on your current usage patterns, switching to batch API calls could reduce costs by 22%. Our AI detected redundant sequential requests that could be combined.",
          impact: 22,
          actionable: true,
        },
        {
          id: "insight-2",
          category: "trend",
          title: "Increasing compute costs",
          description:
            "Your compute costs have increased by 15% over the past 30 days. Based on AI projections, this could add $12.50 to next month's bill if the trend continues.",
          impact: 15,
          actionable: false,
        },
        {
          id: "insight-3",
          category: "anomaly",
          title: "Unusual storage spike",
          description:
            "An anomaly was detected in your storage patterns on Monday. This added 2.3GB that could be temporary test data. Consider cleaning up unused resources.",
          impact: 8,
          actionable: true,
        },
        {
          id: "insight-4",
          category: "suggestion",
          title: "Enterprise discount available",
          description:
            "Based on your current usage and growth pattern, you qualify for our Enterprise tier with volume discounting, saving 18% annually.",
          impact: 18,
          actionable: true,
        },
      ]);
      setLoading(false);
      setActiveInsight("insight-1");
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const getIcon = (category: string) => {
    switch (category) {
      case "saving":
        return <CircleDollarSign className='h-4 w-4' />;
      case "anomaly":
        return <AlertCircle className='h-4 w-4' />;
      case "trend":
        return <TrendingUp className='h-4 w-4' />;
      case "suggestion":
        return <Sparkles className='h-4 w-4' />;
      default:
        return <BrainCircuit className='h-4 w-4' />;
    }
  };

  const getBadgeColor = (category: string) => {
    switch (category) {
      case "saving":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "anomaly":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "trend":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "suggestion":
        return "bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const activeInsightData = insights.find((i) => i.id === activeInsight);

  return (
    <Card className='overflow-hidden border-[var(--accent)]/10'>
      <CardHeader className='pb-3 bg-[var(--accent)]/5'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <BrainCircuit className='h-5 w-5 text-[var(--accent)]' />
            <CardTitle className='text-lg'>AI Billing Insights</CardTitle>
          </div>
          <Badge
            variant='outline'
            className='bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20'
          >
            New
          </Badge>
        </div>
        <CardDescription>
          AI-powered analysis to optimize your spending
        </CardDescription>
      </CardHeader>

      <CardContent className='p-0'>
        {loading ? (
          <div className='p-6 flex flex-col items-center justify-center'>
            <div className='w-8 h-8 rounded-full border-2 border-[var(--accent)]/30 border-t-[var(--accent)] animate-spin' />
            <p className='text-sm text-muted-foreground mt-3'>
              Analyzing your billing data...
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]'>
            <div className='p-3 md:max-h-[280px] overflow-y-auto'>
              <h4 className='text-xs font-medium text-muted-foreground mb-2 px-1'>
                ALL INSIGHTS
              </h4>
              <div className='space-y-1'>
                {insights.map((insight) => (
                  <button
                    key={insight.id}
                    onClick={() => setActiveInsight(insight.id)}
                    className={`w-full flex items-start gap-2 rounded-md p-2 text-left text-sm transition-colors ${
                      activeInsight === insight.id
                        ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <span className='mt-0.5'>{getIcon(insight.category)}</span>
                    <span className='flex-grow'>{insight.title}</span>
                    {insight.impact > 15 && (
                      <Badge
                        variant='outline'
                        className='ml-auto bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20 text-xs'
                      >
                        {insight.impact}%
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className='col-span-2 p-4'>
              {activeInsightData && (
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <Badge
                      className={`${getBadgeColor(
                        activeInsightData.category
                      )} flex items-center gap-1`}
                    >
                      {getIcon(activeInsightData.category)}
                      <span className='capitalize'>
                        {activeInsightData.category}
                      </span>
                    </Badge>
                    <div className='flex items-center gap-1'>
                      <span className='text-sm font-medium'>Impact:</span>
                      <Badge
                        variant={
                          activeInsightData.impact > 15
                            ? "destructive"
                            : "secondary"
                        }
                        className='text-xs'
                      >
                        {activeInsightData.impact}%
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className='text-lg font-medium'>
                      {activeInsightData.title}
                    </h3>
                    <p className='mt-1 text-sm text-muted-foreground'>
                      {activeInsightData.description}
                    </p>
                  </div>

                  {activeInsightData.actionable && (
                    <div className='pt-2 flex justify-end gap-2'>
                      <Button variant='outline' size='sm'>
                        Learn more
                      </Button>
                      <Button
                        size='sm'
                        className='bg-[var(--accent)] hover:bg-[var(--accent)]/90'
                      >
                        Take action
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

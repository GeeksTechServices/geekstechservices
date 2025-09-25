"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Insight {
  type: "success" | "warning" | "info" | "critical";
  title: string;
  description: string;
  metric?: string;
  action?: string;
  impact: "high" | "medium" | "low";
}

export default function DashboardInsightAI(): React.ReactElement {
  const [expanded, setExpanded] = useState(true);

  // Mock insights that would come from an AI service
  const insights: Insight[] = [
    {
      type: "success",
      title: "Performance Optimization",
      description:
        "Your recent API optimizations resulted in 28% faster response times across all endpoints.",
      metric: "+28% speed",
      action: "View Details",
      impact: "high",
    },
    {
      type: "warning",
      title: "Resource Utilization",
      description:
        "Database connections are approaching 80% of your plan limit. Consider upgrading or optimizing queries.",
      metric: "80% used",
      action: "Optimize",
      impact: "medium",
    },
    {
      type: "info",
      title: "Usage Pattern Detected",
      description:
        "We've detected a cyclical usage pattern. Consider implementing auto-scaling for cost efficiency.",
      action: "Enable Auto-scaling",
      impact: "medium",
    },
    {
      type: "critical",
      title: "Security Alert",
      description:
        "Unusual authentication patterns detected from IP range 52.x.x.x. Review authentication logs.",
      action: "Review Logs",
      impact: "high",
    },
  ];

  const getIconForType = (type: Insight["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className='h-4 w-4 text-green-500' />;
      case "warning":
        return <AlertTriangle className='h-4 w-4 text-amber-500' />;
      case "info":
        return <TrendingUp className='h-4 w-4 text-blue-500' />;
      case "critical":
        return <AlertTriangle className='h-4 w-4 text-red-500' />;
      default:
        return <Lightbulb className='h-4 w-4 text-primary' />;
    }
  };

  const getImpactColor = (impact: Insight["impact"]) => {
    switch (impact) {
      case "high":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "medium":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "low":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const getBgForType = (type: Insight["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-500/5 hover:bg-green-500/10";
      case "warning":
        return "bg-amber-500/5 hover:bg-amber-500/10";
      case "info":
        return "bg-blue-500/5 hover:bg-blue-500/10";
      case "critical":
        return "bg-red-500/5 hover:bg-red-500/10";
      default:
        return "hover:bg-muted/50";
    }
  };

  return (
    <Card className='border shadow-md'>
      <CardHeader className='pb-2 border-b'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-base flex items-center gap-2'>
            <Lightbulb className='h-4 w-4 text-primary' />
            <span>AI Insights</span>
            <Badge variant='outline' className='ml-2 text-xs font-normal'>
              New
            </Badge>
          </CardTitle>
          <Button
            variant='ghost'
            size='sm'
            className='h-8 w-8 p-0'
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronUp className='h-4 w-4' />
            ) : (
              <ChevronDown className='h-4 w-4' />
            )}
          </Button>
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className='p-4 space-y-3 animate-in fade-in-0 duration-300'>
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`rounded-lg p-3 border transition-colors ${getBgForType(
                insight.type
              )}`}
            >
              <div className='flex items-start gap-3'>
                <div className='mt-0.5 flex-shrink-0'>
                  {getIconForType(insight.type)}
                </div>

                <div className='flex-grow min-w-0'>
                  <div className='flex flex-wrap items-center gap-2 mb-1'>
                    <h4 className='text-sm font-medium'>{insight.title}</h4>
                    <Badge
                      variant='outline'
                      className={`text-[10px] h-4 px-1 py-0 ${getImpactColor(
                        insight.impact
                      )}`}
                    >
                      {insight.impact} impact
                    </Badge>
                    {insight.metric && (
                      <span className='text-xs font-medium text-muted-foreground ml-auto'>
                        {insight.metric}
                      </span>
                    )}
                  </div>

                  <p className='text-xs text-muted-foreground mb-2'>
                    {insight.description}
                  </p>

                  {insight.action && (
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-7 text-xs p-0 hover:bg-transparent hover:underline'
                    >
                      {insight.action}
                      <ArrowRight className='h-3 w-3 ml-1' />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className='pt-1 flex justify-between items-center text-xs text-muted-foreground'>
            <span>Last updated: Just now</span>
            <Button variant='link' size='sm' className='h-auto p-0 text-xs'>
              Refresh Insights
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

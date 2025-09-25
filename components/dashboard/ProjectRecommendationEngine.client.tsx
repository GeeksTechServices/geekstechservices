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
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Check,
  ChevronRight,
  Rocket,
  Gauge,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

interface Recommendation {
  id: string;
  type: "performance" | "security" | "cost" | "feature";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  effort: "high" | "medium" | "low";
  project: string;
}

export default function ProjectRecommendationEngine(): React.ReactElement {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: "rec_1",
      type: "performance",
      title: "Enable edge caching",
      description:
        "Add edge caching to improve latency by up to 45% for static assets",
      impact: "high",
      effort: "low",
      project: "e-commerce-api",
    },
    {
      id: "rec_2",
      type: "security",
      title: "Update dependencies",
      description: "3 high severity vulnerabilities found in dependencies",
      impact: "high",
      effort: "medium",
      project: "user-service",
    },
    {
      id: "rec_3",
      type: "cost",
      title: "Optimize database queries",
      description: "Reduce database load by implementing query optimization",
      impact: "medium",
      effort: "medium",
      project: "analytics-backend",
    },
    {
      id: "rec_4",
      type: "feature",
      title: "Implement rate limiting",
      description:
        "Add API rate limiting to prevent abuse and improve stability",
      impact: "medium",
      effort: "low",
      project: "payment-gateway",
    },
  ]);

  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredRecommendations = selectedType
    ? recommendations.filter((rec) => rec.type === selectedType)
    : recommendations;

  const dismissRecommendation = (id: string) => {
    setRecommendations((prev) => prev.filter((r) => r.id !== id));
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      default:
        return "text-muted-foreground";
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case "low":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      case "high":
        return "text-red-600";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "performance":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "security":
        return "bg-red-500/10 text-red-700 border-red-200";
      case "cost":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "feature":
        return "bg-purple-500/10 text-purple-700 border-purple-200";
      default:
        return "";
    }
  };

  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardTitle className='text-base flex items-center gap-2'>
          <Brain className='h-4 w-4 text-primary' />
          <span>AI Recommendations</span>
        </CardTitle>
        <CardDescription>Smart suggestions for your projects</CardDescription>
      </CardHeader>

      <CardContent className='p-4'>
        <div className='flex overflow-x-auto gap-2 py-1 mb-3'>
          <Button
            variant={selectedType === null ? "default" : "outline"}
            size='sm'
            className='text-xs rounded-full h-7'
            onClick={() => setSelectedType(null)}
          >
            All ({recommendations.length})
          </Button>

          <Button
            variant={selectedType === "performance" ? "default" : "outline"}
            size='sm'
            className={`text-xs rounded-full h-7 ${
              selectedType === "performance" ? "" : "text-blue-700"
            }`}
            onClick={() => setSelectedType("performance")}
          >
            <Gauge className='h-3 w-3 mr-1' />
            Performance
          </Button>

          <Button
            variant={selectedType === "security" ? "default" : "outline"}
            size='sm'
            className={`text-xs rounded-full h-7 ${
              selectedType === "security" ? "" : "text-red-700"
            }`}
            onClick={() => setSelectedType("security")}
          >
            <Sparkles className='h-3 w-3 mr-1' />
            Security
          </Button>

          <Button
            variant={selectedType === "cost" ? "default" : "outline"}
            size='sm'
            className={`text-xs rounded-full h-7 ${
              selectedType === "cost" ? "" : "text-green-700"
            }`}
            onClick={() => setSelectedType("cost")}
          >
            <ArrowUpRight className='h-3 w-3 mr-1' />
            Cost
          </Button>
        </div>

        <div className='space-y-3 mt-2'>
          {filteredRecommendations.length > 0 ? (
            filteredRecommendations.map((rec) => (
              <div
                key={rec.id}
                className='p-3 border rounded-lg hover:bg-muted/20 transition-colors'
              >
                <div className='flex items-center justify-between mb-1'>
                  <Badge className={`${getTypeColor(rec.type)} text-[10px]`}>
                    {rec.type}
                  </Badge>
                  <span className='text-xs text-muted-foreground'>
                    {rec.project}
                  </span>
                </div>

                <h3 className='font-medium text-sm mb-1'>{rec.title}</h3>
                <p className='text-xs text-muted-foreground mb-2'>
                  {rec.description}
                </p>

                <div className='flex items-center justify-between mt-2'>
                  <div className='flex items-center gap-2 text-xs'>
                    <span className='flex items-center'>
                      Impact:{" "}
                      <span
                        className={`ml-1 font-medium ${getImpactColor(
                          rec.impact
                        )}`}
                      >
                        {rec.impact}
                      </span>
                    </span>
                    <span className='flex items-center'>
                      Effort:{" "}
                      <span
                        className={`ml-1 font-medium ${getEffortColor(
                          rec.effort
                        )}`}
                      >
                        {rec.effort}
                      </span>
                    </span>
                  </div>

                  <div className='flex items-center gap-1'>
                    <Button
                      size='sm'
                      variant='ghost'
                      className='h-7'
                      onClick={() => dismissRecommendation(rec.id)}
                    >
                      <Check className='h-3 w-3 mr-1' />
                      Done
                    </Button>
                    <Button size='sm' className='h-7'>
                      <Rocket className='h-3 w-3 mr-1' />
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='py-8 text-center text-muted-foreground'>
              <p>No recommendations found</p>
              <Button variant='link' className='mt-1 text-xs'>
                Generate new recommendations
              </Button>
            </div>
          )}
        </div>

        {filteredRecommendations.length > 0 && (
          <Button className='w-full mt-3 text-xs' variant='outline'>
            <ChevronRight className='h-3 w-3 mr-1' />
            View all recommendations
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

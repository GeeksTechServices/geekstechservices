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
import {
  Sparkles,
  ArrowDownRight,
  AlertCircle,
  Check,
  X,
  BarChart4,
  RefreshCw,
  Plus,
} from "lucide-react";

interface OptimizationSuggestion {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  category: "code" | "configuration" | "caching" | "data";
  potentialSavings: number;
  implementationTime: string;
  isApplied: boolean;
  isDismissed: boolean;
}

export default function UsageOptimizationAI(): React.ReactElement {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showApplied, setShowApplied] = useState(false);

  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([
    {
      id: "opt_1",
      title: "Implement request batching",
      description:
        "Combine multiple API calls into batch requests to reduce overhead and improve efficiency.",
      impact: "high",
      category: "code",
      potentialSavings: 15,
      implementationTime: "4-6 hours",
      isApplied: false,
      isDismissed: false,
    },
    {
      id: "opt_2",
      title: "Enable response caching",
      description:
        "Cache frequently accessed resources to reduce redundant API calls.",
      impact: "high",
      category: "caching",
      potentialSavings: 22,
      implementationTime: "2-3 hours",
      isApplied: false,
      isDismissed: false,
    },
    {
      id: "opt_3",
      title: "Optimize payload size",
      description:
        "Implement field selection to reduce data transfer and processing time.",
      impact: "medium",
      category: "data",
      potentialSavings: 10,
      implementationTime: "3-4 hours",
      isApplied: false,
      isDismissed: false,
    },
    {
      id: "opt_4",
      title: "Set appropriate TTL values",
      description:
        "Configure optimal time-to-live settings for cached resources.",
      impact: "medium",
      category: "configuration",
      potentialSavings: 8,
      implementationTime: "1-2 hours",
      isApplied: true,
      isDismissed: false,
    },
    {
      id: "opt_5",
      title: "Implement rate limiting",
      description:
        "Add client-side rate limiting to prevent API abuse and minimize costs.",
      impact: "low",
      category: "code",
      potentialSavings: 5,
      implementationTime: "3-5 hours",
      isApplied: false,
      isDismissed: false,
    },
  ]);

  const filteredSuggestions = suggestions.filter((s) => {
    if (selectedCategory && s.category !== selectedCategory) return false;
    if (!showApplied && s.isApplied) return false;
    if (s.isDismissed) return false;
    return true;
  });

  const totalPotentialSavings = filteredSuggestions
    .filter((s) => !s.isApplied)
    .reduce((sum, s) => sum + s.potentialSavings, 0);

  const appliedSavings = suggestions
    .filter((s) => s.isApplied)
    .reduce((sum, s) => sum + s.potentialSavings, 0);

  const toggleApplied = (id: string) => {
    setSuggestions((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, isApplied: !s.isApplied, isDismissed: false } : s
      )
    );
  };

  const dismissSuggestion = (id: string) => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isDismissed: true } : s))
    );
  };

  const getImpactColor = (impact: string): string => {
    switch (impact) {
      case "high":
        return "text-green-600";
      case "medium":
        return "text-amber-600";
      case "low":
        return "text-blue-600";
      default:
        return "";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "code":
        return (
          <span className='h-5 w-5 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700'>
            &lt;/&gt;
          </span>
        );
      case "configuration":
        return (
          <span className='h-5 w-5 flex items-center justify-center rounded-full bg-green-100 text-green-700'>
            ⚙️
          </span>
        );
      case "caching":
        return (
          <span className='h-5 w-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-700'>
            📦
          </span>
        );
      case "data":
        return (
          <span className='h-5 w-5 flex items-center justify-center rounded-full bg-amber-100 text-amber-700'>
            📊
          </span>
        );
      default:
        return (
          <span className='h-5 w-5 flex items-center justify-center rounded-full bg-gray-100 text-gray-700'>
            ?
          </span>
        );
    }
  };

  return (
    <Card>
      <CardHeader className='pb-3'>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='text-lg flex items-center gap-2'>
              <Sparkles className='h-4 w-4 text-primary' />
              <span>Usage Optimization</span>
            </CardTitle>
            <CardDescription>
              AI-powered suggestions to reduce costs
            </CardDescription>
          </div>

          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='sm' className='h-8'>
              <RefreshCw className='h-3 w-3 mr-1' />
              <span className='text-xs'>Generate New</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className='flex items-center justify-between mb-4'>
          <Tabs
            defaultValue='all'
            onValueChange={(v) => setSelectedCategory(v === "all" ? null : v)}
          >
            <TabsList>
              <TabsTrigger value='all' className='text-xs'>
                All
              </TabsTrigger>
              <TabsTrigger value='code' className='text-xs'>
                Code
              </TabsTrigger>
              <TabsTrigger value='configuration' className='text-xs'>
                Config
              </TabsTrigger>
              <TabsTrigger value='caching' className='text-xs'>
                Caching
              </TabsTrigger>
              <TabsTrigger value='data' className='text-xs'>
                Data
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className='flex items-center'>
            <Button
              variant='outline'
              size='sm'
              className={`h-8 text-xs ${showApplied ? "bg-muted" : ""}`}
              onClick={() => setShowApplied(!showApplied)}
            >
              {showApplied ? "Hide Applied" : "Show Applied"}
            </Button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-4'>
          <Card className='bg-muted/30'>
            <CardContent className='p-3 flex items-center gap-3'>
              <div className='p-2 rounded-full bg-green-100'>
                <ArrowDownRight className='h-5 w-5 text-green-600' />
              </div>
              <div>
                <div className='text-sm font-medium'>Potential Savings</div>
                <div className='text-2xl font-semibold text-green-600'>
                  {totalPotentialSavings}%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-muted/30'>
            <CardContent className='p-3 flex items-center gap-3'>
              <div className='p-2 rounded-full bg-blue-100'>
                <BarChart4 className='h-5 w-5 text-blue-600' />
              </div>
              <div>
                <div className='text-sm font-medium'>Applied Optimizations</div>
                <div className='text-2xl font-semibold text-blue-600'>
                  {appliedSavings}%{" "}
                  <span className='text-xs text-muted-foreground'>saved</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='space-y-3'>
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((suggestion) => (
              <Card
                key={suggestion.id}
                className={`overflow-hidden transition-all ${
                  suggestion.isApplied ? "border-green-300 bg-green-50/30" : ""
                }`}
              >
                <CardContent className='p-3'>
                  <div className='flex items-start gap-3'>
                    <div className='mt-0.5'>
                      {getCategoryIcon(suggestion.category)}
                    </div>

                    <div className='flex-1'>
                      <div className='flex items-center justify-between'>
                        <h3 className='font-medium text-sm flex items-center gap-2'>
                          {suggestion.title}
                          {suggestion.isApplied && (
                            <span className='bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded-full'>
                              Applied
                            </span>
                          )}
                        </h3>

                        <div className='flex items-center gap-1'>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='h-6 w-6'
                            onClick={() => dismissSuggestion(suggestion.id)}
                          >
                            <X className='h-3 w-3' />
                          </Button>

                          <Button
                            variant={
                              suggestion.isApplied ? "outline" : "default"
                            }
                            size='sm'
                            className={`h-7 text-xs ${
                              suggestion.isApplied
                                ? "border-green-500 text-green-700"
                                : ""
                            }`}
                            onClick={() => toggleApplied(suggestion.id)}
                          >
                            {suggestion.isApplied ? (
                              <span className='flex items-center gap-1'>
                                <Check className='h-3 w-3' />
                                <span>Applied</span>
                              </span>
                            ) : (
                              <span className='flex items-center gap-1'>
                                <Plus className='h-3 w-3' />
                                <span>Apply</span>
                              </span>
                            )}
                          </Button>
                        </div>
                      </div>

                      <p className='text-xs text-muted-foreground my-1'>
                        {suggestion.description}
                      </p>

                      <div className='flex items-center gap-3 text-[11px] text-muted-foreground mt-2'>
                        <span
                          className={`font-medium ${getImpactColor(
                            suggestion.impact
                          )}`}
                        >
                          {suggestion.impact} impact
                        </span>
                        <span>
                          {suggestion.potentialSavings}% potential savings
                        </span>
                        <span>
                          ~{suggestion.implementationTime} to implement
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className='py-6 text-center'>
              <AlertCircle className='h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50' />
              <p className='text-sm text-muted-foreground'>
                No optimization suggestions found.
              </p>
              <Button variant='link' className='mt-1'>
                Generate new suggestions
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

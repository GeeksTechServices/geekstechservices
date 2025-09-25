"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, Download, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ServiceCost {
  name: string;
  cost: number;
  usageAmount: string;
  rateDescription: string;
  trend: "up" | "down" | "stable";
  percentChange: number;
}

export default function UsageCostBreakdown(): React.ReactElement {
  // Mock data for service costs
  const serviceCosts: ServiceCost[] = [
    {
      name: "Authentication",
      cost: 125.8,
      usageAmount: "125,800 requests",
      rateDescription: "$0.001 per request",
      trend: "up",
      percentChange: 8.2,
    },
    {
      name: "Data Storage",
      cost: 89.4,
      usageAmount: "447 GB-months",
      rateDescription: "$0.20 per GB-month",
      trend: "up",
      percentChange: 12.5,
    },
    {
      name: "Compute",
      cost: 210.15,
      usageAmount: "700.5 compute hours",
      rateDescription: "$0.30 per hour",
      trend: "down",
      percentChange: 3.8,
    },
    {
      name: "Messaging",
      cost: 65.25,
      usageAmount: "1.3M messages",
      rateDescription: "$0.05 per 1K messages",
      trend: "stable",
      percentChange: 0.5,
    },
    {
      name: "Analytics",
      cost: 42.75,
      usageAmount: "85.5 GB processed",
      rateDescription: "$0.50 per GB",
      trend: "down",
      percentChange: 5.2,
    },
  ];

  const totalCost = serviceCosts.reduce(
    (sum, service) => sum + service.cost,
    0
  );

  // Calculated AI insights
  const highestCostService = serviceCosts.reduce((prev, current) =>
    prev.cost > current.cost ? prev : current
  );

  const fastestGrowingService = serviceCosts.reduce((prev, current) =>
    current.trend === "up" && current.percentChange > prev.percentChange
      ? current
      : prev
  );

  const potentialSavings = Math.round(highestCostService.cost * 0.15);

  return (
    <Card>
      <CardHeader className='pb-3 border-b'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg flex items-center gap-2'>
            <CircleDollarSign className='h-4 w-4 text-primary' />
            <span>Cost Breakdown</span>
          </CardTitle>
          <Button size='sm' variant='outline' className='h-8'>
            <Download className='h-3.5 w-3.5 mr-1' />
            <span className='text-xs'>Export</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className='p-4'>
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex-1'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-sm font-medium'>Service Usage Costs</h3>
              <p className='text-sm font-semibold'>
                Total: ${totalCost.toFixed(2)}
              </p>
            </div>

            <div className='space-y-4'>
              {serviceCosts.map((service, index) => {
                // Calculate percentage of total cost for the visual bar
                const percentOfTotal = (service.cost / totalCost) * 100;

                return (
                  <div key={index} className='space-y-1'>
                    <div className='flex justify-between items-baseline text-sm'>
                      <div className='font-medium'>{service.name}</div>
                      <div className='flex items-center gap-2'>
                        <div
                          className={`text-xs font-medium ${
                            service.trend === "up"
                              ? "text-red-500"
                              : service.trend === "down"
                              ? "text-green-500"
                              : "text-gray-500"
                          }`}
                        >
                          {service.trend === "up"
                            ? "↑"
                            : service.trend === "down"
                            ? "↓"
                            : "→"}
                          {service.percentChange}%
                        </div>
                        <div className='font-semibold'>
                          ${service.cost.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className='flex items-center gap-2'>
                      <div className='w-full h-2 bg-muted rounded-full overflow-hidden'>
                        <div
                          className='h-full bg-primary rounded-full'
                          style={{ width: `${percentOfTotal}%` }}
                        ></div>
                      </div>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className='text-muted-foreground'>
                              <Info className='h-3.5 w-3.5' />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className='max-w-[200px]'>
                            <div className='text-xs'>
                              <p className='font-medium'>
                                {service.usageAmount}
                              </p>
                              <p className='text-muted-foreground'>
                                {service.rateDescription}
                              </p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className='w-full md:w-80 bg-muted/30 rounded-lg p-4'>
            <h3 className='font-medium text-sm mb-3'>AI Cost Insights</h3>
            <div className='space-y-4'>
              <div className='space-y-1'>
                <p className='text-xs text-muted-foreground'>
                  Highest Cost Service
                </p>
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-medium'>
                    {highestCostService.name}
                  </p>
                  <p className='text-sm font-semibold'>
                    ${highestCostService.cost.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className='space-y-1'>
                <p className='text-xs text-muted-foreground'>
                  Fastest Growing Service
                </p>
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-medium'>
                    {fastestGrowingService.name}
                  </p>
                  <p className='text-xs font-medium text-red-500'>
                    ↑ {fastestGrowingService.percentChange}%
                  </p>
                </div>
              </div>

              <div className='pt-2 border-t'>
                <div className='bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded p-2 text-xs'>
                  <p className='font-medium text-emerald-700 dark:text-emerald-400'>
                    Optimization Opportunity
                  </p>
                  <p className='mt-1 text-emerald-600 dark:text-emerald-500'>
                    Potential savings of{" "}
                    <span className='font-semibold'>${potentialSavings}</span>{" "}
                    by optimizing {highestCostService.name.toLowerCase()}{" "}
                    service usage patterns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

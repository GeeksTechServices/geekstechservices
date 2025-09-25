"use client";

import React from "react";
import PredictiveCostForecast from "./PredictiveCostForecast.client";
// Will be integrated elsewhere in the dashboard
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Receipt, CreditCard, AlertCircle } from "lucide-react";

const BillingDashboard = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full'>
      {/* Main billing summary */}
      <Card className='col-span-1 md:col-span-2'>
        <CardHeader className='pb-3 border-b'>
          <div className='flex items-center gap-2'>
            <Receipt className='h-5 w-5 text-primary' />
            <CardTitle className='text-lg'>Billing Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent className='p-4'>
          <Tabs defaultValue='current' className='space-y-4'>
            <TabsList className='grid grid-cols-3 mb-4'>
              <TabsTrigger value='current'>Current Period</TabsTrigger>
              <TabsTrigger value='history'>Billing History</TabsTrigger>
              <TabsTrigger value='methods'>Payment Methods</TabsTrigger>
            </TabsList>

            <TabsContent value='current' className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='p-4 border rounded-md bg-muted/20'>
                  <div className='text-xs text-muted-foreground mb-1'>
                    Current Plan
                  </div>
                  <div className='font-medium'>Business Pro</div>
                  <div className='text-sm text-muted-foreground'>$99/month</div>
                </div>
                <div className='p-4 border rounded-md bg-muted/20'>
                  <div className='text-xs text-muted-foreground mb-1'>
                    Billing Cycle
                  </div>
                  <div className='font-medium'>Monthly</div>
                  <div className='text-sm text-muted-foreground'>
                    Next: Nov 15, 2024
                  </div>
                </div>
                <div className='p-4 border rounded-md bg-muted/20'>
                  <div className='text-xs text-muted-foreground mb-1'>
                    Current Usage
                  </div>
                  <div className='font-medium'>185,000 / 200,000</div>
                  <div className='text-sm text-muted-foreground'>
                    API Calls (92%)
                  </div>
                </div>
              </div>

              <div className='p-4 border rounded-md flex items-center gap-3 bg-amber-500/10'>
                <AlertCircle className='h-5 w-5 text-amber-500' />
                <div>
                  <div className='font-medium'>Approaching Limit</div>
                  <div className='text-sm'>
                    You&apos;ve used 92% of your monthly API calls. Consider
                    upgrading your plan.
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-1 gap-4'>
                {/* BillingAIPredictor is shown separately in the dashboard */}
              </div>
            </TabsContent>

            <TabsContent value='history' className='space-y-4'>
              <div className='border rounded-md overflow-hidden'>
                <table className='w-full'>
                  <thead className='bg-muted/50'>
                    <tr>
                      <th className='px-4 py-2 text-left text-xs font-medium text-muted-foreground'>
                        Date
                      </th>
                      <th className='px-4 py-2 text-left text-xs font-medium text-muted-foreground'>
                        Amount
                      </th>
                      <th className='px-4 py-2 text-left text-xs font-medium text-muted-foreground'>
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='border-t'>
                      <td className='px-4 py-3 text-sm'>Oct 15, 2024</td>
                      <td className='px-4 py-3 text-sm'>$99.00</td>
                      <td className='px-4 py-3 text-sm'>
                        <span className='px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-700'>
                          Paid
                        </span>
                      </td>
                    </tr>
                    <tr className='border-t'>
                      <td className='px-4 py-3 text-sm'>Sep 15, 2024</td>
                      <td className='px-4 py-3 text-sm'>$99.00</td>
                      <td className='px-4 py-3 text-sm'>
                        <span className='px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-700'>
                          Paid
                        </span>
                      </td>
                    </tr>
                    <tr className='border-t'>
                      <td className='px-4 py-3 text-sm'>Aug 15, 2024</td>
                      <td className='px-4 py-3 text-sm'>$99.00</td>
                      <td className='px-4 py-3 text-sm'>
                        <span className='px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-700'>
                          Paid
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value='methods' className='space-y-4'>
              <div className='border rounded-md p-4'>
                <div className='flex items-center gap-3'>
                  <CreditCard className='h-8 w-8' />
                  <div>
                    <div className='font-medium'>•••• •••• •••• 4242</div>
                    <div className='text-xs text-muted-foreground'>
                      Expires 12/2025
                    </div>
                  </div>
                  <div className='ml-auto'>
                    <span className='px-2 py-1 text-xs rounded-full bg-primary/10 text-primary'>
                      Default
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Predictive AI cost forecast */}
      <div className='col-span-1'>
        <PredictiveCostForecast />
      </div>
    </div>
  );
};

export default BillingDashboard;

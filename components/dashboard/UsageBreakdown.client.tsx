"use client";
import React from "react";
import { Progress } from "@/components/ui/progress";

interface Item {
  label: string;
  used: number;
  limit: number;
}

const base: Item[] = [
  { label: "API Calls", used: 12400, limit: 50000 },
  { label: "Compute Minutes", used: 2200, limit: 8000 },
  { label: "Storage (GB)", used: 12, limit: 100 },
  { label: "Bandwidth (GB)", used: 86, limit: 250 },
];

export default function UsageBreakdown() {
  return (
    <div className='space-y-4'>
      {base.map((i) => {
        const pct = (i.used / i.limit) * 100;
        return (
          <div key={i.label} className='space-y-1'>
            <div className='flex justify-between text-xs'>
              <span className='font-medium'>{i.label}</span>
              <span className='text-muted-foreground'>
                {i.used.toLocaleString()} / {i.limit.toLocaleString()}
              </span>
            </div>
            <Progress value={pct} />
          </div>
        );
      })}
    </div>
  );
}

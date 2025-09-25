"use client";
import React from "react";

interface Event {
  id: string;
  time: string;
  text: string;
  type: string;
}

const seed: Event[] = Array.from({ length: 7 }, (_, i) => ({
  id: `evt_${i}`,
  time: new Date(Date.now() - i * 1000 * 60 * 35).toISOString(),
  text: [
    "Deployment completed",
    "New API key generated",
    "Plan upgraded to Pro",
    "User invited to team",
    "Project latency increased",
    "Billing method added",
    "Error rate back to normal",
  ][i],
  type: ["deploy", "key", "plan", "team", "alert", "billing", "info"][i],
}));

export default function ActivityTimeline() {
  return (
    <ul className='space-y-3 text-sm'>
      {seed.map((e) => (
        <li key={e.id} className='flex items-start gap-3'>
          <span className='mt-1 h-2 w-2 rounded-full bg-primary'></span>
          <div>
            <div className='font-medium'>{e.text}</div>
            <div className='text-xs text-muted-foreground'>
              {new Date(e.time).toLocaleTimeString()}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

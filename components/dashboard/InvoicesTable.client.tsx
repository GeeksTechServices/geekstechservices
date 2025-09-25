"use client";
import React from "react";

interface Invoice {
  id: string;
  period: string;
  total: number;
  status: "paid" | "due" | "upcoming";
  issued: string;
}

const invoices: Invoice[] = Array.from({ length: 6 }, (_, i) => ({
  id: `inv_${i + 1010}`,
  period: `2025-${(i + 5).toString().padStart(2, "0")}`,
  total: 29 + (i % 2) * 10 + Math.random() * 5,
  status: i === 0 ? "upcoming" : "paid",
  issued: new Date(Date.now() - i * 1000 * 60 * 60 * 24 * 30).toISOString(),
}));

export default function InvoicesTable() {
  return (
    <div className='rounded-lg border overflow-hidden'>
      <table className='w-full text-sm'>
        <thead className='bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground'>
          <tr>
            <th className='text-left py-2 px-3'>Invoice</th>
            <th className='text-left py-2 px-3'>Period</th>
            <th className='text-left py-2 px-3'>Total</th>
            <th className='text-left py-2 px-3'>Status</th>
            <th className='text-left py-2 px-3'>Issued</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id} className='border-t hover:bg-muted/30'>
              <td className='py-2 px-3 font-medium'>{inv.id}</td>
              <td className='py-2 px-3'>{inv.period}</td>
              <td className='py-2 px-3'>${inv.total.toFixed(2)}</td>
              <td className='py-2 px-3'>
                <span
                  className={`px-2 py-0.5 rounded text-xs ${
                    inv.status === "paid"
                      ? "bg-green-500/15 text-green-600 dark:text-green-400"
                      : inv.status === "due"
                      ? "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400"
                      : "bg-blue-500/15 text-blue-600 dark:text-blue-400"
                  }`}
                >
                  {inv.status}
                </span>
              </td>
              <td className='py-2 px-3 text-xs text-muted-foreground'>
                {new Date(inv.issued).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

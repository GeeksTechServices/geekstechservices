"use client";

import React from "react";
import logsData from "@/lib/logs.json";

// Strongly-typed log entry shape matching lib/logs.json
interface LogEntry {
  time: string;
  level: string; // e.g., 'info' | 'warn' | 'error'
  source: string;
  message: string;
  // allow extra fields but typed as unknown to avoid `any`
  [key: string]: unknown;
}

function jitterTime(iso: string) {
  const base = new Date(iso).getTime();
  const jitter = Math.floor(Math.random() * 60_000) - 30_000; // +/- 30s
  return new Date(base + jitter).toLocaleString();
}

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

function downloadCSV(rows: LogEntry[]) {
  const headers = ["time", "level", "source", "message"];
  const csv = [headers.join(",")]
    .concat(
      rows.map((r) =>
        [
          r.time,
          r.level,
          r.source,
          `"${(r.message || "").toString().replace(/"/g, '""')}")`,
        ].join(",")
      )
    )
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `logs-${new Date().toISOString()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function RecentLogs(): React.ReactElement {
  const [logs, setLogs] = React.useState<LogEntry[]>(logsData as LogEntry[]);
  const [levelFilter, setLevelFilter] = React.useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = React.useState<string | null>(null);

  React.useEffect(() => {
    // rotate logs locally to simulate new entries
    const id = window.setInterval(() => {
      setLogs((prev) => {
        const next = [
          {
            ...prev[Math.floor(Math.random() * prev.length)],
            time: new Date().toISOString(),
          },
          ...prev.slice(0, prev.length - 1),
        ];
        return next;
      });
    }, 5000);

    return () => window.clearInterval(id);
  }, []);

  const levels: string[] = Array.from(
    new Set((logsData as LogEntry[]).map((l) => l.level))
  );
  const sources: string[] = Array.from(
    new Set((logsData as LogEntry[]).map((l) => l.source))
  );

  const filtered: LogEntry[] = logs.filter((l: LogEntry) => {
    if (levelFilter && l.level !== levelFilter) return false;
    if (sourceFilter && l.source !== sourceFilter) return false;
    return true;
  });

  return (
    <div>
      <div className='flex items-center justify-between mb-2'>
        <h4 className='font-semibold'>Recent Logs</h4>
        <div className='flex items-center gap-2'>
          <Button
            size='sm'
            variant='ghost'
            onClick={() => downloadCSV(filtered.slice(0, 200))}
          >
            Export CSV
          </Button>
        </div>
      </div>

      <div className='flex gap-2 mb-3'>
        <div className='flex gap-1 items-center'>
          <span className='text-xs text-muted-foreground mr-1'>Level</span>
          <Select
            value={levelFilter || "all"}
            onValueChange={(v) => setLevelFilter(v === "all" ? null : v)}
          >
            <SelectTrigger className='h-8 w-[120px] text-xs'>
              <SelectValue placeholder='All' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All</SelectItem>
              {levels.map((lv) => (
                <SelectItem key={lv} value={lv}>
                  {lv}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='flex gap-1 items-center'>
          <span className='text-xs text-muted-foreground mr-1'>Source</span>
          <Select
            value={sourceFilter || "all"}
            onValueChange={(v) => setSourceFilter(v === "all" ? null : v)}
          >
            <SelectTrigger className='h-8 w-[140px] text-xs'>
              <SelectValue placeholder='All' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All</SelectItem>
              {sources.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ul className='space-y-2 text-sm text-muted-foreground'>
        {filtered.slice(0, 12).map((l: LogEntry, i: number) => (
          <li key={i} className='p-2 rounded bg-background/50 flex flex-col'>
            <div className='flex items-center justify-between'>
              <div className='text-xs text-muted-foreground'>
                {jitterTime(l.time)}
              </div>
              <div>
                <Badge
                  variant={
                    l.level === "error"
                      ? "destructive"
                      : l.level === "warn"
                      ? "secondary"
                      : "default"
                  }
                >
                  {l.level.toUpperCase()}
                </Badge>
              </div>
            </div>
            <div className='font-medium mt-1'>{l.message}</div>
            <div className='text-xs text-muted-foreground mt-1 flex items-center gap-2'>
              <span className='inline-block px-2 py-0.5 rounded bg-muted/20 text-xs'>
                {l.source}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Project {
  id: string;
  name: string;
  status: "active" | "paused" | "error";
  createdAt: string;
  tags: string[];
  latencyMs: number;
}

const STATUSES: Project["status"][] = ["active", "paused", "error"];
const SAMPLE_TAGS = ["api", "edge", "ml", "cron", "public", "internal"];

function randomProject(i: number): Project {
  return {
    id: `p_${i}_${Math.random().toString(36).slice(2, 7)}`,
    name: `Project ${i + 1}`,
    status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
    createdAt: new Date(
      Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30
    ).toISOString(),
    tags: SAMPLE_TAGS.sort(() => 0.5 - Math.random()).slice(
      0,
      2 + Math.floor(Math.random() * 2)
    ),
    latencyMs: 40 + Math.random() * 250,
  };
}

export default function ProjectsTable() {
  const [projects, setProjects] = React.useState<Project[]>(() =>
    Array.from({ length: 8 }, (_, i) => randomProject(i))
  );
  const [query, setQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const [newTags, setNewTags] = React.useState("");

  const filtered = projects.filter((p) => {
    if (query && !p.name.toLowerCase().includes(query.toLowerCase()))
      return false;
    if (statusFilter && p.status !== statusFilter) return false;
    return true;
  });

  function addProject() {
    if (!newName.trim()) return;
    const proj: Project = {
      id: `p_${Date.now()}`,
      name: newName.trim(),
      status: "active",
      createdAt: new Date().toISOString(),
      tags: newTags
        .split(/[,\s]+/)
        .filter(Boolean)
        .slice(0, 4),
      latencyMs: 50 + Math.random() * 150,
    };
    setProjects((pr) => [proj, ...pr]);
    setOpen(false);
    setNewName("");
    setNewTags("");
  }

  return (
    <div className='space-y-4'>
      <div className='flex flex-col md:flex-row gap-3 md:items-center justify-between'>
        <div className='flex gap-2 w-full md:w-auto'>
          <Input
            placeholder='Search projects...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Select
            value={statusFilter || "all"}
            onValueChange={(v) => setStatusFilter(v === "all" ? "" : v)}
          >
            <SelectTrigger className='w-[140px]'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All</SelectItem>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size='sm'>New Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Project</DialogTitle>
            </DialogHeader>
            <div className='space-y-4 mt-2'>
              <div>
                <label className='block text-xs mb-1'>Name</label>
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder='Awesome App'
                />
              </div>
              <div>
                <label className='block text-xs mb-1'>
                  Tags (comma or space separated)
                </label>
                <Input
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder='api edge ml'
                />
              </div>
              <div className='flex justify-end'>
                <Button onClick={addProject}>Create</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className='rounded-lg border overflow-hidden'>
        <table className='w-full text-sm'>
          <thead className='bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground'>
            <tr>
              <th className='text-left py-2 px-3'>Name</th>
              <th className='text-left py-2 px-3'>Status</th>
              <th className='text-left py-2 px-3'>Latency</th>
              <th className='text-left py-2 px-3'>Tags</th>
              <th className='text-left py-2 px-3'>Created</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr
                key={p.id}
                className='border-t hover:bg-muted/30 transition-colors'
              >
                <td className='py-2 px-3 font-medium'>{p.name}</td>
                <td className='py-2 px-3'>
                  <Badge
                    variant={
                      p.status === "error"
                        ? "destructive"
                        : p.status === "paused"
                        ? "secondary"
                        : "default"
                    }
                  >
                    {p.status}
                  </Badge>
                </td>
                <td className='py-2 px-3'>{p.latencyMs.toFixed(0)} ms</td>
                <td className='py-2 px-3'>
                  <div className='flex flex-wrap gap-1'>
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className='px-2 py-0.5 rounded bg-muted/40 text-[10px] uppercase tracking-wide'
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className='py-2 px-3 text-xs text-muted-foreground'>
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className='py-6 text-center text-muted-foreground'
                >
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

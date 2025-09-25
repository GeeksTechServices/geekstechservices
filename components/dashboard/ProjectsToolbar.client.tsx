"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProjectAIAssistant from "./ProjectAIAssistant.client";

export default function ProjectsToolbar(): React.ReactElement {
  const [query, setQuery] = React.useState("");

  return (
    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full'>
      <div className='flex items-center gap-3 w-full max-w-xl'>
        <Input
          placeholder='Search projects, tags, ids...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='w-full'
          aria-label='Search projects'
        />
        <Button size='sm' variant='ghost' onClick={() => setQuery("")}>
          Clear
        </Button>
      </div>

      <div className='flex items-center gap-2'>
        <ProjectAIAssistant />
        <Button size='sm' variant='outline'>
          Export
        </Button>
        <Button
          size='sm'
          onClick={() => window.alert("Create project flow (stub)")}
        >
          New Project
        </Button>
      </div>
    </div>
  );
}

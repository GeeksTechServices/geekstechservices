"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  X,
  ChevronRight,
  Code,
  RotateCw,
  Terminal,
  Zap,
} from "lucide-react";

interface Suggestion {
  type: "action" | "resource" | "optimization";
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: string;
}

export default function ProjectAIAssistant(): React.ReactElement {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Mock suggestions that would come from AI
  const suggestions: Suggestion[] = [
    {
      type: "action",
      title: "Deploy to Edge",
      description:
        "Convert existing projects to edge computing for 35% faster response time",
      icon: <Zap className='h-4 w-4 text-yellow-500' />,
      action: "Convert",
    },
    {
      type: "resource",
      title: "API Performance",
      description: "Optimize your API endpoints for better performance",
      icon: <Terminal className='h-4 w-4 text-blue-500' />,
      action: "View Guide",
    },
    {
      type: "optimization",
      title: "Inactive Projects",
      description: "2 projects have been inactive for over 30 days",
      icon: <RotateCw className='h-4 w-4 text-orange-500' />,
      action: "Archive",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    // Simulate API call to AI assistant
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, we'd send the query to an AI endpoint and display results
    }, 1500);
  };

  return (
    <div className='relative'>
      {!isAssistantOpen ? (
        <Button
          variant='outline'
          className='flex items-center gap-2 border border-dashed'
          onClick={() => setIsAssistantOpen(true)}
        >
          <Bot className='h-4 w-4' />
          <span>Project Assistant</span>
        </Button>
      ) : (
        <Card className='w-full lg:w-[450px] shadow-lg animate-in fade-in-0 slide-in-from-top-5 duration-300'>
          <CardHeader className='pb-2 flex flex-row items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Bot className='h-4 w-4 text-primary' />
              <CardTitle className='text-base'>Project Assistant</CardTitle>
            </div>
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8'
              onClick={() => setIsAssistantOpen(false)}
            >
              <X className='h-4 w-4' />
            </Button>
          </CardHeader>

          <CardContent className='p-4 space-y-4'>
            <form onSubmit={handleSubmit} className='flex gap-2'>
              <Input
                placeholder='Ask about your projects...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className='flex-1'
              />
              <Button type='submit' disabled={isLoading || !query.trim()}>
                {isLoading ? (
                  <span className='flex items-center gap-2'>
                    <span className='h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent'></span>
                    <span>Thinking</span>
                  </span>
                ) : (
                  <ChevronRight className='h-4 w-4' />
                )}
              </Button>
            </form>

            <div className='border-t pt-3 mt-2'>
              <h3 className='text-sm font-medium mb-2'>Suggestions</h3>
              <div className='space-y-3'>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className='flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors'
                  >
                    <div className='mt-0.5'>{suggestion.icon}</div>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-0.5'>
                        <h4 className='text-sm font-medium'>
                          {suggestion.title}
                        </h4>
                        <Badge
                          variant='outline'
                          className='text-[10px] px-1 py-0 h-4'
                        >
                          {suggestion.type}
                        </Badge>
                      </div>
                      <p className='text-xs text-muted-foreground'>
                        {suggestion.description}
                      </p>
                    </div>
                    {suggestion.action && (
                      <Button size='sm' variant='ghost' className='h-7 text-xs'>
                        {suggestion.action}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter className='px-4 py-2 border-t text-xs text-muted-foreground flex justify-between'>
            <div className='flex items-center gap-1'>
              <Code className='h-3 w-3' />
              <span>AI-powered by GeeksTech</span>
            </div>
            <Button variant='link' size='sm' className='h-auto p-0 text-xs'>
              Help
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

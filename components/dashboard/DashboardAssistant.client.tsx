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
import {
  Bot,
  ChevronRight,
  X,
  Code,
  Sparkles,
  MessagesSquare,
  ArrowRight,
  FileText,
  Zap,
} from "lucide-react";

interface AssistantSuggestion {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: string;
}

export default function DashboardAssistant(): React.ReactElement {
  const [isAssistantExpanded, setIsAssistantExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    // Simulate API call to AI assistant
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, we'd send the query to an AI endpoint and display results
      setQuery("");
    }, 1500);
  };

  // Suggestions that the assistant can provide
  const suggestions: AssistantSuggestion[] = [
    {
      icon: <Zap className='h-4 w-4 text-yellow-500' />,
      title: "Performance Boost",
      description:
        "Analyze and optimize your API endpoints for better performance",
      action: "Optimize Now",
    },
    {
      icon: <FileText className='h-4 w-4 text-blue-500' />,
      title: "Documentation",
      description: "Access comprehensive API documentation and usage examples",
      action: "View Docs",
    },
    {
      icon: <MessagesSquare className='h-4 w-4 text-green-500' />,
      title: "Support Chat",
      description: "Connect with our support team for personalized assistance",
      action: "Chat Now",
    },
  ];

  return (
    <div className='fixed bottom-4 right-4 z-50'>
      {!isAssistantExpanded ? (
        <Button
          className='h-12 w-12 rounded-full shadow-lg flex items-center justify-center'
          onClick={() => setIsAssistantExpanded(true)}
        >
          <Bot className='h-5 w-5' />
        </Button>
      ) : (
        <Card className='w-[350px] shadow-xl animate-in fade-in slide-in-from-bottom-5 duration-200'>
          <CardHeader className='pb-2 border-b'>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-sm flex items-center gap-2'>
                <Bot className='h-4 w-4 text-primary' />
                <span>Dashboard Assistant</span>
              </CardTitle>
              <Button
                variant='ghost'
                size='icon'
                className='h-7 w-7'
                onClick={() => setIsAssistantExpanded(false)}
              >
                <X className='h-3.5 w-3.5' />
              </Button>
            </div>
          </CardHeader>

          <CardContent className='p-3 space-y-3'>
            <form onSubmit={handleSubmit} className='flex gap-2'>
              <Input
                placeholder='How can I help you today?'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className='flex-1 h-9 text-sm'
              />
              <Button
                type='submit'
                size='sm'
                className='h-9'
                disabled={isLoading || !query.trim()}
              >
                {isLoading ? (
                  <div className='h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin'></div>
                ) : (
                  <ChevronRight className='h-3.5 w-3.5' />
                )}
              </Button>
            </form>

            <div className='space-y-2'>
              <div className='flex items-center gap-1.5 text-xs'>
                <Sparkles className='h-3 w-3 text-primary' />
                <span className='font-medium'>Suggested actions</span>
              </div>

              <div className='space-y-2'>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className='flex items-start gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer'
                  >
                    <div className='mt-0.5'>{suggestion.icon}</div>
                    <div className='flex-1 min-w-0'>
                      <h4 className='text-sm font-medium'>
                        {suggestion.title}
                      </h4>
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

          <CardFooter className='px-3 py-2 border-t flex justify-between items-center'>
            <div className='text-xs text-muted-foreground flex items-center gap-1'>
              <Code className='h-3 w-3' />
              <span>Powered by GeeksTech AI</span>
            </div>
            <Button
              variant='link'
              size='sm'
              className='h-auto p-0 text-xs flex items-center'
            >
              <span>Help center</span>
              <ArrowRight className='h-2.5 w-2.5 ml-1' />
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

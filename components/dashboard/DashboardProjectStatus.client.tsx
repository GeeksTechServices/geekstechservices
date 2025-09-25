"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ProjectSummary {
  id: string;
  name: string;
  status: "active" | "completed" | "draft";
  progress: number;
  dueDate?: string;
  team: number;
  metrics: {
    apiCalls: number;
    responseTime: number;
    errorRate: number;
  };
  aiInsights: string[];
}

export default function DashboardProjectStatus(): React.ReactElement {
  // Mock data for projects
  const projects: ProjectSummary[] = [
    {
      id: "p1",
      name: "API Gateway Integration",
      status: "active",
      progress: 65,
      dueDate: "2025-10-15",
      team: 4,
      metrics: {
        apiCalls: 243567,
        responseTime: 156,
        errorRate: 0.8,
      },
      aiInsights: [
        "Error rates increased by 0.3% in the last 7 days",
        "Consider implementing rate limiting to manage peak traffic periods",
      ],
    },
    {
      id: "p2",
      name: "User Authentication Service",
      status: "active",
      progress: 82,
      dueDate: "2025-10-05",
      team: 3,
      metrics: {
        apiCalls: 542189,
        responseTime: 98,
        errorRate: 0.2,
      },
      aiInsights: [
        "Authentication performance has improved by 12% after recent optimizations",
        "Security audit recommended: implement MFA for administrative endpoints",
      ],
    },
    {
      id: "p3",
      name: "Data Analytics Dashboard",
      status: "draft",
      progress: 28,
      team: 2,
      metrics: {
        apiCalls: 18245,
        responseTime: 204,
        errorRate: 1.4,
      },
      aiInsights: [
        "Beta testers report slow loading times for data-heavy views",
        "Consider implementing pagination or virtualization for large datasets",
      ],
    },
  ];

  const getStatusColor = (status: ProjectSummary["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "completed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "draft":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress > 75) return "bg-green-600";
    if (progress > 40) return "bg-amber-500";
    return "bg-red-500";
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <Card className='border shadow-md overflow-hidden'>
      <CardHeader className='pb-2 border-b'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-base flex items-center gap-2'>
            <BarChart className='h-4 w-4 text-primary' />
            <span>Projects Status</span>
          </CardTitle>
          <div className='flex items-center gap-2'>
            <Badge variant='secondary' className='h-5 text-xs gap-1'>
              <Sparkles className='h-3 w-3 text-primary' />
              <span>AI Enhanced</span>
            </Badge>
            <Button variant='outline' size='sm' className='h-8'>
              All Projects
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className='p-4'>
        <Tabs defaultValue='overview' className='space-y-4'>
          <TabsList className='grid grid-cols-2 h-8 w-[240px]'>
            <TabsTrigger value='overview' className='text-xs'>
              Overview
            </TabsTrigger>
            <TabsTrigger value='metrics' className='text-xs'>
              Metrics
            </TabsTrigger>
          </TabsList>

          <TabsContent value='overview' className='space-y-4 mt-0'>
            {projects.map((project) => (
              <Card key={project.id} className='overflow-hidden'>
                <CardContent className='p-0'>
                  <div className='border-b p-3'>
                    <div className='flex items-center justify-between mb-2'>
                      <div className='flex items-center gap-2'>
                        <h3 className='font-medium text-sm'>{project.name}</h3>
                        <Badge
                          variant='outline'
                          className={`text-[10px] h-4 px-1 py-0 ${getStatusColor(
                            project.status
                          )}`}
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <Button variant='ghost' size='sm' className='h-7 text-xs'>
                        View
                      </Button>
                    </div>

                    <div className='space-y-2'>
                      <div className='flex items-center justify-between text-xs text-muted-foreground'>
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress
                        value={project.progress}
                        className={getProgressColor(project.progress)}
                      />
                    </div>

                    <div className='flex flex-wrap gap-3 mt-3 text-xs'>
                      <div className='flex items-center gap-1 text-muted-foreground'>
                        <Users className='h-3 w-3' />
                        <span>{project.team} team members</span>
                      </div>

                      {project.dueDate && (
                        <div className='flex items-center gap-1 text-muted-foreground'>
                          <Calendar className='h-3 w-3' />
                          <span>
                            Due {new Date(project.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='bg-muted/30 p-3'>
                    <div className='flex items-center gap-1 mb-2 text-xs'>
                      <Sparkles className='h-3 w-3 text-primary' />
                      <span className='font-medium'>AI Insights</span>
                    </div>

                    <ul className='space-y-1.5'>
                      {project.aiInsights.map((insight, index) => (
                        <li
                          key={index}
                          className='flex items-start gap-1.5 text-xs text-muted-foreground'
                        >
                          <div className='mt-1 h-1 w-1 rounded-full bg-primary flex-shrink-0'></div>
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button variant='outline' className='w-full h-9 text-xs'>
              <span>View all projects</span>
              <ArrowRight className='h-3 w-3 ml-1' />
            </Button>
          </TabsContent>

          <TabsContent value='metrics' className='mt-0'>
            <div className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                {projects.map((project) => (
                  <Card
                    key={project.id}
                    className='overflow-hidden bg-muted/30'
                  >
                    <CardHeader className='p-3 pb-2'>
                      <h3 className='text-sm font-medium'>{project.name}</h3>
                    </CardHeader>
                    <CardContent className='p-3 pt-0'>
                      <div className='space-y-2'>
                        <MetricItem
                          label='API Calls'
                          value={formatNumber(project.metrics.apiCalls)}
                          icon={
                            <TrendingUp className='h-3 w-3 text-blue-500' />
                          }
                        />
                        <MetricItem
                          label='Response Time'
                          value={`${project.metrics.responseTime} ms`}
                          icon={<Clock className='h-3 w-3 text-amber-500' />}
                        />
                        <MetricItem
                          label='Error Rate'
                          value={`${project.metrics.errorRate}%`}
                          icon={
                            <CheckCircle2 className='h-3 w-3 text-green-500' />
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

interface MetricItemProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

function MetricItem({
  label,
  value,
  icon,
}: MetricItemProps): React.ReactElement {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
        {icon}
        <span>{label}</span>
      </div>
      <span className='text-xs font-medium'>{value}</span>
    </div>
  );
}

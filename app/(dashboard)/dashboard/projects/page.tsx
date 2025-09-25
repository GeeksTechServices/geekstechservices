import React from "react";
import ProjectsTable from "@/components/dashboard/ProjectsTable.client";
import DonutChart from "@/components/dashboard/DonutChart.client";
import AnimatedCounter from "@/components/dashboard/AnimatedCounter.client";
import GlowingButton from "@/components/dashboard/GlowingButton.client";
import FloatingCard from "@/components/dashboard/FloatingCard.client";
import ProjectsToolbar from "@/components/dashboard/ProjectsToolbar.client";
// Button intentionally not needed at page-level (used inside client components)
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  const projectStats = [
    { label: "Active", value: 65, color: "hsl(var(--chart-1))" },
    { label: "Paused", value: 25, color: "hsl(var(--chart-2))" },
    { label: "Error", value: 10, color: "hsl(var(--chart-3))" },
  ];

  return (
    <main className='p-6 space-y-6'>
      <div className='space-y-2'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <h1 className='text-3xl font-semibold'>Projects</h1>
            <p className='text-muted-foreground'>
              Create, search and manage your deployed projects.
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <GlowingButton glowColor='green'>Import from GitHub</GlowingButton>
          </div>
        </div>

        {/* Toolbar: search + actions (client) */}
        <ProjectsToolbar />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
        <FloatingCard delay={0}>
          <Card>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <div className='text-2xl font-bold'>
                    <AnimatedCounter value={8} />
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    Total Projects
                  </p>
                </div>
                <div className='text-muted-foreground'>
                  <svg
                    className='h-8 w-8 opacity-70'
                    viewBox='0 0 24 24'
                    fill='none'
                  >
                    <path
                      d='M3 7h18'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                    />
                    <path
                      d='M3 12h18'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </FloatingCard>

        <FloatingCard delay={200}>
          <Card>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <div className='text-2xl font-bold text-green-600'>
                    <AnimatedCounter value={5} />
                  </div>
                  <p className='text-sm text-muted-foreground'>Active</p>
                </div>
                <div className='text-green-500'>
                  <svg className='h-8 w-8' viewBox='0 0 24 24' fill='none'>
                    <path
                      d='M5 12l4 4L19 6'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </FloatingCard>

        <FloatingCard delay={400}>
          <Card>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <div className='text-2xl font-bold text-yellow-600'>
                    <AnimatedCounter value={2} />
                  </div>
                  <p className='text-sm text-muted-foreground'>Paused</p>
                </div>
                <div className='text-yellow-500'>
                  <svg className='h-8 w-8' viewBox='0 0 24 24' fill='none'>
                    <path
                      d='M6 19V5l12 7-12 7z'
                      stroke='currentColor'
                      strokeWidth='1.2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </FloatingCard>

        <FloatingCard delay={600}>
          <Card>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <div className='text-2xl font-bold text-red-600'>
                    <AnimatedCounter value={1} />
                  </div>
                  <p className='text-sm text-muted-foreground'>Issues</p>
                </div>
                <div className='text-red-500'>
                  <svg className='h-8 w-8' viewBox='0 0 24 24' fill='none'>
                    <path
                      d='M12 9v4'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                    />
                    <path
                      d='M12 17h.01'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </FloatingCard>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        <div className='lg:col-span-3'>
          <ProjectsTable />
        </div>

        <div className='space-y-4'>
          <Card>
            <CardHeader className='pb-3'>
              <CardTitle className='text-lg'>Project Status</CardTitle>
              <CardDescription>Distribution by status</CardDescription>
            </CardHeader>
            <CardContent className='flex justify-center'>
              <div className='flex flex-col items-center'>
                <DonutChart
                  data={projectStats}
                  centerText='8 Total'
                  size={160}
                />
                <div className='mt-3 flex gap-3'>
                  {projectStats.map((s) => (
                    <div
                      key={s.label}
                      className='flex items-center gap-2 text-xs'
                    >
                      <span
                        className='w-3 h-3 rounded-full'
                        style={{ background: s.color }}
                      />
                      <span className='text-muted-foreground'>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-3'>
              <CardTitle className='text-lg'>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='flex justify-between'>
                <span className='text-sm text-muted-foreground'>
                  Avg. Response Time
                </span>
                <span className='text-sm font-medium'>
                  <AnimatedCounter value={89} />
                  ms
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-sm text-muted-foreground'>
                  Total Requests
                </span>
                <span className='text-sm font-medium'>
                  <AnimatedCounter value={45200} format='locale' />
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-sm text-muted-foreground'>
                  Error Rate
                </span>
                <span className='text-sm font-medium text-red-600'>
                  <AnimatedCounter value={0.12} format='percent' decimals={2} />
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

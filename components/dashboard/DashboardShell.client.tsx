"use client";

import React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";

import useAuth from "../../hooks/useAuth";
import ProfileCard from "./ProfileCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/signin");
    }
  }, [user, loading, router]);

  return (
    <SidebarProvider defaultOpen={true} className='min-h-screen'>
      <div className='flex'>
        <Sidebar>
          <div className='p-3'>
            <SidebarHeader>
              <Link href='/dashboard'>
                <p className='text-lg font-semibold'>GeekStech</p>
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href='/dashboard'>Overview</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href='/dashboard/projects'>Projects</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href='/dashboard/billing'>Billing</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href='/dashboard/usage'>Usage</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarSeparator />
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href='/dashboard/settings'>Settings</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              {user ? (
                <ProfileCard user={user} />
              ) : (
                <div className='p-2'>Not signed in</div>
              )}
            </SidebarFooter>
          </div>
        </Sidebar>
        <main className='flex-1 p-6 w-full'>
          {loading ? (
            <div className='w-full'>
              <div className='flex items-center gap-4 mb-6'>
                <div className='w-12 h-12'>
                  <Skeleton className='w-12 h-12 rounded-full' />
                </div>
                <div className='flex-1 space-y-2'>
                  <Skeleton className='h-4 w-48 rounded' />
                  <Skeleton className='h-3 w-32 rounded' />
                </div>
              </div>

              <div className='grid gap-4'>
                <Skeleton className='h-40 rounded-md' />
                <Skeleton className='h-40 rounded-md' />
              </div>
            </div>
          ) : (
            <div className='w-full'>{children}</div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
}

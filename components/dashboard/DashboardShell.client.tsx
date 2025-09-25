"use client";

import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import useAuth from "../../hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardSidebar from "./DashboardSidebar";

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
        <DashboardSidebar user={user} />
        <main className='flex-1 min-h-screen flex flex-col w-full p-6'>
          {/* Mobile sidebar trigger (visible on small screens). z-40 keeps it above overlays */}
          <div className='md:hidden mb-4 relative z-40'>
            <SidebarTrigger />
          </div>
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

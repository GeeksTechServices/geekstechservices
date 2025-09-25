"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, User as FirebaseUser } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebaseClient";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarGroup,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/components/ui/Logo";
import {
  LayoutDashboard,
  Settings,
  Home,
  LogOut,
  User as UserIcon,
  Briefcase,
  CreditCard,
  BarChart2,
  ChevronRight,
} from "lucide-react";

interface DashboardSidebarProps {
  user: FirebaseUser | null;
}

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();

  const handleSignOut = async () => {
    const auth = getFirebaseAuth();
    await signOut(auth);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <Sidebar>
      <SidebarHeader className='flex flex-col gap-5 px-3'>
        <div className='flex items-center pt-4'>
          <Link href='/' className='flex items-center'>
            <Logo compact={true} />
          </Link>
        </div>

        <div className='flex flex-col p-2 rounded-lg bg-sidebar-accent/20'>
          <div className='flex items-center gap-3 mb-2'>
            <Avatar className='h-9 w-9 border-2 border-primary/20'>
              <AvatarImage
                src={user?.photoURL || undefined}
                alt={user?.displayName || user?.email || "User"}
              />
              <AvatarFallback className='bg-primary/10 text-primary'>
                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <p className='font-medium text-sm truncate'>
                {user?.displayName || "User"}
              </p>
              <p className='text-xs text-muted-foreground truncate'>
                {user?.email || ""}
              </p>
            </div>
          </div>
          <Link
            href='/dashboard/profile'
            className='flex items-center justify-between gap-2 text-xs px-2 py-1 text-primary hover:underline'
          >
            <span>View Profile</span>
            <ChevronRight className='h-3 w-3' />
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className='px-3'>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/dashboard")}
                tooltip='Dashboard'
              >
                <Link href='/dashboard'>
                  <LayoutDashboard className='h-4 w-4' />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/dashboard/profile")}
                tooltip='Profile'
              >
                <Link href='/dashboard/profile'>
                  <UserIcon className='h-4 w-4' />
                  <span>Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/dashboard/projects")}
                tooltip='Projects'
              >
                <Link href='/dashboard/projects'>
                  <Briefcase className='h-4 w-4' />
                  <span>Projects</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/dashboard/billing")}
                tooltip='Billing'
              >
                <Link href='/dashboard/billing'>
                  <CreditCard className='h-4 w-4' />
                  <span>Billing</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/dashboard/usage")}
                tooltip='Usage'
              >
                <Link href='/dashboard/usage'>
                  <BarChart2 className='h-4 w-4' />
                  <span>Usage</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/dashboard/settings")}
                tooltip='Settings'
              >
                <Link href='/dashboard/settings'>
                  <Settings className='h-4 w-4' />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='px-3 py-2 mt-auto'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip='Home'
              variant='outline'
              className='mb-1'
            >
              <Link href='/'>
                <Home className='h-4 w-4' />
                <span>Back to Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleSignOut}
              tooltip='Sign Out'
              variant='outline'
              className='text-red-500 hover:text-red-600'
            >
              <LogOut className='h-4 w-4' />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

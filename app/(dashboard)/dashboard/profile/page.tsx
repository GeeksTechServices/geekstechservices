import React from "react";
import ProfileSettings from "@/components/dashboard/ProfileSettings.client";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline.client";
import AnimatedCounter from "@/components/dashboard/AnimatedCounter.client";
import FloatingCard from "@/components/dashboard/FloatingCard.client";
import GlowingButton from "@/components/dashboard/GlowingButton.client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import useAuth from "@/hooks/useAuth";

export const metadata = { title: "Profile" };

export default function ProfilePage() {
  return (
    <main className='p-6 space-y-8'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-semibold'>Profile</h1>
          <p className='text-muted-foreground'>
            Manage your account details and preferences.
          </p>
        </div>
        <GlowingButton glowColor='purple'>Export Data</GlowingButton>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
        <FloatingCard delay={0}>
          <Card>
            <CardContent className='p-4 text-center'>
              <div className='text-2xl font-bold text-blue-600'>
                <AnimatedCounter value={47} />
              </div>
              <p className='text-sm text-muted-foreground'>Days Active</p>
              <Badge variant='secondary' className='text-xs mt-1'>
                Member
              </Badge>
            </CardContent>
          </Card>
        </FloatingCard>

        <FloatingCard delay={200}>
          <Card>
            <CardContent className='p-4 text-center'>
              <div className='text-2xl font-bold text-green-600'>
                <AnimatedCounter value={8} />
              </div>
              <p className='text-sm text-muted-foreground'>Projects Created</p>
              <div className='text-xs text-green-600 mt-1'>+2 this month</div>
            </CardContent>
          </Card>
        </FloatingCard>

        <FloatingCard delay={400}>
          <Card>
            <CardContent className='p-4 text-center'>
              <div className='text-2xl font-bold text-purple-600'>
                <AnimatedCounter value={156} />
              </div>
              <p className='text-sm text-muted-foreground'>
                API Keys Generated
              </p>
              <div className='text-xs text-muted-foreground mt-1'>All time</div>
            </CardContent>
          </Card>
        </FloatingCard>

        <FloatingCard delay={600}>
          <Card>
            <CardContent className='p-4 text-center'>
              <div className='text-2xl font-bold text-orange-600'>
                99.
                <AnimatedCounter value={97} duration={1500} />%
              </div>
              <p className='text-sm text-muted-foreground'>Account Health</p>
              <Badge variant='default' className='text-xs mt-1'>
                Excellent
              </Badge>
            </CardContent>
          </Card>
        </FloatingCard>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2 p-6 rounded-lg bg-card'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-lg font-semibold'>Account Settings</h2>
            <Badge variant='outline'>Verified</Badge>
          </div>
          <ProfileSettings />
        </div>

        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Account Overview</CardTitle>
              <CardDescription>Your profile summary</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center gap-3'>
                <Avatar className='h-12 w-12'>
                  <AvatarImage src='' />
                  <AvatarFallback className='text-lg bg-primary text-primary-foreground'>
                    U
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className='font-medium'>User Account</div>
                  <div className='text-sm text-muted-foreground'>
                    Pro Member
                  </div>
                </div>
              </div>

              <div className='space-y-2 pt-2 border-t'>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Member Since</span>
                  <span>
                    {new Date(
                      Date.now() - 47 * 24 * 60 * 60 * 1000
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Last Login</span>
                  <span>Today</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Time Zone</span>
                  <span>UTC-8</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className='p-6 rounded-lg bg-card'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-lg font-semibold'>Recent Activity</h2>
              <Badge variant='secondary'>
                <AnimatedCounter value={7} /> events
              </Badge>
            </div>
            <ActivityTimeline />
          </div>
        </div>
      </div>
    </main>
  );
}

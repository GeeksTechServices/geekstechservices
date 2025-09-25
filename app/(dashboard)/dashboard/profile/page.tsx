"use client";

import React from "react";
import useAuth from "@/hooks/useAuth";
// Replaced old stub ProfileSettings with full-featured managers
import AccountProfileManager from "@/components/dashboard/AccountProfileManager.client";
import AccountSecurityManager from "@/components/dashboard/AccountSecurityManager.client";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline.client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Calendar,
  FileText,
  Shield,
  Clock,
  DownloadCloud,
  CheckCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function ProfilePage() {
  const { user } = useAuth();
  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const email = user?.email || "";
  const created = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";
  const lastSignIn = user?.metadata?.lastSignInTime
    ? new Date(user.metadata.lastSignInTime).toLocaleString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        month: "short",
        day: "numeric",
      })
    : "—";

  return (
    <main className='w-full max-w-full mx-auto px-4 md:px-8 py-6 space-y-8'>
      <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
        <div>
          <h1 className='text-2xl font-semibold tracking-tight'>Profile</h1>
          <p className='text-sm text-muted-foreground'>
            Manage your account details and preferences
          </p>
        </div>

        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm'>
            <Shield className='h-4 w-4 mr-1' />
            <span>Verify Account</span>
          </Button>
          <Button size='sm'>
            <DownloadCloud className='h-4 w-4 mr-1' />
            <span>Export Data</span>
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='space-y-6'>
          <Card className='overflow-hidden border shadow-sm'>
            <div className='h-24 bg-gradient-to-r from-indigo-500 to-purple-600' />
            <CardContent className='relative pt-0'>
              <div className='flex justify-center'>
                <Avatar className='h-20 w-20 border-4 border-background absolute -top-10'>
                  <AvatarImage src={user?.photoURL || undefined} />
                  <AvatarFallback className='text-xl bg-primary text-primary-foreground'>
                    {displayName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className='mt-12 text-center mb-4'>
                <h2 className='font-semibold text-lg'>{displayName}</h2>
                {email && (
                  <p className='text-sm text-muted-foreground'>{email}</p>
                )}
                <div className='flex justify-center gap-2 mt-2'>
                  <Badge variant='secondary'>Free Plan</Badge>
                  {user?.emailVerified && (
                    <Badge
                      variant='outline'
                      className='bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-900'
                    >
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
              <div className='border-t pt-4 space-y-2'>
                <div className='flex items-center justify-between text-sm'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-4 w-4 text-muted-foreground' />
                    <span className='text-muted-foreground'>Member since</span>
                  </div>
                  <span>{created}</span>
                </div>
                <div className='flex items-center justify-between text-sm'>
                  <div className='flex items-center gap-2'>
                    <Clock className='h-4 w-4 text-muted-foreground' />
                    <span className='text-muted-foreground'>Last login</span>
                  </div>
                  <span>{lastSignIn}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className='border-t px-6 py-3'>
              <Button variant='outline' size='sm' className='w-full'>
                Edit Profile
              </Button>
            </CardFooter>
          </Card>
          <Card className='border shadow-sm'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-base flex items-center gap-2'>
                <Shield className='h-4 w-4 text-indigo-500' />
                <span>Plan Usage</span>
              </CardTitle>
              <CardDescription>Your current plan usage</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <UsageRow label='API Calls' value='12.4K / 50K' pct={24.8} />
              <UsageRow label='Storage' value='1.2GB / 5GB' pct={24} />
              <UsageRow label='Projects' value='3 / 10' pct={30} />
              <Button
                variant='outline'
                size='sm'
                className='w-full text-xs mt-2'
              >
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className='lg:col-span-2 space-y-6'>
          <Tabs defaultValue='profile' className='w-full'>
            <TabsList className='w-full grid grid-cols-3 mb-4'>
              <TabsTrigger value='profile' className='text-sm'>
                Profile
              </TabsTrigger>
              <TabsTrigger value='security' className='text-sm'>
                Security
              </TabsTrigger>
              <TabsTrigger value='activity' className='text-sm'>
                Activity
              </TabsTrigger>
            </TabsList>

            <TabsContent value='profile' className='space-y-6'>
              <AccountProfileManager />

              <Card className='border shadow-sm'>
                <CardHeader className='pb-3'>
                  <CardTitle className='text-base flex items-center gap-2'>
                    <FileText className='h-4 w-4 text-primary' />
                    <span>Documents & IDs</span>
                  </CardTitle>
                  <CardDescription>
                    Your important documents and verification
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <div className='flex items-center justify-between p-2 bg-muted/40 rounded-md'>
                    <div className='flex items-center gap-2'>
                      <FileText className='h-5 w-5 text-blue-600' />
                      <div>
                        <p className='text-sm font-medium'>passport.pdf</p>
                        <p className='text-xs text-muted-foreground'>
                          Uploaded Aug 15, 2025
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Badge
                        variant='outline'
                        className='text-green-600 bg-green-50 border-green-200'
                      >
                        <CheckCircle className='h-3 w-3 mr-1' />
                        <span>Verified</span>
                      </Badge>
                    </div>
                  </div>

                  <div className='flex items-center justify-between p-2 bg-muted/40 rounded-md'>
                    <div className='flex items-center gap-2'>
                      <FileText className='h-5 w-5 text-blue-600' />
                      <div>
                        <p className='text-sm font-medium'>
                          drivers_license.jpg
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          Uploaded Sep 2, 2025
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Badge
                        variant='outline'
                        className='text-amber-600 bg-amber-50 border-amber-200'
                      >
                        <Clock className='h-3 w-3 mr-1' />
                        <span>Pending</span>
                      </Badge>
                    </div>
                  </div>

                  <Button variant='outline' size='sm' className='mt-2'>
                    <span>Upload New Document</span>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='security' className='space-y-6'>
              <AccountSecurityManager />
            </TabsContent>

            <TabsContent value='activity' className='space-y-4'>
              <Card className='border shadow-sm'>
                <CardHeader className='pb-3'>
                  <CardTitle className='text-base flex items-center gap-2'>
                    <Clock className='h-4 w-4 text-primary' />
                    <span>Recent Activity</span>
                  </CardTitle>
                  <CardDescription>
                    Your account activity history
                  </CardDescription>
                </CardHeader>
                <CardContent className='p-0 max-h-[600px] overflow-y-auto'>
                  <ActivityTimeline />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className='border shadow-sm'>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <div>
                  <CardTitle className='text-base flex items-center gap-2'>
                    <CheckCircle className='h-4 w-4 text-green-500' />
                    <span>Profile Completion</span>
                  </CardTitle>
                  <CardDescription>
                    Complete your profile to unlock all features
                  </CardDescription>
                </div>
                <Badge>85% Complete</Badge>
              </div>
            </CardHeader>
            <CardContent className='space-y-3'>
              <Progress value={85} className='h-2' />

              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-sm'>
                  <CheckCircle className='h-4 w-4 text-green-500' />
                  <span>Email verified</span>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                  <CheckCircle className='h-4 w-4 text-green-500' />
                  <span>Profile information completed</span>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                  <CheckCircle className='h-4 w-4 text-green-500' />
                  <span>Password security updated</span>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                  <div className='h-4 w-4 rounded-full border-2 border-muted-foreground'></div>
                  <span className='text-muted-foreground'>
                    Two-factor authentication
                  </span>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                  <div className='h-4 w-4 rounded-full border-2 border-muted-foreground'></div>
                  <span className='text-muted-foreground'>
                    Connect social accounts
                  </span>
                </div>
              </div>

              <Button size='sm'>Complete Profile</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

function UsageRow({
  label,
  value,
  pct,
}: {
  label: string;
  value: string;
  pct: number;
}) {
  return (
    <div className='space-y-1'>
      <div className='flex items-center justify-between text-sm'>
        <span className='text-muted-foreground'>{label}</span>
        <span className='font-medium'>{value}</span>
      </div>
      <Progress value={pct} className='h-2' />
    </div>
  );
}

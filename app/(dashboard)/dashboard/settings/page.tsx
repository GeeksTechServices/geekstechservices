"use client";

import React from "react";
// Refactored: removed SettingsManager (firebase profile logic moved to profile page)
import AppearanceSettings from "@/components/dashboard/AppearanceSettings.client";
import ApiKeysManager from "@/components/dashboard/ApiKeysManager.client";
import {
  Settings,
  Save,
  Bell,
  Palette,
  Key,
  UserCog,
  Shield,
  Globe,
  Smartphone,
  Database,
  Clock,
  LogOut,
  Users,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <main className='container max-w-6xl mx-auto p-4 md:p-6 space-y-6'>
      <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
        <div>
          <h1 className='text-2xl font-semibold tracking-tight flex items-center gap-2'>
            <Settings className='h-5 w-5 text-muted-foreground' />
            <span>Settings</span>
          </h1>
          <p className='text-sm text-muted-foreground'>
            Manage your account, preferences, security and API access
          </p>
        </div>

        <div className='flex items-center gap-2'>
          <Button size='sm' className='h-9'>
            <Save className='h-4 w-4 mr-1' />
            <span>Save Changes</span>
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        <div className='lg:col-span-1 space-y-4'>
          <div className='sticky top-6'>
            <Card>
              <CardHeader className='py-3'>
                <CardTitle className='text-base'>Settings</CardTitle>
                <CardDescription>Configure your account</CardDescription>
              </CardHeader>
              <CardContent className='p-0'>
                <nav className='grid text-sm'>
                  <Button
                    variant='ghost'
                    className='justify-start px-4 py-2 h-10 font-normal'
                  >
                    <UserCog className='h-4 w-4 mr-2 text-primary' />
                    <span>Account</span>
                    <ChevronRight className='h-4 w-4 ml-auto opacity-50' />
                  </Button>
                  <Button
                    variant='ghost'
                    className='justify-start px-4 py-2 h-10 font-normal'
                  >
                    <Bell className='h-4 w-4 mr-2 text-amber-500' />
                    <span>Notifications</span>
                    <Badge variant='outline' className='ml-auto'>
                      3
                    </Badge>
                  </Button>
                  <Button
                    variant='ghost'
                    className='justify-start px-4 py-2 h-10 font-normal'
                  >
                    <Palette className='h-4 w-4 mr-2 text-purple-500' />
                    <span>Appearance</span>
                    <ChevronRight className='h-4 w-4 ml-auto opacity-50' />
                  </Button>
                  <Button
                    variant='ghost'
                    className='justify-start px-4 py-2 h-10 font-normal'
                  >
                    <Shield className='h-4 w-4 mr-2 text-red-500' />
                    <span>Security</span>
                    <ChevronRight className='h-4 w-4 ml-auto opacity-50' />
                  </Button>
                  <Button
                    variant='ghost'
                    className='justify-start px-4 py-2 h-10 font-normal'
                  >
                    <Key className='h-4 w-4 mr-2 text-green-500' />
                    <span>API Keys</span>
                    <ChevronRight className='h-4 w-4 ml-auto opacity-50' />
                  </Button>
                  <Button
                    variant='ghost'
                    className='justify-start px-4 py-2 h-10 font-normal'
                  >
                    <Users className='h-4 w-4 mr-2 text-blue-500' />
                    <span>Team</span>
                    <Badge variant='secondary' className='ml-auto'>
                      Pro
                    </Badge>
                  </Button>
                  <Button
                    variant='ghost'
                    className='justify-start px-4 py-2 h-10 font-normal'
                  >
                    <Database className='h-4 w-4 mr-2 text-orange-500' />
                    <span>Usage & Billing</span>
                    <ChevronRight className='h-4 w-4 ml-auto opacity-50' />
                  </Button>
                  <Button
                    variant='ghost'
                    className='justify-start px-4 py-2 h-10 font-normal'
                  >
                    <Globe className='h-4 w-4 mr-2 text-cyan-500' />
                    <span>Language & Region</span>
                    <ChevronRight className='h-4 w-4 ml-auto opacity-50' />
                  </Button>
                </nav>
              </CardContent>
              <CardFooter className='border-t py-3'>
                <Button
                  variant='ghost'
                  className='w-full justify-start text-sm h-9 px-2 font-normal text-red-600 hover:text-red-700 hover:bg-red-50'
                >
                  <LogOut className='h-4 w-4 mr-2' />
                  <span>Log Out</span>
                </Button>
              </CardFooter>
            </Card>

            <Card className='mt-4'>
              <CardHeader className='py-3'>
                <CardTitle className='text-base flex items-center gap-2'>
                  <Clock className='h-4 w-4 text-muted-foreground' />
                  <span>Recent Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className='p-0'>
                <div className='text-sm space-y-1 text-muted-foreground'>
                  <div className='px-4 py-1.5 hover:bg-muted/50 cursor-pointer'>
                    <p className='text-foreground'>Password changed</p>
                    <p className='text-xs'>3 days ago</p>
                  </div>
                  <div className='px-4 py-1.5 hover:bg-muted/50 cursor-pointer'>
                    <p className='text-foreground'>New device login</p>
                    <p className='text-xs'>1 week ago</p>
                  </div>
                  <div className='px-4 py-1.5 hover:bg-muted/50 cursor-pointer'>
                    <p className='text-foreground'>
                      Email notification preference
                    </p>
                    <p className='text-xs'>2 weeks ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className='lg:col-span-3'>
          <Tabs defaultValue='notifications' className='w-full'>
            <TabsList className='grid grid-cols-3 w-full mb-6'>
              <TabsTrigger value='notifications'>Notifications</TabsTrigger>
              <TabsTrigger value='appearance'>Appearance</TabsTrigger>
              <TabsTrigger value='api'>API Keys</TabsTrigger>
            </TabsList>

            <TabsContent value='notifications' className='space-y-6'>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Bell className='h-5 w-5 text-primary' />
                    <span>Email Notifications</span>
                  </CardTitle>
                  <CardDescription>
                    Configure email notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='text-sm space-y-5'>
                    <div>
                      <div className='mb-1 flex items-center justify-between'>
                        <label htmlFor='all-emails' className='font-medium'>
                          Security Alerts
                        </label>
                        <Button variant='outline' size='sm' className='h-8'>
                          Manage
                        </Button>
                      </div>
                      <p className='text-muted-foreground mb-2'>
                        Get emails about login attempts, security updates, and
                        system status
                      </p>
                      <Separator />
                    </div>

                    <div>
                      <div className='mb-1 flex items-center justify-between'>
                        <label htmlFor='all-emails' className='font-medium'>
                          Account Updates
                        </label>
                        <Button variant='outline' size='sm' className='h-8'>
                          Manage
                        </Button>
                      </div>
                      <p className='text-muted-foreground mb-2'>
                        Get emails about your account activity, billing, and
                        subscription
                      </p>
                      <Separator />
                    </div>

                    <div>
                      <div className='mb-1 flex items-center justify-between'>
                        <label htmlFor='all-emails' className='font-medium'>
                          Marketing & Promotions
                        </label>
                        <Button variant='outline' size='sm' className='h-8'>
                          Manage
                        </Button>
                      </div>
                      <p className='text-muted-foreground mb-2'>
                        Receive updates about new features, special offers, and
                        company news
                      </p>
                      <Separator />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size='sm'>Save Notification Settings</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Smartphone className='h-5 w-5 text-primary' />
                    <span>Push Notifications</span>
                  </CardTitle>
                  <CardDescription>
                    Configure browser and mobile notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='text-sm space-y-5'>
                    <div>
                      <div className='mb-1 flex items-center justify-between'>
                        <label htmlFor='browser-notifs' className='font-medium'>
                          Browser Notifications
                        </label>
                        <Button variant='outline' size='sm' className='h-8'>
                          Enable
                        </Button>
                      </div>
                      <p className='text-muted-foreground mb-2'>
                        Allow browser notifications for important alerts and
                        updates
                      </p>
                      <Separator />
                    </div>

                    <div>
                      <div className='mb-1 flex items-center justify-between'>
                        <label htmlFor='mobile-notifs' className='font-medium'>
                          Mobile App Notifications
                        </label>
                        <Button variant='outline' size='sm' className='h-8'>
                          Configure
                        </Button>
                      </div>
                      <p className='text-muted-foreground mb-2'>
                        Manage notifications in the mobile app
                      </p>
                      <Separator />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='appearance' className='space-y-6'>
              <AppearanceSettings />
            </TabsContent>

            <TabsContent value='api' className='space-y-6'>
              <ApiKeysManager />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}

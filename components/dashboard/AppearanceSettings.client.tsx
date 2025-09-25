"use client";
import React from "react";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AppearanceSettings() {
  const [darkMode, setDarkMode] = React.useState(true);
  const [compactMode, setCompactMode] = React.useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-base'>Interface</CardTitle>
        <CardDescription>Customize your dashboard UI</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm font-medium'>Dark Mode</p>
            <p className='text-xs text-muted-foreground'>Toggle dark theme</p>
          </div>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm font-medium'>Compact Mode</p>
            <p className='text-xs text-muted-foreground'>
              Reduce spacing & density
            </p>
          </div>
          <Switch checked={compactMode} onCheckedChange={setCompactMode} />
        </div>
      </CardContent>
    </Card>
  );
}

import React from "react";
import SettingsManager from "@/components/dashboard/SettingsManager.client";

export const metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <main className='space-y-6'>
      <div className='p-6 pb-0'>
        <h1 className='text-3xl font-semibold'>Settings</h1>
        <p className='text-muted-foreground'>
          Manage your account, preferences, security and API access.
        </p>
      </div>
      <SettingsManager />
    </main>
  );
}

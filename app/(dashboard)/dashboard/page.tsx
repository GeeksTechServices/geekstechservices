import React from "react";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <main className='min-h-screen p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold mb-4'>Dashboard</h1>
        <p className='text-muted-foreground'>
          Welcome to your dashboard. This is a placeholder — add widgets, recent
          activity, or account settings here.
        </p>
      </div>
    </main>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ConfirmAccountPage() {
  return (
    <main className='min-h-screen flex items-center justify-center bg-black/95 text-white'>
      <div className='w-full max-w-md p-8 bg-white/5 rounded-lg text-center'>
        <h1 className='text-2xl font-bold mb-4'>Confirm your account</h1>
        <p className='text-sm text-gray-400 mb-6'>
          Follow the confirmation link we sent to your email. If you didn&apos;t
          receive an email, you can resend it.
        </p>
        <div className='space-x-2'>
          <Button>Resend confirmation</Button>
          <Link href='/auth/signin' className='ml-2 text-[var(--accent)]'>
            Back to sign in
          </Link>
        </div>
      </div>
    </main>
  );
}

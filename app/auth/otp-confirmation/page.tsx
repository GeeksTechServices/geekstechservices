"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function OtpConfirmationPage() {
  return (
    <main className='min-h-screen flex items-center justify-center bg-black/95 text-white'>
      <div className='w-full max-w-md p-8 bg-white/5 rounded-lg text-center'>
        <h1 className='text-2xl font-bold mb-4'>Enter verification code</h1>
        <p className='text-sm text-gray-400 mb-6'>
          We sent you a one-time code. Enter it below to continue.
        </p>
        <form className='space-y-3'>
          <Input name='otp' placeholder='123456' />
          <Button type='submit'>Verify</Button>
        </form>
      </div>
    </main>
  );
}

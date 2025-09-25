"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthShell from "@/components/auth/AuthShell";

export default function OtpConfirmationPage() {
  return (
    <AuthShell
      title='Enter verification code'
      subtitle='We sent you a one‑time code. Enter it to continue.'
      narrow
    >
      <form className='space-y-4 text-center'>
        <Input
          name='otp'
          placeholder='123456'
          inputMode='numeric'
          pattern='[0-9]*'
        />
        <Button type='submit' className='w-full'>
          Verify
        </Button>
      </form>
    </AuthShell>
  );
}

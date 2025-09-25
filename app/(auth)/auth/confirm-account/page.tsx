"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AuthShell from "@/components/auth/AuthShell";
import { getFirebaseAuth } from "@/lib/firebaseClient";
import { sendEmailVerification } from "firebase/auth";
import { buildEmailVerificationSettings } from "@/lib/firebaseActions";

export default function ConfirmAccountPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const auth = getFirebaseAuth();

  const resend = async () => {
    if (!auth.currentUser) {
      setError("You must be signed in to resend.");
      return;
    }
    setLoading(true);
    setError(null);
    setStatus(null);
    try {
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      await sendEmailVerification(
        auth.currentUser,
        buildEmailVerificationSettings(origin)
      );
      setStatus("Verification email sent. Check your inbox (and spam).");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to resend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title='Confirm your account'
      subtitle='We emailed you a verification link. Once verified you can access all dashboards.'
      narrow
      footer={
        <Link href='/auth/signin' className='text-[var(--accent)]'>
          Back to sign in
        </Link>
      }
    >
      <div className='space-y-4 text-center'>
        {status && (
          <div className='rounded-md border border-emerald-500/30 bg-emerald-500/10 p-2 text-xs text-emerald-300'>
            {status}
          </div>
        )}
        {error && (
          <div className='rounded-md border border-red-500/30 bg-red-500/10 p-2 text-xs text-red-300'>
            {error}
          </div>
        )}
        <Button
          onClick={resend}
          disabled={loading}
          className='w-full'
          isLoading={loading}
        >
          Resend verification email
        </Button>
      </div>
    </AuthShell>
  );
}

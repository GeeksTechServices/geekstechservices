"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import { buildPasswordResetSettings } from "@/lib/firebaseActions";
import { getFirebaseAuth } from "@/lib/firebaseClient";
import { sendPasswordResetEmail } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const auth = getFirebaseAuth();
  const { toast } = useToast();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      // Debug: surface the origin used to build the action link so we can confirm
      // whether Firebase receives the intended domain.
      console.debug("Password reset origin:", origin);
      toast({
        title: "Sending reset link",
        description: `Using origin: ${origin}`,
      });
      await sendPasswordResetEmail(
        auth,
        email,
        buildPasswordResetSettings(origin)
      );
      setMessage(
        "If an account exists for this email, a reset link has been sent."
      );
    } catch (e: unknown) {
      function getMessage(err: unknown) {
        if (typeof err === "string") return err;
        if (typeof err === "object" && err !== null && "message" in err) {
          return (err as { message: string }).message;
        }
        return null;
      }
      const msg = getMessage(e);
      setError(msg || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title='Reset password'
      subtitle='Enter your account email and we’ll send a secure link to choose a new password.'
      narrow
      footer={
        <Link href='/auth/signin' className='text-[var(--accent)]'>
          Back to sign in
        </Link>
      }
    >
      <form className='space-y-4' onSubmit={handleReset}>
        <Input
          name='email'
          type='email'
          placeholder='you@company.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {message && (
          <div className='rounded-md border border-emerald-500/30 bg-emerald-500/10 p-2 text-xs text-emerald-300'>
            {message}
          </div>
        )}
        {error && (
          <div className='rounded-md border border-red-500/30 bg-red-500/10 p-2 text-xs text-red-300'>
            {error}
          </div>
        )}
        <Button
          type='submit'
          disabled={loading}
          className='w-full'
          isLoading={loading}
        >
          Send reset link
        </Button>
      </form>
    </AuthShell>
  );
}

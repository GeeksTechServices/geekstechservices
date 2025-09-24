"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getFirebaseAuth } from "@/lib/firebaseClient";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const auth = getFirebaseAuth();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
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
    <main className='min-h-screen flex items-center justify-center bg-black/95 text-white'>
      <div className='w-full max-w-md p-8 bg-white/5 rounded-lg'>
        <h1 className='text-2xl font-bold mb-4'>Reset password</h1>
        <p className='text-sm text-gray-400 mb-4'>
          Enter your email and we&apos;ll send a link to reset your password.
        </p>
        <form className='space-y-3' onSubmit={handleReset}>
          <Input
            name='email'
            type='email'
            placeholder='you@company.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {message && <div className='text-sm text-green-400'>{message}</div>}
          {error && <div className='text-sm text-red-400'>{error}</div>}
          <Button type='submit' disabled={loading}>
            Send reset link
          </Button>
        </form>
        <p className='text-sm text-gray-400 mt-4'>
          <Link href='/auth/signin' className='text-[var(--accent)]'>
            Back to sign in
          </Link>
        </p>
      </div>
    </main>
  );
}

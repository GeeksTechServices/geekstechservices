"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getFirebaseAuth } from "@/lib/firebaseClient";
import { sendSignInLinkToEmail } from "firebase/auth";

export default function MagicLinkPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const auth = getFirebaseAuth();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const actionCodeSettings = {
        url: window.location.origin + "/auth/magic-link/complete",
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      // Save email for completion step
      window.localStorage.setItem("magic_email", email);
      setMessage(
        "Magic link sent. Check your email and follow the link to sign in."
      );
    } catch (e: unknown) {
      let msg = "Failed to send magic link";
      if (typeof e === "string") msg = e;
      else if (typeof e === "object" && e !== null && "message" in e) {
        const possibleMessage = (e as { message?: unknown }).message;
        if (typeof possibleMessage === "string") msg = possibleMessage;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='min-h-screen flex items-center justify-center bg-black/95 text-white'>
      <div className='w-full max-w-md p-8 bg-white/5 rounded-lg text-center'>
        <h1 className='text-2xl font-bold mb-4'>Sign in with Magic Link</h1>
        <p className='text-sm text-gray-400 mb-6'>
          Enter your email and we&apos;ll send a link to sign you in.
        </p>
        <form className='space-y-3' onSubmit={handleSend}>
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
            Send magic link
          </Button>
        </form>
      </div>
    </main>
  );
}

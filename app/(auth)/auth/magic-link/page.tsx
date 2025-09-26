"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getFirebaseAuth } from "@/lib/firebaseClient";
import { sendSignInLinkToEmail } from "firebase/auth";
import AuthShell from "@/components/auth/AuthShell";

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
        url: window.location.origin + "/auth/action",
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
    <AuthShell
      title='Magic link sign-in'
      subtitle='Passwordless entry. We’ll send a one-time link to your inbox.'
      narrow
    >
      <form className='space-y-4 text-center' onSubmit={handleSend}>
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
          Send magic link
        </Button>
      </form>
    </AuthShell>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AuthShell from "@/components/auth/AuthShell";
import { getFirebaseAuth } from "@/lib/firebaseClient";
import { sendEmailVerification } from "firebase/auth";
import { buildEmailVerificationSettings } from "@/lib/firebaseActions";
import { useToast } from "@/hooks/use-toast";

export default function ConfirmAccountPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const { toast } = useToast();
  const auth = getFirebaseAuth();

  const resend = async () => {
    if (!auth.currentUser) {
      // If user is not signed in, show the inline email fallback UI
      setError(null);
      toast({
        title: "Not signed in",
        description:
          "You are not signed in. Enter your email below to request a verification link (client-only fallback).",
      });
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
        {auth.currentUser ? (
          <Button
            onClick={resend}
            disabled={loading}
            className='w-full'
            isLoading={loading}
          >
            Resend verification email
          </Button>
        ) : (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              setError(null);
              setStatus(null);
              try {
                // Try to call a serverless helper at /api/send-verification (if present)
                const resp = await fetch("/api/send-verification", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email: emailInput }),
                });

                if (resp.ok) {
                  toast({
                    title: "Verification sent",
                    description:
                      "If the account exists, a verification email will be delivered.",
                  });
                  setStatus("Verification email requested. Check inbox.");
                } else if (resp.status === 404) {
                  // API not deployed — fall back to helpful instructions
                  await navigator.clipboard?.writeText(
                    `Please sign in to your account at ${window.location.origin} and resend verification from your account settings or use the in-app resend button.`
                  );
                  toast({
                    title: "No server endpoint",
                    description:
                      "Server helper not found. Instructions copied to clipboard — sign in and resend verification from your account.",
                  });
                  setStatus(
                    "Serverless helper not available — instructions copied to clipboard."
                  );
                } else {
                  const text = await resp.text();
                  throw new Error(text || "Failed to request verification");
                }
              } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                toast({ title: "Request failed", description: msg });
                setError(msg);
              } finally {
                setLoading(false);
              }
            }}
            className='space-y-3'
          >
            <input
              type='email'
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder='you@company.com'
              className='w-full rounded-md border bg-transparent px-3 py-2 text-sm'
              required
            />
            <div className='flex gap-2'>
              <Button type='submit' className='flex-1' isLoading={loading}>
                Request verification
              </Button>
              <Button
                variant='outline'
                onClick={() => {
                  // copy quick instructions
                  navigator.clipboard?.writeText(
                    `Please sign in to ${window.location.origin} and click resend verification from your account.`
                  );
                  toast({
                    title: "Copied",
                    description: "Sign-in instructions copied to clipboard.",
                  });
                }}
              >
                Copy instructions
              </Button>
            </div>
          </form>
        )}
      </div>
    </AuthShell>
  );
}

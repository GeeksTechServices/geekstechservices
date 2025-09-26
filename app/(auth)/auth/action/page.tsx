"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getFirebaseAuth } from "@/lib/firebaseClient";
import {
  applyActionCode,
  checkActionCode,
  verifyPasswordResetCode,
  confirmPasswordReset,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

type Mode = "verifyEmail" | "resetPassword" | "signIn" | string | null;

function ActionPageInner(): React.ReactElement {
  const params = useSearchParams();
  const router = useRouter();
  const auth = getFirebaseAuth();

  const mode: Mode = params.get("mode");
  const oobCode = params.get("oobCode");
  const continueUrl = params.get("continueUrl");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<
    "idle" | "working" | "ready" | "success" | "error" | "submitting"
  >("idle");
  const [message, setMessage] = useState<string>("");

  // Handle verifyEmail automatically
  useEffect(() => {
    if (mode !== "verifyEmail" || !oobCode) return;
    (async () => {
      setStatus("working");
      try {
        await checkActionCode(auth, oobCode);
        await applyActionCode(auth, oobCode);
        setStatus("success");
        setMessage("Email verified successfully. You may proceed.");
      } catch (e: unknown) {
        setStatus("error");
        setMessage(e instanceof Error ? e.message : "Verification failed");
      }
    })();
  }, [auth, mode, oobCode]);

  // Prepare resetPassword (fetch email)
  useEffect(() => {
    if (mode !== "resetPassword" || !oobCode) return;
    (async () => {
      setStatus("working");
      try {
        const em = await verifyPasswordResetCode(auth, oobCode);
        setEmail(em);
        setStatus("ready");
      } catch (e: unknown) {
        setStatus("error");
        setMessage(
          e instanceof Error ? e.message : "Invalid or expired reset link"
        );
      }
    })();
  }, [auth, mode, oobCode]);

  // Prepare signIn via email link
  useEffect(() => {
    if (mode !== "signIn") return;
    // When user clicked magic link in email
    const href = typeof window !== "undefined" ? window.location.href : "";
    if (!href || !isSignInWithEmailLink(auth, href)) return;
    // Get stored email or ask for it via input
    const stored =
      typeof window !== "undefined"
        ? window.localStorage.getItem("magic_email")
        : null;
    if (stored) setEmail(stored);
    setStatus("ready");
  }, [auth, mode]);

  const submitReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oobCode) return;
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }
    setStatus("submitting");
    setMessage("");
    try {
      await confirmPasswordReset(auth, oobCode, password);
      setStatus("success");
      setMessage("Password reset successfully. You can now sign in.");
    } catch (e: unknown) {
      setStatus("error");
      setMessage(e instanceof Error ? e.message : "Failed to reset password");
    }
  };

  const completeSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const href = typeof window !== "undefined" ? window.location.href : "";
    if (!href) return;
    setStatus("submitting");
    setMessage("");
    try {
      await signInWithEmailLink(auth, email, href);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("magic_email");
      }
      setStatus("success");
      setMessage("Signed in successfully.");
      // Continue if provided
      if (continueUrl) router.push(continueUrl);
      else router.push("/dashboard");
    } catch (e: unknown) {
      setStatus("error");
      setMessage(e instanceof Error ? e.message : "Failed to sign in");
    }
  };

  let title = "Authentication";
  let subtitle = "Complete the requested action";
  if (mode === "verifyEmail") {
    title = "Verify email";
    subtitle = "Completing your verification ensures secure access.";
  } else if (mode === "resetPassword") {
    title = "Choose a new password";
    subtitle = "Secure your account with a strong credential.";
  } else if (mode === "signIn") {
    title = "Complete sign-in";
    subtitle = "Enter your email to finish the magic link sign-in.";
  }

  return (
    <AuthShell
      title={title}
      subtitle={subtitle}
      narrow
      footer={
        <Button variant='outline' onClick={() => router.push("/auth/signin")}>
          Back to sign in
        </Button>
      }
    >
      <div className='space-y-4'>
        {/* Status messages */}
        {message && (
          <div
            className={`rounded-md border p-2 text-xs ${
              status === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                : status === "error"
                ? "border-red-500/30 bg-red-500/10 text-red-300"
                : "border-white/10 bg-white/5 text-gray-300"
            }`}
          >
            {message}
          </div>
        )}

        {/* Verify email flow */}
        {mode === "verifyEmail" && (
          <div className='text-sm text-gray-300'>
            {status === "idle" && "Waiting for verification code…"}
            {status === "working" && "Verifying…"}
            {status === "success" && "Verification complete."}
            {status === "error" && "Verification failed."}
          </div>
        )}

        {/* Reset password flow */}
        {mode === "resetPassword" && (
          <>
            {status === "idle" && (
              <p className='text-sm text-gray-400'>Missing reset code.</p>
            )}
            {(status === "ready" ||
              status === "submitting" ||
              status === "success" ||
              status === "error") && (
              <form className='space-y-4' onSubmit={submitReset}>
                <Input disabled value={email} aria-label='Account email' />
                <Input
                  type='password'
                  placeholder='New password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete='new-password'
                />
                <Input
                  type='password'
                  placeholder='Confirm password'
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete='new-password'
                />
                <Button
                  type='submit'
                  disabled={status === "submitting" || status === "success"}
                  className='w-full'
                  isLoading={status === "submitting"}
                >
                  {status === "success" ? "Reset complete" : "Update password"}
                </Button>
              </form>
            )}
          </>
        )}

        {/* Magic link sign-in */}
        {mode === "signIn" && (
          <form className='space-y-4' onSubmit={completeSignIn}>
            <Input
              name='email'
              type='email'
              placeholder='you@company.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type='submit'
              disabled={status === "submitting"}
              className='w-full'
              isLoading={status === "submitting"}
            >
              Complete sign-in
            </Button>
          </form>
        )}

        {/* Unknown or missing mode */}
        {!mode && (
          <p className='text-sm text-gray-400'>Missing action parameters.</p>
        )}
      </div>
    </AuthShell>
  );
}

function Fallback(): React.ReactElement {
  return (
    <div className='flex min-h-[60vh] items-center justify-center'>
      <div className='text-sm text-muted-foreground animate-pulse'>
        Loading…
      </div>
    </div>
  );
}

export default function ActionPage(): React.ReactElement {
  return (
    <React.Suspense fallback={<Fallback />}>
      <ActionPageInner />
    </React.Suspense>
  );
}

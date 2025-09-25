"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getFirebaseAuth } from "@/lib/firebaseClient";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import AuthShell from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ConfirmResetPasswordInner() {
  const params = useSearchParams();
  const router = useRouter();
  const oobCode = params.get("oobCode");
  const mode = params.get("mode");
  const auth = getFirebaseAuth();
  const [status, setStatus] = useState<
    "idle" | "checking" | "ready" | "error" | "submitting" | "success"
  >("idle");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState(""),
    [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!oobCode || mode !== "resetPassword") return;
    (async () => {
      setStatus("checking");
      try {
        const em = await verifyPasswordResetCode(auth, oobCode);
        setEmail(em);
        setStatus("ready");
      } catch (e: unknown) {
        setStatus("error");
        setMessage(e instanceof Error ? e.message : "Invalid or expired link");
      }
    })();
  }, [auth, oobCode, mode]);

  const submit = async (e: React.FormEvent) => {
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

  return (
    <AuthShell
      title='Choose a new password'
      subtitle='Secure your account with a strong credential.'
      narrow
      footer={
        <Button variant='outline' onClick={() => router.push("/auth/signin")}>
          Back to sign in
        </Button>
      }
    >
      <div className='space-y-4'>
        {status === "idle" && (
          <p className='text-sm text-gray-400'>Missing reset code.</p>
        )}
        {status === "checking" && (
          <p className='text-sm text-gray-300 animate-pulse'>
            Validating link…
          </p>
        )}
        {status === "error" && (
          <div className='rounded-md border border-red-500/30 bg-red-500/10 p-2 text-xs text-red-300'>
            {message}
          </div>
        )}
        {(status === "ready" ||
          status === "submitting" ||
          status === "success" ||
          status === "error") && (
          <form className='space-y-4' onSubmit={submit}>
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
      </div>
    </AuthShell>
  );
}

function ConfirmResetFallback(): React.ReactElement {
  return (
    <div className='flex min-h-[60vh] items-center justify-center'>
      <div className='text-sm text-muted-foreground animate-pulse'>
        Loading…
      </div>
    </div>
  );
}

export default function ConfirmResetPasswordPage(): React.ReactElement {
  return (
    <React.Suspense fallback={<ConfirmResetFallback />}>
      <ConfirmResetPasswordInner />
    </React.Suspense>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getFirebaseAuth } from "@/lib/firebaseClient";
import { applyActionCode, checkActionCode } from "firebase/auth";
import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";

function VerifyEmailInner() {
  const params = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<
    "idle" | "verifying" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string>("");
  const oobCode = params.get("oobCode");
  const mode = params.get("mode");
  const auth = getFirebaseAuth();

  useEffect(() => {
    if (!oobCode || mode !== "verifyEmail") return;
    (async () => {
      setStatus("verifying");
      try {
        // optional preflight check
        await checkActionCode(auth, oobCode);
        await applyActionCode(auth, oobCode);
        setStatus("success");
        setMessage("Email verified successfully. You may proceed.");
      } catch (e: unknown) {
        setStatus("error");
        setMessage(e instanceof Error ? e.message : "Verification failed");
      }
    })();
  }, [auth, oobCode, mode]);

  return (
    <AuthShell
      title='Verify email'
      subtitle='Completing your verification ensures secure access to protected dashboards.'
      narrow
      footer={
        <Button variant='outline' onClick={() => router.push("/auth/signin")}>
          Continue to sign in
        </Button>
      }
    >
      <div className='space-y-4 text-center'>
        {status === "idle" && (
          <p className='text-sm text-gray-400'>Missing verification code.</p>
        )}
        {status === "verifying" && (
          <p className='text-sm text-gray-300 animate-pulse'>Verifying…</p>
        )}
        {status === "success" && (
          <div className='rounded-md border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300'>
            {message}
          </div>
        )}
        {status === "error" && (
          <div className='rounded-md border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300'>
            {message}
          </div>
        )}
      </div>
    </AuthShell>
  );
}

function VerifyEmailFallback(): React.ReactElement {
  return (
    <div className='flex min-h-[60vh] items-center justify-center'>
      <div className='text-sm text-muted-foreground animate-pulse'>
        Verifying…
      </div>
    </div>
  );
}

export default function VerifyEmailPage(): React.ReactElement {
  return (
    <React.Suspense fallback={<VerifyEmailFallback />}>
      <VerifyEmailInner />
    </React.Suspense>
  );
}

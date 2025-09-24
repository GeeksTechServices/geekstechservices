"use client";

import { useEffect, useState } from "react";
import { getFirebaseAuth } from "../../../../lib/firebaseClient";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

export default function MagicLinkComplete() {
  const [status, setStatus] = useState<"pending" | "success" | "error">(
    "pending"
  );
  const [message, setMessage] = useState<string>("Completing sign-in...");

  useEffect(() => {
    async function complete() {
      try {
        const auth = getFirebaseAuth();
        const url = window.location.href;
        if (!isSignInWithEmailLink(auth, url)) {
          setStatus("error");
          setMessage("This is not a valid sign-in link.");
          return;
        }

        const storedEmail = window.localStorage.getItem("magic_email");
        let email = storedEmail || "";
        if (!email) {
          // Ask user for their email if it's not in localStorage
          const promptVal = window.prompt(
            "Please provide your email for confirmation"
          );
          if (!promptVal) {
            setStatus("error");
            setMessage("Email is required to complete sign-in.");
            return;
          }
          email = promptVal;
        }

        await signInWithEmailLink(auth, email, url);
        setStatus("success");
        setMessage("Signed in successfully — redirecting...");
        // optionally cleanup
        window.localStorage.removeItem("magic_email");
        setTimeout(() => {
          window.location.href = "/";
        }, 1200);
      } catch (err) {
        let msg = "Failed to complete sign-in.";
        if (typeof err === "string") msg = err;
        else if (err && typeof err === "object" && "message" in err) {
          const m = (err as { message?: unknown }).message;
          if (typeof m === "string") msg = m;
        }
        setStatus("error");
        setMessage(msg);
      }
    }

    complete();
  }, []);

  return (
    <div className='min-h-[60vh] flex items-center justify-center'>
      <div className='p-6 rounded-lg bg-black/50 backdrop-blur border border-white/10'>
        <h3 className='text-lg font-semibold mb-2'>Magic link sign-in</h3>
        <p className='text-sm text-muted-foreground'>{message}</p>
        {status === "pending" && <div className='mt-4'>Working…</div>}
        {status === "error" && (
          <div className='mt-4'>
            <a href='/auth/magic-link' className='underline'>
              Resend magic link
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

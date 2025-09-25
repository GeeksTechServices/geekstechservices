"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import AuthShell from "@/components/auth/AuthShell";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import {
  getFirebaseAuth,
  googleProvider,
  githubProvider,
} from "@/lib/firebaseClient";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const auth = getFirebaseAuth();

  const { toast } = useToast();

  const signInWithProvider = async (
    provider: Parameters<typeof signInWithPopup>[1]
  ) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, provider);
      toast({ title: "Signed in", description: "Welcome back! Redirecting…" });
      router.push("/dashboard");
    } catch (err: unknown) {
      let msg = "Sign-in failed";
      if (typeof err === "string") msg = err;
      else if (typeof err === "object" && err !== null && "message" in err) {
        const possible = (err as { message?: unknown }).message;
        if (typeof possible === "string") msg = possible;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Signed in", description: "Welcome back! Redirecting…" });
      router.push("/dashboard");
    } catch (err: unknown) {
      let msg = "Sign-in failed";
      if (typeof err === "string") msg = err;
      else if (typeof err === "object" && err !== null && "message" in err) {
        const possible = (err as { message?: unknown }).message;
        if (typeof possible === "string") msg = possible;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title='Welcome back'
      subtitle='Sign in to access your IoT network health insights & predictive maintenance signals.'
      side={<div className='flex flex-1 flex-col' />}
      footer={
        <p>
          Don&apos;t have an account?{" "}
          <Link href='/auth/signup' className='text-[var(--accent)]'>
            Sign up
          </Link>
        </p>
      }
    >
      <div className='space-y-4'>
        <SocialAuthButtons
          onGoogle={() => signInWithProvider(googleProvider)}
          onGitHub={() => signInWithProvider(githubProvider)}
          disabled={loading}
        />
        <div className='relative py-1 text-center text-xs uppercase tracking-wide text-gray-400'>
          <span className='bg-[var(--bg-dark)] px-3'>or email</span>
          <span className='absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent' />
        </div>
        <form className='space-y-4' onSubmit={handleEmailSignIn}>
          <div className='space-y-2'>
            <Input
              name='email'
              type='email'
              placeholder='you@company.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <div className='rounded-md border border-red-500/30 bg-red-500/10 p-2 text-xs text-red-300'>
              {error}
            </div>
          )}
          <div className='flex items-center justify-between text-sm'>
            <Link href='/auth/reset-password' className='text-[var(--accent)]'>
              Forgot password?
            </Link>
            <Button
              type='submit'
              disabled={loading}
              className='min-w-28'
              isLoading={loading}
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </AuthShell>
  );
}

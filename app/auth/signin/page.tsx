"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
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
    <main className='min-h-screen flex items-center justify-center bg-black/95 text-white'>
      <div className='w-full max-w-md p-8 bg-white/5 rounded-lg'>
        <h1 className='text-2xl font-bold mb-4'>Sign in</h1>
        <div className='space-y-3 mb-4'>
          <Button
            variant='outline'
            size='default'
            className='w-full'
            onClick={() => signInWithProvider(googleProvider)}
            disabled={loading}
          >
            Sign in with Google
          </Button>
          <Button
            variant='outline'
            size='default'
            className='w-full'
            onClick={() => signInWithProvider(githubProvider)}
            disabled={loading}
          >
            Sign in with GitHub
          </Button>
        </div>

        <div className='text-center text-sm text-gray-400 mb-4'>
          Or sign in with your email
        </div>
        <form className='space-y-3' onSubmit={handleEmailSignIn}>
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
          {error && <div className='text-sm text-red-400'>{error}</div>}
          <div className='flex items-center justify-between'>
            <Link
              href='/auth/reset-password'
              className='text-sm text-[var(--accent)]'
            >
              Forgot password?
            </Link>
            <Button type='submit' disabled={loading}>
              Sign in
            </Button>
          </div>
        </form>

        <p className='text-sm text-gray-400 mt-4'>
          Don&apos;t have an account?{" "}
          <Link href='/auth/signup' className='text-[var(--accent)]'>
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}

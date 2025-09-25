"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import {
  getFirebaseAuth,
  googleProvider,
  githubProvider,
} from "@/lib/firebaseClient";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  AuthProvider,
  updateProfile,
} from "firebase/auth";
import { buildEmailVerificationSettings } from "@/lib/firebaseActions";
import { useToast } from "@/hooks/use-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = getFirebaseAuth();
  const { toast } = useToast();

  const handleOAuth = async (provider: AuthProvider) => {
    setLoading(true);
    try {
      const cred = await signInWithPopup(auth, provider);
      const who = cred.user.displayName || cred.user.email || "User";
      toast({
        title: "Signed in",
        description: `Welcome back, ${who}! Redirecting…`,
      });
      router.push("/dashboard");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "OAuth failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // update display name if provided
      if (name && name.trim().length > 0) {
        try {
          await updateProfile(userCred.user, { displayName: name.trim() });
        } catch (upErr) {
          // non-blocking: log or ignore profile update failures
          console.warn("Failed to set display name", upErr);
        }
      }
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      await sendEmailVerification(
        userCred.user,
        buildEmailVerificationSettings(origin)
      );
      toast({
        title: "Verify your email",
        description: `We've sent a verification link to ${email}. Please check your inbox to confirm your account.`,
      });
      router.push("/auth/confirm-account");
    } catch (e: unknown) {
      let msg = "Signup failed";
      if (typeof e === "string") msg = e;
      else if (typeof e === "object" && e !== null && "message" in e) {
        const possible = (e as { message?: unknown }).message;
        if (typeof possible === "string") msg = possible;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title='Create your account'
      subtitle='Get predictive reliability, anomaly insights & consolidated health scoring for your IoT fleet.'
      side={<div className='flex flex-1' />}
      footer={
        <p>
          Already have an account?{" "}
          <Link href='/auth/signin' className='text-[var(--accent)]'>
            Sign in
          </Link>
        </p>
      }
    >
      <div className='space-y-4'>
        <SocialAuthButtons
          onGoogle={() => handleOAuth(googleProvider)}
          onGitHub={() => handleOAuth(githubProvider)}
          disabled={loading}
        />
        <div className='relative py-1 text-center text-xs uppercase tracking-wide text-gray-400'>
          <span className='bg-[var(--bg-dark)] px-3'>or email</span>
          <span className='absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent' />
        </div>
        <form className='space-y-4' onSubmit={handleSignup}>
          <Input
            name='name'
            placeholder='Full name'
            autoComplete='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            name='email'
            type='email'
            autoComplete='email'
            placeholder='you@company.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            name='password'
            type='password'
            autoComplete='new-password'
            placeholder='Create a password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <div className='rounded-md border border-red-500/30 bg-red-500/10 p-2 text-xs text-red-300'>
              {error}
            </div>
          )}
          <Button
            type='submit'
            className='w-full'
            disabled={loading}
            isLoading={loading}
          >
            Sign up
          </Button>
        </form>
      </div>
    </AuthShell>
  );
}

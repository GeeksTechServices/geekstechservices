"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import Image from "next/image";
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
      await sendEmailVerification(userCred.user);
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
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-black/95 to-black text-white">
      <div className="w-full max-w-3xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:flex flex-col items-start justify-center p-8 bg-white/3 rounded-lg">
          <Logo />
          <h2 className="text-3xl font-extrabold mt-6">Create your account</h2>
          <p className="text-gray-300 mt-2">Start collaborating, create projects, and get access to support.</p>
          <div className="mt-6">
            <Image src="/globe.svg" alt="illustration" width={192} height={192} className="w-48 opacity-60" />
          </div>
        </div>

        <div className="p-8 bg-white/5 rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <Logo compact />
            <Link href="/auth/signin" className="text-sm text-[var(--accent)]">
              Sign in
            </Link>
          </div>

          <div className="space-y-3 mb-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleOAuth(googleProvider)}
              disabled={loading}
            >
              Continue with Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleOAuth(githubProvider)}
              disabled={loading}
            >
              Continue with GitHub
            </Button>
          </div>

          <form className="space-y-3" onSubmit={handleSignup}>
            <Input
              name="name"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              name="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              name="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <div className="text-sm text-red-400">{error}</div>}
            <Button type="submit" className="w-full" disabled={loading}>
              Sign up
            </Button>
          </form>

          <p className="text-sm text-gray-400 mt-4">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-[var(--accent)]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import pricingData from "@/lib/pricing.json";
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

// Inner component that uses useSearchParams. Must be inside <Suspense>.
function SignUpPageInner() {
  const router = useRouter();
  const params = useSearchParams();
  const trialParam = params?.get("trial");
  const trialDays = trialParam ? Number(trialParam) : undefined;
  const planParam = params?.get("plan") || undefined;
  const billingParam = params?.get("billing") || undefined;

  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(
    planParam ?? undefined
  );
  const [selectedBilling, setSelectedBilling] = useState<string | undefined>(
    billingParam ?? undefined
  );

  React.useEffect(() => {
    // if URL provides plan, prefer it; otherwise read persisted selection
    if (selectedPlan) return;
    try {
      if (typeof document !== "undefined") {
        const cookie = document.cookie
          .split(";")
          .map((c) => c.trim())
          .find((c) => c.startsWith("selected_plan="));
        if (cookie) {
          const raw = decodeURIComponent(cookie.replace("selected_plan=", ""));
          const parsed = JSON.parse(raw);
          setSelectedPlan(parsed.plan);
          setSelectedBilling(parsed.billing || "monthly");
          return;
        }
      }
      const ls =
        typeof window !== "undefined"
          ? localStorage.getItem("selected_plan")
          : null;
      if (ls) {
        const parsed = JSON.parse(ls);
        setSelectedPlan(parsed.plan);
        setSelectedBilling(parsed.billing || "monthly");
      }
    } catch (e) {
      // ignore parse errors
      console.warn("Failed to parse selected plan from storage", e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // compute selected plan details (from query or persisted selection)
  const effectiveTarget = planParam ?? selectedPlan;
  type Plan = {
    id: string;
    slug?: string;
    name: string;
    short_description?: string;
    price_monthly?: number | null;
    price_yearly?: number | null;
    included_devices?: number | null;
    trial_days?: number | null;
  };
  let selectedPlanData: Plan | undefined = undefined;
  let selectedPriceDisplay = "";
  const effectiveBilling =
    (billingParam ?? selectedBilling) === "yearly" ? "yearly" : "monthly";
  try {
    if (effectiveTarget) {
      const pricing = pricingData as unknown as {
        plans?: Plan[] | undefined;
        currency?: string | undefined;
      };
      const plans = Array.isArray(pricing.plans) ? pricing.plans : [];
      selectedPlanData = plans.find(
        (p: Plan) =>
          p.id === effectiveTarget ||
          p.slug === effectiveTarget ||
          p.name === effectiveTarget
      );
      if (selectedPlanData) {
        const formatCurrency = (v: number | null | undefined) => {
          if (v == null || typeof v !== "number") return "Contact sales";
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: pricing.currency || "USD",
            minimumFractionDigits: 0,
          }).format(v);
        };
        selectedPriceDisplay =
          effectiveBilling === "yearly"
            ? formatCurrency(selectedPlanData.price_yearly)
            : formatCurrency(selectedPlanData.price_monthly);
      }
    }
  } catch (e) {
    console.error("Failed to parse pricing data", e);
  }
  const [trialAccepted, setTrialAccepted] = useState(false);
  const [trialSaving, setTrialSaving] = useState(false);
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
        {(planParam || selectedPlan) && selectedPlanData && (
          <div className='rounded-lg border border-white/6 bg-white/[0.02] p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <div className='text-sm text-gray-300'>Selected plan</div>
                <div className='mt-1 flex items-baseline gap-3'>
                  <div className='text-lg font-bold'>
                    {selectedPlanData.name}
                  </div>
                  <div className='text-sm text-white/70'>
                    {selectedPlanData.short_description}
                  </div>
                </div>
              </div>
              <div className='text-right'>
                <div className='text-2xl font-extrabold'>
                  {selectedPriceDisplay}
                </div>
                <div className='text-sm text-white/60'>{effectiveBilling}</div>
              </div>
            </div>
            <div className='mt-3 text-sm text-white/70'>
              {selectedPlanData.included_devices !== null && (
                <div>{selectedPlanData.included_devices} devices included</div>
              )}
              {selectedPlanData.trial_days && (
                <div>Trial available: {selectedPlanData.trial_days} days</div>
              )}
            </div>
          </div>
        )}
        {trialDays && trialDays > 0 && (
          <div className='rounded-lg border border-white/6 bg-gradient-to-r from-[rgba(179,45,255,0.06)] via-white/3 to-[rgba(0,0,0,0.02)] p-4'>
            <div className='flex flex-col items-start justify-between gap-4'>
              <div>
                <div className='inline-flex items-center gap-2 rounded-full bg-[var(--accent)]/10 px-3 py-1 text-sm font-medium text-[var(--accent)]'>
                  {trialDays}-day free trial
                </div>
                <h3 className='mt-3 text-lg font-semibold'>
                  Start your {trialDays}-day trial! unlock advanced device
                  insights
                </h3>
                <p className='mt-1 text-sm text-gray-300'>
                  No credit card required. Explore predictive alerts, fleet
                  scoring, and prioritized remediation for {trialDays} days.
                </p>
              </div>
              <div className='flex flex-col sm:flex-row items-center gap-2'>
                {!trialAccepted ? (
                  <>
                    <Button
                      size='sm'
                      onClick={async () => {
                        setTrialSaving(true);
                        try {
                          // detect cookie consent
                          const hasConsent =
                            typeof document !== "undefined" &&
                            document.cookie
                              .split(";")
                              .some((c) =>
                                c.trim().startsWith("cookie_consent=")
                              );

                          const payload = {
                            days: trialDays || 0,
                            acceptedAt: Date.now(),
                          };

                          if (hasConsent) {
                            // set a cookie for trial acceptance
                            const expires = new Date(
                              Date.now() + 365 * 864e5
                            ).toUTCString();
                            document.cookie =
                              "trial_acceptance=" +
                              encodeURIComponent(JSON.stringify(payload)) +
                              "; expires=" +
                              expires +
                              "; path=/; Secure; SameSite=Lax";
                          } else {
                            try {
                              localStorage.setItem(
                                "trial_acceptance",
                                JSON.stringify(payload)
                              );
                            } catch (e) {
                              // fallback: set cookie anyway
                              console.error(
                                "Failed to save trial acceptance",
                                e
                              );
                              const expires = new Date(
                                Date.now() + 365 * 864e5
                              ).toUTCString();
                              document.cookie =
                                "trial_acceptance=" +
                                encodeURIComponent(JSON.stringify(payload)) +
                                "; expires=" +
                                expires +
                                "; path=/; Secure; SameSite=Lax";
                            }
                          }

                          setTrialAccepted(true);
                        } catch (err) {
                          console.error("Failed to save trial acceptance", err);
                        } finally {
                          setTrialSaving(false);
                        }
                      }}
                      isLoading={trialSaving}
                    >
                      Claim trial
                    </Button>

                    <Button asChild variant='outline'>
                      <Link href='/pricing'>Check our pricing plans</Link>
                    </Button>
                  </>
                ) : (
                  <div className='inline-flex items-center gap-2 rounded-md bg-white/5 px-3 py-2 text-sm font-medium text-green-300'>
                    ✓ Trial saved
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
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
          {(planParam || selectedPlan) && (
            <>
              <input
                type='hidden'
                name='plan'
                value={planParam ?? selectedPlan}
              />
              <input
                type='hidden'
                name='billing'
                value={(billingParam ?? selectedBilling) || "monthly"}
              />
            </>
          )}
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

// Lightweight fallback while search params resolve client-side.
function SignUpFallback(): React.ReactElement {
  return (
    <div className='flex min-h-[60vh] items-center justify-center'>
      <div className='text-sm text-muted-foreground animate-pulse'>
        Loading signup…
      </div>
    </div>
  );
}

// Default export: wrap inner component in Suspense to satisfy Next.js requirement for useSearchParams.
export default function SignUpPage(): React.ReactElement {
  return (
    <React.Suspense fallback={<SignUpFallback />}>
      <SignUpPageInner />
    </React.Suspense>
  );
}

import type { ActionCodeSettings } from "firebase/auth";

// Central builder for Firebase action links to ensure consistent routing.
// For static export hosting you must ensure these target paths exist and are public.
export function buildEmailVerificationSettings(
  origin: string
): ActionCodeSettings {
  return {
    url: origin + "/auth/action",
    handleCodeInApp: true,
  };
}

export function buildPasswordResetSettings(origin: string): ActionCodeSettings {
  return {
    url: origin + "/auth/action",
    handleCodeInApp: true,
  };
}

// Minimal Firebase client initializer (modular SDK)
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

function assertEnv(name: string, val: string | undefined) {
  if (!val) {
    throw new Error(
      `Missing required env var ${name}. Make sure it's defined in your environment or .env file.`
    );
  }
  return val;
}

const firebaseConfig = {
  apiKey: assertEnv(
    "NEXT_PUBLIC_FIREBASE_API_KEY",
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  ),
  authDomain: assertEnv(
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  ),
  projectId: assertEnv(
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  ),
  storageBucket: assertEnv(
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  ),
  messagingSenderId: assertEnv(
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  ),
  appId: assertEnv(
    "NEXT_PUBLIC_FIREBASE_APP_ID",
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  ),
};

export function getFirebaseApp() {
  if (!getApps().length) {
    if (process.env.NODE_ENV === "development") {
      // print a sanitized copy of the config to help debug CONFIGURATION_NOT_FOUND issues in dev
      // (these are public-facing keys, but don't print in production)
      console.debug("Initializing Firebase with config:", {
        apiKey: firebaseConfig.apiKey,
        authDomain: firebaseConfig.authDomain,
        projectId: firebaseConfig.projectId,
      });
    }
    return initializeApp(firebaseConfig);
  }
  return getApp();
}

export function getFirebaseAuth() {
  try {
    const app = getFirebaseApp();
    return getAuth(app);
  } catch (e) {
    // Re-throw a clearer message so callers (client code) can diagnose
    throw new Error(
      `Firebase initialization failed. Check environment variables and Firebase config. Original: ${
        (e as Error).message
      }`
    );
  }
}

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

"use client";

import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    turnstile?: Record<string, unknown>;
    onTurnstileSuccess?: (token: string) => void;
  }
}

export default function Turnstile({
  siteKey,
  onVerify,
  inputName = "cf-turnstile-response",
}: {
  siteKey: string;
  onVerify?: (token: string) => void;
  inputName?: string;
}) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // define a global callback name that the widget will call
    window.onTurnstileSuccess = (t: string) => {
      setToken(t);
      try {
        onVerify?.(t);
      } catch (e) {
        // swallow callback errors
        console.error("Turnstile onVerify handler error:", e);
      }

      // also populate a hidden input inside the form if present
      const inputId = `turnstile-${inputName}`;
      const el = document.getElementById(inputId) as HTMLInputElement | null;
      if (el) el.value = t;
    };

    // if the script is already present, leave it; otherwise add it
    if (!window.turnstile) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, [onVerify, inputName]);

  const hiddenInputId = `turnstile-${inputName}`;

  return (
    <div>
      <input
        type="hidden"
        id={hiddenInputId}
        name={inputName}
        value={token ?? ""}
      />

      {/* Cloudflare Turnstile expects a div with class cf-turnstile and data attributes. */}
      <div
        className="cf-turnstile"
        data-sitekey={siteKey}
        data-callback="onTurnstileSuccess"
        data-theme="dark"
      />
    </div>
  );
}

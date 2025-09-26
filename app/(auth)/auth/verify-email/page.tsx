import React from "react";
import VerifyEmailRedirectClient from "./Redirect.client";

export default function VerifyEmailRedirect(): React.ReactElement {
  return (
    <React.Suspense
      fallback={
        <div className='flex min-h-[60vh] items-center justify-center'>
          <div className='text-sm text-muted-foreground animate-pulse'>
            Redirecting…
          </div>
        </div>
      }
    >
      <VerifyEmailRedirectClient />
    </React.Suspense>
  );
}

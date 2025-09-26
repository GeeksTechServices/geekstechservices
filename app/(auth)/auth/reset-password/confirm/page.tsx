import React from "react";
import ResetPasswordConfirmRedirectClient from "./Redirect.client";

export default function ResetPasswordConfirmRedirect(): React.ReactElement {
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
      <ResetPasswordConfirmRedirectClient />
    </React.Suspense>
  );
}

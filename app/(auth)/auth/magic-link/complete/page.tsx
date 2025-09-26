export const metadata = {
  title: "Complete magic link sign-in",
};
import React from "react";
import MagicLinkCompleteRedirect from "./Redirect.client";

export default function Page() {
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
      <MagicLinkCompleteRedirect />
    </React.Suspense>
  );
}

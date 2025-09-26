"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function MagicLinkCompleteRedirect() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const qs = params.toString();
    router.replace(`/auth/action${qs ? `?${qs}` : ""}`);
  }, [params, router]);

  return (
    <div className='flex min-h-[60vh] items-center justify-center'>
      <div className='rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300'>
        Redirecting to complete sign-in…
      </div>
    </div>
  );
}

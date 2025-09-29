import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Logo({ compact = false }: { compact?: boolean }) {
  // Start null to avoid SSR/image-mismatch issues; set to webp on client mount.
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    setSrc("/images/logo.webp");
  }, []);

  const handleImgError = () => {
    if (src === "/images/logo.webp") {
      setSrc("/images/logo.png"); // try png if webp fails
    } else {
      setSrc(null); // both failed -> show text fallback
    }
  };
  // If image is available (client-side), show only the rectangular logo.
  if (src) {
    return (
      <div className={`object-cover ${compact ? "h-7" : "h-20"}`}>
        <Image
          src={src}
          alt='GeekStechServices logo'
          onError={handleImgError}
          // set explicit dimensions for Image optimization; adjust as needed
          width={compact ? 140 : 175}
          height={compact ? 28 : 80}
          priority
          className='block'
        />
      </div>
    );
  }

  // Fallback text-only logo (shown when no image available or during SSR)
  return (
    <div
      className={`flex items-center gap-3 ${compact ? "text-sm" : "text-base"}`}
    >
      <svg
        width={compact ? 28 : 36}
        height={compact ? 28 : 36}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden
      >
        <rect x='2' y='2' width='20' height='20' rx='6' fill='url(#g)' />
        <defs>
          <linearGradient id='g' x1='0' x2='1'>
            <stop offset='0%' stopColor='#7C3AED' />
            <stop offset='100%' stopColor='#06B6D4' />
          </linearGradient>
        </defs>
        <path
          d='M7 13c1.333-2 4-4 8-4'
          stroke='#fff'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>

      <div className='leading-tight'>
        <div className='font-extrabold'>GeekStechServices</div>
        {!compact && (
          <div className='text-xs text-gray-400 -mt-1'>
            Engineering & Design
          </div>
        )}
      </div>
    </div>
  );
}

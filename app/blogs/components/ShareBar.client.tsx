"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Share2, Twitter, Linkedin } from "lucide-react";

function shareUrl(platform: string) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  switch (platform) {
    case "twitter":
      return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`;
    default:
      return url;
  }
}

export default function ShareBar() {
  return (
    <div className='flex items-center gap-3'>
      <Button
        variant='ghost'
        onClick={() => window.open(shareUrl("twitter"), "_blank")}
      >
        <Twitter className='w-4 h-4' />
      </Button>
      <Button
        variant='ghost'
        onClick={() => window.open(shareUrl("linkedin"), "_blank")}
      >
        <Linkedin className='w-4 h-4' />
      </Button>
      <Button
        variant='ghost'
        onClick={() =>
          navigator.clipboard &&
          navigator.clipboard.writeText(window.location.href)
        }
      >
        <Share2 className='w-4 h-4' />
      </Button>
    </div>
  );
}

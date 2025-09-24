"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type BlogCommentsProps = {
  slug?: string;
};

export default function BlogComments({ slug }: BlogCommentsProps) {
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Placeholder: we will replace with real auth (Firebase) later
  const signedIn = false; // assume false for now

  const handleSubmit = async () => {
    if (!signedIn) {
      alert("You need to sign in to comment. (Auth coming soon)");
      return;
    }
    setSending(true);
    // TODO: wire to backend / Firestore
    await new Promise((r) => setTimeout(r, 700));
    setSending(false);
    setSubmitted(true);
    setComment("");
  };

  return (
    <div className='mt-12 border-t border-white/10 pt-8'>
      <h3 className='text-lg font-semibold mb-3'>Comments</h3>
      {submitted && (
        <div className='text-sm text-green-400 mb-2'>
          Comment submitted (demo)
        </div>
      )}

      <div className='space-y-3'>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={
            signedIn
              ? `Write your comment about ${slug ?? "this post"}...`
              : "Sign in to leave a comment"
          }
          disabled={!signedIn || sending}
          className='bg-transparent border-white/10 text-white'
        />

        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-400'>
            You must be signed in to comment
          </div>
          <Button onClick={handleSubmit} disabled={!comment || sending}>
            {sending ? "Posting..." : "Post Comment"}
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

type BlogCommentsProps = {
  slug?: string;
};

type Comment = {
  id: string;
  uid: string;
  authorName: string;
  text: string;
  createdAt: string; // ISO
};

const storageKey = (slug?: string) => `gts:comments:${slug ?? "unknown"}`;

export default function BlogComments({ slug }: BlogCommentsProps) {
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    // load comments from localStorage for this slug
    try {
      const raw = localStorage.getItem(storageKey(slug));
      if (raw) {
        setComments(JSON.parse(raw) as Comment[]);
      }
    } catch (e) {
      console.warn("Failed to load comments", e);
    }
  }, [slug]);

  const saveComments = (next: Comment[]) => {
    try {
      localStorage.setItem(storageKey(slug), JSON.stringify(next));
    } catch (e) {
      console.warn("Failed to save comments", e);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("You must sign in to post comments.");
      return;
    }
    if (!comment.trim()) return;
    setSending(true);
    const newComment: Comment = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      uid: user.uid,
      authorName: user.displayName || user.email || "Anonymous",
      text: comment.trim(),
      createdAt: new Date().toISOString(),
    };

    // simulate small delay to mimic network
    await new Promise((r) => setTimeout(r, 300));

    const next = [newComment, ...comments];
    setComments(next);
    saveComments(next);
    setComment("");
    setSending(false);
  };

  const formattedDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className='mt-12 border-t border-white/10 pt-8'>
      <h3 className='text-lg font-semibold mb-3'>Comments</h3>

      <div className='space-y-4'>
        {user ? (
          <div className='space-y-2'>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={`Write your comment about ${slug ?? "this post"}...`}
              disabled={sending}
              className='bg-transparent border-white/10 text-white'
            />
            <div className='flex items-center justify-between'>
              <div className='text-xs text-gray-400'>
                Commenting as{" "}
                <span className='text-gray-100'>
                  {user.displayName || user.email}
                </span>
              </div>
              <Button
                onClick={handleSubmit}
                disabled={!comment.trim() || sending}
              >
                {sending ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-between'>
            <div className='text-sm text-gray-300'>
              Please{" "}
              <Link
                href='/auth/signin'
                className='text-[var(--accent)] underline'
              >
                sign in
              </Link>{" "}
              to leave a comment.
            </div>
          </div>
        )}

        {/* list comments */}
        <div className='space-y-4'>
          {comments.length === 0 && (
            <div className='text-sm text-gray-400'>
              No comments yet — be the first to write one.
            </div>
          )}

          {comments.map((c) => (
            <div key={c.id} className='p-3 bg-white/3 rounded-md'>
              <div className='flex items-start gap-3'>
                <div className='w-10 h-10 rounded-full bg-white/8 flex items-center justify-center text-sm font-medium'>
                  {c.authorName
                    .split(" ")
                    .map((s) => s[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div className='flex-1'>
                  <div className='flex items-center justify-between gap-4'>
                    <div className='text-sm font-medium text-white'>
                      {c.authorName}
                    </div>
                    <div className='text-xs text-gray-400'>
                      {formattedDate(c.createdAt)}
                    </div>
                  </div>
                  <div className='mt-1 text-sm text-gray-200 whitespace-pre-wrap'>
                    {c.text}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

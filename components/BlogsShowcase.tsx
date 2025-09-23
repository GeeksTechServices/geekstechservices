"use client";

import React, { useMemo, useState } from "react";
import blogsData from "@/lib/blogs.json";
import Image from "next/image";
import Link from "next/link";

const PAGE_SIZE = 4;

function getAllTags(posts: any[]) {
  const s = new Set<string>();
  posts.forEach((p) => (p.tags || []).forEach((t: string) => s.add(t)));
  return Array.from(s).sort();
}

function shareUrl(platform: string, post: any) {
  const url =
    typeof window !== "undefined"
      ? window.location.origin + `/blogs/${post.slug}`
      : `/blogs/${post.slug}`;
  const text = encodeURIComponent(`${post.title} — ${post.excerpt}`);
  switch (platform) {
    case "twitter":
      return `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${text}`;
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`;
    default:
      return url;
  }
}

export default function BlogsShowcase() {
  const posts = Array.isArray(blogsData) ? blogsData : [];
  const tags = useMemo(() => getAllTags(posts), [posts]);

  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!activeTag) return posts;
    return posts.filter(
      (p) => Array.isArray(p.tags) && p.tags.includes(activeTag)
    );
  }, [posts, activeTag]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const relatedFor = (post: any) => {
    if (!post.tags || post.tags.length === 0) return [];
    return posts
      .filter(
        (p) =>
          p.id !== post.id &&
          (p.tags || []).some((t: string) => post.tags.includes(t))
      )
      .slice(0, 3);
  };

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex flex-wrap gap-2'>
          <button
            onClick={() => {
              setActiveTag(null);
              setPage(1);
            }}
            className={`px-3 py-1 rounded-full text-sm ${
              !activeTag ? "bg-[var(--accent)] text-black" : "bg-white/3"
            }`}
          >
            All
          </button>
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => {
                setActiveTag(t === activeTag ? null : t);
                setPage(1);
              }}
              className={`px-3 py-1 rounded-full text-sm ${
                activeTag === t ? "bg-[var(--accent)] text-black" : "bg-white/3"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className='text-sm text-white/60'>
          Showing {filtered.length} posts
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {paged.map((p) => (
          <article
            key={p.id}
            className='card p-4 bg-[rgba(255,255,255,0.02)] rounded-lg'
          >
            <div className='flex gap-4'>
              <div className='w-28 h-20 relative rounded-md overflow-hidden flex-shrink-0'>
                <img
                  src={p.image}
                  alt={p.title}
                  className='object-cover w-full h-full'
                />
              </div>
              <div className='flex-1'>
                <div className='flex items-start justify-between gap-4'>
                  <div>
                    <h3 className='text-lg font-semibold'>
                      <Link href={`/blogs/${p.slug}`}>{p.title}</Link>
                    </h3>
                    <p className='mt-1 text-sm text-white/70'>{p.excerpt}</p>
                    <div className='mt-2 text-xs text-white/50'>
                      By {p.author} • {p.date}
                    </div>
                  </div>

                  <div className='flex flex-col items-end gap-2'>
                    <div className='flex gap-2'>
                      <a
                        href={shareUrl("twitter", p)}
                        target='_blank'
                        rel='noreferrer'
                        className='text-xs bg-white/6 px-2 py-1 rounded-md'
                      >
                        Twitter
                      </a>
                      <a
                        href={shareUrl("linkedin", p)}
                        target='_blank'
                        rel='noreferrer'
                        className='text-xs bg-white/6 px-2 py-1 rounded-md'
                      >
                        LinkedIn
                      </a>
                      <a
                        href={shareUrl("facebook", p)}
                        target='_blank'
                        rel='noreferrer'
                        className='text-xs bg-white/6 px-2 py-1 rounded-md'
                      >
                        Facebook
                      </a>
                    </div>
                    <Link
                      href={`/blogs/${p.slug}`}
                      className='text-sm text-[var(--accent)]'
                    >
                      Read →
                    </Link>
                  </div>
                </div>

                <div className='mt-3'>
                  <div className='text-xs text-white/60 mb-2'>Related</div>
                  <div className='flex gap-2'>
                    {relatedFor(p).map((r) => (
                      <Link
                        key={r.id}
                        href={`/blogs/${r.slug}`}
                        className='text-sm bg-white/3 px-2 py-1 rounded-md'
                      >
                        {r.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className='mt-8 flex items-center justify-center gap-3'>
        <button
          onClick={() => setPage((s) => Math.max(1, s - 1))}
          disabled={page === 1}
          className='px-3 py-1 rounded-md bg-white/6'
        >
          Prev
        </button>
        <div className='text-sm'>
          Page {page} of {pageCount}
        </div>
        <button
          onClick={() => setPage((s) => Math.min(pageCount, s + 1))}
          disabled={page === pageCount}
          className='px-3 py-1 rounded-md bg-white/6'
        >
          Next
        </button>
      </div>
    </div>
  );
}

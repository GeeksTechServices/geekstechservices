"use client";

import React, { useMemo, useState } from "react";
import blogsData from "@/lib/blog.json";
import { formatDate } from "@/lib/blog-utils";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 4;

type BlogPost = {
  id?: string | number;
  slug: string;
  title: string;
  excerpt?: string;
  tags?: string[];
  image?: string;
  author?: string;
  date?: string;
  readingTime?: string;
};

function getAllTags(posts: BlogPost[]) {
  const s = new Set<string>();
  posts.forEach((p) => (p.tags || []).forEach((t: string) => s.add(t)));
  return Array.from(s).sort();
}

function shareUrl(platform: string, post: BlogPost) {
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
  const posts: BlogPost[] = useMemo<BlogPost[]>(() => {
    if (!Array.isArray(blogsData)) return [];
    type Raw = Partial<BlogPost> & { slug: string; title: string } & Record<
        string,
        unknown
      >;
    return (blogsData as Raw[]).map((p, i) => ({ id: p.id ?? i, ...p }));
  }, []);
  const tags = useMemo(() => getAllTags(posts), [posts]);

  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const base = !activeTag
      ? posts
      : posts.filter(
          (p) => Array.isArray(p.tags) && p.tags.includes(activeTag)
        );
    return base.slice().sort((a, b) => (a.date! < b.date! ? 1 : -1));
  }, [posts, activeTag]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const relatedFor = (post: BlogPost) => {
    if (!post.tags || post.tags.length === 0) return [];
    return posts
      .filter(
        (p) =>
          p.id !== post.id &&
          (p.tags || []).some((t: string) => post.tags!.includes(t))
      )
      .slice(0, 3);
  };

  return (
    <div>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            Insights & Articles
          </h1>
          <p className='text-sm text-white/60 mt-1 max-w-xl'>
            Deep dives, guides, and case studies on IoT reliability, telemetry,
            and operational excellence.
          </p>
        </div>
        <div className='flex flex-wrap gap-2'>
          <Button
            size='sm'
            variant={!activeTag ? "default" : "ghost"}
            onClick={() => {
              setActiveTag(null);
              setPage(1);
            }}
          >
            All
          </Button>
          {tags.map((t) => (
            <Button
              key={t}
              size='sm'
              variant={activeTag === t ? "default" : "ghost"}
              onClick={() => {
                setActiveTag(t === activeTag ? null : t);
                setPage(1);
              }}
            >
              {t}
            </Button>
          ))}
        </div>

        <div className='text-sm text-white/60 mt-2 md:mt-0'>
          {filtered.length} post{filtered.length === 1 ? "" : "s"}
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {paged.map((p) => (
          <article
            key={p.id}
            className='card p-4 bg-[rgba(255,255,255,0.02)] rounded-lg flex gap-4 items-start'
          >
            <div className='w-28 h-20 relative rounded-md overflow-hidden flex-shrink-0'>
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className='object-cover'
                  sizes='112px'
                />
              ) : (
                <div className='bg-white/3 w-full h-full' />
              )}
            </div>

            <div className='flex-1'>
              <div className='flex items-start justify-between gap-4'>
                <div>
                  <h3 className='text-lg font-semibold'>
                    <Link href={`/blogs/${p.slug}`}>{p.title}</Link>
                  </h3>
                  {p.excerpt && (
                    <p className='mt-1 text-sm text-white/70'>{p.excerpt}</p>
                  )}
                  <div className='mt-2 text-xs text-white/50 flex flex-wrap gap-2 items-center'>
                    {p.author && <span>By {p.author}</span>}
                    {p.date && <span>• {formatDate(p.date)}</span>}
                    {p.tags && (
                      <span className='flex flex-wrap gap-1'>
                        {p.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className='px-1.5 py-0.5 bg-white/5 rounded-md'
                          >
                            {t}
                          </span>
                        ))}
                      </span>
                    )}
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
                  {relatedFor(p).length === 0 && (
                    <span className='text-xs text-white/40'>
                      No related posts
                    </span>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className='mt-8 flex items-center justify-center gap-3'>
        <Button
          size='sm'
          variant='ghost'
          onClick={() => setPage((s) => Math.max(1, s - 1))}
          disabled={page === 1}
        >
          Prev
        </Button>
        <div className='text-sm'>
          Page {page} of {pageCount}
        </div>
        <Button
          size='sm'
          variant='ghost'
          onClick={() => setPage((s) => Math.min(pageCount, s + 1))}
          disabled={page === pageCount}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

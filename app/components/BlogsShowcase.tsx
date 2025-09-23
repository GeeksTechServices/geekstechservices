"use client";

import React, { useMemo, useState } from "react";
import blogsData from "@/lib/blogs.json";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  User,
  Share2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const PAGE_SIZE = 6;

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
      .slice(0, 2);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className='space-y-8'>
      {/* Filter Section */}
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-6'>
        <div className='flex flex-wrap gap-3'>
          <Button
            variant={!activeTag ? "default" : "outline"}
            size='sm'
            onClick={() => {
              setActiveTag(null);
              setPage(1);
            }}
            className={
              !activeTag
                ? "bg-[var(--accent)] text-black hover:bg-[var(--accent)]/90"
                : ""
            }
          >
            All Posts
          </Button>
          {tags.map((t) => (
            <Button
              key={t}
              variant={activeTag === t ? "default" : "outline"}
              size='sm'
              onClick={() => {
                setActiveTag(t === activeTag ? null : t);
                setPage(1);
              }}
              className={
                activeTag === t
                  ? "bg-[var(--accent)] text-black hover:bg-[var(--accent)]/90"
                  : ""
              }
            >
              {t}
            </Button>
          ))}
        </div>

        <div className='flex items-center gap-2 text-sm text-white/60'>
          <span>
            Showing {filtered.length} article{filtered.length !== 1 ? "s" : ""}
          </span>
          {activeTag && (
            <Badge variant='secondary' className='ml-2'>
              #{activeTag}
            </Badge>
          )}
        </div>
      </div>

      {/* Blog Grid */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={(activeTag || "all") + page}
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
        >
          {paged.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className='group cursor-pointer'
            >
              <Card className='h-full overflow-hidden border-0 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm relative'>
                {/* Large Image Section */}
                <div className='relative h-64 w-full overflow-hidden'>
                  <Image
                    src={post.image.replace("/public", "")}
                    alt={post.title}
                    fill
                    className='object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75'
                  />

                  {/* Gradient Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500' />

                  {/* Hover Content Overlay */}
                  <div className='absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0'>
                    {/* Top Section - Tags */}
                    <div className='flex flex-wrap gap-2'>
                      {post.tags?.slice(0, 3).map((tag: string) => (
                        <Badge
                          key={tag}
                          variant='secondary'
                          className='text-xs bg-white/20 text-white border-0 backdrop-blur-md hover:bg-[var(--accent)] hover:text-black transition-colors duration-300'
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Bottom Section - Title & Meta */}
                    <div className='space-y-3'>
                      <h3 className='text-xl font-bold text-white leading-tight line-clamp-2'>
                        {post.title}
                      </h3>
                      <p className='text-sm text-white/90 leading-relaxed line-clamp-2'>
                        {post.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3 text-xs text-white/80'>
                          <div className='flex items-center gap-1'>
                            <User className='h-3 w-3' />
                            <span>{post.author}</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <Calendar className='h-3 w-3' />
                            <span>
                              {new Date(post.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex items-center gap-2'>
                          <Button
                            size='sm'
                            variant='ghost'
                            className='h-8 w-8 p-0 bg-white/20 hover:bg-[var(--accent)] hover:text-black backdrop-blur-md transition-all duration-300'
                            asChild
                          >
                            <a
                              href={shareUrl("twitter", post)}
                              target='_blank'
                              rel='noreferrer'
                              aria-label='Share on Twitter'
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Share2 className='h-4 w-4' />
                            </a>
                          </Button>
                          <Button
                            size='sm'
                            variant='default'
                            className='bg-[var(--accent)] text-black hover:bg-[var(--accent)]/90 px-4'
                            asChild
                          >
                            <Link
                              href={`/blogs/${post.slug}`}
                              className='flex items-center gap-1'
                            >
                              Read
                              <ExternalLink className='h-3 w-3' />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Static Corner Badge */}
                  <div className='absolute top-4 right-4 opacity-100 group-hover:opacity-0 transition-opacity duration-300'>
                    <Badge
                      variant='secondary'
                      className='bg-black/60 text-white border-0 backdrop-blur-sm'
                    >
                      {post.tags?.[0]}
                    </Badge>
                  </div>
                </div>

                {/* Compact Bottom Section - Always Visible */}
                <div className='p-4 space-y-3 bg-gradient-to-t from-black/5 to-transparent'>
                  {/* Title & Excerpt */}
                  <div className='space-y-2 group-hover:opacity-50 transition-opacity duration-300'>
                    <Link href={`/blogs/${post.slug}`} className='group/title'>
                      <h3 className='text-lg font-semibold leading-tight group-hover/title:text-[var(--accent)] transition-colors duration-200 line-clamp-2'>
                        {post.title}
                      </h3>
                    </Link>
                    <p className='text-sm text-white/70 leading-relaxed line-clamp-2'>
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Meta & Related - Compact */}
                  <div className='flex items-center justify-between text-xs text-white/50 group-hover:opacity-50 transition-opacity duration-300'>
                    <div className='flex items-center gap-2'>
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>

                    {relatedFor(post).length > 0 && (
                      <div className='flex items-center gap-1'>
                        <span>+{relatedFor(post).length} related</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className='flex items-center justify-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setPage((s) => Math.max(1, s - 1))}
            disabled={page === 1}
            className='flex items-center gap-2'
          >
            <ChevronLeft className='h-4 w-4' />
            Previous
          </Button>

          <div className='flex items-center gap-2 mx-4'>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map(
              (pageNum) => (
                <Button
                  key={pageNum}
                  variant={page === pageNum ? "default" : "ghost"}
                  size='sm'
                  onClick={() => setPage(pageNum)}
                  className={`w-10 h-10 ${
                    page === pageNum
                      ? "bg-[var(--accent)] text-black hover:bg-[var(--accent)]/90"
                      : ""
                  }`}
                >
                  {pageNum}
                </Button>
              )
            )}
          </div>

          <Button
            variant='outline'
            size='sm'
            onClick={() => setPage((s) => Math.min(pageCount, s + 1))}
            disabled={page === pageCount}
            className='flex items-center gap-2'
          >
            Next
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      )}
    </div>
  );
}

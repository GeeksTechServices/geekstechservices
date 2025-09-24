"use client";

import React, { useMemo, useState } from "react";
import blogsData from "@/lib/blogs.json";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  User,
  ArrowRight,
  Share2,
  Heart,
  Bookmark,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const PAGE_SIZE = 6;

type BlogPost = {
  id: string | number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  slug: string;
  tags?: string[];
};

function getAllTags(posts: BlogPost[]) {
  const s = new Set<string>();
  posts.forEach((p) => (p.tags || []).forEach((t: string) => s.add(t)));
  return Array.from(s).sort();
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogsShowcase() {
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const allTags = useMemo(() => getAllTags(blogsData), []);

  const filteredPosts = useMemo(() => {
    if (selectedTag === "all") return blogsData;
    return blogsData.filter((post) => (post.tags || []).includes(selectedTag));
  }, [selectedTag]);

  const totalPages = Math.ceil(filteredPosts.length / PAGE_SIZE);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const currentPosts = filteredPosts.slice(startIdx, startIdx + PAGE_SIZE);

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    setCurrentPage(1);
    setShowFilters(false);
  };

  // const relatedPosts = useMemo(() => {
  //   if (currentPosts.length === 0) return [];
  //   const currentTags = new Set(currentPosts.flatMap((p) => p.tags || []));
  //   return blogsData
  //     .filter((post) => !currentPosts.includes(post))
  //     .filter((post) => (post.tags || []).some((tag) => currentTags.has(tag)))
  //     .slice(0, 3);
  // }, [currentPosts]);

  return (
    <div className='min-h-screen bg-black/95 text-white'>
      {/* Header Section */}
      <div className='relative py-20 px-6'>
        <div className='container mx-auto max-w-6xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-center space-y-6'
          >
            <h1 className='text-6xl font-bold bg-gradient-to-r from-white via-[var(--accent)] to-white bg-clip-text text-transparent'>
              Latest Insights
            </h1>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed'>
              Explore cutting-edge perspectives on IoT, operations, and
              technology solutions that drive business transformation.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filter Section */}
      <div className='sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-white/10'>
        <div className='container mx-auto max-w-6xl px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <span className='text-sm text-gray-400 font-medium'>
                {filteredPosts.length} article
                {filteredPosts.length !== 1 ? "s" : ""}
              </span>
              {selectedTag !== "all" && (
                <Badge
                  variant='secondary'
                  className='bg-[var(--accent)]/20 text-[var(--accent)] border-transparent'
                >
                  {selectedTag}
                  <X
                    className='w-3 h-3 ml-1 cursor-pointer hover:text-white transition-colors'
                    onClick={() => handleTagChange("all")}
                  />
                </Badge>
              )}
            </div>

            <Button
              variant='outline'
              size='sm'
              onClick={() => setShowFilters(!showFilters)}
              className='glass border-white/20 hover:border-[var(--accent)]/50 transition-all duration-300'
            >
              <Filter className='w-4 h-4 mr-2' />
              Filter by Topic
            </Button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className='mt-4 pt-4 border-t border-white/10'
              >
                <div className='flex flex-wrap gap-2'>
                  <Button
                    variant={selectedTag === "all" ? "default" : "outline"}
                    size='sm'
                    onClick={() => handleTagChange("all")}
                    className={`transition-all duration-300 ${
                      selectedTag === "all"
                        ? "bg-[var(--accent)] hover:bg-[var(--accent)]/80 text-white"
                        : "glass border-white/20 hover:border-[var(--accent)]/50"
                    }`}
                  >
                    All Topics
                  </Button>
                  {allTags.map((tag) => (
                    <Button
                      key={tag}
                      variant={selectedTag === tag ? "default" : "outline"}
                      size='sm'
                      onClick={() => handleTagChange(tag)}
                      className={`transition-all duration-300 capitalize ${
                        selectedTag === tag
                          ? "bg-[var(--accent)] hover:bg-[var(--accent)]/80 text-white"
                          : "glass border-white/20 hover:border-[var(--accent)]/50"
                      }`}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className='container mx-auto max-w-6xl px-6 py-12'>
        <motion.div layout className='space-y-8'>
          <AnimatePresence mode='wait'>
            {currentPosts.map((post, index) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className='group glass border-white/10 hover:border-[var(--accent)]/30 transition-all duration-500 overflow-hidden cursor-pointer'
                  onClick={() => router.push(`/blogs/${post.slug}`)}
                  role={"link"}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      router.push(`/blogs/${post.slug}`);
                    }
                  }}
                >
                  <div className='relative lg:flex'>
                    {/* Image Section */}
                    <div className='relative lg:w-80 h-64 lg:h-auto overflow-hidden'>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className='object-cover transition-all duration-700 group-hover:scale-105'
                      />

                      {/* Hover Overlay with Actions */}
                      <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'>
                        <div className='flex space-x-3'>
                          <Button
                            size='sm'
                            variant='secondary'
                            className='bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm'
                            onClick={(e) => {
                              e.stopPropagation();
                              // TODO: like action
                            }}
                          >
                            <Heart className='w-4 h-4' />
                          </Button>
                          <Button
                            size='sm'
                            variant='secondary'
                            className='bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm'
                            onClick={(e) => {
                              e.stopPropagation();
                              // TODO: bookmark action
                            }}
                          >
                            <Bookmark className='w-4 h-4' />
                          </Button>
                          <Button
                            size='sm'
                            variant='secondary'
                            className='bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm'
                            onClick={(e) => {
                              e.stopPropagation();
                              // TODO: share action
                            }}
                          >
                            <Share2 className='w-4 h-4' />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className='flex-1 p-8 lg:p-10'>
                      <div className='h-full flex flex-col justify-between'>
                        <div className='space-y-4'>
                          {/* Tags */}
                          <div className='flex flex-wrap gap-2'>
                            {(post.tags || []).slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant='secondary'
                                className='rounded-full px-2 py-0.5 bg-[var(--accent)]/10 text-[var(--accent)] border-transparent capitalize text-xs'
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Title */}
                          <h2 className='text-2xl lg:text-3xl font-bold text-white group-hover:text-[var(--accent)] transition-colors duration-300 leading-tight'>
                            {post.title}
                          </h2>

                          {/* Excerpt */}
                          <p className='text-gray-300 leading-relaxed text-lg'>
                            {post.excerpt}
                          </p>
                        </div>

                        {/* Meta and CTA */}
                        <div className='flex items-center justify-between pt-6 mt-6 border-t border-white/10'>
                          <div className='flex items-center space-x-4 text-sm text-gray-400'>
                            <div className='flex items-center space-x-1'>
                              <User className='w-4 h-4' />
                              <span>{post.author}</span>
                            </div>
                            <div className='flex items-center space-x-1'>
                              <Calendar className='w-4 h-4' />
                              <span>{formatDate(post.date)}</span>
                            </div>
                          </div>

                          <Button
                            variant='outline'
                            size='sm'
                            className='glass border-[var(--accent)]/30 text-[var(--accent)] hover:bg-[var(--accent)]/10 hover:border-[var(--accent)] transition-all duration-300 group/btn'
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/blogs/${post.slug}`);
                            }}
                          >
                            Read More
                            <ArrowRight className='w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300' />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='flex items-center justify-center space-x-4 mt-16'>
            <Button
              variant='outline'
              size='sm'
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className='glass border-white/20 hover:border-[var(--accent)]/50 disabled:opacity-50 transition-all duration-300'
            >
              <ChevronLeft className='w-4 h-4 mr-1' />
              Previous
            </Button>

            <div className='flex space-x-2'>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size='sm'
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 transition-all duration-300 ${
                    currentPage === i + 1
                      ? "bg-[var(--accent)] hover:bg-[var(--accent)]/80 text-white"
                      : "glass border-white/20 hover:border-[var(--accent)]/50"
                  }`}
                >
                  {i + 1}
                </Button>
              ))}
            </div>

            <Button
              variant='outline'
              size='sm'
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className='glass border-white/20 hover:border-[var(--accent)]/50 disabled:opacity-50 transition-all duration-300'
            >
              Next
              <ChevronRight className='w-4 h-4 ml-1' />
            </Button>
          </div>
        )}
      </div>

      {/* Related posts removed from showcase; moved to individual blog pages */}
    </div>
  );
}

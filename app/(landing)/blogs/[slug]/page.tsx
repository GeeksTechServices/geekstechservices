import React from "react";
import blogsData from "@/lib/blogs.json";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ShareBar from "@/app/(landing)/blogs/components/ShareBar.client";
import BlogComments from "@/app/(landing)/blogs/components/BlogComments.client";

type BlogPost = {
  id: string | number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  slug: string;
  tags?: string[];
  content?: string;
};

export function generateStaticParams() {
  return blogsData.map((post: BlogPost) => ({ slug: post.slug }));
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage(props: {
  params: { slug: string };
}) {
  const { params } = props;
  const post = (blogsData as BlogPost[]).find((p) => p.slug === params.slug);
  if (!post) return notFound();

  const body =
    post.content ||
    post.excerpt + "\n\n" + Array(4).fill(post.excerpt).join("\n\n");

  return (
    <main className='container mx-auto max-w-4xl px-6 py-16 text-white'>
      <Link
        href='/blogs'
        className='text-sm text-gray-400 hover:text-white mb-6 inline-block'
      >
        ← Back to articles
      </Link>

      <article className='space-y-8'>
        <header>
          <h1 className='text-4xl font-extrabold mb-3'>{post.title}</h1>
          <div className='flex items-center gap-4 text-sm text-gray-400'>
            <span>{post.author}</span>
            <span>•</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.tags && (
              <span className='ml-3 flex flex-wrap gap-2'>
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className='text-xs bg-[var(--accent)]/10 text-[var(--accent)] rounded-full px-2 py-0.5'
                  >
                    {t}
                  </span>
                ))}
              </span>
            )}
          </div>
        </header>

        <div className='relative w-full h-72 overflow-hidden rounded-lg'>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className='object-cover'
          />
          <div className='absolute right-4 top-4'>
            <ShareBar />
          </div>
        </div>

        <div className='prose prose-invert max-w-none text-gray-200'>
          {body.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Comments */}
        <BlogComments slug={post.slug} />
      </article>

      {/* Recent Articles */}
      <section className='mt-16 border-t border-white/10 pt-10'>
        <h3 className='text-2xl font-bold mb-6'>Recent Articles</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {blogsData
            .filter((p: BlogPost) => p.slug !== post.slug)
            .slice(0, 6)
            .map((p: BlogPost) => (
              <Link
                key={p.slug}
                href={`/blogs/${p.slug}`}
                className='group block'
              >
                <div className='glass border-white/10 hover:border-[var(--accent)]/30 transition-all duration-300 overflow-hidden rounded-lg'>
                  <div className='relative h-40 overflow-hidden'>
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className='object-cover transition-transform duration-500 group-hover:scale-105'
                    />
                  </div>
                  <div className='p-4'>
                    <h4 className='text-sm font-medium text-white group-hover:text-[var(--accent)] line-clamp-2'>
                      {p.title}
                    </h4>
                    <p className='text-xs text-gray-400'>
                      {formatDate(p.date)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}

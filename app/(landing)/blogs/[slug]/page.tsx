import React from "react";
// Using unified blog.json dataset & utilities
import {
  allPosts,
  findPost,
  relatedPosts,
  formatDate as fmtDate,
} from "@/lib/blog-utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import ShareBar from "@/app/(landing)/blogs/components/ShareBar.client";
import BlogComments from "@/app/(landing)/blogs/components/BlogComments.client";

// (BlogPost type available if needed from blog-utils)

export function generateStaticParams() {
  return allPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return {};
  const seo = post.seo as NonNullable<typeof post.seo> | undefined;
  return {
    title: seo?.title || post.title,
    description: seo?.description || post.excerpt,
    keywords: seo?.keywords?.join(", "),
    alternates: seo?.canonical ? { canonical: seo.canonical } : undefined,
    openGraph: {
      title: seo?.title || post.title,
      description: seo?.description || post.excerpt,
      images: seo?.ogImage ? [seo.ogImage] : undefined,
      type: "article",
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return notFound();
  const body = post.content || post.excerpt;
  const related = relatedPosts(post.slug, 6);

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
          {post.image && (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className='object-cover'
            />
          )}
          <div className='absolute right-4 top-4'>
            <ShareBar />
          </div>
        </div>

        <div className='prose prose-invert max-w-none text-gray-200'>
          {
            // typed components so parameters are inferred (avoids implicit any)
          }
          {(() => {
            const mdComponents: Components = {
              h1: (props) => (
                <h1 className='text-3xl font-extrabold mt-6 mb-3' {...props} />
              ),
              h2: (props) => (
                <h2 className='text-2xl font-bold mt-6 mb-2' {...props} />
              ),
              h3: (props) => (
                <h3 className='text-xl font-semibold mt-5 mb-2' {...props} />
              ),
              p: (props) => (
                <p className='leading-7 text-gray-200' {...props} />
              ),
              a: (props) => (
                <a className='text-[var(--accent)] underline' {...props} />
              ),
              ul: (props) => (
                <ul className='list-disc pl-6 space-y-2' {...props} />
              ),
              ol: (props) => (
                <ol className='list-decimal pl-6 space-y-2' {...props} />
              ),
              blockquote: (props) => (
                <blockquote
                  className='border-l-4 border-white/10 pl-4 italic text-gray-300'
                  {...props}
                />
              ),
              img: (props) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  {...props}
                  alt={props.alt ?? ""}
                  className='rounded-md mx-auto'
                />
              ),
              code: (props) => {
                // react-markdown's props don't always include `inline` in the inferred type.
                // Access via a narrow cast to avoid using `any` and satisfy TS.
                const inline = (props as { inline?: boolean }).inline;
                const className = (props as { className?: string }).className;
                const children = (props as { children?: React.ReactNode })
                  .children;

                if (inline) {
                  return (
                    <code className='bg-white/5 px-1 rounded text-sm'>
                      {children}
                    </code>
                  );
                }
                return (
                  <pre className='bg-[#071028] p-4 rounded-md overflow-auto text-sm'>
                    <code className={String(className)}>{children}</code>
                  </pre>
                );
              },
              table: (props) => (
                <div className='overflow-auto'>
                  <table className='min-w-full text-sm table-auto' {...props} />
                </div>
              ),
              thead: (props) => <thead className='bg-white/5' {...props} />,
              th: (props) => (
                <th
                  className='text-left font-medium p-2 border-b border-white/10'
                  {...props}
                />
              ),
              td: (props) => (
                <td
                  className='p-2 align-top border-b border-white/10'
                  {...props}
                />
              ),
            };

            return (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={mdComponents}
              >
                {body}
              </ReactMarkdown>
            );
          })()}
        </div>

        {/* Comments */}
        <BlogComments slug={post.slug} />
      </article>

      {/* Recent Articles */}
      <section className='mt-16 border-t border-white/10 pt-10'>
        <h3 className='text-2xl font-bold mb-6'>Recent Articles</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {related
            .filter((p) => p.slug !== post.slug)
            .map((p) => (
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
                    <p className='text-xs text-gray-400'>{fmtDate(p.date)}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}

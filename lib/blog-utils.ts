import rawData from "@/lib/blog.json";

export type BlogSEO = {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
};

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  href?: string;
  image: string;
  date: string;
  author: string;
  readingTime?: string;
  tags?: string[];
  seo?: BlogSEO;
  content: string;
}

const posts: BlogPost[] = Array.isArray(rawData) ? (rawData as BlogPost[]) : [];

export function allPosts(): BlogPost[] {
  return posts.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function findPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function relatedPosts(slug: string, limit = 3): BlogPost[] {
  const base = findPost(slug);
  if (!base || !base.tags)
    return allPosts()
      .filter((p) => p.slug !== slug)
      .slice(0, limit);
  const pool = allPosts().filter((p) => p.slug !== slug);
  const scored = pool.map((p) => ({
    post: p,
    score: (p.tags || []).reduce(
      (acc, t) => acc + (base.tags!.includes(t) ? 1 : 0),
      0
    ),
  }));
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.post)
    .concat(
      pool.filter((p) => !(p.tags || []).some((t) => base.tags!.includes(t)))
    )
    .slice(0, limit);
}

export function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

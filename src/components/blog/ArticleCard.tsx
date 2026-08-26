import Link from 'next/link';

/**
 * Only the fields this card renders. Kept structural (not `Post` itself)
 * so `BlogFilter` — a client component that must not import the
 * server-only `@/lib/blog` — can pass a plain object of this shape.
 */
export type ArticleCardPost = {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  excerpt: string;
  readTime: number;
};

/** A single post preview — category, title, excerpt, read time. */
export default function ArticleCard({ post }: { post: ArticleCardPost }) {
  return (
    <article className="h-full rounded-2xl border border-cream-300 bg-cream-100 p-6 transition-transform hover:-translate-y-1">
      <Link
        href={`/blog/category/${post.categorySlug}`}
        className="eyebrow text-accent-ink transition-colors hover:underline"
      >
        {post.category}
      </Link>

      <h3 className="h3-card mt-3 font-medium text-forest-950">
        <Link href={`/blog/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
      </h3>

      <p className="mt-3 text-[1.0625rem] leading-[1.7] text-ink-soft">{post.excerpt}</p>

      <p className="eyebrow mt-6 text-ink-soft">{post.readTime} min read</p>
    </article>
  );
}

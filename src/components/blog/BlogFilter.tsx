'use client';

import { useMemo, useState } from 'react';
import ArticleCard, { type ArticleCardPost } from './ArticleCard';
import { CATEGORIES } from '@/data/blog-categories';

export default function BlogFilter({ posts }: { posts: ArticleCardPost[] }) {
  const [query, setQuery] = useState('');
  const [categorySlug, setCategorySlug] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = !categorySlug || post.categorySlug === categorySlug;
      const matchesQuery =
        q.length === 0 ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, categorySlug]);

  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="w-full max-w-sm">
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-[1rem] text-forest-950 placeholder:text-ink-soft"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={categorySlug === null}
            onClick={() => setCategorySlug(null)}
            className={
              categorySlug === null
                ? 'rounded-full bg-forest-950 px-4 py-2 text-sm font-medium text-cream-50'
                : 'rounded-full border border-cream-300 px-4 py-2 text-sm font-medium text-ink-soft hover:border-accent-ink'
            }
          >
            All
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category.slug}
              type="button"
              aria-pressed={categorySlug === category.slug}
              onClick={() =>
                setCategorySlug((current) => (current === category.slug ? null : category.slug))
              }
              className={
                categorySlug === category.slug
                  ? 'rounded-full bg-forest-950 px-4 py-2 text-sm font-medium text-cream-50'
                  : 'rounded-full border border-cream-300 px-4 py-2 text-sm font-medium text-ink-soft hover:border-accent-ink'
              }
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="eyebrow mt-6 text-ink-soft">
        {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-10 text-[1.0625rem] text-ink-soft">
          No articles match that search. Try a different term or clear the category filter.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

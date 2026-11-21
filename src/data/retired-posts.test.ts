import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { RETIRED_POSTS } from './retired-posts';
import { getAllPosts } from '@/lib/blog';
import { CATEGORIES } from '@/data/blog-categories';

const liveSlugs = new Set(getAllPosts().map((p) => p.slug));
const categorySlugs = new Set(CATEGORIES.map((c) => c.slug));

describe('RETIRED_POSTS', () => {
  it('has no duplicate slugs', () => {
    const seen = new Set(RETIRED_POSTS.map((r) => r.slug));
    expect(seen.size).toBe(RETIRED_POSTS.length);
  });

  it('never retires a post that is still live', () => {
    for (const r of RETIRED_POSTS) expect(liveSlugs.has(r.slug)).toBe(false);
  });

  it('keeps the markdown of every retired post in content/blog-retired', () => {
    for (const r of RETIRED_POSTS) {
      const file = path.join(process.cwd(), 'content', 'blog-retired', `${r.slug}.md`);
      expect(fs.existsSync(file)).toBe(true);
    }
  });

  it('points every redirect at a live post or a real category page', () => {
    for (const { destination } of RETIRED_POSTS) {
      const post = destination.match(/^\/blog\/([a-z0-9-]+)$/);
      const category = destination.match(/^\/blog\/category\/([a-z0-9-]+)$/);
      const ok =
        (post !== null && liveSlugs.has(post[1])) ||
        (category !== null && categorySlugs.has(category[1]));
      expect(ok, destination).toBe(true);
    }
  });
});

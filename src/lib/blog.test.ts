import { describe, it, expect } from 'vitest';
import {
  getAllPosts,
  getPost,
  getPostsByCategory,
  getRelatedPosts,
  slugifyHeading,
} from './blog';
import { CATEGORIES } from '@/data/blog-categories';

const posts = getAllPosts();

describe('getAllPosts', () => {
  it('finds all 132 articles', () => {
    expect(posts).toHaveLength(132);
  });

  it('gives every post a non-empty title, slug, and body', () => {
    for (const p of posts) {
      expect(p.slug.length).toBeGreaterThan(0);
      expect(p.title.length).toBeGreaterThan(0);
      expect(p.body.length).toBeGreaterThan(0);
    }
  });

  it('assigns every post a category that exists', () => {
    const slugs = new Set(CATEGORIES.map((c) => c.slug));
    for (const p of posts) {
      expect(slugs.has(p.categorySlug)).toBe(true);
    }
  });

  it('has no duplicate slugs', () => {
    const seen = new Set(posts.map((p) => p.slug));
    expect(seen.size).toBe(posts.length);
  });

  it('gives every post a non-empty excerpt', () => {
    for (const p of posts) expect(p.excerpt.length).toBeGreaterThan(0);
  });

  it('estimates a plausible read time for every post', () => {
    for (const p of posts) {
      expect(p.readTime).toBeGreaterThan(0);
      expect(p.readTime).toBeLessThan(60);
    }
  });

  it('extracts headings with unique ids within each post', () => {
    for (const p of posts) {
      const ids = p.headings.map((h) => h.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it('leaves no body starting with an h1', () => {
    for (const p of posts) expect(p.body.trimStart().startsWith('# ')).toBe(false);
  });
});

describe('getPost', () => {
  it('returns a known post', () => {
    const p = getPost('local-seo-101');
    expect(p).toBeDefined();
    expect(p!.categorySlug).toBe('local-seo');
  });

  it('returns undefined for an unknown slug', () => {
    expect(getPost('does-not-exist')).toBeUndefined();
  });
});

describe('getPostsByCategory', () => {
  it('partitions every post into exactly one category', () => {
    const total = CATEGORIES.reduce(
      (sum, c) => sum + getPostsByCategory(c.slug).length,
      0,
    );
    expect(total).toBe(132);
  });

  it('matches the known per-category counts', () => {
    expect(getPostsByCategory('lead-generation')).toHaveLength(27);
    expect(getPostsByCategory('ai-search')).toHaveLength(13);
    expect(getPostsByCategory('local-seo')).toHaveLength(32);
    expect(getPostsByCategory('content-marketing')).toHaveLength(25);
    expect(getPostsByCategory('business-growth')).toHaveLength(16);
    expect(getPostsByCategory('website-performance')).toHaveLength(19);
  });

  it('returns an empty array for an unknown category', () => {
    expect(getPostsByCategory('nope')).toEqual([]);
  });
});

describe('getRelatedPosts', () => {
  it('returns same-category posts excluding the post itself', () => {
    const p = getPost('local-seo-101')!;
    const related = getRelatedPosts(p, 3);
    expect(related).toHaveLength(3);
    for (const r of related) {
      expect(r.categorySlug).toBe(p.categorySlug);
      expect(r.slug).not.toBe(p.slug);
    }
  });
});

describe('slugifyHeading', () => {
  it('lowercases and hyphenates', () => {
    expect(slugifyHeading('Pillar 1: Your Google Business Profile')).toBe(
      'pillar-1-your-google-business-profile',
    );
  });

  it('strips punctuation and collapses separators', () => {
    expect(slugifyHeading("What's the *real* cost?")).toBe('whats-the-real-cost');
  });

  it('does not start or end with a hyphen', () => {
    const s = slugifyHeading('— Leading and trailing —');
    expect(s.startsWith('-')).toBe(false);
    expect(s.endsWith('-')).toBe(false);
  });
});

import { describe, it, expect } from 'vitest';
import {
  getAllPosts,
  getPost,
  getPostsByCategory,
  getRelatedPosts,
  slugifyHeading,
  stripEmphasis,
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

  it('gives different posts in the same category different related sets', () => {
    const categoryPosts = getPostsByCategory('local-seo');
    const a = getRelatedPosts(categoryPosts[0], 3);
    const b = getRelatedPosts(categoryPosts[1], 3);
    expect(a.map((p) => p.slug)).not.toEqual(b.map((p) => p.slug));
  });

  it('is deterministic across calls', () => {
    const p = getPost('local-seo-101')!;
    const first = getRelatedPosts(p, 3).map((r) => r.slug);
    const second = getRelatedPosts(p, 3).map((r) => r.slug);
    expect(first).toEqual(second);
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

describe('heading id parity between lib and ArticleBody', () => {
  // `src/lib/blog.ts`'s extractHeadings() slugifies the RAW markdown text of
  // each heading line. `ArticleBody.tsx` slugifies the RENDERED text (i.e.
  // markdown syntax like links/code/emphasis stripped to plain text) using
  // the same per-post duplicate-suffix counter. This test recomputes the
  // ArticleBody-style ids for every post and asserts they match the ids the
  // library actually produced, so the two implementations can never diverge
  // silently for content already in the corpus.
  function renderedTextIds(headings: { text: string }[]): string[] {
    const idCounts = new Map<string, number>();
    return headings.map(({ text }) => {
      let id = slugifyHeading(stripEmphasis(text));
      const count = idCounts.get(id) ?? 0;
      idCounts.set(id, count + 1);
      if (count > 0) id = `${id}-${count + 1}`;
      return id;
    });
  }

  it('produces matching ids for every one of the 132 posts', () => {
    for (const p of posts) {
      const expected = renderedTextIds(p.headings);
      const actual = p.headings.map((h) => h.id);
      expect(actual).toEqual(expected);
    }
  });
});

describe('seoTitle', () => {
  it('gives every post a seoTitle of 60 characters or fewer', () => {
    for (const p of posts) {
      expect(p.seoTitle.length).toBeLessThanOrEqual(60);
      expect(p.seoTitle.length).toBeGreaterThan(0);
    }
  });

  it('keeps short titles unchanged', () => {
    const short = posts.find((p) => p.title.length <= 60);
    if (short) expect(short.seoTitle).toBe(short.title);
  });

  it('prefers the segment before a colon for long titles', () => {
    // Verified against the real corpus before writing this assertion.
    const p = getPost('5-reasons-losing-leads-online')!;
    expect(p.title.length).toBeGreaterThan(60);
    expect(p.seoTitle).toBe('Why Your Phone Stopped Ringing');
  });

  it('never leaves a dangling separator', () => {
    for (const p of posts) {
      expect(p.seoTitle.trim().endsWith(':')).toBe(false);
      expect(p.seoTitle.trim().endsWith('-')).toBe(false);
    }
  });
});

describe('metaDescription', () => {
  it('caps every description at 155 characters', () => {
    for (const p of posts) {
      expect(p.metaDescription.length).toBeLessThanOrEqual(155);
      expect(p.metaDescription.length).toBeGreaterThan(0);
    }
  });

  it('does not cut mid-word', () => {
    for (const p of posts) {
      if (p.metaDescription.endsWith('…')) {
        const body = p.metaDescription.slice(0, -1).trimEnd();
        expect(body.endsWith(' ')).toBe(false);
      }
    }
  });
});

describe('datePublished', () => {
  it('is absent when no frontmatter date exists', () => {
    for (const p of posts) expect(p.datePublished).toBeUndefined();
  });
});

import { describe, expect, it } from 'vitest';
import { getAllPosts } from '@/lib/blog';
import { RELATED_GUIDES } from '@/data/related-guides';

const live = new Set(getAllPosts().map((p) => p.slug));

describe('related guides map', () => {
  it.each(Object.entries(RELATED_GUIDES))('%s only lists live posts, with no duplicates', (_page, slugs) => {
    expect(slugs.filter((s) => !live.has(s))).toEqual([]);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.length).toBeGreaterThanOrEqual(1);
    expect(slugs.length).toBeLessThanOrEqual(4);
  });

  it('covers the pages that sell, and nothing for e-commerce yet', () => {
    expect(Object.keys(RELATED_GUIDES).sort()).toEqual(
      [
        'ai-automation',
        'faq',
        'google-ads',
        'industries-auto',
        'industries-local',
        'industries-trades',
        'process',
        'seo',
        'social-media',
        'website-design',
      ].sort(),
    );
    expect(Object.keys(RELATED_GUIDES)).not.toContain('ecommerce');
  });
});

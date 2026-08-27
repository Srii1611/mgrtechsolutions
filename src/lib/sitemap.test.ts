import { describe, it, expect } from 'vitest';
import { buildSitemapRoutes } from './sitemap-routes';
import { SITE } from '@/data/site';

const routes = buildSitemapRoutes();

describe('buildSitemapRoutes', () => {
  it('covers every route: 9 static + 132 posts + 6 categories', () => {
    expect(routes).toHaveLength(147);
  });

  it('makes every url absolute and on the site domain', () => {
    for (const r of routes) expect(r.url.startsWith(SITE.url)).toBe(true);
  });

  it('has no duplicate urls', () => {
    const seen = new Set(routes.map((r) => r.url));
    expect(seen.size).toBe(routes.length);
  });

  it('excludes the api route', () => {
    expect(routes.some((r) => r.url.includes('/api/'))).toBe(false);
  });

  it('includes the homepage exactly once', () => {
    expect(routes.filter((r) => r.url === SITE.url || r.url === SITE.url + '/')).toHaveLength(1);
  });

  it('includes every blog category', () => {
    for (const slug of [
      'ai-search',
      'business-growth',
      'content-marketing',
      'lead-generation',
      'local-seo',
      'website-performance',
    ]) {
      expect(routes.some((r) => r.url.endsWith('/blog/category/' + slug))).toBe(true);
    }
  });

  it('gives the homepage the highest priority', () => {
    const home = routes.find((r) => r.url === SITE.url || r.url === SITE.url + '/')!;
    const other = routes.find((r) => r.url.includes('/blog/'))!;
    expect(home.priority!).toBeGreaterThan(other.priority!);
  });
});

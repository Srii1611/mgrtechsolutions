import { describe, expect, it } from 'vitest';
import { getPost } from '@/lib/blog';
import { SERVICE_PAGES } from '@/data/service-pages';
import { PRICES, TIERS } from '@/data/prices';

/** Every dollar amount a page may mention: any number in prices.ts, and the Jumpstart for two platforms. */
const allowedAmounts = new Set<number>();
(function collect(v: unknown) {
  if (typeof v === 'number') allowedAmounts.add(v);
  else if (Array.isArray(v)) v.forEach(collect);
  else if (v && typeof v === 'object') Object.values(v).forEach(collect);
})(PRICES);
allowedAmounts.add(PRICES.ads.jumpstart * 2);

/** Every string in a page's data, depth first. */
function strings(v: unknown, out: string[] = []): string[] {
  if (typeof v === 'string') out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => strings(x, out));
  else if (v && typeof v === 'object') Object.values(v).forEach((x) => strings(x, out));
  return out;
}

/** Every blog slug a page links to. */
function slugs(page: (typeof SERVICE_PAGES)[number]): string[] {
  const out: string[] = [];
  const walk = (v: unknown) => {
    if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') {
      const o = v as Record<string, unknown>;
      if (typeof o.slug === 'string' && o !== (page as unknown)) out.push(o.slug);
      if (Array.isArray(o.slugs)) out.push(...(o.slugs as string[]));
      Object.values(o).forEach(walk);
    }
  };
  walk({ ...page, slug: undefined });
  return out;
}

describe.each(SERVICE_PAGES.map((p) => [p.slug, p] as const))('service page: %s', (_slug, page) => {
  it('links only to blog posts that exist', () => {
    const missing = slugs(page).filter((s) => !getPost(s));
    expect(missing).toEqual([]);
  });

  it('has the same section shape as every other page', () => {
    expect(page.problem.items).toHaveLength(4);
    expect(page.approach.checks).toHaveLength(4);
    expect(page.commitments.rows).toHaveLength(4);
    expect(page.included.categories).toHaveLength(8);
    expect(page.how.steps).toHaveLength(4);
    expect(page.success.checks).toHaveLength(7);
    expect(page.success.path).toHaveLength(3);
    expect(page.compare.columns).toHaveLength(4);
    expect(page.compare.rows).toHaveLength(6);
    for (const r of page.compare.rows) expect(r.cells).toHaveLength(4);
    expect(page.industries.items).toHaveLength(4);
    if (page.guides.groups) expect(page.guides.groups).toHaveLength(3);
    expect(page.faq.items.length).toBeGreaterThanOrEqual(10);
    expect(TIERS[page.pricing.service].length).toBeGreaterThanOrEqual(2);
    expect(page.pricing.facts).toHaveLength(3);
    expect(page.timeline.phases.length).toBeGreaterThanOrEqual(3);
    expect(page.timeline.phases.length).toBeLessThanOrEqual(5);
  });

  it('shows only prices that exist in prices.ts, no company-size claims and no em dashes', () => {
    const text = strings(page).join('\n');
    const shown = [...text.matchAll(/\$\s?(\d[\d,]*)/g)].map((m) => Number(m[1].replace(/,/g, '')));
    expect(shown.filter((n) => !allowedAmounts.has(n))).toEqual([]);
    expect(text).not.toMatch(/\bone[-\s]person\b|\bsolo\b/i);
    expect(text).not.toMatch(/—/);
  });

  it('keeps the page title, description and slug sensible', () => {
    expect(page.meta.title.length).toBeGreaterThan(2);
    expect(page.meta.description.length).toBeLessThanOrEqual(200);
    expect(page.slug).toMatch(/^[a-z-]+$/);
  });

  it('gives every phase a unique key and a positive weight', () => {
    const keys = page.timeline.phases.map((p) => p.key);
    expect(new Set(keys).size).toBe(keys.length);
    for (const p of page.timeline.phases) expect(p.weight).toBeGreaterThan(0);
  });

  it('uses a one-path icon for every included area', () => {
    for (const c of page.included.categories) {
      expect(c.icon.length).toBeGreaterThan(10);
      expect(c.items.length).toBeGreaterThanOrEqual(4);
    }
  });
});

import { describe, expect, it } from 'vitest';
import { defaultSelection, estimate, parseSelection, quotedNote, selectionToQuery } from '@/lib/estimate';

describe('estimate', () => {
  it('starts from nothing', () => {
    expect(estimate({})).toMatchObject({ oneTime: 0, monthly: 0, firstYear: 0, quoted: [] });
  });

  it('adds a website and a care plan: one-time, monthly and first year', () => {
    const e = estimate({ site: 'system', care: 'followup' });
    expect(e.oneTime).toBe(999);
    expect(e.monthly).toBe(149);
    expect(e.firstYear).toBe(999 + 149 * 12);
  });

  it('adds the SEO setup fee once with any SEO plan', () => {
    const e = estimate({ seo: 'local-growth' });
    expect(e.oneTime).toBe(399);
    expect(e.monthly).toBe(499);
    expect(e.lines.map((l) => l.label)).toContain('Local SEO setup');
  });

  it('adds one Jumpstart per ad platform', () => {
    expect(estimate({ ads: 'one-platform' })).toMatchObject({ oneTime: 375, monthly: 299 });
    expect(estimate({ ads: 'both-platforms' })).toMatchObject({ oneTime: 750, monthly: 599 });
  });

  it('adds setup and monthly for AI automation', () => {
    expect(estimate({ ai: 'follow-up' })).toMatchObject({ oneTime: 599, monthly: 149 });
  });

  it('never counts a "from" or quoted price as if it were exact', () => {
    const e = estimate({ site: 'custom', ai: 'custom', store: 'store-pro' });
    expect(e.quoted).toHaveLength(3);
    // Only Commerce care, which is exact and required with a store, is in the totals.
    expect(e.oneTime).toBe(0);
    expect(e.monthly).toBe(149);
    expect(e.quoted.map((q) => q.text).join(' | ')).toContain('from $1,500');
    expect(quotedNote(e)).toContain('3 items');
  });

  it('adds Commerce care with any store, and a store alone is quoted', () => {
    const e = estimate({ store: 'store' });
    expect(e.lines.map((l) => l.label)).toContain('Commerce care');
    expect(e.monthly).toBe(149);
    expect(e.quoted).toHaveLength(1);
  });

  it('ignores unknown tier ids', () => {
    expect(estimate({ site: 'nope', care: 'also-nope' })).toMatchObject({ oneTime: 0, monthly: 0 });
  });

  it('adds a full plan up', () => {
    const e = estimate({ site: 'site', care: 'care', seo: 'map-pack', social: 'basic', ads: 'one-platform', ai: 'missed-call' });
    expect(e.oneTime).toBe(599 + 399 + 375 + 199);
    expect(e.monthly).toBe(79 + 249 + 499 + 299 + 79);
    expect(e.firstYear).toBe(e.oneTime + e.monthly * 12);
  });
});

describe('selection in the URL', () => {
  it('reads known ids and drops the rest', () => {
    expect(parseSelection({ site: 'system', care: 'bogus', seo: ['map-pack', 'x'], store: 'store-pro' })).toEqual({
      site: 'system',
      seo: 'map-pack',
      store: 'store-pro',
    });
  });

  it('round-trips', () => {
    const sel = { site: 'site', care: 'care', ads: 'both-platforms' };
    expect(parseSelection(Object.fromEntries(new URLSearchParams(selectionToQuery(sel))))).toEqual(sel);
  });

  it('defaults to The System with the featured Care plan, and adds Care to a website picked from a page', () => {
    expect(defaultSelection({})).toEqual({ site: 'system', care: 'followup' });
    expect(defaultSelection({ seo: 'local-growth' })).toEqual({ seo: 'local-growth' });
    expect(defaultSelection({ site: 'site' })).toEqual({ site: 'site', care: 'followup' });
  });
});

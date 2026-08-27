import { describe, it, expect } from 'vitest';
import {
  buildLocalBusiness,
  buildWebSite,
  buildArticle,
  buildBreadcrumbs,
  buildFaqPage,
} from './schema';
import { SITE } from '@/data/site';

describe('buildLocalBusiness', () => {
  const s = buildLocalBusiness() as Record<string, unknown>;

  it('declares the right context and type', () => {
    expect(s['@context']).toBe('https://schema.org');
    expect(s['@type']).toBe('ProfessionalService');
  });

  it('uses the current phone number', () => {
    expect(JSON.stringify(s)).toContain(SITE.phone);
  });

  it('never emits the retired phone number', () => {
    const retiredPhone = ['508', '306', '1802'].join('-');
    expect(JSON.stringify(s)).not.toContain(retiredPhone);
  });

  it('NEVER publishes a street address', () => {
    const json = JSON.stringify(s);
    expect(json).not.toContain('streetAddress');
    expect(json).not.toContain('Annetta');
  });

  it('declares locality and region without a street', () => {
    const address = s.address as Record<string, string>;
    expect(address.addressLocality).toBe('Ashland');
    expect(address.addressRegion).toBe('MA');
    expect(address).not.toHaveProperty('streetAddress');
  });

  it('declares a service area', () => {
    expect(s.areaServed).toBeDefined();
    expect(JSON.stringify(s.areaServed)).toContain('Framingham');
  });

  it('does not fabricate ratings or reviews', () => {
    expect(s).not.toHaveProperty('aggregateRating');
    expect(s).not.toHaveProperty('review');
  });

  it('does not emit placeholder pricing', () => {
    expect(JSON.stringify(s)).not.toContain('X,XXX');
  });
});

describe('buildArticle', () => {
  const base = {
    slug: 'local-seo-101',
    title: 'Local SEO 101: The Honest Roadmap',
    excerpt: 'A guide.',
    category: 'Local SEO',
  };

  it('builds an Article with a canonical mainEntityOfPage', () => {
    const a = buildArticle(base) as Record<string, unknown>;
    expect(a['@type']).toBe('Article');
    expect(JSON.stringify(a['mainEntityOfPage'])).toContain('/blog/local-seo-101');
  });

  it('omits datePublished when none is supplied', () => {
    expect(buildArticle(base)).not.toHaveProperty('datePublished');
  });

  it('emits datePublished when one is supplied', () => {
    const a = buildArticle({ ...base, datePublished: '2026-01-15' }) as Record<string, unknown>;
    expect(a.datePublished).toBe('2026-01-15');
  });

  it('caps headline at 110 characters', () => {
    const long = 'x'.repeat(200);
    const a = buildArticle({ ...base, title: long }) as Record<string, string>;
    expect(a.headline.length).toBeLessThanOrEqual(110);
  });

  it('truncates a long real-sentence headline at a word boundary, not mid-word', () => {
    const long =
      'How General Contractors Can Attract Higher-Value Projects Without Chasing Every Lead That Comes Through the Door This Year';
    expect(long.length).toBeGreaterThan(110);
    const a = buildArticle({ ...base, title: long }) as Record<string, string>;
    expect(a.headline.length).toBeLessThanOrEqual(110);
    expect(a.headline.endsWith('…')).toBe(true);
    const withoutEllipsis = a.headline.slice(0, -1);
    expect(long.startsWith(withoutEllipsis)).toBe(true);
    expect(withoutEllipsis.endsWith(' ')).toBe(false);
  });
});

describe('buildBreadcrumbs', () => {
  it('numbers positions from 1', () => {
    const b = buildBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
    ]) as { itemListElement: { position: number }[] };
    expect(b.itemListElement[0].position).toBe(1);
    expect(b.itemListElement[1].position).toBe(2);
  });

  it('makes every url absolute', () => {
    const b = buildBreadcrumbs([{ name: 'Home', url: '/' }]);
    expect(JSON.stringify(b)).toContain(SITE.url);
  });
});

describe('buildFaqPage', () => {
  it('maps questions to Question/Answer pairs', () => {
    const f = buildFaqPage([{ q: 'How much?', a: 'It depends.' }]) as {
      mainEntity: { '@type': string; name: string; acceptedAnswer: { text: string } }[];
    };
    expect(f.mainEntity).toHaveLength(1);
    expect(f.mainEntity[0]['@type']).toBe('Question');
    expect(f.mainEntity[0].name).toBe('How much?');
    expect(f.mainEntity[0].acceptedAnswer.text).toBe('It depends.');
  });

  it('returns an empty mainEntity for no items rather than throwing', () => {
    const f = buildFaqPage([]) as { mainEntity: unknown[] };
    expect(f.mainEntity).toEqual([]);
  });
});

describe('buildWebSite', () => {
  it('names the site and points at its url', () => {
    const w = buildWebSite() as Record<string, string>;
    expect(w['@type']).toBe('WebSite');
    expect(w.url).toBe(SITE.url);
  });
});

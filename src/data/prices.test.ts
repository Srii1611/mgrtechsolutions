import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { BUDGET_OPTIONS, HOURLY_LINE, LAUNCH, PRICES, TIERS, money, perMonth, priceLine, priceParts, tierOf } from '@/data/prices';

const ROOT = process.cwd();

/** Every .ts / .tsx file under app/ and src/, except prices.ts itself and test files. */
function sourceFiles(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) sourceFiles(full, out);
    else if (/\.(ts|tsx)$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name) && entry.name !== 'prices.ts') out.push(full);
  }
  return out;
}

const FILES = [...sourceFiles(path.join(ROOT, 'app')), ...sourceFiles(path.join(ROOT, 'src'))];

function hits(pattern: RegExp, skipLine?: RegExp): string[] {
  const found: string[] = [];
  for (const file of FILES) {
    fs.readFileSync(file, 'utf8')
      .split(/\r?\n/)
      .forEach((line, i) => {
        if (skipLine?.test(line)) return;
        if (pattern.test(line)) found.push(`${path.relative(ROOT, file).replace(/\\/g, '/')}:${i + 1}: ${line.trim().slice(0, 100)}`);
      });
  }
  return found;
}

describe('prices live only in prices.ts', () => {
  it('has no "$" followed by digits anywhere in app/ or src/ outside prices.ts', () => {
    // `.replace(` lines are regex replacements such as '$1', not prices.
    expect(hits(/\$\d/, /\.replace\(/)).toEqual([]);
  });

  it('has none of the retired price sets, bundles or hosting claims', () => {
    const retired = /X,XXX|\*{4}|1,082|from \$500|we don'?t host|we do not host|bundled with SEO|Standard marketing package|PRICE_MASK/i;
    expect(hits(retired)).toEqual([]);
  });

  it('never shows a crossed-out price or a percent-off', () => {
    expect(hits(/<s>|<del>|line-through|\d\s?% off|percent off/i)).toEqual([]);
  });
});

describe('prices.ts', () => {
  it('has the agreed numbers', () => {
    expect(tierOf('website', 'site').oneTime).toBe(599);
    expect(tierOf('website', 'system').oneTime).toBe(999);
    expect(tierOf('website', 'custom')).toMatchObject({ oneTime: 1500, from: true });
    expect(PRICES.depositPercent).toBe(30);
    expect(TIERS.care.map((t) => t.monthly)).toEqual([79, 149, 299]);
    expect(PRICES.seo.setup).toBe(399);
    expect(TIERS.seo.map((t) => t.monthly)).toEqual([249, 499, 999]);
    expect(PRICES.ads.jumpstart).toBe(375);
    expect(TIERS.ads.map((t) => t.monthly)).toEqual([299, 599]);
    expect(TIERS.social.map((t) => t.monthly)).toEqual([499, 899, 1499]);
    expect(TIERS.ai.map((t) => [t.oneTime, t.monthly])).toEqual([[199, 79], [599, 149], [1199, 149]]);
    expect(tierOf('ai', 'custom')).toMatchObject({ from: true, monthlyTo: 199 });
    expect(TIERS.commerce.map((t) => t.oneTime)).toEqual([1500, 4999]);
    expect(PRICES.commerce.care.monthly).toBe(149);
    expect(PRICES.hourly).toBe(50);
  });

  it('features at most one tier per service, and the owner-picked ones', () => {
    for (const tiers of Object.values(TIERS)) expect(tiers.filter((t) => t.featured).length).toBeLessThanOrEqual(1);
    const featured = (s: keyof typeof TIERS) => TIERS[s].find((t) => t.featured)?.id;
    expect(featured('website')).toBe('system');
    expect(featured('care')).toBe('followup');
    expect(featured('seo')).toBe('local-growth');
    expect(featured('social')).toBe('standard');
    expect(featured('ai')).toBe('follow-up');
  });

  it('keeps tier ids unique within a service and every amount positive', () => {
    for (const tiers of Object.values(TIERS)) {
      expect(new Set(tiers.map((t) => t.id)).size).toBe(tiers.length);
      for (const t of tiers) for (const n of [t.oneTime, t.monthly, t.monthlyTo]) if (n !== undefined) expect(n).toBeGreaterThan(0);
    }
  });

  it('states revision rounds and launch times', () => {
    expect(tierOf('website', 'site').revisions).toBe('1 round of revisions');
    expect(tierOf('website', 'system').revisions).toBe('2 rounds of revisions');
    expect(LAUNCH.standard).toBe('15 days');
    expect(LAUNCH.custom).toBe('about 5 weeks');
  });

  it('formats prices', () => {
    expect(money(599)).toBe('$599');
    expect(money(1500)).toBe('$1,500');
    expect(perMonth(79)).toBe('$79/mo');
    expect(HOURLY_LINE).toBe('$50/hr');
    expect(priceLine(tierOf('website', 'custom'))).toBe('from $1,500');
    expect(priceLine(tierOf('ai', 'missed-call'))).toBe('$199 setup + $79/mo');
    expect(priceLine(tierOf('ai', 'custom'))).toBe('from $1,199 setup + $149–$199/mo');
    expect(priceParts(tierOf('care', 'care'))).toEqual({ lead: undefined, main: '$79', sub: 'per month' });
  });

  it('builds the quote-form budgets from the prices', () => {
    expect([...BUDGET_OPTIONS]).toEqual(['Around $600', 'Around $1,000', 'Custom / $1,500+', 'Monthly plans', 'Not sure yet']);
  });
});

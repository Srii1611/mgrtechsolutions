import { ESTIMATOR_PARAM, PRICES, priceLine, tierOf, TIERS, type PriceTier, type ServiceKey } from '@/data/prices';

/**
 * The "Build your plan" estimator's math. Pure functions, no React.
 *
 * Rules (from the owner's brief):
 *  - One-time, monthly and first-year totals. First year = one-time + 12 x monthly.
 *  - A "from" or quoted price (Rebuild / Custom, Custom n8n, Store, Store Pro) is
 *    never added to a total as if it were exact. It is listed separately.
 *  - SEO Setup is added once when any SEO plan is chosen; the Ads Jumpstart is
 *    added once per platform; Commerce care is added with any store.
 */

export interface EstimateLine {
  label: string;
  oneTime?: number;
  monthly?: number;
}

export interface QuotedItem {
  label: string;
  /** e.g. "from <amount>, 30% deposit". */
  text: string;
}

export interface Estimate {
  lines: EstimateLine[];
  quoted: QuotedItem[];
  oneTime: number;
  monthly: number;
  firstYear: number;
}

/** The services the visitor can pick a tier for, in estimator order. */
export const ESTIMATOR_KEYS = ['site', 'care', 'seo', 'ads', 'social', 'ai', 'store'] as const;
export type EstimatorKey = (typeof ESTIMATOR_KEYS)[number];

/** One chosen tier id per estimator key. */
export type Selection = Partial<Record<EstimatorKey, string>>;

/** Which price group each estimator key reads its tiers from. */
const GROUP: Record<EstimatorKey, ServiceKey> = {
  site: 'website',
  care: 'care',
  seo: 'seo',
  ads: 'ads',
  social: 'social',
  ai: 'ai',
  store: 'commerce',
};

export function tiersFor(key: EstimatorKey): readonly PriceTier[] {
  return TIERS[GROUP[key]];
}

function quotedText(t: PriceTier): string {
  const base = priceLine(t);
  return t.note ? `${base}, ${t.note}` : base;
}

/** Work out the totals for a set of choices. Unknown tier ids are ignored. */
export function estimate(sel: Selection): Estimate {
  const lines: EstimateLine[] = [];
  const quoted: QuotedItem[] = [];

  const add = (key: EstimatorKey, label: string) => {
    const id = sel[key];
    if (!id) return undefined;
    const t = tiersFor(key).find((x) => x.id === id);
    if (!t) return undefined;
    if (t.from) {
      quoted.push({ label: `${label}: ${t.name}`, text: quotedText(t) });
    } else {
      lines.push({ label: `${label}: ${t.name}`, oneTime: t.oneTime, monthly: t.monthly });
    }
    return t;
  };

  add('site', 'Website');
  add('care', 'Care');
  const seo = add('seo', 'Local SEO');
  if (seo) lines.push({ label: 'Local SEO setup', oneTime: PRICES.seo.setup });
  const ads = add('ads', 'Ads management');
  if (ads) {
    const platforms = ads.platforms ?? 1;
    lines.push({
      label: platforms > 1 ? `Ads Jumpstart, ${platforms} platforms` : 'Ads Jumpstart',
      oneTime: PRICES.ads.jumpstart * platforms,
    });
  }
  add('social', 'Social media');
  add('ai', 'AI automation');
  if (add('store', 'E-commerce')) {
    const c = PRICES.commerce.care;
    lines.push({ label: c.name, monthly: c.monthly });
  }

  const oneTime = lines.reduce((n, l) => n + (l.oneTime ?? 0), 0);
  const monthly = lines.reduce((n, l) => n + (l.monthly ?? 0), 0);
  return { lines, quoted, oneTime, monthly, firstYear: oneTime + monthly * 12 };
}

/** Read a selection from URL query values, keeping only tier ids that exist. */
export function parseSelection(params: Record<string, string | string[] | undefined>): Selection {
  const sel: Selection = {};
  for (const key of ESTIMATOR_KEYS) {
    const raw = params[ESTIMATOR_PARAM[GROUP[key]]];
    const id = Array.isArray(raw) ? raw[0] : raw;
    if (id && tiersFor(key).some((t) => t.id === id)) sel[key] = id;
  }
  return sel;
}

/** The query string for a selection (no leading "?"). */
export function selectionToQuery(sel: Selection): string {
  const q = new URLSearchParams();
  for (const key of ESTIMATOR_KEYS) {
    const id = sel[key];
    if (id) q.set(ESTIMATOR_PARAM[GROUP[key]], id);
  }
  return q.toString();
}

/** Starting choices: The System with the featured Care plan, unless the link chose something. */
export function defaultSelection(fromUrl: Selection): Selection {
  if (Object.keys(fromUrl).length > 0) {
    // A tier picked from a service page. A website gets the featured Care plan with it.
    return fromUrl.site && !fromUrl.care ? { ...fromUrl, care: featuredId('care') } : fromUrl;
  }
  return { site: featuredId('website') ?? tierOf('website', 'site').id, care: featuredId('care') };
}

function featuredId(group: ServiceKey): string | undefined {
  return TIERS[group].find((t) => t.featured)?.id;
}

/** A note for the totals when some items are quoted on a call. */
export function quotedNote(e: Estimate): string | null {
  return e.quoted.length === 0 ? null : `Plus ${e.quoted.length === 1 ? 'one item' : `${e.quoted.length} items`} quoted on a call, not in these totals.`;
}

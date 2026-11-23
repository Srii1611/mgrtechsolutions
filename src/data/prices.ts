/**
 * Every price on the site comes from this file, and only this file.
 *
 * To change a price, edit the number here and push. Nothing else needs to change.
 *
 * Rules for this file:
 *  - Plain numbers only (no "$", no commas). Formatting is done by `money()` below.
 *  - Never add a crossed-out price or a "% off".
 *  - `from: true` means the number is a starting point, not a fixed price. Such
 *    tiers are shown as "from $X" and never counted in an estimator total.
 *  - `includes` holds only facts stated by the owner for now. TODO(Srii): replace
 *    these short lists with the descriptions from his pricing proposal.
 *  - ASSUMPTION to confirm with Srii: Ads Jumpstart is per platform, so the
 *    "Both platforms" tier adds two Jumpstarts.
 *
 * A test (src/data/prices.test.ts) fails if a "$" followed by digits appears
 * anywhere in app/ or src/ outside this file.
 */

export type ServiceKey = 'website' | 'care' | 'seo' | 'ads' | 'social' | 'ai' | 'commerce';

export interface PriceTier {
  id: string;
  name: string;
  /** One-time amount (a fixed fee, or the setup fee when `monthly` is also set). */
  oneTime?: number;
  /** Monthly amount. */
  monthly?: number;
  /** Upper end of a monthly range ("$149–$199/mo"). Only with `from`. */
  monthlyTo?: number;
  /** The number is a starting point and the price is quoted. Never summed. */
  from?: boolean;
  featured?: boolean;
  /** Facts only, until Srii's descriptions arrive. */
  includes: readonly string[];
  /** Revision rounds. */
  revisions?: string;
  /** How long it takes. */
  launch?: string;
  /** Ad platforms covered, so the Jumpstart is charged once per platform. */
  platforms?: number;
  /** Extra line shown with the price (deposit terms, who it is for). */
  note?: string;
}

/** Launch times, used everywhere a page talks about how long a build takes. */
export const LAUNCH = {
  standardDays: 15,
  customWeeks: 5,
  standard: '15 days',
  custom: 'about 5 weeks',
} as const;

export const SITE_REVISIONS = { site: '1 round of revisions', system: '2 rounds of revisions', custom: 'Revision rounds by agreement' } as const;

export const PRICES = {
  website: {
    label: 'Website',
    billing: 'one-time',
    tiers: [
      {
        id: 'site',
        name: 'The Site',
        oneTime: 599,
        includes: [`Launches in ${LAUNCH.standard}`, SITE_REVISIONS.site],
        revisions: SITE_REVISIONS.site,
        launch: LAUNCH.standard,
      },
      {
        id: 'system',
        name: 'The System',
        oneTime: 999,
        featured: true,
        includes: [`Launches in ${LAUNCH.standard}`, SITE_REVISIONS.system],
        revisions: SITE_REVISIONS.system,
        launch: LAUNCH.standard,
      },
      {
        id: 'custom',
        name: 'Rebuild / Custom',
        oneTime: 1500,
        from: true,
        includes: [`Takes ${LAUNCH.custom}`, '30% deposit to start', SITE_REVISIONS.custom],
        revisions: SITE_REVISIONS.custom,
        launch: LAUNCH.custom,
        note: '30% deposit to start',
      },
    ],
  },
  care: {
    label: 'Care plans',
    billing: 'monthly',
    tiers: [
      { id: 'care', name: 'Care', monthly: 79, includes: ['Hosting is included'] },
      { id: 'followup', name: 'Care + Follow-Up', monthly: 149, featured: true, includes: ['Hosting is included', 'Everything in Care'] },
      { id: 'growth', name: 'Care + Growth', monthly: 299, includes: ['Hosting is included', 'Everything in Care'] },
    ],
  },
  seo: {
    label: 'Local SEO',
    billing: 'monthly',
    /** One-time setup, added once when any SEO plan is chosen. */
    setup: 399,
    tiers: [
      { id: 'map-pack', name: 'Map Pack', monthly: 249, includes: ['Billed monthly', 'One-time setup applies'] },
      { id: 'local-growth', name: 'Local Growth', monthly: 499, featured: true, includes: ['Billed monthly', 'One-time setup applies'] },
      { id: 'market-leader', name: 'Market Leader', monthly: 999, includes: ['Billed monthly', 'One-time setup applies'] },
    ],
  },
  ads: {
    label: 'Ads management',
    billing: 'monthly',
    /** One-time Jumpstart, per platform. Ad spend is always paid separately. */
    jumpstart: 375,
    tiers: [
      { id: 'one-platform', name: 'One platform', monthly: 299, platforms: 1, includes: ['Ad spend is extra', 'Jumpstart (one-time) applies'] },
      { id: 'both-platforms', name: 'Both platforms (Google + Meta)', monthly: 599, platforms: 2, includes: ['Ad spend is extra', 'Jumpstart (one-time) applies, per platform'] },
    ],
  },
  social: {
    label: 'Social media',
    billing: 'monthly',
    tiers: [
      { id: 'basic', name: 'Basic', monthly: 499, includes: ['On-site shoots', 'Billed monthly'] },
      { id: 'standard', name: 'Standard', monthly: 899, featured: true, includes: ['On-site shoots', 'Billed monthly'] },
      { id: 'growth', name: 'Growth', monthly: 1499, includes: ['On-site shoots', 'Billed monthly'] },
    ],
  },
  ai: {
    label: 'AI automation',
    billing: 'setup + monthly',
    tiers: [
      { id: 'missed-call', name: 'Missed-Call Rescue', oneTime: 199, monthly: 79, includes: ['Works with your current site'] },
      { id: 'follow-up', name: 'Lead Follow-Up System', oneTime: 599, monthly: 149, featured: true, includes: ['Works with your current site'] },
      { id: 'custom', name: 'Custom n8n workflows', oneTime: 1199, monthly: 149, monthlyTo: 199, from: true, includes: ['Works with your current site', 'Scoped and quoted on a call'] },
    ],
  },
  commerce: {
    label: 'E-commerce',
    billing: 'one-time + monthly',
    tiers: [
      { id: 'store', name: 'Store', oneTime: 1500, from: true, includes: ['Built on Medusa', `Takes ${LAUNCH.custom}`], launch: LAUNCH.custom },
      { id: 'store-pro', name: 'Store Pro', oneTime: 4999, from: true, includes: ['Built on Medusa', `Takes ${LAUNCH.custom}`], launch: LAUNCH.custom },
    ],
    /** Required with every store. */
    care: { id: 'commerce-care', name: 'Commerce care', monthly: 149, includes: ['Required with a store'] },
  },
  /** Work outside the agreed scope is always quoted first. */
  hourly: 50,
  /** Deposit on Rebuild / Custom, as a percent. */
  depositPercent: 30,
} as const satisfies {
  website: { label: string; billing: string; tiers: readonly PriceTier[] };
  care: { label: string; billing: string; tiers: readonly PriceTier[] };
  seo: { label: string; billing: string; setup: number; tiers: readonly PriceTier[] };
  ads: { label: string; billing: string; jumpstart: number; tiers: readonly PriceTier[] };
  social: { label: string; billing: string; tiers: readonly PriceTier[] };
  ai: { label: string; billing: string; tiers: readonly PriceTier[] };
  commerce: { label: string; billing: string; tiers: readonly PriceTier[]; care: PriceTier };
  hourly: number;
  depositPercent: number;
};

/** Tiers per service, for pages and the estimator. */
export const TIERS: Record<ServiceKey, readonly PriceTier[]> = {
  website: PRICES.website.tiers,
  care: PRICES.care.tiers,
  seo: PRICES.seo.tiers,
  ads: PRICES.ads.tiers,
  social: PRICES.social.tiers,
  ai: PRICES.ai.tiers,
  commerce: PRICES.commerce.tiers,
};

// ---------------------------------------------------------------------------
// Formatting. Pages call these; they never write a price themselves.
// ---------------------------------------------------------------------------

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

/** 599 -> "$599", 1500 -> "$1,500". */
export function money(n: number): string {
  return usd.format(n);
}

/** "$79/mo". */
export function perMonth(n: number): string {
  return `${money(n)}/mo`;
}

/** The price of one tier as a short line, e.g. "$599", "from $1,500", "$199 setup + $79/mo". */
export function priceLine(t: PriceTier): string {
  const oneTime = t.oneTime !== undefined ? money(t.oneTime) : undefined;
  const monthly =
    t.monthly !== undefined
      ? t.monthlyTo !== undefined
        ? `${money(t.monthly)}–${money(t.monthlyTo)}/mo`
        : perMonth(t.monthly)
      : undefined;
  const from = t.from ? 'from ' : '';
  if (oneTime && monthly) return `${from}${oneTime} setup + ${monthly}`;
  if (oneTime) return `${from}${oneTime}`;
  return `${from}${monthly ?? ''}`;
}

/** Find a tier by service and id. */
export function tierOf(service: ServiceKey, id: string): PriceTier {
  const t = TIERS[service].find((x) => x.id === id);
  if (!t) throw new Error(`Unknown tier ${service}/${id}`);
  return t;
}

/** Round to the nearest $50, for the quote form's "Around $X" budget labels. */
function nearest50(n: number): number {
  return Math.round(n / 50) * 50;
}

const siteTier = tierOf('website', 'site');
const systemTier = tierOf('website', 'system');
const customTier = tierOf('website', 'custom');

/** Budget choices on the quote form, built from the prices above. */
export const BUDGET_OPTIONS = [
  `Around ${money(nearest50(siteTier.oneTime ?? 0))}`,
  `Around ${money(nearest50(systemTier.oneTime ?? 0))}`,
  `Custom / ${money(customTier.oneTime ?? 0)}+`,
  'Monthly plans',
  'Not sure yet',
] as const;

/** Out-of-scope work, as a sentence fragment: "$50/hr". */
export const HOURLY_LINE = `${money(PRICES.hourly)}/hr`;

/** How a tier's price is laid out on a card: a small lead word, a big number, and a line under it. */
export function priceParts(t: PriceTier): { lead?: string; main: string; sub: string } {
  const lead = t.from ? 'From' : undefined;
  if (t.monthly !== undefined) {
    const main =
      t.monthlyTo !== undefined ? `${money(t.monthly)}–${money(t.monthlyTo)}` : money(t.monthly);
    const sub = t.oneTime !== undefined ? `per month, plus ${money(t.oneTime)} setup` : 'per month';
    return { lead, main, sub };
  }
  return { lead, main: money(t.oneTime ?? 0), sub: t.from ? 'quoted on a call' : 'one-time' };
}

/** Query-string names the estimator reads, one per service. */
export const ESTIMATOR_PARAM: Record<ServiceKey, string> = {
  website: 'site',
  care: 'care',
  seo: 'seo',
  ads: 'ads',
  social: 'social',
  ai: 'ai',
  commerce: 'store',
};

/** Link into the estimator with one tier pre-selected. */
export function estimatorHref(service: ServiceKey, tierId: string): string {
  return `/pricing?${ESTIMATOR_PARAM[service]}=${tierId}#estimator`;
}

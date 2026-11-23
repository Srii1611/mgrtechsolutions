import type { ServiceKey } from '@/data/prices';

/**
 * Shape of a per-service page (/services/<slug>). Every service page has the
 * same twelve sections in the same order, so this type has no optional
 * sections: a page that is missing one will not compile.
 *
 * Layout and animation come from the shared components in
 * src/components/services/service-page/, styled by the Website Design
 * stylesheet (every class prefixed `wd-`). Copy lives in one data file per
 * service in this folder.
 */

/** tier: 1 = every package, 2 = the upper packages, 3 = the top / custom package only. */
export type Tier = 1 | 2 | 3;

export type SceneKey = 'seo' | 'shop' | 'ads' | 'social' | 'auto';

export type ReadRef = { slug: string; label: string };

export interface ProblemItem {
  tag: string;
  title: string;
  peek: string;
  body: string;
  points: readonly string[];
  /** Only for a figure traced to a primary source. */
  sources?: readonly { label: string; href: string; note: string }[];
  read: ReadRef;
}

export interface IncludedCategory {
  title: string;
  desc: string;
  /** Single SVG path in a 48x48 box, drawn on when the card opens. */
  icon: string;
  read?: ReadRef;
  items: readonly (readonly [Tier, string])[];
}

export interface HowStep {
  title: string;
  text: string;
  we: readonly string[];
  you: readonly string[];
  get: readonly string[];
}

export interface PriceFact {
  title: string;
  text: string;
  kind: 'check' | 'x';
  items: readonly string[];
}

/** At most five phases: the day bar has five colours. */
export interface Phase {
  key: string;
  /** Label inside the bar, e.g. "WEEK 1". */
  bar: string;
  short: string;
  /** Relative width of the bar segment. */
  weight: number;
  /** Tick under the bar. */
  mark: string;
  /** Long label in the phase row, e.g. "Week 1". */
  days: string;
  title: string;
  text: string;
  time: string;
}

export interface ServicePageData {
  slug: string;
  meta: { title: string; description: string };
  hero: {
    breadcrumb: string;
    headline: string;
    headlineAccent: string;
    lede: string;
    secondaryCta: string;
    facts: readonly { title: string; text: string }[];
  };
  problem: { eyebrow: string; heading: string; lede: string; items: readonly ProblemItem[] };
  approach: {
    eyebrow: string;
    heading: string;
    accent: string;
    body: string;
    /** Four items, ticked on in order by the scene. */
    checks: readonly string[];
    scene: SceneKey;
  };
  commitments: {
    heading: string;
    lede: string;
    rows: readonly { tag: string; title: string; text: string; points: readonly string[] }[];
  };
  included: {
    eyebrow: string;
    heading: string;
    lede: string;
    noteLead: string;
    note: string;
    /** Labels for tier 2 and tier 3 items. Omit both when the service has no tiers. */
    tierLabels?: { 2?: string; 3?: string };
    categories: readonly IncludedCategory[];
  };
  how: {
    eyebrow: string;
    heading: string;
    lede: string;
    readLead: string;
    read: ReadRef;
    steps: readonly HowStep[];
  };
  pricing: {
    eyebrow: string;
    heading: string;
    lede: string;
    /** Which tiers in src/data/prices.ts this section shows. Prices are never written here. */
    service: ServiceKey;
    /** Further tier groups shown under the first (e.g. Care plans under a website). */
    alsoShow?: readonly ServiceKey[];
    facts: readonly PriceFact[];
    readLead: string;
    reads: readonly ReadRef[];
  };
  timeline: {
    eyebrow: string;
    heading: string;
    lede: string;
    phases: readonly Phase[];
    after: { days: string; title: string; text: string; time: string };
    callout: { lead: string; text: string };
  };
  success: {
    eyebrow: string;
    heading: string;
    lede: string;
    checklistTitle: string;
    doneText: string;
    /** Seven items. */
    checks: readonly { title: string; text: string }[];
    path: readonly { when: string; title: string; text: string }[];
    nope: { title: string; items: readonly string[] };
  };
  compare: {
    eyebrow: string;
    heading: string;
    lede: string;
    columns: readonly { name: string; sub: string }[];
    us: { name: string; sub: string };
    rows: readonly { label: string; cells: readonly string[]; us: string }[];
    note: string;
    reads: readonly ({ href: string; label: string } | ReadRef)[];
  };
  fit: {
    eyebrow: string;
    heading: string;
    lede: string;
    yesTitle: string;
    yes: readonly string[];
    noTitle: string;
    no: readonly string[];
  };
  industries: {
    eyebrow: string;
    heading: string;
    lede: string;
    note: string;
    items: readonly { tab: string; title: string; text: string; towns?: readonly string[]; points: readonly string[] }[];
  };
  guides: {
    eyebrow: string;
    heading: string;
    lede: string;
    /** Only a page without a Related guides entry (src/data/related-guides.ts) keeps these. */
    featured?: { slug: string; kicker: string; blurb: string };
    groups?: readonly { title: string; slugs: readonly string[] }[];
  };
  faq: {
    eyebrow: string;
    heading: string;
    lede: string;
    items: readonly { q: string; a: string; read?: ReadRef }[];
  };
  related: {
    eyebrow: string;
    heading: string;
    lede: string;
    items: readonly { title: string; text: string; href: string }[];
  };
  close: { eyebrow: string; heading: string; accent: string; body: string; emailCta: string };
}

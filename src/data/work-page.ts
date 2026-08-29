/**
 * Work page copy. Holds ONLY the work page's own copy — hero, legend strip
 * text, section headings, and the eighth-slot close. The project list itself
 * lives in @/data/home as WORK (3 live, 4 demo) — do not duplicate it here.
 *
 * Positioning rule (spec §4): nothing here may claim the company is one
 * person. First person singular is fine where Srii speaks to the reader.
 */

/** S1 — Hero */
export const WORK_HERO = {
  breadcrumb: 'WORK',
  eyebrow: '— THE WORK',
  headline: 'Real sites,',
  headlineAccent: 'honestly labeled.',
  lede:
    "Three live client sites and four demos built to show the approach. Every card on this page tells you which it is — because a portfolio you have to fact-check isn't worth much.",
  ticker: '3 LIVE · 4 DEMO · 15-DAY BUILDS · ALL HAND-CODED',
} as const;

/** S2 — Legend strip: sticky honest-label legend below the navbar. */
export const LEGEND_STRIP = {
  live: {
    label: 'LIVE',
    note: "A REAL CLIENT'S REAL WEBSITE, IN PRODUCTION",
  },
  demo: {
    label: 'DEMO',
    note: 'BUILT BY ME TO SHOW THE APPROACH — LABELED, ALWAYS',
  },
  ariaLabel: 'What live and demo mean',
} as const;

/** S3 — Per-case-block copy that isn't part of the project data itself. */
export const CASE_BLOCK = {
  liveLinkLabel: 'Visit live site',
  demoNote: 'DEMO BUILD — NOT A LIVE CLIENT SITE',
} as const;

/** S4 — "Your project here" close: the reserved eighth slot. Phone comes from SITE. */
export const EIGHTH_SLOT = {
  eyebrow: '— THE EIGHTH SLOT',
  headline: 'This spot is',
  headlineAccent: 'reserved for your business.',
  body:
    "Every project above started with the same 30-minute phone call. If you want a site that's honestly labeled, hand-coded, and built to ring — the next case study on this page could be yours.",
  callLabel: 'Call',
  secondaryCta: 'See pricing',
  secondaryHref: '/pricing',
  emptySlotSrLabel: 'Empty project slot reserved for a future client',
  bandLabel: 'PROJECT NO. 08',
} as const;

export const WORK_PAGE = {
  hero: WORK_HERO,
  legendStrip: LEGEND_STRIP,
  caseBlock: CASE_BLOCK,
  eighthSlot: EIGHTH_SLOT,
} as const;

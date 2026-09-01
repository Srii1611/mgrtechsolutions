/**
 * Social content production & management retainer (/pricing/social) copy.
 * Every string the page renders lives here.
 *
 * Scope note: this retainer is scoped for service-based trades clients.
 * E-commerce and retail are quoted individually (catalog size, platform,
 * volume), which is why the page routes those enquiries to a conversation
 * rather than showing a number.
 *
 * The source brief also carries internal sales strategy — the upsell
 * ladder, and the rule to cut scope rather than rate. That is deliberately
 * NOT on this page; it is guidance for whoever is on the call, not copy
 * for the prospect reading it.
 *
 * Positioning rule (spec §4): nothing here may claim the company is one
 * person. First person singular is fine where Srii speaks to the reader.
 */

/** S1 — Hero, carrying the price strip. */
export const SOCIAL_HERO = {
  breadcrumb: 'SOCIAL MEDIA',
  eyebrow: '— SOCIAL CONTENT RETAINER',
  headline: 'Your crew already does the impressive part.',
  headlineAccent: 'We make sure people see it.',
  lede:
    'Done-for-you social content: we come to the job site, shoot it, and post it all month. You never pick up a camera.',
  strip: {
    caption: 'MGRTECH social content retainer tiers',
    columns: ['Tier', 'Price', 'Posts per month'],
    rows: [
      { tier: 'Basic', price: '$499/mo', covers: '12 posts — 4 videos, 8 images, 1 shoot' },
      { tier: 'Standard', price: '$1,082/mo', covers: '20 posts — 8 videos, 12 images, 2 shoots' },
      { tier: 'Growth', price: '$1,500/mo', covers: '28 posts — 12 videos, 16 images, 2 shoots' },
    ],
    caveat:
      'Scheduling, captions, and community management are included in every tier. Prices are for service-based trades businesses; e-commerce and retail are scoped individually.',
    linkLabel: 'Compare the tiers',
    linkHref: '#compare',
  },
} as const;

/** S2 — Why it works. */
export const SOCIAL_APPROACH = {
  id: 'why-it-works',
  navLabel: 'Why it works',
  heading: 'A lead engine, not a media expense',
  paragraphs: [
    "For a trades business, social is where trust gets built before anyone picks up the phone. A homeowner comparing two roofers will look both up — and one of them has job-site reels, before-and-afters, and a post from this week, while the other hasn't posted since last spring. That gap decides more calls than most owners realise.",
  ],
  pull: 'Consistency is the whole product. A steady cadence signals an active, credible business; a dormant feed signals the opposite.',
  closing:
    "The hard part isn't knowing that — it's finding time to shoot and post while running crews all week. That's the part we take over: we show up to the site, capture the work, and handle everything from there.",
} as const;

export interface SocialTier {
  id: string;
  label: string;
  name: string;
  price: string;
  priceNote: string;
  pitch: string;
  featured: boolean;
  badge?: string;
  includes: string[];
  goodFor: string;
}

/** S3 — Comparison matrix. Rows are the spec lines, columns the tiers. */
export const SOCIAL_COMPARE = {
  id: 'compare',
  navLabel: 'Compare tiers',
  eyebrow: '— SIDE BY SIDE',
  heading: 'What each tier delivers',
  columns: ['Basic', 'Standard', 'Growth'],
  rows: [
    { label: 'Shoots per month', values: ['1', '2', '2'] },
    { label: 'Videos per month', values: ['4', '8', '12'] },
    { label: 'Images per month', values: ['8', '12', '16'] },
    { label: 'Total posts per month', values: ['12', '20', '28'] },
    {
      label: 'Scheduling, captions & community management',
      values: ['Included', 'Included', 'Included'],
    },
    { label: 'Monthly price', values: ['$499', '$1,082', '$1,500'] },
  ],
} as const;

/** S4 — The three tiers, in full. */
export const SOCIAL_TIERS = {
  id: 'tiers',
  navLabel: 'What each tier includes',
  eyebrow: '— WHAT EACH TIER INCLUDES',
  heading: 'Line by line, all three tiers',
  tiers: [
    {
      id: 'basic',
      label: 'BASIC',
      name: 'Basic',
      price: '$499/mo',
      priceNote: 'Billed monthly',
      pitch: 'One shoot a month, turned into three posts a week.',
      featured: false,
      includes: [
        '1 on-site shoot per month',
        '4 videos per month',
        '8 images per month',
        '12 total posts per month',
        'Captions written for every post',
        'Scheduling and publishing handled for you',
        'Community management — comments and messages answered',
      ],
      goodFor: 'GOOD FOR: PROVING THE MODEL BEFORE COMMITTING FURTHER',
    },
    {
      id: 'standard',
      label: 'STANDARD',
      name: 'Standard',
      price: '$1,082/mo',
      priceNote: 'Billed monthly',
      pitch: 'Two shoots a month and near-daily presence on the feed.',
      featured: true,
      badge: 'MOST CHOSEN',
      includes: [
        '2 on-site shoots per month',
        '8 videos per month',
        '12 images per month',
        '20 total posts per month',
        'Captions written for every post',
        'Scheduling and publishing handled for you',
        'Community management — comments and messages answered',
      ],
      goodFor: 'GOOD FOR: BUSINESSES READY TO BE SEEN EVERY WEEK, NOT EVERY MONTH',
    },
    {
      id: 'growth',
      label: 'GROWTH',
      name: 'Growth',
      price: '$1,500/mo',
      priceNote: 'Billed monthly',
      pitch: 'The fullest cadence — 28 posts a month, built for scale.',
      featured: false,
      includes: [
        '2 on-site shoots per month',
        '12 videos per month',
        '16 images per month',
        '28 total posts per month',
        'Captions written for every post',
        'Scheduling and publishing handled for you',
        'Community management — comments and messages answered',
      ],
      goodFor: 'GOOD FOR: ESTABLISHED BUSINESSES SCALING THEIR PRESENCE DELIBERATELY',
    },
  ] as SocialTier[],
} as const;

/** S5 — What sits outside every tier. */
export const SOCIAL_NOT_INCLUDED = {
  id: 'not-included',
  navLabel: "What's not included",
  heading: "What's not included, in any tier",
  intro:
    "So there are no surprises later, here is what sits outside this retainer. Any of it can be added — it is quoted separately, not folded in quietly.",
  items: [
    'Paid ad management and boosted posts',
    'Motion graphics and animated overlays',
    'A dedicated account strategist or monthly strategy calls',
    "Shoots or turnaround beyond the tier's included volume",
  ],
  outro:
    'Paid ads are covered by our separate SEO & marketing retainer, which handles Google Ads and Meta Ads management.',
  linkLabel: 'See the SEO & marketing packages',
  linkHref: '/pricing/seo',
} as const;

/** S6 — Closing CTA. */
export const SOCIAL_CLOSE = {
  eyebrow: '— GET STARTED',
  heading: "Let's get your work in front of people.",
  body: "Tell us what you do and where you work, and we'll recommend the cadence that fits — including the smaller tier when that is the honest place to start.",
} as const;

/** Section order, for the on-this-page jump list. */
export const SOCIAL_SECTIONS = [
  SOCIAL_APPROACH,
  SOCIAL_COMPARE,
  SOCIAL_TIERS,
  SOCIAL_NOT_INCLUDED,
] as const;

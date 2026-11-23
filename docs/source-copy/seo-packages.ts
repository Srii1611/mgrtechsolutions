/**
 * SEO & marketing packages (/pricing/seo) copy. Every string the page
 * renders lives here.
 *
 * Companion to /pricing/website-cost: that page is the one-time build,
 * this one is the ongoing monthly retainer.
 *
 * TWO ANSWERS ARE DELIBERATELY ABSENT FROM `SEO_FAQ` — see the note above
 * it. Do not invent replacements; they need Srii's decision.
 *
 * Positioning rule (spec §4): nothing here may claim the company is one
 * person. First person singular is fine where Srii speaks to the reader.
 */

/** S1 — Hero. Price strip and the ad-spend caveat both live in the hero so
 *  they land in the same glance, per the brief's hard requirement. */
export const SEO_HERO = {
  breadcrumb: 'SEO & MARKETING',
  eyebrow: '— MONTHLY MARKETING',
  headline: "Marketing built around one question:",
  headlineAccent: 'is the phone ringing?',
  lede: 'Two tiers. No vague "custom quote" language until you\'re ready for it.',
  strip: {
    caption: 'MGRTECH monthly marketing tiers',
    columns: ['Tier', 'Price', 'What it covers'],
    rows: [
      {
        tier: 'Standard',
        price: '$500/mo',
        covers: 'Full SEO + social media management',
      },
      {
        tier: 'Premium',
        price: '$999/mo',
        covers: 'Everything in Standard, plus Google Ads & Meta Ads management',
      },
    ],
    /** Must render directly under the strip — it is the page's single most
     *  consequential clarification. */
    caveat:
      'Ad spend for Google Ads and Meta Ads is separate from the Premium fee — you pay the platforms directly, and we take no markup on it. More on that below.',
    linkLabel: 'See what each tier includes',
    linkHref: '#tiers',
  },
} as const;

/** S2 — Opening. */
export const SEO_OPENING = {
  id: 'opening',
  navLabel: 'Why this page exists',
  heading: 'What this page does differently',
  paragraphs: [
    'Most marketing pricing pages either bury you in vague phrases like "custom strategy" with no number attached, or throw a wall of jargon at you and hope you don\'t ask what any of it means. This page does neither. Here\'s exactly what\'s in each tier, what it actually does for your business, and where the honest edges of the pricing are.',
  ],
} as const;

/** S3 — Approach. */
export const SEO_APPROACH = {
  id: 'approach',
  navLabel: 'Our approach',
  heading: "Rankings don't pay your bills. Calls do.",
  paragraphs: [
    'A lot of SEO and ads work gets sold on metrics that look good on a report but don\'t mean much to a trades business — impressions, follower counts, "top 3 rankings" for keywords nobody searches. None of that matters if the phone isn\'t ringing.',
  ],
  pull: 'Get found by someone who needs your service today, and give them a reason to call instead of the next name on the list.',
  closing:
    'That means SEO work that targets what people actually search when they need a plumber, roofer, or landscaper right now — not vanity keywords. It means social content that builds trust with people in your service area, not just engagement. And if you\'re on Premium, it means ad campaigns where the keyword someone searches, the ad they see, and the page they land on all say the same thing — misalignment between those three is where most wasted ad spend comes from.',
} as const;

export interface SeoTierGroup {
  heading: string;
  /** Optional lead-in above the checklist. */
  intro?: string;
  items: string[];
}

export interface SeoTier {
  id: string;
  label: string;
  name: string;
  price: string;
  priceNote: string;
  pitch: string;
  featured: boolean;
  badge?: string;
  groups: SeoTierGroup[];
}

/** S4 — The two tiers, in full. */
export const SEO_TIERS = {
  id: 'tiers',
  navLabel: 'What each tier includes',
  eyebrow: '— WHAT EACH TIER INCLUDES',
  heading: 'Line by line, both tiers',
  tiers: [
    {
      id: 'standard',
      label: 'STANDARD',
      name: 'Standard',
      price: '$500/mo',
      priceNote: 'Billed monthly',
      pitch: 'Full SEO and social media management, run every month — not a one-time setup.',
      featured: false,
      groups: [
        {
          heading: 'SEO',
          items: [
            'Keyword research for your priority service pages and content ideas',
            "Analysis of who's currently outranking you and why",
            'Technical SEO audit and fixes',
            'On-page SEO: title tags, meta descriptions, headers, website copy edits',
            'Google Analytics installation and configuration',
            'Local SEO: Google Business Profile management and business directory listings',
            'Website content development for new and existing pages',
            'Blogging',
            'Link-building',
            'Keyword tracking dashboard',
            'Monthly SEO reporting and a consulting call',
          ],
        },
        {
          heading: 'Social media management',
          items: [
            'Profile optimization',
            'Content creation and custom image design',
            'Drafting, scheduling, and publishing posts',
            'Audience engagement and community interaction',
            'Boosted post management',
            'Monthly reporting and a consulting call',
          ],
        },
      ],
    },
    {
      id: 'premium',
      label: 'PREMIUM',
      name: 'Premium',
      price: '$999/mo',
      priceNote: 'Management fee — ad spend is separate',
      pitch: 'Everything in Standard, plus Google Ads and Meta Ads management.',
      featured: true,
      badge: 'ADDS PAID ADS',
      groups: [
        {
          heading: 'Google Ads — Jumpstart',
          intro: 'Every engagement starts with a Jumpstart project to set the foundation:',
          items: [
            'Campaign audit (for existing advertisers)',
            'Keyword and competitor research',
            'Campaign structure built so your keyword, ad, and landing page all match',
            'Ad copywriting aligned to your target keywords',
            'Landing page review and recommendations',
            'Conversion tracking setup (calls, forms, and sales)',
            'Strategy session to discuss next steps',
          ],
        },
        {
          heading: 'Google Ads — every month',
          items: [
            'Search term review — cutting keywords that waste money',
            'Moving top performers into their own dedicated campaigns with their own budget',
            'Bid and budget management',
            'Ad copy testing and optimization',
            'Landing page optimization recommendations',
            'Conversion tracking monitoring and troubleshooting',
            'Monthly reporting focused on leads, cost per lead, and revenue — not just clicks and impressions',
          ],
        },
        {
          heading: 'Meta Ads (Facebook & Instagram) — Jumpstart',
          intro: 'Every engagement starts with a Jumpstart project:',
          items: [
            'Campaign audit (for existing advertisers)',
            'Audience and competitor research',
            'Campaign structure built around where someone is in their decision — a first-time visitor to your page needs a different message than someone who already requested a quote',
            'Ad creative development: images, video, copy',
            'Landing page review and recommendations',
            'Conversion tracking setup (forms, calls, sales)',
            'Strategy session to discuss next steps',
          ],
        },
        {
          heading: 'Meta Ads — every month',
          items: [
            'Audience management and funnel optimization by how warm or cold that audience is',
            'Creative testing and development',
            'Bid and budget management',
            'Ad targeting optimization across cold, warm, hot, and existing-customer audiences',
            'Landing page optimization recommendations',
            'Conversion tracking monitoring and troubleshooting',
            'Monthly reporting focused on leads, cost per lead, and revenue',
          ],
        },
      ],
    },
  ] as SeoTier[],
} as const;

/** S5 — Ad spend callout. Rendered as a bordered card, not body copy. */
export const SEO_AD_SPEND = {
  id: 'ad-spend',
  navLabel: 'Ad spend',
  heading: 'Ad spend: separate, always',
  intro:
    'The $999 Premium fee is our management fee. It does not include what you spend on Google Ads or Meta Ads themselves.',
  points: [
    {
      lead: 'You pay the ad platforms directly.',
      body: "You own the Google Ads and Meta Ads accounts. We're added as a manager, not the account holder.",
    },
    {
      lead: 'We take no markup or commission on ad spend.',
      body: 'Our only compensation is the management fee.',
    },
    {
      lead: 'If you ever leave, everything goes with you',
      body: '— the accounts, the data, the campaign history.',
    },
  ],
  outro:
    'This means your real monthly ads investment is $999 (management) plus whatever you set as your ad budget. As a rough guide, a combined budget under roughly $1,500 a month — management fee plus ad spend together — usually is not enough room for monthly management to do much. At that level, a one-time Jumpstart project alone is often the better starting point until your ad budget can grow.',
} as const;

/**
 * S6 — FAQ.
 *
 * TWO ANSWERS FROM THE DRAFT ARE INTENTIONALLY OMITTED, because both
 * shipped with an unresolved "[Note to Srii]" in place of the answer and
 * the brief forbids publishing them as-is:
 *
 *   1. "Why is Standard $500 for both SEO and social media management?"
 *      — needs a decision on whether that is a deliberate bundled-value
 *      offer or the price should move.
 *   2. "Is there a contract?" — needs the real terms (month-to-month vs.
 *      a minimum commitment).
 *
 * Add them back here once Srii has answered. Do not invent answers.
 */
export const SEO_FAQ = {
  id: 'faq',
  navLabel: 'FAQ',
  eyebrow: '— BEFORE YOU COMMIT',
  heading: 'Questions worth asking first',
  faqs: [
    {
      q: 'Does the Premium fee include my Google Ads or Meta Ads budget?',
      a: 'No. The $999 covers management only. Your ad spend is paid directly to Google and Meta, and you control that budget separately — see "Ad spend: separate, always" above.',
    },
    {
      q: 'Who owns my Google Business Profile, ad accounts, and social profiles?',
      a: 'You do, always. We manage them on your behalf, but nothing is locked to an account we control. If you ever leave, everything goes with you.',
    },
    {
      q: 'Do I need Premium, or is Standard enough?',
      a: "If you're building visibility and want your search and social presence handled consistently, Standard covers that. Premium makes sense once you want to actively buy your way into visibility today, rather than waiting for SEO and content to build over months — the two work well together rather than as a replacement for each other.",
    },
    {
      q: 'How long before I see results?',
      a: "SEO and content work is a compounding effort — most businesses start seeing real movement in rankings and traffic over three to six months, not weeks. Ads can generate leads within days of launching, since you're paying for placement rather than waiting to earn it.",
    },
  ],
} as const;

/** S7 — Closing CTA. */
export const SEO_CLOSE = {
  eyebrow: '— STRAIGHT ANSWER',
  heading: 'Get a straight answer on what fits your business.',
  body: "Tell us what you do and where you work, and we'll tell you which tier makes sense — including when the cheaper one is the honest answer, or when neither is yet.",
} as const;

/** Section order, for the on-this-page jump list. */
export const SEO_SECTIONS = [
  SEO_OPENING,
  SEO_APPROACH,
  SEO_TIERS,
  SEO_AD_SPEND,
  SEO_FAQ,
] as const;

/**
 * Website cost guide (/pricing/website-cost) copy. Every string the page
 * renders lives here.
 *
 * Companion to /pricing/website: that page sells the tiers, this one
 * explains what moves the number and what else to budget for.
 *
 * Positioning rule (spec §4): nothing here may claim the company is one
 * person. The DIY/freelancer/shop comparison deliberately contrasts
 * *process* against a lone freelancer's availability — never headcount.
 */

/**
 * S1 — Hero. The price strip renders inside the hero so it is on screen
 * before any body copy, per the brief's hard requirement.
 */
export const COST_HERO = {
  breadcrumb: 'WEBSITE PRICING',
  eyebrow: '— COST GUIDE',
  headline: 'What a website actually costs for a trades business —',
  headlineAccent: 'and why.',
  lede:
    "No ranges to guess at. Here's exactly what each tier includes and why it costs what it costs.",
  strip: {
    caption: 'MGRTECH build tiers',
    columns: ['Tier', 'Price', 'Best for'],
    rows: [
      {
        tier: 'Starter',
        price: '$499',
        bestFor:
          'A single-page site to get a new or small operation online and looking legitimate',
      },
      {
        tier: 'Growth',
        price: '$899',
        bestFor: 'An established business ready to actively generate and win more leads',
      },
      {
        tier: 'Custom',
        price: 'Quote-based',
        bestFor: 'Multi-crew operations needing booking, calculators, or custom integrations',
      },
    ],
    linkLabel: 'See what each tier includes',
    linkHref: '#tiers',
  },
} as const;

export interface WebsiteTier {
  /** Anchor id, used by the hero price strip's "See details" links. */
  id: string;
  label: string;
  name: string;
  price: string;
  /** Sub-line under the price — billing or scoping note. */
  priceNote: string;
  pitch: string;
  featured: boolean;
  /** Ribbon copy, featured tier only. */
  badge?: string;
  /** Lead-in above the checklist, e.g. "Everything in Starter, plus:". */
  inheritsFrom?: string;
  includes: string[];
  goodFor: string;
}

/**
 * S1b — the three build tiers, line by line. Merged in from the former
 * /pricing/website page so this guide is the single website-pricing page.
 */
export const COST_TIERS = {
  id: 'tiers',
  navLabel: 'What each tier includes',
  eyebrow: '— WHAT EACH TIER INCLUDES',
  heading: 'Line by line, no asterisks',
  /** Shown once, under all three tiers. */
  growthPlanNote:
    'Every build works alongside our monthly Growth Plan — ongoing local SEO, Google Business Profile management, and content, separate from the one-time build cost.',
  tiers: [
    {
      id: 'starter',
      label: 'STARTER',
      name: 'Starter',
      price: '$499',
      priceNote: 'One-time build cost',
      pitch: 'A single page that says who you are and makes the call easy.',
      featured: false,
      includes: [
        '3–4 sections — Home, Services, About, Contact — on a single page',
        'Primary CTA: click-to-call plus a quote request form',
        'Mobile responsive design',
        'Basic on-page SEO — titles, meta descriptions, alt text',
        'Google Business Profile link and map embed',
        '1 round of revisions',
        'You keep your own domain and hosting — we connect everything for you',
      ],
      goodFor: 'GOOD FOR: GETTING OFF A FACEBOOK PAGE AND ONTO SOMETHING REAL',
    },
    {
      id: 'growth',
      label: 'GROWTH',
      name: 'Growth',
      price: '$899',
      priceNote: 'One-time build cost',
      pitch:
        'The full build most contractors actually need — proof up front, service areas covered.',
      featured: true,
      badge: 'BEST FOR MOST CONTRACTORS',
      inheritsFrom: 'Everything in Starter, plus:',
      includes: [
        'Expanded multi-section build — reviews and proof placed early, not buried',
        'Process / how-it-works section',
        'Enhanced photo and video galleries',
        'Multiple service area coverage',
        'Enhanced schema markup and deeper on-page SEO',
        '2 rounds of revisions',
      ],
      goodFor: 'GOOD FOR: ESTABLISHED CREWS COMPETING ON MORE THAN ONE TOWN',
    },
    {
      id: 'custom',
      label: 'CUSTOM',
      name: 'Custom',
      price: 'Quote-based',
      priceNote: '20% deposit secures the start date',
      pitch: 'Scoped to the build you actually have in mind.',
      featured: false,
      inheritsFrom: 'Everything in Growth, plus:',
      includes: [
        'Custom interactive builds — scroll sequences, animated process timelines',
        'Custom integrations — booking, quote calculators, multi-page architecture',
        'Extended post-launch collaboration',
        'Scoped and quoted per project',
      ],
      goodFor: 'GOOD FOR: BUSINESSES WHOSE SITE HAS TO DO A JOB, NOT JUST EXIST',
    },
  ] satisfies WebsiteTier[],
} as const;

/** S2 — Opening hook. */
export const COST_OPENING = {
  id: 'two-numbers',
  navLabel: 'Two real numbers',
  heading: 'Two real numbers for the same three words',
  paragraphs: [
    "A website for a trades business can cost $499. It can also cost $8,000 or more. Both are real, because they're not paying for the same thing.",
    "If you've gotten quotes before, you've probably seen a $200 template site, a $3,000 agency quote, and maybe a friend's nephew who'll throw something together for free. This page breaks down what actually separates those numbers, so you know what you're paying for — not just what you're paying.",
  ],
} as const;

/** S3 — What changes the price. */
export const COST_DRIVERS = {
  id: 'what-changes-the-price',
  navLabel: 'What changes the price',
  heading: 'What changes the price',
  items: [
    {
      lead: 'How much of the site is actually built for your business, versus a template.',
      body: "A template already has its layout decided. A site built around your services, your service area, and your actual jobs takes real design time — that's most of the gap between a $200 template and a real build.",
    },
    {
      lead: 'What the site has to do, not just show.',
      body: 'A page with your phone number on it is cheap. A site that captures a lead through a form, links straight to your Google Business Profile, and is structured so it actually shows up when someone searches for your trade near them takes more work, and that work is what makes the site pay for itself.',
    },
    {
      lead: 'How much content has to be created, not just placed.',
      body: "Stock photos and placeholder text are free. Writing service pages that actually explain what you do, in a way that makes someone trust you enough to call, takes real time — and it's usually the single biggest quality difference between a cheap site and one that converts.",
    },
    {
      lead: 'Whether SEO is built in or bolted on later.',
      body: "A site that's structured for search from day one — proper headings, fast load times, your service area named clearly — costs a bit more upfront and saves you from needing a rebuild in a year. Skipping this at build time almost always means paying for it later, either in a rebuild or in ad spend to make up for it.",
    },
    {
      lead: "Who's building it.",
      body: "A DIY builder is free but takes your time and usually looks like it. A freelancer is moderate cost with real variance in quality and no backup if they disappear mid-project. A dedicated shop costs more because there's process behind it — a defined scope, a revision structure, and someone who's still around after launch.",
    },
  ],
} as const;

/** S4 — Costs beyond the build. */
export const COST_EXTRAS = {
  id: 'beyond-the-build',
  navLabel: 'Beyond the build',
  heading: "What's often left off the invoice",
  intro:
    "The build cost is rarely the last thing you'll spend. Here's what to budget for on top of it, regardless of who builds your site:",
  items: [
    { lead: 'Domain renewal', body: 'a small annual fee, usually $10–20 a year' },
    { lead: 'Hosting', body: 'varies by provider, typically $5–25 a month for a small business site' },
    { lead: 'Business email', body: 'if you want it tied to your domain instead of a personal Gmail' },
    { lead: 'Content updates', body: 'adding a new service, a new location, or new photos over time' },
    {
      lead: 'Ongoing SEO and Google Business Profile work',
      body: 'usually the biggest recurring line item if visibility matters to you, and a separate, ongoing service from the one-time build',
    },
    {
      lead: 'A redesign eventually',
      body: 'most business sites need a refresh every few years as expectations shift',
    },
  ],
  outro:
    "At MGRTECH, you keep your own domain and hosting from day one — we don't hold those accounts for you, we connect them at launch, and you're never dependent on us to keep your site online. The build cost and the ongoing Growth Plan (local SEO, Google Business Profile management, content) are always separate, so you always know which bucket a cost belongs to.",
} as const;

/** S5 — Payment structure and red flags. */
export const COST_PAYMENT = {
  id: 'payment-and-red-flags',
  navLabel: 'Payment & red flags',
  heading: 'Payment structure, and what to watch for',
  intro:
    "A fair structure protects both sides: a portion upfront to lock in the scope and start the work, the balance at delivery. Full payment demanded before you've seen a single draft is a reasonable thing to question. So is a vendor who goes quiet the moment the deposit clears — one of the most common complaints from business owners who've been burned before.",
  flagsHeading: 'Red flags worth watching for, regardless of price',
  flags: [
    "No written scope — if pages, features, and revision rounds aren't in writing, there's nothing to hold the project to later",
    'A quote with no specifics — a line item that just says "a website" is how a cheap number quietly grows once the extras start getting billed',
    "No mention of who owns the domain, hosting, or the finished files after handover — ask directly if it isn't addressed upfront",
    'Communication that disappears after payment',
  ],
  outro:
    'None of these are about price. A $3,000 build can have every one of these problems just as easily as a $300 one.',
} as const;

/** S6 — DIY vs freelancer vs dedicated shop. */
export const COST_COMPARISON = {
  id: 'diy-freelancer-shop',
  navLabel: 'DIY vs freelancer vs shop',
  heading: 'DIY, a freelancer, or a dedicated shop',
  columns: ['DIY (Wix, Squarespace)', 'Freelancer', 'MGRTECH'],
  rows: [
    {
      label: 'Typical cost',
      values: ['$0–500', '$300–3,000', '$499–$899 (custom scoped above that)'],
    },
    {
      label: 'Built around your trade',
      values: ['No — generic template', 'Depends on their experience', 'Yes'],
    },
    {
      label: "Who's accountable after launch",
      values: [
        'You',
        'Whoever built it, if they are still reachable',
        "A defined process, not an individual's availability",
      ],
    },
    {
      label: 'Ongoing SEO / GBP work',
      values: ['Not included', 'Rarely included', 'Available as a separate Growth Plan'],
    },
  ],
  outro:
    "DIY works if you need something online today and have time to manage it yourself. A freelancer can work well for a simple one-off site, though outcomes ride entirely on that individual's skill and availability. A dedicated shop costs a bit more because there's a defined scope and process behind it, and because the goal isn't just a site — it's a site built to bring in jobs.",
} as const;

/** S7 — Scenarios. */
export const COST_SCENARIOS = {
  id: 'scenarios',
  navLabel: 'Real scenarios',
  heading: 'Which tier real businesses land on',
  items: [
    {
      lead: 'Just getting the phone to ring.',
      body: 'A new or small operation — one crew, one or two services, no site yet — usually fits the Starter tier ($499): one clean page, your services, your service area, a way to call or request a quote. Enough to look legitimate and get found.',
    },
    {
      lead: 'Actively trying to win more jobs.',
      body: 'An established business with reviews, a track record, and a few service areas fits Growth ($899): a fuller build with proof — reviews, past work — placed early, a clear process section, and stronger on-page SEO. This is the right fit for most contractors who already have some reputation and want the site to work harder for them.',
    },
    {
      lead: 'Multi-crew or multi-location operations.',
      body: 'Businesses that need booking integration, a quote calculator, or a more complex multi-page structure move into Custom, scoped and quoted to the actual requirements.',
    },
  ],
} as const;

/** S8 — Expense or investment. */
export const COST_INVESTMENT = {
  id: 'expense-or-investment',
  navLabel: 'Expense or investment',
  heading: 'Is this an expense or an investment?',
  paragraphs: [
    "If one job from your area is worth $500, and the site brings in even one extra job a month, an $899 build has paid for itself within two months — and keeps paying after that. The math changes the other direction too: a cheap site with no SEO structure and no plan behind it often costs more in the long run, in the form of a rebuild plus the jobs you didn't get while it sat there not being found.",
    "Cost only becomes a pure expense when there's no plan behind the site — no way for people to find it, no reason to trust it, no clear way to call. That's true whether the site cost $200 or $8,000.",
  ],
} as const;

/**
 * S9 — FAQ. The tier questions and the cost questions merged into one
 * list, deduped — "how long does a build take" and "does this include
 * ongoing SEO" each appeared on both source pages.
 *
 * NOTE: the build-timeline answer's figures (Starter about a week, Growth
 * two to three weeks) stand in for the brief's "[X weeks]" placeholder and
 * need Srii's confirmation before this page is treated as
 * published-accurate.
 */
export const COST_FAQ = {
  id: 'faq',
  navLabel: 'FAQ',
  eyebrow: '— STILL WEIGHING IT',
  heading: 'Questions people ask before they commit',
  faqs: [
    {
      q: "What's the difference between the tiers?",
      a: "Scope, mostly. Starter is one page with the essentials — enough to be found and called. Growth adds the sections that do the convincing: proof placed early, your process, galleries, and coverage for every town you serve, plus deeper SEO. Custom is for builds that need something built specifically for them — interactive sections, booking, calculators, a real multi-page structure.",
    },
    {
      q: 'Why does the price range so much for what sounds like the same website?',
      a: "Because a website isn't one fixed product — it's a quote for someone's time and process. A lone freelancer and a shop with a defined build, revision, and SEO process will land on very different numbers for what sounds like the same brief. Ask what's actually included in the number, not just the number itself.",
    },
    {
      q: 'Is a $200–$300 template site enough?',
      a: "For a placeholder while you're getting started, maybe. For anything you're actively counting on to bring in jobs, a template with no SEO structure and no room to grow usually means paying again later — either for a rebuild or in the leads you lost while it wasn't showing up in search.",
    },
    {
      q: 'Do I need a domain or hosting already — and do I own the site afterwards?',
      a: "No, and yes. If you already have a domain we connect the site to it; if you don't, we'll guide you through picking one. Either way it stays in your name, on your account — we don't host the site or manage your renewals, so there's nothing to transfer later and nothing you're locked into.",
    },
    {
      q: "What's included, and what usually costs extra?",
      a: "Each tier's checklist above is the whole of what's included. What's commonly separate: professional photography, more revision rounds than the tier includes, and any ongoing SEO or content work — that's the Growth Plan, not part of the one-time build.",
    },
    {
      q: 'How long does a build take?',
      a: 'Starter builds typically move in about a week once your content is in hand, and Growth builds in roughly two to three weeks. Custom builds depend on scope and are timed once requirements are locked. The fastest way to hit a launch date is having your service list, photos, and any specific requests ready before the build starts — most delays come from waiting on content, not from the build itself.',
    },
    {
      q: 'What happens after revisions run out?',
      a: "Nothing breaks and nothing gets held hostage. Additional changes are quoted per request before any work starts, so you always approve the number first. Most sites don't need them — the included rounds exist because that's usually where a build lands.",
    },
    {
      q: 'Does this include ongoing SEO or Google Business Profile management?',
      a: "No — that's the separate Growth Plan retainer. The tiers on this page cover the one-time build only. They pair well, but you're never required to take one to get the other.",
    },
    {
      q: 'Can I upgrade from Starter to Growth later?',
      a: 'Yes. The Starter build carries over — you pay the difference between the tiers plus anything genuinely new in scope, not the full Growth price over again. Plenty of businesses start at Starter and move up once the calls start.',
    },
  ],
} as const;

/** S10 — Closing CTA. */
export const COST_CLOSE = {
  eyebrow: '— NO RANGES',
  heading: 'Get a straight answer, not a range.',
  body: "Tell us what you do and where you work, and you'll get the actual number for your build — including when the cheaper tier is the honest answer.",
} as const;

/** Section order, for the on-this-page jump list. */
export const COST_SECTIONS = [
  COST_TIERS,
  COST_OPENING,
  COST_DRIVERS,
  COST_EXTRAS,
  COST_PAYMENT,
  COST_COMPARISON,
  COST_SCENARIOS,
  COST_INVESTMENT,
  COST_FAQ,
] as const;

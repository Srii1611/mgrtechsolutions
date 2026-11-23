/**
 * Pricing page copy. Every string the pricing page renders lives here.
 *
 * Positioning rule (spec §4): nothing here may claim the company is one
 * person. First person singular is fine where Srii speaks to the reader.
 */

/** S1 — Hero */
export const PRICING_HERO = {
  breadcrumb: 'PRICING',
  eyebrow: '— PRICING',
  headline: 'The price is on the website.',
  headlineAccent: 'Imagine that.',
  lede:
    "Most web studios make you sit through three calls before they'll say a number. Here are mine — starting points, in writing, with exactly what's included. Your final quote comes after one call, and it won't drift.",
  ticker: 'NO HOURLY METERS · NO SURPRISE INVOICES · QUOTE LOCKED IN WRITING',
} as const;

/** S2 — The Packages: three plans. */
export const PACKAGES = {
  plans: [
    {
      label: 'THE SITE',
      name: 'The Site',
      pitch: 'A hand-coded website built to be found and chosen.',
      price: 'FROM $X,XXX',
      includes: [
        'Custom design — no templates, ever',
        'Up to X pages, structured for local search',
        'Mobile-first, loads in under 2 seconds',
        'Google Business Profile setup',
        'Domain, hosting & SSL setup (in your name)',
        'Launch in 15 days',
      ],
      goodFor: 'GOOD FOR: BUSINESSES STARTING FROM ZERO OR REPLACING A PLACEHOLDER',
      featured: false,
    },
    {
      label: 'THE SYSTEM',
      name: 'The System',
      pitch: 'The site plus the content and follow-up that make it ring.',
      price: 'FROM $X,XXX',
      includes: [
        'Everything in The Site',
        'Content plan + written pages & articles',
        'Contact forms with instant auto-reply',
        'AI follow-up automation for every inquiry',
        '30 days of post-launch support',
      ],
      goodFor: 'GOOD FOR: BUSINESSES THAT WANT THE PHONE TO RING, NOT JUST A SITE TO EXIST',
      featured: true,
    },
    {
      label: 'THE REBUILD',
      name: 'The Rebuild',
      pitch: 'Your existing site, taken apart and rebuilt properly.',
      price: 'FROM $X,XXX',
      includes: [
        "Full audit of your current site (what's working, what's costing you)",
        'Content salvage — the good stuff comes along, rewritten',
        'New hand-coded build',
        "Redirects & SEO preservation — you don't lose your rankings",
        'Everything in The Site',
      ],
      goodFor: "GOOD FOR: BUSINESSES WITH AN OLD SITE THAT'S QUIETLY COSTING THEM CALLS",
      featured: false,
    },
  ],
  footnote:
    "PRICES ARE STARTING POINTS. YOUR FINAL NUMBER DEPENDS ON SCOPE — AND IT'S LOCKED IN WRITING BEFORE ANY WORK BEGINS.",
} as const;

/** S3 — The Value Anchor: itemized "receipt" of the à-la-carte route. */
export const VALUE_ANCHOR = {
  eyebrow: '— WHAT THE PIECES COST ELSEWHERE',
  headline: 'Priced like a package,',
  headlineAccent: 'because it is one.',
  body:
    "You could assemble all of this yourself from four different providers. People do — and then they spend months coordinating it. Here's the honest math of the à-la-carte route.",
  receiptLabel: 'THE À-LA-CARTE ROUTE',
  rows: [
    { label: 'CUSTOM WEBSITE DESIGN & BUILD', price: '$X,XXX+' },
    { label: 'COPYWRITING & CONTENT', price: '$X,XXX+' },
    { label: 'SEO SETUP & LOCAL STRUCTURE', price: '$XXX+' },
    { label: 'AUTOMATION / FOLLOW-UP TOOLS', price: '$XX/MO+' },
    { label: 'YOUR HOURS COORDINATING IT ALL', price: '???' },
  ],
  totalLabel: 'ONE CALL, ONE CONTACT, ONE PRICE',
  totalPrice: '$X,XXX',
} as const;

/** S4 — What's Always Included: 3×2 grid of non-negotiable tiles. */
export const ALWAYS_INCLUDED = {
  eyebrow: '— NON-NEGOTIABLES',
  headline: 'Included in',
  headlineAccent: 'everything I build.',
  tiles: [
    { icon: 'Code2', label: 'HAND-CODED', line: 'No templates, no page builders, no rented themes.' },
    { icon: 'KeyRound', label: 'YOU OWN IT', line: 'Domain, content, code. Leave anytime, take everything.' },
    { icon: 'Smartphone', label: 'MOBILE-FIRST', line: 'Built for the phone your customer is holding.' },
    { icon: 'Gauge', label: 'FAST BY DEFAULT', line: 'Under two seconds, or I keep working on it.' },
    { icon: 'MessageSquare', label: 'PLAIN ENGLISH', line: "No jargon. You'll always know what's happening and why." },
    { icon: 'Phone', label: 'ONE PHONE NUMBER', line: 'Questions after launch? Call the person who built it.' },
  ],
} as const;

/**
 * S5 — Pricing FAQ: sticky intro column + 5-question accordion.
 * "Why are you cheaper than an agency?" answer is rewritten per the plan's
 * Required rewrites table — the prior copy asserted a headcount of one.
 */
export const PRICING_FAQ = {
  eyebrow: '— MONEY, PLAINLY',
  headline: 'The awkward questions,',
  headlineAccent: 'answered up front.',
  intro: 'More questions? The full FAQ covers timing, ownership, hosting, and everything else.',
  linkLabel: 'All 12 questions',
  linkHref: '/faq',
  faqs: [
    {
      q: "Why 'starting at'? Why not one flat number?",
      a: "Because a 5-page site for a plasterer and a 20-page site for a retailer aren't the same job. The starting price is real — many projects land at or near it — and your exact number is locked in writing after one call.",
    },
    {
      q: 'Are there ongoing costs?',
      a: "Hosting and your domain (a few dollars a month, in your name), plus any support plan you choose. You'll know every recurring number before launch, not after.",
    },
    {
      q: 'Do you require a deposit?',
      a: 'A portion up front to hold your build slot, the rest at launch. Exact terms come with your written quote — no surprises.',
    },
    {
      q: "What if I don't like the design?",
      a: "That's what week 2 is for. You get a real design to react to and a full revision round. If we truly can't get there, you don't pay for work you won't use.",
    },
    {
      q: 'Why are you cheaper than an agency?',
      a: "No office, no account managers, no layers of overhead between you and the work. You're paying for the site, not the org chart.",
    },
  ],
} as const;

/**
 * Closing CTA.
 * CONTROLLER-AUTHORED copy, pending owner approval. Srii should review.
 */
export const PRICING_CLOSE = {
  eyebrow: '— YOUR NUMBER',
  heading: 'Get your actual price.',
  body: 'The figures above are starting points. One 60-minute call and you get a firm quote in writing — no hourly meters, no surprise invoices.',
} as const;

export const PRICING_PAGE = {
  hero: PRICING_HERO,
  packages: PACKAGES,
  valueAnchor: VALUE_ANCHOR,
  alwaysIncluded: ALWAYS_INCLUDED,
  faq: PRICING_FAQ,
  close: PRICING_CLOSE,
} as const;

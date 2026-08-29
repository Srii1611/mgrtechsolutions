/**
 * Services page copy. Every string the services page renders lives here.
 *
 * Positioning rule (spec §4): nothing here may claim the company is one
 * person. First person singular is fine where Srii speaks to the reader.
 */

/** S1 — Hero */
export const SERVICES_HERO = {
  breadcrumb: 'SERVICES',
  eyebrow: '— SERVICES',
  headline: 'One system.',
  headlineAccent: 'Three parts that need each other.',
  lede:
    "You can buy a website anywhere. What actually makes the phone ring is a site, the content that builds trust, and the follow-up that catches every inquiry — built together, by the person who answers the phone.",
} as const;

/** S2 — System overview strip: three anchor cards into the pillars. */
export const SYSTEM_STRIP = {
  parts: [
    {
      index: '01',
      name: 'Website Design & Build',
      line: 'Hand-coded, fast, built to be found.',
      target: '#websites',
    },
    {
      index: '02',
      name: 'Content & SEO',
      line: 'Pages and articles that answer real questions.',
      target: '#content',
    },
    {
      index: '03',
      name: 'AI Automation',
      line: 'Follow-up that never sleeps.',
      target: '#automation',
    },
  ],
} as const;

/** S3 — Pillar 01: Website Design & Build */
export const PILLAR_WEBSITES = {
  eyebrow: 'PART 01',
  headline: "A website that's an asset,",
  headlineAccent: 'not a brochure.',
  body:
    'Every site I build is hand-coded in modern frameworks — no templates, no page builders, no rented themes. That means it loads fast, ranks clean, and you own every line of it.',
  checklist: [
    'Custom design — built for your business, not a theme with your logo on it',
    'Hand-coded with Next.js-style modern tooling — fast on any phone',
    'Local SEO structure baked in: towns, services, schema markup',
    'Google Business Profile setup and connection',
    'Domain, hosting, SSL — set up, explained, and in your name',
    'Launch in 15 days — five weeks for e-commerce — with a private preview along the way',
  ],
  specSheetLabel: 'SPEC SHEET',
  specRows: [
    ['STACK', 'HAND-CODED, MODERN FRAMEWORK'],
    ['TEMPLATES', 'NONE — EVER'],
    ['LOAD TIME', 'UNDER 2 SECONDS, MOBILE'],
    ['OWNERSHIP', '100% YOURS'],
    ['TIMELINE', '5 WEEKS, CALL TO LAUNCH'],
    ['WHO BUILDS', 'THE PERSON YOU CALL'],
  ],
} as const;

/** S4 — Connector statement between pillar 01 and 02 (dark). */
export const CONNECTOR_1 = {
  text: 'EVERYTHING FEEDS THE PHONE',
  dark: true,
} as const;

/** S5 — Pillar 02: Content & SEO */
export const PILLAR_CONTENT = {
  eyebrow: 'PART 02',
  headline: 'Content that answers the questions',
  headlineAccent: 'customers ask before they call.',
  body:
    'People search their questions long before they search your name. The business that answers those questions clearly is the one that gets found — by Google, and increasingly by AI assistants. I plan and write that content with you.',
  checklist: [
    'A content plan built from the questions your customers actually ask',
    'Service pages written in plain English — not keyword soup',
    'Articles that build trust and keep bringing in search traffic',
    'On-page SEO done properly: titles, structure, internal links',
    "Social content guidance so your channels don't go quiet",
  ],
  fanCards: [
    {
      tag: 'LOCAL SEO',
      title: 'How much does a plastering job cost in Framingham?',
      meta: '6 MIN READ · ANSWERS A REAL SEARCH',
    },
    {
      tag: 'LEAD GENERATION',
      title: 'Why your website never rings — and the 3 fixes',
      meta: '5 MIN READ · BUILDS TRUST',
    },
    {
      tag: 'AI & SEARCH',
      title: 'Getting found when customers ask AI, not Google',
      meta: '7 MIN READ · KEEPS TRAFFIC COMING',
    },
  ],
} as const;

/** S6 — Connector statement between pillar 02 and 03 (light). */
export const CONNECTOR_2 = {
  text: 'NO LEAD GETS FORGOTTEN',
  dark: false,
} as const;

/** S7 — Pillar 03: AI Automation */
export const PILLAR_AUTOMATION = {
  eyebrow: 'PART 03',
  headline: 'AI automation means',
  headlineAccent: 'no lead gets forgotten.',
  body:
    "Strip away the buzzword and it's simple: when someone reaches out, they hear back in seconds — even at 11 p.m., even on a job site, even on vacation. Inquiries get acknowledged, sorted, and followed up automatically, and you get a clean summary instead of a missed opportunity.",
  checklist: [
    'Contact forms that actually reach you — and confirm instantly to the customer',
    'Automatic first replies, so every inquiry feels answered',
    "Follow-up sequences for quotes and estimates that haven't heard back",
    'Lead summaries delivered to you in plain English',
    'Built on your site, under your control — no mystery subscriptions',
  ],
  timelineLabel: 'INQUIRY TIMELINE',
  timeline: [
    { time: '11:04 PM', event: 'NEW INQUIRY', detail: '"Need an estimate for a bathroom retile"' },
    { time: '11:04 PM', event: 'AUTO-REPLY SENT', detail: '"Thanks! You\'ll hear from us by morning."' },
    { time: '11:04 PM', event: 'NOTIFICATION TO YOU', detail: 'summary in plain English' },
    { time: 'NEXT AM', event: 'YOU CALL BACK', detail: 'lead is warm, not gone' },
  ],
} as const;

/** S8 — Who it's for: four audience segments. */
export const WHO_ITS_FOR = {
  eyebrow: '— WHO I BUILD FOR',
  headline: 'Local businesses that',
  headlineAccent: 'live on the phone.',
  groups: [
    {
      icon: 'Wrench',
      label: 'TRADES & CONTRACTORS',
      line: 'Plumbers, electricians, plasterers, tilers — businesses where one call is a real job.',
    },
    {
      icon: 'Car',
      label: 'AUTO & MOTORSPORTS',
      line: 'Shops and parts suppliers where reputation and photos do the talking.',
    },
    {
      icon: 'Store',
      label: 'RETAIL & E-COMMERCE',
      line: 'Boutiques and local shops that need to look as good online as they do in person.',
    },
    {
      icon: 'MapPin',
      label: 'LOCAL SERVICES',
      line: "Cleaners, landscapers, repair — anyone whose customers start with 'near me.'",
    },
  ],
} as const;

/** S9 — Close (dark CTA, low-commitment variant). Phone comes from SITE. */
export const SERVICES_CLOSE = {
  eyebrow: '— FREE 10-MINUTE SITE REVIEW',
  headline: "Not sure which part you're missing?",
  body:
    "Send me your URL. I'll tell you the 3 things most likely costing you calls — free, honest, one email.",
  callLabel: 'Call',
  secondaryCta: 'Free site review',
  secondaryHref: '/contact',
} as const;

export const SERVICES = {
  hero: SERVICES_HERO,
  systemStrip: SYSTEM_STRIP,
  pillarWebsites: PILLAR_WEBSITES,
  connector1: CONNECTOR_1,
  pillarContent: PILLAR_CONTENT,
  connector2: CONNECTOR_2,
  pillarAutomation: PILLAR_AUTOMATION,
  whoItsFor: WHO_ITS_FOR,
  close: SERVICES_CLOSE,
} as const;

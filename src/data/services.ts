/**
 * Services page copy. Every string the services page renders lives here.
 *
 * Six topics, one page, six anchor sections (spec follow-up to the original
 * 3-pillar model): Web Design & Development, SEO, E-commerce, Google Ads +
 * PPC, Social Media Management, and AI Automation. The pricing content in
 * the last four pillars is folded in from the retired /pricing route tree
 * (now under docs/source-copy/, no longer part of the build).
 *
 * Positioning rule (spec §4): nothing here may claim the company is one
 * person. First person singular is fine where Srii speaks to the reader.
 *
 * Prices are not written here: they come from src/data/prices.ts.
 */
import { LAUNCH, PRICES, perMonth, priceLine, tierOf } from '@/data/prices';

/** S1 — Hero */
export const SERVICES_HERO = {
  breadcrumb: 'SERVICES',
  headline: 'Everything you need',
  headlineAccent: 'to get more calls, with one point of contact.',
  lede:
    'A website, being found on Google, paid ads, social media and automatic replies all work best when they are planned together. Here is what each one is and what you get.',
} as const;

/** S2 — Overview strip: six anchor cards into the pillars. */
export const SYSTEM_STRIP = {
  cta: 'See how it works',
  parts: [
    {
      index: '01',
      icon: 'web',
      name: 'Website Design & Development',
      line: 'A fast website made for your business.',
      target: '/services/website-design',
    },
    {
      index: '02',
      icon: 'seo',
      name: 'SEO (Found on Google)',
      line: 'Be found when people search on Google.',
      target: '/services/seo',
    },
    {
      index: '03',
      icon: 'shop',
      name: 'E-commerce',
      line: 'An online store that takes orders any hour.',
      target: '/services/ecommerce',
    },
    {
      index: '04',
      icon: 'ads',
      name: 'Google Ads (Paid Ads)',
      line: 'Ads that put you in front of customers now.',
      target: '/services/google-ads',
    },
    {
      index: '05',
      icon: 'social',
      name: 'Social Media Management',
      line: 'Regular posts that show you are active.',
      target: '/services/social-media',
    },
    {
      index: '06',
      icon: 'auto',
      name: 'Automatic Replies',
      line: 'Every inquiry gets a reply right away.',
      target: '/services/ai-automation',
    },
  ],
} as const;

/** S3 — Pillar 01: Website Design & Development */
export const PILLAR_WEB_DESIGN = {
  eyebrow: 'PART 01 · WEBSITE DESIGN & DEVELOPMENT',
  headline: 'A website that brings you customers,',
  headlineAccent: 'not just a page that exists.',
  body:
    'I build every site from scratch for your business, with no ready-made templates. It loads quickly on a phone, it is easy for Google to read, and you own all of it.',
  checklist: [
    'Custom design, built for your business, not a theme with your logo on it',
    'Hand-coded with Next.js-style modern tooling, fast on any phone',
    'Local SEO structure baked in: towns, services, schema markup',
    'Google Business Profile setup and connection',
    'Domain and SSL: set up, explained, and in your name. Hosting comes with the Care plans',
    `Launch in ${LAUNCH.standard} (${LAUNCH.custom} for rebuilds and e-commerce), with a private preview along the way`,
  ],
  specSheetLabel: 'SPEC SHEET',
  specRows: [
    ['STACK', 'HAND-CODED, MODERN FRAMEWORK'],
    ['TEMPLATES', 'NONE, EVER'],
    ['LOAD TIME', 'UNDER 2 SECONDS, MOBILE'],
    ['OWNERSHIP', '100% YOURS'],
    ['TIMELINE', `${LAUNCH.standard.toUpperCase()}, CALL TO LAUNCH`],
    ['WHO BUILDS', 'THE PERSON YOU CALL'],
  ],
  packagesLabel: 'STARTING PACKAGES',
  packagesNote: "PRICES ARE STARTING POINTS. YOUR FINAL NUMBER IS LOCKED IN WRITING BEFORE ANY WORK BEGINS.",
  packages: [
    {
      name: 'The Site',
      price: priceLine(tierOf('website', 'site')).toUpperCase(),
      pitch: 'A hand-coded website built to be found and chosen.',
      includes: [
        'Custom design, no templates, ever',
        'Mobile-first, loads in under 2 seconds',
        'Google Business Profile setup',
        'Launch in 15 days',
      ],
      goodFor: 'GOOD FOR: STARTING FROM ZERO OR REPLACING A PLACEHOLDER',
      featured: false,
    },
    {
      name: 'The System',
      price: priceLine(tierOf('website', 'system')).toUpperCase(),
      pitch: 'The site plus the content and follow-up that make it ring.',
      includes: [
        'Everything in The Site',
        'Content plan + written pages & articles',
        'Contact forms with instant auto-reply',
        'AI follow-up automation for every inquiry',
      ],
      goodFor: 'GOOD FOR: BUSINESSES THAT WANT THE PHONE TO RING, NOT JUST A SITE TO EXIST',
      featured: true,
    },
    {
      name: 'The Rebuild',
      price: priceLine(tierOf('website', 'custom')).toUpperCase(),
      pitch: 'Your existing site, taken apart and rebuilt properly.',
      includes: [
        'Full audit of your current site',
        'Content salvage: the good stuff comes along, rewritten',
        "Redirects & SEO preservation, so you don't lose your rankings",
        'Everything in The Site',
      ],
      goodFor: "GOOD FOR: AN OLD SITE THAT'S QUIETLY COSTING YOU CALLS",
      featured: false,
    },
  ],
  sceneChecks: [
    "Designed for your business, no templates",
    "Loads fast on any phone",
    "Shows up for your town and trade",
    "Domain in your name, hosting with the Care plans",
  ],
  fanCards: [
    {
      tag: 'Website speed',
      title: 'Why a slow site costs you the call',
      example: "A customer on a phone leaves before the page loads",
      slug: 'why-website-speed-matters',
      descriptor: 'Why fast matters',
    },
    {
      tag: 'The process',
      title: 'What actually happens during a website build',
      example: "From first call to launch day, no surprises",
      slug: 'what-to-expect-website-build-process',
      descriptor: 'Know the steps',
    },
    {
      tag: 'Cost',
      title: 'What a bargain website really costs',
      example: "The template that never brings in a call",
      slug: 'real-cost-cheap-website',
      descriptor: 'Avoid the trap',
    },
  ],
} as const;

/** S5 — Pillar 02: SEO */
export const PILLAR_SEO = {
  eyebrow: 'PART 02 · BEING FOUND ON GOOGLE (SEO)',
  headline: 'Be the business people find',
  headlineAccent: 'when they search on Google.',
  body:
    'Customers search long before they call. SEO (search engine optimization) means the pages and articles on your site answer their questions, so Google shows you and not your competitor. I plan and write them with you.',
  checklist: [
    'A content plan built from the questions your customers actually ask',
    'Service pages written in plain English, not keyword soup',
    'Articles that build trust and keep bringing in search traffic',
    'On-page SEO done properly: titles, structure, internal links',
    'Technical SEO audit and fixes, plus Google Business Profile management',
    'Monthly reporting, so you see what actually moved',
  ],
  /**
   * Each card links to a real, published post (checked against
   * content/blog/*.md before writing this). `slug` resolves the post via
   * `getPost()` in `src/lib/blog.ts` so the title and read time shown always
   * match the live article, and `tag`/`title`/`descriptor` are curated
   * card copy rather than the full (longer) article title.
   */
  sceneChecks: [
    "A page for each service and town",
    "Articles that answer customer questions",
    "Your Google Maps listing kept current",
    "A monthly report in plain English",
  ],
  fanCards: [
    {
      tag: 'Local search',
      title: 'What do your customers actually type into Google?',
      example: '"best plastering job in Framingham"',
      slug: 'local-keyword-research-for-service-businesses',
      descriptor: 'Answers a real search',
    },
    {
      tag: 'More calls',
      title: 'Why your phone stopped ringing, and 5 fixes',
      example: 'A customer already comparing quotes calls the business that answers first',
      slug: '5-reasons-losing-leads-online',
      descriptor: 'Builds trust',
    },
    {
      tag: 'AI search',
      title: 'Getting found when customers ask AI, not Google',
      example: '"Who\'s a good electrician near me?" asked straight to ChatGPT',
      slug: 'how-chatgpt-finds-businesses',
      descriptor: 'Keeps traffic coming',
    },
  ],
} as const;

/**
 * S7 — Pillar 03: E-commerce.
 *
 * DRAFTED COPY. No existing source material anywhere in the codebase (only
 * a passing industry tag and a build-timeline caveat). Written in the
 * site's voice, modeled on the other pillars. Flagged for Srii's review
 * before publishing anything more specific (pricing, platform names).
 */
export const PILLAR_ECOMMERCE = {
  eyebrow: 'PART 03 · E-COMMERCE',
  headline: 'An online store',
  headlineAccent: 'that takes orders any hour.',
  body:
    'Selling products online is different from a regular website. I build the whole store: your products, a safe checkout, and shipping and tax. I also set it up so each product can show up on its own in Google.',
  checklist: [
    'Product catalog built to scale, from a dozen items to a full inventory',
    'Secure checkout and payment processing, set up in your name',
    'Shipping, tax, and inventory rules configured for how you actually sell',
    'Product pages structured for search, not just browsing',
    'Mobile checkout that stays under 2 seconds, cart included',
  ],
  specSheetLabel: 'HOW IT WORKS',
  specRows: [
    ['STACK', 'SAME HAND-CODED APPROACH, STORE-BUILT'],
    ['TIMELINE', '~5 WEEKS, CALL TO LAUNCH'],
    ['PRICING', 'QUOTED TO YOUR CATALOG, NOT A FLAT RATE'],
    ['OWNERSHIP', '100% YOURS, INCLUDING PAYMENT ACCOUNTS'],
  ],
  sceneChecks: [
    "Your products set up and easy to browse",
    "Safe checkout, payments go to you",
    "Shipping, tax and stock set up",
    "Each product can be found on Google",
  ],
  fanCards: [
    {
      tag: 'Phones',
      title: 'Why your store has to work on a phone first',
      example: "Most shoppers browse and buy on their phone",
      slug: 'mobile-first-website-design',
      descriptor: 'Built for phones',
    },
    {
      tag: 'Product pages',
      title: 'Help Google find each of your products',
      example: "Extra page details that help your products show up in search",
      slug: 'schema-markup-local-businesses',
      descriptor: 'Found on its own',
    },
    {
      tag: 'SPEED',
      title: 'How to test how fast your site really is',
      example: "A quick check anyone can run, cart included",
      slug: 'how-to-test-website-speed',
      descriptor: 'Check it yourself',
    },
  ],
} as const;

/** S9 — Pillar 04: Google Ads + PPC */
export const PILLAR_GOOGLE_ADS = {
  eyebrow: 'PART 04 · GOOGLE ADS (PAID ADS)',
  headline: 'Paid ads that bring in calls',
  headlineAccent: 'you can count.',
  body:
    'SEO takes months to build. Google Ads put you at the top of the search results starting this week, and you pay only when someone clicks. The search, the ad and the page they land on all need to say the same thing, and I make sure they do.',
  checklist: [
    'Campaign audit, keyword and competitor research to start',
    'Campaign structure built so keyword, ad, and landing page all match',
    'Conversion tracking for calls, forms, and sales, not just clicks',
    'Ongoing bid, budget, and ad-copy management every month',
    'Meta Ads (Facebook & Instagram) management included alongside Google',
    'Monthly reporting on leads and cost per lead, not vanity metrics',
  ],
  specSheetLabel: 'HOW IT’S PRICED',
  specRows: [
    ['MANAGEMENT FEE', `${perMonth(PRICES.ads.tiers[0].monthly)} (ONE PLATFORM) OR ${perMonth(PRICES.ads.tiers[1].monthly)} (BOTH)`.toUpperCase()],
    ['AD SPEND', 'PAID DIRECTLY TO GOOGLE & META, NO MARKUP'],
    ['INCLUDES', 'GOOGLE ADS + META ADS MANAGEMENT'],
    ['STARTS WITH', 'A JUMPSTART PROJECT'],
    ['OWNERSHIP', 'YOUR AD ACCOUNTS, ALWAYS'],
  ],
  adSpendNote:
    'The management fee is management only. You pay Google and Meta directly, and if you ever leave, the accounts and their history go with you.',
  sceneChecks: [
    "The ad matches what people searched",
    "Tracks every call and form",
    "Budget and ads managed each month",
    "A report on leads and cost per lead",
  ],
  fanCards: [
    {
      tag: 'SEO or ads',
      title: 'Where should a service business put its money?',
      example: "Search ads and local SEO do different jobs",
      slug: 'local-seo-vs-paid-ads',
      descriptor: 'Choose with confidence',
    },
    {
      tag: 'Follow-up ads',
      title: 'The ads that bring visitors back',
      example: "Bring back the visitor who almost called",
      slug: 'retargeting-ads-explained',
      descriptor: 'Win back visitors',
    },
    {
      tag: 'Tracking',
      title: 'Where did that job come from?',
      example: "Know which ad rang the phone",
      slug: 'how-to-track-leads',
      descriptor: 'Know what works',
    },
  ],
} as const;

/** S11 — Pillar 05: Social Media Management */
export const PILLAR_SOCIAL_MEDIA = {
  eyebrow: 'PART 05 · SOCIAL MEDIA MANAGEMENT',
  headline: 'Social media that shows',
  headlineAccent: 'you are active and trusted.',
  body:
    'A homeowner comparing two contractors looks both up online. The one with recent photos and videos of real jobs usually gets the call. I take care of the posting so you can stay on the job.',
  checklist: [
    'On-site shoots turned into videos and images every month',
    'Captions written for every post',
    'Scheduling and publishing handled for you',
    'Community management: comments and messages answered',
  ],
  scopeNote:
    'Pricing below is for service-based trades businesses. E-commerce and retail are scoped individually to catalog size and volume.',
  tiersLabel: 'CONTENT RETAINER TIERS',
  tiers: [
    {
      name: 'Basic',
      price: perMonth(PRICES.social.tiers[0].monthly),
      pitch: 'One shoot a month, turned into three posts a week.',
      includes: ['1 on-site shoot/mo', '12 total posts/mo', 'Scheduling & publishing', 'Community management'],
      goodFor: 'GOOD FOR: PROVING THE MODEL',
      featured: false,
    },
    {
      name: 'Standard',
      price: perMonth(PRICES.social.tiers[1].monthly),
      pitch: 'Two shoots a month and near-daily presence.',
      includes: ['2 on-site shoots/mo', '20 total posts/mo', 'Scheduling & publishing', 'Community management'],
      goodFor: 'GOOD FOR: BEING SEEN EVERY WEEK',
      featured: true,
    },
    {
      name: 'Growth',
      price: perMonth(PRICES.social.tiers[2].monthly),
      pitch: 'The fullest cadence, built for scale.',
      includes: ['2 on-site shoots/mo', '28 total posts/mo', 'Scheduling & publishing', 'Community management'],
      goodFor: 'GOOD FOR: SCALING PRESENCE DELIBERATELY',
      featured: false,
    },
  ],
  sceneChecks: [
    "Photos and videos from your jobs",
    "A caption written for every post",
    "Posted on schedule for you",
    "Comments and messages answered",
  ],
  fanCards: [
    {
      tag: 'Video',
      title: 'Video for your business, no crew needed',
      example: "A phone and a job site are enough to start",
      slug: 'video-content-for-local-businesses',
      descriptor: 'Easy to start',
    },
    {
      tag: 'Content',
      title: 'Turn one job into a month of posts',
      example: "One job-site shoot, a month of posts",
      slug: 'how-to-repurpose-blog-content',
      descriptor: 'More from less',
    },
    {
      tag: 'Reviews',
      title: 'How to get more Google reviews',
      example: "Happy customers are your best post",
      slug: 'how-to-get-more-google-reviews',
      descriptor: 'Builds trust',
    },
  ],
} as const;

/** S13 — Pillar 06: AI Automation */
export const PILLAR_AUTOMATION = {
  eyebrow: 'PART 06 · AUTOMATIC REPLIES',
  headline: 'Every inquiry gets a reply,',
  headlineAccent: 'even at 11 at night.',
  body:
    'When someone contacts you, they hear back within seconds, even while you are on a job or asleep. Quotes that went quiet get a friendly follow-up, and you get a short plain-English summary of every lead.',
  checklist: [
    'Contact forms that actually reach you, and confirm instantly to the customer',
    'Automatic first replies, so every inquiry feels answered',
    'Lead summaries delivered to you in plain English',
    "Follow-up sequences for quotes and estimates that haven't heard back",
    'Built on your site, under your control, no mystery subscriptions',
  ],
  timelineLabel: 'INQUIRY TIMELINE',
  timeline: [
    { time: '11:04 PM', event: 'NEW INQUIRY', detail: '"Need an estimate for a bathroom retile"' },
    { time: '11:04 PM', event: 'AUTO-REPLY SENT', detail: '"Thanks! You\'ll hear from us by morning."' },
    { time: '11:04 PM', event: 'NOTIFICATION TO YOU', detail: 'summary in plain English' },
    { time: 'NEXT AM', event: 'YOU CALL BACK', detail: 'lead is warm, not gone' },
  ],
  sceneChecks: [
    "The customer gets an instant confirmation",
    "An automatic first reply, any hour",
    "Follow-up on quotes that went quiet",
    "A plain-English summary sent to you",
  ],
  fanCards: [
    {
      tag: 'Fast replies',
      title: 'Reply within five minutes and win more jobs',
      example: "The first business to answer usually gets the job",
      slug: 'how-to-respond-to-leads-faster',
      descriptor: 'Answer first',
    },
    {
      tag: 'Follow-up',
      title: 'The follow-up system that books jobs',
      example: "Quotes that went quiet, followed up automatically",
      slug: 'how-to-follow-up-with-leads',
      descriptor: 'No lead forgotten',
    },
    {
      tag: 'Organizing leads',
      title: 'A simple way to keep track of every lead',
      example: "A single place every inquiry lands",
      slug: 'what-is-crm',
      descriptor: 'Keep it organized',
    },
  ],
} as const;

/** S14 — Close (dark CTA, low-commitment variant). Phone comes from SITE. */
export const SERVICES_CLOSE = {
  eyebrow: '— FREE 10-MINUTE SITE REVIEW',
  headline: "Not sure which part you're missing?",
  body:
    "Send me your URL. I'll tell you the 3 things most likely costing you calls. Free, honest, one email.",
  callLabel: 'Call',
  secondaryCta: 'Free site review',
  secondaryHref: '/contact',
} as const;

export const SERVICES = {
  hero: SERVICES_HERO,
  systemStrip: SYSTEM_STRIP,
  pillarWebDesign: PILLAR_WEB_DESIGN,
  pillarSeo: PILLAR_SEO,
  pillarEcommerce: PILLAR_ECOMMERCE,
  pillarGoogleAds: PILLAR_GOOGLE_ADS,
  pillarSocialMedia: PILLAR_SOCIAL_MEDIA,
  pillarAutomation: PILLAR_AUTOMATION,
  close: SERVICES_CLOSE,
} as const;

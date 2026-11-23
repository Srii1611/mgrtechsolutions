/**
 * Copy for /services/website-design. Plain English for contractors and local
 * service owners. Prices come from src/data/prices.ts: The Site / The System /
 * Rebuild-Custom, plus Care plans. A standard build is 15 days.
 *
 * OPEN for Srii before treating as final:
 *  - TODO(Srii): the package details in the Included section come from the old
 *    Starter / Standard / Custom sheet; replace with his new descriptions.
 *  - Items marked CONFIRM are standard web-design deliverables that are not
 *    on the live site's own tier lists.
 *  - The statistic in PROBLEMS[1] is Google/SOASTA (2017) via Think with Google.
 */


import { HOURLY_LINE, LAUNCH, PRICES, money, perMonth } from '@/data/prices';

export const WD_HERO = {
  breadcrumb: 'WEBSITE DESIGN',
  headline: 'A website that brings in calls,',
  headlineAccent: 'not just a page that exists.',
  lede:
    'We build custom websites for contractors and local service businesses. Fast on a phone, set up to be found on Google, and the domain, words, photos and code stay in your name.',
  secondaryCta: 'Get a free site review',
  location: 'Ashland, MA · Serving MetroWest',
  facts: [
    { title: '15-day build', text: 'From first call to launch for a standard site.' },
    { title: 'About 90 minutes', text: 'Your total time across the whole project.' },
    { title: 'You own it', text: 'Your domain, words, photos and code are yours.' },
    { title: 'Written quote', text: 'Locked after one call. No hourly meters.' },
  ],
} as const;

/** Section list for the side dot rail. Ids must match the section ids. */
export const WD_RAIL = [
  { id: 'problem', label: 'Problem' },
  { id: 'approach', label: 'Our approach' },
  { id: 'included', label: "What's included" },
  { id: 'how', label: 'How it works' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'success', label: 'Results' },
  { id: 'compare', label: 'Comparison' },
  { id: 'fit', label: "Who it's for" },
  { id: 'industries', label: 'Industries' },
  { id: 'guides', label: 'Guides' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Get started' },
] as const;

/* ── 02 Problem ─────────────────────────────────────────────────── */
export const WD_PROBLEM = {
  eyebrow: 'THE PROBLEM',
  heading: "If your website isn't working, you feel it in the phone.",
  lede: 'Most weak websites fail in the same four ways. Pick one to see the cause and the fix.',
} as const;

export const PROBLEMS = [
  {
    tag: 'Calls',
    title: 'Visitors leave without calling',
    peek: 'The site gets visitors but no calls.',
    body: "People decide in seconds whether you are the right business, and they leave if the answer isn't clear.",
    points: [
      "It isn't obvious what you do or where you work",
      'The phone number is hard to find on a phone',
      'There is no quote form, or it is long and awkward',
      'No reviews, photos or license details near the top',
    ],
    read: { slug: 'website-not-generating-leads' },
  },
  {
    tag: 'Phones',
    title: "It's slow on a phone",
    peek: 'Visitors give up before the page loads.',
    body: "Most people check a business on their phone first. Google's research found that 53% of mobile visits are abandoned when a page takes more than 3 seconds to load.",
    points: [
      'Large photos that were never resized for phones',
      'Heavy template code and add-ons that slow every page',
      'Text and buttons too small to use with a thumb',
      'Layouts built for a desktop screen first',
    ],
    sources: [
      {
        label: 'Think with Google',
        href: 'https://thinkwithgoogle.com/consumer-insights/consumer-trends/mobile-site-load-time-statistics/',
        note: '(Google/SOASTA research, 2017)',
      },
    ],
    read: { slug: 'why-website-speed-matters' },
  },
  {
    tag: 'Google',
    title: "Google doesn't show you",
    peek: "Competitors come up first. You don't.",
    body: "When someone searches for your trade in your town, Google picks the businesses it can understand. A site that doesn't spell out what you do and where you work gets passed over.",
    points: [
      'No separate page for each service',
      'No pages for the towns you actually serve',
      'Missing page titles, descriptions and photo descriptions',
      'No link to your Google Business Profile',
      'No structured data (code that tells Google you are a local business)',
    ],
    read: { slug: 'what-should-local-business-website-include' },
  },
  {
    tag: 'Ownership',
    title: "You don't really own it",
    peek: "The site sits in someone else's account.",
    body: 'Many small business sites sit in an account that belongs to someone else. That makes the site hard to change, move or even find.',
    points: [
      'The site is locked inside a builder platform',
      "The domain is registered under a former developer's name",
      "Hosting is in an account you can't log in to",
      "You can't take the site with you if you leave",
    ],
    read: { slug: 'diy-website-builders-vs-done-for-you' },
  },
] as const;

/* ── 03 Approach ────────────────────────────────────────────────── */
export const WD_APPROACH = {
  eyebrow: 'OUR APPROACH',
  heading: 'Made for your business,',
  accent: 'not borrowed from a template.',
  body: 'One contact builds it, and you explain your business once. Every page is written for your trade and your towns.',
  checks: [
    'Designed for your business, no templates',
    'Loads fast on any phone',
    'Shows up for your town and trade',
    'Your domain, words, photos and code in your name',
  ],
} as const;

export const WD_COMMITMENTS = {
  heading: 'What that means in practice.',
  lede: 'Four commitments run through every project. Here is what each one looks like in the work you receive.',
  rows: [
    {
      tag: 'Built from scratch',
      title: 'No templates',
      text: 'Your site is designed and coded for your business, not copied from a theme.',
      points: [
        'A layout planned around getting the call',
        'Your logo, colors and real job photos',
        'Hand-written code, with no page-builder add-ons slowing it down', // CONFIRM
        'Pages written for your trade and towns',
      ],
    },
    {
      tag: 'One contact',
      title: 'No handoffs',
      text: 'The person you talk to on the first call is the person who answers when you need a change.',
      points: [
        'One 60-minute call, then we take it from there',
        'No sales rep, project manager and developer chain',
        'No ticket system for changes after launch', // CONFIRM
        'Direct phone and email access',
      ],
    },
    {
      tag: 'Yours to keep',
      title: 'You own all of it',
      text: 'Everything is registered and delivered in your name, so nothing can be held back.',
      points: [
        'Domain registered in your name',
        'Hosting comes with the Care plans',
        'Content, photos and code belong to you',
        'You can move the site if you ever choose to',
      ],
    },
    {
      tag: 'Findable',
      title: 'Set up to be found',
      text: 'Search setup is part of the build, not an add-on you pay for later.',
      points: [
        'Page titles, descriptions and photo descriptions',
        'Service and service-area content',
        'Schema markup (code that labels your business for Google)',
        'Google Business Profile link and map',
      ],
    },
  ],
} as const;

/* ── 04 What's included ─────────────────────────────────────────── */
/** tier: 1 = every package, 2 = The System and Custom, 3 = Custom only. */
export type Tier = 1 | 2 | 3;

export const WD_INCLUDED = {
  eyebrow: "WHAT'S INCLUDED",
  heading: 'Everything a local business needs on day one.',
  lede: 'Eight areas of work in one place. Flip through them with the list, the arrows, or your keyboard. Everything is in every package unless a line says otherwise.',
  note: 'The System includes everything in The Site, and Custom includes everything in The System. Rebuilds are scoped on the call.',
  noteLead: 'Packages build on each other.',
  categories: [
    {
      title: 'Custom design',
      desc: 'The look and layout are made for your trade, with the call to action in the right places.',
      icon: 'M6 10h36v28H6zM6 18h36M14 26h12M14 32h20',
      items: [
        [1, 'Page layout planned around getting the call'],
        [1, 'Your logo, colors and brand look'],
        [1, 'Clear list of services and the towns you cover'],
        [1, 'Single page with Home, Services, About and Contact sections'],
        [2, 'Expanded multi-section build'],
        [2, 'Reviews and proof placed near the top'],
        [2, 'Process / how-it-works section'],
        [2, 'Photo and video galleries'],
      ],
    },
    {
      title: 'Mobile-first build',
      desc: 'Designed for the phone screen first, then scaled up for tablets and computers.',
      read: { slug: 'mobile-first-website-design', label: 'The case for mobile-first' },
      icon: 'M16 5h16a3 3 0 0 1 3 3v32a3 3 0 0 1-3 3H16a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3zM21 37h6',
      items: [
        [1, 'Mobile responsive design on every page'],
        [1, 'Tap-to-call button always within reach'],
        [1, 'Large, thumb-friendly buttons and menus'],
        [1, 'Text you can read without zooming'],
        [1, 'Quote form that is easy to fill out on a phone'],
        [1, 'Images sized for phone screens and mobile networks'],
        [1, 'Tested on real phones before you see it'],
      ],
    },
    {
      title: 'Local search foundation',
      desc: 'The on-page work that helps Google understand what you do and where you do it.',
      read: { slug: 'what-should-local-business-website-include', label: 'What your website needs' },
      icon: 'M24 42s12-10 12-20a12 12 0 0 0-24 0c0 10 12 20 12 20zM24 27a5 5 0 1 0 0-10 5 5 0 0 0 0 10z',
      items: [
        [1, 'Page titles and meta descriptions (the headline and summary Google shows)'],
        [1, 'Alt text on images (short photo descriptions for Google and screen readers)'],
        [1, 'Google Business Profile link and map embed'],
        [1, 'Basic on-page SEO on every page'],
        [1, 'Site submitted to Google at launch'],
        [2, 'Service area coverage for multiple towns'],
        [2, 'Enhanced schema markup (code that labels your business, services and areas)'],
        [2, 'Deeper on-page SEO, with clean page structure and internal links'],
      ],
    },
    {
      title: 'Lead capture',
      desc: 'The parts of the site that turn a visit into a phone call or a quote request.',
      read: { slug: 'lead-capture-forms', label: 'Lead capture forms that get filled out' },
      icon: 'M10 12h28v20H22l-8 7v-7h-4zM17 20h14M17 26h9',
      items: [
        [1, 'Click-to-call as the main action'],
        [1, 'Quote request form that reaches you right away'],
        [1, 'Clear calls to action on every page'],
        [2, 'Reviews and proof placed early, not buried'],
        [3, 'Booking tools'],
        [3, 'Quote calculators'],
        [3, 'Instant replies to every inquiry (available with Automatic Replies)'],
      ],
    },
    {
      title: 'Speed and security',
      desc: 'A fast, safe site keeps visitors on the page and keeps Google happy.',
      read: { slug: 'core-web-vitals-explained', label: 'Core Web Vitals in plain English' },
      icon: 'M12 21h24v19H12zM17 21v-6a7 7 0 0 1 14 0v6M24 29v5',
      items: [
        [1, 'Lean, hand-written code with no heavy page-builder add-ons'], // CONFIRM
        [1, 'Images compressed and sized for fast loading'], // CONFIRM
        [1, 'SSL certificate (the padlock and https in the browser)'],
        [1, 'Hosting through any Care plan'],
        [1, 'Domain connected, in your name'],
        [1, "Page speed checked against Google's Core Web Vitals (its page experience measures)"], // CONFIRM
      ],
    },
    {
      title: 'Launch and support',
      desc: 'You see a working version early, and you are not left alone after launch.',
      icon: 'M6 12h36v24H6zM20 18l10 6-10 6z',
      items: [
        [1, 'Working preview by Day 3 on a private link'],
        [1, '1 round of revisions'],
        [2, '2 rounds of revisions'],
        [1, 'Domain connection and Google submission at launch'],
        [1, 'Close support for fixes during the first two weeks'],
        [1, 'Optional Care plan after that, with hosting included'],
        [3, 'Extended post-launch collaboration'],
      ],
    },
    {
      title: 'Custom builds',
      desc: 'For businesses whose website has to do a specific job beyond a standard build. Scoped and quoted per project.',
      icon: 'M8 14h32v24H8zM8 22h32M14 30h8',
      items: [
        [3, 'Custom interactive builds, such as scroll sequences'],
        [3, 'Animated process timelines'],
        [3, 'Booking systems'],
        [3, 'Quote calculators'],
        [3, 'Multi-page site architecture'],
        [3, 'Scoped and quoted per project'],
      ],
    },
    {
      title: 'Rebuilds',
      desc: 'Already have a site? We rebuild it without losing what it has earned.',
      read: { slug: 'how-to-audit-your-website', label: 'How to audit your website' },
      icon: 'M12 6h18l8 8v28H12zM30 6v8h8M18 24h14M18 31h14',
      items: [
        [1, 'Full audit of your current site'], // CONFIRM
        [1, 'Keep and rewrite the content that works'],
        [1, 'Redirects so your existing Google rankings carry over'], // CONFIRM
        [1, 'New build on the same standards as a new site'],
      ],
    },
  ],
} as const;

/* ── 05 How it works ────────────────────────────────────────────── */
export const WD_HOW = {
  eyebrow: 'HOW IT WORKS',
  heading: 'Four steps, and most of the work is ours.',
  lede: 'You only spend time where your input matters. Each step shows what we do, what you do, and what you get at the end of it.',
  readLead: 'Want the full picture of a build?',
  read: { slug: 'what-to-expect-website-build-process', label: 'What actually happens during a professional website build' },
  steps: [
    {
      title: 'Discovery',
      text: 'We start with one conversation, so we can build around how your customers actually find and choose you.',
      we: ['Learn your services, towns and customers', 'Research your competitors and search results', 'Review your current site, domain and Google profile', 'Plan the page layout'],
      you: ['One phone call about your business', 'Share any logins you have', 'Send photos (phone photos are fine)'],
      get: ['A clear plan for the site', 'A written quote, locked after the call'],
    },
    {
      title: 'Design and preview',
      text: 'You see a real, working version quickly, so feedback happens on something concrete and not a sketch.',
      we: ['Design the pages around getting the call', 'Write the first draft of the words', 'Publish a private working preview'],
      you: ['Look the preview over', 'Tell us what to change'],
      get: ['A working preview link', 'Revisions: 1 round (The Site), 2 rounds (The System)'],
    },
    {
      title: 'Build and review',
      text: 'We build the full site, then you check it the way a customer would.',
      we: ['Build every page and set up local search', 'Make the site fast and secure', 'Test on real phones', 'Make the changes you ask for'],
      you: ['Nothing while we build', 'Review the finished site as a customer would'],
      get: ['The finished site, ready to go live', 'A private link to follow progress if you want'],
    },
    {
      title: 'Launch and support',
      text: 'We take the site live and stay close afterward, when small fixes are most likely.',
      we: ['Connect your domain and hosting', 'Submit the site to Google', 'Final checks on every page and form'],
      you: ['Answer the phone'],
      get: ['A live site, in your name', 'Close support for fixes after launch', 'Optional ongoing support after that'],
    },
  ],
} as const;

/* ── 06 Pricing ─────────────────────────────────────────────────── */
export const WD_PRICING = {
  eyebrow: 'PRICING',
  heading: 'Three packages, plus care plans.',
  lede: `A website build is a one-time cost. Pick the package that fits the job. A Care plan, which includes hosting, keeps it running after launch. The Site and The System launch in ${LAUNCH.standard}.`,
  service: 'website',
  alsoShow: ['care'],
  facts: [
    {
      title: 'What helps decide the package',
      text: 'The package sets the price. These things help us tell you which one fits:',
      kind: 'check',
      items: [
        'How many sections or pages the site needs',
        'How many towns and service areas you cover',
        'Photo and video galleries',
        'Integrations such as booking or quote calculators',
        'A rebuild of an existing site vs a new site',
      ],
    },
    {
      title: "What's not included",
      text: 'We keep these separate so you always know what you are paying for.',
      kind: 'x',
      items: [
        'Hosting. It is part of the Care plans',
        'SEO, social media and ads. They are separate monthly services with their own plans',
        'Work outside what we agreed, which is always quoted first',
      ],
    },
    {
      title: 'How payment works',
      text: 'No surprises. The prices on this page are the prices.',
      kind: 'check',
      items: [
        'The Site and The System are a one-time price',
        `Rebuild / Custom starts from a ${PRICES.depositPercent}% deposit and takes ${LAUNCH.custom}`,
        `Work outside the package is quoted first, at ${HOURLY_LINE}`,
        'No mystery subscriptions. Every monthly fee is shown here',
      ],
    },
  ],
  readLead: 'Want help comparing?',
  reads: [
    { slug: 'how-much-does-a-contractor-website-cost', label: 'What a contractor website really costs' },
    { slug: 'real-cost-cheap-website', label: 'what a bargain website really costs' },
  ],
} as const;

/* ── 07 Timeline ────────────────────────────────────────────────── */
export const WD_TIMELINE = {
  eyebrow: 'TIMELINE',
  heading: 'Fifteen days, from first call to launch.',
  lede: 'A standard build is planned day by day, so you always know what is happening and what, if anything, we need from you. The bar is drawn to scale: the longest stretch is the build, and that is the part where you do nothing.',
  /** weight = relative width of the day bar. */
  phases: [
    { key: 'discovery', short: 'Discovery', days: 'Days 0 to 1', bar: 'DAY 0-1', weight: 2, mark: '0', title: 'Discovery', text: 'A conversation about your business, customers and goals. We research your market and plan the layout.', time: 'Your time: 60 minutes' },
    { key: 'preview', short: 'Preview', days: 'Days 2 to 3', bar: 'DAY 2-3', weight: 2, mark: '2', title: 'Working preview', text: 'You get a real, working version of your site to react to, and we write the first draft of the pages.', time: 'Your time: about 15 minutes' },
    { key: 'build', short: 'Full build', days: 'Days 4 to 10', bar: 'DAY 4-10', weight: 7, mark: '4', title: 'Full build', text: 'We build every page, set up local search, speed and security, and test on real phones.', time: 'Your time: none' },
    { key: 'review', short: 'Review', days: 'Days 11 to 13', bar: 'DAY 11-13', weight: 3, mark: '11', title: 'Review and refinements', text: 'You go through the site as a customer would. We make the changes you ask for.', time: 'Your time: about 15 minutes' },
    { key: 'live', short: 'Go live', days: 'Days 14 to 15', bar: 'DAY 14-15', weight: 2, mark: '14', title: 'Go live', text: 'We connect your domain, take the site live, and submit it to Google.', time: 'Your time: none' },
  ],
  after: { days: 'After launch', title: 'Support', text: 'Close support for fixes during the first two weeks. The Care plans, which include hosting, are optional.', time: 'Call when you need us' },
  callout: {
    lead: 'About 90 minutes of your time in total.',
    text: 'Rebuild and Custom builds take about five weeks, with the timeline in writing before work starts. Delays usually come from late photos, logins or feedback, so sending those early is the best way to hold the schedule.',
  },
} as const;

/* ── 08 Success ─────────────────────────────────────────────────── */
export const WD_SUCCESS = {
  eyebrow: 'WHAT SUCCESS LOOKS LIKE',
  heading: 'You can check it yourself.',
  lede: "You don't need a dashboard or a technical report. On launch day, go down this list. Tick each item as you check it.",
  checklistTitle: 'Launch day checklist',
  doneText: "All seven checked. That's a site that is ready to work for you.",
  checks: [
    { title: 'Fast on a phone', text: 'Open the site on your own phone and see how quickly it loads.' },
    { title: 'Looks right on a phone', text: 'Scroll through every page on your phone.' },
    { title: 'Calls and forms work', text: 'Tap Call, and send yourself a test quote request.' },
    { title: 'Secure', text: 'Look for the padlock and https in the address bar.' },
    { title: 'Shows on Google', text: 'Search your business name and your town.' },
    { title: 'Your Google listing is correct', text: 'Look yourself up on Google Maps.' },
    { title: "It's in your name", text: 'Ask us to show you the domain registration.' },
  ],
  path: [
    { when: 'At launch', title: 'A site that works', text: 'A fast, working site that makes it easy to call.' },
    { when: 'First weeks', title: 'Google finds it', text: 'The site is discovered and indexed by Google.' },
    { when: 'Several months', title: 'Rankings build', text: 'Rankings and traffic grow as Google learns your site. Most businesses see real movement over several months.' },
  ],
  nope: {
    title: "What we don't promise",
    items: [
      'A number-one ranking by a set date',
      'A set number of calls or leads',
      'Instant traffic. A new site needs time to be found',
    ],
  },
} as const;

/* ── 09 Comparison ──────────────────────────────────────────────── */
export const WD_COMPARE = {
  eyebrow: 'HONEST COMPARISON',
  heading: 'Why not Wix, or a freelancer?',
  lede: 'Each option is the right answer for someone. This is how they compare for a business that lives on the phone.',
  columns: [
    { name: 'DIY builder', sub: 'Wix, Squarespace and similar' },
    { name: 'Freelancer', sub: 'A single independent contractor' },
    { name: 'Large agency', sub: 'A bigger team, more layers' },
    { name: 'Hire in-house', sub: 'Your own web person' },
  ],
  us: { name: 'MGRTECH', sub: 'Built for local businesses' },
  rows: [
    { label: 'Best for', cells: ['A tiny budget and a simple page you are happy to manage', 'A simple job with a set budget', 'Big budgets and complex needs', 'A business that updates its site every day'], us: 'A business that lives on the phone and wants it handled' },
    { label: 'Your time', cells: ['A lot. You build and write it', 'Depends on the person', 'More meetings and more people to brief', 'Hiring and managing someone'], us: 'About 90 minutes in total' },
    { label: 'Search setup', cells: ['You do it yourself', 'Depends on the person', 'Usually offered, at extra cost', 'Depends on the hire'], us: 'Built into every site' },
    { label: 'Ownership', cells: ["You usually can't take the site with you if you leave the platform", 'Ask before you hire', 'Ask before you sign', 'Yours'], us: 'Domain, words, photos and code in your name' },
    { label: 'If it stalls', cells: ['Help pages or email', "It waits on a single person's availability", 'Goes through more layers', 'Your own employee'], us: 'Call the same contact' },
    { label: 'Cost', cells: ['Lowest upfront', 'Varies, and care is often extra', 'Highest', 'Salary, tools and management time'], us: `The Site ${money(PRICES.website.tiers[0].oneTime)}, The System ${money(PRICES.website.tiers[1].oneTime)}, priced openly` },
  ],
  note: "If one of the others fits you better, we'll tell you. More reading:",
  reads: [
    { href: 'https://www.sba.gov/?p=19341', label: 'SBA guide' },
    { slug: 'diy-website-builders-vs-done-for-you', label: 'DIY vs done-for-you' },
    { slug: 'hiring-a-web-agency-vs-productized-website', label: 'agency or productized website' },
  ],
} as const;

/* ── 10 Fit ─────────────────────────────────────────────────────── */
export const WD_FIT = {
  eyebrow: "WHO IT'S FOR",
  heading: 'Is this a good fit?',
  lede: "We would rather tell you now than after you've paid. Here is who gets the most from this service, and who doesn't.",
  yesTitle: 'A good fit if',
  yes: [
    "You're a contractor or local service business that gets work by phone",
    "Your site looks old, is slow, or isn't bringing in calls",
    'You compete with other businesses in more than one town',
    'Your customers need to trust you before they call',
    'You want one call, not a project to manage',
    'You want to own your site, domain and content',
  ],
  noTitle: 'Probably not the right fit if',
  no: [
    'You want the cheapest possible site',
    'You want to build and manage everything yourself',
    'You need a large custom web application',
    "You can't give feedback within the timeline",
    'You see a website as a one-time expense with no follow-through',
  ],
} as const;

/* ── 11 Industries ──────────────────────────────────────────────── */
export const WD_INDUSTRIES = {
  eyebrow: 'INDUSTRIES',
  heading: 'Businesses that live on the phone.',
  lede: "A plumber and a boutique don't need the same website. Pick your kind of business to see what we build into the site.",
  note: 'Not on the list? Call and ask.',
  items: [
    {
      tab: 'Trades and contractors',
      title: 'Plumbers, electricians, plasterers, tilers',
      text: 'Businesses where one call is a real job. The site has to look legitimate quickly and make the quote request easy.',
      towns: ['Ashland', 'Framingham', 'Natick', 'Your towns'],
      points: ['A page for every town you actually work in', 'License, insurance and years in business shown without scrolling', 'Real job photos, not stock images', 'Quote request that reaches your phone'],
    },
    {
      tab: 'Auto and motorsports',
      title: 'Repair shops and parts suppliers',
      text: 'Shops where reputation and photos do the talking. The site should show the work and make booking simple.',
      points: ['Gallery-first layout built around real builds and repairs', 'Service menu organized the way customers search: by make, model or job', 'Estimate requests sent straight to your phone'],
    },
    {
      tab: 'Retail and e-commerce',
      title: 'Boutiques and local shops',
      text: 'Shops that need to look as good online as they do in person. Photos and speed matter most.',
      points: ['Product photography given room to do the work', 'Fast, simple pages on a phone', 'Local pickup or delivery options, if you offer them'], // CONFIRM
    },
    {
      tab: 'Local services',
      title: 'Cleaners, landscapers, repair',
      text: 'Businesses whose customers start with "near me." Local search setup does most of the work here.',
      points: ['Every town you cover set up for local search', 'Seasonal service pages that match what people search at each time of year', 'Online quote requests that reach you instantly'],
    },
  ],
} as const;

/* ── Guides ─────────────────────────────────────────────────────── */
export const WD_GUIDES = {
  eyebrow: 'GUIDES FROM OUR BLOG',
  heading: 'Read up before you decide.',
  lede: 'Short, plain-English guides on the questions people ask us most about websites. No sign-up needed.',
} as const;

/* ── 12 FAQ ─────────────────────────────────────────────────────── */
export const WD_FAQ = {
  eyebrow: 'QUESTIONS',
  heading: 'What else you may want to know.',
  lede: "Can't find your question? Call and ask. You'll get a straight answer from the person who would build it.",
  items: [
    { q: 'How much does a website cost?', a: `The Site is ${money(PRICES.website.tiers[0].oneTime)} and The System is ${money(PRICES.website.tiers[1].oneTime)}, both one-time. Rebuild / Custom starts from ${money(PRICES.website.tiers[2].oneTime)} with a ${PRICES.depositPercent}% deposit and takes ${LAUNCH.custom}. There is no hourly meter on the package.`, read: { slug: 'how-much-does-a-contractor-website-cost', label: 'what a contractor website really costs' } },
    { q: 'What do you need from me?', a: 'One 60-minute call, logins to anything that already exists (an old site, a domain, a Google listing), and any photos you have. Phone photos are fine. We write the pages and handle the technical setup, and you review everything before launch.' },
    { q: 'How long does it take?', a: `A standard build goes from first call to launch in ${LAUNCH.standardDays} days. You see a working preview by Day 3, review the site on Days 11 to 13, and go live on Days 14 to 15. Rebuild and Custom builds take ${LAUNCH.custom}, with the timeline in writing before work starts.` },
    { q: 'Do I own my website and domain?', a: 'Yes, completely. The domain is registered in your name, and the content, photos and code are yours. If you ever leave, it all goes with you.' },
    { q: 'Will my site show up on Google?', a: 'It is set up to be found, with the on-page search work built in and your Google Business Profile connected. Rankings build over time, and nobody can promise a specific position. Most businesses see real movement over several months.' },
    { q: 'Can you rebuild my existing website?', a: "Yes. We audit what you have, keep and rewrite the content that works, set up redirects so your search rankings carry over, and rebuild the rest. You keep what you've already earned." },
    { q: 'Do I have to write the content?', a: 'No. From one phone call we learn enough about your business to write the pages. You review the words before launch, and most owners change less than they expect.' },
    { q: 'What happens after launch?', a: 'You get close support for fixes during the first two weeks, then an optional Care plan. Changes and questions are a call to the same contact, not a ticket to a queue.' },
    { q: 'Can I make changes later?', a: 'Anytime. Small changes are quick calls. Bigger additions get a clear price before any work starts.' },
    { q: 'Are there ongoing costs?', a: `A Care plan is ${perMonth(PRICES.care.tiers[0].monthly)}, ${perMonth(PRICES.care.tiers[1].monthly)} or ${perMonth(PRICES.care.tiers[2].monthly)} a month, and hosting is part of it. It is optional. Anything else recurring is listed in writing before launch.` },
    { q: 'Do you only work with MetroWest businesses?', a: "MetroWest Massachusetts is home, and where most clients are. If you're outside the area and the fit is right, call and we'll talk." },
  ],
} as const;

/* ── Related + close ────────────────────────────────────────────── */
export const WD_RELATED = {
  eyebrow: 'WORKS WELL WITH',
  heading: 'Related services.',
  lede: 'A website is the base. These services help it bring in more calls once it is live.',
  items: [
    { title: 'SEO', text: 'Be found when people search on Google. Google Business Profile setup, service and town pages, and articles that answer customer questions.', href: '/services/seo' },
    { title: 'Google Ads and Meta Ads', text: 'Ads that put you in front of customers now. Google search ads, Facebook and Instagram ads, and call and form tracking.', href: '/services/google-ads' },
    { title: 'Social Media', text: 'Regular posts that show you are active. On-site photo and video shoots, captions and scheduling, and comments and messages answered.', href: '/services/social-media' },
    { title: 'Automatic Replies', text: 'Every inquiry gets a reply right away. Missed-call text-back, instant auto-replies, and follow-up on quotes that went quiet.', href: '/services/ai-automation' },
  ],
} as const;

export const WD_CLOSE = {
  eyebrow: 'FREE SITE REVIEW',
  heading: 'Not sure what your site is missing?',
  accent: 'Send us your web address.',
  body: "We'll tell you the 3 things most likely costing you calls. It's free, it takes about 10 minutes, and there's no pressure.",
  emailCta: 'Email us your web address',
} as const;

export const WD_META = {
  title: 'Website Design and Development',
  description:
    'Custom websites for contractors and local service businesses in MetroWest Massachusetts. Built from scratch, fast on a phone, set up for Google, and owned by you. A standard build takes 15 days.',
} as const;

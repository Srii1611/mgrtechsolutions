/**
 * Homepage copy. Every word the homepage renders lives here so content edits
 * never require touching markup (spec §3).
 *
 * Positioning rule (spec §4): nothing here may claim the company is one
 * person. First person singular is fine where Srii speaks to the reader.
 */

/** S1 — Hero */
export const HERO = {
  eyebrow: 'MGRTECH SOLUTIONS · ASHLAND, MA',
  headline: "Your competitors aren't better.",
  headlineAccent: "They're just easier to find.",
  lede:
    "You've paid for a website before. It looked fine. It never rang. I build hand-coded websites for MetroWest businesses that are engineered to do one thing: turn nearby searches into phone calls.",
  secondaryCta: 'See the results',
  strapline: 'ONE POINT OF CONTACT · HAND-CODED, NO TEMPLATES · 5-WEEK BUILDS',
} as const;

/** S2 — The framework */
export const FRAMEWORK = {
  eyebrow: '— THE FRAMEWORK',
  lede:
    "Every project runs on the same three-part framework. Miss one part and the other two don't matter.",
  closing: "Most sites stop at 02. That's why they don't ring.",
  cards: [
    {
      index: '01 · GET FOUND',
      icon: 'MapPin',
      body: 'Show up when someone two towns over searches for what you do. Local SEO, Google Business Profile, fast pages, clean structure.',
    },
    {
      index: '02 · GET CHOSEN',
      icon: 'MousePointerClick',
      body: 'Five seconds to look legitimate. Real photos, clear services, reviews up front, and a phone number nobody has to hunt for.',
    },
    {
      index: '03 · GET FOLLOWED UP',
      icon: 'PhoneCall',
      body: 'Forms that actually reach you, instant auto-replies, and AI follow-up so no inquiry quietly dies in an inbox.',
    },
  ],
} as const;

/** S3 — Work. Source of truth is spec §8: 3 live, 4 demo. */
export const WORK = {
  eyebrow: '— PROOF, NOT PROMISES',
  headline: 'Real sites. Real labels.',
  headlineAccent: 'No stock portfolio theater.',
  lede:
    "Three of these are live client sites. Four are demos I built to show the approach. You'll never have to guess which is which.",
  legend: 'LIVE = A REAL CLIENT’S REAL SITE · DEMO = BUILT TO SHOW THE APPROACH',
  cta: 'See all 7 projects',
  projects: [
    {
      image: '/work/emanuel-blueboard.webp',
      live: true,
      name: 'Emanuel Blueboard Corporation',
      category: 'PLASTERING & BLUEBOARD · FRAMINGHAM, MA',
      outcome:
        'Rebuilt from a one-page brochure into a site that answers every question a homeowner asks before calling.',
    },
    {
      image: '/work/master-tile.webp',
      live: true,
      name: 'Master Tile Installation',
      category: 'TILE & STONE · FRAMINGHAM, MA',
      outcome:
        'Gallery-first design — the work does the selling, the phone number does the closing.',
    },
    {
      image: '/work/lj-landscaping.webp',
      live: true,
      name: 'L&J Landscaping',
      category: 'LANDSCAPING · METROWEST MA',
      outcome: 'Seasonal services structured so Google understands every one of them.',
    },
    {
      image: '/work/chaubandi-boutique.webp',
      live: false,
      name: 'Chaubandi Boutique',
      category: 'FASHION RETAIL · ARLINGTON, MA',
      outcome: "Demo: how a boutique's fabric photography should carry the whole page.",
    },
    {
      image: '/work/eurotech-motorsports.webp',
      live: false,
      name: 'Eurotech Motorsports',
      category: 'EUROPEAN AUTO · NATICK, MA',
      outcome: 'Demo: dark, fast, service-menu layout for a performance shop.',
    },
    {
      image: '/work/route126-puppies.webp',
      live: false,
      name: 'Route 126 Exotic Puppies',
      category: 'PUPPY YOGA & PET EVENTS · METROWEST, MA',
      outcome: 'Demo: trust-first structure for a business where buyers are skeptical.',
    },
    {
      image: '/work/fortes-parts.webp',
      live: false,
      name: "Forte's Parts Connection",
      category: 'AUTO PARTS E-COMMERCE · FRAMINGHAM, MA',
      outcome: 'Demo: a parts catalogue structured so search engines can read every category.',
    },
  ],
} as const;

/** S4 — Pain */
export const PAINS = {
  eyebrow: '— SOUND FAMILIAR?',
  closing: 'IF YOU NODDED AT ANY OF THESE — THE REST OF THIS PAGE IS FOR YOU.',
  items: [
    {
      quote: "I paid for a website three years ago. It's never once made the phone ring.",
      body: 'The site was built to look finished, not to get found. Those are different jobs.',
    },
    {
      quote:
        "My competitor down the road shows up everywhere and his work isn't better than mine.",
      body: "He's not better. His Google profile is. That's fixable, and it's not magic.",
    },
    {
      quote:
        'I get inquiries through the website, but half of them never hear back from me in time.',
      body: "That's not a discipline problem. That's a missing follow-up system.",
    },
    {
      quote: "I know I need to do something about all this. I just don't have the time.",
      body:
        "That's the whole point of how I work: one 30-minute call, then I take it from there.",
    },
  ],
} as const;

/** S5 — The AI search shift */
export const AI_SHIFT = {
  eyebrow: '— THE SHIFT',
  lede:
    "More and more, a homeowner's first question goes to an AI assistant instead of a search box. The businesses those assistants recommend are the ones with clear, structured, trustworthy websites. This isn't hype — it's a structure problem, and structure is exactly what I build.",
  takeaway: 'WEBSITES THAT ANSWER QUESTIONS CLEARLY ARE THE ONES AI ASSISTANTS RECOMMEND.',
  queries: [
    {
      style: 'SEARCH BOX STYLE',
      query: 'plumber near me open now',
      caption: 'THE OLD WAY — STILL MATTERS',
      icon: 'Search',
    },
    {
      style: 'AI CHAT STYLE',
      query: "Who's a reliable tile installer near Framingham?",
      caption: 'THE NEW WAY — GROWING FAST',
      icon: 'MessageSquareText',
    },
    {
      style: 'AI CHAT STYLE',
      query: 'How much should blueboard installation cost in MA?',
      caption: 'THE QUESTION BEFORE THE CALL',
      icon: 'MessageSquareText',
    },
  ],
} as const;

/** S6 — One system */
export const SYSTEM = {
  eyebrow: '— ONE SYSTEM',
  lede:
    "Most people sell you a website and wave goodbye. A website alone is a brochure. Here's how the three pieces actually connect.",
  loopLabel: 'EVERYTHING FEEDS THE PHONE',
  takeaway:
    'THE SITE EARNS THE VISIT → THE CONTENT EARNS THE TRUST → THE AUTOMATION EARNS THE CALL.',
  cta: 'Explore the services',
  nodes: [
    {
      title: 'THE SITE',
      body: 'Hand-coded, fast, structured so Google and AI assistants can read it. The foundation everything else runs on.',
    },
    {
      title: 'THE CONTENT',
      body: 'Pages and articles that answer the exact questions your customers ask before they call — so you show up, and they trust you.',
    },
    {
      title: 'THE AUTOMATION',
      body: 'Forms, instant replies, and AI follow-up that respond to every inquiry in seconds — even at 11 p.m.',
    },
  ],
} as const;

/** S7 — Why it rings */
export const MECHANISM = {
  eyebrow: '— WHY IT RINGS',
  closing: 'BREAK ANY LINK AND THE CHAIN GOES QUIET. I BUILD ALL SIX.',
  steps: [
    {
      cause: 'Someone nearby has a problem.',
      effect: 'They pull out their phone and search — or ask an AI assistant.',
    },
    {
      cause: 'Your site shows up — because it was built to be found.',
      effect: 'Fast pages, local structure, complete Google profile.',
    },
    {
      cause: 'It loads in under two seconds and looks legitimate.',
      effect: "They don't bounce. They keep reading.",
    },
    {
      cause: 'It answers their real questions — cost, timing, trust.',
      effect: 'Content written for customers, not for filler.',
    },
    {
      cause: 'Calling you is the easiest thing on the page.',
      effect: 'Tappable number everywhere, short forms, no hunting.',
    },
    {
      cause: 'If they message instead, they hear back in seconds.',
      effect: 'Automated follow-up catches every inquiry, day or night.',
    },
  ],
} as const;

/** S8 — Honest numbers. Stats must reconcile with spec §8. */
export const STATS = {
  eyebrow: '— NO INFLATED NUMBERS',
  headline: 'Small studio.',
  headlineAccent: 'Straight answers.',
  testimonialHeading: 'What clients say',
  disclosure:
    "A NEWER STUDIO MEANS A SHORTER TESTIMONIAL PAGE. I'D RATHER BE HONEST ABOUT THAT THAN FAKE IT — THE WORK ABOVE SPEAKS FIRST.",
  placeholderNote: '(Placeholder attributions — replaced with real names as permission is granted.)',
  stats: [
    { value: 7, suffix: '', label: 'PROJECTS BUILT & COUNTING' },
    { value: 5, suffix: '', label: 'WEEKS, CALL TO LAUNCH' },
    { value: 100, suffix: '%', label: 'HAND-CODED, NO TEMPLATES' },
    { value: 1, suffix: '', label: 'POINT OF CONTACT, START TO FINISH' },
  ],
  testimonials: [
    {
      quote:
        'He explained everything in plain English and the site was live when he said it would be.',
      attribution: 'HOME SERVICES CLIENT · METROWEST, MA',
    },
    {
      quote: 'I finally understand what my website is supposed to be doing.',
      attribution: 'TRADES CLIENT · FRAMINGHAM, MA',
    },
  ],
} as const;

/** S9 — Process */
export const PROCESS = {
  eyebrow: '— YOUR PART: 30 MINUTES',
  lede:
    'You run your business; I build the site. Your total time investment is one 30-minute call and one look at the design before launch. Everything else — writing, coding, setup, launch — is on me.',
  primaryCta: 'Start with a call',
  secondaryCta: 'Full process details',
  phases: [
    {
      week: 'WEEK 1 · DISCOVERY',
      body: 'One 30-minute call. I learn your business, your customers, and what a good lead looks like.',
      chip: 'YOU: 30 MIN',
    },
    {
      week: 'WEEK 2 · DESIGN',
      body: 'You get a design to react to. One round of feedback, then I refine.',
      chip: 'YOU: ~15 MIN',
    },
    {
      week: 'WEEK 3–4 · BUILD',
      body: 'Hand-coded, written, and assembled. You get a private preview link.',
      chip: 'YOU: 0 MIN',
    },
    {
      week: 'WEEK 5 · LAUNCH',
      body: 'Domain, hosting, Google profile — everything connected and live.',
      chip: 'YOU: 0 MIN',
    },
    {
      week: 'AFTER · SUPPORT',
      body: "I'm one phone call away. Changes, questions, additions — the same contact throughout.",
      chip: 'YOU: JUST CALL',
    },
  ],
} as const;

/** S10 — Honest comparison */
export const COMPARISON = {
  eyebrow: '— THE HONEST COMPARISON',
  lede: "There's a right choice for every budget. Here's the honest version.",
  swipeHint: 'SWIPE →',
  ownColumnLabel: 'THIS STUDIO',
  columns: ['DIY builders', 'Freelancers', 'Big agencies', 'MGRTECH'],
  rows: [
    {
      criteria: 'What you get',
      cells: ['Template you fill in', 'Varies wildly', 'Team-built site', 'Hand-coded custom site'],
    },
    {
      criteria: 'Your time cost',
      cells: [
        'Weeks of your own time',
        'Managing a stranger',
        'Meetings with account reps',
        'One 30-minute call',
      ],
    },
    {
      criteria: 'Who writes the content',
      cells: ['You', 'Usually you', 'Copy department', 'Me, with you on one call'],
    },
    {
      criteria: 'Who answers after launch',
      cells: ['A help center', 'Good luck', 'A ticket queue', 'The person who built it'],
    },
    {
      criteria: 'AI follow-up & automation',
      cells: ['Not included', 'Rarely', 'Expensive add-on', 'Built in'],
    },
    {
      criteria: 'Price honesty',
      cells: [
        "Cheap until it isn't",
        'Unpredictable',
        '$$$$$',
        'Starting-at pricing, on the website',
      ],
    },
  ],
} as const;

/**
 * S11 — Pricing preview.
 * PLACEHOLDER FIGURES. The owner supplies real numbers before launch; until
 * then every price renders as `$X,XXX` and the section says so plainly.
 */
export const PRICING = {
  eyebrow: '— PRICING, ON THE TABLE',
  lede:
    'Starting-at pricing, published. Your final quote is locked after one call — no hourly meters, no surprise invoices.',
  placeholderNote: 'FINAL PRICING CONFIRMED ON THE CALL.',
  cta: 'See what each package includes',
  plans: [
    {
      name: 'THE SITE',
      price: '$X,XXX',
      tagline: 'A hand-coded website built to be found and chosen.',
      featured: false,
      includes: [
        'Custom design',
        'Up to N pages',
        'Mobile-first',
        'Google Business Profile setup',
        'Launch & hosting setup',
      ],
    },
    {
      name: 'THE SYSTEM',
      price: '$X,XXX',
      tagline: 'The site plus the content and follow-up that make it ring.',
      featured: true,
      includes: [
        'Everything in The Site',
        'Content pages/articles',
        'Contact forms with instant auto-reply',
        'AI follow-up automation',
        '30 days post-launch support',
      ],
    },
    {
      name: 'THE REBUILD',
      price: '$X,XXX',
      tagline: 'Your existing site, taken apart and rebuilt properly.',
      featured: false,
      includes: [
        'Full audit of current site',
        'Content salvage & rewrite',
        'New hand-coded build',
        'Redirect & SEO preservation',
      ],
    },
  ],
} as const;

/** S12 — FAQ teaser */
export const FAQ_TEASER = {
  eyebrow: '— FAIR QUESTIONS',
  cta: 'Read all the questions',
  items: [
    {
      q: 'How much does a website cost?',
      a: 'Depends on scope; packages start at the numbers on this page and the final quote is locked after one call. No hourly meters, no surprise invoices.',
    },
    {
      q: 'How long does it take?',
      a: 'Five weeks from our first call to launch, for a standard build. Rebuilds and larger sites get a timeline in writing before we start.',
    },
    {
      q: 'Do I own my website?',
      a: 'Yes. The domain, the content, the site — yours. If you ever leave, everything goes with you.',
    },
    {
      q: 'What do you need from me to start?',
      a: 'One 30-minute phone call and access to any existing accounts. I handle the writing, photos guidance, and everything technical.',
    },
    {
      q: 'What is "AI automation," really?',
      a: 'Mostly unglamorous, useful things: instant replies to inquiries, follow-up messages that go out on their own, and systems that make sure no lead gets forgotten.',
    },
  ],
} as const;

/** S13 — Dual close */
export const DUAL_CLOSE = {
  eyebrow: '— TWO WAYS TO START',
  callHeading: 'Call and ask anything.',
  callBody:
    "You reach the person who'd build your site — no sales script, no switchboard, no pressure. If I'm not the right fit, I'll say so.",
  reviewHeading: 'Get a free site review.',
  reviewBody:
    "Send me your website's address. I'll send back a short, honest look at the 3 things most likely costing you calls — free, no strings, no follow-up spam.",
} as const;

/** Band labels, in page order. */
export const BANDS = [
  'SECTION 02 · THE FRAMEWORK',
  'SECTION 03 · THE WORK',
  'SECTION 04 · SOUND FAMILIAR?',
  'SECTION 05 · THE SHIFT',
  'SECTION 06 · ONE SYSTEM',
  'SECTION 07 · WHY IT RINGS',
  'SECTION 08 · THE HONEST NUMBERS',
  'SECTION 09 · YOUR PART: 30 MINUTES',
  'SECTION 10 · THE HONEST COMPARISON',
  'SECTION 11 · PRICING, ON THE TABLE',
  'SECTION 12 · FAIR QUESTIONS',
  'SECTION 13 · TWO WAYS TO START',
] as const;

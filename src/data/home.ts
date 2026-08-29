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
  strapline: 'ONE POINT OF CONTACT · HAND-CODED, NO TEMPLATES · 15-DAY BUILDS',
} as const;

/**
 * S2 — How the work actually works.
 *
 * The statistics below are quoted from the owner's copy as supplied. They are
 * published as factual claims, so each should carry a source before this ships
 * anywhere the numbers might be challenged.
 */
export const STAGES = {
  eyebrow: '— HOW THE WORK ACTUALLY WORKS',
  headline:
    'Three things have to happen before your phone rings. Most websites only do one of them.',
  intro:
    "Getting found. Getting picked. Getting back to people fast enough that they don't call someone else. Skip any one of the three and the other two stop mattering — a site nobody finds is a brochure, a site people find but don't trust is a bounce, and a site that gets you calls you never answer is just an expensive way to feed your competitors.",
  introSecondary:
    "Here's what each stage means in plain English, why it matters, and exactly what we build for it.",

  /** The hinge. Full-bleed accent band, sits between stages 02 and 03. */
  hinge: {
    line1: 'Almost every website stops here.',
    line2: "That's why they still don't ring.",
  },

  stages: [
    {
      index: '01',
      label: 'GET FOUND',
      icon: 'MapPin',
      headline: "If you're not in the map box, you're not in the running.",
      body: [
        'When someone two towns over pulls out their phone and searches "drywall contractor near me," Google doesn\'t show them ten blue links. It shows a map with three businesses pinned to the top. That box is where the decision starts, and for most people it\'s where it ends.',
        'Nearly half of all Google searches are looking for something local. The map box shows up in roughly 93% of those searches and takes about 44% of the clicks. Businesses inside it get 126% more traffic and 93% more calls, clicks and direction requests than the businesses ranked just below at positions four through ten. Being on page one isn’t the goal. Being in the box is.',
        "Most trades businesses aren't in there for boring, fixable reasons: a business name on Google that doesn't match the name on their incorporation papers, missing or wrong service categories, an address Google can't verify, no photos, no reviews, and a website too slow or too tangled for Google to read properly.",
      ],
      buildLabel: 'What we build',
      build: [
        'Google Business Profile set up correctly — legal name, right primary and secondary categories, verified address, service areas mapped to the towns you actually work in',
        "A dedicated page for each of those towns, so you're relevant in more than one map",
        'Site speed and structure Google can crawl in a single pass',
        'Your name, address and phone number identical across every directory that feeds Google',
      ],
      costLabel: 'What it costs you to skip this',
      cost: 'You pay for ads to rent traffic you should be getting for free, or you stay entirely dependent on referrals and hope they keep coming.',
    },
    {
      index: '02',
      label: 'GET CHOSEN',
      icon: 'MousePointerClick',
      headline: 'Being found is worth nothing if the next five seconds lose them.',
      body: [
        "They found you. Now you're sitting next to two competitors in the same box, and the comparison happens fast — people form an impression of a website in well under a second, and most of that impression is design and load speed before they've read a word.",
        'But looking good is only half of it. 97% of consumers read reviews for local businesses. 68% won’t use one rated under four stars. 47% won’t use one with fewer than 20 reviews. And two thirds of people say they’re simply more likely to hire a contractor who has a real website at all — for a homeowner about to let a stranger into their house, the site is the background check.',
        "The gap on most trades websites isn't ugliness. It's absence. No photos of actual finished jobs. Services buried in a paragraph instead of listed out. Reviews on a separate page nobody visits. A phone number sitting in the footer where nobody scrolls.",
      ],
      buildLabel: 'What we build',
      build: [
        "Real photographs of your work — your jobs, your trucks, your crew, not stock images of someone else's",
        "Services listed plainly, with what's included and a real price range where you're willing to give one",
        'Live Google reviews pulled onto the page, updating themselves, not screenshots from 2022',
        'Licence number, insurance, and years in business visible without scrolling',
        'Tap-to-call in reach on every screen, every page',
      ],
      costLabel: 'What it costs you to skip this',
      cost: 'You generate the traffic and your competitor books the job.',
    },
    {
      index: '03',
      label: 'GET FOLLOWED UP',
      icon: 'PhoneCall',
      headline: "The lead you already paid to earn is the one you're most likely to lose.",
      body: [
        "This is the stage nobody sells you, and it's where most of the money leaks out.",
        'Small businesses answer only about 38% of the calls that come in. The other six in ten go to voicemail or nowhere at all. Voicemail doesn’t save you either — more than 80% of callers hang up without leaving one, and roughly 85% of people whose call goes unanswered never call back. They call the next business on the list. Your marketing worked perfectly and you still lost the job.',
        'Web forms are worse, because the clock is faster than anyone expects. Getting back to a new lead within five minutes makes you 100 times more likely to reach that person and 21 times more likely to qualify them than waiting thirty. Only about 7% of businesses actually manage it. The first business to respond usually wins — not the cheapest one, not the best one. The first one.',
        "None of this is a work-ethic problem. You're on a roof. You're mid-pour. Your hands are full and your phone is in the truck. That's precisely why it can't depend on you remembering.",
      ],
      buildLabel: 'What we build',
      build: [
        "Forms that arrive on your phone as a text message, not an email you'll open at nine at night",
        "An instant auto-reply, so the person knows within seconds they reached a real business that's awake",
        "Missed-call text-back — every call you can't pick up gets a message before the caller has finished dialling your competitor",
        'AI follow-up that asks the basic qualifying questions and books the estimate while you’re still working',
        'Every call and inquiry logged in one place, so nothing dies quietly between your phone, your inbox and your truck console',
      ],
      costLabel: 'What it costs you to skip this',
      cost: 'You spend real money making the phone ring, then miss six out of every ten calls it makes.',
    },
  ],

  closer: [
    'Get Found brings people to you. Get Chosen makes them pick you. Get Followed Up makes sure you’re the one who actually gets back to them.',
    'Most agencies sell you the first. Some do the second. Almost nobody does the third — which is exactly why so many businesses have a website they paid good money for and a phone that doesn’t ring. We do all three, because doing two of them well is worth about the same as doing none.',
  ],
  cta: 'See where you stand right now — a free 10-minute audit of your map ranking, your website, and how long you actually take to respond.',
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

/**
 * S4 — The questions people actually ask. Eleven items.
 *
 * Statistics are quoted from the owner's research as supplied and have NOT
 * been independently verified. `sources` render on the page, because answers
 * leaning this hard on specific figures should show their work.
 *
 * KNOWN CONFLICT with STAGES (section 02), flagged rather than silently
 * reconciled:
 *   - Item 05 here cites Invoca: home service companies miss 27% of calls.
 *     STAGES stage 03 says small businesses answer "about 38%" of calls,
 *     i.e. miss ~62%. Both appear on the same page. Pick one.
 *   - Item 04 here repeats the 100x / 21x five-minute figures verbatim from
 *     STAGES stage 03.
 *
 * Research notes addressed to the developer rather than the reader were
 * removed from the answers ("Strongest data in the whole set", "Use the
 * conservative number here", "This is your existing Section 04 line",
 * "which is exactly why your pricing table (image 2) is a differentiator",
 * "new question, and the one no competitor's FAQ page answers well").
 */
export const OBJECTIONS = {
  eyebrow: '— THE QUESTIONS PEOPLE ACTUALLY ASK',
  headline: 'Fair questions, straight answers.',
  lede:
    "The things owners ask me on a first call, answered the way I'd answer them on the phone — with the numbers behind them, so you can check my work.",
  closing:
    "If yours isn't here, ask it on the phone. You'll get the same kind of answer.",

  items: [
    {
      q: 'Do I even need a website? Most of my work is referrals.',
      a: [
        'The referral still checks you out. 98% of consumers search online before hiring a home services business, and 97% of homeowners say response speed influences who they hire.',
        'A homeowner may search your company name, scan your reviews, and decide whether to contact you at all — before your team gets any chance to respond.',
      ],
      sources: [
        'CallRail — home services marketing statistics',
        'MarketSharp — 2026 Homeowner Trust Gap',
      ],
    },
    {
      q: "I have a Google Business Profile. Isn't that enough?",
      a: [
        "It's the biggest single lever, not the whole system. Whitespark's 2026 survey of 47 local SEO experts puts Google Business Profile signals at 32% of local pack weight, reviews at around 20%, and on-page SEO at 19% — so roughly a fifth of ranking weight sits on the website itself.",
        'Being listed as open at the time of the search is now the fifth most important local pack factor.',
      ],
      sources: ['Whitespark Local Search Ranking Factors 2026'],
    },
    {
      q: 'Why does my competitor outrank me when my work is better?',
      a: [
        'Ranking is category, proximity, profile completeness and review signals — not craftsmanship. Google has no way to see how good your work is.',
        'Primary category, proximity to the searcher, and keywords in the business title remain the top three local pack factors, and behavioural signals have climbed sharply in importance.',
      ],
      sources: ['Whitespark Local Search Ranking Factors 2026'],
    },
    {
      q: 'How fast do I really need to call people back?',
      a: [
        'The MIT and InsideSales Lead Response Management study found that contacting a web lead within 5 minutes rather than 30 makes you 100 times more likely to connect and 21 times more likely to qualify them — measured across six companies and more than 15,000 leads.',
        'A separate Harvard Business Review audit of 2,241 US companies found an average first response time of 42 hours. Firms responding within an hour were 7 times more likely to reach a decision-maker than those waiting one hour longer, and 60 times more likely than those waiting a day.',
      ],
      sources: [
        'MIT / InsideSales — Lead Response Management study',
        'Harvard Business Review (2011)',
      ],
    },
    {
      q: 'How many calls am I actually missing?',
      a: [
        "Invoca's research found home service companies miss 27% of inbound calls.",
        "41% of jobs booked online come in after hours, and 86% of people won't answer a number they don't recognise.",
      ],
      sources: ['Invoca (2023)', 'CallRail'],
    },
    {
      q: 'Do reviews really matter that much?',
      a: [
        "The bar moved hard in one year. BrightLocal's 2026 survey of 1,002 US adults found 97% of consumers read reviews before choosing a local business. The share who will only use a business rated 4.5 or above nearly doubled, from 17% to 31%. And 47% won't consider a business with fewer than 20 reviews.",
        '41% now say they "always" read reviews, up from 29% the year before. Housecall Pro\'s homeowner survey found 72% of homeowners would pay up to 10% more for a contractor with a stronger service reputation.',
      ],
      sources: ['BrightLocal Local Consumer Review Survey 2026', 'Housecall Pro homeowner survey'],
    },
    {
      q: 'Does ChatGPT matter for my business?',
      a: [
        "BrightLocal's 2026 survey shows AI tools jumping from 6% to 45% of local-business discovery in a single year — making AI the third discovery channel behind Google and Facebook. Google's own share of local discovery fell from 83% to 71% over the same period.",
        "In Google there's a page two. In an AI answer there isn't.",
      ],
      sources: ['BrightLocal LCRS 2026', 'Hook Agency — how homeowners research contractors'],
    },
    {
      q: 'How long before I see results?',
      a: [
        'An honest answer beats a promise. Some tactics deliver leads in weeks; SEO and brand growth take several months.',
        'Businesses running ads and a fixed-up online presence typically see movement within 30 to 60 days, with durable results taking a few months of consistency.',
      ],
      sources: ['LeadsNearby', 'DewBwah contractor FAQ'],
    },
    {
      q: 'What should this cost me?',
      a: [
        'Most home service companies spend 5–10% of revenue on marketing. But the better measure is cost per lead and cost per booked job — spend means nothing without those two numbers beside it.',
        "Pricing is the question prospects most want answered and agencies most often avoid. Ours is on the page, in the open, before you call.",
      ],
      sources: ['LeadsNearby', 'Smith.ai — agency FAQ guide'],
    },
    {
      q: 'I paid someone before and got nothing. Why are you different?',
      a: [
        'Usually they failed because they over-promised and under-delivered. That is worth saying plainly rather than dancing around.',
        'Two questions separate a real partner from a cold call, and you should ask them of us too. Who will actually be doing the work, and how do I contact them? And do I own the accounts I am paying for — domain, Google Business Profile, ad accounts, analytics?',
      ],
      sources: ['Esker Designs — 5 questions to ask any agency', 'LeadsNearby'],
    },
    {
      q: 'My site is fine, it just looks a bit old.',
      a: [
        "Speed is the measurable half, and it's brutal. Google's Deloitte study found a 0.1-second mobile speed improvement correlated with an 8.3% better bounce rate on lead-generation pages, and 21.6% more users reaching the form submission page.",
        'Portent found sites loading in 1 second converted at 3.05%, against 0.67% at 4 seconds. Google and SOASTA found mobile bounce probability rose 32% as load time went from 1 to 3 seconds.',
      ],
      sources: ['Deloitte — Milliseconds Make Millions', 'Portent', 'Google / SOASTA'],
    },
  ],
} as const;

export const PROCESS = {
  eyebrow: '— YOUR PART: 90 MINUTES',
  lede:
    'You run your business; I build the site. Your total time investment is about 90 minutes: one conversation at the start, then two short reviews. Everything else — writing, coding, setup, launch — is on me.',
  primaryCta: 'Start with a call',
  secondaryCta: 'Full process details',
  steps: [
    {
      n: 1,
      title: "We learn the business",
      days: "Days 0–1",
      span: 2,
      yourTime: "60 min",
      track: "client",
      body:
        "The first conversation is short. Then we sit down — coffee or Zoom — and go through 20 questions. Not a homework form. A conversation. Before that, we've already looked at your current site, your competitors, and how customers in your trade actually search. We don't walk in cold.",
      bullets: [
        "What you sell, and what you want more of",
        "The towns or customers you cover",
        "How a new customer finds you today",
        "What happens after they call",
        "What you're tired of explaining",
      ],
      outcome:
        "A clear list of pages, a date you'll see a real preview, and a short list of photos to send.",
    },
    {
      n: 2,
      title: "You see a working preview",
      days: "Days 2–3",
      span: 2,
      yourTime: "15 min",
      track: "client",
      body:
        "Most agencies send a drawing in week four. You get a real website on day three — your name, your services, your area, a way to call, and it looks right on a phone. Not a template with your logo stuck on.",
      bullets: [
        "\"The phone number should be bigger\"",
        "\"We don't do that service any more\"",
        "\"That photo is from 2014\"",
        "\"This sounds like us\" / \"this doesn't\"",
      ],
      outcome:
        "A working preview you can open on your phone, and a short list of changes.",
    },
    {
      n: 3,
      title: "We build the full site",
      days: "Days 4–10",
      span: 7,
      yourTime: "0 min",
      track: "studio",
      body:
        "Once the direction is right, everything else gets built. Service pages, trust and reviews, contact with tap-to-call, words written from our notes in the language your customers use, and the structure that lets Google read it.",
      bullets: [
        "A page for each service you actually sell",
        "Forms that email you the moment someone submits",
        "Titles and structure Google can read",
        "Phone first, then desktop",
      ],
      outcome:
        "The full site on a private preview link, ready for review.",
    },
    {
      n: 4,
      title: "You review, we refine",
      days: "Days 11–13",
      span: 3,
      yourTime: "15 min",
      track: "client",
      body:
        "You go through the site the way a customer would. Phone first. This is not a second redesign — the direction was agreed on day 3. This round is for accuracy and polish.",
      bullets: [
        "Good: \"Change 'boiler repair' to 'repair and replacement'\"",
        "Bad: \"Can you make it pop more?\"",
      ],
      outcome:
        "A site you'd be happy to send to a customer.",
    },
    {
      n: 5,
      title: "Go live",
      days: "Days 14–15",
      span: 2,
      yourTime: "0 min",
      track: "studio",
      body:
        "Every button tested on a phone. The form actually arrives in your inbox. The click-to-call number is the right number. Then we connect your domain, turn on the padlock, and submit to Google.",
      bullets: [
        "A walkthrough of where leads land",
        "How to change hours or a photo",
        "Who to message if something looks off",
      ],
      outcome:
        "A live website. Your name on it. Your phone on it.",
    },
    {
      n: null,
      title: "After launch",
      days: "Ongoing",
      span: 2,
      yourTime: "just call",
      track: "after",
      body:
        "The site is yours. The first two weeks we stay close — if a form fails or a number is off, we fix it. After that you can run it yourself, or keep us on for hosting and the small changes that come up.",
      bullets: [
        "New service, new town, new photos",
        "Optional, not a trap",
      ],
      outcome:
        "The number of the person who built it. The 15-day build doesn't lock you into a retainer.",
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
        'One 60-minute call',
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
  'SECTION 02 · HOW THE WORK ACTUALLY WORKS',
  'SECTION 03 · THE WORK',
  'SECTION 04 · THE QUESTIONS PEOPLE ACTUALLY ASK',
  'SECTION 05 · YOUR PART: 90 MINUTES',
  'SECTION 06 · THE HONEST COMPARISON',
  'SECTION 07 · PRICING, ON THE TABLE',
  'SECTION 08 · TWO WAYS TO START',
] as const;

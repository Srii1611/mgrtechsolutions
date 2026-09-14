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
  /**
   * The previous headline — "Your competitors aren't better. / They're just
   * easier to find." — was replaced on 3 Sep 2026. It is not a copyright
   * problem (too short to protect) but at least three competing agencies run
   * the same construction almost verbatim, so the most prominent sentence on
   * the site was the house style of the local-SEO category.
   *
   * What replaces it was already the strongest writing on the page, buried in
   * the lede. A web search for it returns no matches anywhere: it is the
   * owner's own line, it names the reader's actual experience rather than
   * making an abstract claim, and the three-beat rhythm carries display type.
   */
  headline: "You've paid for a website before.",
  headlineAccent: 'It looked fine. It never rang.',
  lede:
    'I build hand-coded websites for MetroWest businesses that are engineered to do one thing: turn nearby searches into phone calls.',
  secondaryCta: 'See the results',
  strapline: 'ONE POINT OF CONTACT · HAND-CODED, NO TEMPLATES · 15-DAY BUILDS',
} as const;

/**
 * S2 — Services, in the order the phone needs them.
 *
 * Restructured on 14 Sep 2026 from three outcome stages (Get Found / Get
 * Chosen / Get Followed Up) into five named services, so a visitor sees what
 * we actually sell without decoding a metaphor. The layout, the pinned phone
 * scenes, the beam and the hinge are unchanged; the existing copy moved under
 * the service it describes, and each stage was cut to two paragraphs.
 *
 * Every statistic below was traced to a primary source on 2 Sep 2026 and each
 * stage renders its `sources`, the same way OBJECTIONS does. Google Ads and
 * Social Media carry no figures, because none of the traced research is about
 * them: their `sources` are empty and the attribution line is not rendered.
 * Their copy is taken from `seo-packages.ts` and `social-packages.ts`, and
 * deliberately quotes no prices — PRICING says ads and social are quoted on
 * the call.
 *
 * Removed in the 2 Sep pass, and not to be reinstated without new evidence:
 *   - "The map box shows up in roughly 93% of those searches" (Moz). True, but
 *     it sat two clauses from SOCi's unrelated "93% more actions" and the
 *     collision read as a copy-paste error. The 44%-of-clicks figure carries
 *     the argument on its own.
 *   - "Two thirds of people are more likely to hire a contractor who has a
 *     real website." Misstated its source, which measured homeowners more
 *     likely to CALL a contractor whose PRICING is on the website. The
 *     corrected figure now lives in PRICING, where it is evidence for
 *     publishing prices.
 *   - "Only about 7% of businesses actually manage it" (Drift, 2017). Real,
 *     but the sample was 433 B2B SaaS companies — wrong population for trades.
 *     411 Locals already makes the point on the right one.
 *
 * The 27% / 38% conflict with OBJECTIONS item 05 is resolved there, by naming
 * the sample behind each figure rather than dropping either one.
 */
export const STAGES = {
  eyebrow: '— WHAT WE BUILD, IN ORDER',
  headline:
    'Five things have to work before your phone rings. Most businesses only pay for one of them.',
  intro:
    "A website people trust. SEO and ads that put it in front of people searching today. Follow-up fast enough that they don't call someone else. Content that proves you're busy and real. Skip one and the rest leak — a site nobody finds is a brochure, a site people find but don't trust is a bounce, and a site that gets you calls you never answer is just an expensive way to feed your competitors.",
  introSecondary:
    "Here's what each service is in plain English, why it matters, and exactly what we build for it.",

  /** The hinge. Full-bleed accent band, sits between stages 03 and 04. */
  hinge: {
    line1: 'Almost every website stops here.',
    line2: "That's why they still don't ring.",
  },

  stages: [
    {
      index: '01',
      label: 'WEBSITE DESIGN & DEVELOPMENT',
      icon: 'MonitorSmartphone',
      headline: "A website that's an asset, not a brochure.",
      body: [
        "Someone finds you sitting next to two competitors, and the comparison happens fast — people form an impression of a website in well under a second, and most of that impression is design and load speed before they've read a word. That's why every site is hand-coded: no templates, no page builders, no rented themes.",
        'But looking good is only half of it. 97% of consumers read reviews for local businesses. 68% won’t use one rated under four stars. 47% won’t use one with fewer than 20 reviews. For a homeowner about to let a stranger into their house, your site and your reviews are the background check.',
      ],
      buildLabel: 'What we build',
      build: [
        'Custom design, hand-coded — no templates, no page builders, and under two seconds to load on a phone',
        "Real photographs of your work — your jobs, your trucks, your crew, not stock images of someone else's",
        "Services listed plainly, with what's included and a real price range where you're willing to give one",
        'Live Google reviews pulled onto the page, updating themselves, not screenshots from 2022',
        'Licence number, insurance, and years in business visible without scrolling',
        'Tap-to-call in reach on every screen, every page',
      ],
      costLabel: 'What it costs you to skip this',
      cost: 'You generate the traffic and your competitor books the job.',
      sources: ['BrightLocal — Local Consumer Review Survey 2026 (1,002 US adults)'],
    },
    {
      index: '02',
      label: 'SEO',
      icon: 'MapPin',
      headline: "If you're not in the map box, you're not in the running.",
      body: [
        'When someone two towns over pulls out their phone and searches "drywall contractor near me," Google doesn\'t show them ten blue links. It shows a map with three businesses pinned to the top. That box is where the decision starts, and for most people it\'s where it ends.',
        'Nearly half of all Google searches are looking for something local, and the map box takes about 44% of the clicks on them — more than the organic results and the paid ads combined. Businesses inside it get 126% more traffic and 93% more calls, clicks and direction requests than the businesses ranked just below at positions four through ten. Being on page one isn’t the goal. Being in the box is.',
      ],
      buildLabel: 'What we build',
      build: [
        'Google Business Profile set up correctly — legal name, right primary and secondary categories, verified address, service areas mapped to the towns you actually work in',
        "A dedicated page for each of those towns, so you're relevant in more than one map",
        'Site speed and structure Google can crawl in a single pass',
        'Your name, address and phone number identical across every directory that feeds Google',
        'Service pages and articles written around what your customers actually search — not vanity keywords',
      ],
      costLabel: 'What it costs you to skip this',
      cost: 'You pay for ads to rent traffic you should be getting for free, or you stay entirely dependent on referrals and hope they keep coming.',
      sources: [
        'Google — share of searches with local intent',
        'SOCi — local pack traffic and actions vs. positions 4–10',
      ],
    },
    {
      index: '03',
      label: 'GOOGLE ADS & PPC',
      icon: 'Megaphone',
      headline: "SEO earns the map box over months. Ads put you in front of this week's searches.",
      body: [
        "SEO and content compound — most businesses see real movement in rankings and traffic over three to six months, not weeks. Ads can generate leads within days of launching, because you're paying for placement rather than waiting to earn it. The two work together, not as a replacement for each other.",
        "What makes ads pay is alignment. The keyword someone searches, the ad they see, and the page they land on all have to say the same thing. Misalignment between those three is where most wasted ad spend comes from, and it's the first thing we fix.",
      ],
      buildLabel: 'What we build',
      build: [
        'Keyword and competitor research, and a campaign structure where your keyword, ad, and landing page all match',
        'Conversion tracking for calls, forms, and sales — not just clicks and impressions',
        'Search terms reviewed every month, cutting the keywords that waste money',
        'Meta Ads (Facebook & Instagram) alongside Google, with the message matched to how warm each audience is',
        'Ad accounts in your name, paid directly to Google and Meta, with no markup on your ad spend',
      ],
      costLabel: 'What it costs you to skip this',
      cost: 'You wait months for SEO to build while the people searching for your service this week call whoever showed up first.',
      sources: [],
    },
    {
      index: '04',
      label: 'AI AUTOMATION',
      icon: 'PhoneCall',
      headline: "The lead you already paid to earn is the one you're most likely to lose.",
      body: [
        'Small businesses answer only about 38% of the calls that come in. The other six in ten go to voicemail or nowhere at all. Voicemail doesn’t save you either — more than 80% of callers hang up without leaving one, and roughly 85% of people whose call goes unanswered never call back. They call the next business on the list. Your marketing worked perfectly and you still lost the job.',
        'Web forms are worse, because the clock is faster than anyone expects. Getting back to a new lead within five minutes makes you 100 times more likely to reach that person and 21 times more likely to qualify them than waiting thirty. The first business to respond usually wins — not the cheapest one, not the best one. The first one.',
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
      sources: [
        '411 Locals (2024) — 85 businesses across 58 industries',
        'Forbes / RingCentral, Hiya, Marchex — voicemail abandonment',
        'MIT / InsideSales — Lead Response Management study (Oldroyd, 2007)',
      ],
    },
    {
      index: '05',
      label: 'SOCIAL MEDIA & CONTENT',
      icon: 'Camera',
      headline: 'Your crew already does the impressive part. We make sure people see it.',
      body: [
        "For a trades business, social is where trust gets built before anyone picks up the phone. A homeowner comparing two roofers will look both up — and one of them has job-site reels, before-and-afters, and a post from this week, while the other hasn't posted since last spring. That gap decides more calls than most owners realise.",
        "The hard part isn't knowing that — it's finding time to shoot and post while running crews all week. That's the part we take over: we show up to the site, capture the work, and handle everything from there.",
      ],
      buildLabel: 'What we build',
      build: [
        'On-site shoots at your real jobs, turned into videos and images every month',
        'Captions written for every post',
        'Scheduling and publishing handled for you',
        'Community management — comments and messages answered',
      ],
      costLabel: 'What it costs you to skip this',
      cost: "A homeowner looks you up, finds a feed that hasn't posted since spring, and calls the business that posted this week.",
      sources: [],
    },
  ],

  closer: [
    'The website makes people pick you. SEO and ads bring them to you. AI automation makes sure you’re the one who actually gets back to them. Content keeps you looking like the busy, trusted business you are.',
    'Most agencies sell you one of these and leave you to stitch the rest together from four other vendors — which is exactly why so many businesses have a website they paid good money for and a phone that doesn’t ring. We plan all five together, with one point of contact, because each one only pays off when the others are doing their job.',
  ],
  cta: 'See where you stand right now — a free 10-minute audit of your map ranking, your website, and how long you actually take to respond.',
} as const;

/** S3 — Work. Source of truth is spec §8: 3 live, 4 demo. */
export const WORK = {
  eyebrow: '— PROOF, NOT PROMISES',
  headline: 'Real sites. Real labels.',
  headlineAccent: 'No stock portfolio theater.',
  lede:
    "Three of these are live client sites, one is in production, one is a demo built to show the approach. You'll never have to guess which is which.",
  legend:
    'LIVE = A REAL CLIENT’S REAL SITE · PRODUCTION = DEPLOYED AND IN PROGRESS, NOT YET A CLIENT’S LIVE SITE · DEMO = BUILT TO SHOW THE APPROACH',
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
 *     STAGES stage 04 (AI Automation) says small businesses answer "about 38%" of calls,
 *     i.e. miss ~62%. Both appear on the same page. Pick one.
 *     Resolved 3 Sep 2026: neither figure was wrong — they measure different
 *     samples (Invoca: home services; 411 Locals: 85 small businesses across
 *     58 industries). Rather than drop one, item 05 now states both and names
 *     the scope of each, so the pair reads as corroboration instead of
 *     contradiction.
 *   - Item 04 here repeats the 100x / 21x five-minute figures verbatim from
 *     STAGES stage 04 (AI Automation). Attribution verified: MIT / InsideSales Lead Response
 *     Management study, Oldroyd, 2007 — the comparator is 5 vs 30 minutes,
 *     commonly misquoted as 5 vs 10.
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
        "Two studies, two different samples, same conclusion. Measured across small businesses generally, only about 38% of inbound calls are answered by a live person. Narrowed to home service companies specifically, Invoca puts the miss rate at 27%.",
        "41% of jobs booked online come in after hours, and 86% of people won't answer a number they don't recognise.",
      ],
      sources: ['411 Locals (2024)', 'Invoca (2023)', 'CallRail'],
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
 * Tiers, prices and bullets are taken from COST_TIERS in
 * `website-cost-guide.ts` (the middle tier is named Growth there). Keep the
 * two in step when either changes.
 */
export const PRICING = {
  eyebrow: '— PRICING, ON THE TABLE',
  lede:
    'Starting-at pricing, published. Your final quote is locked after one call — no hourly meters, no surprise invoices.',
  /**
   * Published pricing is a differentiator, so the number that justifies it
   * sits here rather than in the STAGES website stage, where it previously appeared in a
   * misstated form ("two thirds more likely to hire a contractor who has a
   * real website"). The survey measures pricing on the site, not the site.
   */
  proof:
    'Roughly four in five homeowners say they’re more likely to call a contractor whose pricing is on the website. That’s why ours is.',
  proofSource: 'Roofing Contractor — 2025 Homeowner Survey (roofing-specific)',
  plans: [
    {
      name: 'STARTER',
      price: '$499',
      priceNote: 'ONE-TIME',
      tagline: 'A single page that says who you are and makes the call easy.',
      featured: false,
      badge: null,
      inheritsFrom: null,
      includes: [
        '3–4 sections — Home, Services, About, Contact — on a single page',
        'Primary CTA: click-to-call plus a quote request form',
        'Mobile responsive design',
        'Basic on-page SEO — titles, meta descriptions, alt text',
        'Google Business Profile link and map embed',
        '1 round of revisions',
      ],
    },
    {
      name: 'STANDARD',
      price: '$899',
      priceNote: 'ONE-TIME',
      tagline:
        'The full build most contractors actually need — proof up front, service areas covered.',
      featured: true,
      badge: 'BEST FIT FOR MOST CONTRACTORS',
      inheritsFrom: 'Everything in Starter, plus:',
      includes: [
        'Expanded multi-section build — reviews and proof placed early, not buried',
        'Process / how-it-works section',
        'Enhanced photo and video galleries',
        'Multiple service area coverage',
        'Enhanced schema markup and deeper on-page SEO',
        '2 rounds of revisions',
      ],
    },
    {
      name: 'CUSTOM',
      price: 'Quoted',
      priceNote: '20% DEPOSIT SECURES THE START DATE',
      tagline: 'Scoped to the build you actually have in mind.',
      featured: false,
      badge: null,
      inheritsFrom: 'Everything in Standard, plus:',
      includes: [
        'Custom interactive builds — scroll sequences, animated process timelines',
        'Custom integrations — booking, quote calculators, multi-page architecture',
        'Extended post-launch collaboration',
      ],
    },
  ],
  /** Same six promises as ALWAYS_INCLUDED on the pricing page. */
  standards: [
    'HAND-CODED',
    'YOU OWN IT',
    'MOBILE-FIRST',
    'UNDER 2 SECONDS',
    'PLAIN ENGLISH',
    'ONE PHONE NUMBER',
  ],
  notes: [
    'Build cost is separate from your domain and hosting, which stay in your name.',
    "SEO, social and ads are quoted on the call, based on how many towns you're competing in.",
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

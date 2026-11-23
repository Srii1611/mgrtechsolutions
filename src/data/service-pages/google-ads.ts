import { HOURLY_LINE, PRICES, money, perMonth } from '@/data/prices';
import { ICON } from '@/data/service-pages/icons';
import type { ServicePageData } from '@/data/service-pages/types';

/**
 * /services/google-ads. Plain English for contractors and local service owners.
 *
 * Sources: the repo's Google Ads copy (PILLAR_GOOGLE_ADS), the live site's Google Ads & PPC section, our own blog
 * posts, and a structure-only review of US home-service ad management (what
 * the work includes, how fees are structured). No wording copied.
 *
 * OPEN for Srii before treating as final:
 *  - Every price comes from src/data/prices.ts. Management is a flat monthly
 *    fee with ad spend paid directly and no markup. Ads are priced on their own,
 *    separate from SEO and social media.
 *  - Lines marked CONFIRM are not stated on the live site.
 *  - No cost-per-lead or call numbers appear on this page. The figures in the
 *    scroll scene are illustration only and are labelled as such.
 */
export const GOOGLE_ADS_PAGE: ServicePageData = {
  slug: 'google-ads',
  meta: {
    title: 'Google Ads and Meta Ads',
    description:
      'Google Ads and Meta Ads management for contractors and service businesses in MetroWest Massachusetts. Tracked calls and forms, your own ad accounts, and no markup on ad spend.',
  },

  hero: {
    breadcrumb: 'GOOGLE ADS',
    headline: 'Ads that ring the phone.',
    headlineAccent: 'Counted, not guessed.',
    lede: 'We run your Google and Meta ads and count every lead. Your ad accounts stay in your name, with no markup on ad spend.',
    secondaryCta: 'Get a free ads review',
    facts: [
      { title: 'Calls and forms tracked', text: 'We count real leads, not just clicks.' },
      { title: 'Your ad accounts', text: 'Google and Meta accounts stay in your name.' },
      { title: 'No markup on spend', text: 'You pay Google and Meta directly.' },
      { title: 'Monthly report', text: 'Leads and cost per lead, in plain English.' },
    ],
  },

  problem: {
    eyebrow: 'THE PROBLEM',
    heading: 'Most ad money is wasted in four places.',
    lede: 'Ads are not hard to start. They are hard to run well. Pick a problem to see the cause and the fix.',
    items: [
      {
        tag: 'Tracking',
        title: 'You cannot tell which ads ring the phone',
        peek: 'Clicks are counted. Calls are not.',
        body: 'An ad that gets clicks but no calls costs you money. Without tracking, you cannot tell the two apart.',
        points: [
          'Calls from ads are not tracked at all',
          'Form requests are not tied back to the ad that brought them',
          'Reports show clicks and impressions, not leads',
          'Junk calls and real jobs look the same',
        ],
        read: { slug: 'how-to-track-leads', label: 'Where did that job come from?' },
      },
      {
        tag: 'Mismatch',
        title: 'The search, the ad and the page do not match',
        peek: 'People click, then leave.',
        body: 'Someone searches for a specific job, sees an ad for something general, and lands on a page that does not mention it. They leave, and you still pay for the click.',
        points: [
          'One ad for every service',
          'Every ad sends people to the homepage',
          'The page does not say the service or the town',
          'No clear phone number or quote form at the top',
        ],
        read: { slug: 'landing-page-best-practices', label: 'Landing page best practices' },
      },
      {
        tag: 'Wasted spend',
        title: 'You pay for searches you never wanted',
        peek: 'Clicks from people who will never hire you.',
        body: 'Ads can show for searches that have nothing to do with your work. Every one of those clicks costs money until someone removes it.',
        points: [
          'No one reviews the search terms that trigger your ads',
          'Job seekers, students and do-it-yourselfers click your ads',
          'Budget spread across too many keywords',
          'The best-performing searches do not get their own budget',
        ],
        read: { slug: 'local-seo-vs-paid-ads', label: 'Where should a service business put its money?' },
      },
      {
        tag: 'Ownership',
        title: 'Your ad account belongs to someone else',
        peek: 'You cannot see or take your own history.',
        body: 'Some agencies run ads from their own accounts and add a markup to the spend. You cannot see everything, and you cannot take it with you.',
        points: [
          'The ad account is in the agency’s name',
          'A markup is added to what you pay Google',
          'Reports are summaries you cannot check',
          'Leaving means starting from zero',
        ],
        read: { slug: 'choose-digital-marketing-partner', label: 'How to choose a marketing partner' },
      },
    ],
  },

  approach: {
    eyebrow: 'OUR APPROACH',
    heading: 'Paid ads that bring in calls',
    accent: 'you can count.',
    body: 'The search, the ad and the page they land on should all say the same thing. We make sure they do, then track every call and form so you know what each dollar did.',
    checks: [
      'The ad matches what people searched',
      'Tracks every call and form',
      'Budget and ads managed each month',
      'A report on leads and cost per lead',
    ],
    scene: 'ads',
  },

  commitments: {
    heading: 'What that means in practice.',
    lede: 'Four commitments run through every ad account. Here is what each one looks like in the work you receive.',
    rows: [
      {
        tag: 'Matched',
        title: 'Search, ad and page agree',
        text: 'Each ad group is built around one job, so the keyword, the ad and the page all say the same thing.',
        points: [
          'Campaigns built by service and by town',
          'Ad copy written for the keywords it targets',
          'Landing page reviewed for the same message',
          'A clear call or quote button at the top',
        ],
      },
      {
        tag: 'Counted',
        title: 'Every lead is tracked',
        text: 'Calls, forms and sales are tracked back to the ad that brought them, so money goes where it works.',
        points: [
          'Conversion tracking set up before launch',
          'Calls and form requests counted separately',
          'Monthly check that tracking still works',
          'Reports on leads and cost per lead',
        ],
      },
      {
        tag: 'Yours to keep',
        title: 'Your accounts, no markup',
        text: 'Ads run from your own Google and Meta accounts, and you pay them directly for the spend.',
        points: [
          'Google Ads and Meta accounts in your name',
          'No markup on ad spend',
          'Full access to your account at any time',
          'History goes with you if you leave',
        ],
      },
      {
        tag: 'Managed',
        title: 'Reviewed and improved every month',
        text: 'Ads drift over time. We review the search terms, move the budget and test new ads every month.',
        points: [
          'Search terms reviewed to cut wasted spend',
          'Top performers given their own budget',
          'Bids and budgets adjusted monthly',
          'New ad copy tested against old',
        ],
      },
    ],
  },

  included: {
    eyebrow: "WHAT'S INCLUDED",
    heading: 'Everything it takes to run ads that pay for themselves.',
    lede: 'Eight areas of work in one place. Flip through them with the list, the arrows, or your keyboard.',
    noteLead: 'Ad spend is separate.',
    note: 'The management fee covers our work. You pay Google and Meta directly for the ads themselves, and we never add a markup.',
    categories: [
      {
        title: 'Setup project',
        desc: 'Every engagement starts with a project that builds the foundation.',
        icon: ICON.target,
        items: [
          [1, 'Campaign audit, if you already advertise'],
          [1, 'Keyword and competitor research'],
          [1, 'Account and campaign structure planned'],
          [1, 'Strategy session on what comes next'],
          [1, 'Goals set in plain terms: calls, forms or sales'],
        ],
      },
      {
        title: 'Campaign structure',
        desc: 'Built so every keyword, ad and landing page match.',
        icon: ICON.cards,
        read: { slug: 'landing-page-best-practices', label: 'Landing page best practices' },
        items: [
          [1, 'Separate ad groups for each service'],
          [1, 'Location targeting set to the towns you serve'],
          [1, 'Unwanted search terms blocked from day one'],
          [1, 'Call buttons and call extensions set up'],
        ],
      },
      {
        title: 'Ad copy and creative',
        desc: 'Words and images written for your trade and your towns.',
        icon: ICON.mail,
        items: [
          [1, 'Search ad copy written to match target keywords'],
          [1, 'Ad copy testing and optimization'],
          [1, 'Meta ad creative: images, video and copy'],
          [1, 'Offers and proof points drawn from your real work'],
        ],
      },
      {
        title: 'Landing pages',
        desc: 'The page people reach after the click should finish the job.',
        icon: ICON.design,
        read: { slug: 'lead-capture-forms', label: 'Lead capture forms that get filled out' },
        items: [
          [1, 'Landing page review and recommendations'],
          [1, 'Ongoing page recommendations from ad results'],
          [1, 'Clear phone number and quote form'],
          [1, 'Phone-friendly layout check'],
        ],
      },
      {
        title: 'Tracking',
        desc: 'Counting calls, forms and sales, not just clicks.',
        icon: ICON.chart,
        read: { slug: 'how-to-track-leads', label: 'How to track leads' },
        items: [
          [1, 'Conversion tracking for calls, forms and sales'],
          [1, 'Call tracking so calls can be tied to the ad'],
          [1, 'Tracking checked and fixed each month'],
          [1, 'Short calls and wrong numbers kept out of your results'], // CONFIRM
        ],
      },
      {
        title: 'Google Ads, every month',
        desc: 'Ongoing management that keeps spend working.',
        icon: ICON.search,
        items: [
          [1, 'Search term review to cut keywords that waste money'],
          [1, 'Top performers moved into their own campaigns and budget'],
          [1, 'Bid and budget management'],
          [1, 'Ad copy testing and landing page recommendations'],
        ],
      },
      {
        title: 'Meta Ads, every month',
        desc: 'Facebook and Instagram ads, matched to where people are in their decision.',
        icon: ICON.phone,
        read: { slug: 'retargeting-ads-explained', label: 'The ads that bring visitors back' },
        items: [
          [1, 'Audience and competitor research'],
          [1, 'Campaigns for people new to you and for people who already visited'],
          [1, 'Creative testing and development'],
          [1, 'Bid, budget and targeting management'],
        ],
      },
      {
        title: 'Reporting',
        desc: 'A report about leads, not about vanity numbers.',
        icon: ICON.doc,
        items: [
          [1, 'Monthly report on leads, cost per lead and revenue'],
          [1, 'What changed and why'],
          [1, 'What we plan for next month'],
          [1, 'A call to go through it'],
        ],
      },
    ],
  },

  how: {
    eyebrow: 'HOW IT WORKS',
    heading: 'Four steps, and most of the work is ours.',
    lede: 'You only spend time where your input matters. Each step shows what we do, what you do, and what you get at the end of it.',
    readLead: 'Want to see how ads and SEO fit together?',
    read: { slug: 'local-seo-vs-paid-ads', label: 'Local SEO vs paid ads' },
    steps: [
      {
        title: 'Audit and plan',
        text: 'We look at what you already run, what your competitors run, and what you want more of.',
        we: ['Audit any existing ad accounts', 'Research keywords and competitors', 'Choose services and towns to start with', 'Set a monthly ad budget with you'],
        you: ['One phone call about your business', 'Tell us your best jobs', 'Decide your monthly ad budget'],
        get: ['A clear plan, in plain English', 'A written quote'],
      },
      {
        title: 'Build and track',
        text: 'We build the campaigns and set up tracking before any money is spent.',
        we: ['Create your Google and Meta accounts, or take over yours', 'Write the ads and match them to pages', 'Set up call, form and sales tracking', 'Test that every lead is counted'],
        you: ['Approve the ads', 'Add your payment card to the ad accounts'],
        get: ['Campaigns ready to launch', 'Tracking that works'],
      },
      {
        title: 'Launch and watch',
        text: 'We turn the ads on and watch closely at the start, when changes matter most.',
        we: ['Launch the campaigns', 'Check search terms and calls early', 'Remove wasted searches', 'Adjust bids and budgets'],
        you: ['Answer the phone', 'Tell us which leads were good'],
        get: ['Ads running in your towns', 'Early leads tracked'],
      },
      {
        title: 'Report and improve',
        text: 'Every month we show what happened and improve what is working.',
        we: ['Send a plain-English report', 'Hold a call to go through it', 'Test new ads and pages', 'Move budget to what works'],
        you: ['Read the report and join the call', 'Tell us about new services or slow weeks'],
        get: ['A report on leads and cost per lead', 'A plan for next month'],
      },
    ],
  },

  pricing: {
    eyebrow: 'PRICING',
    heading: 'One monthly fee for management. Ad spend is yours.',
    lede: `Ads have two costs: what we charge to manage them, and what you pay Google and Meta for the clicks. We keep them clearly apart, so you always know where the money goes. Each platform starts with a one-time ${money(PRICES.ads.jumpstart)} Jumpstart.`,
    service: 'ads',
    facts: [
      {
        title: 'What helps decide the plan',
        text: 'The plan sets the price. These things help us tell you which one fits:',
        kind: 'check',
        items: [
          'Whether you run Google, Meta or both',
          'How many services and towns you advertise',
          'How many campaigns the account needs',
          'How competitive your trade is where you work',
        ],
      },
      {
        title: "What's not included",
        text: 'We keep these separate so you always know what you are paying for.',
        kind: 'x',
        items: [
          'Ad spend. You pay Google and Meta directly',
          'SEO and social media. They are separate services with their own plans',
          'A new website or landing page build, priced separately',
          'Phone system or call recording subscriptions, billed by the provider', // CONFIRM
        ],
      },
      {
        title: 'How payment works',
        text: 'No surprises. The prices on this page are the prices.',
        kind: 'check',
        items: [
          `A one-time ${money(PRICES.ads.jumpstart)} Jumpstart for each platform, then billed monthly`,
          'You decide the monthly ad budget and can change it',
          'Ad accounts and history stay with you if you leave',
          `Work outside the plan is always quoted first, at ${HOURLY_LINE}`,
        ],
      },
    ],
    readLead: 'Want help deciding?',
    reads: [
      { slug: 'local-seo-vs-paid-ads', label: 'SEO or ads for a service business' },
      { slug: 'digital-marketing-budget', label: 'how to set a marketing budget' },
    ],
  },

  timeline: {
    eyebrow: 'TIMELINE',
    heading: 'Ads can start within weeks, and keep improving.',
    lede: 'Ads are faster than SEO, but the first weeks are for learning, not for judging. The bar is drawn to scale.',
    phases: [
      { key: 'plan', bar: 'WEEK 1', short: 'Plan', weight: 1, mark: '1', days: 'Week 1', title: 'Audit and plan', text: 'A conversation about your business, your best jobs and your budget. We audit any existing account.', time: 'Your time: about 60 minutes' },
      { key: 'build', bar: 'WEEK 2', short: 'Build', weight: 1, mark: '2', days: 'Week 2', title: 'Build and track', text: 'We build the campaigns, write the ads and set up tracking.', time: 'Your time: about 15 minutes' },
      { key: 'launch', bar: 'WEEKS 3-6', short: 'Launch and learn', weight: 4, mark: '3', days: 'Weeks 3 to 6', title: 'Launch and learn', text: 'Ads go live. We review search terms, calls and forms often and make early adjustments.', time: 'Your time: tell us which leads were good' },
      { key: 'improve', bar: 'MONTH 2+', short: 'Improve', weight: 4, mark: '7', days: 'Month 2 onward', title: 'Report and improve', text: 'Monthly reports, tests and budget moves. Results usually improve as we learn what works.', time: 'Your time: monthly call' },
    ],
    after: { days: 'Any time', title: 'Change or pause', text: 'You choose the ad budget and can change it. Your accounts stay in your name.', time: 'Your call' },
    callout: {
      lead: 'Dates are a plan, not a promise.',
      text: 'The timing depends on how fast we get approvals and account access, and on how competitive your trade is where you work.', // CONFIRM
    },
  },

  success: {
    eyebrow: 'WHAT SUCCESS LOOKS LIKE',
    heading: 'You can check it yourself.',
    lede: 'You do not need a dashboard or a technical report. Go down this list and tick each item as you check it.',
    checklistTitle: 'Your ads checklist',
    doneText: 'All seven checked. That is an ad account you can trust.',
    checks: [
      { title: 'The ad matches the search', text: 'Search one of your services in your town and read the ad that appears.' },
      { title: 'The page matches the ad', text: 'Click the ad and see if the page says the same thing.' },
      { title: 'The call button works', text: 'Tap the phone number on your phone and confirm it rings you.' },
      { title: 'Forms reach you', text: 'Send a test quote request and see it arrive.' },
      { title: 'Calls are counted', text: 'Ask us to show you the calls tracked this month.' },
      { title: 'The account is yours', text: 'Log in to your Google Ads and Meta accounts yourself.' },
      { title: 'You understand the report', text: 'Read this month’s report and confirm it makes sense.' },
    ],
    path: [
      { when: 'Before launch', title: 'Tracking in place', text: 'Calls, forms and sales are counted before ad money is spent.' },
      { when: 'First weeks', title: 'Learning phase', text: 'We see which searches bring real leads and remove the rest.' },
      { when: 'Month by month', title: 'Spend gets sharper', text: 'Budget moves to what works as the account learns.' },
    ],
    nope: {
      title: "What we don't promise",
      items: ['A set number of calls or leads', 'A set cost per lead', 'Results without ad budget behind them'],
    },
  },

  compare: {
    eyebrow: 'HONEST COMPARISON',
    heading: 'Why not run the ads yourself, or hire a bigger agency?',
    lede: 'Each option is right for someone. This is how they compare for a local business that lives on the phone.',
    columns: [
      { name: 'Do it yourself', sub: 'Google’s automated campaigns' },
      { name: 'Freelancer', sub: 'A single independent contractor' },
      { name: 'Large agency', sub: 'A bigger team, more layers' },
      { name: 'Hire in-house', sub: 'Your own marketer' },
    ],
    us: { name: 'MGRTECH', sub: 'Built for local businesses' },
    rows: [
      { label: 'Best for', cells: ['A small budget and time to learn', 'A simple setup with a set budget', 'Large budgets and many accounts', 'A business that advertises all the time'], us: 'A local business that wants calls and wants to see the numbers' },
      { label: 'Your time', cells: ['Hours every week', 'Depends on the person', 'More meetings and more people to brief', 'Hiring and managing someone'], us: 'About an hour to start, then a monthly call' },
      { label: 'Tracking', cells: ['Whatever you set up', 'Depends on the person', 'Usually offered, sometimes extra', 'Depends on the hire'], us: 'Calls and forms tracked before launch' },
      { label: 'Ad account', cells: ['Yours', 'Ask before you hire', 'Ask before you sign', 'Yours'], us: 'In your name, no markup on spend' },
      { label: 'Reporting', cells: ['Whatever the platform shows', 'Depends on the person', 'Often long reports full of jargon', 'Depends on the hire'], us: 'Leads and cost per lead, in plain English' },
      { label: 'Cost', cells: ['Lowest fee, most of your time', 'Varies, and reporting is often extra', 'Highest', 'Salary, tools and management time'], us: `${perMonth(PRICES.ads.tiers[0].monthly)} for one platform, ${perMonth(PRICES.ads.tiers[1].monthly)} for both. Ad spend is extra` },
    ],
    note: 'If one of the others fits you better, we will tell you. More reading:',
    reads: [
      { slug: 'choose-digital-marketing-partner', label: 'choosing a marketing partner' },
      { slug: 'local-seo-vs-paid-ads', label: 'SEO or ads' },
    ],
  },

  fit: {
    eyebrow: "WHO IT'S FOR",
    heading: 'Is this a good fit?',
    lede: "We would rather tell you now than after you've paid. Here is who gets the most from this service, and who doesn't.",
    yesTitle: 'A good fit if',
    yes: [
      'You are a contractor or local service business that gets work by phone',
      'You want calls this week, not only over months',
      'You can set a monthly ad budget',
      'You want to see which ads ring the phone',
      'You want to own your ad accounts',
      'You can answer or return calls quickly',
    ],
    noTitle: 'Probably not the right fit if',
    no: [
      'You want ads with no ad budget',
      'You need a guaranteed number of leads',
      'You do not have a website or landing page and are not ready to build one',
      'You cannot answer or return calls promptly',
      'You want the cheapest possible option',
    ],
  },

  industries: {
    eyebrow: 'INDUSTRIES',
    heading: 'Ads work differently in every trade.',
    lede: 'A plumber and a boutique do not advertise the same way. Pick your kind of business to see what we focus on.',
    note: 'Not on the list? Call and ask.',
    items: [
      {
        tab: 'Trades and contractors',
        title: 'Plumbers, electricians, plasterers, tilers',
        text: 'Customers search when something needs fixing and want a quick answer. Calls matter most.',
        towns: ['Ashland', 'Framingham', 'Natick', 'Your towns'],
        points: ['Call buttons and call tracking first', 'Ads by service and by town', 'Emergency and seasonal searches handled differently', 'Quote form as the second path'],
      },
      {
        tab: 'Auto and motorsports',
        title: 'Repair shops and parts suppliers',
        text: 'Customers search by make, model and job. Specific ads and pages win.',
        points: ['Ads by make, model and service', 'Photos of your real work', 'Directions and phone one tap away', 'Estimate requests sent straight to you'],
      },
      {
        tab: 'Retail and e-commerce',
        title: 'Boutiques and local shops',
        text: 'Shops need people through the door and orders online. Product photos and offers carry the ad.',
        points: ['Product and offer ads on Meta', 'Reminder ads for people who visited the site', 'Local ads for nearby shoppers', 'Clear store details and hours'], // CONFIRM
      },
      {
        tab: 'Local services',
        title: 'Cleaners, landscapers, repair',
        text: 'Customers search "near me" and compare quickly. Fast response wins the job.',
        points: ['Every town you cover targeted', 'Seasonal ads that match what people search', 'Quote requests that reach you instantly', 'Reviews shown in ads where possible'], // CONFIRM
      },
    ],
  },

  guides: {
    eyebrow: 'GUIDES FROM OUR BLOG',
    heading: 'Read up before you decide.',
    lede: 'Short, plain-English guides on the questions people ask us most about paid ads. No sign-up needed.',
  },

  faq: {
    eyebrow: 'QUESTIONS',
    heading: 'What else you may want to know.',
    lede: "Can't find your question? Call and ask. You'll get a straight answer from the person who would run your ads.",
    items: [
      { q: 'How much does ad management cost?', a: `Management is ${perMonth(PRICES.ads.tiers[0].monthly)} for one platform or ${perMonth(PRICES.ads.tiers[1].monthly)} for Google and Meta together, plus a one-time ${money(PRICES.ads.jumpstart)} Jumpstart for each platform. Your ad spend is separate and goes directly to Google and Meta.`, read: { slug: 'digital-marketing-budget', label: 'how to set a marketing budget' } },
      { q: 'How much should I spend on ads?', a: 'It depends on your trade, your towns and how many jobs you want. We help you set a starting budget and you can change it whenever you like.' },
      { q: 'Do you add a markup to my ad spend?', a: 'No. You pay Google and Meta directly and we take no markup on it.' },
      { q: 'Who owns the ad accounts?', a: 'You do. Accounts are in your name, and if you ever leave, the accounts and their history go with you.' },
      { q: 'How soon will ads start?', a: 'After the audit, build and tracking setup. We do not spend your ad money until tracking works.' },
      { q: 'Will you guarantee leads?', a: 'No. Results depend on your market, your budget and your response time. We guarantee tracking and monthly reporting.' },
      { q: 'What is the difference between ads and SEO?', a: 'Ads start working quickly and stop when you stop paying. SEO takes months and keeps working. Many businesses use both.', read: { slug: 'local-seo-vs-paid-ads', label: 'SEO or ads' } },
      { q: 'Do you run Facebook and Instagram ads too?', a: 'Yes. Meta Ads management for Facebook and Instagram is part of the service.' },
      { q: 'How do I know the leads are real?', a: 'We track calls and forms separately and review them with you. You can listen to calls or see forms where tracking allows.' }, // CONFIRM
      { q: 'Do I need a landing page?', a: 'A good one helps a lot. We review the page your ads send people to and recommend changes. A new page is quoted separately.' },
      { q: 'Do you only work with MetroWest businesses?', a: "MetroWest Massachusetts is home, and where most clients are. If you're outside the area and the fit is right, call and we'll talk." },
    ],
  },

  related: {
    eyebrow: 'WORKS WELL WITH',
    heading: 'Related services.',
    lede: 'Ads bring people to you. These services help them choose you.',
    items: [
      { title: 'Website Design and Development', text: 'A fast website made for your business, with the call button where people need it.', href: '/services/website-design' },
      { title: 'SEO', text: 'Be found in the map box and in search over the long run.', href: '/services/seo' },
      { title: 'Social Media', text: 'Regular posts that show you are active and trusted.', href: '/services/social-media' },
      { title: 'AI Automation', text: 'Every inquiry gets a reply right away, and quotes get followed up.', href: '/services/ai-automation' },
    ],
  },

  close: {
    eyebrow: 'FREE ADS REVIEW',
    heading: 'Not sure where your ad money goes?',
    accent: 'Send us your account details.',
    body: "We'll look at what you run today and tell you the 3 things most likely wasting money. It's free, it takes about 10 minutes, and there's no pressure.",
    emailCta: 'Email us about your ads',
  },
};

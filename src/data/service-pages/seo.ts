import { HOURLY_LINE, PRICES, money, perMonth } from '@/data/prices';
import { ICON } from '@/data/service-pages/icons';
import type { ServicePageData } from '@/data/service-pages/types';

/**
 * /services/seo. Plain English for contractors and local service owners.
 *
 * Sources: the repo's SEO packages (src/data/seo-packages.ts), the live site's
 * SEO section, our own blog posts, and a structure-only review of US local SEO
 * providers (what they list, how they price). No wording copied.
 *
 * OPEN for Srii before treating as final:
 *  - Every price comes from src/data/prices.ts. SEO is priced on its own, never bundled
 *    with social media or ads.
 *  - Lines marked CONFIRM are not stated on the live site's SEO section.
 *  - The timeline phases follow our own blog post "how long does SEO take"
 *    and are not a promise. No ranking or call numbers appear anywhere.
 *  - Two FAQ answers were left out of seo-packages.ts on purpose and are
 *    still left out here.
 */
export const SEO_PAGE: ServicePageData = {
  slug: 'seo',
  meta: {
    title: 'SEO for Local Businesses',
    description:
      'Local SEO for contractors and service businesses in MetroWest Massachusetts: Google Business Profile, a page for every town and service, and a plain-English monthly report.',
  },

  hero: {
    breadcrumb: 'SEO',
    headline: "If you're not in the map box,",
    headlineAccent: "you're not in the running.",
    lede: 'We set up your Google listing, your town and service pages, and your articles so Google knows what you do and where. It is a monthly service with a report you can read.',
    secondaryCta: 'Get a free search review',
    facts: [
      { title: 'Monthly service', text: 'Work happens every month, not once.' },
      { title: 'Plain-English report', text: 'You see what moved and what we did.' },
      { title: 'Your accounts', text: 'Google listing and analytics stay in your name.' }, // CONFIRM
      { title: 'No rank promises', text: 'Nobody can honestly guarantee a position.' },
    ],
  },

  problem: {
    eyebrow: 'THE PROBLEM',
    heading: 'If Google does not show you, customers call someone else.',
    lede: 'Most local businesses are missing for the same four reasons. Pick one to see the cause and the fix.',
    items: [
      {
        tag: 'Map box',
        title: 'You are not in the map box',
        peek: 'Competitors show up. You do not.',
        body: 'The map and the three businesses under it get the first look. Google picks them by how complete and trusted a business looks, how close it is, and how well it matches the search.',
        points: [
          'No Google Business Profile, or one nobody has looked at in years',
          'Wrong or missing categories, hours, services and photos',
          'Few reviews, or reviews nobody answered',
          'Your name, address and phone number differ from site to site',
        ],
        read: { slug: 'how-to-rank-google-maps', label: 'How to rank in Google Maps' },
      },
      {
        tag: 'Towns',
        title: 'No page for the towns you serve',
        peek: 'You work there. Google cannot tell.',
        body: 'Google ranks pages, not businesses. If one page says "we serve MetroWest", it will not show up when someone searches for your trade in a specific town.',
        points: [
          'One generic services page for everything',
          'No separate page for each town you actually work in',
          'Service pages that list a service but never say where',
          'Pages that copy each other with only the town name swapped',
        ],
        read: { slug: 'service-area-pages-rank-multiple-cities', label: 'Service area pages that rank in many cities' },
      },
      {
        tag: 'Searches',
        title: 'Your pages answer the wrong questions',
        peek: 'Written for you, not for the searcher.',
        body: 'People search with plain words: the problem they have, the job they need, the town they live in. Pages built around company language never match those words.',
        points: [
          'Service pages written in your trade language, not your customer’s',
          'No articles that answer the questions customers ask before they call',
          'Missing page titles and descriptions, or the same one on every page',
          'No link between related pages on your site',
        ],
        read: { slug: 'local-keyword-research-for-service-businesses', label: 'What do your customers actually type into Google?' },
      },
      {
        tag: 'AI answers',
        title: 'AI tools do not mention you',
        peek: 'Customers now ask ChatGPT and Google AI.',
        body: 'More people ask an AI tool for a recommendation before they search. These tools lean on the same signals as Google: clear pages, a trusted listing, and reviews.',
        points: [
          'Your site does not say plainly what you do, where, and for whom',
          'No structured details (code that labels your business, services and areas)',
          'Thin or missing reviews on the sites these tools read',
          'No helpful articles for the tools to learn from',
        ],
        read: { slug: 'how-chatgpt-finds-businesses', label: 'Getting found when customers ask AI, not Google' },
      },
    ],
  },

  approach: {
    eyebrow: 'OUR APPROACH',
    heading: 'Built around the searches',
    accent: 'that end in a phone call.',
    body: 'We start from what your customers type, then make sure your listing, your pages and your articles line up with it. Rankings follow the work, and we report on the work.',
    checks: [
      'A page for each service and town',
      'Articles that answer customer questions',
      'Your Google Maps listing kept current',
      'A monthly report in plain English',
    ],
    scene: 'seo',
  },

  commitments: {
    heading: 'What that means in practice.',
    lede: 'Four commitments run through every SEO engagement. Here is what each one looks like in the work you receive.',
    rows: [
      {
        tag: 'Calls, not vanity',
        title: 'We chase searches that ring the phone',
        text: 'A top ranking for a phrase nobody searches helps no one. We pick phrases people use when they are ready to hire.',
        points: [
          'Keyword research based on real customer questions',
          'A look at who outranks you today and why',
          'Priority on service plus town searches',
          'No reports built on impressions alone',
        ],
      },
      {
        tag: 'Plain English',
        title: 'You always know what we did',
        text: 'Every month you get a short report and a call to talk through it. No dashboards you have to learn.',
        points: [
          'A monthly report written for owners, not analysts',
          'A consulting call to go through it',
          'A list of what we did and what is next',
          'Direct phone and email access',
        ],
      },
      {
        tag: 'Yours to keep',
        title: 'Your accounts stay yours',
        text: 'The listing, the analytics and the content belong to your business, so nothing is held back if you leave.',
        points: [
          'Google Business Profile owned by you', // CONFIRM
          'Analytics set up in your account', // CONFIRM
          'Articles and pages are yours to keep',
          'No lock-in to one of our tools',
        ],
      },
      {
        tag: 'Honest limits',
        title: 'No promises we cannot keep',
        text: 'Search results depend on your market, your competitors and Google. We tell you what is likely and never guarantee a position.',
        points: [
          'No guaranteed rankings or lead counts',
          'A realistic view of how long it takes',
          'We say so if a service is not worth targeting',
          'We tell you when a different service fits better',
        ],
      },
    ],
  },

  included: {
    eyebrow: "WHAT'S INCLUDED",
    heading: 'Everything it takes to be found nearby.',
    lede: 'Eight areas of work in one place. Flip through them with the list, the arrows, or your keyboard. This is the work behind local SEO.',
    noteLead: 'SEO is priced on its own.',
    note: 'Ads management and social media are separate services with their own plans. Ad spend is paid directly to Google and Meta and is never part of our fee.',
    categories: [
      {
        title: 'Google Business Profile',
        desc: 'Your listing in the map box, set up fully and kept current.',
        icon: ICON.pin,
        read: { slug: 'google-business-profile-optimization', label: 'Optimizing your Google Business Profile' },
        items: [
          [1, 'Profile set up or cleaned up: categories, services, hours, description'],
          [1, 'Photos added and kept fresh'],
          [1, 'Posts and updates published'],
          [1, 'Questions and answers monitored'],
          [1, 'Reviews tracked, with help asking for more'],
          [1, 'Business directory listings with matching name, address and phone'],
        ],
      },
      {
        title: 'Keyword research',
        desc: 'Finding the searches that lead to calls, and who is winning them now.',
        icon: ICON.search,
        read: { slug: 'local-keyword-research-for-service-businesses', label: 'Local keyword research for service businesses' },
        items: [
          [1, 'Priority services and towns chosen with you'],
          [1, 'Questions customers ask before they hire'],
          [1, 'Analysis of who outranks you and why'],
          [1, 'Keyword tracking dashboard'],
          [1, 'A plan for which page targets which search'],
        ],
      },
      {
        title: 'Service and town pages',
        desc: 'A page for each service and each town, written for the people who search.',
        icon: ICON.doc,
        read: { slug: 'how-to-write-service-pages', label: 'How to write service pages' },
        items: [
          [1, 'Website content development for new and existing pages'],
          [1, 'A separate page for each service you offer'],
          [1, 'A separate page for each town you work in'],
          [1, 'Plain-English writing, not keyword stuffing'],
          [1, 'Questions and answers written into the pages'],
          [1, 'Links between related pages'],
        ],
      },
      {
        title: 'On-page and technical SEO',
        desc: 'The behind-the-scenes work that lets Google read your site properly.',
        icon: ICON.cards,
        read: { slug: 'on-page-seo-checklist', label: 'On-page SEO checklist' },
        items: [
          [1, 'Technical SEO audit and fixes'],
          [1, 'Page titles, descriptions and headings written for each page'],
          [1, 'Copy edits to existing pages'],
          [1, 'Schema markup (code that labels your business, services and areas)'],
          [1, 'Google Analytics installed and set up'],
          [1, 'Site speed and phone checks'],
        ],
      },
      {
        title: 'Articles and content',
        desc: 'Helpful articles that answer questions and keep bringing in searches.',
        icon: ICON.mail,
        read: { slug: 'why-every-local-business-needs-blog', label: 'Why every local business needs a blog' },
        items: [
          [1, 'A content plan built from customer questions'],
          [1, 'Blogging: articles written and published for you'],
          [1, 'Articles linked to the service pages they support'],
          [1, 'Old content refreshed when it falls out of date'],
        ],
      },
      {
        title: 'Authority and links',
        desc: 'Building the trust signals Google looks for beyond your own site.',
        icon: ICON.link,
        read: { slug: 'what-are-local-citations', label: 'What are local citations?' },
        items: [
          [1, 'Link-building'],
          [1, 'Citations on trusted directories'],
          [1, 'Reviews strategy to build proof over time'],
          [1, 'Checks for incorrect or duplicate listings'],
        ],
      },
      {
        title: 'AI search readiness',
        desc: 'Helping AI tools and Google AI answers understand and mention you.',
        icon: ICON.bolt,
        read: { slug: 'optimize-for-ai-search', label: 'How to optimize for AI search' },
        items: [
          [1, 'Pages that say plainly what you do, where, and for whom'],
          [1, 'Questions and answers structured for AI to read'],
          [1, 'Consistent business details across the web'],
          [1, 'Tracking of how AI tools describe you'], // CONFIRM
        ],
      },
      {
        title: 'Reporting',
        desc: 'A report you can read, every month.',
        icon: ICON.chart,
        read: { slug: 'local-seo-vs-paid-ads', label: 'Local SEO vs paid ads' },
        items: [
          [1, 'Monthly SEO report in plain English'],
          [1, 'A monthly consulting call'],
          [1, 'Keyword tracking dashboard and Google Analytics'],
          [1, 'A plan for next month, every month'],
        ],
      },
    ],
  },

  how: {
    eyebrow: 'HOW IT WORKS',
    heading: 'Four steps, and most of the work is ours.',
    lede: 'You only spend time where your input matters. Each step shows what we do, what you do, and what you get at the end of it.',
    readLead: 'Want the longer version?',
    read: { slug: 'local-seo-101', label: 'Local SEO 101 for service businesses' },
    steps: [
      {
        title: 'Audit and plan',
        text: 'We start by finding out where you stand today and which searches matter most.',
        we: ['Review your Google listing, site and directory listings', 'Research the searches in your trade and towns', 'See who outranks you and why', 'Choose priority services and towns with you'],
        you: ['One phone call about your business', 'Share logins you already have', 'Tell us which jobs you want more of'],
        get: ['A clear plan, in plain English', 'A written quote'],
      },
      {
        title: 'Fix the foundation',
        text: 'We fix what is holding you back before we add anything new.',
        we: ['Set up or clean up your Google Business Profile', 'Fix technical problems on your site', 'Make business details match everywhere', 'Install analytics'],
        you: ['Approve the listing details', 'Send recent job photos'],
        get: ['A complete, correct listing', 'A site Google can read properly'],
      },
      {
        title: 'Build pages and articles',
        text: 'We write the pages and articles that answer what customers search.',
        we: ['Write a page for each service and town', 'Publish articles that answer customer questions', 'Link related pages together', 'Build trust signals beyond your site'],
        you: ['Review drafts when we send them', 'Tell us if anything is not quite right'],
        get: ['New pages and articles on your site', 'Content you own'],
      },
      {
        title: 'Report and improve',
        text: 'Every month we show what moved, then adjust the plan.',
        we: ['Send a plain-English report', 'Hold a consulting call', 'Update keywords, pages and your listing', 'Plan the next month'],
        you: ['Read the report and join the call', 'Tell us about new jobs, towns or services'],
        get: ['A report you can read', 'A plan for next month'],
      },
    ],
  },

  pricing: {
    eyebrow: 'PRICING',
    heading: 'Three monthly plans and one setup fee.',
    lede: `Local SEO builds over time, so it is a monthly service. Every plan starts with a one-time ${money(PRICES.seo.setup)} setup. SEO is priced on its own, separate from social media and ads.`,
    service: 'seo',
    facts: [
      {
        title: 'What helps decide the plan',
        text: 'The plan sets the price. These things help us tell you which one fits:',
        kind: 'check',
        items: [
          'How many towns and service areas you compete in',
          'How competitive your trade is where you work',
          'How many pages and articles you need each month',
          'The condition of your current site and listing',
        ],
      },
      {
        title: "What's not included",
        text: 'We keep these separate so you always know what you are paying for.',
        kind: 'x',
        items: [
          'Ad spend. You pay Google and Meta directly',
          'Ads management and social media. They are separate services with their own plans',
          'A new website build. That is priced separately',
        ],
      },
      {
        title: 'How payment works',
        text: 'No surprises. The prices on this page are the prices.',
        kind: 'check',
        items: [
          `A one-time ${money(PRICES.seo.setup)} setup, then billed monthly`,
          'No mystery subscriptions. Every monthly fee is shown here',
          `Work outside the plan is always quoted first, at ${HOURLY_LINE}`,
          'Cancel with notice, no long contract', // CONFIRM
        ],
      },
    ],
    readLead: 'Want help comparing?',
    reads: [
      { slug: 'digital-marketing-budget', label: 'how to set a marketing budget' },
      { slug: 'choose-digital-marketing-partner', label: 'how to choose a marketing partner' },
    ],
  },

  timeline: {
    eyebrow: 'TIMELINE',
    heading: 'SEO builds over months, not days.',
    lede: 'A realistic first year is shown below. Every market is different, and no one can promise a date. The bar is drawn to scale: the early months are mostly work you cannot see yet.',
    phases: [
      { key: 'found', bar: 'MONTH 1-2', short: 'Foundation', weight: 2, mark: '1', days: 'Months 1 to 2', title: 'Foundation', text: 'Listing, technical fixes and core pages. Most of the work happens here and rankings barely move.', time: 'Your time: about 1 hour' },
      { key: 'signs', bar: 'MONTH 3-4', short: 'First signs', weight: 2, mark: '3', days: 'Months 3 to 4', title: 'First signs of life', text: 'New pages start to appear in results, often on page two or three. Impressions rise before clicks do.', time: 'Your time: reviewing drafts' },
      { key: 'move', bar: 'MONTH 5-8', short: 'Real movement', weight: 4, mark: '5', days: 'Months 5 to 8', title: 'Real movement', text: 'More map appearances and more consistent results, with a measurable trickle of calls and forms.', time: 'Your time: monthly call' },
      { key: 'compound', bar: 'MONTH 9-12', short: 'Compounding', weight: 4, mark: '9', days: 'Months 9 to 12', title: 'Compounding', text: 'Older content gains strength and new content ranks faster. Search becomes a steadier source of leads.', time: 'Your time: monthly call' },
    ],
    after: { days: 'After year one', title: 'Keep going', text: 'The businesses that look dominant in local search are usually the ones that kept going past the first six months.', time: 'Ongoing, month to month' },
    callout: {
      lead: 'About one hour to start, then a monthly call.',
      text: 'This pattern comes from how local search usually unfolds. It is not a promise. Delays usually come from late logins, late approvals or a very competitive market.',
    },
  },

  success: {
    eyebrow: 'WHAT SUCCESS LOOKS LIKE',
    heading: 'You can check it yourself.',
    lede: 'You do not need to learn a dashboard. Go down this list and tick each item as you check it.',
    checklistTitle: 'Your search checklist',
    doneText: 'All seven checked. That is a business Google can understand and recommend.',
    checks: [
      { title: 'Your listing is correct', text: 'Search your business name and check the hours, phone, services and photos.' },
      { title: 'You show in the map box', text: 'Search your trade plus a town you serve, on your phone.' },
      { title: 'Each service has a page', text: 'Open your site and find a page for every service you offer.' },
      { title: 'Each town has a page', text: 'Find a page for each town you want work in.' },
      { title: 'Your details match', text: 'Name, address and phone are the same on your site and your listings.' },
      { title: 'You get a report', text: 'Read this month’s report and see what changed.' },
      { title: 'You can ask an AI', text: 'Ask an AI tool for a company in your trade and town and see what it says.' },
    ],
    path: [
      { when: 'First month', title: 'A complete foundation', text: 'Listing, details and technical fixes in place.' },
      { when: 'First months', title: 'Google starts testing you', text: 'New pages are found and shown to some searchers.' },
      { when: 'Several months', title: 'Visibility builds', text: 'More map appearances and more calls from search as trust accumulates.' },
    ],
    nope: {
      title: "What we don't promise",
      items: ['A number-one ranking by a set date', 'A set number of calls or leads', 'Fast results. Trust takes time to earn'],
    },
  },

  compare: {
    eyebrow: 'HONEST COMPARISON',
    heading: 'Why not do it yourself, or hire a bigger agency?',
    lede: 'Each option is right for someone. This is how they compare for a local business that lives on the phone.',
    columns: [
      { name: 'Do it yourself', sub: 'Tools and tutorials' },
      { name: 'Freelancer', sub: 'A single independent contractor' },
      { name: 'Large agency', sub: 'A bigger team, more layers' },
      { name: 'Hire in-house', sub: 'Your own marketer' },
    ],
    us: { name: 'MGRTECH', sub: 'Built for local businesses' },
    rows: [
      { label: 'Best for', cells: ['A tiny budget and time to learn', 'A specific task with a set budget', 'Large budgets and many locations', 'A business large enough to need daily marketing'], us: 'A local business that wants it handled, month after month' },
      { label: 'Your time', cells: ['Hours every week', 'Depends on the person', 'More meetings and more people to brief', 'Hiring and managing someone'], us: 'About one hour to start, then a monthly call' },
      { label: 'Website and listing', cells: ['You do it all', 'Depends on the person', 'Often a separate team', 'Depends on the hire'], us: 'We do the pages, listing and articles together' },
      { label: 'Ownership', cells: ['Yours', 'Ask before you hire', 'Ask before you sign', 'Yours'], us: 'Listing, analytics and content in your name' },
      { label: 'Reporting', cells: ['Whatever you build', 'Depends on the person', 'Often long reports full of jargon', 'Depends on the hire'], us: 'A short monthly report in plain English' },
      { label: 'Cost', cells: ['Lowest upfront, most of your time', 'Varies, and reporting is often extra', 'Highest', 'Salary, tools and management time'], us: `${perMonth(PRICES.seo.tiers[0].monthly)} to ${perMonth(PRICES.seo.tiers[2].monthly)}, shown openly` },
    ],
    note: 'If one of the others fits you better, we will tell you. More reading:',
    reads: [
      { slug: 'choose-digital-marketing-partner', label: 'choosing a marketing partner' },
      { slug: 'local-seo-mistakes-contractors-make', label: 'local SEO mistakes contractors make' },
    ],
  },

  fit: {
    eyebrow: "WHO IT'S FOR",
    heading: 'Is this a good fit?',
    lede: "We would rather tell you now than after you've paid. Here is who gets the most from this service, and who doesn't.",
    yesTitle: 'A good fit if',
    yes: [
      'You are a contractor or local service business that gets work by phone',
      'You serve more than one town and want to show up in all of them',
      'Competitors appear above you in the map box',
      'You want one place that handles your listing, pages and articles',
      'You can wait several months for the full effect',
      'You want a report you can actually read',
    ],
    noTitle: 'Probably not the right fit if',
    no: [
      'You need guaranteed rankings by a set date',
      'You want leads this week with no ads',
      'You do not have a website and are not ready to build one',
      'You want the cheapest possible option',
      'You expect results without giving feedback',
    ],
  },

  industries: {
    eyebrow: 'INDUSTRIES',
    heading: 'Searches look different in every trade.',
    lede: 'A plumber and a boutique do not search the same way. Pick your kind of business to see what we focus on.',
    note: 'Not on the list? Call and ask.',
    items: [
      {
        tab: 'Trades and contractors',
        title: 'Plumbers, electricians, plasterers, tilers',
        text: 'Customers search by job and town, often in a hurry. Map box visibility and town pages matter most.',
        towns: ['Ashland', 'Framingham', 'Natick', 'Your towns'],
        points: ['A page for each service and each town', 'Emergency and seasonal searches covered', 'Reviews and photos kept current', 'Quote request easy to find'],
      },
      {
        tab: 'Auto and motorsports',
        title: 'Repair shops and parts suppliers',
        text: 'Customers search by make, model and job. Specific pages and a strong listing win the call.',
        points: ['Pages by make, model and service', 'Hours, services and photos kept accurate', 'Reviews that mention the work', 'Directions and phone one tap away'],
      },
      {
        tab: 'Retail and e-commerce',
        title: 'Boutiques and local shops',
        text: 'Shops need to be found nearby and online. Product detail and local signals both count.',
        points: ['Product and category pages written for search', 'A local listing that shows opening hours and stock', 'Photos that match what people search for', 'Local pickup or delivery details, if you offer them'], // CONFIRM
      },
      {
        tab: 'Local services',
        title: 'Cleaners, landscapers, repair',
        text: 'Customers search "near me". Coverage of every town you serve does most of the work.',
        points: ['Every town you cover set up for local search', 'Seasonal pages that match what people search at each time of year', 'Quote requests that reach you quickly', 'Reviews requested after each job'],
      },
    ],
  },

  guides: {
    eyebrow: 'GUIDES FROM OUR BLOG',
    heading: 'Read up before you decide.',
    lede: 'Short, plain-English guides on the questions people ask us most about being found on Google. No sign-up needed.',
  },

  faq: {
    eyebrow: 'QUESTIONS',
    heading: 'What else you may want to know.',
    lede: "Can't find your question? Call and ask. You'll get a straight answer from the person who would do the work.",
    items: [
      { q: 'How much does SEO cost?', a: `There are three monthly plans, ${perMonth(PRICES.seo.tiers[0].monthly)}, ${perMonth(PRICES.seo.tiers[1].monthly)} and ${perMonth(PRICES.seo.tiers[2].monthly)}, plus a one-time ${money(PRICES.seo.setup)} setup. They are priced openly on this page, and SEO is separate from social media and ads.`, read: { slug: 'digital-marketing-budget', label: 'how to set a marketing budget' } },
      { q: 'How long until I see results?', a: 'Local SEO usually shows first signs in months three and four, with real movement later in the first year. Nobody can promise a date, and anyone who does is selling something.', read: { slug: 'how-long-does-seo-take', label: 'the honest SEO timeline' } },
      { q: 'What do you need from me?', a: 'One call about your business, logins to anything that already exists (your Google listing, your site, analytics), and photos of recent jobs. We handle the rest and send you drafts to approve.' },
      { q: 'Do I own my Google listing and accounts?', a: 'Yes. Your listing, analytics and content belong to your business. If you ever leave, they go with you.' }, // CONFIRM
      { q: 'Do I need a new website first?', a: 'Not always. We audit what you have. If the site blocks results, we tell you and quote the fix separately.' },
      { q: 'Will you guarantee a ranking?', a: 'No. Rankings depend on your market, your competitors and Google. We guarantee the work, and we report on it every month.' },
      { q: 'Is social media or ad management included?', a: 'No. Local SEO, ads management and social media are separate services with their own plans, and you can add any of them. Ad spend is always separate and goes directly to Google and Meta.' },
      { q: 'Do you write the articles?', a: 'Yes. We plan, write and publish them, and you review each one before it goes live.' },
      { q: 'Is there a long contract?', a: 'Plans are billed monthly. Notice terms are confirmed in writing before you start.' }, // CONFIRM
      { q: 'Will AI tools like ChatGPT mention my business?', a: 'We cannot control what they say. We make your pages, listing and reviews clear so they have good information to use.', read: { slug: 'how-chatgpt-finds-businesses', label: 'how AI tools find businesses' } },
      { q: 'Do you only work with MetroWest businesses?', a: "MetroWest Massachusetts is home, and where most clients are. If you're outside the area and the fit is right, call and we'll talk." },
    ],
  },

  related: {
    eyebrow: 'WORKS WELL WITH',
    heading: 'Related services.',
    lede: 'Being found is one part. These services help turn a visit into a call.',
    items: [
      { title: 'Website Design and Development', text: 'A fast website made for your business, with a page for every service and town.', href: '/services/website-design' },
      { title: 'Google Ads and Meta Ads', text: 'Ads that put you in front of customers this week while SEO builds.', href: '/services/google-ads' },
      { title: 'Social Media', text: 'Regular posts that show you are active and trusted.', href: '/services/social-media' },
      { title: 'AI Automation', text: 'Every inquiry gets a reply right away, and quotes get followed up.', href: '/services/ai-automation' },
    ],
  },

  close: {
    eyebrow: 'FREE SEARCH REVIEW',
    heading: 'Not sure where you show up?',
    accent: 'Send us your web address.',
    body: "We'll check your map ranking, your listing and your site, and tell you the 3 things most likely costing you calls. It's free, it takes about 10 minutes, and there's no pressure.",
    emailCta: 'Email us your web address',
  },
};

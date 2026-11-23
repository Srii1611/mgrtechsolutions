import { HOURLY_LINE, PRICES, perMonth } from '@/data/prices';
import { ICON } from '@/data/service-pages/icons';
import type { ServicePageData } from '@/data/service-pages/types';

/**
 * /services/social-media. Plain English for contractors and local service owners.
 *
 * Sources: the repo's social retainer (src/data/social-packages.ts, three
 * tiers for service trades), the live site's Social Media & Content section,
 * our own blog posts, and a structure-only review of US contractor social
 * media providers. No wording copied.
 *
 * OPEN for Srii before treating as final:
 *  - Every price comes from src/data/prices.ts. Social media is priced on its own,
 *    separate from SEO.
 *  - TODO(Srii): post counts and shoots per tier below come from the old package
 *    sheet; confirm they still match the new tiers.
 *  - Lines marked CONFIRM are not stated on the live site or in the repo.
 *  - The internal upsell notes in social-packages.ts are deliberately NOT on
 *    this page.
 *  - Tiers are for service trades. E-commerce and retail are scoped
 *    individually, as the repo says.
 *  - Post counts per tier come from social-packages.ts.
 */
export const SOCIAL_PAGE: ServicePageData = {
  slug: 'social-media',
  meta: {
    title: 'Social Media Management',
    description:
      'Done-for-you social media for contractors and service businesses in MetroWest Massachusetts: on-site job shoots, captions, scheduling and replies, all handled for you.',
  },

  hero: {
    breadcrumb: 'SOCIAL MEDIA',
    headline: 'Your crew does the work.',
    headlineAccent: 'We make sure people see it.',
    lede: 'A homeowner comparing two contractors looks both up online. We shoot your jobs, write the captions and handle the posting all month, so you never pick up a camera.',
    secondaryCta: 'Get a free feed review',
    facts: [
      { title: 'We come to you', text: 'On-site shoots at your jobs, every month.' },
      { title: 'Everything handled', text: 'Captions, scheduling and replies included.' },
      { title: 'Three tiers', text: 'Pick the cadence that fits your business.' },
      { title: 'Monthly service', text: 'A steady feed beats a burst of posts.' },
    ],
  },

  problem: {
    eyebrow: 'THE PROBLEM',
    heading: 'A quiet feed costs you jobs before anyone calls.',
    lede: 'Most contractors have the same four problems with social media. Pick one to see the cause and the fix.',
    items: [
      {
        tag: 'Quiet',
        title: 'Your last post was months ago',
        peek: 'A dormant feed looks like a dormant business.',
        body: 'People look you up before they call. A page that has not been touched in months makes them wonder if you are still working.',
        points: [
          'No posts for weeks or months',
          'Old holiday posts still at the top',
          'Different looks and tones from post to post',
          'No one owns the job of posting',
        ],
        read: { slug: 'blog-content-builds-trust', label: 'How content builds trust' },
      },
      {
        tag: 'No proof',
        title: 'Nothing shows your real work',
        peek: 'Stock photos and logos do not win jobs.',
        body: 'Your best sales material is finished jobs. Photos and videos of real work, from real towns, show the quality before you say a word.',
        points: [
          'Job photos stay on your phone',
          'Before and after shots never get posted',
          'No short videos of the work in progress',
          'No customers, crews or trucks shown',
        ],
        read: { slug: 'video-content-for-local-businesses', label: 'Video for your business, no crew needed' },
      },
      {
        tag: 'No time',
        title: 'You are on the job, not on your phone',
        peek: 'It gets done last, then not at all.',
        body: 'You are busy running crews. Posting well takes planning, shooting, writing and publishing, and it is the first thing to slip.',
        points: [
          'No content plan or calendar',
          'Photos not taken while the work is happening',
          'Captions written in a rush, or not at all',
          'No steady rhythm',
        ],
        read: { slug: 'how-to-repurpose-blog-content', label: 'Turn one job into a month of posts' },
      },
      {
        tag: 'Silent',
        title: 'Comments and messages go unanswered',
        peek: 'A question left hanging is a lost customer.',
        body: 'Some people ask a question or request a quote through a comment or message. If no one answers, they go somewhere else.',
        points: [
          'Comments left without a reply',
          'Direct messages seen days later',
          'Review responses missing',
          'No one watching the page',
        ],
        read: { slug: 'how-to-get-more-google-reviews', label: 'How to get more Google reviews' },
      },
    ],
  },

  approach: {
    eyebrow: 'OUR APPROACH',
    heading: 'Social media that shows',
    accent: 'you are active and trusted.',
    body: 'We turn your real jobs into a steady feed. We shoot on site, write the captions, schedule the posts and answer the comments, so people see an active business every time they look you up.',
    checks: [
      'Photos and videos from your jobs',
      'A caption written for every post',
      'Posted on schedule for you',
      'Comments and messages answered',
    ],
    scene: 'social',
  },

  commitments: {
    heading: 'What that means in practice.',
    lede: 'Four commitments run through every month of work. Here is what each one looks like in the work you receive.',
    rows: [
      {
        tag: 'Real work',
        title: 'Your jobs, not stock photos',
        text: 'Every post comes from your actual work, so people see what they would be hiring.',
        points: [
          'On-site shoots at your job sites',
          'Videos and images of work in progress and finished',
          'Before and after shots',
          'Your crew, trucks and tools shown honestly',
        ],
      },
      {
        tag: 'Done for you',
        title: 'You never write or schedule a post',
        text: 'From the shoot to the caption to the publish button, we handle it all.',
        points: [
          'Captions written for every post',
          'Scheduling and publishing handled',
          'A content calendar planned ahead',
          'You approve anything you want to see first', // CONFIRM
        ],
      },
      {
        tag: 'Steady',
        title: 'A rhythm you can count on',
        text: 'A steady cadence signals an active, credible business. A dormant feed signals the opposite.',
        points: [
          'A set number of posts every month',
          'One or two shoots each month, by tier',
          'Posts spread across the month',
          'No bursts followed by silence',
        ],
      },
      {
        tag: 'Answered',
        title: 'Comments and messages get a reply',
        text: 'A question left hanging can cost you a job. We keep an eye on the page.',
        points: [
          'Comments answered',
          'Messages answered',
          'Questions passed to you when we need an answer',
          'No fake replies or invented claims',
        ],
      },
    ],
  },

  included: {
    eyebrow: "WHAT'S INCLUDED",
    heading: 'Everything it takes to keep your feed active.',
    lede: 'Eight areas of work in one place. Flip through them with the list, the arrows, or your keyboard. Everything is in every tier unless a line says otherwise.',
    noteLead: 'Tiers build on each other.',
    note: 'Standard includes everything in Basic, and Growth includes everything in Standard. Paid ads are not part of this service.',
    tierLabels: { 2: 'Standard and Growth', 3: 'Growth only' },
    categories: [
      {
        title: 'On-site shoots',
        desc: 'We come to your job sites and capture the work.',
        icon: ICON.camera,
        read: { slug: 'video-content-for-local-businesses', label: 'Video for your business, no crew needed' },
        items: [
          [1, 'One on-site shoot every month'],
          [2, 'A second on-site shoot every month'],
          [1, 'Photos and short videos from real jobs'],
          [1, 'Before, during and after shots'],
          [1, 'Scheduling the shoot around your jobs'],
        ],
      },
      {
        title: 'Photos and videos',
        desc: 'The raw shoot becomes a month of finished posts.',
        icon: ICON.play,
        read: { slug: 'how-to-repurpose-blog-content', label: 'Turn one job into a month of posts' },
        items: [
          [1, 'Videos each month: 4 on Basic, 8 on Standard, 12 on Growth'],
          [1, 'Images each month: 8 on Basic, 12 on Standard, 16 on Growth'],
          [1, 'Short clips cut from the same shoot'],
          [1, 'Edited, cropped and sized for each platform'],
          [1, 'A consistent look across the feed'],
        ],
      },
      {
        title: 'Posts per month',
        desc: 'A steady cadence that matches the tier.',
        icon: ICON.calendar,
        items: [
          [1, 'Total posts each month: 12 on Basic, 20 on Standard, 28 on Growth'],
          [1, 'Posts spread across the month'],
          [1, 'A content plan made ahead of time'],
          [1, 'Every post built from your real jobs, not stock images'],
        ],
      },
      {
        title: 'Captions',
        desc: 'Words written to sound like you, in plain English.',
        icon: ICON.doc,
        items: [
          [1, 'A caption written for every post'],
          [1, 'Plain English, no jargon'],
          [1, 'Town and service mentioned where it fits'],
          [1, 'A clear next step, such as calling'],
        ],
      },
      {
        title: 'Scheduling and publishing',
        desc: 'We handle the posting so you do not have to.',
        icon: ICON.cards,
        items: [
          [1, 'Posts scheduled in advance'],
          [1, 'Published on the right platforms'],
          [1, 'Timing chosen to fit when your customers are online'], // CONFIRM
          [1, 'Page profile kept tidy'],
        ],
      },
      {
        title: 'Community management',
        desc: 'Comments and messages answered, so no one is left hanging.',
        icon: ICON.chat,
        read: { slug: 'how-to-handle-negative-reviews', label: 'How to handle negative reviews' },
        items: [
          [1, 'Comments answered'],
          [1, 'Messages answered'],
          [1, 'Questions that need you passed on quickly'],
          [1, 'Calm, professional replies to criticism'],
        ],
      },
      {
        title: 'Reviews and proof',
        desc: 'Turning happy customers into posts and reviews.',
        icon: ICON.star,
        read: { slug: 'how-to-get-more-google-reviews', label: 'How to get more Google reviews' },
        items: [
          [1, 'Happy customers featured with their permission'],
          [1, 'Review requests built into your routine'],
          [1, 'Review replies drafted for you'], // CONFIRM
          [1, 'Reviews shared as posts'],
        ],
      },
      {
        title: 'Reporting and extras',
        desc: 'What happened this month, and what sits outside the service.',
        icon: ICON.chart,
        items: [
          [1, 'A monthly summary of what was posted'],
          [1, 'What worked and what we will try next'],
          [3, 'The fullest cadence for businesses scaling their presence'],
          [1, 'Paid ads and boosted posts are not part of this service'],
        ],
      },
    ],
  },

  how: {
    eyebrow: 'HOW IT WORKS',
    heading: 'Four steps, and most of the work is ours.',
    lede: 'You only spend time where your input matters. Each step shows what we do, what you do, and what you get at the end of it.',
    readLead: 'Want the full picture?',
    read: { slug: 'content-calendar-template-contractors', label: 'A content calendar for contractors' },
    steps: [
      {
        title: 'Plan',
        text: 'We start with a conversation about your work, your towns and the jobs you want more of.',
        we: ['Learn your services, towns and best jobs', 'Look at your current pages and your competitors', 'Plan a month of content', 'Pick your tier with you'],
        you: ['One phone call about your business', 'Share logins or add us to your pages', 'Tell us which jobs to feature'],
        get: ['A content plan', 'A written quote'],
      },
      {
        title: 'Shoot',
        text: 'We come to a job and capture the work, with as little disruption as possible.',
        we: ['Schedule the shoot around your jobs', 'Capture photos and short videos', 'Ask permission before showing customers or homes', 'Collect what we need to tell the story'],
        you: ['Tell us when and where the work is happening', 'Let us on site'],
        get: ['A full set of photos and videos from your real work'],
      },
      {
        title: 'Create and schedule',
        text: 'We turn the shoot into posts, write the captions and set them to publish.',
        we: ['Edit photos and videos', 'Write a caption for every post', 'Schedule posts across the month', 'Show you the plan'],
        you: ['Look the plan over if you like', 'Tell us if anything should change'],
        get: ['A month of scheduled posts'],
      },
      {
        title: 'Post and reply',
        text: 'Posts go out on schedule, and we answer comments and messages.',
        we: ['Publish on schedule', 'Answer comments and messages', 'Pass on questions that need you', 'Send a monthly summary'],
        you: ['Answer the questions we pass on', 'Tell us about new jobs worth showing'],
        get: ['An active feed', 'Replies handled', 'A monthly summary'],
      },
    ],
  },

  pricing: {
    eyebrow: 'PRICING',
    heading: 'Three monthly tiers, with on-site shoots.',
    lede: 'Social media is a monthly service because consistency is the whole point. Pick the cadence that matches how often you want to be seen. If you are between two, we will tell you which fits on the call.',
    service: 'social',
    facts: [
      {
        title: 'What helps decide the tier',
        text: 'The tier sets the price. These things help us tell you which one fits:',
        kind: 'check',
        items: ['How many shoots and posts you want each month', 'How far we travel to your job sites', 'How many platforms you want covered', 'Shops and retail also need product shots'],
      },
      {
        title: "What's not included",
        text: 'We keep these separate so you always know what you are paying for.',
        kind: 'x',
        items: ['Paid ad management and boosted posts. That is a separate service', 'SEO. It is a separate service with its own plans', 'Motion graphics and animated overlays', 'A dedicated strategist or monthly strategy calls'],
      },
      {
        title: 'How payment works',
        text: 'No surprises. The prices on this page are the prices.',
        kind: 'check',
        items: [
          'Billed monthly, shown openly. No mystery subscriptions',
          `Anything outside the tier is quoted first, at ${HOURLY_LINE}, never folded in quietly`,
          'Notice terms confirmed in writing before you start', // CONFIRM
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
    heading: 'A first month, then a steady rhythm.',
    lede: 'The first month gets you set up and posting. After that, the same simple cycle repeats every month. The bar is drawn to scale.',
    phases: [
      { key: 'plan', bar: 'WEEK 1', short: 'Plan', weight: 1, mark: '1', days: 'Week 1', title: 'Plan', text: 'A conversation about your work and towns, and a content plan for the first month.', time: 'Your time: about 60 minutes' },
      { key: 'shoot', bar: 'WEEK 2', short: 'First shoot', weight: 1, mark: '2', days: 'Week 2', title: 'First shoot', text: 'We come to a job and capture photos and videos of the work.', time: 'Your time: let us on site' },
      { key: 'create', bar: 'WEEK 3', short: 'Create', weight: 1, mark: '3', days: 'Week 3', title: 'Create and schedule', text: 'We edit, write captions and schedule posts.', time: 'Your time: look the plan over' },
      { key: 'live', bar: 'WEEK 4+', short: 'Live', weight: 3, mark: '4', days: 'Week 4 onward', title: 'Posting and replies', text: 'Posts go out on schedule and we answer comments and messages every month.', time: 'Your time: answer the questions we pass on' },
    ],
    after: { days: 'Every month', title: 'The cycle repeats', text: 'Shoot, create, schedule, post and reply, with a short summary each month.', time: 'Month to month' },
    callout: {
      lead: 'The first month is the longest.',
      text: 'Timing depends on when we can get on site and when we have access to your pages. The earlier we get photos and logins, the sooner posting starts.', // CONFIRM
    },
  },

  success: {
    eyebrow: 'WHAT SUCCESS LOOKS LIKE',
    heading: 'You can check it yourself.',
    lede: 'You do not need an analytics report. Go down this list and tick each item as you check it.',
    checklistTitle: 'Your feed checklist',
    doneText: 'All seven checked. That is a feed that looks like an active, trusted business.',
    checks: [
      { title: 'There is a recent post', text: 'Open your page and look for something posted in the last week or two.' },
      { title: 'The posts show real jobs', text: 'Scroll your feed and look for your own work.' },
      { title: 'Captions read well', text: 'Read a few captions and check they sound like you.' },
      { title: 'The rhythm is steady', text: 'Look at the dates and check there are no long gaps.' },
      { title: 'Comments are answered', text: 'Check the comments on a recent post.' },
      { title: 'Messages are answered', text: 'Check your inbox for unanswered messages.' },
      { title: 'You get a monthly summary', text: 'Read this month’s summary.' },
    ],
    path: [
      { when: 'First month', title: 'A feed that looks alive', text: 'Real job posts go out on a steady schedule.' },
      { when: 'Next months', title: 'Customers notice', text: 'People who look you up see recent work and a steady page.' },
      { when: 'Over time', title: 'Trust builds', text: 'A steady feed adds to your reviews and your reputation.' },
    ],
    nope: {
      title: "What we don't promise",
      items: ['A set number of followers or likes', 'A set number of leads from social media', 'Instant results. Trust builds over time'],
    },
  },

  compare: {
    eyebrow: 'HONEST COMPARISON',
    heading: 'Why not post it yourself, or hire a bigger agency?',
    lede: 'Each option is right for someone. This is how they compare for a business that is busy running crews.',
    columns: [
      { name: 'Do it yourself', sub: 'You shoot and post' },
      { name: 'Freelancer', sub: 'A single independent contractor' },
      { name: 'Large agency', sub: 'A bigger team, more layers' },
      { name: 'Hire in-house', sub: 'Your own social person' },
    ],
    us: { name: 'MGRTECH', sub: 'Built for local businesses' },
    rows: [
      { label: 'Best for', cells: ['A tiny budget and time to post', 'A set number of posts on a budget', 'Large budgets and many channels', 'A business that posts every day'], us: 'A busy trades business that wants a steady feed handled' },
      { label: 'Your time', cells: ['Hours every week', 'Depends on the person', 'More meetings and more people to brief', 'Hiring and managing someone'], us: 'About an hour to start, then little' },
      { label: 'Job-site shoots', cells: ['You take the photos', 'Depends on the person', 'Often stock images or remote', 'Depends on the hire'], us: 'We come to your job sites' },
      { label: 'Replies', cells: ['You answer when you can', 'Depends on the person', 'Sometimes extra', 'Your own employee'], us: 'Comments and messages answered' },
      { label: 'Ownership', cells: ['Yours', 'Ask before you hire', 'Ask before you sign', 'Yours'], us: 'Your pages, your photos and videos' },
      { label: 'Cost', cells: ['Lowest fee, most of your time', 'Varies, and shoots are often extra', 'Highest', 'Salary, tools and management time'], us: `${perMonth(PRICES.social.tiers[0].monthly)} to ${perMonth(PRICES.social.tiers[2].monthly)}, with on-site shoots` },
    ],
    note: 'If one of the others fits you better, we will tell you. More reading:',
    reads: [
      { slug: 'choose-digital-marketing-partner', label: 'choosing a marketing partner' },
      { slug: 'content-calendar-template-contractors', label: 'a content calendar for contractors' },
    ],
  },

  fit: {
    eyebrow: "WHO IT'S FOR",
    heading: 'Is this a good fit?',
    lede: "We would rather tell you now than after you've paid. Here is who gets the most from this service, and who doesn't.",
    yesTitle: 'A good fit if',
    yes: [
      'You are a contractor or local service business with real jobs to show',
      'Customers look you up online before they call',
      'You have no time to plan, shoot and post',
      'You want a steady feed without managing it',
      'You are happy for us to visit job sites',
      'You can commit to a monthly service',
    ],
    noTitle: 'Probably not the right fit if',
    no: [
      'You want paid ads included in the same fee',
      'You need a guaranteed number of followers or leads',
      'You cannot let us shoot at your jobs',
      'You want stock posts instead of your own work',
      'You want the cheapest possible option',
    ],
  },

  industries: {
    eyebrow: 'INDUSTRIES',
    heading: 'Every trade has work worth showing.',
    lede: 'A plumber and a boutique do not post the same things. Pick your kind of business to see what we capture.',
    note: 'Not on the list? Call and ask.',
    items: [
      {
        tab: 'Trades and contractors',
        title: 'Plumbers, electricians, plasterers, tilers',
        text: 'Finished jobs are your best proof. Before and after shots and short work videos do the talking.',
        towns: ['Ashland', 'Framingham', 'Natick', 'Your towns'],
        points: ['Before and after photos', 'Short videos of work in progress', 'Crew and truck shots', 'Customer thanks, with permission'],
      },
      {
        tab: 'Auto and motorsports',
        title: 'Repair shops and parts suppliers',
        text: 'Builds, repairs and parts are visual. Photos and clips show the skill behind the work.',
        points: ['Builds and repairs in progress', 'Finished vehicles', 'Parts and product spotlights', 'Quick tips from your team'],
      },
      {
        tab: 'Retail and e-commerce',
        title: 'Boutiques and local shops',
        text: 'Shops sell on how things look. Retail is scoped to your catalog size and posting volume.',
        points: ['New arrivals and featured products', 'Behind the counter and in the shop', 'Seasonal displays', 'Customer favourites'], // CONFIRM
      },
      {
        tab: 'Local services',
        title: 'Cleaners, landscapers, repair',
        text: 'Results are easy to see. Transformations and seasonal work make strong posts.',
        points: ['Transformation photos and clips', 'Seasonal tips for homeowners', 'Your team at work', 'Reviews shared as posts'],
      },
    ],
  },

  guides: {
    eyebrow: 'GUIDES FROM OUR BLOG',
    heading: 'Read up before you decide.',
    lede: 'Short, plain-English guides on the questions people ask us most about posting online. No sign-up needed.',
  },

  faq: {
    eyebrow: 'QUESTIONS',
    heading: 'What else you may want to know.',
    lede: "Can't find your question? Call and ask. You'll get a straight answer from the person who would run your feed.",
    items: [
      { q: 'How much does social media management cost?', a: `Basic is ${perMonth(PRICES.social.tiers[0].monthly)}, Standard ${perMonth(PRICES.social.tiers[1].monthly)} and Growth ${perMonth(PRICES.social.tiers[2].monthly)}, billed monthly and priced openly on this page. Social media is separate from SEO and ads.`, read: { slug: 'digital-marketing-budget', label: 'how to set a marketing budget' } },
      { q: 'Do I have to do anything?', a: 'Very little. We ask for one call, access to your pages, and a heads-up about when and where jobs are happening. We do the shooting, writing and posting.' },
      { q: 'Do you really come to my job sites?', a: 'Yes. On-site shoots are part of every tier, scheduled around your jobs. We ask permission before showing customers or homes.' },
      { q: 'How many posts will I get?', a: 'Basic is 12 posts a month, Standard 20 and Growth 28. Each tier shows how many are videos and how many are images.' },
      { q: 'Which platforms do you post to?', a: 'We choose platforms with you based on where your customers look. Details are confirmed in your quote.' }, // CONFIRM
      { q: 'Will you answer comments and messages?', a: 'Yes. Community management is included in every tier, and we pass on questions that need your answer.' },
      { q: 'Do you run paid ads?', a: 'Not as part of this service. Paid ads are handled by our Google Ads and Meta Ads service.' },
      { q: 'Who owns the content?', a: 'You do. The photos, videos and pages belong to your business.' }, // CONFIRM
      { q: 'Can I approve posts first?', a: 'Yes. You can look the plan over before anything goes out.' }, // CONFIRM
      { q: 'What if I am a shop or online store?', a: 'Retail and e-commerce are scoped to your catalog size and posting volume, so call and we will quote it properly.' },
      { q: 'Do you only work with MetroWest businesses?', a: "MetroWest Massachusetts is home, and where most clients are. If you're outside the area and the fit is right, call and we'll talk." },
    ],
  },

  related: {
    eyebrow: 'WORKS WELL WITH',
    heading: 'Related services.',
    lede: 'A steady feed is one part. These services help turn a look into a call.',
    items: [
      { title: 'Website Design and Development', text: 'A fast website made for your business, with your best jobs shown.', href: '/services/website-design' },
      { title: 'SEO', text: 'Be found in the map box and in search over the long run.', href: '/services/seo' },
      { title: 'Google Ads and Meta Ads', text: 'Ads that put you in front of customers this week.', href: '/services/google-ads' },
      { title: 'AI Automation', text: 'Every inquiry gets a reply right away, and quotes get followed up.', href: '/services/ai-automation' },
    ],
  },

  close: {
    eyebrow: 'FREE FEED REVIEW',
    heading: 'Not sure how your feed looks to customers?',
    accent: 'Send us your page.',
    body: "We'll look at your page the way a homeowner would and tell you the 3 things most likely costing you calls. It's free, it takes about 10 minutes, and there's no pressure.",
    emailCta: 'Email us your page',
  },
};

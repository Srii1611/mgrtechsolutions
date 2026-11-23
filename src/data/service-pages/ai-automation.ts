import { HOURLY_LINE, PRICES, money, perMonth } from '@/data/prices';
import { ICON } from '@/data/service-pages/icons';
import type { ServicePageData } from '@/data/service-pages/types';

/**
 * /services/ai-automation. Plain English for contractors and local service owners.
 *
 * Sources: the repo's automation copy (PILLAR_AUTOMATION), the live site's AI
 * Automation section (form-to-text, instant auto-replies, missed-call
 * text-back, AI follow-up with qualifying questions and booking, one log for
 * calls and inquiries), our own blog posts, and a structure-only review of US
 * missed-call text-back and lead-follow-up tools.
 *
 * OPEN for Srii before treating as final:
 *  - There are no prices in the repo for this service. The page shows one
 *    "quoted on the call" card. Prices now come from src/data/prices.ts.
 *  - Lines marked CONFIRM go beyond the live site's list.
 *  - No recovery-rate or response-time statistics appear. Vendor claims such
 *    as "recovers 25 to 45 percent of missed calls" are unverified and left out.
 *    Statistics already sourced in src/data/home.ts are not repeated here
 *    because that page carries their source lists.
 *  - The page says plainly that automation starts the conversation and a
 *    person continues it.
 */
export const AI_AUTOMATION_PAGE: ServicePageData = {
  slug: 'ai-automation',
  meta: {
    title: 'AI Automation',
    description:
      'Automatic replies for contractors and service businesses in MetroWest Massachusetts: missed-call text-back, instant replies, and follow-up on quotes that went quiet.',
  },

  hero: {
    breadcrumb: 'AI AUTOMATION',
    headline: "Don't lose the lead you paid for.",
    headlineAccent: 'Replies in seconds, any hour.',
    lede: 'When you cannot pick up, the caller gets a reply in seconds. We also follow up on quotes that went quiet and keep one log of every call and inquiry.',
    secondaryCta: 'Get a free response review',
    facts: [
      { title: 'Replies in seconds', text: 'Missed calls and forms get an answer right away.' },
      { title: 'Follow-up built in', text: 'Quotes that went quiet get a friendly nudge.' },
      { title: 'One log', text: 'Every call and inquiry in a single place.' },
      { title: 'You stay in charge', text: 'A person continues every real conversation.' },
    ],
  },

  problem: {
    eyebrow: 'THE PROBLEM',
    heading: 'Most lost jobs are lost in the first few minutes.',
    lede: 'The marketing worked. Then the lead slipped away. Pick a problem to see the cause and the fix.',
    items: [
      {
        tag: 'Missed calls',
        title: 'Calls go to voicemail, then to a competitor',
        peek: 'Your hands are full and the phone is in the truck.',
        body: 'Customers with a problem call several businesses and often hire the first one that answers. A missed call is often a lost job.',
        points: [
          'No one can answer during a job',
          'Voicemail goes unchecked',
          'No reply after a missed call',
          'Calls after hours disappear',
        ],
        read: { slug: 'how-to-respond-to-leads-faster', label: 'Reply within five minutes and win more jobs' },
      },
      {
        tag: 'Web forms',
        title: 'Form requests sit for hours',
        peek: 'The customer has moved on by the time you see it.',
        body: 'A form request is a warm lead for a short time. If it waits until evening, someone else has probably already replied.',
        points: [
          'Forms land in an inbox you check later',
          'No instant confirmation to the customer',
          'No text alert to you',
          'No sign the request arrived',
        ],
        read: { slug: 'lead-capture-forms', label: 'Lead capture forms that get filled out' },
      },
      {
        tag: 'Quotes',
        title: 'Quotes go quiet and nobody follows up',
        peek: 'A friendly nudge would have won the job.',
        body: 'Many quotes are not a no. They are a later. Without a follow-up, the customer forgets or picks someone who stayed in touch.',
        points: [
          'A quote is sent and then forgotten',
          'No reminder to check in',
          'No second message when there is no reply',
          'No way to tell which quotes are still open',
        ],
        read: { slug: 'how-to-follow-up-with-leads', label: 'The follow-up system that books jobs' },
      },
      {
        tag: 'Scattered',
        title: 'Leads are scattered across phones and inboxes',
        peek: 'You cannot tell who called, texted or filled in a form.',
        body: 'Calls, texts, emails and forms land in different places. Nothing shows what came in, what was answered and what is waiting.',
        points: [
          'No single list of leads',
          'Notes kept in your head or on paper',
          'No record of who replied and when',
          'Hard to see which marketing brings jobs',
        ],
        read: { slug: 'what-is-crm', label: 'A simple way to keep track of every lead' },
      },
    ],
  },

  approach: {
    eyebrow: 'OUR APPROACH',
    heading: 'No lead gets',
    accent: 'forgotten.',
    body: 'When someone reaches out, they hear back in seconds, even at 11 at night and even while you are on a job. You get a clear summary instead of a missed opportunity.',
    checks: [
      'The customer gets an instant confirmation',
      'An automatic first reply, any hour',
      'Follow-up on quotes that went quiet',
      'A plain-English summary sent to you',
    ],
    scene: 'auto',
  },

  commitments: {
    heading: 'What that means in practice.',
    lede: 'Four commitments run through every automation we set up. Here is what each one looks like in the work you receive.',
    rows: [
      {
        tag: 'Fast',
        title: 'Every inquiry hears back in seconds',
        text: 'A reply goes out right away, so the customer knows you got it.',
        points: [
          'Text back after a missed call',
          'Instant reply to form requests',
          'Replies at any hour',
          'A friendly tone that sounds like you',
        ],
      },
      {
        tag: 'Human',
        title: 'Automation starts it, a person continues it',
        text: 'The first reply is automatic. Real conversations, quotes and bookings stay with you.',
        points: [
          'Clear alerts when someone needs a person',
          'You can step in at any point',
          'Replies are written to hand off cleanly',
          'No pretending to be someone else',
        ],
      },
      {
        tag: 'Followed up',
        title: 'Quotes get a second chance',
        text: 'A short, friendly follow-up goes out when a quote has gone quiet.',
        points: [
          'Follow-up for quotes and estimates',
          'A limit on how many messages go out',
          'Stops when the customer replies',
          'You can pause or change it any time',
        ],
      },
      {
        tag: 'Under your control',
        title: 'Everything in one place, in your name',
        text: 'You see what came in, what was answered and what is waiting, with no mystery subscriptions.',
        points: [
          'One log for calls and inquiries',
          'Plain-English lead summaries',
          'Accounts set up in your name', // CONFIRM
          'No hidden recurring fees',
        ],
      },
    ],
  },

  included: {
    eyebrow: "WHAT'S INCLUDED",
    heading: 'Everything it takes to answer every lead.',
    lede: 'Eight areas of work in one place. Flip through them with the list, the arrows, or your keyboard. What you get is scoped to your business on the call.',
    noteLead: 'Scoped to your business.',
    note: 'Not every business needs every piece. We set up what fits how you work, and quote it in writing.',
    categories: [
      {
        title: 'Missed-call text-back',
        desc: 'When you cannot answer, the caller gets a text right away.',
        icon: ICON.phone,
        read: { slug: 'how-to-respond-to-leads-faster', label: 'Reply within five minutes and win more jobs' },
        items: [
          [1, 'An automatic text after a missed call'],
          [1, 'A message written to sound like you'],
          [1, 'Different messages for work hours and after hours'],
          [1, 'An alert to you that someone called'],
          [1, 'Calls and texts saved in one log'],
        ],
      },
      {
        title: 'Form to text',
        desc: 'Web form requests reach your phone as a text, not an inbox.',
        icon: ICON.mail,
        read: { slug: 'lead-capture-forms', label: 'Lead capture forms that get filled out' },
        items: [
          [1, 'Form submissions sent to you as a text message'],
          [1, 'Clear details: name, number, job and town'],
          [1, 'An instant confirmation to the customer'],
          [1, 'A copy kept in your lead log'],
        ],
      },
      {
        title: 'Instant replies',
        desc: 'Every inquiry gets a first reply, any hour.',
        icon: ICON.bolt,
        items: [
          [1, 'Automatic first reply to new inquiries'],
          [1, 'Replies by text or email, as fits the lead'],
          [1, 'Quiet hours so you are never woken needlessly'],
          [1, 'Messages written in plain English'],
        ],
      },
      {
        title: 'AI follow-up',
        desc: 'A helpful assistant that asks a few questions and moves the lead along.',
        icon: ICON.chat,
        read: { slug: 'how-to-qualify-leads', label: 'How to qualify leads' },
        items: [
          [1, 'Asks simple qualifying questions about the job'],
          [1, 'Offers to book an estimate'],
          [1, 'Passes the lead to you when it is ready'],
          [1, 'Never promises prices or times you have not approved'],
        ],
      },
      {
        title: 'Quote follow-up',
        desc: 'A friendly nudge for quotes that went quiet.',
        icon: ICON.calendar,
        read: { slug: 'how-to-follow-up-with-leads', label: 'The follow-up system that books jobs' },
        items: [
          [1, 'Follow-up sequences for quotes and estimates'],
          [1, 'Timing and wording you approve'],
          [1, 'Stops the moment the customer replies'],
          [1, 'A limit on how many messages go out'],
        ],
      },
      {
        title: 'One log',
        desc: 'Every call and inquiry in a single place.',
        icon: ICON.cards,
        read: { slug: 'what-is-crm', label: 'A simple way to keep track of every lead' },
        items: [
          [1, 'A single log for calls, texts and forms'],
          [1, 'What came in, what was answered, what is waiting'],
          [1, 'Notes you can add'],
          [1, 'See which source each lead came from'],
        ],
      },
      {
        title: 'Plain-English summaries',
        desc: 'Short summaries of each lead, so you know what to do next.',
        icon: ICON.doc,
        items: [
          [1, 'A short summary of every new lead'],
          [1, 'Sent to you as a text or email'],
          [1, 'Flags urgent or high-value requests'], // CONFIRM
          [1, 'A weekly view of what came in'],
        ],
      },
      {
        title: 'Setup and support',
        desc: 'We set it up, test it and keep it working.',
        icon: ICON.lock,
        items: [
          [1, 'Phone and form connections set up'],
          [1, 'Messages written with you and tested'],
          [1, 'Everything checked before it goes live'],
          [1, 'Help when something needs changing'],
        ],
      },
    ],
  },

  how: {
    eyebrow: 'HOW IT WORKS',
    heading: 'Four steps, and most of the work is ours.',
    lede: 'You only spend time where your input matters. Each step shows what we do, what you do, and what you get at the end of it.',
    readLead: 'Want to see why speed matters?',
    read: { slug: 'how-to-respond-to-leads-faster', label: 'Reply within five minutes and win more jobs' },
    steps: [
      {
        title: 'Learn how leads reach you',
        text: 'We start by finding out how calls and requests come in today, and where they slip.',
        we: ['Map how calls, forms and messages arrive', 'Find where leads get lost', 'Choose what to automate first', 'Plan your messages'],
        you: ['One phone call about your business', 'Tell us how you like to talk to customers', 'Share your phone and form details'],
        get: ['A clear plan, in plain English', 'A written quote'],
      },
      {
        title: 'Write and connect',
        text: 'We write the messages and connect them to your phone and forms.',
        we: ['Write replies in your voice', 'Connect your phone line and forms', 'Set quiet hours', 'Set up your lead log'],
        you: ['Approve the messages', 'Tell us what we must never say'],
        get: ['Messages you approved', 'Phone and forms connected'],
      },
      {
        title: 'Test and go live',
        text: 'We test every path before a real customer sees it.',
        we: ['Call and submit test requests', 'Check replies, alerts and the log', 'Fix anything that looks wrong', 'Turn it on'],
        you: ['Take a test call', 'Confirm the alerts reach you'],
        get: ['A working system', 'A walkthrough of where leads land'],
      },
      {
        title: 'Watch and improve',
        text: 'We watch how it performs and tune the messages.',
        we: ['Review replies and follow-ups', 'Adjust wording and timing', 'Add new automations as you need them', 'Answer questions'],
        you: ['Tell us what customers say', 'Tell us when your hours or services change'],
        get: ['Messages that keep improving', 'A log of every lead'],
      },
    ],
  },

  pricing: {
    eyebrow: 'PRICING',
    heading: 'A setup fee, then a small monthly fee.',
    lede: 'Every business gets leads in a different way, so each plan starts with setup and then runs monthly. It works with the website you already have. Custom workflows are quoted on a call.',
    service: 'ai',
    facts: [
      {
        title: 'What helps decide the plan',
        text: 'The plan sets the price. These things help us tell you which one fits:',
        kind: 'check',
        items: [
          'How many pieces you want set up',
          'How many phone lines and forms we connect',
          'How much follow-up you want',
          'Whether we connect to software you already use',
        ],
      },
      {
        title: "What's not included",
        text: 'We keep these separate so you always know what you are paying for.',
        kind: 'x',
        items: [
          'Phone, text and software fees billed by the provider', // CONFIRM
          'A website build, priced separately',
          'Ads and marketing to bring in more leads',
        ],
      },
      {
        title: 'How payment works',
        text: 'No surprises. The prices on this page are the prices.',
        kind: 'check',
        items: [
          'A one-time setup fee, then a monthly fee',
          'No mystery subscriptions. Every monthly fee is shown here',
          'Custom workflows start at a quoted price and are agreed in writing first',
          `Changes later are quoted before work starts, at ${HOURLY_LINE}`,
        ],
      },
    ],
    readLead: 'Want help deciding?',
    reads: [
      { slug: 'what-is-crm', label: 'what a simple lead system does' },
      { slug: 'digital-marketing-budget', label: 'how to set a marketing budget' },
    ],
  },

  timeline: {
    eyebrow: 'TIMELINE',
    heading: 'Set up in a short project, then tuned over time.',
    lede: 'Most of the work is writing, connecting and testing. The bar is drawn to scale.',
    phases: [
      { key: 'learn', bar: 'STEP 1', short: 'Learn', weight: 1, mark: '1', days: 'Step 1', title: 'Learn how leads reach you', text: 'A conversation about how calls and requests arrive today, and where they slip.', time: 'Your time: about 60 minutes' },
      { key: 'write', bar: 'STEP 2', short: 'Write and connect', weight: 2, mark: '2', days: 'Step 2', title: 'Write and connect', text: 'We write your messages and connect your phone and forms.', time: 'Your time: approve the messages' },
      { key: 'test', bar: 'STEP 3', short: 'Test', weight: 1, mark: '3', days: 'Step 3', title: 'Test and go live', text: 'We test every path, then turn it on.', time: 'Your time: take a test call' },
      { key: 'tune', bar: 'STEP 4', short: 'Tune', weight: 2, mark: '4', days: 'Step 4 onward', title: 'Watch and improve', text: 'We review replies and follow-ups and adjust the wording and timing.', time: 'Your time: tell us what customers say' },
    ],
    after: { days: 'Any time', title: 'Add or change', text: 'Add new automations or change messages whenever your business changes.', time: 'Quoted before work starts' },
    callout: {
      lead: 'Timing depends on your phone and forms.',
      text: 'Setup is usually quick once we have access to your phone line and forms. The scope of the project and any software we connect to change how long it takes.', // CONFIRM
    },
  },

  success: {
    eyebrow: 'WHAT SUCCESS LOOKS LIKE',
    heading: 'You can check it yourself.',
    lede: 'You do not need a report. Go down this list and tick each item as you check it.',
    checklistTitle: 'Your response checklist',
    doneText: 'All seven checked. That is a business that answers every lead.',
    checks: [
      { title: 'A missed call gets a text', text: 'Call your business number from another phone and let it go unanswered.' },
      { title: 'The text sounds like you', text: 'Read the reply and check it is friendly and accurate.' },
      { title: 'A form reaches your phone', text: 'Send a test quote request and see it arrive as a text.' },
      { title: 'The customer is told it arrived', text: 'Check the instant confirmation on the test request.' },
      { title: 'A quiet quote gets a nudge', text: 'Ask us to show you a follow-up sequence in action.' },
      { title: 'Everything is in one log', text: 'Open the log and find your test call and test request.' },
      { title: 'A person can step in', text: 'Confirm you can take over a conversation at any point.' },
    ],
    path: [
      { when: 'At launch', title: 'Every lead gets a reply', text: 'Missed calls and forms get a quick first response.' },
      { when: 'First weeks', title: 'Fewer slip away', text: 'Quiet quotes get a nudge and nothing sits unseen.' },
      { when: 'Over time', title: 'Better messages', text: 'We tune the wording and timing from what customers say.' },
    ],
    nope: {
      title: "What we don't promise",
      items: ['A set number of recovered leads', 'That every lead will book', 'That automation replaces talking to customers'],
    },
  },

  compare: {
    eyebrow: 'HONEST COMPARISON',
    heading: 'Why not an answering service, or do it all yourself?',
    lede: 'Each option is right for someone. This is how they compare for a business that cannot always pick up the phone.',
    columns: [
      { name: 'Answer yourself', sub: 'Every call, every time' },
      { name: 'Answering service', sub: 'A live person takes calls' },
      { name: 'Software only', sub: 'An app you set up yourself' },
      { name: 'Hire a receptionist', sub: 'Your own front desk' },
    ],
    us: { name: 'MGRTECH', sub: 'Built for local businesses' },
    rows: [
      { label: 'Best for', cells: ['A business that is always near the phone', 'A business that wants a human voice', 'A business happy to build its own setup', 'A business big enough for a front desk'], us: 'A trades business that cannot always pick up and wants every lead answered' },
      { label: 'Your time', cells: ['All of it', 'Briefing and checking messages', 'Hours of setup and learning', 'Hiring and managing someone'], us: 'About an hour to start, then little' },
      { label: 'Speed', cells: ['Only when you are free', 'Depends on the service', 'Depends on your setup', 'During working hours'], us: 'Replies in seconds, any hour' },
      { label: 'Follow-up', cells: ['When you remember', 'Usually not included', 'Depends on the app', 'Depends on the person'], us: 'Built in for quotes that went quiet' },
      { label: 'Set up for you', cells: ['Not applicable', 'Mostly', 'No, you do it', 'You train them'], us: 'We write, connect and test it' },
      { label: 'Cost', cells: ['Your time and lost jobs', 'Monthly fee and per-call charges', 'Subscription plus your time', 'Wages and management time'], us: `${money(PRICES.ai.tiers[0].oneTime)} setup, then ${perMonth(PRICES.ai.tiers[0].monthly)}` },
    ],
    note: 'If one of the others fits you better, we will tell you. More reading:',
    reads: [
      { slug: 'how-to-respond-to-leads-faster', label: 'replying faster' },
      { slug: 'what-is-crm', label: 'what a simple lead system does' },
    ],
  },

  fit: {
    eyebrow: "WHO IT'S FOR",
    heading: 'Is this a good fit?',
    lede: "We would rather tell you now than after you've paid. Here is who gets the most from this service, and who doesn't.",
    yesTitle: 'A good fit if',
    yes: [
      'You are a contractor or local service business that gets work by phone',
      'You miss calls while you are on a job',
      'Quotes go quiet and you rarely follow up',
      'You want a single place for every lead',
      'You are comfortable with a friendly automatic first reply',
      'You will take over real conversations yourself',
    ],
    noTitle: 'Probably not the right fit if',
    no: [
      'You get very few leads and answer all of them',
      'You want a robot to run your whole sales process',
      'You do not want to reply to anyone yourself',
      'You need a guaranteed number of booked jobs',
      'You want the cheapest possible option',
    ],
  },

  industries: {
    eyebrow: 'INDUSTRIES',
    heading: 'Every trade misses calls.',
    lede: 'A plumber and a boutique do not take calls the same way. Pick your kind of business to see what we set up.',
    note: 'Not on the list? Call and ask.',
    items: [
      {
        tab: 'Trades and contractors',
        title: 'Plumbers, electricians, plasterers, tilers',
        text: 'You are on a job when the phone rings. Missed-call text-back and quote follow-up matter most.',
        towns: ['Ashland', 'Framingham', 'Natick', 'Your towns'],
        points: ['Text back after every missed call', 'Quote request sent to your phone', 'Estimate booking offered', 'Quote follow-up that stops when they reply'],
      },
      {
        tab: 'Auto and motorsports',
        title: 'Repair shops and parts suppliers',
        text: 'Customers call to ask about a job or a part. A fast reply keeps them from calling the next shop.',
        points: ['Text back after missed calls', 'Instant reply to estimate requests', 'Questions about make, model and job collected up front', 'Pickup and drop-off reminders'], // CONFIRM
      },
      {
        tab: 'Retail and e-commerce',
        title: 'Boutiques and local shops',
        text: 'Shoppers ask about stock, hours and orders. Quick answers keep them from going elsewhere.',
        points: ['Instant reply to product questions', 'Hours and location texted on request', 'Order updates', 'Back in stock messages'], // CONFIRM
      },
      {
        tab: 'Local services',
        title: 'Cleaners, landscapers, repair',
        text: 'Customers want a quick quote and a date. The first business to reply often wins.',
        points: ['Instant reply to every quote request', 'A few questions to size the job', 'Booking offered', 'Follow-up for quotes that went quiet'],
      },
    ],
  },

  guides: {
    eyebrow: 'GUIDES FROM OUR BLOG',
    heading: 'Read up before you decide.',
    lede: 'Short, plain-English guides on the questions people ask us most about answering leads. No sign-up needed.',
  },

  faq: {
    eyebrow: 'QUESTIONS',
    heading: 'What else you may want to know.',
    lede: "Can't find your question? Call and ask. You'll get a straight answer from the person who would set it up.",
    items: [
      { q: 'How much does it cost?', a: `Missed-Call Rescue is ${money(PRICES.ai.tiers[0].oneTime)} setup plus ${perMonth(PRICES.ai.tiers[0].monthly)}. The Lead Follow-Up System is ${money(PRICES.ai.tiers[1].oneTime)} setup plus ${perMonth(PRICES.ai.tiers[1].monthly)}. Custom workflows start at ${money(PRICES.ai.tiers[2].oneTime)} setup and are quoted on a call. Phone and software fees are billed by the provider.`, read: { slug: 'digital-marketing-budget', label: 'how to set a marketing budget' } },
      { q: 'What happens when I miss a call?', a: 'The caller gets a friendly text within seconds, and you get an alert. You can then call or text them back.' },
      { q: 'Will customers know it is automatic?', a: 'The first reply is written to sound like you, and it is honest. A real person continues the conversation.' },
      { q: 'Is it a robot that talks to my customers?', a: 'It asks a few simple questions and passes the lead to you. It never promises prices or times you have not approved.' },
      { q: 'Can I change the messages?', a: 'Yes. You approve the wording first, and you can ask for changes any time.' },
      { q: 'Does it send too many follow-ups?', a: 'No. There is a limit on messages, and follow-up stops the moment the customer replies.' },
      { q: 'Do I keep control of my phone number and accounts?', a: 'Yes. We set things up in your name wherever the provider allows.' }, // CONFIRM
      { q: 'Do I need a new website?', a: 'Not always. Forms on your current site can often be connected. If your site blocks it, we tell you.' },
      { q: 'Will it work with software I already use?', a: 'Often, yes. We check what you use and say what can be connected before you start.' }, // CONFIRM
      { q: 'Can you guarantee more booked jobs?', a: 'No. We guarantee that leads get a quick reply and a follow-up. Whether they book depends on your price, your work and your callback.' },
      { q: 'Do you only work with MetroWest businesses?', a: "MetroWest Massachusetts is home, and where most clients are. If you're outside the area and the fit is right, call and we'll talk." },
    ],
  },

  related: {
    eyebrow: 'WORKS WELL WITH',
    heading: 'Related services.',
    lede: 'Fast replies keep the leads you earn. These services help you earn more.',
    items: [
      { title: 'Website Design and Development', text: 'A fast website made for your business, with forms that reach you.', href: '/services/website-design' },
      { title: 'SEO', text: 'Be found in the map box and in search over the long run.', href: '/services/seo' },
      { title: 'Google Ads and Meta Ads', text: 'Ads that put you in front of customers this week.', href: '/services/google-ads' },
      { title: 'Social Media', text: 'Regular posts that show you are active and trusted.', href: '/services/social-media' },
    ],
  },

  close: {
    eyebrow: 'FREE RESPONSE REVIEW',
    heading: 'Not sure how many leads slip away?',
    accent: 'Tell us how people reach you.',
    body: "We'll look at how calls and requests reach you today and tell you the 3 places leads are most likely slipping away. It's free, it takes about 10 minutes, and there's no pressure.",
    emailCta: 'Email us about your leads',
  },
};

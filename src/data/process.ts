/**
 * Process page copy. Every string the process page renders lives here.
 *
 * Positioning rule (spec §4): nothing here may claim the company is one
 * person. First person singular is fine where Srii speaks to the reader.
 */
import { LAUNCH } from '@/data/prices';

/** S1 — Hero */
export const PROCESS_HERO = {
  breadcrumb: 'PROCESS',
  headline: 'Your part:',
  headlineAccent: '90 minutes.',
  lede:
    "You're running a business. The last thing you need is a second job managing a website project. So I built a process where your total time investment is about 90 minutes across one conversation and two reviews, and everything else is mine.",
  countdown: {
    line1: 'CALL',
    arrow: '→',
    line2: 'LAUNCH',
    /** Two paths: the standard build and the longer one. */
    paths: [
      { count: LAUNCH.standardDays, unit: 'DAYS', label: 'The Site and The System' },
      { count: `about ${LAUNCH.customWeeks}`, unit: 'WEEKS', label: 'Rebuild / Custom and online stores' },
    ],
  },
} as const;

/** S2 — The timelines (light), with effort chips per step. */
export const WEEK_TIMELINE = {
  /** The standard build, in days. */
  quickTrack: {
    eyebrow: `${LAUNCH.standardDays} DAYS · THE SITE AND THE SYSTEM`,
    title: `Launch in ${LAUNCH.standard}`,
    body: 'A working preview by Day 3, your review on Days 11 to 13, and live on Days 14 to 15. Your part is the same short list of calls and reviews.',
  },
  /** The longer build, week by week. */
  longTrack: {
    eyebrow: `${LAUNCH.custom.toUpperCase()} · REBUILD / CUSTOM AND ONLINE STORES`,
    body: 'Bigger jobs take about five weeks. This is how those weeks go.',
  },
  weeks: [
    {
      week: 'WEEK 1',
      title: 'Discovery',
      body: "One 60-minute phone call. I ask about your business, your customers, what a good lead looks like, and what you hate about your current site. That's the last homework you get.",
      iDo: 'Research your market, competitors, and search landscape',
      youDo: 'One phone call',
      chip: 'YOU: 60 MIN',
    },
    {
      week: 'WEEK 2',
      title: 'Design',
      body: 'You get a real design to react to, not a mood board, not a wireframe. One round of feedback over email or a short call, and I refine from there.',
      iDo: 'Design the full site, write the first pass of all copy',
      youDo: 'Look at it, react, done',
      chip: 'YOU: ~15 MIN',
    },
    {
      week: 'WEEK 3',
      title: 'Build',
      body: 'Hand-coded from scratch. You get a private preview link and can watch it come together, or ignore it entirely and get back to work. Both are fine.',
      iDo: 'Code, write, optimize, test on real phones',
      youDo: 'Nothing',
      chip: 'YOU: 0 MIN',
    },
    {
      week: 'WEEK 4',
      title: 'Review and refine',
      body: "You go through the finished site the way a customer would, phone first. This isn't a second design round, the direction was already agreed in week 2. This pass is for accuracy and polish.",
      iDo: 'Make the changes you flag, retest on real phones',
      youDo: 'One short review call or email',
      chip: 'YOU: ~15 MIN',
    },
    {
      week: 'WEEK 5',
      title: 'Launch',
      body: 'Domain, hosting, SSL, Google Business Profile: everything connected, tested, and live. You get a short walkthrough video so nothing is a mystery.',
      iDo: 'Launch, verify, submit to search engines',
      youDo: 'Answer the phone',
      chip: 'YOU: 0 MIN',
    },
    {
      week: 'AFTER',
      title: 'Support',
      body: 'Same person, same phone number. Changes, additions, questions: you call, I handle it. No ticket system, no account manager, no explaining your project to a stranger.',
      iDo: 'Updates, fixes, additions as agreed',
      youDo: 'Call when you need something',
      chip: 'YOU: JUST CALL',
    },
  ],
} as const;

/**
 * S3 — The effort ledger (dark): invoice-style comparison table.
 * Row 2's own column and the "own" column header are rewritten per the plan's
 * Required rewrites table — the prior copy asserted a headcount of one.
 */
export const EFFORT_LEDGER = {
  eyebrow: '— WHAT YOUR TIME IS WORTH',
  headline: 'Same outcome.',
  headlineAccent: 'Very different time bill.',
  columns: ['LINE ITEM', 'A TYPICAL AGENCY PROJECT', 'WORKING WITH MGRTECH'],
  rows: [
    ['Meetings before anything starts', '3–4 intro calls', 'One 60-minute call'],
    ['People you explain your business to', 'Sales rep → PM → designer → dev', 'One contact, once'],
    ['Your hours on the project', '10–20 hours', 'About 90 minutes'],
    ['Timeline', '3–6 months', `${LAUNCH.standard}, or ${LAUNCH.custom} for custom builds`],
    ['After launch', 'Ticket queue', 'Call the person who built it'],
  ],
  totals: {
    label: 'YOUR TOTAL EFFORT',
    agency: 'WEEKS OF MEETINGS',
    mine: '~90 MINUTES',
  },
} as const;

/** S4 — What I need from you (light): the self-completing checklist card. */
export const HOMEWORK_LIST = {
  eyebrow: '— EVERYTHING YOU PROVIDE',
  headline: 'The complete list of',
  headlineAccent: 'your homework.',
  lede:
    'People are usually surprised how short this is. If you can check these four boxes, I can build the site.',
  packingListLabel: 'PACKING LIST',
  items: [
    {
      label: '60 minutes for a phone call, plus two 15-minute reviews',
      note: 'Any time that works. Early, late, between jobs.',
    },
    {
      label: 'Logins to anything that exists',
      note: "Old website, domain registrar, Google profile. If you don't have them, I'll help you find them.",
    },
    {
      label: 'Any photos you have',
      note: "Job sites, your work, your truck. Phone photos are fine. Don't have any? I'll guide you on what to snap.",
    },
    {
      label: 'One honest opinion on the design',
      note: "'I like it' or 'I don't' is genuinely enough.",
    },
  ],
  footnote: "THAT'S THE WHOLE LIST. NO BRAND QUESTIONNAIRES, NO 40-PAGE INTAKE FORMS.",
} as const;

/** S5 — Close (dark CTA, direct variant). Phone comes from SITE. */
export const PROCESS_CLOSE = {
  eyebrow: '— READY WHEN YOU ARE',
  headline: 'Thirty minutes is all it takes to start.',
  body:
    "One call. No forms, no funnels, no 'schedule a discovery session' runaround. Dial the number, we talk, and you'll know within one conversation whether this makes sense.",
  callLabel: 'Call',
  secondaryCta: 'See pricing',
  secondaryHref: '/services/website-design#pricing',
} as const;

export const PROCESS = {
  hero: PROCESS_HERO,
  weekTimeline: WEEK_TIMELINE,
  effortLedger: EFFORT_LEDGER,
  homeworkList: HOMEWORK_LIST,
  close: PROCESS_CLOSE,
} as const;

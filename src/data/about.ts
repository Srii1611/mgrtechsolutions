/**
 * About page copy. Every string the about page renders lives here.
 *
 * Positioning rule (spec §4): nothing here may claim the company is one
 * person. First person singular is fine where Srii speaks to the reader.
 *
 * Six required rewrites (plan's Required rewrites table) land in this file:
 * the AboutHero headline, its body copy, the portrait alt text, the Values
 * 04 title, and its body — the prior copy asserted a headcount of one.
 */

/** S1 — Hero: copy left, portrait with caption chip right. */
export const ABOUT_HERO = {
  breadcrumb: 'ABOUT',
  eyebrow: '— THE STUDIO',
  headline: 'One point of contact.',
  headlineAccent: 'On purpose.',
  body:
    'MGRTECH SOLUTIONS is a web studio in Ashland, Massachusetts. When you call, you reach the person responsible for your project — not a switchboard, not an account manager.',
  portraitAlt: 'The MGRTECH Solutions studio in Ashland, MA',
  portraitCaption: 'ASHLAND, MA · HOME STUDIO',
} as const;

/** S2 — The Story: editorial reading column with drop cap and pull-quote. */
export const STORY = {
  eyebrow: '— THE SHORT VERSION',
  headline: 'I started this studio because',
  headlineAccent: 'I watched good businesses get bad websites.',
  paragraph1:
    "Plumbers, plasterers, landscapers — people who are excellent at their work — kept showing me websites that were either embarrassing templates they'd built themselves at 11 p.m., or expensive agency sites that looked impressive and never generated a single call. Both felt broken in the same way: the website had nothing to do with how their customers actually find and choose them.",
  paragraph2:
    "So MGRTECH SOLUTIONS works differently. Every site is hand-coded — no templates, no page builders — because a website's job isn't to exist, it's to make the phone ring. That takes three things working together: a site built to be found, content that builds trust, and follow-up that catches every inquiry. I build all three, and I build them as one system.",
  pullQuote: "A website's job isn't to exist. It's to make the phone ring.",
  paragraph3:
    "I work with businesses across MetroWest Massachusetts — close enough to shake hands, small enough that I know every project on my books by name. If that sounds like the kind of person you want building your website, the phone number is at the bottom of every page. It's mine.",
} as const;

/**
 * S3 — Values: four rules of the studio.
 * Value 04's title and body are rewritten per the plan's Required rewrites
 * table — the prior copy asserted a headcount of one.
 */
export const VALUES = {
  eyebrow: '— FOUR RULES',
  headline: 'What you can',
  headlineAccent: 'count on.',
  items: [
    {
      num: '01',
      title: 'HONESTY OVER IMPRESSIVENESS',
      body: "Demo projects are labeled demo. Prices are on the website. If I'm not the right fit for your project, I'll tell you on the first call — and probably tell you who is.",
    },
    {
      num: '02',
      title: 'PLAIN ENGLISH, ALWAYS',
      body: "You'll never need a translator to understand what I'm building or why. If I can't explain it simply, I don't understand it well enough yet.",
    },
    {
      num: '03',
      title: 'BUILT, NOT ASSEMBLED',
      body: 'Every site is hand-coded. No templates, no page builders, no themes with your logo dropped in. You own every line.',
    },
    {
      num: '04',
      title: 'ONE ACCOUNTABLE CONTACT',
      body: 'The person who designs and builds your site is the person who answers when you call about it. Accountability with no hiding places.',
    },
  ],
} as const;

/** S4 — Service Area + Contact Facts. Phone/email come from SITE. */
export const SERVICE_AREA = {
  eyebrow: '— WHERE I WORK',
  headline: 'MetroWest Massachusetts,',
  headlineAccent: 'in person when it matters.',
  body:
    'Based in Ashland and working with businesses across MetroWest. Local enough to meet for coffee; the process works just as well entirely by phone.',
  towns: [
    'ASHLAND',
    'FRAMINGHAM',
    'NATICK',
    'HOPKINTON',
    'HOLLISTON',
    'MARLBOROUGH',
    'SOUTHBOROUGH',
    'WESTBOROUGH',
  ],
  footnote: 'OUTSIDE METROWEST? CALL ANYWAY — GOOD PROJECTS TRAVEL.',
  factsLabel: 'CONTACT FACTS',
  facts: [
    { label: 'PHONE', fromSite: 'phone' },
    { label: 'EMAIL', fromSite: 'email' },
    { label: 'STUDIO', value: 'ASHLAND, MASSACHUSETTS' },
    { label: 'HOURS', value: "CALL ANYTIME — IF I'M ON A JOB SITE OF MY OWN, I CALL BACK" },
    { label: 'RESPONSE', value: 'SAME DAY, USUALLY FASTER' },
  ],
} as const;

/**
 * Closing CTA.
 * CONTROLLER-AUTHORED copy, pending owner approval — written to replace
 * recycled text, not supplied by the client. Srii should review and replace.
 */
export const ABOUT_CLOSE = {
  eyebrow: '— START HERE',
  heading: "Still reading? Let's talk.",
  body: "One 60-minute call tells us both whether this is a fit. No script, no pressure — and if it isn't, I'll say so and point you somewhere better.",
} as const;

export const ABOUT = {
  hero: ABOUT_HERO,
  story: STORY,
  values: VALUES,
  serviceArea: SERVICE_AREA,
  close: ABOUT_CLOSE,
} as const;

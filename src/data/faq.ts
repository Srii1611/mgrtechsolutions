/**
 * FAQ page copy. Groups → items with `q`/`a`, so Phase 7 can feed this
 * directly into FAQPage JSON-LD.
 *
 * Source (components/faq/faqData.ts) contains 12 questions across 4 groups,
 * not 13 as the dispatch brief expected — transcribed as-is; flagged in the
 * task report rather than fabricating a 13th question.
 *
 * Positioning rule (spec §4): nothing here may claim the company is one
 * person. First person singular is fine where Srii speaks to the reader.
 */

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqGroup {
  id: string;
  label: string;
  title: string;
  items: FaqItem[];
}

/** S1 — Hero. Phone comes from SITE. */
export const FAQ_HERO = {
  breadcrumb: 'FAQ',
  eyebrow: '— FREQUENTLY ASKED',
  headline: 'Fair questions,',
  headlineAccent: 'straight answers.',
  lede:
    "Twelve questions I hear on almost every first call — answered the same way I'd answer them on the phone. If yours isn't here, call and ask:",
} as const;

/** S2/S3 — Category jump strip + accordion groups. */
export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: 'cost',
    label: 'COST & MONEY',
    title: 'Cost & money',
    items: [
      {
        q: 'How much does a website cost?',
        a: "It depends on scope, and anyone who gives you a number before knowing your project is guessing. My packages have real starting prices — right there on the pricing page — and after one 30-minute call you get a written quote that won't drift. No hourly meter running in the background.",
      },
      {
        q: 'What do you need from me to get started?',
        a: "One 30-minute phone call, logins to anything that already exists (old site, domain, Google profile), and any photos you have — phone photos are fine. That's the complete list. I handle the writing, the technical setup, and everything in between.",
      },
      {
        q: 'Are there ongoing costs after the site launches?',
        a: "Two small ones: your domain and hosting (a few dollars a month, registered in your name, so you own them), and any support plan you choose. Every recurring cost is listed in writing before launch — nothing appears on an invoice that you didn't agree to.",
      },
    ],
  },
  {
    id: 'build',
    label: 'THE BUILD',
    title: 'The build',
    items: [
      {
        q: 'How long does it take to build a website?',
        a: '15 days from our first call to launch for a standard build. Rebuilds and larger sites get their own timeline — in writing, before we start — and I hit the dates I commit to.',
      },
      {
        q: 'Will my website show up on Google?',
        a: "Yes — that's the point of building it this way. Every site ships with proper local SEO structure, a connected Google Business Profile, and pages that answer the questions your customers search. Rankings build over time; the foundation is there from day one.",
      },
      {
        q: "What is 'AI automation,' actually?",
        a: "Nothing mystical. When someone contacts you through your site, they get an instant reply, you get a plain-English summary, and follow-ups go out on their own. It means no inquiry dies in an inbox at 11 p.m. It's plumbing, not magic — but it's plumbing most small business sites don't have.",
      },
      {
        q: 'Can you rebuild my existing website instead of starting over?',
        a: "Yes — that's the Rebuild package. I audit what you have, keep and rewrite the content that's working, preserve your search rankings with proper redirects, and rebuild the rest by hand. You don't lose what you've earned.",
      },
      {
        q: 'Do you write the content, or do I have to?',
        a: 'I write it. From one phone call I learn enough about your business to write the pages, and you review everything before launch. Most clients change fewer words than they expect.',
      },
    ],
  },
  {
    id: 'after-launch',
    label: 'AFTER LAUNCH',
    title: 'After launch',
    items: [
      {
        q: 'What happens after the site launches?',
        a: "I submit everything to search engines, verify it's all working, and send you a short walkthrough video. After that, you have a direct line to the person who built your site — changes, questions, and additions are a phone call, not a support ticket.",
      },
      {
        q: 'Can I make changes to the site later?',
        a: 'Anytime. Small changes are quick calls. Bigger additions get a clear price before work starts. Because I hand-coded every line, nothing is fragile or mysterious to change.',
      },
    ],
  },
  {
    id: 'fine-print',
    label: 'THE FINE PRINT',
    title: 'The fine print',
    items: [
      {
        q: 'Do I own my website and domain?',
        a: 'Yes — completely. The domain is registered in your name, the content is yours, and the code is yours. If you ever decide to leave, everything goes with you. No hostage situations, ever.',
      },
      {
        q: 'Do you only work with MetroWest businesses?',
        a: "MetroWest Massachusetts is home and where most of my clients are — close enough to meet in person. But good projects travel. If you're outside the area and the fit is right, call and we'll talk.",
      },
    ],
  },
];

/**
 * Closing CTA.
 * CONTROLLER-AUTHORED copy, pending owner approval. Srii should review.
 */
export const FAQ_CLOSE = {
  eyebrow: '— STILL WONDERING?',
  heading: "Ask the question that isn't here.",
  body: "Call and ask anything — pricing, timing, whether you even need a new site. You'll get a straight answer from the person who'd build it.",
} as const;

export const FAQ = {
  hero: FAQ_HERO,
  groups: FAQ_GROUPS,
  close: FAQ_CLOSE,
} as const;

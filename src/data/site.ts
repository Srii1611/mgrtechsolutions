/** Company facts. Single source of truth — spec §1. */
export const SITE = {
  name: 'MGRTECH Solutions',
  legalName: 'MGRTECH SOLUTIONS, Inc.',
  domain: 'mgrtechsolutionsinc.com',
  url: 'https://www.mgrtechsolutionsinc.com',
  email: 'sri@mgrtechsolutionsinc.com',
  phone: '774-460-1116',
  phoneHref: 'tel:+17744601116',
  /** Street address is never published — 33 Annetta Rd is residential. */
  location: 'Ashland, MA · Serving MetroWest',
  tagline: 'Websites that bring in actual phone calls.',
  /** When calls are answered. Shown on the contact and about pages. */
  hours: 'Mon–Fri, 9am–7pm',
  /** What happens if a call is missed. */
  callbackLine: 'IF I MISS YOUR CALL, I CALL BACK SAME DAY',
  /** How fast a form or email gets an answer. */
  replyTime: 'I reply by the next business day.',
  /** Free 15-minute call booking (Cal.com). */
  calLink: 'mgrtechsolutions/15min',
  calUrl: 'https://cal.com/mgrtechsolutions/15min',
} as const;

/**
 * Public company profiles. Drives the footer buttons and the schema.org
 * `sameAs` list, so a change here updates both.
 */
export const SOCIAL = [
  {
    network: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/mgrtechsolutions/',
  },
  {
    network: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61596086248607',
  },
  {
    network: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/111959757/',
  },
] as const;

/**
 * Footer page links. Order is the order shown. Everything except the blog is
 * a section of the homepage — the standalone sales routes redirect to `/`
 * (see `next.config.ts`).
 */
export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/industries', label: 'Industries' },
  { href: '/process', label: 'Process' },
  { href: '/blog', label: 'Blog' },
] as const;

/** Blog categories, for footer routing. Six per spec. */
export const FOOTER_CATEGORIES = [
  { href: '/blog/category/ai-search', label: 'AI & Search' },
  { href: '/blog/category/business-growth', label: 'Business Growth' },
  { href: '/blog/category/content-marketing', label: 'Content Marketing' },
  { href: '/blog/category/lead-generation', label: 'Lead Generation' },
  { href: '/blog/category/local-seo', label: 'Local SEO' },
  { href: '/blog/category/website-performance', label: 'Website Performance' },
] as const;

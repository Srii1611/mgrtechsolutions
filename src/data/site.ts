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
} as const;

/** Primary navigation. Order is the order shown. */
export const NAV = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/process', label: 'Process' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
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

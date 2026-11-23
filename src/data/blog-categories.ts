export interface BlogCategory {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  icon: string;
}

/** The six categories. `name` is what post frontmatter carries. */
export const CATEGORIES: BlogCategory[] = [
  {
    name: 'AI & Search',
    slug: 'ai-search',
    tagline: 'Getting recommended by AI assistants, not just found on Google.',
    description:
      'Plain-English guidance on getting your business found and recommended by AI assistants and modern search engines.',
    icon: '/blog/cat-ai-search.svg',
  },
  {
    name: 'Business Growth',
    slug: 'business-growth',
    tagline: 'Pricing, hiring, and scaling a growing service business.',
    description:
      'Practical advice on pricing, hiring, scaling, and managing a growing service business.',
    icon: '/blog/cat-business-growth.svg',
  },
  {
    name: 'Content Marketing',
    slug: 'content-marketing',
    tagline: 'Writing content that answers customer questions and earns trust.',
    description:
      'How to plan and write content that answers customer questions, builds trust, and brings in work.',
    icon: '/blog/cat-content-marketing.svg',
  },
  {
    name: 'Lead Generation',
    slug: 'lead-generation',
    tagline: 'Turning website visitors into phone calls and booked jobs.',
    description:
      'Forms, calls to action, follow-up, and everything that turns website visitors into paying customers.',
    icon: '/blog/cat-lead-generation.svg',
  },
  {
    name: 'Local SEO',
    slug: 'local-seo',
    tagline: 'Showing up when nearby customers search for your service.',
    description:
      'Showing up when nearby customers search: maps rankings, reviews, business listings, and local keywords.',
    icon: '/blog/cat-local-seo.svg',
  },
  {
    name: 'Website Performance',
    slug: 'website-performance',
    tagline: 'Site speed, mobile experience, and the technical basics.',
    description:
      'Speed, mobile experience, and the technical basics that keep visitors on your site.',
    icon: '/blog/cat-website-performance.svg',
  },
];

export const CATEGORY_BY_SLUG = new Map(CATEGORIES.map((c) => [c.slug, c]));

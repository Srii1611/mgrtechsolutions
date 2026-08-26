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
    tagline: 'Being the business the robots recommend.',
    description:
      'Plain-English guidance on getting your business found and recommended by AI assistants and modern search engines.',
    icon: '/blog/cat-ai-search.svg',
  },
  {
    name: 'Business Growth',
    slug: 'business-growth',
    tagline: 'The unglamorous math of getting bigger.',
    description:
      'Practical advice on pricing, hiring, scaling, and managing a growing service business.',
    icon: '/blog/cat-business-growth.svg',
  },
  {
    name: 'Content Marketing',
    slug: 'content-marketing',
    tagline: 'Answer the questions, earn the trust.',
    description:
      'How to plan and write content that answers customer questions, builds trust, and brings in work.',
    icon: '/blog/cat-content-marketing.svg',
  },
  {
    name: 'Lead Generation',
    slug: 'lead-generation',
    tagline: 'Turning visits into phone calls.',
    description:
      'Forms, calls to action, follow-up, and everything that turns website visitors into paying customers.',
    icon: '/blog/cat-lead-generation.svg',
  },
  {
    name: 'Local SEO',
    slug: 'local-seo',
    tagline: 'Showing up when your neighbors search.',
    description:
      'Showing up when nearby customers search: maps rankings, reviews, business listings, and local keywords.',
    icon: '/blog/cat-local-seo.svg',
  },
  {
    name: 'Website Performance',
    slug: 'website-performance',
    tagline: 'Fast, mobile, and nothing broken.',
    description:
      'Speed, mobile experience, and the technical basics that keep visitors on your site.',
    icon: '/blog/cat-website-performance.svg',
  },
];

export const CATEGORY_BY_NAME = new Map(CATEGORIES.map((c) => [c.name, c]));
export const CATEGORY_BY_SLUG = new Map(CATEGORIES.map((c) => [c.slug, c]));

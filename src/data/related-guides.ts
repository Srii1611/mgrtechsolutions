/**
 * Which blog posts each selling page links to ("Related guides").
 * All the mapping lives here. Each list has 2 to 4 post slugs, and a test
 * (related-guides.test.ts) fails if a slug is not a live post.
 *
 * E-commerce has no entry yet: there is no post for it.
 */
export type GuidePage =
  | 'website-design'
  | 'seo'
  | 'google-ads'
  | 'ai-automation'
  | 'social-media'
  | 'industries-trades'
  | 'industries-auto'
  | 'industries-local'
  | 'process'
  | 'faq';

export const RELATED_GUIDES: Record<GuidePage, readonly string[]> = {
  'website-design': [
    'how-much-does-a-contractor-website-cost',
    'real-cost-cheap-website',
    'diy-website-builders-vs-done-for-you',
    'website-not-generating-leads',
  ],
  seo: [
    'local-seo-101',
    'how-long-does-seo-take',
    'how-to-rank-google-maps',
    'local-seo-mistakes-contractors-make',
  ],
  'google-ads': ['local-seo-vs-paid-ads', 'retargeting-ads-explained', 'angi-homeadvisor-alternative'],
  'ai-automation': ['how-to-respond-to-leads-faster', 'how-to-follow-up-with-leads', 'how-to-track-leads'],
  'social-media': ['video-content-for-local-businesses', 'how-to-get-more-google-reviews'],
  'industries-trades': [
    'website-design-hvac-companies',
    'good-website-plumbing-company',
    'content-marketing-landscapers',
    'remodeling-company-marketing',
  ],
  'industries-auto': ['auto-repair-shop-marketing'],
  'industries-local': ['cleaning-business-marketing', 'pest-control-marketing'],
  process: ['what-to-expect-website-build-process', 'hiring-a-web-agency-vs-productized-website'],
  faq: ['choose-digital-marketing-partner'],
};

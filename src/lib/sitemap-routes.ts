import { SITE } from '@/data/site';
import { CATEGORIES } from '@/data/blog-categories';
import { getAllPosts } from '@/lib/blog';

export type SitemapRoute = {
  url: string;
  changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority?: number;
};

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: SitemapRoute['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'daily' },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/process', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/work', priority: 0.7, changeFrequency: 'monthly' },
];

export function buildSitemapRoutes(): SitemapRoute[] {
  const routes: SitemapRoute[] = STATIC_ROUTES.map((r) => ({
    url: `${SITE.url}${r.path}`,
    priority: r.priority,
    changeFrequency: r.changeFrequency,
  }));

  for (const post of getAllPosts()) {
    routes.push({
      url: `${SITE.url}/blog/${post.slug}`,
      priority: 0.5,
      changeFrequency: 'monthly',
    });
  }

  for (const category of CATEGORIES) {
    routes.push({
      url: `${SITE.url}/blog/category/${category.slug}`,
      priority: 0.6,
      changeFrequency: 'weekly',
    });
  }

  return routes;
}

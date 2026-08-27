import type { MetadataRoute } from 'next';
import { buildSitemapRoutes } from '@/lib/sitemap-routes';

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapRoutes();
}

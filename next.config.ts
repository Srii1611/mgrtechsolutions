import type { NextConfig } from "next";

/**
 * Standalone sales routes that are not ready for production. Their page code
 * stays in `app/`; these paths just 307 back to the homepage, which carries
 * every section. `/blog` and `/api` are deliberately absent — only the paths
 * listed here are redirected. Keep this list in step with the sitemap.
 */
const GATED_ROUTES = [
  '/services',
  '/services/:path*',
  '/work',
  '/process',
  '/pricing',
  '/pricing/:path*',
  '/about',
  '/faq',
  '/contact',
];

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return GATED_ROUTES.map((source) => ({
      source,
      destination: '/',
      permanent: false,
    }));
  },
};

export default nextConfig;

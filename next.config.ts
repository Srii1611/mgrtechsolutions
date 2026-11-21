import type { NextConfig } from "next";
import { RETIRED_POSTS } from "./src/data/retired-posts";

/**
 * This branch builds the multi-page site, so it does NOT carry `main`'s
 * GATED_ROUTES list (which 307s /services, /process, /about, /faq, /contact
 * and friends back to the homepage on production). When this branch merges
 * into `main`, those pages go live: decide then which, if any, stay gated.
 */
const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // The combined /services page was removed: each service has its own page.
      // Old links land on the first service. Temporary, so a hub can come back.
      { source: '/services', destination: '/services/website-design', permanent: false },
      // Retired blog posts forward for good (308, Next's permanent redirect).
      ...RETIRED_POSTS.map(({ slug, destination }) => ({
        source: `/blog/${slug}`,
        destination,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;

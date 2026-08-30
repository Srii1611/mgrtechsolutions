/**
 * Portfolio showcase — the hover-scroll client tiles.
 *
 * Separate from `WORK` in `home.ts`, which is the seven-project proof grid
 * with LIVE/DEMO labels. This module drives the scrolling-window tiles only.
 *
 * `width` and `height` are the images' INTRINSIC pixel dimensions, read from
 * the WebP headers in `public/work/`, not guessed. They exist so the scroll
 * duration can be computed at build time — a tall site and a short site must
 * travel at the same perceived speed, and measuring at runtime would mean a
 * layout read per card.
 *
 * `domain` and `href` are null until the real URLs are supplied. A null href
 * renders the tile as a non-linking frame rather than a dead link, per the
 * project rule against shipping placeholder URLs.
 */

/**
 * What the badge on a tile claims.
 *
 * `live`       a real client's real site on their own domain
 * `production` deployed and reachable, but not a client's live site
 * `demo`       built to show the approach
 *
 * The LIVE/DEMO distinction is a positioning asset (spec §8), not a
 * disclaimer, so it is stated per tile rather than inferred from whether an
 * href happens to exist.
 */
export type WorkShowcaseStatus = 'live' | 'production' | 'demo';

export type WorkShowcaseItem = {
  slug: string;
  name: string;
  domain: string | null;
  href: string | null;
  image: string;
  width: number;
  height: number;
  status: WorkShowcaseStatus;
  tags: readonly string[];
};

export const WORK_STATUS_LABEL: Record<WorkShowcaseStatus, string> = {
  live: 'LIVE',
  production: 'PRODUCTION',
  demo: 'DEMO',
};

export const WORK_SHOWCASE: readonly WorkShowcaseItem[] = [
  {
    slug: 'emanuel-blueboard',
    name: 'Emanuel Blueboard Corporation',
    domain: 'emanuelblueboardcorp.com',
    href: 'https://www.emanuelblueboardcorp.com/',
    image: '/work/emanuel-blueboard.webp',
    width: 1920,
    height: 7171,
    status: 'live',
    tags: [],
  },
  {
    slug: 'master-tile',
    name: 'Master Tile Installation',
    domain: 'mastertileinstallation.com',
    href: 'https://www.mastertileinstallation.com/',
    image: '/work/master-tile.webp',
    width: 1920,
    height: 3041,
    status: 'live',
    tags: [],
  },
  {
    slug: 'lj-landscaping',
    name: 'L&J Landscaping',
    domain: 'landjlandscapingma.com',
    href: 'https://www.landjlandscapingma.com/',
    image: '/work/lj-landscaping.webp',
    width: 1920,
    height: 6883,
    status: 'live',
    tags: [],
  },
  {
    slug: 'eurotech-motorsports',
    name: 'Eurotech Motorsports',
    domain: 'eurotech-demo.vercel.app',
    href: 'https://eurotech-demo.vercel.app/',
    image: '/work/eurotech-motorsports.webp',
    width: 1920,
    height: 5267,
    status: 'production',
    tags: [],
  },
  {
    slug: 'fortes-parts',
    name: "Forte's Parts Connection",
    domain: 'site-omega-inky-73.vercel.app',
    href: 'https://site-omega-inky-73.vercel.app/',
    image: '/work/fortes-parts.webp',
    width: 1920,
    height: 6901,
    status: 'demo',
    tags: [],
  },
] as const;

/**
 * Scroll tuning. Both are build-time constants so the duration below can be
 * computed without touching the DOM.
 */

/** Visible window height, in px. Mirrors `--work-frame-h` in globals.css. */
export const WORK_FRAME_HEIGHT = 500;

/**
 * Nominal rendered tile width, in px. The two-column grid inside
 * `container-page` (76rem, 2.5rem gutters, 2rem gap) lands each tile at
 * about this width, which is what the duration is calibrated against.
 */
export const WORK_NOMINAL_WIDTH = 556;

/** Perceived scroll speed, px/sec. Reading pace, not a flyby. */
export const WORK_SCROLL_SPEED = 320;

/**
 * Seconds for one full travel of this item's image through the window.
 *
 * The image renders at the tile's width, so its on-screen height is the
 * intrinsic height scaled by that width. Travel is the part of it that
 * overflows the window — that is the distance the transform covers, and
 * dividing it by a fixed speed is what keeps every tile scrolling at the
 * same rate regardless of how tall the site is.
 */
export function workScrollDuration(item: WorkShowcaseItem): number {
  const renderedHeight = item.height * (WORK_NOMINAL_WIDTH / item.width);
  const travel = Math.max(0, renderedHeight - WORK_FRAME_HEIGHT);
  return Math.round((travel / WORK_SCROLL_SPEED) * 100) / 100;
}

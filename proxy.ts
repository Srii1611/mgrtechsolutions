import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * SOFT-HIDE: restore before launch.
 *
 * While the site is being finalized, every route except the home page ("/")
 * is REWRITTEN (not redirected — the URL in the address bar is unchanged) to
 * /coming-soon, and marked noindex/nofollow.
 *
 * NOTE: In Next.js 16 the `middleware` file convention was deprecated and
 * renamed to `proxy`. This file is that rename — same behavior, current name.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The home page stays live.
  if (pathname === '/') {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = '/coming-soon';
  const response = NextResponse.rewrite(url);
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}

export const config = {
  // Match everything except: /_next internals, /api, /coming-soon itself,
  // and any static file (paths containing a dot, e.g. favicon.ico, images).
  matcher: ['/((?!_next|api|coming-soon|.*\\..*).*)'],
};

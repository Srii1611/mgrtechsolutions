'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { setLenisInstance, getLenisInstance } from '@/lib/lenis-instance';

/**
 * Lenis smooth scroll. Disabled entirely under prefers-reduced-motion,
 * which is a hard requirement (spec §7).
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // `anchors` routes same-page hash links (the header's /#pricing etc.)
    // through Lenis, whose scrollTo honours each section's scroll-margin-top,
    // so a jump lands below the sticky header instead of fighting it.
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, anchors: true });
    setLenisInstance(lenis);
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  /**
   * Lands on the right spot on every route change: the hash target if the
   * link carried one (the nav's Services/Industries dropdowns), otherwise
   * the top of the page. This is what makes a nav click actually go
   * somewhere — Next's Link is a no-op when the href matches the current
   * URL exactly, and the navbar's own click handler covers that same-page
   * case, but a genuine route change (a different page, or a fresh load of
   * a URL with a hash) lands here instead.
   */
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const id = requestAnimationFrame(() => {
      const hash = window.location.hash;
      const lenis = getLenisInstance();
      const target = hash ? document.querySelector(hash) : null;

      if (target) {
        if (lenis) lenis.scrollTo(target as HTMLElement, { immediate: reduce });
        else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        return;
      }

      if (lenis) lenis.scrollTo(0, { immediate: reduce });
      else window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });

    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}

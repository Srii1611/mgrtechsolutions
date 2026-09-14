'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Lenis smooth scroll. Disabled entirely under prefers-reduced-motion,
 * which is a hard requirement (spec §7).
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // `anchors` routes same-page hash links (the header's /#pricing etc.)
    // through Lenis, whose scrollTo honours each section's scroll-margin-top,
    // so a jump lands below the sticky header instead of fighting it.
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, anchors: true });
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}

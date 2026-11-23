'use client';

import { useEffect, useRef, useState } from 'react';
import { getLenisInstance } from '@/lib/lenis-instance';
import { WD_RAIL } from '@/data/website-design';

/** Every section on a service page, in page order. */
export const SECTIONS = [{ id: 'overview', label: 'Overview' }, ...WD_RAIL] as const;

/** Sections people look for most: always shown in bold. */
export const KEY_IDS: readonly string[] = ['pricing', 'faq'];

/** Scroll distance under which only the normal navbar shows. */
const TOP_ZONE = 80;

/** At this width and up the section list sits on the left and the navbar behaves normally. */
export const WIDE = 1100;

/**
 * Shared behaviour for the section-navigation designs: which section is
 * current (the last whose top is above 40% of the viewport), whether the page
 * has been scrolled past the top, and a jump function that scrolls smoothly
 * (Lenis) and updates the address.
 *
 * What the site navbar does depends on width:
 *  - WIDE and up: hidden while scrolling down, back on scroll up (as elsewhere);
 *  - narrower: hidden for good once past the top, because a slim bar replaces it.
 * A section jump always keeps the navbar away briefly so the heading lands clear.
 * Also publishes how far down the page you are as --sn-p on <html>.
 */
export function useSectionNav({ offset }: { offset: () => number }) {
  const [current, setCurrent] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const lockUntil = useRef(0);
  const offsetRef = useRef(offset);
  useEffect(() => {
    offsetRef.current = offset;
  });

  useEffect(() => {
    const root = document.documentElement;
    const els = SECTIONS.map((s) => document.getElementById(s.id));
    let lastY = window.scrollY;
    const update = () => {
      const vh = window.innerHeight;
      let cur = 0;
      els.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= vh * 0.4) cur = i;
      });
      setCurrent(cur);

      const y = window.scrollY;
      const max = root.scrollHeight - vh;
      root.style.setProperty('--sn-p', max > 0 ? String(Math.min(1, Math.max(0, y / max))) : '0');
      setScrolled(y > TOP_ZONE);
      const dy = y - lastY;
      if (y <= TOP_ZONE) {
        root.dataset.nav = 'shown';
        lastY = y;
      } else if (window.innerWidth < WIDE || Date.now() < lockUntil.current) {
        root.dataset.nav = 'hidden';
        lastY = y;
      } else if (Math.abs(dy) >= 6) {
        root.dataset.nav = dy > 0 ? 'hidden' : 'shown';
        lastY = y;
      }
    };
    root.dataset.nav = 'shown';
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      delete root.dataset.nav;
      root.style.removeProperty('--sn-p');
    };
  }, []);

  const jump = (id: string, after?: () => void) => (e: React.MouseEvent) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    lockUntil.current = Date.now() + 1800;
    const lenis = getLenisInstance();
    if (lenis) lenis.scrollTo(target, { offset: -offsetRef.current() });
    else target.scrollIntoView({ behavior: 'auto' });
    window.history.replaceState(null, '', `#${id}`);
    after?.();
  };

  return { current, scrolled, jump };
}

'use client';

import { useLayoutEffect, type RefObject } from 'react';

/**
 * Keeps a row of expanding panels (.wd-xps) the same height whichever panel is
 * open, so the section underneath never moves while you hover. It measures the
 * row once per panel with that panel forced open (transitions off, all inside one
 * synchronous step, so nothing paints) and uses the tallest as the row's
 * height. Re-measures on resize and when fonts finish loading. Below 961px
 * every panel is open and stacked, so nothing is set.
 */
export function useStableHeight(ref: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const row = ref.current;
    if (!row) return;

    const measure = () => {
      row.style.height = '';
      if (!window.matchMedia('(min-width:961px)').matches) return;
      const cards = Array.from(row.children) as HTMLElement[];
      const saved = cards.map((c) => c.className);
      row.classList.add('wd-measure');
      let tallest = 0;
      cards.forEach((_, i) => {
        cards.forEach((c, j) => c.classList.toggle('wd-on', i === j));
        tallest = Math.max(tallest, row.getBoundingClientRect().height);
      });
      cards.forEach((c, i) => {
        c.className = saved[i];
      });
      row.classList.remove('wd-measure');
      // A hard height (not a minimum): mid-animation the cards are at in-between widths and
      // their text can wrap taller than any resting state; the cards clip it instead of pushing.
      row.style.height = `${Math.ceil(tallest)}px`;
    };

    let timer: ReturnType<typeof setTimeout> | undefined;
    const later = () => {
      clearTimeout(timer);
      timer = setTimeout(measure, 150);
    };
    measure();
    window.addEventListener('resize', later);
    document.fonts?.ready.then(measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', later);
    };
  }, [ref]);
}

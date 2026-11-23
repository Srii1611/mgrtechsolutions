'use client';

import { useEffect, useRef, useState } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { SITE } from '@/data/site';

/**
 * Inline Cal.com booking for the free 15-minute call. The booking script loads
 * only when this block scrolls near the screen, so it never slows the first
 * paint. The brand colour is read from the site's accent token at runtime, so
 * no colour value is written in this file. The block has a fixed height
 * (taller on a phone) and the widget fills it, so the page itself never
 * scrolls inside a frame.
 */
export default function CalBooking() {
  const box = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!near) return;
    let cancelled = false;
    (async () => {
      const cal = await getCalApi();
      if (cancelled) return;
      const brand = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim();
      cal('ui', {
        theme: 'light',
        hideEventTypeDetails: true,
        layout: 'month_view',
        cssVarsPerTheme: { light: { 'cal-brand': brand }, dark: { 'cal-brand': brand } },
      });
    })().catch(() => {
      // The booking widget could not load: the link below still works.
    });
    return () => {
      cancelled = true;
    };
  }, [near]);

  return (
    <div>
      <div ref={box} className="h-[620px] w-full overflow-hidden rounded-2xl md:h-[560px] [&_iframe]:!h-full [&>div]:!h-full">
        {near ? (
          <Cal
            calLink={SITE.calLink}
            style={{ width: '100%', height: '100%' }}
            config={{ layout: 'month_view', theme: 'light' }}
          />
        ) : null}
      </div>
      <p className="mt-4 text-[0.9375rem] text-ink-soft">
        Calendar not loading?{' '}
        <a href={SITE.calUrl} className="font-medium text-accent-ink underline underline-offset-4">
          Open it in a new tab
        </a>
        , or call{' '}
        <a href={SITE.phoneHref} className="font-medium text-accent-ink underline underline-offset-4">
          {SITE.phone}
        </a>
        .
      </p>
    </div>
  );
}

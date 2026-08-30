'use client';

import { useEffect, useRef } from 'react';
import {
  workScrollDuration,
  WORK_STATUS_LABEL,
  type WorkShowcaseItem,
} from '@/data/work-showcase';

/**
 * Badge styling per status. Accent for a real client's live site, sand for a
 * deployed build that is not a client's, outlined mist for a demo — so the
 * three read as three, at a glance, without a legend.
 */
const STATUS_STYLE = {
  live: 'bg-accent text-forest-950',
  production: 'border border-sand text-sand',
  demo: 'border border-mist text-mist',
} as const;

/**
 * One portfolio tile: a fixed-height window onto a tall screenshot.
 *
 * On hover the image translates up by its own overflow, so the client's whole
 * page scrolls past inside the frame. That is a single CSS transform
 * transition — it stays on the compositor, there is no state on hover, and
 * mouse-out reversal is the same transition running backwards.
 *
 * The only JavaScript here is the touch path. Devices without hover never
 * fire the interaction at all, so an IntersectionObserver plays the scroll
 * once when the tile enters the viewport and then holds it at the bottom.
 * It writes a data attribute, not state, so nothing re-renders.
 */
export default function WorkShowcaseCard({ item }: { item: WorkShowcaseItem }) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // Capability, not user-agent and not viewport width: a small window on a
    // laptop still has a mouse, and a large tablet still does not.
    if (!window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          img.dataset.played = 'true';
          // Once only — the tile holds at the bottom rather than replaying
          // every time it scrolls back into view.
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(img);
    return () => observer.disconnect();
  }, []);

  const seconds = workScrollDuration(item);

  const frame = (
    <>
      {/* Browser chrome. A frame, not decoration: three dots and the domain,
          which is the one piece of information that tells you whose site
          you are looking at. */}
      <div className="flex items-center gap-2 rounded-t-xl border-b border-forest-700 bg-forest-800 px-3 py-2">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-forest-700" />
          <span className="h-2 w-2 rounded-full bg-forest-700" />
          <span className="h-2 w-2 rounded-full bg-forest-700" />
        </span>
        <span className="eyebrow truncate text-[0.625rem] text-mist">
          {item.domain ?? item.name}
        </span>

        {/* Status sits in the chrome bar rather than over the screenshot, so
            it never covers the client's own work as the page scrolls past. */}
        <span
          className={`eyebrow ml-auto shrink-0 rounded-full px-2.5 py-0.5 text-[0.5625rem] ${STATUS_STYLE[item.status]}`}
        >
          {WORK_STATUS_LABEL[item.status]}
        </span>
      </div>

      <div className="work-frame rounded-b-xl bg-forest-900">
        {/*
          A plain <img>, deliberately, not next/image. These are full-page
          screenshots — once the real ones land they are several thousand
          pixels tall, and routing them through the optimizer means paid
          on-demand re-encodes of images that are already WebP and already
          sized. The transform also has to apply to the element itself, with
          no wrapper in between.
        */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={item.image}
          alt={`The ${item.name} website, full page`}
          width={item.width}
          height={item.height}
          loading="lazy"
          decoding="async"
          className="work-frame__img"
          style={{ '--work-scroll-ms': `${seconds}s` } as React.CSSProperties}
        />
      </div>
    </>
  );

  const shell =
    'work-card block rounded-xl border border-forest-700 bg-forest-900 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent';

  // No placeholder URLs: without a real href this is a frame, not a dead link.
  if (!item.href) {
    return <div className={shell}>{frame}</div>;
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer noopener"
      className={shell}
    >
      {frame}
      <span className="sr-only">Opens {item.name} in a new tab</span>
    </a>
  );
}

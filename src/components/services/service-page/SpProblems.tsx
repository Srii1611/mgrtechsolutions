'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { ProblemItem } from '@/data/service-pages/types';
import { Bullets, ReadLink } from '@/components/services/website-design/WdBits';
import { useStableHeight } from '@/components/services/service-page/useStableHeight';

/**
 * Expanding panels: hover (on a mouse) or click/tap/Enter opens one. The
 * heading of every panel stays readable while it is closed. Below 960px every
 * panel is open and stacked.
 */
export default function SpProblems({ items }: { items: readonly ProblemItem[] }) {
  const [open, setOpen] = useState(0);
  const row = useRef<HTMLDivElement>(null);
  useStableHeight(row);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  useEffect(() => clearTimer, []);

  // A mouse has to rest on a panel for 150ms before it opens, so sweeping across
  // the row does not flicker. Leaving first cancels it. Clicks and keys open at once.
  const onEnter = (i: number) => {
    clearTimer();
    if (!window.matchMedia('(hover:hover) and (min-width:961px)').matches) return;
    timer.current = setTimeout(() => setOpen(i), 150);
  };
  const openNow = (i: number) => {
    clearTimer();
    setOpen(i);
  };
  const onKey = (e: KeyboardEvent, i: number) => {
    const n = items.length;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      openNow((i + 1) % n);
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      openNow((i + n - 1) % n);
    }
  };

  return (
    <div className="wd-xps" ref={row}>
      {items.map((p, i) => {
        const on = open === i;
        return (
          <article
            key={p.tag}
            className={`wd-xp${on ? ' wd-on' : ''}`}
            onMouseEnter={() => onEnter(i)}
            onMouseLeave={clearTimer}
            onClick={() => openNow(i)}
          >
            <div className="wd-in">
              <span className="wd-tag">{p.tag}</span>
              <h3>
                <button type="button" aria-expanded={on} aria-controls={`sp-problem-${i}`} onKeyDown={(e) => onKey(e, i)}>
                  {p.title}
                </button>
              </h3>
              <p className="wd-peek">{p.peek}</p>
              <div className="wd-full" id={`sp-problem-${i}`}>
                <p>{p.body}</p>
                <Bullets items={p.points} />
                {p.sources?.map((src) => (
                  <span key={src.href} className="wd-src">
                    Source: <a href={src.href}>{src.label}</a> {src.note}
                  </span>
                ))}
                <ReadLink slug={p.read.slug} label={p.read.label} />
              </div>
              <span className="wd-plus" aria-hidden="true">+</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}

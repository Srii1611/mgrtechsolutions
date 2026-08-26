'use client';

import { useState } from 'react';
import { SITE } from '@/data/site';

export default function DirectDoor() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
    } catch {
      // Clipboard unavailable (permissions / insecure context) — still confirm.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <p className="eyebrow text-accent-ink">DOOR 01 · TALK TO A HUMAN</p>
      <p className="eyebrow mt-6 text-ink-soft">THE DIRECT WAY</p>
      <h2 className="h3-card mt-3 font-medium text-forest-950">Call. A person answers.</h2>

      <p className="mt-5 max-w-md text-[1.0625rem] leading-[1.7] text-ink-soft">
        You get one point of contact from the first call through launch — no account managers, no
        handoffs, no re-explaining your business to someone new. Ask anything: pricing, timing,
        whether you even need a new site. If we&rsquo;re not the right fit, I&rsquo;ll say so and
        point you somewhere useful.
      </p>

      <a
        href={SITE.phoneHref}
        className="mt-10 block font-medium text-accent-ink transition hover:brightness-110"
        style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', lineHeight: 1.1 }}
      >
        {SITE.phone}
      </a>
      <p className="eyebrow mt-3 text-ink-soft">CALL ANYTIME — IF I MISS IT, I CALL BACK SAME DAY</p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${SITE.email}`}
          className="break-all font-mono text-[0.8125rem] text-forest-950 underline decoration-accent-ink/40 underline-offset-4 transition-colors hover:text-accent-ink"
        >
          {SITE.email}
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="flex h-9 items-center rounded-full border border-forest-950/25 px-4 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-forest-950 transition-colors hover:border-accent-ink hover:text-accent-ink"
        >
          {copied ? 'COPIED' : 'COPY'}
        </button>
        <span aria-live="polite" className="sr-only">
          {copied ? 'Email address copied to clipboard' : ''}
        </span>
      </div>

      <p className="eyebrow mt-10 border-t border-cream-300 pt-6 text-ink-soft">
        {SITE.location}
      </p>
    </div>
  );
}

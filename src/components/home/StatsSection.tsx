'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import Reveal from '@/components/motion/Reveal';
import { STATS } from '@/data/home';

function easeOutQuint(t: number) {
  return 1 - Math.pow(1 - t, 5);
}

function Stat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);
  const fired = useRef(false);

  useEffect(() => {
    if (!inView || fired.current) return;
    fired.current = true;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      setDisplay(value);
      return;
    }

    const duration = 1400;
    const start = performance.now();
    let raf: number;

    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      setDisplay(Math.round(easeOutQuint(t) * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <Reveal delay={delay}>
      <div className="border-t border-cream-300 pt-6">
        <p ref={ref} className="h2-section font-medium text-forest-950">
          {display}
          {suffix}
        </p>
        <p className="eyebrow mt-3 text-ink-soft">{label}</p>
      </div>
    </Reveal>
  );
}

/** SECTION 08 — Honest numbers (light, client for count-up). */
export default function StatsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent-ink">{STATS.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h2-section mt-4 font-medium text-forest-950">
            {STATS.headline} <span className="text-accent-ink">{STATS.headlineAccent}</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {STATS.stats.map((stat, i) => (
            <Stat key={stat.label} {...stat} delay={i * 0.06} />
          ))}
        </div>

        <Reveal delay={0.15}>
          <h3 className="h3-card mt-20 font-medium text-forest-950">
            {STATS.testimonialHeading}
          </h3>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {STATS.testimonials.map((t, i) => (
            <Reveal key={t.attribution} delay={0.2 + i * 0.06}>
              <blockquote className="h-full border-l-4 border-accent-ink pl-6">
                <p className="text-[1.0625rem] leading-[1.7] text-forest-950">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <cite className="eyebrow mt-3 block not-italic text-ink-soft">
                  {t.attribution}
                </cite>
              </blockquote>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="eyebrow mt-12 text-ink-soft">{STATS.disclosure}</p>
          <p className="mt-2 text-sm text-ink-soft">{STATS.placeholderNote}</p>
        </Reveal>
      </div>
    </section>
  );
}

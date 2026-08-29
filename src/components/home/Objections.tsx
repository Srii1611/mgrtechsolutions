'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { OBJECTIONS } from '@/data/home';

/**
 * SECTION 04 — The questions people actually ask (light).
 *
 * Deliberately NOT a port of the ruixen scroll-FAQ component, for three
 * reasons that all come down to the same thing — that component takes control
 * away from the reader:
 *
 *  1. Its trigger is `cursor-default` and opens ONLY on scroll. You cannot
 *     click a question, tab to it, or jump to number nine. Here every item is
 *     a real <button> with aria-expanded/aria-controls, so it works by click,
 *     by keyboard, and under a screen reader.
 *  2. It pins `h-[300vh]` and hijacks three screens of scroll. With answers
 *     this long, on a phone, that is the pattern at its worst.
 *  3. It needs GSAP, ScrollTrigger, Radix and `cn`. None are installed, and
 *     none are necessary — Framer Motion is already in the bundle.
 *
 * What survives from the reference is the good part: the sense of moving
 * DOWN a numbered sequence, with a progress rail that fills as you read.
 */
export default function Objections() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 80%'],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  const railScale = useTransform(fill, (v) => (reduce ? 1 : v));

  return (
    <section className="py-20 md:py-28" aria-labelledby="objections-heading">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent-ink">{OBJECTIONS.eyebrow}</p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2
            id="objections-heading"
            className="h2-section mt-6 max-w-3xl font-medium text-forest-950"
          >
            {OBJECTIONS.headline}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="lede mt-8 max-w-2xl text-ink-soft">{OBJECTIONS.lede}</p>
        </Reveal>

        <div ref={ref} className="relative mt-14">
          {/* Progress rail — scroll-linked, decorative. */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 hidden w-px bg-cream-300 md:block"
          >
            <motion.div
              style={{ scaleY: railScale, transformOrigin: 'top' }}
              className="h-full w-full bg-accent-ink"
            />
          </div>

          <div className="md:pl-10">
            {OBJECTIONS.items.map((item, i) => (
              <Item
                key={item.q}
                index={i}
                item={item}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
                reduce={!!reduce}
              />
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-2xl text-[1.0625rem] leading-[1.7] text-ink-soft md:pl-10">
            {OBJECTIONS.closing}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Item({
  index,
  item,
  isOpen,
  onToggle,
  reduce,
}: {
  index: number;
  item: (typeof OBJECTIONS.items)[number];
  isOpen: boolean;
  onToggle: () => void;
  reduce: boolean;
}) {
  const panelId = `objection-${index}-panel`;
  const triggerId = `objection-${index}-trigger`;
  const number = String(index + 1).padStart(2, '0');

  return (
    <div className="border-t border-cream-300 last:border-b">
      <h3>
        <button
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-start gap-4 py-6 text-left md:gap-6"
        >
          <span
            aria-hidden="true"
            className={`mt-0.5 shrink-0 text-[0.8125rem] font-semibold tabular-nums transition-colors ${
              isOpen ? 'text-accent-ink' : 'text-ink-soft'
            }`}
          >
            {number}
          </span>

          <span className="h3-card flex-1 font-medium text-forest-950">{item.q}</span>

          <span
            aria-hidden="true"
            className={`mt-0.5 shrink-0 transition-colors ${
              isOpen ? 'text-accent-ink' : 'text-ink-soft'
            }`}
          >
            {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 md:pl-[3.25rem]">
              {item.a.map((para) => (
                <p
                  key={para}
                  className="mt-0 max-w-2xl text-[1.0625rem] leading-[1.7] text-ink-soft [&+p]:mt-4"
                >
                  {para}
                </p>
              ))}

              {/* Attribution. These answers lean on specific figures, so the
                  sources are shown rather than buried. */}
              <p className="mt-5 flex flex-wrap gap-x-2 gap-y-1 text-[0.8125rem] text-ink-soft/80">
                <span className="font-medium text-accent-ink">Source:</span>
                {item.sources.map((s, i) => (
                  <span key={s}>
                    {s}
                    {i < item.sources.length - 1 ? ' ·' : ''}
                  </span>
                ))}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

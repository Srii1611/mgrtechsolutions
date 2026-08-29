'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { OBJECTIONS } from '@/data/home';

/**
 * SECTION 04 — The questions people actually ask (light).
 *
 * Follows the reference component's LAYOUT: centred heading, question pills
 * on the left, answers as chat bubbles aligned right, plus/minus affordance.
 *
 * It does NOT follow the reference's interaction model, which is broken:
 *
 *  1. Its trigger is `cursor-default` and items open ONLY on scroll — you
 *     cannot click a question, tab to one, or jump to the last one. Here each
 *     item is a real <button> with aria-expanded/aria-controls, so it works
 *     by click, by keyboard, and under a screen reader.
 *  2. It pins `h-[300vh]` and hijacks three screens of scroll. With answers
 *     this long, on a phone, that is the pattern at its worst.
 *  3. Its scrub range (`+=data.length * 200` = 2200px) never agreed with its
 *     own 300vh container.
 *  4. It needs gsap, @gsap/react, @radix-ui/react-accordion and a `cn`
 *     helper. None are installed here and none are necessary — framer-motion
 *     already is, and this repo has no `cn` because it has no shadcn setup.
 *
 * Colours come from @theme tokens, not the reference's hardcoded blue
 * (hard rule 4).
 */
export default function Objections() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section className="py-20 md:py-28" aria-labelledby="objections-heading">
      <div className="container-page">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="eyebrow text-center text-accent-ink">{OBJECTIONS.eyebrow}</p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2
              id="objections-heading"
              className="h2-section mt-6 text-center font-medium text-forest-950"
            >
              {OBJECTIONS.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-center text-[1.0625rem] leading-[1.7] text-ink-soft">
              {OBJECTIONS.lede}
            </p>
          </Reveal>

          <div className="mt-14">
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

          <Reveal delay={0.1}>
            <p className="mt-12 text-center text-[1.0625rem] leading-[1.7] text-ink-soft">
              {OBJECTIONS.closing}
            </p>
          </Reveal>
        </div>
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
    <div className="mb-6">
      <h3>
        <button
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-start gap-x-4 text-left"
        >
          {/* Question pill */}
          <span
            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${
              isOpen
                ? 'bg-accent/20 text-accent-ink'
                : 'bg-cream-100 text-forest-950 hover:bg-cream-300'
            }`}
          >
            <span
              aria-hidden="true"
              className={`text-[0.75rem] font-semibold tabular-nums ${
                isOpen ? 'text-accent-ink' : 'text-ink-soft'
              }`}
            >
              {number}
            </span>
            <span className="font-medium">{item.q}</span>
          </span>

          <span
            aria-hidden="true"
            className={`shrink-0 transition-colors ${
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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            {/* Answer bubble, aligned right — the reference's shape, in
                brand colours rather than its hardcoded blue. */}
            <div className="ml-7 mt-4 flex justify-end md:ml-16">
              <div className="relative max-w-md rounded-2xl bg-accent-ink px-5 py-4 text-cream-50">
                {item.a.map((para) => (
                  <p
                    key={para}
                    className="text-[1rem] leading-[1.65] [&+p]:mt-3"
                  >
                    {para}
                  </p>
                ))}

                {/* Attribution. These answers lean on specific figures, so
                    the sources are shown rather than buried. */}
                <p className="mt-4 border-t border-cream-50/20 pt-3 text-[0.75rem] leading-relaxed text-cream-100/80">
                  <span className="font-semibold text-accent">Source: </span>
                  {item.sources.join(' · ')}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

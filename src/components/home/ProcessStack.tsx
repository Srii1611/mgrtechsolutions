'use client';

import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { PROCESS } from '@/data/home';

type Step = (typeof PROCESS.steps)[number];

/**
 * SECTION 05 — the 15-day build, as a scroll stack.
 *
 * One card per step. Each card is `position: sticky`, so as you scroll the
 * next one rises and covers the last, leaving a pile with "After launch" on
 * top. THE STACKING IS PURE CSS — sticky does all of it, at no JavaScript
 * cost and with nothing to jank.
 *
 * The only scroll-linked work is the scale-down and dim of covered cards,
 * which is what makes the pile read as depth rather than as overlap.
 *
 * Every card carries a proportional day bar: a full 15-day track with this
 * step's slice filled, positioned where it actually falls. That is the
 * argument the earlier rail existed to make — the seven-day build is a wide
 * band and the client's days are slivers — and it survives the change of
 * layout, which a plain card list would have thrown away.
 *
 * All six cards are always in the DOM. Nothing here is conditionally
 * rendered, so the full copy ships in the server HTML.
 */
export default function ProcessStack({ steps }: { steps: readonly Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const totalSpan = steps.reduce((sum, s) => sum + s.span, 0);

  // Where each step begins on the 15-day track, as a running total.
  const offsets: number[] = [];
  steps.reduce((acc, s) => {
    offsets.push(acc);
    return acc + s.span;
  }, 0);

  return (
    <div ref={ref} className="relative mt-12">
      {steps.map((step, i) => (
        <Card
          key={step.title}
          step={step}
          index={i}
          total={steps.length}
          offsetPct={(offsets[i] / totalSpan) * 100}
          widthPct={(step.span / totalSpan) * 100}
          progress={scrollYProgress}
          reduce={!!reduce}
        />
      ))}
    </div>
  );
}

const TRACK = {
  client: { bar: 'bg-accent', text: 'text-accent', border: 'border-accent' },
  studio: { bar: 'bg-mist', text: 'text-mist', border: 'border-forest-700' },
  after: { bar: 'bg-sand', text: 'text-sand', border: 'border-sand' },
} as const;

function Card({
  step,
  index,
  total,
  offsetPct,
  widthPct,
  progress,
  reduce,
}: {
  step: Step;
  index: number;
  total: number;
  offsetPct: number;
  widthPct: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const isLast = index === total - 1;
  const track = TRACK[step.track];

  /*
    A card starts shrinking once the NEXT one begins to cover it, and keeps
    shrinking to the end of the stack. The last card never shrinks — it is
    the one left on top.
  */
  const start = (index + 1) / total;
  const scale = useTransform(progress, [start, 1], [1, isLast ? 1 : 0.94]);
  const veil = useTransform(progress, [start, 1], [0, isLast ? 0 : 0.5]);

  return (
    <div
      className="sticky"
      style={{
        // Each card parks slightly lower than the last, so the stack shows
        // its edges instead of hiding them behind the top card.
        top: `calc(6rem + ${index * 12}px)`,
        zIndex: index + 1,
        marginBottom: isLast ? 0 : '2.5rem',
      }}
    >
      <motion.article
        style={{ scale: reduce ? 1 : scale, transformOrigin: 'top center' }}
        className={`relative overflow-hidden rounded-2xl border bg-forest-900 p-7 md:p-10 ${
          step.track === 'client' ? 'border-accent/40' : 'border-forest-700'
        }`}
      >
        {/* Dimming veil as a separate layer, so the card's own text is not
            faded by an opacity applied to the whole element. */}
        <motion.span
          aria-hidden="true"
          style={{ opacity: reduce ? 0 : veil }}
          className="absolute inset-0 bg-forest-950"
        />

        <div className="relative">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            {/* Step 6 carries no number — it is ongoing, not one of the 15 days. */}
            {step.n !== null && (
              <span
                aria-hidden="true"
                className={`text-[0.8125rem] font-semibold tabular-nums ${track.text}`}
              >
                {String(step.n).padStart(2, '0')}
              </span>
            )}

            <h3 className="h3-card font-medium text-cream-50">{step.title}</h3>

            <span className="eyebrow text-mist">{step.days}</span>

            <span
              className={`eyebrow rounded-full border px-3 py-1 ${
                step.track === 'client'
                  ? 'border-accent text-accent'
                  : 'border-forest-700 text-mist'
              }`}
            >
              YOU: {step.yourTime}
            </span>
          </div>

          {/* Proportional day bar. The full track is the 15 days; the filled
              slice is this step, sitting where it actually falls. */}
          <div
            aria-hidden="true"
            className="relative mt-5 h-1.5 w-full overflow-hidden rounded-full bg-forest-800"
          >
            <span
              className={`absolute inset-y-0 rounded-full ${track.bar}`}
              style={{ left: `${offsetPct}%`, width: `${widthPct}%` }}
            />
          </div>

          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-mist">
            {step.body}
          </p>

          <ul className="mt-6 grid max-w-3xl gap-2 sm:grid-cols-2">
            {step.bullets.map((bullet) => (
              <li
                key={bullet}
                className="border-l-2 border-forest-700 pl-4 text-[0.9375rem] leading-[1.6] text-mist"
              >
                {bullet}
              </li>
            ))}
          </ul>

          <p className="mt-6 max-w-2xl text-[1rem] leading-[1.7] text-cream-50">
            <span className={`eyebrow ${track.text}`}>You end up with: </span>
            {step.outcome}
          </p>
        </div>
      </motion.article>
    </div>
  );
}

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
 * The only scroll-linked work is the scale-down and dim of a covered card,
 * which is what makes the pile read as depth rather than as overlap. Each
 * card does that over its OWN segment of the scroll, so a card is dark by
 * the time the next one parks on it — otherwise its header sits orphaned at
 * full brightness above a card that has already covered the rest of it.
 *
 * Layout is two columns: the narrative on the left, a ledger panel on the
 * right. The ledger carries the day gauge — a tick per build day, with this
 * step's days lit — which is the argument the section exists to make: the
 * build is a wide band and the client's days are slivers.
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

  /*
    The gauge measures the BUILD only. "After launch" is ongoing, so its span
    is not a slice of the 15 days and must not stretch the track — including
    it would push the build's own days off their real positions.
  */
  const buildDays = steps
    .filter((s) => s.track !== 'after')
    .reduce((sum, s) => sum + s.span, 0);

  // Where each step starts on the day track, as a running total.
  const startDays: number[] = [];
  steps.reduce((acc, s) => {
    startDays.push(acc);
    return s.track === 'after' ? acc : acc + s.span;
  }, 0);

  return (
    <div ref={ref} className="relative mt-14">
      {steps.map((step, i) => (
        <Card
          key={step.title}
          step={step}
          index={i}
          total={steps.length}
          startDay={startDays[i]}
          buildDays={buildDays}
          progress={scrollYProgress}
          reduce={!!reduce}
        />
      ))}
    </div>
  );
}

const TRACK = {
  client: { tick: 'bg-accent', text: 'text-accent', edge: 'border-accent/45' },
  studio: { tick: 'bg-mist', text: 'text-mist', edge: 'border-forest-700' },
  after: { tick: 'bg-sand', text: 'text-sand', edge: 'border-sand/45' },
} as const;

function Card({
  step,
  index,
  total,
  startDay,
  buildDays,
  progress,
  reduce,
}: {
  step: Step;
  index: number;
  total: number;
  startDay: number;
  buildDays: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const isLast = index === total - 1;
  const track = TRACK[step.track];

  /*
    A card shrinks and darkens across its own segment of the scroll, which is
    the stretch during which the next card rises over it. By the time the
    next card parks, this one has finished moving. The last card never
    changes — it is the one left on top.
  */
  const from = index / total;
  const to = (index + 1) / total;
  const scale = useTransform(progress, [from, to], [1, isLast ? 1 : 0.95]);
  const veil = useTransform(progress, [from, to], [0, isLast ? 0 : 0.72]);

  return (
    <div
      className="sticky"
      style={{
        // Each card parks lower than the last, so the pile shows its edges.
        top: `calc(5.5rem + ${index * 14}px)`,
        zIndex: index + 1,
        marginBottom: isLast ? 0 : '3rem',
      }}
    >
      <motion.article
        style={{ scale: reduce ? 1 : scale, transformOrigin: 'top center' }}
        className={`relative overflow-hidden rounded-2xl border bg-forest-800 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.85)] ${track.edge}`}
      >
        {/* Dimming veil as a separate layer, so the card's own text is not
            faded by an opacity applied to the whole element. */}
        <motion.span
          aria-hidden="true"
          style={{ opacity: reduce ? 0 : veil }}
          className="absolute inset-0 z-10 bg-forest-950"
        />

        <div className="relative grid gap-x-10 gap-y-8 p-7 md:p-10 lg:grid-cols-[1fr_20rem] lg:gap-x-14">
          {/* ── Narrative ─────────────────────────────────────────── */}
          <div>
            <div className="flex items-baseline gap-4">
              {/* Step 6 carries no number — it is ongoing, not one of the days. */}
              {step.n !== null && (
                <span
                  aria-hidden="true"
                  className={`font-mono text-[0.9375rem] font-medium tabular-nums ${track.text}`}
                >
                  {String(step.n).padStart(2, '0')}
                </span>
              )}
              <h3 className="h3-card font-medium text-balance text-cream-50">
                {step.title}
              </h3>
            </div>

            <p className="mt-5 text-[1.0625rem] leading-[1.7] text-mist">
              {step.body}
            </p>

            <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {step.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-3 text-[0.9375rem] leading-[1.55] text-cream-50/85"
                >
                  <span
                    aria-hidden="true"
                    className={`mt-[0.55em] h-px w-3 shrink-0 ${track.tick}`}
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Ledger ────────────────────────────────────────────── */}
          {/* No border: the inset background is enough to separate the ledger
              from the card, and the internal rules already carry its
              structure. A border on top of both was the one accessory too
              many. */}
          <aside className="rounded-xl bg-forest-900 p-6">
            <p className="eyebrow text-mist">
              {step.n !== null ? 'When' : 'Horizon'}
            </p>
            <p
              className={`mt-2 font-mono text-[1.375rem] leading-none tracking-tight tabular-nums ${track.text}`}
            >
              {step.days}
            </p>

            {/* One tick per build day, this step's days lit. "After launch"
                has no place on the track, so it shows the track empty. */}
            <div className="mt-5">
              <div aria-hidden="true" className="flex gap-[3px]">
                {Array.from({ length: buildDays }, (_, day) => {
                  const lit =
                    step.track !== 'after' &&
                    day >= startDay &&
                    day < startDay + step.span;
                  return (
                    <span
                      key={day}
                      className={`h-6 flex-1 rounded-[2px] ${
                        lit ? track.tick : 'bg-forest-700/60'
                      }`}
                    />
                  );
                })}
              </div>
              {/* Labelled as a range, not a count: the track is one tick per
                  day from day 0 to day 15, which is 16 ticks across the
                  15-day build. A "16 days" caption would fight the site-wide
                  15-day claim. */}
              <p className="eyebrow mt-2.5 text-[0.625rem] text-mist/70">
                Day 0 → day {buildDays - 1}
              </p>
            </div>

            <div className="mt-6 flex items-baseline justify-between border-t border-forest-700 pt-5">
              <span className="eyebrow text-mist">Your time</span>
              <span
                className={`font-mono text-[1.0625rem] leading-none tabular-nums ${track.text}`}
              >
                {step.yourTime}
              </span>
            </div>

            <div className="mt-5 border-t border-forest-700 pt-5">
              <p className="eyebrow text-mist">You end up with</p>
              <p className="mt-2 text-[0.9375rem] leading-[1.6] text-cream-50">
                {step.outcome}
              </p>
            </div>
          </aside>
        </div>
      </motion.article>
    </div>
  );
}

'use client';

import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PROCESS } from '@/data/home';

type Step = (typeof PROCESS.steps)[number];

/**
 * SECTION 09 — the interactive rail.
 *
 * ONE DOM, TWO LAYOUTS. Source order is header, panel, header, panel … so
 * mobile gets a natural accordion with no extra markup. On desktop, explicit
 * CSS Grid placement lifts the six headers into row 1 as proportional columns
 * and drops all six panels into row 2, stacked in the same cell. Explicit
 * `grid-row` / `grid-column` overrides source order, so neither layout needs
 * its own copy of the content — which matters, because duplicating six long
 * panels would double the HTML this section ships.
 *
 * The rail's column widths come straight from `span`, via
 * `grid-template-columns: 2fr 2fr 7fr 3fr 2fr 2fr`. That is the whole visual
 * argument: the seven-day build renders seven units wide and the client's
 * days render two, so the shape of the bar shows whose time this actually
 * costs.
 *
 * ALL SIX PANELS ARE ALWAYS IN THE DOM. Inactive ones carry the `hidden`
 * attribute rather than being conditionally rendered, so the server HTML
 * always contains every panel's body, bullets and outcome.
 */
export default function ProcessRail({ steps }: { steps: readonly Step[] }) {
  const [active, setActive] = useState(0);
  const [mineOnly, setMineOnly] = useState(false);
  const reduce = useReducedMotion();
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const isDim = (s: Step) => mineOnly && s.track !== 'client';

  // Total of the client-side minutes, derived rather than hardcoded so it can
  // never drift from the step data.
  const totalMinutes = steps
    .filter((s) => s.track === 'client')
    .reduce((sum, s) => sum + (parseInt(s.yourTime, 10) || 0), 0);

  const select = (i: number) => {
    if (isDim(steps[i])) return;
    setActive(i);
  };

  const toggleMine = () => {
    const next = !mineOnly;
    setMineOnly(next);
    // If the open step is about to be dimmed, fall back to step 1.
    if (next && steps[active].track !== 'client') setActive(0);
  };

  // Arrow / Home / End are an enhancement on top of the disclosure pattern,
  // not a roving-tabindex tablist: every header stays a normal tab stop.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const reachable = steps
      .map((s, i) => (isDim(s) ? -1 : i))
      .filter((i) => i >= 0);
    if (reachable.length === 0) return;
    const pos = reachable.indexOf(active);
    let next: number | null = null;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = reachable[(pos + 1) % reachable.length];
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = reachable[(pos - 1 + reachable.length) % reachable.length];
    else if (e.key === 'Home') next = reachable[0];
    else if (e.key === 'End') next = reachable[reachable.length - 1];

    if (next !== null) {
      e.preventDefault();
      setActive(next);
      tabsRef.current[next]?.focus();
    }
  };

  const cols = steps.map((s) => `${s.span}fr`).join(' ');

  return (
    <div className="mt-12">
      {/* Filter toggle */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={toggleMine}
          aria-pressed={mineOnly}
          className={`rounded-full border px-5 py-2.5 text-[0.9375rem] font-medium transition-colors ${
            mineOnly
              ? 'border-accent bg-accent text-forest-950'
              : 'border-forest-700 text-cream-50 hover:border-accent'
          }`}
        >
          {mineOnly ? 'Show all 15 days' : 'Show only my part'}
        </button>

        <p className="eyebrow text-mist">
          your time: {totalMinutes} minutes
        </p>
      </div>

      <div
        className="mt-8 md:grid md:gap-x-2"
        style={{ gridTemplateColumns: cols, gridTemplateRows: 'auto auto auto' }}
      >
        {steps.map((step, i) => {
          const dim = isDim(step);
          const selected = active === i;
          const tabId = `process-step-${i}`;
          const panelId = `process-panel-${i}`;

          return (
            <div key={step.title} className="contents">
              {/* ── Header / rail segment ───────────────────────────
                  Desktop: row 1, one grid column, width from `span`.
                  Mobile: a full-width row with a left bar whose HEIGHT is
                  proportional to span, so the same argument survives. */}
              <h3
                className="md:[grid-row:1] md:contents"
                style={{ gridColumn: i + 1 }}
              >
                <button
                  ref={(el) => {
                    tabsRef.current[i] = el;
                  }}
                  id={tabId}
                  type="button"
                  aria-controls={panelId}
                  aria-expanded={selected}
                  aria-hidden={dim || undefined}
                  tabIndex={dim ? -1 : 0}
                  onClick={() => select(i)}
                  onKeyDown={onKeyDown}
                  style={{ gridColumn: i + 1, gridRow: 1 }}
                  className={`relative flex w-full min-h-[44px] items-stretch gap-3 border-b border-forest-800 text-left transition-opacity duration-150 md:min-h-0 md:flex-col md:gap-0 md:border-b-0 ${
                    dim ? 'opacity-30' : 'opacity-100'
                  }`}
                >
                  {/* Mobile-only proportional bar */}
                  <span
                    aria-hidden="true"
                    className={`w-1 shrink-0 rounded-full md:hidden ${TRACK_BG[step.track]}`}
                    style={{ height: `${Math.max(44, step.span * 16)}px` }}
                  />

                  <span
                    className={`flex flex-1 flex-col justify-center py-3 md:rounded-lg md:border md:px-3 md:py-3 md:transition-colors ${
                      selected
                        ? `${TRACK_BG_SOFT[step.track]} ${TRACK_BORDER[step.track]}`
                        : 'md:border-forest-700 md:bg-forest-900'
                    }`}
                  >
                    <span className="flex items-baseline gap-2">
                      {step.n !== null && (
                        <span
                          aria-hidden="true"
                          className={`text-[0.75rem] font-semibold tabular-nums ${
                            selected ? TRACK_TEXT[step.track] : 'text-mist'
                          }`}
                        >
                          {String(step.n).padStart(2, '0')}
                        </span>
                      )}
                      <span
                        className={`text-[0.9375rem] font-medium leading-tight ${
                          selected ? 'text-cream-50' : 'text-mist'
                        }`}
                      >
                        {step.title}
                      </span>
                    </span>

                    <span className="mt-1 flex items-center gap-2 text-[0.6875rem] uppercase tracking-wider text-mist">
                      <span>{step.days}</span>
                      <span aria-hidden="true">·</span>
                      <span>you: {step.yourTime}</span>
                    </span>
                  </span>

                  {/* Shared-layout indicator: one element that travels between
                      segments rather than fading in separately under each. */}
                  {selected && !reduce && (
                    <motion.span
                      layoutId="process-rail-indicator"
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-px hidden h-0.5 md:block ${TRACK_BG[step.track]}`}
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    />
                  )}
                </button>
              </h3>

              {/* ── Panel ───────────────────────────────────────────
                  Desktop: row 2, spanning every column. Mobile: in flow,
                  directly beneath its own header, so it reads as an
                  accordion. `hidden` rather than conditional rendering, so
                  the content is always in the server HTML. */}
              <div
                id={panelId}
                role="region"
                aria-labelledby={tabId}
                hidden={!selected}
                style={{ gridColumn: '1 / -1', gridRow: 2 }}
                className="border-b border-forest-800 py-6 md:min-h-[22rem] md:border-b-0 md:pt-10"
              >
                <PanelBody step={step} index={i} active={selected} reduce={!!reduce} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Track colours ─────────────────────────────────────────────────
   client = accent (your time), studio = forest-700 (ours), after = sand.
   All three already exist in @theme; nothing new was invented. */
const TRACK_BG = {
  client: 'bg-accent',
  studio: 'bg-forest-700',
  after: 'bg-sand',
} as const;

const TRACK_BG_SOFT = {
  client: 'md:bg-accent/15',
  studio: 'md:bg-forest-800',
  after: 'md:bg-sand/15',
} as const;

const TRACK_BORDER = {
  client: 'md:border-accent',
  studio: 'md:border-mist',
  after: 'md:border-sand',
} as const;

const TRACK_TEXT = {
  client: 'text-accent',
  studio: 'text-cream-50',
  after: 'text-sand',
} as const;

/* ── Panel content ─────────────────────────────────────────────── */

function PanelBody({
  step,
  index,
  active,
  reduce,
}: {
  step: Step;
  index: number;
  active: boolean;
  reduce: boolean;
}) {
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_auto] md:gap-12">
      <div className="max-w-2xl">
        <p className="text-[1.0625rem] leading-[1.7] text-mist">{step.body}</p>

        {/* Step 4 swaps its two bullets for a note switch (5b). Both strings
            stay in the HTML; the inactive one is `hidden`, not removed. */}
        {index === 3 ? (
          <NoteSwitch step={step} />
        ) : (
          <ul className="mt-6 space-y-2">
            {step.bullets.map((bullet) => (
              <li
                key={bullet}
                className="border-l-2 border-forest-700 pl-4 text-[1rem] leading-[1.6] text-mist"
              >
                {bullet}
              </li>
            ))}
          </ul>
        )}

        <p className="mt-6 text-[1rem] leading-[1.7] text-cream-50">
          <span className="eyebrow text-accent">You end up with: </span>
          {step.outcome}
        </p>
      </div>

      {/* Step 2 gets the assembling phone frame (5a). */}
      {index === 1 && <PreviewFrame active={active} reduce={reduce} />}
    </div>
  );
}

/* ── 5a — Step 2 preview frame ─────────────────────────────────── */

/** Placeholder shapes only. Assembles in sequence when step 2 is selected. */
function PreviewFrame({ active, reduce }: { active: boolean; reduce: boolean }) {
  const parts = [
    'h-6 w-16 rounded bg-forest-700',
    'h-3 w-32 rounded-full bg-forest-700',
    'h-2 w-28 rounded-full bg-forest-800',
    'h-2 w-24 rounded-full bg-forest-800',
    'h-8 w-full rounded-full bg-accent',
  ];

  return (
    <div aria-hidden="true" className="hidden w-[168px] shrink-0 md:block">
      <div className="rounded-[1.5rem] border border-forest-700 bg-forest-950 p-2">
        <div className="flex h-[300px] flex-col gap-3 rounded-[1.15rem] bg-forest-900 p-4">
          {parts.map((cls, i) => (
            <motion.span
              key={cls}
              className={cls}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={active || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 0.22, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] }
              }
              style={i === 4 ? { marginTop: 'auto' } : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 5b — Step 4 note switch ───────────────────────────────────── */

function NoteSwitch({ step }: { step: Step }) {
  const [useful, setUseful] = useState(true);
  const [good, bad] = step.bullets;

  return (
    <div className="mt-6">
      <div
        role="group"
        aria-label="Example feedback"
        className="inline-flex rounded-full border border-forest-700 p-1"
      >
        <button
          type="button"
          onClick={() => setUseful(true)}
          aria-pressed={useful}
          className={`rounded-full px-4 py-1.5 text-[0.8125rem] font-medium transition-colors ${
            useful ? 'bg-accent text-forest-950' : 'text-mist hover:text-cream-50'
          }`}
        >
          Useful note
        </button>
        <button
          type="button"
          onClick={() => setUseful(false)}
          aria-pressed={!useful}
          className={`rounded-full px-4 py-1.5 text-[0.8125rem] font-medium transition-colors ${
            !useful ? 'bg-destructive text-cream-50' : 'text-mist hover:text-cream-50'
          }`}
        >
          Unhelpful note
        </button>
      </div>

      {/* Both examples ship in the HTML; the inactive one is hidden. */}
      <p
        hidden={!useful}
        className="mt-4 border-l-2 border-accent pl-4 text-[1rem] leading-[1.6] text-mist"
      >
        {good}
      </p>
      <p
        hidden={useful}
        className="mt-4 border-l-2 border-destructive pl-4 text-[1rem] leading-[1.6] text-destructive"
      >
        {bad}
      </p>
    </div>
  );
}

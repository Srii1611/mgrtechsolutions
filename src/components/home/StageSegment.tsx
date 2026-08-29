'use client';

import { useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';

/**
 * One pinned segment of Section 02: copy on the left, phone on the right.
 *
 * PINNING IS CSS (`position: sticky`), not JavaScript. Sticky costs no JS,
 * cannot drift against Lenis smooth scroll, and cannot introduce layout shift
 * — it reserves no space and moves nothing. ScrollTrigger's `pin` was
 * evaluated and rejected: its advantage is managed spacer heights, which this
 * layout does not need.
 *
 * Only the phone's SCREEN STATE is scroll-linked, via Framer Motion.
 *
 * The copy arrives as server-rendered `children` and is never re-rendered by
 * the scroll logic.
 */
export default function StageSegment({
  segment,
  children,
}: {
  segment: 'a' | 'b';
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Progress across THIS segment: 0 as its top reaches the viewport top,
  // 1 as its bottom leaves. Scrubs backwards cleanly because it is derived
  // from position, not fired by a trigger.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <div
      ref={ref}
      className="container-page lg:grid lg:grid-cols-[1fr_340px] lg:gap-14 xl:gap-20"
    >
      <div className="min-w-0">{children}</div>

      <div className="hidden lg:block">
        <div className="sticky top-28 py-8">
          <PhoneFrame>
            {segment === 'a' ? (
              <SegmentAScenes p={p} reduce={!!reduce} />
            ) : (
              <SceneFollowUp p={p} reduce={!!reduce} />
            )}
          </PhoneFrame>
        </div>
      </div>
    </div>
  );
}

/* ── Frame ─────────────────────────────────────────────────────────── */

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div aria-hidden="true" className="mx-auto w-[330px] select-none">
      <div className="relative rounded-[2.25rem] border border-forest-700 bg-forest-950 p-2.5 shadow-2xl shadow-black/20">
        <div className="absolute left-1/2 top-2.5 z-20 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-forest-950" />
        <div className="relative h-[560px] overflow-hidden rounded-[1.65rem] bg-cream-50">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Segment A: stages 01 and 02 share one phone ──────────────────── */

function SegmentAScenes({ p, reduce }: { p: MotionValue<number>; reduce: boolean }) {
  // First half of the segment is stage 01, second half is stage 02.
  const foundOpacity = useTransform(p, [0, 0.44, 0.52], [1, 1, 0]);
  const chosenOpacity = useTransform(p, [0.44, 0.52, 1], [0, 1, 1]);

  return (
    <>
      <motion.div
        style={{ opacity: reduce ? 1 : foundOpacity }}
        className="absolute inset-0"
      >
        <SceneFound p={p} reduce={reduce} />
      </motion.div>

      <motion.div
        style={{ opacity: reduce ? 0 : chosenOpacity }}
        className="absolute inset-0"
      >
        <SceneChosen p={p} reduce={reduce} />
      </motion.div>
    </>
  );
}

/* ── Scene 01 — Get Found ──────────────────────────────────────────── */

/** The client's card climbs from #11 into the map box and takes the accent. */
function SceneFound({ p, reduce }: { p: MotionValue<number>; reduce: boolean }) {
  // Runs over the first ~40% of the segment.
  const climb = useTransform(p, [0.06, 0.36], [0, 1]);

  const clientY = useTransform(climb, [0, 1], [232, 0]);
  const clientScale = useTransform(climb, [0, 1], [0.94, 1]);
  const clientOpacity = useTransform(climb, [0, 0.15, 1], [0.55, 0.8, 1]);
  const accent = useTransform(climb, [0.75, 1], [0, 1]);
  const competitorsY = useTransform(climb, [0, 1], [0, 46]);
  const rankOpacity = useTransform(climb, [0, 0.4], [1, 0]);

  const staticEnd = reduce;

  return (
    <div className="flex h-full flex-col">
      <StatusBar />

      <div className="px-3 pb-2 pt-1">
        <div className="flex items-center gap-2 rounded-full border border-cream-300 bg-cream-100 px-3 py-2">
          <span className="h-3 w-3 rounded-full border-2 border-ink-soft" />
          <span className="truncate text-[0.625rem] text-forest-950">
            drywall contractor Framingham MA
          </span>
        </div>
      </div>

      <div className="flex gap-4 border-b border-cream-300 px-4 pb-1.5 text-[0.5625rem] font-medium">
        <span className="border-b-2 border-forest-950 pb-1 text-forest-950">All</span>
        <span className="text-ink-soft">Maps</span>
        <span className="text-ink-soft">Images</span>
      </div>

      <div className="px-3 pt-3">
        <MapStrip climb={climb} reduce={staticEnd} />

        {/* The map box. The client's card is absolutely positioned so it can
            travel without disturbing the layout of the list around it. */}
        <div className="relative mt-2 overflow-hidden rounded-lg border border-cream-300">
          <motion.div style={{ y: staticEnd ? 46 : competitorsY }}>
            <MapResult rank="1" name="Bay State Drywall" rating="4.8" reviews="112" />
            <MapResult rank="2" name="Sullivan Plaster Co." rating="4.7" reviews="86" />
          </motion.div>

          <motion.div
            style={{
              y: staticEnd ? 0 : clientY,
              scale: staticEnd ? 1 : clientScale,
              opacity: staticEnd ? 1 : clientOpacity,
            }}
            className="absolute inset-x-0 top-0 z-10"
          >
            <ClientResult accent={accent} settled={staticEnd} />
          </motion.div>

          <div className="pt-[46px]">
            <MapResult rank="3" name="Metro Finish Interiors" rating="4.6" reviews="74" />
          </div>
        </div>
      </div>

      <div className="mt-3 flex-1 space-y-2 border-t border-cream-300 px-3 pt-3">
        <GhostResult />
        <GhostResult />
        <motion.p
          style={{ opacity: staticEnd ? 0 : rankOpacity }}
          className="pt-1 text-center text-[0.5625rem] text-ink-soft"
        >
          Your business — position 11
        </motion.p>
      </div>
    </div>
  );
}

function ClientResult({
  accent,
  settled,
}: {
  accent: MotionValue<number>;
  settled: boolean;
}) {
  return (
    <div className="relative flex h-[46px] items-center gap-2 border-b border-cream-300 bg-cream-50 px-2.5">
      <motion.span
        style={{ opacity: settled ? 1 : accent }}
        className="absolute inset-0 bg-accent/12"
      />
      <span className="relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-ink text-[0.5rem] font-semibold text-cream-50">
        1
      </span>
      <span className="relative min-w-0 flex-1">
        <span className="block truncate text-[0.625rem] font-semibold text-forest-950">
          Your business
        </span>
        <span className="mt-0.5 block text-[0.5rem] text-ink-soft">
          ★ 4.9 · 64 reviews · Drywall contractor
        </span>
      </span>
    </div>
  );
}

function MapStrip({ climb, reduce }: { climb: MotionValue<number>; reduce: boolean }) {
  const pinScale = useTransform(climb, [0.7, 1], [0, 1]);

  return (
    <div className="relative h-24 overflow-hidden rounded-lg border border-cream-300 bg-cream-100">
      <div className="absolute left-0 top-8 h-px w-full bg-cream-300" />
      <div className="absolute left-0 top-16 h-px w-full bg-cream-300" />
      <div className="absolute left-10 top-0 h-full w-px bg-cream-300" />
      <div className="absolute left-24 top-0 h-full w-px bg-cream-300" />

      <Pin className="left-[22%] top-[26%]" />
      <Pin className="left-[74%] top-[30%]" />

      {/* The client's pin appears as the card lands in the box. */}
      <motion.span
        style={{ scale: reduce ? 1 : pinScale }}
        className="absolute left-[50%] top-[52%] flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent-ink ring-2 ring-cream-50"
      >
        <span className="h-1 w-1 rounded-full bg-cream-50" />
      </motion.span>
    </div>
  );
}

/* ── Scene 02 — Get Chosen ─────────────────────────────────────────── */

/** Two sites compared, a five-second timer, then one survives. */
function SceneChosen({ p, reduce }: { p: MotionValue<number>; reduce: boolean }) {
  const t = useTransform(p, [0.5, 1], [0, 1]);

  const ring = useTransform(t, [0.05, 0.4], [1, 0]);
  const greyOut = useTransform(t, [0.4, 0.48], [0, 1]);
  const questions = useTransform(t, [0.44, 0.52, 0.66, 0.72], [0, 1, 1, 0]);
  const rightBack = useTransform(t, [0.7, 0.82], [0, 1]);

  // Computed unconditionally at the top level. Calling useTransform inside a
  // ternary in JSX is a rules-of-hooks violation — the hook would be skipped
  // whenever `reduce` is true, changing hook order between renders.
  const winnerVeil = useTransform([greyOut, rightBack], ([g, r]: number[]) =>
    Math.max(0, g - r),
  );

  const [seconds, setSeconds] = useState(5);
  useMotionValueEvent(ring, 'change', (v) => {
    setSeconds(Math.max(0, Math.ceil(v * 5)));
  });

  const done = reduce;

  return (
    <div className="flex h-full flex-col">
      <StatusBar />

      <div className="flex items-center justify-between px-4 pb-2 pt-1">
        <p className="eyebrow text-[0.5rem] text-ink-soft">Comparing</p>
        <span className="flex items-center gap-1.5 text-[0.5625rem] font-semibold text-accent-ink">
          <motion.span
            style={{ scale: done ? 1 : ring }}
            className="h-2 w-2 rounded-full bg-accent-ink"
          />
          {done ? '0s' : `${seconds}s`}
        </span>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-2 px-3 pb-3">
        {/* Loser — stays grey */}
        <div className="relative overflow-hidden rounded-lg border border-cream-300 bg-cream-100">
          <MiniSite poor />
          <motion.div
            style={{ opacity: done ? 1 : greyOut }}
            className="absolute inset-0 bg-ink-soft/70"
          />
        </div>

        {/* Winner — greys out, then returns filled in */}
        <div className="relative overflow-hidden rounded-lg border border-cream-300 bg-cream-50">
          <MiniSite />
          <motion.div
            style={{ opacity: done ? 0 : winnerVeil }}
            className="absolute inset-0 bg-ink-soft/70"
          />
        </div>
      </div>

      {/* The two questions that decide it */}
      <motion.div
        style={{ opacity: done ? 0 : questions }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 text-center"
      >
        <p className="rounded-lg bg-forest-950/90 px-3 py-2 text-[0.6875rem] font-medium text-cream-50">
          What&rsquo;s the phone number?
        </p>
        <p className="mt-2 rounded-lg bg-forest-950/90 px-3 py-2 text-[0.6875rem] font-medium text-cream-50">
          Has anyone reviewed him?
        </p>
      </motion.div>
    </div>
  );
}

function MiniSite({ poor = false }: { poor?: boolean }) {
  return (
    <div className="flex h-full flex-col p-2">
      <div className="h-2 w-2/3 rounded-full bg-cream-300" />

      {poor ? (
        <>
          <div className="mt-2 h-12 rounded bg-cream-300" />
          <div className="mt-2 space-y-1">
            <div className="h-1 w-full rounded-full bg-cream-300" />
            <div className="h-1 w-5/6 rounded-full bg-cream-300" />
            <div className="h-1 w-4/6 rounded-full bg-cream-300" />
          </div>
          <p className="mt-auto text-[0.5rem] text-ink-soft">No reviews</p>
        </>
      ) : (
        <>
          {/* "Photo" of finished work */}
          <div className="mt-2 h-12 rounded bg-forest-800" />
          <div className="mt-1.5 flex items-center gap-1 text-[0.5rem] font-semibold text-accent-ink">
            ★★★★★ <span className="text-ink-soft">4.9 (64)</span>
          </div>
          <p className="mt-1 text-[0.5rem] text-ink-soft">Lic. #CS-000000 · Insured</p>
          <div className="mt-auto rounded-full bg-accent px-2 py-1 text-center text-[0.5rem] font-semibold text-forest-950">
            Tap to call
          </div>
        </>
      )}
    </div>
  );
}

/* ── Scene 03 — Get Followed Up ────────────────────────────────────── */

/** Calls go unanswered, then the text-back fires and the tally recovers. */
function SceneFollowUp({ p, reduce }: { p: MotionValue<number>; reduce: boolean }) {
  const missPhase = useTransform(p, [0.08, 0.46], [0, 1]);
  const fixPhase = useTransform(p, [0.56, 0.9], [0, 1]);

  const [missed, setMissed] = useState(0);
  const [recovered, setRecovered] = useState(0);

  useMotionValueEvent(missPhase, 'change', (v) => {
    setMissed(Math.round(v * 6));
  });
  useMotionValueEvent(fixPhase, 'change', (v) => {
    setRecovered(Math.round(v * 6));
  });

  const answered = reduce ? 10 : 4 + recovered;
  const missedNow = reduce ? 0 : missed - recovered;

  const textOpacity = useTransform(p, [0.54, 0.62], [0, 1]);

  return (
    <div className="flex h-full flex-col bg-forest-950 text-cream-50">
      <div className="flex items-center justify-between px-5 pb-1 pt-3 text-[0.5625rem] font-medium text-mist">
        <span>9:41</span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-mist" />
          <span className="h-1.5 w-3 rounded-sm border border-mist" />
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow text-mist">{reduce ? 'Answered' : 'Incoming call'}</p>
        <p className="mt-2 text-lg font-medium text-cream-50">(508) 555-0148</p>
        <p className="mt-1 text-[0.6875rem] text-mist">Framingham, MA</p>

        <span className="mt-6 flex h-20 w-20 items-center justify-center rounded-full border border-forest-700">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-forest-700">
            <span className="h-9 w-9 rounded-full bg-forest-800" />
          </span>
        </span>

        {/* The auto-reply that fires when nobody picks up */}
        <motion.div
          style={{ opacity: reduce ? 1 : textOpacity }}
          className="mt-6 w-full rounded-xl rounded-br-sm bg-accent px-3 py-2 text-left text-[0.625rem] leading-snug text-forest-950"
        >
          Sorry we missed you — this is MGRTECH. What do you need done, and
          what&rsquo;s the address?
        </motion.div>

        <p className="mt-3 text-[0.5625rem] text-mist">
          {reduce ? 'Replied in 8 seconds' : missedNow > 0 ? `${missedNow} of 10 calls missed` : 'Replied in 8 seconds'}
        </p>
      </div>

      <div className="border-t border-forest-700 px-5 py-4">
        <p className="text-[0.5625rem] font-medium text-mist">Calls answered today</p>
        <div className="mt-2 flex gap-1.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                i < answered ? 'bg-accent' : 'bg-forest-800'
              }`}
            />
          ))}
        </div>
        <p className="mt-2 text-[0.5625rem] font-semibold text-cream-50">
          {answered} of 10 answered
        </p>
      </div>
    </div>
  );
}

/* ── Shared ────────────────────────────────────────────────────────── */

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pb-1 pt-3 text-[0.5625rem] font-medium text-ink-soft">
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-ink-soft" />
        <span className="h-1.5 w-3 rounded-sm border border-ink-soft" />
      </span>
    </div>
  );
}

function Pin({ className }: { className: string }) {
  return (
    <span
      className={`absolute flex h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-forest-950 ${className}`}
    >
      <span className="h-1 w-1 rounded-full bg-cream-50" />
    </span>
  );
}

function MapResult({
  rank,
  name,
  rating,
  reviews,
}: {
  rank: string;
  name: string;
  rating: string;
  reviews: string;
}) {
  return (
    <div className="flex h-[46px] items-center gap-2 border-b border-cream-300 bg-cream-50 px-2.5">
      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-forest-950 text-[0.5rem] font-semibold text-cream-50">
        {rank}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[0.625rem] font-medium text-forest-950">
          {name}
        </span>
        <span className="mt-0.5 block text-[0.5rem] text-ink-soft">
          ★ {rating} · {reviews} reviews
        </span>
      </span>
    </div>
  );
}

function GhostResult() {
  return (
    <div className="space-y-1 py-1">
      <div className="h-1.5 w-2/3 rounded-full bg-cream-300" />
      <div className="h-1 w-full rounded-full bg-cream-100" />
    </div>
  );
}

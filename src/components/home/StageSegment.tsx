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
              <SegmentBScenes p={p} reduce={!!reduce} />
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

/* ── Segment A: 01 Website, 02 SEO, 03 Google Ads share one phone ─── */

function SegmentAScenes({ p, reduce }: { p: MotionValue<number>; reduce: boolean }) {
  // The segment splits into thirds, one per stage. Each crossfade straddles a
  // boundary, and each scene gets its own 0→1 progress for its third, so the
  // scenes' internal timings never depend on how many scenes share the phone.
  const siteOpacity = useTransform(p, [0, 0.3, 0.36], [1, 1, 0]);
  const searchOpacity = useTransform(p, [0.3, 0.36, 0.64, 0.7], [0, 1, 1, 0]);
  const adsOpacity = useTransform(p, [0.64, 0.7, 1], [0, 1, 1]);

  const siteP = useTransform(p, [0, 0.34], [0, 1]);
  const searchP = useTransform(p, [0.33, 0.67], [0, 1]);
  const adsP = useTransform(p, [0.66, 1], [0, 1]);

  return (
    <>
      <motion.div style={{ opacity: reduce ? 1 : siteOpacity }} className="absolute inset-0">
        <SceneChosen p={siteP} reduce={reduce} />
      </motion.div>

      <motion.div style={{ opacity: reduce ? 0 : searchOpacity }} className="absolute inset-0">
        <SceneFound p={searchP} reduce={reduce} />
      </motion.div>

      <motion.div style={{ opacity: reduce ? 0 : adsOpacity }} className="absolute inset-0">
        <SceneAds p={adsP} reduce={reduce} />
      </motion.div>
    </>
  );
}

/* ── Segment B: 04 AI Automation, 05 Social Media share one phone ─── */

function SegmentBScenes({ p, reduce }: { p: MotionValue<number>; reduce: boolean }) {
  const followUpOpacity = useTransform(p, [0, 0.46, 0.54], [1, 1, 0]);
  const socialOpacity = useTransform(p, [0.46, 0.54, 1], [0, 1, 1]);

  const followUpP = useTransform(p, [0, 0.5], [0, 1]);
  const socialP = useTransform(p, [0.5, 1], [0, 1]);

  return (
    <>
      <motion.div style={{ opacity: reduce ? 1 : followUpOpacity }} className="absolute inset-0">
        <SceneFollowUp p={followUpP} reduce={reduce} />
      </motion.div>

      <motion.div style={{ opacity: reduce ? 0 : socialOpacity }} className="absolute inset-0">
        <SceneSocial p={socialP} reduce={reduce} />
      </motion.div>
    </>
  );
}

/* ── Scene: SEO ────────────────────────────────────────────────────── */

/** The client's card climbs from #11 into the map box and takes the accent. */
function SceneFound({ p, reduce }: { p: MotionValue<number>; reduce: boolean }) {
  // Runs over the middle of this scene's progress.
  const climb = useTransform(p, [0.12, 0.75], [0, 1]);

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

      <SearchBar query="drywall contractor Framingham MA" />

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
      <MapRoads />

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

/* ── Scene: Website ────────────────────────────────────────────────── */

/** Two sites compared, a five-second timer, then one survives. */
function SceneChosen({ p, reduce }: { p: MotionValue<number>; reduce: boolean }) {
  const t = p;

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

/* ── Scene: Google Ads ─────────────────────────────────────────────── */

/** The client's ad drops in above the map box, then the call comes in. */
function SceneAds({ p, reduce }: { p: MotionValue<number>; reduce: boolean }) {
  const drop = useTransform(p, [0.1, 0.4], [0, 1]);
  const adY = useTransform(drop, [0, 1], [-24, 0]);
  const callAccent = useTransform(p, [0.45, 0.6], [0, 1]);
  const toastOpacity = useTransform(p, [0.62, 0.74], [0, 1]);
  const toastY = useTransform(p, [0.62, 0.74], [12, 0]);

  const settled = reduce;

  return (
    <div className="relative flex h-full flex-col">
      <StatusBar />

      <SearchBar query="drywall repair near me" />

      <div className="px-3 pt-3">
        {/* The ad slot keeps its height from the start, so nothing below it
            moves when the ad arrives. */}
        <div className="h-[92px] overflow-hidden">
          <motion.div
            style={{ y: settled ? 0 : adY, opacity: settled ? 1 : drop }}
            className="rounded-lg border border-cream-300 bg-cream-50 px-2.5 py-2"
          >
            <p className="text-[0.5rem] font-semibold text-forest-950">Sponsored</p>
            <p className="mt-0.5 truncate text-[0.625rem] font-semibold text-accent-ink">
              Your business — Drywall repair in Framingham
            </p>
            <p className="mt-0.5 text-[0.5rem] text-ink-soft">
              Licensed &amp; insured · Free estimates · Same-week starts
            </p>
            <div className="mt-1.5 flex gap-1.5">
              <span className="relative overflow-hidden rounded-full border border-cream-300 px-2.5 py-0.5 text-[0.5rem] font-semibold text-forest-950">
                <motion.span
                  style={{ opacity: settled ? 1 : callAccent }}
                  className="absolute inset-0 bg-accent"
                />
                <span className="relative">Call</span>
              </span>
              <span className="rounded-full border border-cream-300 px-2.5 py-0.5 text-[0.5rem] font-medium text-ink-soft">
                Get a quote
              </span>
            </div>
          </motion.div>
        </div>

        <div className="relative mt-2 h-20 overflow-hidden rounded-lg border border-cream-300 bg-cream-100">
          <MapRoads />
          <Pin className="left-[22%] top-[30%]" />
          <Pin className="left-[56%] top-[58%]" />
          <Pin className="left-[78%] top-[28%]" />
        </div>

        <div className="mt-2 overflow-hidden rounded-lg border border-cream-300">
          <MapResult rank="1" name="Bay State Drywall" rating="4.8" reviews="112" />
          <MapResult rank="2" name="Sullivan Plaster Co." rating="4.7" reviews="86" />
        </div>
      </div>

      <div className="mt-3 flex-1 space-y-2 border-t border-cream-300 px-3 pt-3">
        <GhostResult />
        <GhostResult />
      </div>

      {/* The payoff: the click became a call. */}
      <motion.div
        style={{ opacity: settled ? 1 : toastOpacity, y: settled ? 0 : toastY }}
        className="absolute inset-x-4 bottom-4 flex items-center gap-2 rounded-xl bg-forest-950 px-3 py-2.5"
      >
        <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
        <span className="text-[0.625rem] font-medium text-cream-50">
          New call from your ad · just now
        </span>
      </motion.div>
    </div>
  );
}

/* ── Scene: AI Automation ──────────────────────────────────────────── */

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

/* ── Scene: Social Media ───────────────────────────────────────────── */

/** An empty feed fills with this month's job-site posts, then a comment
 *  comes in and gets answered. */
function SceneSocial({ p, reduce }: { p: MotionValue<number>; reduce: boolean }) {
  const fill = useTransform(p, [0.1, 0.6], [0, 1]);
  const commentOpacity = useTransform(p, [0.6, 0.7], [0, 1]);
  const replyOpacity = useTransform(p, [0.72, 0.82], [0, 1]);

  const [posted, setPosted] = useState(0);
  useMotionValueEvent(fill, 'change', (v) => {
    setPosted(Math.round(v * 9));
  });

  const shown = reduce ? 9 : posted;

  return (
    <div className="flex h-full flex-col">
      <StatusBar />

      <div className="flex items-center gap-3 px-4 pb-3 pt-2">
        <span className="h-10 w-10 shrink-0 rounded-full bg-forest-950 ring-2 ring-accent" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[0.6875rem] font-semibold text-forest-950">
            Your business
          </span>
          <span className="mt-0.5 block text-[0.5rem] text-ink-soft">
            Drywall contractor · Framingham, MA
          </span>
        </span>
      </div>

      <div className="flex justify-between border-y border-cream-300 px-4 py-2 text-[0.5625rem] text-ink-soft">
        <span>
          <span className="font-semibold text-forest-950">{shown}</span> new this month
        </span>
        <span>{shown > 0 ? 'Last post: today' : 'Last post: April'}</span>
      </div>

      <div className="grid grid-cols-3 gap-1 px-3 pt-3">
        {Array.from({ length: 9 }).map((_, i) => {
          const live = i < shown;
          return (
            <span
              key={i}
              className={`relative flex aspect-square items-center justify-center rounded transition-colors duration-300 ${
                live ? 'bg-forest-800' : 'border border-dashed border-form-border bg-cream-100'
              }`}
            >
              {/* Every third post is a video reel. */}
              {live && i % 3 === 0 && (
                <span className="h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-cream-50" />
              )}
            </span>
          );
        })}
      </div>

      <div className="mt-auto space-y-2 px-3 pb-4">
        <motion.div
          style={{ opacity: reduce ? 1 : commentOpacity }}
          className="rounded-xl rounded-bl-sm bg-cream-100 px-3 py-2 text-[0.5625rem] leading-snug text-forest-950"
        >
          <span className="font-semibold">Homeowner · </span>
          That ceiling came out perfect. Do you work in Natick?
        </motion.div>
        <motion.div
          style={{ opacity: reduce ? 1 : replyOpacity }}
          className="ml-6 rounded-xl rounded-br-sm bg-accent px-3 py-2 text-[0.5625rem] leading-snug text-forest-950"
        >
          We do! Send us a message and we&rsquo;ll set up a free estimate.
        </motion.div>
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

function SearchBar({ query }: { query: string }) {
  return (
    <>
      <div className="px-3 pb-2 pt-1">
        <div className="flex items-center gap-2 rounded-full border border-cream-300 bg-cream-100 px-3 py-2">
          <span className="h-3 w-3 rounded-full border-2 border-ink-soft" />
          <span className="truncate text-[0.625rem] text-forest-950">{query}</span>
        </div>
      </div>

      <div className="flex gap-4 border-b border-cream-300 px-4 pb-1.5 text-[0.5625rem] font-medium">
        <span className="border-b-2 border-forest-950 pb-1 text-forest-950">All</span>
        <span className="text-ink-soft">Maps</span>
        <span className="text-ink-soft">Images</span>
      </div>
    </>
  );
}

function MapRoads() {
  return (
    <>
      <div className="absolute left-0 top-8 h-px w-full bg-cream-300" />
      <div className="absolute left-0 top-16 h-px w-full bg-cream-300" />
      <div className="absolute left-10 top-0 h-full w-px bg-cream-300" />
      <div className="absolute left-24 top-0 h-full w-px bg-cream-300" />
    </>
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

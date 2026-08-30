/**
 * Decorative phone mockup for Section 02.
 *
 * A Server Component built from plain DOM and design tokens — no images, no
 * canvas, no client JS. It renders identically with JavaScript disabled,
 * which is the Phase 1 requirement.
 *
 * ENTIRELY DECORATIVE. The whole tree is aria-hidden and contains no
 * focusable elements, so it never enters the tab order and screen readers
 * skip it. Every fact it depicts is already stated in the copy beside it.
 *
 * The businesses shown are invented and generic. Nothing here should read as
 * a real client's work.
 */

type ScreenState = 'found' | 'followup';

export default function PhoneMock({ screen }: { screen: ScreenState }) {
  return (
    <div aria-hidden="true" className="mx-auto w-[300px] select-none lg:w-[330px]">
      {/* Bezel */}
      <div className="relative rounded-[2.25rem] border border-forest-700 bg-forest-950 p-2.5 shadow-2xl shadow-black/20">
        {/* Notch */}
        <div className="absolute left-1/2 top-2.5 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-forest-950" />

        {/* Screen */}
        <div className="relative h-[560px] overflow-hidden rounded-[1.65rem] bg-cream-50">
          {screen === 'found' ? <ScreenFound /> : <ScreenFollowUp />}
        </div>
      </div>
    </div>
  );
}

/* ── Shared chrome ────────────────────────────────────────────────── */

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pb-1 pt-3 text-[0.5625rem] font-medium text-ink-soft">
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-ink-soft" />
        <span className="h-1.5 w-1.5 rounded-full bg-ink-soft" />
        <span className="h-1.5 w-3 rounded-sm border border-ink-soft" />
      </span>
    </div>
  );
}

/* ── State 01 — Get Found ─────────────────────────────────────────── */

/** The "before": the client sits far down the list, outside the map box. */
function ScreenFound() {
  return (
    <div className="flex h-full flex-col">
      <StatusBar />

      {/* Search bar */}
      <div className="px-3 pb-2 pt-1">
        <div className="flex items-center gap-2 rounded-full border border-cream-300 bg-cream-100 px-3 py-2">
          <span className="h-3 w-3 rounded-full border-2 border-ink-soft" />
          <span className="truncate text-[0.625rem] text-forest-950">
            drywall contractor Framingham MA
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-cream-300 px-4 pb-1.5 text-[0.5625rem] font-medium">
        <span className="border-b-2 border-forest-950 pb-1 text-forest-950">All</span>
        <span className="text-ink-soft">Maps</span>
        <span className="text-ink-soft">Images</span>
        <span className="text-ink-soft">Reviews</span>
      </div>

      {/* The map box */}
      <div className="px-3 pt-3">
        <MapStrip />

        <div className="mt-2 space-y-px overflow-hidden rounded-lg border border-cream-300">
          <MapResult rank="1" name="Bay State Drywall" rating="4.8" reviews="112" />
          <MapResult rank="2" name="Sullivan Plaster Co." rating="4.7" reviews="86" />
          <MapResult rank="3" name="Metro Finish Interiors" rating="4.6" reviews="74" />
        </div>
      </div>

      {/* Organic results, with the client far below */}
      <div className="mt-3 flex-1 space-y-2 border-t border-cream-300 px-3 pt-3">
        <GhostResult />
        <GhostResult />
        <GhostResult />

        {/* The client — greyed, position 11, well below the fold */}
        <div className="rounded-lg border border-dashed border-form-border bg-cream-100 px-2.5 py-2 opacity-60">
          <div className="flex items-center justify-between">
            <span className="text-[0.5625rem] font-medium text-ink-soft">
              Your business
            </span>
            <span className="rounded-full bg-cream-300 px-1.5 py-0.5 text-[0.5rem] font-semibold text-ink-soft">
              #11
            </span>
          </div>
          <div className="mt-1.5 h-1 w-4/5 rounded-full bg-cream-300" />
          <div className="mt-1 h-1 w-3/5 rounded-full bg-cream-300" />
        </div>
      </div>
    </div>
  );
}

/** Stylised map: a few roads and three pins. Not a real map. */
function MapStrip() {
  return (
    <div className="relative h-24 overflow-hidden rounded-lg border border-cream-300 bg-cream-100">
      {/* Roads */}
      <div className="absolute left-0 top-8 h-px w-full bg-cream-300" />
      <div className="absolute left-0 top-16 h-px w-full bg-cream-300" />
      <div className="absolute left-10 top-0 h-full w-px bg-cream-300" />
      <div className="absolute left-24 top-0 h-full w-px bg-cream-300" />
      <div className="absolute left-0 top-0 h-full w-px bg-cream-300" />

      {/* Competitor pins */}
      <Pin className="left-[22%] top-[26%]" />
      <Pin className="left-[52%] top-[54%]" />
      <Pin className="left-[74%] top-[30%]" />
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
    <div className="flex items-center gap-2 bg-cream-50 px-2.5 py-2">
      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-forest-950 text-[0.5rem] font-semibold text-cream-50">
        {rank}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[0.625rem] font-medium text-forest-950">
          {name}
        </span>
        <span className="mt-0.5 block text-[0.5rem] text-ink-soft">
          ★ {rating} · {reviews} reviews · Drywall contractor
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
      <div className="h-1 w-4/5 rounded-full bg-cream-100" />
    </div>
  );
}

/* ── State 03 — Get Followed Up ───────────────────────────────────── */

/** The "before": an unanswered call heading for voicemail. */
function ScreenFollowUp() {
  return (
    <div className="flex h-full flex-col bg-forest-950 text-cream-50">
      <div className="flex items-center justify-between px-5 pb-1 pt-3 text-[0.5625rem] font-medium text-mist">
        <span>9:41</span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-mist" />
          <span className="h-1.5 w-1.5 rounded-full bg-mist" />
          <span className="h-1.5 w-3 rounded-sm border border-mist" />
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow text-mist">Incoming call</p>
        <p className="mt-3 text-lg font-medium text-cream-50">(508) 555-0148</p>
        <p className="mt-1 text-[0.6875rem] text-mist">Framingham, MA</p>

        {/* Ringing indicator — static rings, no animation in Phase 1 */}
        <span className="mt-8 flex h-20 w-20 items-center justify-center rounded-full border border-forest-700">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-forest-700">
            <span className="h-9 w-9 rounded-full bg-forest-800" />
          </span>
        </span>

        <p className="mt-8 text-[0.625rem] text-mist">Ringing…</p>
      </div>

      {/* Missed-call tally — the row of dots the counter will fill later */}
      <div className="border-t border-forest-700 px-5 py-4">
        <p className="text-[0.5625rem] font-medium text-mist">Calls answered today</p>
        <div className="mt-2 flex gap-1.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${i < 4 ? 'bg-accent' : 'bg-forest-800'}`}
            />
          ))}
        </div>
        <p className="mt-2 text-[0.5625rem] text-mist">4 of 10</p>
      </div>
    </div>
  );
}

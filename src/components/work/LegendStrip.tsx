import { LEGEND_STRIP } from '@/data/work-page';

/** S2 — Legend strip explaining LIVE vs DEMO. Light section. */
export default function LegendStrip() {
  return (
    <section className="border-b border-cream-300 bg-cream-100 py-8" aria-label={LEGEND_STRIP.jumpAriaLabel}>
      <div className="container-page flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-forest-950">
            {`${LEGEND_STRIP.live.label}:`}
          </span>
          <p className="eyebrow text-ink-soft">{LEGEND_STRIP.live.note}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-accent-ink px-3 py-1 text-xs font-medium text-accent-ink">
            {`${LEGEND_STRIP.demo.label}:`}
          </span>
          <p className="eyebrow text-ink-soft">{LEGEND_STRIP.demo.note}</p>
        </div>
      </div>
    </section>
  );
}

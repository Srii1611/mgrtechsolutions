import Reveal from '@/components/motion/Reveal';
import { WEEK_TIMELINE } from '@/data/process';

/** S2 — The two timelines (light): the standard build in days, then the longer build week by week. Staggered Reveal, no GSAP. */
export default function WeekTimeline() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="week-timeline-heading">
      <div className="container-page">
        <h2 id="week-timeline-heading" className="sr-only">
          The timelines
        </h2>
        <Reveal>
          <article className="rounded-2xl border border-accent-ink bg-cream-100 p-8">
            <p className="eyebrow text-accent-ink">{WEEK_TIMELINE.quickTrack.eyebrow}</p>
            <p className="h3-card mt-4 font-medium text-forest-950">{WEEK_TIMELINE.quickTrack.title}</p>
            <p className="mt-3 max-w-2xl text-[1.0625rem] leading-[1.7] text-ink-soft">
              {WEEK_TIMELINE.quickTrack.body}
            </p>
          </article>
        </Reveal>
        <p className="eyebrow mt-12 text-accent-ink">{WEEK_TIMELINE.longTrack.eyebrow}</p>
        <p className="mt-3 max-w-2xl text-[1.0625rem] leading-[1.7] text-ink-soft">{WEEK_TIMELINE.longTrack.body}</p>
        <div className="mt-8 space-y-6">
          {WEEK_TIMELINE.weeks.map((week, i) => (
            <Reveal key={week.week} delay={i * 0.08}>
              <article className="rounded-2xl border border-cream-300 bg-cream-100 p-8">
                <div className="flex flex-wrap items-center gap-4">
                  <p className="eyebrow text-accent-ink">{week.week}</p>
                  <span className="rounded-full border border-cream-300 px-3 py-1 text-xs font-medium text-ink-soft">
                    {week.chip}
                  </span>
                </div>
                <p className="h3-card mt-4 font-medium text-forest-950">{week.title}</p>
                <p className="mt-3 max-w-2xl text-[1.0625rem] leading-[1.7] text-ink-soft">
                  {week.body}
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="eyebrow text-ink-soft">I DO</p>
                    <p className="mt-1 text-sm text-forest-950">{week.iDo}</p>
                  </div>
                  <div>
                    <p className="eyebrow text-ink-soft">YOU DO</p>
                    <p className="mt-1 text-sm text-forest-950">{week.youDo}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

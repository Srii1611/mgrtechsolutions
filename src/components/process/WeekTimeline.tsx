import Reveal from '@/components/motion/Reveal';
import { WEEK_TIMELINE } from '@/data/process';

/** S2 — The five weeks (light). Staggered Reveal, no GSAP. */
export default function WeekTimeline() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="week-timeline-heading">
      <div className="container-page">
        <h2 id="week-timeline-heading" className="sr-only">
          The five weeks
        </h2>
        <div className="space-y-6">
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

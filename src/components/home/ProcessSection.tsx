import Reveal from '@/components/motion/Reveal';
import { PROCESS } from '@/data/home';
import { SITE } from '@/data/site';

/**
 * SECTION 09 — Your part (dark).
 *
 * PHASE 1: static markup only. Six steps stacked vertically, no rail, no
 * tabs, no interactivity. This IS the no-JavaScript fallback and the crawler
 * view, and it has to read correctly on its own before anything is layered
 * on top of it.
 *
 * A Server Component. The previous version was `'use client'` for accordion
 * state; with nothing interactive yet, none of this needs to reach the
 * browser. Phase 2 adds a client leaf for the tablist rather than making the
 * whole section a client component again.
 */
export default function ProcessSection() {
  return (
    <section
      className="on-dark bg-forest-950 py-20 md:py-28"
      aria-labelledby="process-heading"
    >
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent">{PROCESS.eyebrow}</p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 id="process-heading" className="lede mt-6 max-w-2xl text-mist">
            {PROCESS.lede}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-forest-950 transition-transform hover:scale-[1.03]"
            >
              {PROCESS.primaryCta}
            </a>
            <a
              href="/process"
              className="inline-flex items-center gap-2 rounded-full border border-forest-700 px-6 py-3 font-medium text-cream-50 transition-colors hover:border-accent"
            >
              {PROCESS.secondaryCta}
            </a>
          </div>
        </Reveal>

        <div className="mt-14 divide-y divide-forest-700 border-y border-forest-700">
          {PROCESS.steps.map((step, i) => (
            <Step key={step.title} step={step} delay={i * 0.04} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Step({
  step,
  delay,
}: {
  step: (typeof PROCESS.steps)[number];
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <article className="py-8">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          {/* Step 6 carries no number — it is ongoing, not one of the 15 days. */}
          {step.n !== null && (
            <span
              aria-hidden="true"
              className="text-[0.8125rem] font-semibold tabular-nums text-accent"
            >
              {String(step.n).padStart(2, '0')}
            </span>
          )}

          <h3 className="h3-card font-medium text-cream-50">{step.title}</h3>

          <span className="eyebrow text-mist">{step.days}</span>

          <span className="eyebrow rounded-full border border-forest-700 px-3 py-1 text-mist">
            YOU: {step.yourTime}
          </span>
        </div>

        <p className="mt-4 max-w-2xl text-[1.0625rem] leading-[1.7] text-mist">
          {step.body}
        </p>

        <ul className="mt-5 max-w-2xl space-y-2">
          {step.bullets.map((bullet) => (
            <li
              key={bullet}
              className="border-l-2 border-forest-700 pl-4 text-[1rem] leading-[1.6] text-mist"
            >
              {bullet}
            </li>
          ))}
        </ul>

        <p className="mt-5 max-w-2xl text-[1rem] leading-[1.7] text-cream-50">
          <span className="eyebrow text-accent">You end up with: </span>
          {step.outcome}
        </p>
      </article>
    </Reveal>
  );
}

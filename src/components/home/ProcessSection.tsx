import Reveal from '@/components/motion/Reveal';
import ProcessStack from '@/components/home/ProcessStack';
import { PROCESS } from '@/data/home';
import { SITE } from '@/data/site';

/**
 * SECTION 09 — Your part (dark).
 *
 * A Server Component. The heading, lede and CTAs render on the server; the
 * interactive rail is a client leaf below. Keeping the boundary here means
 * the section's copy never depends on hydration.
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

        {/* The stack owns the six step cards. It is a client component, but
            client components are still server-rendered, so the full copy of
            every step ships in the initial HTML. */}
        <ProcessStack steps={PROCESS.steps} />

      </div>
    </section>
  );
}

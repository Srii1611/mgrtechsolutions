import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import { PROCESS_HERO } from '@/data/process';

/** S1 — Process hero (dark). */
export default function ProcessHero() {
  return (
    <section className="dot-grid on-dark bg-forest-950 pb-16 pt-24">
      <div className="container-page">
        <nav aria-label="Breadcrumb" className="eyebrow text-mist">
          <Link href="/" className="transition-colors hover:text-accent">
            HOME
          </Link>
          <span className="mx-2 text-forest-700" aria-hidden="true">
            /
          </span>
          <span className="text-accent">{PROCESS_HERO.breadcrumb}</span>
        </nav>

        <p className="eyebrow mt-8 text-accent">{PROCESS_HERO.eyebrow}</p>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div>
            <h1 className="h1-page font-medium text-cream-50">
              {PROCESS_HERO.headline}
              <span className="mt-1 block text-accent">{PROCESS_HERO.headlineAccent}</span>
            </h1>

            <p className="lede mt-8 max-w-xl text-mist">{PROCESS_HERO.lede}</p>
          </div>

          <Reveal delay={0.1}>
            <div className="mx-auto flex max-w-sm items-center justify-center gap-4 rounded-2xl border border-forest-700 p-8 text-center">
              <div>
                <p className="eyebrow text-cream-50">{PROCESS_HERO.countdown.line1}</p>
              </div>
              <p className="text-2xl text-accent" aria-hidden="true">
                {PROCESS_HERO.countdown.arrow}
              </p>
              <div>
                <p className="eyebrow text-cream-50">{PROCESS_HERO.countdown.line2}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-baseline gap-3">
            <span className="text-5xl font-medium text-accent">
              {PROCESS_HERO.countdown.weeksCount}
            </span>
            <span className="eyebrow text-mist">{PROCESS_HERO.countdown.weeksLabel}</span>
            <span className="eyebrow ml-4 text-mist">{PROCESS_HERO.countdown.caption}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

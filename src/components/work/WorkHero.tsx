import Link from 'next/link';
import { WORK_HERO } from '@/data/work-page';

/** S1 — Work hero (dark). */
export default function WorkHero() {
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
          <span className="text-accent">{WORK_HERO.breadcrumb}</span>
        </nav>

        <p className="eyebrow mt-8 text-accent">{WORK_HERO.eyebrow}</p>

        <h1 className="h1-page mt-4 max-w-4xl font-medium text-cream-50">
          {WORK_HERO.headline}
          <span className="mt-1 block text-accent">{WORK_HERO.headlineAccent}</span>
        </h1>

        <p className="lede mt-8 max-w-xl text-mist">{WORK_HERO.lede}</p>

        <p className="eyebrow mt-8 border-t border-forest-700 pt-6 text-mist">
          {WORK_HERO.ticker}
        </p>
      </div>
    </section>
  );
}

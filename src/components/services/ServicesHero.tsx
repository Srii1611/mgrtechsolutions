import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import { SERVICES_HERO } from '@/data/services';

/** S1 — Services hero (dark). Node diagram rebuilt with currentColor only. */
export default function ServicesHero() {
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
          <span className="text-accent">{SERVICES_HERO.breadcrumb}</span>
        </nav>

        <p className="eyebrow mt-8 text-accent">{SERVICES_HERO.eyebrow}</p>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div>
            <h1 className="h1-page font-medium text-cream-50">
              {SERVICES_HERO.headline}
              <span className="mt-1 block text-accent">{SERVICES_HERO.headlineAccent}</span>
            </h1>

            <p className="lede mt-8 max-w-xl text-mist">{SERVICES_HERO.lede}</p>
          </div>

          <Reveal delay={0.1}>
            <svg
              viewBox="0 0 320 220"
              className="mx-auto h-auto w-full max-w-sm text-accent"
              role="img"
              aria-label="Three connected parts of the system: website, content, and automation, all feeding one phone."
            >
              <circle cx="160" cy="30" r="8" fill="currentColor" />
              <circle cx="60" cy="150" r="8" fill="currentColor" className="text-mist" />
              <circle cx="160" cy="190" r="8" fill="currentColor" className="text-mist" />
              <circle cx="260" cy="150" r="8" fill="currentColor" className="text-mist" />
              <line x1="160" y1="30" x2="60" y2="150" stroke="currentColor" strokeWidth="1.5" className="text-forest-700" />
              <line x1="160" y1="30" x2="160" y2="190" stroke="currentColor" strokeWidth="1.5" className="text-forest-700" />
              <line x1="160" y1="30" x2="260" y2="150" stroke="currentColor" strokeWidth="1.5" className="text-forest-700" />
            </svg>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

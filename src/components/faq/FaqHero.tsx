import Link from 'next/link';
import { FAQ_HERO } from '@/data/faq';
import { SITE } from '@/data/site';

/** S1 — FAQ hero (dark). */
export default function FaqHero() {
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
          <span className="text-accent">{FAQ_HERO.breadcrumb}</span>
        </nav>

        <p className="eyebrow mt-8 text-accent">{FAQ_HERO.eyebrow}</p>

        <h1 className="h1-page mt-4 max-w-4xl font-medium text-cream-50">
          {FAQ_HERO.headline}
          <span className="mt-1 block text-accent">{FAQ_HERO.headlineAccent}</span>
        </h1>

        <p className="lede mt-8 max-w-xl text-mist">
          {FAQ_HERO.lede}{' '}
          <a href={SITE.phoneHref} className="font-medium text-accent hover:underline">
            {SITE.phone}
          </a>
        </p>
      </div>
    </section>
  );
}

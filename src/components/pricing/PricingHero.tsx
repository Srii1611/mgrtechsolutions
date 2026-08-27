import Link from 'next/link';
import { PRICING_HERO } from '@/data/pricing-page';

/** S1 — Pricing hero (dark). */
export default function PricingHero() {
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
          <span className="text-accent">{PRICING_HERO.breadcrumb}</span>
        </nav>

        <p className="eyebrow mt-8 text-accent">{PRICING_HERO.eyebrow}</p>

        <h1 className="h1-page mt-4 max-w-4xl font-medium text-cream-50">
          {PRICING_HERO.headline}
          <span className="mt-1 block text-accent">{PRICING_HERO.headlineAccent}</span>
        </h1>

        <p className="lede mt-8 max-w-xl text-mist">{PRICING_HERO.lede}</p>

        <p className="eyebrow mt-8 border-t border-forest-700 pt-6 text-mist">
          {PRICING_HERO.ticker}
        </p>
      </div>
    </section>
  );
}

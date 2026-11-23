import Link from 'next/link';
import { Check } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { PRICING } from '@/data/home';
import { SITE } from '@/data/site';
import { estimatorHref, priceParts, tierOf } from '@/data/prices';

/** SECTION 11: Pricing preview (dark). Prices are read from src/data/prices.ts. */
export default function PricingPreview() {
  return (
    <section
      id="pricing"
      className="on-dark scroll-mt-24 bg-forest-950 py-20 md:py-28"
      aria-labelledby="pricing-heading"
    >
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent">{PRICING.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="pricing-heading" className="lede mt-6 max-w-2xl text-mist">
            {PRICING.lede}
          </h2>
        </Reveal>

        {/* The evidence for publishing prices at all, kept beside the prices. */}
        <Reveal delay={0.12}>
          <p className="mt-8 max-w-2xl border-l-2 border-accent pl-5 text-[1.0625rem] leading-[1.7] text-mist">
            {PRICING.proof}
          </p>
          <p className="mt-3 max-w-2xl pl-5 text-[0.75rem] leading-relaxed text-cream-100/70">
            <span className="font-semibold text-accent">Source: </span>
            {PRICING.proofSource}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PRICING.plans.map((plan, i) => {
            const tier = tierOf('website', plan.id);
            const { lead, main, sub } = priceParts(tier);
            return (
              <Reveal key={plan.id} delay={i * 0.08}>
                <article
                  className={
                    tier.featured
                      ? 'flex h-full flex-col rounded-2xl border-2 border-accent bg-forest-900 p-8 md:-translate-y-4'
                      : 'flex h-full flex-col rounded-2xl border border-forest-700 bg-forest-900 p-8'
                  }
                >
                  <p className="eyebrow text-mist">{tier.name.toUpperCase()}</p>
                  <p className="h2-section mt-4 font-medium text-cream-50">
                    {lead ? <span className="eyebrow mr-2 align-middle text-mist">{lead}</span> : null}
                    {main}
                  </p>
                  <p className="eyebrow mt-1 text-mist">{sub}</p>
                  <p className="mt-3 text-[1.0625rem] leading-[1.7] text-mist">{plan.tagline}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-mist">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={estimatorHref('website', tier.id)}
                    className="mt-6 text-sm text-accent underline underline-offset-4 hover:brightness-110"
                  >
                    Plan this in the estimator <span aria-hidden="true">&rarr;</span>
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href="/pricing#estimator"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-forest-950 transition-transform hover:scale-[1.03]"
            >
              {PRICING.cta}
            </Link>
            <a href={SITE.phoneHref} className="text-mist underline underline-offset-4 hover:text-accent">
              Or call {SITE.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

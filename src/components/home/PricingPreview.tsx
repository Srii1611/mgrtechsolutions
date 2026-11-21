import { Check } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { PRICING } from '@/data/home';

/** SECTION 11 — Pricing preview (dark). Build tiers mirror /pricing/website-cost. */
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
          {PRICING.plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08}>
              <article
                className={
                  plan.featured
                    ? 'flex h-full flex-col rounded-2xl border-2 border-accent bg-forest-900 p-8 md:-translate-y-4'
                    : 'flex h-full flex-col rounded-2xl border border-forest-700 bg-forest-900 p-8'
                }
              >
                <div className="flex flex-wrap items-center gap-3">
                  <p className="eyebrow text-mist">{plan.name}</p>
                  {plan.badge && (
                    <span className="eyebrow rounded-full bg-accent px-3 py-1 text-[0.625rem] text-forest-950">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <p className="h2-section mt-4 font-medium text-cream-50">{plan.price}</p>
                <p className="eyebrow mt-2 text-sand">{plan.priceNote}</p>
                <p className="mt-4 text-[1.0625rem] leading-[1.7] text-mist">{plan.tagline}</p>
                {plan.inheritsFrom && (
                  <p className="mt-6 text-sm font-medium text-cream-50">{plan.inheritsFrom}</p>
                )}
                <ul className={`${plan.inheritsFrom ? 'mt-3' : 'mt-6'} flex-1 space-y-3`}>
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-mist">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <ul
            aria-label="Included in every build"
            className="mt-14 flex flex-wrap gap-x-3 gap-y-2 border-t border-forest-700 pt-8"
          >
            {PRICING.standards.map((item, i) => (
              <li key={item} className="eyebrow flex items-center gap-3 text-cream-50">
                {i > 0 && (
                  <span aria-hidden="true" className="text-accent">
                    ·
                  </span>
                )}
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-6 max-w-3xl space-y-2">
            {PRICING.notes.map((note) => (
              <p key={note} className="text-[0.9375rem] leading-[1.7] text-mist">
                {note}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { Check } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { COST_TIERS } from '@/data/website-cost-guide';

/**
 * S1b — one detail block per tier, checklist style, directly under the
 * hero price strip. Each block carries the anchor id the strip links to.
 *
 * The Growth Plan note renders once, after all three, because the retainer
 * is separate from every build tier. There is no Growth Plan page yet, so
 * it is plain text rather than a link to a route that would 404.
 */
export default function CostTiers() {
  return (
    <section
      id={COST_TIERS.id}
      className="scroll-mt-24 py-16 md:py-24"
      aria-labelledby="tiers-heading"
    >
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent-ink">{COST_TIERS.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="tiers-heading" className="h2-section mt-4 max-w-3xl font-medium text-forest-950">
            {COST_TIERS.heading}
          </h2>
        </Reveal>

        <div className="mt-12 space-y-12 md:space-y-16">
          {COST_TIERS.tiers.map((tier) => (
            <Reveal key={tier.id}>
              <article
                id={tier.id}
                className="scroll-mt-28 border-t border-cream-300 pt-10"
                aria-labelledby={`${tier.id}-heading`}
              >
                <div className="grid gap-8 md:grid-cols-[0.7fr,1.3fr] md:gap-12">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="eyebrow text-accent-ink">{tier.label}</p>
                      {tier.badge && (
                        <span className="eyebrow rounded-full bg-accent-ink px-3 py-1 text-cream-50">
                          {tier.badge}
                        </span>
                      )}
                    </div>
                    <h3
                      id={`${tier.id}-heading`}
                      className="h3-card mt-3 font-medium text-forest-950"
                    >
                      {tier.name}
                    </h3>
                    <p className="mt-4 text-3xl font-medium text-forest-950">{tier.price}</p>
                    <p className="eyebrow mt-2 text-ink-soft">{tier.priceNote}</p>
                    <p className="mt-5 text-[1.0625rem] leading-[1.6] text-ink-soft">
                      {tier.pitch}
                    </p>
                  </div>

                  <div>
                    {tier.inheritsFrom && (
                      <p className="text-[1.0625rem] font-medium text-forest-950">
                        {tier.inheritsFrom}
                      </p>
                    )}
                    <ul className={tier.inheritsFrom ? 'mt-4 space-y-3' : 'space-y-3'}>
                      {tier.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-[1.0625rem] leading-[1.6] text-forest-950"
                        >
                          <Check
                            className="mt-1 h-4 w-4 shrink-0 text-accent-ink"
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="eyebrow mt-8 text-ink-soft">{tier.goodFor}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-14 max-w-3xl rounded-2xl border border-cream-300 bg-cream-100 p-6 text-[1.0625rem] leading-[1.7] text-ink-soft md:p-8">
            {COST_TIERS.growthPlanNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

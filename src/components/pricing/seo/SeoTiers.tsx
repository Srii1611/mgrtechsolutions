import { Check } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import PricingSection from '@/components/pricing/PricingSection';
import { SEO_TIERS } from '@/data/seo-packages';

/**
 * S4 — The two tiers in full. Premium carries four checklist groups
 * (Google Ads jumpstart/monthly, Meta jumpstart/monthly), so each tier
 * renders its groups stacked rather than forcing them into one long list.
 */
export default function SeoTiers() {
  return (
    <PricingSection
      id={SEO_TIERS.id}
      eyebrow={SEO_TIERS.eyebrow}
      heading={SEO_TIERS.heading}
      tone="raised"
    >
      <div className="space-y-12 md:space-y-16">
        {SEO_TIERS.tiers.map((tier) => (
          <Reveal key={tier.id}>
            <article
              id={tier.id}
              className="scroll-mt-28 border-t border-cream-300 pt-10"
              aria-labelledby={`${tier.id}-heading`}
            >
              <div className="grid gap-8 md:grid-cols-[0.7fr,1.3fr] md:gap-12">
                <div className="md:sticky md:top-28 md:self-start">
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
                  <p className="mt-5 text-[1.0625rem] leading-[1.6] text-ink-soft">{tier.pitch}</p>
                </div>

                <div className="space-y-8">
                  {tier.groups.map((group) => (
                    <div key={group.heading}>
                      <h4 className="eyebrow text-accent-ink">{group.heading}</h4>
                      {group.intro && (
                        <p className="mt-3 text-[1.0625rem] leading-[1.6] text-ink-soft">
                          {group.intro}
                        </p>
                      )}
                      <ul className="mt-4 space-y-3">
                        {group.items.map((item) => (
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
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </PricingSection>
  );
}

import Reveal from '@/components/motion/Reveal';
import { Wallet } from 'lucide-react';
import PricingSection from '@/components/pricing/PricingSection';
import SeoTiers from './SeoTiers';
import { SEO_AD_SPEND, SEO_APPROACH, SEO_OPENING } from '@/data/seo-packages';

/** S2–S5 — prose sections, the tier lists, and the ad-spend callout. */
export default function SeoBody() {
  return (
    <>
      <PricingSection id={SEO_OPENING.id} heading={SEO_OPENING.heading}>
        <div className="max-w-3xl space-y-5">
          {SEO_OPENING.paragraphs.map((para) => (
            <Reveal key={para}>
              <p className="lede text-ink-soft">{para}</p>
            </Reveal>
          ))}
        </div>
      </PricingSection>

      <PricingSection id={SEO_APPROACH.id} heading={SEO_APPROACH.heading} tone="raised">
        <div className="max-w-3xl space-y-6">
          {SEO_APPROACH.paragraphs.map((para) => (
            <Reveal key={para}>
              <p className="lede text-ink-soft">{para}</p>
            </Reveal>
          ))}

          <Reveal delay={0.05}>
            <p className="border-l-2 border-accent-ink py-1 pl-6 text-[1.25rem] font-medium leading-[1.5] text-forest-950">
              {SEO_APPROACH.pull}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-[1.0625rem] leading-[1.7] text-ink-soft">{SEO_APPROACH.closing}</p>
          </Reveal>
        </div>
      </PricingSection>

      <SeoTiers />

      {/*
        Ad spend gets a bordered card on a dark ground rather than another
        prose block — the brief calls it the section most likely to be
        skipped if it looks like ordinary body text.
      */}
      <section
        id={SEO_AD_SPEND.id}
        className="scroll-mt-24 py-16 md:py-24"
        aria-labelledby="ad-spend-heading"
      >
        <div className="container-page">
          <Reveal>
            <div className="on-dark overflow-hidden rounded-2xl border-2 border-accent-ink bg-forest-950 p-8 md:p-12">
              <div className="flex items-center gap-3">
                <Wallet className="h-5 w-5 text-accent" strokeWidth={2} aria-hidden="true" />
                <h2 id="ad-spend-heading" className="h2-section font-medium text-cream-50">
                  {SEO_AD_SPEND.heading}
                </h2>
              </div>

              <p className="lede mt-6 max-w-2xl text-mist">{SEO_AD_SPEND.intro}</p>

              <ul className="mt-8 grid gap-4 md:grid-cols-3">
                {SEO_AD_SPEND.points.map((point) => (
                  <li
                    key={point.lead}
                    className="rounded-xl border border-forest-700 bg-forest-900 p-5 text-[0.9375rem] leading-[1.7]"
                  >
                    <span className="font-semibold text-cream-50">{point.lead}</span>{' '}
                    <span className="text-mist">{point.body}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 max-w-3xl border-t border-forest-700 pt-6 text-[0.9375rem] leading-[1.7] text-mist">
                {SEO_AD_SPEND.outro}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

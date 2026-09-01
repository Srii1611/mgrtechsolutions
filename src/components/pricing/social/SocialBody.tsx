import Link from 'next/link';
import { ArrowRight, Check, Minus } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import PricingSection from '@/components/pricing/PricingSection';
import {
  SOCIAL_APPROACH,
  SOCIAL_COMPARE,
  SOCIAL_NOT_INCLUDED,
  SOCIAL_TIERS,
} from '@/data/social-packages';

/** S2–S5 — approach, the comparison matrix, the tier lists, exclusions. */
export default function SocialBody() {
  return (
    <>
      <PricingSection id={SOCIAL_APPROACH.id} heading={SOCIAL_APPROACH.heading}>
        <div className="max-w-3xl space-y-6">
          {SOCIAL_APPROACH.paragraphs.map((para) => (
            <Reveal key={para}>
              <p className="lede text-ink-soft">{para}</p>
            </Reveal>
          ))}

          <Reveal delay={0.05}>
            <p className="border-l-2 border-accent-ink py-1 pl-6 text-[1.25rem] font-medium leading-[1.5] text-forest-950">
              {SOCIAL_APPROACH.pull}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-[1.0625rem] leading-[1.7] text-ink-soft">
              {SOCIAL_APPROACH.closing}
            </p>
          </Reveal>
        </div>
      </PricingSection>

      {/* Comparison matrix — table on md+, one card per tier below. */}
      <PricingSection
        id={SOCIAL_COMPARE.id}
        eyebrow={SOCIAL_COMPARE.eyebrow}
        heading={SOCIAL_COMPARE.heading}
        tone="raised"
      >
        <Reveal>
          <div className="hidden overflow-x-auto rounded-xl border border-cream-300 md:block">
            <table className="w-full border-collapse text-left text-[0.95rem] text-ink-soft">
              <caption className="sr-only">{SOCIAL_COMPARE.heading}</caption>
              <thead>
                <tr>
                  <th scope="col" className="border-b border-cream-300 bg-cream-50 px-4 py-3">
                    <span className="sr-only">Deliverable</span>
                  </th>
                  {SOCIAL_COMPARE.columns.map((col) => (
                    <th
                      key={col}
                      scope="col"
                      className="border-b border-cream-300 bg-cream-50 px-4 py-3 font-medium text-forest-950"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SOCIAL_COMPARE.rows.map((row) => (
                  <tr key={row.label}>
                    <th
                      scope="row"
                      className="border-b border-cream-300 px-4 py-3 text-left align-top font-medium text-forest-950"
                    >
                      {row.label}
                    </th>
                    {row.values.map((value, i) => (
                      <td
                        key={SOCIAL_COMPARE.columns[i]}
                        className="border-b border-cream-300 px-4 py-3 align-top"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <div className="space-y-4 md:hidden">
          {SOCIAL_COMPARE.columns.map((col, colIndex) => (
            <Reveal key={col} delay={colIndex * 0.05}>
              <div className="rounded-xl border border-cream-300 bg-cream-50 p-5">
                <p className="h3-card font-medium text-forest-950">{col}</p>
                <dl className="mt-4 space-y-3">
                  {SOCIAL_COMPARE.rows.map((row) => (
                    <div key={row.label} className="flex items-baseline justify-between gap-4">
                      <dt className="eyebrow text-ink-soft">{row.label}</dt>
                      <dd className="shrink-0 text-[0.9375rem] font-medium text-forest-950">
                        {row.values[colIndex]}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      </PricingSection>

      <PricingSection
        id={SOCIAL_TIERS.id}
        eyebrow={SOCIAL_TIERS.eyebrow}
        heading={SOCIAL_TIERS.heading}
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {SOCIAL_TIERS.tiers.map((tier, i) => (
            <Reveal key={tier.id} delay={i * 0.08}>
              <article
                id={tier.id}
                className={
                  tier.featured
                    ? 'relative flex h-full scroll-mt-28 flex-col rounded-2xl border-2 border-accent-ink bg-cream-100 p-8 lg:-translate-y-4 lg:shadow-lg'
                    : 'flex h-full scroll-mt-28 flex-col rounded-2xl border border-cream-300 bg-cream-100 p-8'
                }
                aria-labelledby={`${tier.id}-heading`}
              >
                {tier.badge && (
                  <span className="eyebrow absolute -top-3 left-8 rounded-full bg-accent-ink px-3 py-1 text-cream-50">
                    {tier.badge}
                  </span>
                )}
                <p className="eyebrow text-accent-ink">{tier.label}</p>
                <h3
                  id={`${tier.id}-heading`}
                  className="h3-card mt-3 font-medium text-forest-950"
                >
                  {tier.name}
                </h3>
                <p className="mt-4 text-3xl font-medium text-forest-950">{tier.price}</p>
                <p className="eyebrow mt-2 text-ink-soft">{tier.priceNote}</p>
                <p className="mt-5 text-[1.0625rem] leading-[1.6] text-ink-soft">{tier.pitch}</p>

                <ul className="mt-6 flex-1 space-y-3">
                  {tier.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[0.9375rem] leading-[1.6] text-forest-950"
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
              </article>
            </Reveal>
          ))}
        </div>
      </PricingSection>

      <PricingSection
        id={SOCIAL_NOT_INCLUDED.id}
        heading={SOCIAL_NOT_INCLUDED.heading}
        tone="raised"
      >
        <div className="max-w-3xl">
          <Reveal>
            <p className="lede text-ink-soft">{SOCIAL_NOT_INCLUDED.intro}</p>
          </Reveal>

          <ul className="mt-8 space-y-3">
            {SOCIAL_NOT_INCLUDED.items.map((item, i) => (
              <Reveal key={item} delay={i * 0.04}>
                <li className="flex items-start gap-3 rounded-xl border border-cream-300 bg-cream-50 p-5 text-[1.0625rem] leading-[1.6] text-ink-soft">
                  <Minus
                    className="mt-1 h-4 w-4 shrink-0 text-ink-soft"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.1}>
            <p className="mt-8 text-[1.0625rem] leading-[1.7] text-ink-soft">
              {SOCIAL_NOT_INCLUDED.outro}{' '}
              <Link
                href={SOCIAL_NOT_INCLUDED.linkHref}
                className="inline-flex items-center gap-1 font-medium text-accent-ink underline underline-offset-4"
              >
                {SOCIAL_NOT_INCLUDED.linkLabel}
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </Link>
            </p>
          </Reveal>
        </div>
      </PricingSection>
    </>
  );
}

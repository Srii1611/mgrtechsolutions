import Reveal from '@/components/motion/Reveal';
import { AlertTriangle, Check } from 'lucide-react';
import PricingSection from '@/components/pricing/PricingSection';
import CostComparison from './CostComparison';
import {
  COST_DRIVERS,
  COST_EXTRAS,
  COST_INVESTMENT,
  COST_OPENING,
  COST_PAYMENT,
  COST_SCENARIOS,
} from '@/data/website-cost-guide';

/** A lead-in phrase followed by its explanation, as one block. */
function LeadItem({ lead, body }: { lead: string; body: string }) {
  return (
    <>
      <span className="font-semibold text-forest-950">{lead}</span>{' '}
      <span className="text-ink-soft">{body}</span>
    </>
  );
}

/**
 * S2–S8 — the guide's prose sections, in order. Server component: none of
 * this needs state, only the FAQ accordion below does.
 */
export default function CostBody() {
  return (
    <>
      <PricingSection id={COST_OPENING.id} heading={COST_OPENING.heading} tone="raised">
        <div className="max-w-3xl space-y-5">
          {COST_OPENING.paragraphs.map((para, i) => (
            <Reveal key={para} delay={i * 0.05}>
              <p className="lede text-ink-soft">{para}</p>
            </Reveal>
          ))}
        </div>
      </PricingSection>

      <PricingSection id={COST_DRIVERS.id} heading={COST_DRIVERS.heading}>
        <ul className="grid max-w-5xl gap-6 md:grid-cols-2">
          {COST_DRIVERS.items.map((item, i) => (
            <Reveal key={item.lead} delay={i * 0.05}>
              <li className="h-full rounded-2xl border border-cream-300 bg-cream-50 p-6 text-[1.0625rem] leading-[1.7] md:p-7">
                <LeadItem lead={item.lead} body={item.body} />
              </li>
            </Reveal>
          ))}
        </ul>
      </PricingSection>

      <PricingSection id={COST_EXTRAS.id} heading={COST_EXTRAS.heading} tone="raised">
        <div className="max-w-3xl">
          <Reveal>
            <p className="lede text-ink-soft">{COST_EXTRAS.intro}</p>
          </Reveal>

          <ul className="mt-8 space-y-4">
            {COST_EXTRAS.items.map((item, i) => (
              <Reveal key={item.lead} delay={i * 0.04}>
                <li className="flex items-start gap-3 text-[1.0625rem] leading-[1.7]">
                  <Check
                    className="mt-1.5 h-4 w-4 shrink-0 text-accent-ink"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <span>
                    <LeadItem lead={item.lead} body={`— ${item.body}`} />
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.1}>
            <p className="mt-10 rounded-2xl border border-cream-300 bg-cream-50 p-6 text-[1.0625rem] leading-[1.7] text-ink-soft md:p-8">
              {COST_EXTRAS.outro}
            </p>
          </Reveal>
        </div>
      </PricingSection>

      <PricingSection id={COST_PAYMENT.id} heading={COST_PAYMENT.heading}>
        <div className="max-w-3xl">
          <Reveal>
            <p className="lede text-ink-soft">{COST_PAYMENT.intro}</p>
          </Reveal>

          <Reveal delay={0.05}>
            <h3 className="h3-card mt-10 font-medium text-forest-950">
              {COST_PAYMENT.flagsHeading}
            </h3>
          </Reveal>

          <ul className="mt-6 space-y-4">
            {COST_PAYMENT.flags.map((flag, i) => (
              <Reveal key={flag} delay={i * 0.04}>
                <li className="flex items-start gap-3 rounded-xl border border-cream-300 bg-cream-50 p-5 text-[1.0625rem] leading-[1.7] text-ink-soft">
                  <AlertTriangle
                    className="mt-1 h-4 w-4 shrink-0 text-accent-ink"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  {flag}
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.1}>
            <p className="mt-8 text-[1.0625rem] leading-[1.7] text-ink-soft">
              {COST_PAYMENT.outro}
            </p>
          </Reveal>
        </div>
      </PricingSection>

      <CostComparison />

      <PricingSection id={COST_SCENARIOS.id} heading={COST_SCENARIOS.heading}>
        <div className="grid max-w-5xl gap-6 md:grid-cols-3">
          {COST_SCENARIOS.items.map((item, i) => (
            <Reveal key={item.lead} delay={i * 0.06}>
              <article className="h-full rounded-2xl border border-cream-300 bg-cream-50 p-6 md:p-7">
                <h3 className="h3-card font-medium text-forest-950">{item.lead}</h3>
                <p className="mt-4 text-[1.0625rem] leading-[1.7] text-ink-soft">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </PricingSection>

      <PricingSection id={COST_INVESTMENT.id} heading={COST_INVESTMENT.heading} tone="raised">
        <div className="max-w-3xl space-y-5">
          {COST_INVESTMENT.paragraphs.map((para, i) => (
            <Reveal key={para} delay={i * 0.05}>
              <p className="lede text-ink-soft">{para}</p>
            </Reveal>
          ))}
        </div>
      </PricingSection>
    </>
  );
}

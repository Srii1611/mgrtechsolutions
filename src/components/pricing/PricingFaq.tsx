'use client';

import { useState } from 'react';
import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import { PRICING_FAQ } from '@/data/pricing-page';

/** S5 — Pricing FAQ: sticky intro column + 5-question accordion (light, client for state). */
export default function PricingFaq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-20 md:py-28" aria-labelledby="pricing-faq-heading">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr,1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow text-accent-ink">{PRICING_FAQ.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="pricing-faq-heading" className="h2-section mt-4 font-medium text-forest-950">
              {PRICING_FAQ.headline}
              <span className="mt-1 block text-accent-ink">{PRICING_FAQ.headlineAccent}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede mt-6 max-w-sm text-ink-soft">{PRICING_FAQ.intro}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              href={PRICING_FAQ.linkHref}
              className="mt-6 inline-block font-medium text-accent-ink underline underline-offset-4"
            >
              {PRICING_FAQ.linkLabel}
            </Link>
          </Reveal>
        </div>

        <div className="divide-y divide-cream-300 border-y border-cream-300">
          {PRICING_FAQ.faqs.map((item, i) => {
            const isOpen = open === i;
            const panelId = `pricing-faq-panel-${i}`;
            const triggerId = `pricing-faq-trigger-${i}`;
            return (
              <Reveal key={item.q} delay={i * 0.05}>
                <div>
                  <h3>
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex w-full items-center justify-between gap-4 py-6 text-left"
                    >
                      <span className="text-[1.0625rem] font-medium text-forest-950">{item.q}</span>
                      <span
                        aria-hidden="true"
                        className={`text-2xl leading-none text-ink-soft transition-transform duration-[250ms] ${
                          isOpen ? 'rotate-45' : ''
                        }`}
                      >
                        +
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className="grid transition-[grid-template-rows,opacity,visibility] duration-[250ms] ease-out"
                    style={{
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      opacity: isOpen ? 1 : 0,
                      visibility: isOpen ? 'visible' : 'hidden',
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-ink-soft">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import Reveal from '@/components/motion/Reveal';
import { COST_FAQ } from '@/data/website-cost-guide';

/**
 * S9 — Cost guide FAQ. Same accordion mechanics as PricingFaq and the FAQ
 * page; client only for the open-panel state.
 */
export default function CostFaq() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id={COST_FAQ.id}
      className="scroll-mt-24 py-16 md:py-24"
      aria-labelledby="cost-faq-heading"
    >
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent-ink">{COST_FAQ.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="cost-faq-heading" className="h2-section mt-4 max-w-3xl font-medium text-forest-950">
            {COST_FAQ.heading}
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-cream-300 border-y border-cream-300">
          {COST_FAQ.faqs.map((item, i) => {
            const isOpen = open === i;
            const panelId = `cost-faq-panel-${i}`;
            const triggerId = `cost-faq-trigger-${i}`;
            return (
              <Reveal key={item.q} delay={i * 0.04}>
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
                      <p className="max-w-3xl pb-6 text-[1.0625rem] leading-[1.7] text-ink-soft">
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

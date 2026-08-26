'use client';

import { useState } from 'react';
import Reveal from '@/components/motion/Reveal';
import { FAQ_TEASER } from '@/data/home';

/** SECTION 12 — FAQ teaser (light, client for accordion state). */
export default function FaqTeaser() {
  const [open, setOpen] = useState(-1);

  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent-ink">{FAQ_TEASER.eyebrow}</p>
        </Reveal>

        <div className="mt-14 divide-y divide-cream-300 border-y border-cream-300">
          {FAQ_TEASER.items.map((item, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const triggerId = `faq-trigger-${i}`;
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
                      <span className="h3-card font-medium text-forest-950">{item.q}</span>
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
                    className="grid transition-[grid-template-rows,opacity] duration-[250ms] ease-out"
                    style={{
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 text-[1.0625rem] leading-[1.7] text-ink-soft">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <a
            href="/faq"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent-ink px-6 py-3 font-medium text-cream-50 transition-transform hover:scale-[1.03]"
          >
            {FAQ_TEASER.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

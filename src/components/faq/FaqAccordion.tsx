'use client';

import { useState } from 'react';
import Reveal from '@/components/motion/Reveal';
import { FAQ_GROUPS } from '@/data/faq';

/** S2/S3 — Jump strip + grouped accordion (light). Client for accordion state. */
export default function FaqAccordion() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <>
      <nav aria-label="Jump to a question group" className="border-b border-cream-300 bg-cream-100 py-6">
        <div className="container-page flex flex-wrap gap-3">
          {FAQ_GROUPS.map((group) => (
            <a
              key={group.id}
              href={`#${group.id}`}
              className="eyebrow rounded-full border border-cream-300 px-4 py-2 text-ink-soft transition-colors hover:border-accent-ink hover:text-accent-ink"
            >
              {group.label}
            </a>
          ))}
        </div>
      </nav>

      {FAQ_GROUPS.map((group) => (
        <section
          key={group.id}
          id={group.id}
          className="scroll-mt-24 border-b border-cream-300 py-16 md:py-20"
          aria-labelledby={`${group.id}-heading`}
        >
          <div className="container-page">
            <Reveal>
              <h2 id={`${group.id}-heading`} className="h2-section font-medium text-forest-950">
                {group.title}
              </h2>
            </Reveal>

            <div className="mt-8 divide-y divide-cream-300 border-y border-cream-300">
              {group.items.map((item, i) => {
                const key = `${group.id}-${i}`;
                const isOpen = openKey === key;
                const panelId = `${key}-panel`;
                const triggerId = `${key}-trigger`;
                return (
                  <div key={key}>
                    <h3>
                      <button
                        id={triggerId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenKey(isOpen ? null : key)}
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
                      className="grid transition-[grid-template-rows,opacity,visibility] duration-[250ms] ease-out"
                      style={{
                        gridTemplateRows: isOpen ? '1fr' : '0fr',
                        opacity: isOpen ? 1 : 0,
                        visibility: isOpen ? 'visible' : 'hidden',
                      }}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-6 max-w-3xl text-[1.0625rem] leading-[1.7] text-ink-soft">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

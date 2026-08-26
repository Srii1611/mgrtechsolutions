'use client';

import { useState } from 'react';
import Reveal from '@/components/motion/Reveal';
import { PROCESS } from '@/data/home';
import { SITE } from '@/data/site';

/** SECTION 09 — Process (dark, client for accordion state). */
export default function ProcessSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="on-dark bg-forest-950 py-20 md:py-28" aria-labelledby="process-heading">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent">{PROCESS.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="process-heading" className="lede mt-6 max-w-2xl text-mist">
            {PROCESS.lede}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-forest-950 transition-transform hover:scale-[1.03]"
            >
              {PROCESS.primaryCta}
            </a>
            <a
              href="/process"
              className="inline-flex items-center gap-2 rounded-full border border-forest-700 px-6 py-3 font-medium text-cream-50 transition-colors hover:border-accent"
            >
              {PROCESS.secondaryCta}
            </a>
          </div>
        </Reveal>

        <div className="mt-14 divide-y divide-forest-700 border-y border-forest-700">
          {PROCESS.phases.map((phase, i) => {
            const isOpen = open === i;
            const panelId = `process-panel-${i}`;
            const triggerId = `process-trigger-${i}`;
            return (
              <Reveal key={phase.week} delay={i * 0.05}>
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
                      <span className="flex flex-wrap items-center gap-4">
                        <span className="eyebrow text-cream-50">{phase.week}</span>
                        <span
                          className={
                            i === 0
                              ? 'rounded-full bg-accent px-3 py-1 text-xs font-medium text-forest-950'
                              : 'rounded-full border border-mist px-3 py-1 text-xs font-medium text-mist'
                          }
                        >
                          {phase.chip}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`text-2xl leading-none text-mist transition-transform duration-[250ms] ${
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
                      <p className="pb-6 text-[1.0625rem] leading-[1.7] text-mist">{phase.body}</p>
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

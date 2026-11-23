'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { Wrench, Car, Store, MapPin, Check, Plus } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { INDUSTRIES_GROUPS } from '@/data/industries';

const ICONS = { Wrench, Car, Store, MapPin } as const;

/** I2 — Who it's for: four expandable audience cards (light). */
export default function AudienceSegments({ guides = {} }: { guides?: Record<string, ReactNode> }) {
  const [openId, setOpenId] = useState<string | null>(null);

  // Arriving via the nav dropdown's anchor (e.g. #auto-motorsports) should
  // land on an already-open card. This has to run post-mount, not as a
  // lazy useState initializer: `window.location.hash` doesn't exist during
  // SSR, so seeding it there would render "open" on the client's first pass
  // against a server-rendered "closed" markup and trigger a hydration
  // mismatch. Reading the URL after mount is exactly the external-system
  // sync this hook exists for.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    const match = INDUSTRIES_GROUPS.groups.find((g) => g.id === id);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (match) setOpenId(match.id);
  }, []);

  return (
    <section className="bg-cream-100 py-20 md:py-28" aria-labelledby="audience-segments-heading">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent-ink">{INDUSTRIES_GROUPS.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="audience-segments-heading" className="h2-section mt-4 max-w-2xl font-medium text-forest-950">
            {INDUSTRIES_GROUPS.headline}
            <span className="mt-1 block text-accent-ink">{INDUSTRIES_GROUPS.headlineAccent}</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid items-start gap-6 sm:grid-cols-2">
          {INDUSTRIES_GROUPS.groups.map((group, i) => {
            const Icon = ICONS[group.icon as keyof typeof ICONS];
            const isOpen = openId === group.id;
            const panelId = `${group.id}-panel`;
            const triggerId = `${group.id}-trigger`;

            return (
              <Reveal key={group.id} delay={i * 0.08}>
                <article
                  id={group.id}
                  className={`scroll-mt-24 rounded-2xl border bg-cream-50 transition-colors ${
                    isOpen ? 'border-accent-ink' : 'border-cream-300'
                  }`}
                >
                  <h3>
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenId(isOpen ? null : group.id)}
                      className="flex w-full items-start justify-between gap-4 p-8 text-left"
                    >
                      <span>
                        <Icon className="h-6 w-6 text-accent-ink" strokeWidth={1.5} aria-hidden="true" />
                        <span className="eyebrow mt-6 block text-ink-soft">{group.label}</span>
                        <span className="mt-3 block text-[1.0625rem] leading-[1.7] text-forest-950">
                          {group.line}
                        </span>
                      </span>
                      <Plus
                        aria-hidden="true"
                        className={`h-5 w-5 shrink-0 text-accent-ink transition-transform duration-300 ${
                          isOpen ? 'rotate-45' : ''
                        }`}
                      />
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr', opacity: isOpen ? 1 : 0 }}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-cream-300 px-8 pb-8 pt-6">
                        <p className="text-[1.0625rem] leading-[1.7] text-ink-soft">
                          {group.expanded.intro}
                        </p>
                        <ul className="mt-5 space-y-3">
                          {group.expanded.points.map((point) => (
                            <li key={point} className="flex items-start gap-3 text-[0.9375rem] leading-[1.6] text-forest-950">
                              <Check className="mt-1 h-4 w-4 shrink-0 text-accent-ink" strokeWidth={2} aria-hidden="true" />
                              {point}
                            </li>
                          ))}
                        </ul>
                        {guides[group.id] ? <div className="mt-8 border-t border-cream-300 pt-6">{guides[group.id]}</div> : null}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

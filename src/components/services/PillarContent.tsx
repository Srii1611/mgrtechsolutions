import { Check } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { PILLAR_CONTENT } from '@/data/services';

/** S5 — Pillar 02: Content & SEO (light). */
export default function PillarContent() {
  return (
    <section
      id="content"
      className="scroll-mt-24 py-20 md:py-28"
      aria-labelledby="pillar-content-heading"
    >
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow text-accent-ink">{PILLAR_CONTENT.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="pillar-content-heading" className="h2-section mt-4 font-medium text-forest-950">
              {PILLAR_CONTENT.headline}
              <span className="mt-1 block text-accent-ink">{PILLAR_CONTENT.headlineAccent}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede mt-6 max-w-xl text-ink-soft">{PILLAR_CONTENT.body}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-8 space-y-3">
              {PILLAR_CONTENT.checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[1.0625rem] leading-[1.6] text-forest-950">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-accent-ink" strokeWidth={2} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="space-y-4">
          {PILLAR_CONTENT.fanCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08}>
              <article className="rounded-2xl border border-cream-300 bg-cream-100 p-6">
                <p className="eyebrow text-accent-ink">{card.tag}</p>
                <p className="mt-3 text-[1.0625rem] font-medium leading-[1.4] text-forest-950">
                  {card.title}
                </p>
                <p className="mt-3 text-sm text-ink-soft">{card.meta}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

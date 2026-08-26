import { MapPin, MousePointerClick, PhoneCall } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { FRAMEWORK } from '@/data/home';

const ICONS = { MapPin, MousePointerClick, PhoneCall } as const;

/** SECTION 02 — The framework (light). Reference layout for later sections. */
export default function Framework() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent-ink">{FRAMEWORK.eyebrow}</p>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="lede mt-6 max-w-2xl text-ink-soft">{FRAMEWORK.lede}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {FRAMEWORK.cards.map((card, i) => {
            const Icon = ICONS[card.icon];
            return (
              <Reveal key={card.index} delay={i * 0.08}>
                <article className="h-full rounded-2xl border border-cream-300 bg-cream-100 p-8">
                  <Icon
                    className="h-6 w-6 text-accent-ink"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <p className="eyebrow mt-6 text-ink-soft">{card.index}</p>
                  <p className="mt-3 text-[1.0625rem] leading-[1.7] text-forest-950">
                    {card.body}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <p className="h3-card mt-12 max-w-2xl font-medium text-forest-950">
            {FRAMEWORK.closing}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

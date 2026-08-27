import { Code2, KeyRound, Smartphone, Gauge, MessageSquare, Phone } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { ALWAYS_INCLUDED } from '@/data/pricing-page';

const ICONS = { Code2, KeyRound, Smartphone, Gauge, MessageSquare, Phone } as const;

/** S4 — What's Always Included: 3x2 grid of non-negotiable tiles (light). */
export default function AlwaysIncluded() {
  return (
    <section className="bg-cream-100 py-20 md:py-28" aria-labelledby="always-included-heading">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent-ink">{ALWAYS_INCLUDED.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="always-included-heading" className="h2-section mt-4 max-w-2xl font-medium text-forest-950">
            {ALWAYS_INCLUDED.headline}
            <span className="mt-1 block text-accent-ink">{ALWAYS_INCLUDED.headlineAccent}</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ALWAYS_INCLUDED.tiles.map((tile, i) => {
            const Icon = ICONS[tile.icon as keyof typeof ICONS];
            return (
              <Reveal key={tile.label} delay={i * 0.06}>
                <article className="h-full rounded-2xl border border-cream-300 bg-cream-50 p-8">
                  <Icon className="h-6 w-6 text-accent-ink" strokeWidth={1.5} aria-hidden="true" />
                  <p className="eyebrow mt-6 text-ink-soft">{tile.label}</p>
                  <p className="mt-3 text-[1.0625rem] leading-[1.7] text-forest-950">{tile.line}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

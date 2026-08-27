import { Wrench, Car, Store, MapPin } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { WHO_ITS_FOR } from '@/data/services';

const ICONS = { Wrench, Car, Store, MapPin } as const;

/** S8 — Who it's for: four audience segments (light). */
export default function WhoItsFor() {
  return (
    <section className="bg-cream-100 py-20 md:py-28" aria-labelledby="who-its-for-heading">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent-ink">{WHO_ITS_FOR.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="who-its-for-heading" className="h2-section mt-4 max-w-2xl font-medium text-forest-950">
            {WHO_ITS_FOR.headline}
            <span className="mt-1 block text-accent-ink">{WHO_ITS_FOR.headlineAccent}</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {WHO_ITS_FOR.groups.map((group, i) => {
            const Icon = ICONS[group.icon as keyof typeof ICONS];
            return (
              <Reveal key={group.label} delay={i * 0.08}>
                <article className="h-full rounded-2xl border border-cream-300 bg-cream-50 p-8">
                  <Icon className="h-6 w-6 text-accent-ink" strokeWidth={1.5} aria-hidden="true" />
                  <p className="eyebrow mt-6 text-ink-soft">{group.label}</p>
                  <p className="mt-3 text-[1.0625rem] leading-[1.7] text-forest-950">{group.line}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

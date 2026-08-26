import { MessageSquareText, Search } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { AI_SHIFT } from '@/data/home';

const ICONS = { Search, MessageSquareText } as const;

/** SECTION 05 — The shift (dark). Staggered reveals, no scroll-pinning. */
export default function AIShift() {
  return (
    <section className="on-dark bg-forest-950 py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent">{AI_SHIFT.eyebrow}</p>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="lede mt-6 max-w-2xl text-mist">{AI_SHIFT.lede}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {AI_SHIFT.queries.map((item, i) => {
            const Icon = ICONS[item.icon as keyof typeof ICONS];
            return (
              <Reveal key={item.query} delay={i * 0.1}>
                <article className="h-full rounded-2xl border border-forest-700 bg-forest-900 p-8">
                  <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} aria-hidden="true" />
                  <p className="eyebrow mt-6 text-mist">{item.style}</p>
                  <p className="h3-card mt-3 font-medium text-cream-50">&ldquo;{item.query}&rdquo;</p>
                  <p className="mt-4 text-sm text-mist">{item.caption}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.25}>
          <p className="eyebrow mt-14 text-mist">{AI_SHIFT.takeaway}</p>
        </Reveal>
      </div>
    </section>
  );
}

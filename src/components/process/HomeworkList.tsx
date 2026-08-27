import { Check } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { HOMEWORK_LIST } from '@/data/process';

/** S4 — What I need from you (light): self-completing checklist card. */
export default function HomeworkList() {
  return (
    <section className="bg-cream-100 py-20 md:py-28" aria-labelledby="homework-list-heading">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent-ink">{HOMEWORK_LIST.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="homework-list-heading" className="h2-section mt-4 max-w-2xl font-medium text-forest-950">
            {HOMEWORK_LIST.headline}
            <span className="mt-1 block text-accent-ink">{HOMEWORK_LIST.headlineAccent}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="lede mt-6 max-w-xl text-ink-soft">{HOMEWORK_LIST.lede}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 rounded-2xl border border-cream-300 bg-cream-50 p-8">
            <p className="eyebrow text-ink-soft">{HOMEWORK_LIST.packingListLabel}</p>
            <ul className="mt-6 space-y-5">
              {HOMEWORK_LIST.items.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-accent-ink" strokeWidth={2} aria-hidden="true" />
                  <div>
                    <p className="text-[1.0625rem] font-medium text-forest-950">{item.label}</p>
                    <p className="mt-1 text-sm text-ink-soft">{item.note}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-8 text-ink-soft">{HOMEWORK_LIST.footnote}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

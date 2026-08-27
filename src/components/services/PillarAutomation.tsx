import { Check } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { PILLAR_AUTOMATION } from '@/data/services';

/** S7 — Pillar 03: AI Automation (light). */
export default function PillarAutomation() {
  return (
    <section
      id="automation"
      className="scroll-mt-24 py-20 md:py-28"
      aria-labelledby="pillar-automation-heading"
    >
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow text-accent-ink">{PILLAR_AUTOMATION.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="pillar-automation-heading" className="h2-section mt-4 font-medium text-forest-950">
              {PILLAR_AUTOMATION.headline}
              <span className="mt-1 block text-accent-ink">{PILLAR_AUTOMATION.headlineAccent}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede mt-6 max-w-xl text-ink-soft">{PILLAR_AUTOMATION.body}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-8 space-y-3">
              {PILLAR_AUTOMATION.checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[1.0625rem] leading-[1.6] text-forest-950">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-accent-ink" strokeWidth={2} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-cream-300 bg-cream-100 p-8">
            <p className="eyebrow text-ink-soft">{PILLAR_AUTOMATION.timelineLabel}</p>
            <ol className="mt-6 space-y-5">
              {PILLAR_AUTOMATION.timeline.map((item, i) => (
                <li key={i} className="border-l-2 border-accent-ink/40 pl-4">
                  <p className="eyebrow text-ink-soft">{item.time}</p>
                  <p className="mt-1 text-sm font-medium text-forest-950">{item.event}</p>
                  <p className="mt-1 text-sm text-ink-soft">{item.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

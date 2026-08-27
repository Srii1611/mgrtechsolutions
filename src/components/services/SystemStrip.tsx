import Reveal from '@/components/motion/Reveal';
import { SYSTEM_STRIP } from '@/data/services';

/** S2 — System overview strip: three anchor cards into the pillars. */
export default function SystemStrip() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="system-strip-heading">
      <div className="container-page">
        <h2 id="system-strip-heading" className="sr-only">
          The system, at a glance
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {SYSTEM_STRIP.parts.map((part, i) => (
            <Reveal key={part.index} delay={i * 0.08}>
              <a
                href={part.target}
                className="block h-full rounded-2xl border border-cream-300 bg-cream-100 p-8 transition-colors hover:border-accent-ink"
              >
                <p className="eyebrow text-accent-ink">{part.index}</p>
                <p className="h3-card mt-4 font-medium text-forest-950">{part.name}</p>
                <p className="mt-3 text-[1.0625rem] leading-[1.7] text-ink-soft">{part.line}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

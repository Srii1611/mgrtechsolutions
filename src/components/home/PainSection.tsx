import Reveal from '@/components/motion/Reveal';
import { PAINS } from '@/data/home';

/** SECTION 04 — Sound familiar? (light). */
export default function PainSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent-ink">{PAINS.eyebrow}</p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {PAINS.items.map((item, i) => (
            <Reveal key={item.quote} delay={i * 0.06}>
              <div className="h-full">
                <p className="h3-card font-medium italic text-forest-950">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="mt-4 text-[1.0625rem] leading-[1.7] text-ink-soft">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="eyebrow mt-14 text-ink-soft">{PAINS.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}

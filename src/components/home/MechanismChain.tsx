import Reveal from '@/components/motion/Reveal';
import { MECHANISM } from '@/data/home';

/** SECTION 07 — Why it rings (dark). Static numbered rail, staggered reveals. */
export default function MechanismChain() {
  return (
    <section className="on-dark bg-forest-950 py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent">{MECHANISM.eyebrow}</p>
        </Reveal>

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-5 top-0 w-px bg-forest-700 md:left-6"
          />
          <div className="flex flex-col gap-10">
            {MECHANISM.steps.map((step, i) => (
              <Reveal key={step.cause} delay={i * 0.08}>
                <div className="relative flex gap-6 pl-0">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent bg-forest-950 font-mono text-sm text-accent md:h-12 md:w-12">
                    {i + 1}
                  </span>
                  <div className="pt-1">
                    <p className="h3-card font-medium text-cream-50">{step.cause}</p>
                    <p className="mt-2 text-[1.0625rem] leading-[1.7] text-mist">{step.effect}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.3}>
          <p className="eyebrow mt-14 text-mist">{MECHANISM.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}

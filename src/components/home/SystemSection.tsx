import Reveal from '@/components/motion/Reveal';
import { SYSTEM } from '@/data/home';

/** SECTION 06 — One system (light). Horizontal chain on desktop, stacked on mobile. */
export default function SystemSection() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="system-heading">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent-ink">{SYSTEM.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="system-heading" className="lede mt-6 max-w-2xl text-ink-soft">
            {SYSTEM.lede}
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-4 md:flex-row md:items-stretch md:gap-0">
          {SYSTEM.nodes.map((node, i) => (
            <div key={node.title} className="flex flex-1 flex-col md:flex-row md:items-stretch">
              <Reveal delay={i * 0.1} className="flex-1">
                <article className="h-full rounded-2xl border border-cream-300 bg-cream-100 p-8">
                  <p className="eyebrow text-accent-ink">{node.title}</p>
                  <p className="mt-3 text-[1.0625rem] leading-[1.7] text-forest-950">
                    {node.body}
                  </p>
                </article>
              </Reveal>

              {i < SYSTEM.nodes.length - 1 && (
                <div
                  aria-hidden="true"
                  className="flex shrink-0 items-center justify-center text-ink-soft md:w-12"
                >
                  <svg
                    className="h-8 w-8 rotate-90 md:rotate-0"
                    viewBox="0 0 48 24"
                    fill="none"
                  >
                    <line
                      x1="2"
                      y1="12"
                      x2="46"
                      y2="12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                    />
                    <path d="M40 6 L46 12 L40 18" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="eyebrow mt-14 text-accent-ink">{SYSTEM.loopLabel}</p>
          <p className="mt-3 max-w-2xl text-[1.0625rem] font-medium leading-[1.7] text-forest-950">
            {SYSTEM.takeaway}
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <a
            href="/services"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent-ink px-6 py-3 font-medium text-cream-50 transition-transform hover:scale-[1.03]"
          >
            {SYSTEM.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

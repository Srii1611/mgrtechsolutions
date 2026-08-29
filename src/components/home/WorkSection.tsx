import Reveal from '@/components/motion/Reveal';
import WorkShowcaseGrid from '@/components/work/WorkShowcaseGrid';
import { WORK } from '@/data/home';

/** SECTION 03 — The work (dark). Renders all seven projects. */
export default function WorkSection() {
  return (
    <section id="work-section" className="on-dark scroll-mt-24 bg-forest-950 py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="eyebrow text-accent">{WORK.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h2-section mt-4 max-w-2xl font-medium text-cream-50">
                {WORK.headline} <span className="text-accent">{WORK.headlineAccent}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lede mt-6 max-w-2xl text-mist">{WORK.lede}</p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="eyebrow hidden text-mist md:block">{WORK.legend}</p>
          </Reveal>
        </div>
        <Reveal delay={0.05} className="md:hidden">
          <p className="eyebrow mt-6 text-mist">{WORK.legend}</p>
        </Reveal>

        <div className="mt-14">
          <WorkShowcaseGrid />
        </div>

        <Reveal delay={0.15}>
          <a
            href="/work"
            className="mt-12 inline-flex items-center gap-2 rounded-full border border-forest-700 px-6 py-3 font-medium text-cream-50 transition-colors hover:border-accent"
          >
            {WORK.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

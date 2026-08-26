import Image from 'next/image';
import Reveal from '@/components/motion/Reveal';
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

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {WORK.projects.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.06}>
              <article className="h-full overflow-hidden rounded-2xl border border-forest-700 bg-forest-900">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={project.image}
                    alt={`${project.name} website`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <span
                    className={
                      project.live
                        ? 'absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-medium text-forest-950'
                        : 'absolute left-4 top-4 rounded-full border border-mist px-3 py-1 text-xs font-medium text-mist'
                    }
                  >
                    {project.live ? 'LIVE' : 'DEMO'}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="h3-card font-medium text-cream-50">{project.name}</h3>
                  <p className="eyebrow mt-2 text-mist">{project.category}</p>
                  <p className="mt-3 text-[1.0625rem] leading-[1.7] text-mist">
                    {project.outcome}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
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

import Reveal from '@/components/motion/Reveal';
import { STORY } from '@/data/about';

/** S2 — The Story: editorial reading column with drop cap and pull-quote (light). */
export default function Story() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="story-heading">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent-ink">{STORY.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="story-heading" className="h2-section mt-4 max-w-2xl font-medium text-forest-950">
            {STORY.headline}
            <span className="mt-1 block text-accent-ink">{STORY.headlineAccent}</span>
          </h2>
        </Reveal>

        <div className="mt-10 max-w-2xl space-y-8">
          <Reveal delay={0.1}>
            <p className="text-[1.0625rem] leading-[1.8] text-forest-950 first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:font-medium first-letter:leading-[0.85] first-letter:text-accent-ink">
              {STORY.paragraph1}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[1.0625rem] leading-[1.8] text-forest-950">{STORY.paragraph2}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <blockquote className="border-l-2 border-accent-ink py-2 pl-6">
              <p className="h3-card font-medium text-forest-950">{STORY.pullQuote}</p>
            </blockquote>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="text-[1.0625rem] leading-[1.8] text-forest-950">{STORY.paragraph3}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

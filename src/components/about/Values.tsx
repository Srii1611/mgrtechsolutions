import Reveal from '@/components/motion/Reveal';
import { VALUES } from '@/data/about';

/** S3 — Values: four rules of the studio (light). */
export default function Values() {
  return (
    <section className="bg-cream-100 py-20 md:py-28" aria-labelledby="values-heading">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent-ink">{VALUES.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="values-heading" className="h2-section mt-4 max-w-2xl font-medium text-forest-950">
            {VALUES.headline}
            <span className="mt-1 block text-accent-ink">{VALUES.headlineAccent}</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {VALUES.items.map((item, i) => (
            <Reveal key={item.num} delay={i * 0.08}>
              <article className="h-full rounded-2xl border border-cream-300 bg-cream-50 p-8">
                <p className="eyebrow text-accent-ink">{item.num}</p>
                <p className="h3-card mt-4 font-medium text-forest-950">{item.title}</p>
                <p className="mt-3 text-[1.0625rem] leading-[1.7] text-ink-soft">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';
import { Check } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { PACKAGES } from '@/data/pricing-page';

/** S2 — The Packages: three plans, featured one visually lifted. */
export default function Packages() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="packages-heading">
      <div className="container-page">
        <h2 id="packages-heading" className="sr-only">
          Packages
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {PACKAGES.plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08}>
              <article
                className={
                  plan.featured
                    ? 'relative flex h-full flex-col rounded-2xl border-2 border-accent-ink bg-cream-100 p-8 lg:-translate-y-4 lg:shadow-lg'
                    : 'flex h-full flex-col rounded-2xl border border-cream-300 bg-cream-100 p-8'
                }
              >
                {plan.featured && (
                  <span className="eyebrow absolute -top-3 left-8 rounded-full bg-accent-ink px-3 py-1 text-cream-50">
                    MOST POPULAR
                  </span>
                )}
                <p className="eyebrow text-accent-ink">{plan.label}</p>
                <p className="h3-card mt-3 font-medium text-forest-950">{plan.name}</p>
                <p className="mt-2 text-[1.0625rem] text-ink-soft">{plan.pitch}</p>
                <p className="mt-6 text-2xl font-medium text-forest-950">{plan.price}</p>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-[1.6] text-forest-950">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" strokeWidth={2} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="eyebrow mt-8 text-ink-soft">{plan.goodFor}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="eyebrow mt-10 text-ink-soft">{PACKAGES.footnote}</p>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-6 text-[1.0625rem] text-ink-soft">
            Looking for the fixed-price website builds?{' '}
            <Link
              href="/pricing/website-cost"
              className="font-medium text-accent-ink underline underline-offset-4"
            >
              See the Starter, Growth, and Custom website packages
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}

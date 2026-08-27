import Link from 'next/link';
import { PhoneCall } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { SERVICES_CLOSE } from '@/data/services';
import { SITE } from '@/data/site';

/** S9 — Close (dark CTA, low-commitment variant). */
export default function ServicesClose() {
  return (
    <section className="on-dark bg-forest-950 py-20 md:py-28" aria-labelledby="services-close-heading">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent">{SERVICES_CLOSE.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="services-close-heading" className="h2-section mt-4 max-w-2xl font-medium text-cream-50">
            {SERVICES_CLOSE.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="lede mt-6 max-w-xl text-mist">{SERVICES_CLOSE.body}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-forest-950 transition-transform hover:-translate-y-0.5"
            >
              <PhoneCall className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              {SERVICES_CLOSE.callLabel} {SITE.phone}
            </a>
            <Link
              href={SERVICES_CLOSE.secondaryHref}
              className="inline-flex items-center gap-2 rounded-full border border-forest-700 px-6 py-3 font-medium text-cream-50 transition-colors hover:border-accent"
            >
              {SERVICES_CLOSE.secondaryCta}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

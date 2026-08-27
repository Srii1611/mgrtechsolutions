import { PhoneCall } from 'lucide-react';
import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import { EIGHTH_SLOT } from '@/data/work-page';
import { SITE } from '@/data/site';

/** S4 — Reserved eighth project slot / close CTA (dark). */
export default function EighthSlot() {
  return (
    <section className="on-dark bg-forest-950 py-20 md:py-28" aria-labelledby="eighth-slot-heading">
      <div className="container-page">
        <Reveal>
          <div className="rounded-2xl border border-dashed border-forest-700 p-8 md:p-12">
            <p className="eyebrow text-accent">{EIGHTH_SLOT.eyebrow}</p>
            <span className="sr-only">{EIGHTH_SLOT.emptySlotSrLabel}</span>
            <p className="eyebrow mt-4 text-mist">{EIGHTH_SLOT.bandLabel}</p>
            <h2
              id="eighth-slot-heading"
              className="h2-section mt-4 max-w-2xl font-medium text-cream-50"
            >
              {EIGHTH_SLOT.headline} <span className="text-accent">{EIGHTH_SLOT.headlineAccent}</span>
            </h2>
            <p className="lede mt-6 max-w-xl text-mist">{EIGHTH_SLOT.body}</p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-forest-950 transition-transform hover:-translate-y-0.5"
              >
                <PhoneCall className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                {EIGHTH_SLOT.callLabel}: {SITE.phone}
              </a>
              <Link
                href={EIGHTH_SLOT.secondaryHref}
                className="inline-flex items-center gap-2 rounded-full border border-forest-700 px-6 py-3 font-medium text-cream-50 transition-colors hover:border-accent"
              >
                {EIGHTH_SLOT.secondaryCta}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

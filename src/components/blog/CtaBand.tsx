import Link from 'next/link';
import { PhoneCall } from 'lucide-react';
import { SITE } from '@/data/site';

/** Dark CTA band closing out an article or category page. No form here. */
export default function CtaBand({
  eyebrow,
  heading,
  body,
}: {
  eyebrow?: string;
  heading: string;
  body: string;
}) {
  return (
    <section className="on-dark bg-forest-950 py-20 md:py-28">
      <div className="container-page">
        {eyebrow ? <p className="eyebrow text-accent">{eyebrow}</p> : null}
        <h2 className="h2-section mt-4 max-w-2xl font-medium text-cream-50">{heading}</h2>
        <p className="lede mt-6 max-w-xl text-mist">{body}</p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-forest-950 transition-transform hover:-translate-y-0.5"
          >
            <PhoneCall className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            {SITE.phone}
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-forest-700 px-6 py-3 font-medium text-cream-50 transition-colors hover:border-accent"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}

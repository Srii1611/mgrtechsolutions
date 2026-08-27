import Link from 'next/link';
import Image from 'next/image';
import { ABOUT_HERO } from '@/data/about';

/** S1 — Hero: copy left, portrait with caption chip right (dark). */
export default function AboutHero() {
  return (
    <section className="dot-grid on-dark bg-forest-950 pb-16 pt-24">
      <div className="container-page">
        <nav aria-label="Breadcrumb" className="eyebrow text-mist">
          <Link href="/" className="transition-colors hover:text-accent">
            HOME
          </Link>
          <span className="mx-2 text-forest-700" aria-hidden="true">
            /
          </span>
          <span className="text-accent">{ABOUT_HERO.breadcrumb}</span>
        </nav>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div>
            <p className="eyebrow text-accent">{ABOUT_HERO.eyebrow}</p>
            <h1 className="h1-page mt-4 font-medium text-cream-50">
              {ABOUT_HERO.headline}
              <span className="mt-1 block text-accent">{ABOUT_HERO.headlineAccent}</span>
            </h1>
            <p className="lede mt-8 max-w-xl text-mist">{ABOUT_HERO.body}</p>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <Image
              src="/about-portrait.png"
              alt={ABOUT_HERO.portraitAlt}
              width={480}
              height={600}
              className="w-full rounded-2xl object-cover"
              priority
            />
            <span className="eyebrow absolute bottom-4 left-4 rounded-full bg-forest-950/80 px-3 py-1 text-cream-50">
              {ABOUT_HERO.portraitCaption}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

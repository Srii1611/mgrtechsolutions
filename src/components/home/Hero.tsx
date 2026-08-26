import { PhoneCall } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { HERO } from '@/data/home';
import { SITE } from '@/data/site';

/** SECTION 01 — Hero (dark). Full-bleed, dot-grid + radial accent glow. */
export default function Hero() {
  return (
    <section className="on-dark relative flex min-h-[calc(100dvh-5rem)] items-center overflow-hidden bg-forest-950 dot-grid">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 30%, color-mix(in srgb, var(--color-accent) 14%, transparent), transparent)',
        }}
      />

      <div className="container-page relative py-20 md:py-28">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-mist">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {HERO.eyebrow}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="h1-hero mt-6 max-w-4xl font-medium text-cream-50">
            {HERO.headline}
            <br />
            <span className="text-accent">{HERO.headlineAccent}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="lede mt-8 max-w-2xl text-mist">{HERO.lede}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-forest-950 transition-transform hover:scale-[1.03]"
            >
              <PhoneCall className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              Call {SITE.phone}
            </a>
            <a
              href="#work-section"
              className="inline-flex items-center gap-2 rounded-full border border-forest-700 px-6 py-3 font-medium text-cream-50 transition-colors hover:border-accent"
            >
              {HERO.secondaryCta}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="eyebrow mt-14 text-mist">{HERO.strapline}</p>
        </Reveal>
      </div>
    </section>
  );
}

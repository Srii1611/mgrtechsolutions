import Reveal from '@/components/motion/Reveal';
import ReviewForm from '@/components/contact/ReviewForm';
import { DUAL_CLOSE } from '@/data/home';
import { SITE } from '@/data/site';

/** SECTION 13 — dual close: call panel + real review-request form (dark). */
export default function DualClose() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent">{DUAL_CLOSE.eyebrow}</p>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="flex h-full flex-col justify-center">
              <h2 className="h2-section text-cream-50">{DUAL_CLOSE.callHeading}</h2>
              <p className="lede mt-6 max-w-md text-mist">{DUAL_CLOSE.callBody}</p>

              <div className="mt-10 flex flex-col gap-3">
                <a
                  href={SITE.phoneHref}
                  className="h3-card font-medium text-accent underline decoration-2 underline-offset-4 hover:text-accent-strong"
                >
                  {SITE.phone}
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-mist underline decoration-2 underline-offset-4 hover:text-accent"
                >
                  {SITE.email}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="on-light rounded-2xl bg-cream-50 p-6 shadow-lg md:p-10">
              <h2 className="h2-section text-forest-950">{DUAL_CLOSE.reviewHeading}</h2>
              <p className="lede mt-6 text-ink-soft">{DUAL_CLOSE.reviewBody}</p>

              <div className="mt-8">
                <ReviewForm showHeader={false} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

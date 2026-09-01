import type { ReactNode } from 'react';
import Reveal from '@/components/motion/Reveal';

/**
 * Shared wrapper for the prose sections of the pricing guides, so the
 * heading rhythm and vertical spacing stay identical down the page.
 *
 * `tone="raised"` puts the section on cream-100 — used to break up the
 * run of sections so the guide doesn't read as one unbroken column.
 */
export default function PricingSection({
  id,
  heading,
  eyebrow,
  tone = 'base',
  children,
}: {
  id: string;
  heading: string;
  eyebrow?: string;
  tone?: 'base' | 'raised';
  children: ReactNode;
}) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`scroll-mt-24 py-16 md:py-24 ${tone === 'raised' ? 'bg-cream-100' : ''}`}
    >
      <div className="container-page">
        {eyebrow ? (
          <Reveal>
            <p className="eyebrow text-accent-ink">{eyebrow}</p>
          </Reveal>
        ) : null}
        <Reveal delay={eyebrow ? 0.05 : 0}>
          <h2
            id={headingId}
            className={`h2-section max-w-3xl font-medium text-forest-950 ${eyebrow ? 'mt-4' : ''}`}
          >
            {heading}
          </h2>
        </Reveal>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

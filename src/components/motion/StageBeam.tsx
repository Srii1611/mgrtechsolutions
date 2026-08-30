'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

/**
 * Scroll-linked progress beam for the stages section.
 *
 * A client component that WRAPS server-rendered children. Only the beam needs
 * JavaScript; the ~1,500 words of copy inside it stay Server Components and
 * ship complete in the HTML (spec §3, hard rule 6).
 *
 * The beam is what makes three stages read as an ordered sequence rather than
 * three unrelated blocks — which is the whole argument of the section.
 */
export default function StageBeam({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Measured against this element, not the page: 0 when its top reaches 60%
  // down the viewport, 1 when its bottom does. Tying it to the element means
  // the beam stays correct no matter how the sections above it change height.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 65%', 'end 65%'],
  });

  const fill = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className="relative">
      {/*
        The track is wrapped in its own `container-page` so it lines up with
        the content edge. Absolute offsets are measured from the BORDER box of
        the positioned ancestor, not its padding box — so a bare `left-[7px]`
        on a padded container lands inside the gutter, several rem left of the
        dots it is supposed to run through.

        Geometry: the dot is 16px wide on mobile and 22px on desktop, both
        flush to the content edge, so their centres are 8px and 11px in. The
        track sits half a pixel left of each to stay centred under them.
      */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="container-page relative h-full">
          <div className="absolute inset-y-0 left-[7px] w-px bg-cream-300 lg:left-[10px]">
            {/*
              transform-origin top means scaleY grows the fill downward from
              the start of the section, rather than out from its middle.
            */}
            <motion.div
              style={{ scaleY: reduce ? 1 : fill, transformOrigin: 'top' }}
              className="h-full w-full bg-accent-ink"
            />
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}

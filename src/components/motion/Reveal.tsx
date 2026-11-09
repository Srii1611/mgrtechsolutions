'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Scroll reveal — fade up, ease-out, fires once (spec §7). Travel comes from
 * `--reveal-y` in globals.css: longer below `lg`, because 16px barely reads
 * on a phone. Framer Motion honours prefers-reduced-motion via MotionConfig
 * in the root layout, and globals.css zeroes durations as a second guard.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** `li` keeps a stagger valid inside a `<ul>`. */
  as?: 'div' | 'li';
}) {
  const Tag = as === 'li' ? motion.li : motion.div;

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 'var(--reveal-y)' }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -18% 0px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Tag>
  );
}

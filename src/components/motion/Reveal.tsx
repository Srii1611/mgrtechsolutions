'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Scroll reveal — fade up 16px, 500ms, ease-out, fires once (spec §7).
 * Framer Motion honours prefers-reduced-motion via MotionConfig in the
 * root layout, and globals.css zeroes durations as a second guard.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -18% 0px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

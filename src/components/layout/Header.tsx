'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { SITE, NAV } from '@/data/site';

/** Scroll distance over which the bar contracts. Longer = more deliberate. */
const RANGE = 150;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  /*
    Scroll-LINKED, not toggled. An earlier version flipped a boolean at a
    threshold and sprang every property at once, which read as a single pop.
    Mapping scroll position onto a 0..1 progress means the bar contracts at
    exactly the speed you scroll, and reverses just as smoothly.
  */
  const raw = useTransform(scrollY, [0, RANGE], [0, 1]);

  // A gentle spring over that progress takes the jitter out of trackpad and
  // wheel input without decoupling the bar from the scroll position.
  const smooth = useSpring(raw, { stiffness: 190, damping: 30, restDelta: 0.001 });

  // prefers-reduced-motion: progress is pinned at 0, so the bar never
  // contracts or translates at all (hard rule 5).
  const still = useMotionValue(0);
  const p = reduce ? still : smooth;

  /*
    Each property runs over a DIFFERENT slice of the progress, so they
    sequence instead of moving in lockstep: the bar rounds and shortens
    first, then narrows and lifts, and the border/shadow arrive last.
    Everything sharing one range is what made the first attempt feel cheap.
  */
  const height = useTransform(p, [0, 0.72], [80, 60]);
  const logoSize = useTransform(p, [0, 0.72], [40, 32]);
  const radius = useTransform(p, [0, 0.42], [0, 999]);
  const width = useTransform(p, [0.18, 1], ['100%', '94%']);
  const maxWidth = useTransform(p, [0.18, 1], [4000, 1120]);
  const y = useTransform(p, [0.12, 1], [0, 8]);
  const chrome = useTransform(p, [0.3, 1], [0, 1]);

  // Solid at rest so the nav stays legible over /blog's cream background;
  // translucent once contracted, which is what lets the blur read.
  const bgOpacity = useTransform(p, [0.3, 1], [1, 0.82]);

  return (
    /*
      The <header> keeps a FIXED 5rem height at every scroll position. The pill
      inside it is what shrinks. If the header itself resized it would do so in
      flow — sticky elements still occupy space — and shove the page upward as
      you scrolled.
    */
    <header className="on-dark sticky top-0 z-50 h-20">
      <motion.div
        style={{ width, maxWidth, y, borderRadius: radius }}
        className="relative mx-auto"
      >
        {/* Background as its own layer so its opacity can animate without
            fading the nav text with it. */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 rounded-[inherit] bg-forest-950 backdrop-blur-md"
        />
        {/* Border and shadow arrive last, as the pill detaches. */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: chrome }}
          className="absolute inset-0 rounded-[inherit] border border-forest-700 shadow-lg shadow-black/30"
        />

        <motion.div
          style={{ height }}
          className="relative flex items-center justify-between px-5 md:px-10"
        >
          {/*
            The mark's G and R are near-black and disappear on forest, so it sits
            in a cream chip — the light ground it was drawn for.
          */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            aria-label={`${SITE.name} — home`}
          >
            <motion.span
              style={{ width: logoSize, height: logoSize }}
              className="flex items-center justify-center rounded-xl bg-cream-50"
            >
              <Image
                src="/brand/logo-mark.png"
                alt=""
                aria-hidden="true"
                width={32}
                height={32}
                priority
                className="h-[72%] w-auto"
              />
            </motion.span>
            <span className="eyebrow text-cream-50">MGRTECH</span>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHovered(item.href)}
                className="relative px-3 py-2 text-[0.9375rem] text-mist transition-colors hover:text-cream-50"
              >
                {/*
                  ONE shared pill that travels between items, rather than a
                  separate background fading in under each. `layoutId` is what
                  makes Framer animate it from its old position to its new one.
                */}
                {hovered === item.href && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-full bg-forest-800"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 400, damping: 32 }
                    }
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            ))}

            <a
              href={SITE.phoneHref}
              className="ml-3 shrink-0 rounded-full bg-accent px-5 py-2.5 text-[0.9375rem] font-semibold text-forest-950 transition hover:bg-accent-strong"
            >
              Call {SITE.phone}
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="text-cream-50 lg:hidden"
          >
            <span aria-hidden="true" className="text-2xl leading-none">
              {open ? '×' : '≡'}
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/*
        Absolutely positioned, not in flow: the header's height is fixed, so a
        drawer in flow would push the page down as it opened.
      */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Primary"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={
              reduce ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
            }
            className="absolute inset-x-0 top-full overflow-hidden border-t border-forest-700 bg-forest-950/95 backdrop-blur-md lg:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-6">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-2 text-lg text-mist transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={SITE.phoneHref}
                onClick={() => setOpen(false)}
                className="mt-4 rounded-full bg-accent px-5 py-3 text-center font-semibold text-forest-950"
              >
                Call {SITE.phone}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

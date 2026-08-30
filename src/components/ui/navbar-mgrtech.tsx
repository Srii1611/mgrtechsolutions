'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

/**
 * MGRTECH resizable / scroll-aware navbar.
 *
 * Two things this deliberately does NOT do, because both are the known
 * failure modes of the Aceternity original:
 *
 *  1. No binary scroll threshold. There is no `scrollY > 100 ? shrunk :
 *     expanded` anywhere. Every dimension is a `useTransform` of `scrollY`
 *     over a continuous [0, 150] range, so the bar contracts in proportion to
 *     where the page actually is — scroll half of it and you get half the
 *     shrink. A state flip plus a CSS transition can only ease a jump it has
 *     already made; this never jumps.
 *
 *  2. No white-rectangle artifact. The original bakes a light-mode "floating
 *     card" box-shadow into the shrunk state whose last layer is
 *     `0 1px 0 rgba(255,255,255,0.1) inset` — a 1px white highlight along the
 *     top edge, which on a dark bar reads as a stray white border. It is not
 *     reproduced here in any form. The shrunk treatment is `shadow-lg
 *     shadow-black/40` plus a `border-white/10` hairline, and the border and
 *     background fade in over the same scroll range rather than appearing at
 *     a threshold.
 */

const NAV_ITEMS = [
  { name: 'Services', link: '/services' },
  { name: 'Work', link: '/work' },
  { name: 'Process', link: '/process' },
  { name: 'Pricing', link: '/pricing' },
  { name: 'Blog', link: '/blog' },
  { name: 'About', link: '/about' },
  { name: 'FAQ', link: '/faq' },
  { name: 'Contact', link: '/contact' },
] as const;

const PHONE = '774-460-1116';
const PHONE_HREF = 'tel:+17744601116';

/** Scroll distance the contraction is mapped across. */
const RANGE = 150;

/** Spring applied on top of each mapped value. Smooths wheel and trackpad
 *  jitter without decoupling the bar from the scroll position. */
const SPRING = { stiffness: 190, damping: 30, restDelta: 0.001 } as const;

export default function NavbarMgrtech() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // ── Scroll-linked geometry ────────────────────────────────────────────
  // Each of these maps scrollY continuously. `useSpring` then eases the
  // result in both directions, so scrolling back up unwinds as smoothly as
  // scrolling down.
  const paddingInlineRaw = useTransform(scrollY, [0, RANGE], ['2rem', '1rem']);
  const paddingBlockRaw = useTransform(scrollY, [0, RANGE], ['1.5rem', '0.75rem']);

  /*
    The bar stays FULL WIDTH and square-cornered at every scroll position.

    It was briefly a floating pill — max-width 85%, border-radius 9999px — and
    that cannot work on this layout for two compounding reasons:

      1. `body` is cream-50, and the <header> band itself is transparent, so
         the 15% gutters either side of a contracted pill show cream.
      2. The hero is `min-h-[calc(100dvh-5rem)]`, sized to start BELOW a solid
         5rem band rather than run underneath it. So the pill never floats
         over hero art; it floats over a cream strip with the dark hero below.

    Height, padding, translucency and the bottom hairline still animate, so
    the bar still contracts continuously with scroll — it just does not
    detach from the viewport edges.
  */

  /*
    Background and outline are on SEPARATE ranges, and this is the reason:
    `body` is cream-50, so every route except the homepage hero is light at
    the top of the page. A bar that starts fully transparent puts white and
    neutral-300 link text straight onto cream and it disappears.

    So the background is opaque at rest and only thins to 0.8 once contracted
    — enough for the backdrop blur to read, never enough to lose the text.
    Over the homepage's dark hero a dark bar on a dark hero is seamless, so
    nothing is given up there.

    The outline — hairline plus shadow — is what actually fades in from
    nothing, because that belongs to the floating-pill state alone.
  */
  const bgOpacityRaw = useTransform(scrollY, [0, RANGE], [1, 0.8]);
  const outlineRaw = useTransform(scrollY, [0, RANGE], [0, 1]);

  // Springs only apply to the numeric channel. The string-valued transforms
  // (rem / % / px) are interpolated by useTransform itself, which already
  // produces a continuous value — springing a unit string is not supported.
  const bgOpacity = useSpring(bgOpacityRaw, SPRING);
  const outlineOpacity = useSpring(outlineRaw, SPRING);

  /*
    prefers-reduced-motion (hard rule 5): no scroll-linked interpolation and
    no spring physics at all. The bar renders in its shrunk state statically
    and relies on a plain CSS transition, so nothing is driven by scroll
    position.
  */
  const motionStyle = reduce
    ? undefined
    : {
        paddingInline: paddingInlineRaw,
        paddingBlock: paddingBlockRaw,
      };

  return (
    <header className="sticky top-0 z-50 flex w-full justify-center">
      <motion.div
        style={motionStyle}
        className={
          reduce
            ? 'relative w-full px-4 py-3 transition-colors duration-200'
            : 'relative w-full'
        }
      >
        {/*
          Background, border and shadow live on their own layer so their
          opacity can animate without fading the logo and links with it.
          Fully transparent at the top of the page; bg-black/80 with a blur,
          a white/10 hairline and shadow-black/40 once contracted.

          Explicitly NOT the Aceternity shadow — no white inset highlight.
        */}
        <motion.div
          aria-hidden="true"
          style={reduce ? undefined : { opacity: bgOpacity }}
          className="absolute inset-0 bg-black backdrop-blur-md"
        />

        {/*
          A BOTTOM HAIRLINE plus the drop shadow — not a box border. The bar is
          full-bleed, so `border` on all four sides draws a visible line down
          each viewport edge. Still deliberately NOT the Aceternity shadow:
          no `rgba(255,255,255,0.1)` inset anywhere.
        */}
        <motion.div
          aria-hidden="true"
          style={reduce ? undefined : { opacity: outlineOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10 shadow-lg shadow-black/40"
        />

        {/* Three columns: logo left, links centred, CTA right. */}
        <div className="relative flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            aria-label="MGRTECH Solutions — home"
          >
            {/*
              No chip. A rounded square holding a centred glyph is the app-icon
              convention, and that is exactly what it read as.

              The mark is drawn dark-on-light — near-black GR, gold traces — so
              it needs SOMETHING to stay visible on a dark bar. Rather than a
              container, `brightness(0) invert(1)` flattens the artwork to a
              solid cream monogram, which is legible on the bar directly.

              This is a stand-in for a real light-on-dark asset. The moment
              there is an SVG variant, drop the filter and point `src` at it.
            */}
            <Image
              src="/brand/logo-mark.png"
              alt=""
              aria-hidden="true"
              width={36}
              height={36}
              priority
              className="h-9 w-auto [filter:brightness(0)_invert(1)]"
            />
            <span className="eyebrow text-white">MGRTECH</span>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center lg:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.link || pathname.startsWith(`${item.link}/`);
              // The underline follows the pointer when there is one, and
              // falls back to the current route when there is not.
              const isMarked = hovered ? hovered === item.link : isActive;

              return (
                <Link
                  key={item.link}
                  href={item.link}
                  aria-current={isActive ? 'page' : undefined}
                  onMouseEnter={() => setHovered(item.link)}
                  className={`relative px-3 py-2 text-[0.9375rem] transition-colors ${
                    isMarked ? 'text-white' : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  <span className="relative">{item.name}</span>

                  {/*
                    ONE underline element shared across every link. `layoutId`
                    is what makes it travel from its previous position to its
                    new one rather than cross-fading — a `before:`
                    pseudo-element cannot animate between two elements.
                  */}
                  {isMarked && (
                    <motion.div
                      layoutId="nav-underline"
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-emerald-400"
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 400, damping: 32 }
                      }
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={PHONE_HREF}
              className="hidden rounded-full bg-emerald-400 px-5 py-2.5 text-[0.9375rem] font-semibold text-black transition hover:bg-emerald-300 lg:inline-block"
            >
              Call {PHONE}
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="text-white lg:hidden"
            >
              {open ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/*
        Absolutely positioned rather than in flow: the header is sticky, so a
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
            className="absolute inset-x-0 top-full overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.link || pathname.startsWith(`${item.link}/`);

                return (
                  <Link
                    key={item.link}
                    href={item.link}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`py-2 text-lg transition-colors ${
                      isActive ? 'text-emerald-400' : 'text-neutral-300 hover:text-emerald-400'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              <a
                href={PHONE_HREF}
                onClick={() => setOpen(false)}
                className="mt-4 rounded-full bg-emerald-400 px-5 py-3 text-center font-semibold text-black"
              >
                Call {PHONE}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

# MGRTECH Site — Foundation Implementation Plan (Phases 1–2)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the Next.js application shell — scaffold, design tokens, fonts, site data, header, and footer — so every later page has a working, styled, accessible frame to drop into.

**Architecture:** Next.js App Router with Server Components by default. `app/` lives at the repository root; all non-route source lives in `src/` and is reached through the `@/*` import alias. Design tokens are declared once in `globals.css` using Tailwind v4's CSS-first `@theme` directive. Motion is confined to `'use client'` leaf components so no page is forced into client rendering.

**Tech Stack:** Next.js 16.3, React 19, TypeScript, Tailwind CSS v4, `next/font/google` (Geist, Geist Mono), Framer Motion, Lenis. Node v24.18.0, npm 11.16.0.

**Spec:** `docs/superpowers/specs/2026-08-25-mgrtech-site-rebuild-design.md`

## Global Constraints

Every task's requirements implicitly include this section. Values are copied verbatim from the spec.

- **Phone is `774-460-1116`** (`tel:+17744601116`). The string `508-306-1802` must appear nowhere in the codebase.
- **No page may assert a headcount of one.** Sell "one accountable point of contact and no handoffs," never company size. First-person singular is allowed where Srii speaks to the reader; claims about company size are not. (Spec §4)
- **Domain:** `mgrtechsolutionsinc.com`. **Email:** `sri@mgrtechsolutionsinc.com`.
- **Location shown is "Ashland, MA · Serving MetroWest" only.** The street address is never published — it is residential.
- **No hex values in components.** Colors come from `@theme` tokens.
- **`prefers-reduced-motion: reduce` disables transforms and transitions entirely.** Hard requirement.
- **Mobile-first.** Build the 375px view before the desktop view.
- **Semantic HTML** — `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`. Every image has meaningful `alt` (decorative images get `alt=""` plus `aria-hidden`). Every interactive element has an accessible name and a visible focus ring. Contrast meets WCAG AA on both forest and cream backgrounds.
- **Server Components by default.** `'use client'` only on leaf components that need it.
- **Motion is Framer Motion + Lenis only.** No GSAP, no three.js/R3F.
- **Do not link a placeholder Calendly URL.** The phone number is the sole primary CTA until a real URL exists.
- **No custom cursor.** `cursor: none` is not carried over from the prior build.

---

## File Structure

| File | Responsibility |
|---|---|
| `app/layout.tsx` | Root layout — fonts, base metadata, header, footer, smooth scroll |
| `app/page.tsx` | Placeholder homepage, replaced in Phase 4 |
| `app/globals.css` | Tailwind import, `@theme` tokens, base styles, type helpers |
| `src/data/site.ts` | Company facts and navigation — single source of truth for copy |
| `src/components/layout/Header.tsx` | Site nav, desktop + mobile |
| `src/components/layout/Footer.tsx` | Site footer |
| `src/components/motion/Reveal.tsx` | `'use client'` scroll-reveal primitive |
| `src/components/motion/SmoothScroll.tsx` | `'use client'` Lenis provider |
| `scripts/verify-copy.mjs` | Fails the build on a retired phone number or banned solo-positioning copy |

**Testing note:** The spec introduces Vitest in Phase 3, when the lead form creates the first logic worth unit-testing. Foundation work is verified by `next build` plus `scripts/verify-copy.mjs`, which mechanically enforces the two Global Constraints most likely to be violated by ported copy.

---

### Task 1: Scaffold the Next.js application

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `.gitignore`

**Interfaces:**
- Consumes: nothing (first task)
- Produces: a working Next 16 app with the `@/*` alias resolving to `./src/*` then `./*`

`create-next-app` aborts on a directory containing unrecognized entries, and this repo already holds `docs/` and `.git/`. Scaffold into a temporary directory and move the result in.

- [ ] **Step 1: Scaffold into a temporary directory**

```bash
cd /c/Clients
npx --yes create-next-app@16.3.0 _scaffold_tmp \
  --typescript --tailwind --eslint --app \
  --no-src-dir --import-alias "@/*" \
  --use-npm --skip-install --disable-git --yes
```

Expected: `_scaffold_tmp/` created with `app/`, `package.json`, `next.config.ts`.

- [ ] **Step 2: Move the scaffold into the repo**

```bash
cd /c/Clients
cp -r _scaffold_tmp/. mgrtechsolutions/
rm -rf _scaffold_tmp
cd mgrtechsolutions
ls
```

Expected: `app/`, `docs/`, `package.json`, `next.config.ts`, `tsconfig.json` all present.

- [ ] **Step 3: Point the import alias at `src/`**

Edit `tsconfig.json` so the `paths` block reads exactly:

```json
"paths": {
  "@/*": ["./src/*", "./*"]
}
```

This keeps `app/` at the repository root while letting `@/components/...` resolve into `src/`.

- [ ] **Step 4: Install dependencies**

```bash
cd /c/Clients/mgrtechsolutions
npm install
npm install framer-motion lenis
```

Expected: completes without `ENOTFOUND`. If a registry mirror error appears, confirm `npm config get registry` returns `https://registry.npmjs.org/`.

- [ ] **Step 5: Verify the build**

```bash
npm run build
```

Expected: `✓ Compiled successfully`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Scaffold Next.js 16 application

App Router with app/ at the repository root and non-route source under
src/, reached through the @/* alias."
```

---

### Task 2: Design tokens and type scale

**Files:**
- Modify: `app/globals.css` (replace entirely)

**Interfaces:**
- Consumes: Task 1's Tailwind v4 setup
- Produces: token names `forest-950/900/800/700`, `cream-50/100/300`, `accent`, `accent-strong`, `sand`, `ink-soft`, `mist`; utility classes `.eyebrow`, `.h1-hero`, `.h1-page`, `.h2-section`, `.h3-card`, `.lede`, `.dot-grid`, `.container-page`

Tailwind v4 has no `tailwind.config.js` — tokens are declared in CSS under `@theme`. A `--color-*` token automatically generates `bg-*`, `text-*`, and `border-*` utilities.

- [ ] **Step 1: Write the token and base stylesheet**

Replace the entire contents of `app/globals.css`:

```css
@import "tailwindcss";

/* ─── Design tokens (spec §5) ──────────────────────────────────── */
@theme {
  --color-forest-950: #0A1B13;
  --color-forest-900: #0E241A;
  --color-forest-800: #14301F;
  --color-forest-700: #1C4230;

  --color-cream-50:  #FAF6EC;
  --color-cream-100: #F4EDDD;
  --color-cream-300: #E4D9BE;

  --color-accent:        #3CE08C;
  --color-accent-strong: #22C870;

  --color-sand:     #E8C584;
  --color-ink-soft: #3E4F45;
  --color-mist:     #9DB5A7;

  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

/* ─── Base ─────────────────────────────────────────────────────── */
body {
  background-color: var(--color-cream-50);
  color: var(--color-forest-950);
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 1.0625rem;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

::selection {
  background: var(--color-accent);
  color: var(--color-forest-950);
}

/* Visible focus ring on both backgrounds (Global Constraints) */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Lenis owns scrolling */
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-stopped { overflow: hidden; }

/* ─── Type scale ───────────────────────────────────────────────── */
@utility eyebrow {
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.22em;
}

@utility h1-hero {
  font-size: clamp(2.75rem, 6.2vw, 5.25rem);
  line-height: 1.02;
  letter-spacing: -0.02em;
}

@utility h1-page {
  font-size: clamp(2.5rem, 5vw, 4.25rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
}

@utility h2-section {
  font-size: clamp(2rem, 3.6vw, 3.25rem);
  line-height: 1.08;
  letter-spacing: -0.015em;
}

@utility h3-card {
  font-size: clamp(1.25rem, 2vw, 1.625rem);
  line-height: 1.2;
}

@utility lede {
  font-size: clamp(1.125rem, 1.5vw, 1.375rem);
  line-height: 1.65;
}

/* ─── Layout helpers ───────────────────────────────────────────── */
@utility container-page {
  width: 100%;
  margin-inline: auto;
  padding-inline: 1.5rem;
  max-width: 76rem;
}

@media (min-width: 768px) {
  .container-page { padding-inline: 2.5rem; }
}

@utility dot-grid {
  background-image: radial-gradient(circle, rgba(60, 224, 140, 0.07) 1px, transparent 1px);
  background-size: 28px 28px;
}

/* ─── Reduced motion (hard requirement) ────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Prove a token resolves**

Replace `app/page.tsx` with a temporary probe:

```tsx
export default function Home() {
  return (
    <main className="container-page py-24">
      <p className="eyebrow text-accent-strong">TOKEN PROBE</p>
      <h1 className="h1-hero mt-4 font-medium">Tokens resolve.</h1>
      <div className="mt-8 h-24 w-full rounded-2xl bg-forest-950" />
    </main>
  );
}
```

- [ ] **Step 3: Run the dev server and confirm**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: cream page background, dark green block, green uppercase mono eyebrow, large tight headline. If the block is not dark green, the `@theme` block did not compile.

- [ ] **Step 4: Verify the build**

```bash
npm run build
```

Expected: `✓ Compiled successfully`.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css app/page.tsx
git commit -m "Add design tokens and type scale

Forest/cream/accent palette and the fluid type scale declared once in
globals.css via Tailwind v4 @theme, so no component carries a hex value."
```

---

### Task 3: Site data module

**Files:**
- Create: `src/data/site.ts`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `SITE: { name: string; legalName: string; domain: string; url: string; email: string; phone: string; phoneHref: string; location: string; tagline: string }`
  - `NAV: ReadonlyArray<{ href: string; label: string }>`
  - `FOOTER_CATEGORIES: ReadonlyArray<{ href: string; label: string }>`

Every later task reads contact details from here. No component hardcodes a phone number or email.

- [ ] **Step 1: Write the module**

```ts
/** Company facts. Single source of truth — spec §1. */
export const SITE = {
  name: 'MGRTECH Solutions',
  legalName: 'MGRTECH SOLUTIONS, Inc.',
  domain: 'mgrtechsolutionsinc.com',
  url: 'https://www.mgrtechsolutionsinc.com',
  email: 'sri@mgrtechsolutionsinc.com',
  phone: '774-460-1116',
  phoneHref: 'tel:+17744601116',
  /** Street address is never published — 33 Annetta Rd is residential. */
  location: 'Ashland, MA · Serving MetroWest',
  tagline: 'Websites that bring in actual phone calls.',
} as const;

/** Primary navigation. Order is the order shown. */
export const NAV = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/process', label: 'Process' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
] as const;

/** Blog categories, for footer routing. Six per spec. */
export const FOOTER_CATEGORIES = [
  { href: '/blog/category/ai-search', label: 'AI & Search' },
  { href: '/blog/category/business-growth', label: 'Business Growth' },
  { href: '/blog/category/content-marketing', label: 'Content Marketing' },
  { href: '/blog/category/lead-generation', label: 'Lead Generation' },
  { href: '/blog/category/local-seo', label: 'Local SEO' },
  { href: '/blog/category/website-performance', label: 'Website Performance' },
] as const;
```

- [ ] **Step 2: Verify it type-checks**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/site.ts
git commit -m "Add site data module

Company facts and navigation as typed constants so contact details are
never hardcoded in markup."
```

---

### Task 4: Copy guard script

**Files:**
- Create: `scripts/verify-copy.mjs`
- Modify: `package.json` (add `verify:copy` script)

**Interfaces:**
- Consumes: nothing
- Produces: `npm run verify:copy` — exits 1 with a file:line report on any violation

This enforces the two Global Constraints most likely to be reintroduced when copy is ported from the old build. Run it before every commit from here on.

- [ ] **Step 1: Write the failing check**

Create `scripts/verify-copy.mjs`:

```js
#!/usr/bin/env node
/**
 * Fails on copy that violates the spec's Global Constraints:
 *   - the retired phone number
 *   - any claim that the company is one person (spec §4)
 *
 * Scans app/ and src/ only. content/ is exempt: the 132 articles say
 * "one person" as advice to the reader about their own business, which
 * is not a claim about MGRTECH.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOTS = ['app', 'src'];
const EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.css', '.mdx']);

const RULES = [
  {
    name: 'retired phone number',
    re: /508[-.\s]?306[-.\s]?1802|\+?15083061802/i,
    fix: 'Use SITE.phone / SITE.phoneHref from @/data/site (774-460-1116).',
  },
  {
    name: 'solo-studio positioning',
    re: /\bone[-\s]person\b|\bone person\b|\bsolo\s+(studio|shop|operator)\b|PERSON ON THE PHONE/i,
    fix: 'Sell one point of contact and no handoffs, never company size. See spec §4.',
  },
];

function walk(dir) {
  let out = [];
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (entry === 'node_modules' || entry === '.next') continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out = out.concat(walk(full));
    else if (EXTS.has(extname(full))) out.push(full);
  }
  return out;
}

const violations = [];
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const lines = readFileSync(file, 'utf8').split(/\r?\n/);
    lines.forEach((line, i) => {
      for (const rule of RULES) {
        if (rule.re.test(line)) {
          violations.push({ file, line: i + 1, rule, text: line.trim() });
        }
      }
    });
  }
}

if (violations.length > 0) {
  console.error(`\n✖ ${violations.length} copy violation(s):\n`);
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}  [${v.rule.name}]`);
    console.error(`    ${v.text}`);
    console.error(`    → ${v.rule.fix}\n`);
  }
  process.exit(1);
}

console.log('✓ copy checks passed');
```

- [ ] **Step 2: Register the script**

In `package.json`, add to `"scripts"`:

```json
"verify:copy": "node scripts/verify-copy.mjs"
```

- [ ] **Step 3: Prove the guard catches a violation**

Temporarily append to `src/data/site.ts`:

```ts
export const BAD = 'Call 508-306-1802 — one person answers.';
```

Run:

```bash
npm run verify:copy
```

Expected: FAIL, exit 1, reporting both `retired phone number` and `solo-studio positioning` at that line.

- [ ] **Step 4: Remove the violation and confirm it passes**

Delete the `BAD` export, then:

```bash
npm run verify:copy
```

Expected: `✓ copy checks passed`, exit 0.

- [ ] **Step 5: Commit**

```bash
git add scripts/verify-copy.mjs package.json
git commit -m "Add copy guard for phone number and positioning

Mechanically enforces the two constraints most likely to be reintroduced
when copy is ported from the old build. content/ is exempt by design."
```

---

### Task 5: Motion primitives

**Files:**
- Create: `src/components/motion/Reveal.tsx`
- Create: `src/components/motion/SmoothScroll.tsx`

**Interfaces:**
- Consumes: `framer-motion`, `lenis` (Task 1)
- Produces:
  - `<Reveal delay?: number; className?: string; as?: 'div' | 'section'>` — fade-up wrapper
  - `<SmoothScroll>` — Lenis provider, renders nothing itself

Both are `'use client'` leaves. Pages importing them stay Server Components.

- [ ] **Step 1: Write the Reveal primitive**

```tsx
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
```

- [ ] **Step 2: Write the SmoothScroll provider**

```tsx
'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Lenis smooth scroll. Disabled entirely under prefers-reduced-motion,
 * which is a hard requirement (spec §7).
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
```

- [ ] **Step 3: Verify types and build**

```bash
npx tsc --noEmit && npm run build
```

Expected: no type errors, `✓ Compiled successfully`.

- [ ] **Step 4: Commit**

```bash
git add src/components/motion
git commit -m "Add Reveal and SmoothScroll motion primitives

Client leaves so pages that use them stay Server Components. Both bail
out under prefers-reduced-motion."
```

---

### Task 6: Header

**Files:**
- Create: `src/components/layout/Header.tsx`

**Interfaces:**
- Consumes: `SITE`, `NAV` from `@/data/site` (Task 3)
- Produces: `<Header />`, default export

Mobile-first: build the 375px drawer before the desktop row. `'use client'` because the mobile menu holds state.

- [ ] **Step 1: Write the component**

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITE, NAV } from '@/data/site';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="container-page flex h-20 items-center justify-between">
        <Link
          href="/"
          className="eyebrow text-white"
          aria-label={`${SITE.name} — home`}
        >
          MGRTECH
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.9375rem] text-mist transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={SITE.phoneHref}
            className="rounded-full bg-accent px-5 py-2.5 text-[0.9375rem] font-semibold text-forest-950 transition hover:bg-accent-strong"
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
          className="text-white lg:hidden"
        >
          <span aria-hidden="true" className="text-2xl leading-none">
            {open ? '×' : '≡'}
          </span>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-forest-700 bg-forest-950 lg:hidden"
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
              className="mt-4 rounded-full bg-accent px-5 py-3 text-center font-semibold text-forest-950"
            >
              Call {SITE.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Verify the guard and build**

```bash
npm run verify:copy && npm run build
```

Expected: `✓ copy checks passed`, then `✓ Compiled successfully`.

- [ ] **Step 3: Check the 375px view**

```bash
npm run dev
```

At 375px width: the toggle appears, opens the drawer, `aria-expanded` flips, and links close it. Tab through with the keyboard and confirm every item shows a visible focus ring.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "Add site header

Mobile drawer with aria-expanded/aria-controls, desktop nav above lg.
Phone CTA reads from SITE."
```

---

### Task 7: Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`

**Interfaces:**
- Consumes: `SITE`, `NAV`, `FOOTER_CATEGORIES` from `@/data/site` (Task 3)
- Produces: `<Footer />`, default export

A Server Component — no state, no effects.

- [ ] **Step 1: Write the component**

```tsx
import Link from 'next/link';
import { SITE, NAV, FOOTER_CATEGORIES } from '@/data/site';

export default function Footer() {
  return (
    <footer className="bg-forest-950 py-16 text-mist">
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="eyebrow text-accent">{SITE.name}</p>
            <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed">
              {SITE.tagline}
            </p>
            <p className="mt-6 text-[0.9375rem]">{SITE.location}</p>
            <a
              href={SITE.phoneHref}
              className="mt-4 block text-lg font-semibold text-white transition-colors hover:text-accent"
            >
              {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-1 block text-[0.9375rem] transition-colors hover:text-accent"
            >
              {SITE.email}
            </a>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow text-white">Pages</p>
            <ul className="mt-4 space-y-2">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Blog categories">
            <p className="eyebrow text-white">Topics</p>
            <ul className="mt-4 space-y-2">
              {FOOTER_CATEGORIES.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-[0.9375rem] transition-colors hover:text-accent"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 border-t border-forest-700 pt-8">
          <p className="text-[0.8125rem]">
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify the guard and build**

```bash
npm run verify:copy && npm run build
```

Expected: both pass.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "Add site footer

Contact block, page nav, and the six blog category routes, all read from
the site data module."
```

---

### Task 8: Root layout, fonts, and base metadata

**Files:**
- Modify: `app/layout.tsx` (replace entirely)
- Modify: `app/page.tsx` (replace the token probe)

**Interfaces:**
- Consumes: `Header` (Task 6), `Footer` (Task 7), `SmoothScroll` (Task 5), `SITE` (Task 3)
- Produces: the frame every later page renders into; `metadata` defaults later routes override via `generateMetadata`

`Geist` and `Geist_Mono` come from `next/font/google`, which self-hosts them at build time — no request to Google, no layout shift. Their CSS variables must match the `--font-sans` / `--font-mono` names bound in Task 2.

- [ ] **Step 1: Write the root layout**

```tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { MotionConfig } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/motion/SmoothScroll';
import { SITE } from '@/data/site';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description:
    'Hand-coded websites, content systems, and AI automation for local businesses across MetroWest Massachusetts.',
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    url: SITE.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MotionConfig reducedMotion="user">
          <SmoothScroll />
          <Header />
          <main>{children}</main>
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}
```

`MotionConfig reducedMotion="user"` makes every Framer Motion animation in the tree honour the OS setting.

If the build errors with a client-component or context complaint pointing at
`MotionConfig`, the installed Framer Motion build is not exporting it with a
`'use client'` directive. Fix by wrapping it in a client leaf of our own —
create `src/components/motion/MotionProvider.tsx`:

```tsx
'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
```

Then import `MotionProvider` in the layout instead of `MotionConfig` and swap
the two tags. Everything else stays the same.

- [ ] **Step 2: Replace the token probe with a real placeholder page**

```tsx
export default function Home() {
  return (
    <section className="dot-grid flex min-h-[100dvh] items-center bg-forest-950">
      <div className="container-page py-32">
        <p className="eyebrow text-accent">MGRTECH SOLUTIONS · ASHLAND, MA</p>
        <h1 className="h1-hero mt-8 max-w-4xl font-medium text-white">
          Homepage lands in Phase 4.
        </h1>
        <p className="lede mt-8 max-w-xl text-mist">
          The frame is live: tokens, fonts, header, and footer. Sections come next.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify build and guard**

```bash
npm run verify:copy && npm run build
```

Expected: `✓ copy checks passed`, `✓ Compiled successfully`, and the route list shows `/` as static.

- [ ] **Step 4: Confirm fonts and rendering**

```bash
npm run dev
```

At `http://localhost:3000`:
- Headline renders in Geist, eyebrow in Geist Mono
- Header sits over the dark hero; footer renders below
- View source and confirm the headline text is present in the HTML — this is the server-rendering fix working
- At 375px the mobile toggle appears and the drawer opens

- [ ] **Step 5: Confirm reduced motion**

Enable *Settings → Accessibility → Display → Reduce motion* (or Chrome DevTools → Rendering → Emulate `prefers-reduced-motion`). Reload. Expected: smooth scroll is off and the page jumps normally.

- [ ] **Step 6: Commit and push**

```bash
git add app/layout.tsx app/page.tsx
git commit -m "Wire root layout with Geist fonts and base metadata

Self-hosted Geist and Geist Mono bound to the --font-sans/--font-mono
tokens, MotionConfig honouring the OS reduced-motion setting, and title
template defaults later routes override."
git push origin main
```

---

## Definition of Done

- [ ] `npm run build` passes with `/` static
- [ ] `npm run verify:copy` passes
- [ ] `npx tsc --noEmit` passes
- [ ] Page HTML contains the headline text when viewed with JavaScript disabled
- [ ] The 375px view works: drawer opens, closes, and is keyboard reachable
- [ ] `prefers-reduced-motion` disables smooth scroll
- [ ] No hex color appears in any component file
- [ ] `508-306-1802` appears nowhere
- [ ] All work committed and pushed to `origin/main`

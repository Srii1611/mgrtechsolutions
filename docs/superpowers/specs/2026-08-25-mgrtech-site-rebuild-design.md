# MGRTECH SOLUTIONS — Site Rebuild Design

**Date:** 2026-08-25
**Status:** Approved for implementation
**Repo:** https://github.com/Srii1611/mgrtechsolutions

---

## 1. What this is

The company marketing site for MGRTECH SOLUTIONS, Inc. — a web development and
AI automation studio in Ashland, MA, serving MetroWest Massachusetts.

This is the company's primary sales asset. Its job is to get a local business
owner to call. The audience is owner-operators of trades and local service
businesses — plastering, tile, landscaping, auto repair, boutiques. They are not
technical. They skim on a phone. Build for that reader.

This rebuild replaces the current live site at `www.mgrtechsolutionsinc.com`.

### Company facts

| Field | Value |
|---|---|
| Legal name | MGRTECH SOLUTIONS, Inc. |
| Domain | `mgrtechsolutionsinc.com` |
| Email | `sri@mgrtechsolutionsinc.com` |
| Phone | `774-460-1116` (`tel:+17744601116`) |
| Location shown | Ashland, MA · Serving MetroWest |
| Street address | Never published — see §3 |

The prior number `508-306-1802` is retired. It appears 34 times across the old
codebase and must not survive the port.

### Why a rebuild

Two prior codebases exist. Neither ships as-is:

- **`C:\Clients\Site Information\app`** — a complete Vite SPA: 13 routes, 132
  blog posts, ~8,500 lines of components. Complete, but client-side rendered.
- **`C:\Clients\mgrtech-site`** — a Next.js scaffold: one page, 13 section
  components, plus ~2,325 lines of written specs. Right framework, no build.

The Vite build has four defects that cannot be patched away:

1. **The lead form does not send anything.** It validates, waits 900ms, and
   displays "Got it. Watch your inbox." There is no endpoint. Every lead is
   silently dropped.
2. **No structured data anywhere**, while ten blog posts instruct readers to add
   `LocalBusiness` schema.
3. **Client-side rendered with one static `<title>`.** All 132 posts share a
   single title and description. No `robots.txt`, no `sitemap.xml`.
4. **16MB of unoptimized images**, including four PNGs near 2MB each.

For a studio that sells local SEO and site performance, 2–4 are a credibility
problem as much as a technical one.

---

## 2. Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Next.js 16 App Router + TypeScript | Server rendering fixes the SEO defect at the root. Already the company's default stack and its stated product. |
| Styling | Tailwind v4, CSS-first `@theme` tokens | Components are being rebuilt anyway, so there is no v3 compatibility argument. Starting current avoids upgrade debt. |
| Hosting | Vercel | Already in use. |
| Domain | `mgrtechsolutionsinc.com` | Confirmed by owner. Resolves the conflict flagged in the prior spec. |
| Components | Rebuilt fresh against spec | Prior components carry Tailwind v3 syntax and shadcn/ui coupling. |
| Blog content | Ported as-is | The 132 articles are finished work. Rewriting them is waste. |
| Marketing copy | Ported, with a positioning pass | Existing copy is strong but hard-codes a solo-studio claim that expires on the first hire. See §4. |
| Palette | Forest / cream / bright green | Owner's existing brand identity. Overrides the teal system in the prior spec. |
| Type | Geist + Geist Mono | Replaces a three-family stack (Fraunces / Inter / IBM Plex Mono). See §5. |
| Motion | Framer Motion + Lenis only | Drops GSAP and three.js/R3F. See §7. |
| Lead capture | Route handler → Resend → `sri@mgrtechsolutionsinc.com` | Lands where the owner already looks. No dashboard to check. |

---

## 3. Architecture

### Rendering model

Every page is a **Server Component** by default. Interactivity and motion are
isolated in leaf components marked `'use client'`, so no page is forced into
client rendering by a single animated element.

This is the specific change that fixes SEO: pages arrive as complete HTML.

```
app/
  layout.tsx                    server — fonts, LocalBusiness JSON-LD, nav, footer
  page.tsx                      server — homepage, composes section components
  services/page.tsx
  work/page.tsx
  process/page.tsx
  pricing/page.tsx
  about/page.tsx
  faq/page.tsx
  contact/page.tsx
  blog/
    page.tsx                    server — index, filter UI is a client leaf
    [slug]/page.tsx             server — generateStaticParams over 132 posts
    category/[slug]/page.tsx    server — 6 categories
  api/lead/route.ts             POST handler for the review form
  sitemap.ts
  robots.ts
  not-found.tsx

src/
  components/
    sections/                   one file per page section
    ui/                         shared primitives (button, card, accordion)
    motion/                     'use client' leaves — Reveal, SmoothScroll
  data/                         typed copy objects
  lib/                          blog parsing, schema builders, validation

content/
  blog/                         132 markdown files, ported unchanged
```

### Content pipeline

The 132 markdown files move into `content/blog/` unchanged. At build time each
is parsed for frontmatter and body, and `generateStaticParams` emits one static
route per post. Result: 132 prerendered pages with 132 distinct titles.

Category pages are derived from post frontmatter, not maintained separately, so
a post's category can never disagree with the page it appears on.

### Data layer

All copy lives in typed objects under `src/data/`, never inline in JSX. Content
edits should not require touching markup.

### Lead capture

```
ReviewForm ('use client')
  → POST /api/lead
    → Zod schema (shared client + server)
    → honeypot check
    → rate limit by IP
    → Resend → sri@mgrtechsolutionsinc.com
    → 200 / 4xx
```

The Zod schema is imported by both the form and the route handler, so client
validation cannot be bypassed. The success panel renders only on a 200. A
failure shows an error with the phone number as fallback.

`RESEND_API_KEY` is set in Vercel environment variables. It is never committed.

### SEO layer

- `generateMetadata` per route — unique title, description, canonical, OG tags
- `sitemap.ts` — all static routes plus 132 posts and 6 categories
- `robots.ts` — allow all, point to sitemap
- JSON-LD:
  - `LocalBusiness` in the root layout — service-area business, no street address
  - `Article` + `BreadcrumbList` on each blog post
  - `FAQPage` on the FAQ page

**Street address is never published.** `33 Annetta Rd` is residential. The site
shows "Ashland, MA · Serving MetroWest" only, and the `LocalBusiness` schema
declares a service area rather than a physical address.

---

## 4. Positioning and voice

### The rule

The site must never claim the company consists of one person. MGRTECH SOLUTIONS
is a studio that intends to hire. Copy written around a headcount of one expires
the day the second person starts, and rewriting a site to accommodate a hire is
a bad reason to rewrite a site.

What is being sold is **not** smallness. It is **one accountable point of
contact and no handoffs** — the same promise a well-run twenty-person firm can
make, and one a big agency structurally cannot.

| Do not say | Say instead |
|---|---|
| "One person runs this studio" | "One point of contact, start to finish" |
| "One person on the phone — me" | "You work with the same person from first call to launch" |
| "One person designed it, built it, and answers the phone about it" | "The person who builds your site is the person who answers when you call" |
| "One person, no office, no account managers" | "No account managers, no handoffs — you're never re-explaining your business" |
| "A person answers" | Keep — this is about responsiveness, not headcount |

First person singular is still allowed where it reflects Srii personally
speaking to the reader ("I'll look at your site and send back three things").
What is banned is any statement about **company size**.

The honest, plain-English voice is unchanged: no hype, no fake scarcity, no
invented metrics. The `LIVE` / `DEMO` portfolio labeling stays — it is a
positioning asset.

### Sites to change

Thirteen locations in the prior build assert a headcount of one. Three are
structural rather than phrasing:

1. **Homepage stat bar** — the fourth stat reads `1 · PERSON ON THE PHONE — ME`.
   Replaced with `1 · POINT OF CONTACT, START TO FINISH`.
2. **Pricing value anchor** — `ONE CALL, ONE PERSON, ONE PRICE` becomes
   `ONE CALL, ONE CONTACT, ONE PRICE`.
3. **Process effort ledger** — the row comparing MGRTECH against an agency's
   "Sales rep → PM → designer → dev" chain keeps its point. The MGRTECH column
   becomes "One contact, once" rather than "One person, once".

The remaining ten are phrase-level rewrites in the hero strapline, about page,
values, contact panels, homepage close, services hero, and pricing FAQ.

**The 132 blog articles are not affected.** Twelve contain the phrase "one
person," but every instance is advice to the reader about running their own
business. They are not claims about MGRTECH and must not be edited.

---

## 5. Design system

### Color

Carried from the existing brand identity.

| Token | Value | Use |
|---|---|---|
| `--color-forest-950` | `#0A1B13` | Dark section background, primary text on cream |
| `--color-forest-900` | `#0E241A` | Dark gradient partner |
| `--color-forest-800` | `#14301F` | Dark surfaces |
| `--color-forest-700` | `#1C4230` | Hairlines on dark |
| `--color-cream-50` | `#FAF6EC` | Page background |
| `--color-cream-100` | `#F4EDDD` | Card surfaces |
| `--color-cream-300` | `#E4D9BE` | Borders, dividers on light |
| `--color-accent` | `#3CE08C` | Primary accent, buttons, links on dark |
| `--color-accent-strong` | `#22C870` | Hover states, eyebrows on light |
| `--color-sand` | `#E8C584` | Secondary accent, sparing |
| `--color-ink-soft` | `#3E4F45` | Secondary text on cream |
| `--color-mist` | `#9DB5A7` | Secondary text on forest |

Declared once in `globals.css` under `@theme`. No hex values in components.

### Type

**Geist** (body and headings) and **Geist Mono** (eyebrows, labels, stats),
both via `next/font/google`, which self-hosts at build time — no request to
Google, no layout shift.

This replaces Fraunces, Inter, and IBM Plex Mono. Fraunces was a variable serif
running with its `WONK` axis engaged; it worked against the audience, who read
on phones in poor conditions. One family across the site, differentiated by
weight and size, reads as more deliberate than three families mixed.

- Headings: 500–600 weight, tracking `-0.02em`, line-height 1.02–1.1
- Body: 400 weight, ~17px, line-height 1.7
- Eyebrows: Geist Mono, uppercase, tracking `0.22em`, ~12px

Fluid sizing via `clamp()` for the hero, page, and section scales.

---

## 6. Accessibility

Not a phase — a standing requirement checked in every phase.

- Semantic HTML: `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`
- Every image gets meaningful `alt`; decorative images get `alt=""` and `aria-hidden`
- Every interactive element has an accessible name and a visible focus ring
- Contrast meets WCAG AA against both forest and cream backgrounds
- Mobile-first: the 375px view is built before the desktop view

The prior build applied `cursor: none` for a custom cursor. It is not carried
over — it removes a system affordance for no benefit to this audience.

---

## 7. Motion

Framer Motion for reveals and transitions; Lenis for smooth scroll.
three.js/React Three Fiber stay dropped — a WebGL runtime is indefensible
weight on a site selling speed to mobile users. The hero's WebGL layer is
replaced with a CSS/SVG treatment built to read closely to the original.

**GSAP/ScrollTrigger reinstated (2026-08-28), narrowly.** This spec originally
dropped GSAP on the grounds that it "duplicates Framer Motion's role." That
holds for reveals, transitions and scroll-linked scrubbing, where `useScroll`
and `useTransform` are sufficient and already in use. It does not hold for
scroll *pinning*: ScrollTrigger's `pin` manages spacer elements and section
height automatically, and Framer Motion ships no equivalent. Hand-rolling it
across the Section 02 sequence — two pinned segments with a full-bleed band
between them — is more fragile than the dependency.

Scope of the reinstatement:

- Pinning only. Framer Motion remains the default for everything else.
- Dynamically imported, so it stays out of the critical path.
- Wired to Lenis via `lenis.on('scroll', ScrollTrigger.update)`; without this,
  pinned sections drift against smooth scroll.
- Still no three.js, no WebGL, no GSAP-driven text splitting (the Section 02
  headline animation is CSS in a Server Component, and stays that way).

- Scroll reveal: fade up ~16px, 500ms, ease-out, ~60ms stagger, fires once
- Hover lift on cards: `translateY(-3px)` plus soft shadow, 200ms
- Accordion: height and opacity, 250ms — never snap
- **`prefers-reduced-motion: reduce` disables transforms and transitions
  entirely.** Hard requirement, verified per phase.

---

## 8. Portfolio data

Source of truth. **3 live, 4 demo.** Any stat displayed on the site must
reconcile with this table exactly.

| Project | Type | Location | Status |
|---|---|---|---|
| Emanuel Blueboard Corporation | Plastering & blueboard | Framingham, MA | live |
| Master Tile Installation | Tile installation | Framingham, MA | live |
| L&J Landscaping | Landscaping | MA | live |
| Chaubandi Boutique Boston | Fashion boutique | Arlington, MA | demo |
| Route 126 Exotic Puppies | Puppy yoga & pet events | MetroWest, MA | demo |
| Eurotech Motorsports | European auto repair | Natick, MA | demo |
| Forte's Parts Connection | Auto parts e-commerce | Framingham, MA | demo |

Live and demo are labeled distinctly and visibly. This honesty is a positioning
asset, not a disclaimer — it is kept.

The prior build's homepage copy read "Three of these are live... Four are demos"
above a grid of six. Copy must agree with what is on screen.

---

## 9. Phases

Each phase is built, verified, and committed before the next begins.

| # | Phase | Exit criteria |
|---|---|---|
| 1 | Repo, scaffold, `@theme` tokens, fonts | `next build` passes; tokens and Geist render |
| 2 | Shared layout — nav, footer, primitives | Layout renders on every route; mobile nav works |
| 3 | **Contact page + working lead form** | A real submission arrives in the inbox |
| 4 | Homepage sections | All sections render; copy agrees with §8 |
| 5 | Blog — 132 posts, index, 6 categories | 132 static routes build with distinct titles |
| 6 | Services, work, process, pricing, about, FAQ | All routes complete |
| 7 | SEO layer — metadata, sitemap, robots, JSON-LD | Schema validates; sitemap lists every route |
| 8 | Image optimization + Lighthouse pass | Images WebP/AVIF via `next/image`; LCP measured |
| 9 | Vercel deploy + domain cutover | Live on `mgrtechsolutionsinc.com` |

Phase 3 precedes the homepage deliberately: a site that cannot capture a lead
should not go live, and the form is small and self-contained.

Phase 7 follows the pages because a sitemap cannot be verified against routes that do not exist yet.

Two rules apply across every phase that ships copy, not to any single phase:

- **The §4 positioning rule.** No page may assert a headcount of one.
- **The phone number is `774-460-1116`.** `508-306-1802` must appear nowhere in
  the new codebase. Verified by grep before each commit.

---

## 10. Testing

Runner: **Vitest**. Added in Phase 3, when the first logic worth testing exists.

- **Lead form** — TDD. The Zod schema and route handler are pure logic with
  clear inputs and outputs, and it is the one path where a silent failure costs
  real money. Tests cover: valid payload sends, invalid payload rejects,
  honeypot trips, Resend failure returns an error rather than a false success.
- **Blog pipeline** — tests over frontmatter parsing and category derivation.
  A malformed post should fail the build loudly, not render blank.
- **Pages** — verified by build and by eye. Snapshot tests over marketing markup
  are churn with no signal.

`next build` passing is a required gate on every phase — it catches broken
`generateStaticParams`, bad metadata, and server/client boundary violations.

---

## 11. Open items — block launch, not the build

Tracked here so they are not discovered at cutover. Work proceeds against
clearly-marked placeholders.

| Item | Status | Needed by |
|---|---|---|
| Real pricing | Placeholder `$X,XXX` | Phase 6 |
| Calendly URL | Does not exist. Phone is the sole primary CTA until it does. **Do not link a placeholder.** | Phase 4 |
| Testimonial permission | Two run as disclosed placeholders | Phase 4 |
| `RESEND_API_KEY` | DONE — supplied, in `.env.local` | Phase 3 |
| Domain DNS cutover | Currently serves the old site | Phase 9 |
| Resend domain verification | Sending from `onboarding@resend.dev`, which only delivers to the account address. Verify `mgrtechsolutionsinc.com` in Resend so leads send from a branded address to `sri@`. | Phase 9 |
| Logo / favicon | DONE — mark supplied; transparent PNG + cream app icons generated. An SVG would still be sharper. | — |

---

## 12. Out of scope

- CMS. Content lives in markdown and typed data files for v1.
- Rewriting the 132 articles.
- Client project work. This is the company's own site.
- Migrating the old Vite app. It stays on disk as reference and is not deployed.

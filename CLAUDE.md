@AGENTS.md

# MGRTECH Solutions — Marketing Site

## What this is
The marketing site for MGRTECH SOLUTIONS, Inc., a web development and AI
automation studio in Ashland, MA serving MetroWest Massachusetts. Audience:
non-technical owner-operators of trades and local service businesses who
skim the site on a phone. Copy and UI should read fast and plainly.

## Stack
- Next.js App Router + TypeScript
- Tailwind v4, CSS-first `@theme` in `app/globals.css` — there is no
  `tailwind.config.js`, and there must not be one
- Framer Motion + Lenis for all motion/scroll
- Deployed to Vercel

## Contact facts (use these, nowhere else)
- Phone: `774-460-1116` / `tel:+17744601116`
- Email: `sri@mgrtechsolutionsinc.com`
- Domain: `mgrtechsolutionsinc.com`
- Location, as shown publicly: "Ashland, MA · Serving MetroWest" — never the
  street address

## Hard rules
1. The string `508-306-1802` (the retired phone number) must never appear
   anywhere in `app/` or `src/`.
2. Never claim the company is one person. Sell one accountable point of
   contact and no handoffs — never company size. First-person singular is
   fine where Srii speaks directly to the reader; claims about company size
   are not.
3. Never publish the street address.
4. No hex color values outside `@theme` in `app/globals.css` — add a token,
   don't inline a color.
5. `prefers-reduced-motion: reduce` must disable transforms and transitions
   entirely, not just slow them down.
6. Server Components by default. `'use client'` only on leaf components that
   need interactivity/state.
7. Motion is Framer Motion + Lenis only — no GSAP, no three.js.
8. Mobile-first: build and check the 375px viewport first.
9. Semantic HTML with accessible names and visible focus rings. Meet WCAG AA
   contrast (4.5:1 text, 3:1 for non-text UI like focus indicators).
10. Never link a placeholder Calendly URL — either a real scheduling link or
    no link.
11. No custom cursor.

## Enforcement
- `npm run verify:copy` mechanically enforces rules 1 and 2 (the phone
  number and solo-studio positioning) by scanning `app/` and `src/`.
- `content/` is deliberately exempt from that scan: the blog articles say
  "one person" as advice to the reader about *their* business, which is not
  a claim about MGRTECH.
- The rest of the rules above depend on whoever is editing the code having
  read them here — there is no linter for them yet.

## Authority
`docs/superpowers/specs/2026-08-25-mgrtech-site-rebuild-design.md` is the
design/spec source of truth for this rebuild. When this file and the spec
disagree, the spec wins and this file should be corrected.

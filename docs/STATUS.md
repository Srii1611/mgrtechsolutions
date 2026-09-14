# MGRTECH Site — Current Status

**Updated:** 2026-09-14
**Live:** https://www.mgrtechsolutionsinc.com (Vercel, deploys from `main`)
**Spec (authority):** `docs/superpowers/specs/2026-08-25-mgrtech-site-rebuild-design.md`

> **Read this first.** This file is the current state of the site. The spec is
> the design authority; this is what has actually shipped and what is left.

---

## Where the site stands

The rebuild is **done and live**. All nine spec phases shipped and the domain
cutover is complete — `mgrtechsolutionsinc.com` serves the Next.js build, not
the old Vite SPA.

**Routes live:** `/` · `/about` · `/blog` (132 posts, 6 categories) · `/contact` ·
`/faq` · `/pricing` (+ `/website-cost`, `/seo`, `/social`) · `/process` ·
`/services` · `/work`

**Health:** 112 tests passing (7 files) · `verify:copy` passing · `next build`
clean, 157 static pages.

---

## Changed on 2026-09-14 (`single-page-homepage` branch, uncommitted)

**Homepage Section 02 is now service-led.** The three outcome stages (Get
Found / Get Chosen / Get Followed Up) became five named services, in this
order: 01 Website Design & Development · 02 SEO · 03 Google Ads & PPC ·
*hinge band* · 04 AI Automation · 05 Social Media & Content. E-commerce is
deliberately left off the homepage.

1. **Layout and motion kept.** Same beam, stage dots, sticky numerals, hinge
   band, "What we build" cards, cost line and sources. Each stage was cut to
   two paragraphs to offset the extra length.
2. **Existing copy moved, not rewritten.** The map-box stats sit under SEO,
   the review stats under Website, the missed-call and 5-minute figures under
   AI Automation — sources travelled with them. The SEO "What we build" list
   is unchanged word for word.
3. **Ads and Social carry no statistics.** None of the traced research is
   about them; their `sources` are empty and the attribution line is hidden.
   Their copy comes from `seo-packages.ts` and `social-packages.ts` and quotes
   no prices (PRICING says those are quoted on the call).
4. **Phone scenes.** Segment A now runs three scenes in thirds (website
   comparison → map-box climb → new *sponsored ad + incoming call*); segment B
   runs two (missed-call text-back → new *feed filling with posts*). Each
   scene receives its own 0→1 progress. Mobile gained static `ads` and
   `social` screens in `PhoneMock.tsx`.
5. **No per-service links.** `/services` redirects to `/` on this branch, so
   the stages link nowhere; the section keeps `id="services"` for the nav.
6. **"SECTION 0N · …" band labels removed** from every homepage section, at
   Srii's request — they read as AI-generated scaffolding. `Band` now only
   sets the background; `SectionDivider.tsx` and `BANDS` were deleted, since
   nothing else used them. Do not reinstate.
7. **Fixed ~20px horizontal overflow at 375px** in the Work grid. The grid's
   implicit `auto` column couldn't shrink below each card's chrome bar; it is
   now `grid-cols-1` (`minmax(0, 1fr)`), and the domain label got `min-w-0`
   so `truncate` works.

---

## Changed on 2026-09-05

Merged `fix/stat-sourcing` into `main`. Three commits:

1. **Every homepage statistic now carries a source.** Figures live in
   `src/data/home.ts` with a `sources:` array beside the claim.
2. **Two claims removed** because they did not survive being traced — a Drift
   number measured on B2B SaaS companies, and a survey finding that had been
   restated into something it never said. Both had been live for months.
3. **Missed-call figure reframed** across two studies (411 Locals 2024 for small
   businesses generally, Invoca 2023 for home services specifically) rather than
   resting on one.
4. **Hero headline changed** to *"You've paid for a website before. / It looked
   fine. It never rang."*
5. **New guard in `scripts/verify-copy.mjs`** — warns when a string of 60+ chars
   in `src/data/*.ts` contains a percentage or an "N times more likely"
   construction with no `sources`/`proofSource` key in the same export block.
   It checks that attribution *exists*, not that it is correct. That part is a
   reading job.

**Decisions taken the same day, so they are not re-litigated:**
- A second hero "kicker" line was written and **dropped** — it said nearly the
  same thing as the new headline, and two competing hooks above the fold weaken
  each other.
- A `/mockup` homepage prototype was built as a throwaway and **deleted**. It is
  not coming back. Ignore any reference to it.

---

## Still open

| Item | Detail |
|---|---|
| **Real pricing** | Still `$X,XXX` placeholders in `src/data/pricing-page.ts`, `home.ts`, `website-cost-guide.ts`. Needs real numbers from Srii. |
| **Resend domain verification** | Leads send from `onboarding@resend.dev`, which **only delivers to the account address**. Verify `mgrtechsolutionsinc.com` in Resend so leads arrive from a branded address. Highest-value open item — it affects whether leads land. |
| **Testimonial permission** | Two quotes run as disclosed placeholders. |
| **Calendly** | No URL exists. Phone is the sole primary CTA. Do not link a placeholder (spec §11). |
| **Logo** | PNG + app icons done. An SVG would be sharper. |
| **Pre-existing lint error** | `src/components/contact/ReviewForm.tsx:22` — `setState` inside an effect. Present on `main` before this work; not a regression. |

---

## Traps for a fresh session

- **The plan checkboxes are stale.** All 226 boxes across `docs/superpowers/plans/`
  read `[ ]` even though the work shipped. Do not read them as outstanding.
  Completion is evidenced by git history and the live site.
- **`C:\Clients\Site Information\app`** is the retired Vite SPA. Reference only,
  never deployed (spec §12). Its duplicated blog content was archived to
  `C:\Clients\_mgrtech_duplicates_archive` on 2026-09-04, so it will not build
  until restored — see that folder's README.
- **`C:\Dev\mgrtech-site` and `C:\Clients\mgrtech-site`** are two checkouts of a
  legacy scaffold repo. Each holds something the other lacks (Dev has a unique
  design spec; Clients has an untracked logo). Neither is safely deletable
  without merging them first. Unresolved.
- **Hard rules live in `CLAUDE.md`** and are machine-enforced: the retired phone
  number `508-306-1802` must appear nowhere, and no copy may claim the company
  is one person. `npm run verify:copy` fails the build on both.

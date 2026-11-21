# MGRTECH Site — Current Status

**Updated:** 2026-11-21 (this branch: `deepa/service-pages`, merged with `main`)
**Live:** https://www.mgrtechsolutionsinc.com (Vercel, deploys from `main`)
**Spec (authority):** `docs/superpowers/specs/2026-08-25-mgrtech-site-rebuild-design.md`

> **Read this first.** This file is the current state of the site. The spec is
> the design authority; this is what has actually shipped and what is left.
>
> **Committed and pushed to `main` on 2026-09-13.** Verify the live site
> against `git log` if you need to confirm Vercel has deployed the latest
> commit — this file doesn't track deploy status.

---

## Where the site stands

The original nine-phase rebuild shipped and the domain cutover is complete —
`mgrtechsolutionsinc.com` serves the Next.js build, not the old Vite SPA. A
second restructure landed 2026-09-13 (see below): `/work` and `/pricing` were
retired as standalone routes, Services absorbed the pricing content and grew
to six topics, and Contact grew from two doors to four.

**Routes on this branch:** `/` · `/about` · `/blog` (53 posts, 6 categories) ·
`/contact` · `/faq` · `/industries` · `/process` · `/services/*` (six pages)

**Retired:** `/work` and `/pricing` (+ `/website-cost`, `/seo`, `/social`) no
longer exist as routes — see "Changed on 2026-09-13" below for where their
content went. The pricing task (Nov 21) brings a new `/pricing` back.

**Production differs:** `main` still 307s the sales pages to `/` (its
`GATED_ROUTES` in `next.config.ts`). This branch drops that list so the pages
can be built and previewed. Decide what stays gated when this merges to `main`.

**Health:** 112 tests passing (7 files) · `verify:copy` passing · `next build`
clean, 146 static/SSG pages.

---

## Changed on 2026-09-13 (navigation, industries, and card polish)

1. **Fixed nav clicks not scrolling.** Next's `<Link>` is a no-op when the
   href matches the current URL exactly, so clicking a nav item while
   already on that page did nothing. `navbar-mgrtech.tsx` now runs every
   nav click (top-level and dropdown) through a shared handler that detects
   the same-page case, `preventDefault()`s, and scrolls via the shared Lenis
   instance (`src/lib/lenis-instance.ts`) instead. `SmoothScroll.tsx` gained
   a companion effect that lands on the right spot (a hash target, or the
   top) on every genuine route change too.
2. **Services and Industries are now dropdowns in the nav.** Clicking the
   label still opens the full page; a separate chevron (and hovering the
   group) reveals the sub-sections, each linking to an anchor on that page
   (`/services#seo`, `/industries#auto-motorsports`, etc.) via the same
   click handler above.
3. **Industries' 4 cards are now expand-in-place accordions**, not links to
   `/contact`. Clicking a card reveals original, purpose-written content
   (an intro paragraph + 4 bullet points) per industry — checked against
   a competitor's industries page for anything to reference and found
   nothing substantive there to copy, so this is authored fresh. Arriving
   via the new nav dropdown auto-opens the matching card.
4. **Services' SEO cards now show a concrete example** under each title
   (e.g. `"best plastering job in Framingham"` for the local-SEO card), and
   the AI & Search card's title reverted to "Getting found when customers
   ask AI, not Google" per feedback.
5. **Removed duplicate eyebrow/breadcrumb text** on Services, Industries,
   Contact, Process, and the Blog index — each previously repeated the same
   word the breadcrumb directly above it already said (e.g. breadcrumb
   "SERVICES" immediately followed by an eyebrow reading "— SERVICES";
   Process's "— THE PROCESS" against a "PROCESS" breadcrumb was the same
   pattern with an extra "THE"). About and FAQ were left alone since their
   eyebrows say something different ("THE STUDIO", "FREQUENTLY ASKED").
6. **About's "Four Rules" cards** now read in sentence case ("Honesty over
   impressiveness") instead of all-caps ("HONESTY OVER IMPRESSIVENESS").

---

## Changed on 2026-09-13 (copy and design polish pass)

A site-wide content and consistency pass, on top of the restructure below.

1. **Fixed a real numbering bug.** The homepage's visible "SECTION 0N" band
   labels (`BANDS` in `src/data/home.ts`) started at 02, not 01, because the
   Hero section has no band of its own. Renumbered 01 through 07.
2. **Fixed a real content gap on `/process`.** The homepage correctly
   itemizes the 90-minute client time budget as 60 (call) + 15 (preview
   review) + 15 (refine review). `/process`'s own `WEEK_TIMELINE` only
   surfaced one 15-minute touchpoint and buried the second inside a
   "Week 3–4 Build" step chipped `0 MIN`, so its own chips summed to 75, not
   90. Split into separate Week 3 (Build) and Week 4 (Review and refine)
   steps so the two pages now agree.
3. **Removed every em dash from rendered site copy** (kept the leading
   `— LABEL` eyebrow/kicker convention, which is a deliberate visual marker
   applied identically on every page, not a sentence-joining dash). Replaced
   mid-sentence dashes with periods, commas, or colons depending on what
   read most plainly. Scope: `home.ts`, `services.ts`, `industries.ts`,
   `process.ts`, `about.ts`, `faq.ts`, `blog-categories.ts`, every
   `app/**/page.tsx` metadata description, and inline copy across
   `contact/*.tsx`, `home/Stages.tsx`, `home/StageSegment.tsx`,
   `navbar-mgrtech.tsx`, and the blog route chrome. The 4 retired `/pricing`
   data files were left alone (confirmed dead, not rendered anywhere).
4. **Rewrote casual/jargon copy.** Dropped the word "system" from the
   Services and Industries hero copy; rewrote the homepage's "HOW THE WORK
   ACTUALLY WORKS" kicker; removed redundant one-line taglines that added
   ambiguity without new information (`HERO.strapline` on the homepage,
   `PROCESS_HERO.countdown.caption`, About's `headlineAccent: 'On purpose.'`,
   Contact's rhetorical `"None of them are a form you'll regret."`).
5. **Services pillars now show their full title**, not just "PART 0N" — each
   pillar's `eyebrow` is now e.g. `'PART 01 · WEBSITE DESIGN & DEVELOPMENT'`.
6. **Removed the 5 connector strips** between Services pillars
   ("EVERYTHING FEEDS THE PHONE" etc.) — bare text banners with no other
   content. `Connector.tsx` deleted, confirmed unused elsewhere.
7. **Services' 3 SEO "fan cards" are real, clickable links now.** They used
   to be static text with invented read-times and no `href`. Each now links
   to a real post via `getPost()` in `src/lib/blog.ts` (so title/read-time
   never drift from the actual article): local keyword research, the
   "phone stopped ringing" lead-loss post, and the ChatGPT recommendation
   post. One of the original 3 card topics ("plastering job cost in
   Framingham") had no matching post anywhere in the 132 articles and was
   rewritten around a real Local SEO post instead of left dangling.
8. **Contact page now frames the "already have a site?" choice** explicitly
   in the hero lede, ahead of the 4-option card grid.
9. **Blog now matches the site's dark-hero theme.** All three blog routes
   (`/blog`, `/blog/category/[slug]`, `/blog/[slug]`) previously used a
   different, lighter hero shell with no breadcrumb and no accent-span
   headline. Rebuilt to the same `dot-grid on-dark bg-forest-950` shell as
   every other page. Also fixed two instances of a card sitting at the same
   background shade as its section (invisible layering): the blog index's
   category tiles and the category/article pages' `ArticleCard` grids.
   Rewrote the 6 category taglines from casual sentence fragments to plain,
   complete descriptions.

**Known inconsistency, flagged rather than fixed (not clearly in scope of
this pass):** the homepage's own closing CTA (`DUAL_CLOSE` in `home.ts`)
still says "TWO WAYS TO START" (call or free review), while `/contact` now
offers four ways (call, review, quote, referral). Both are internally
correct for their own scope, but a visitor bouncing between the two pages
could notice the count differs. Worth a decision: either the homepage CTA
stays intentionally minimal (2 of the 4, the two lowest-commitment options),
or it should be updated to mention all 4.

---

## Changed on 2026-09-13 (restructure)

A site-wide restructure: nav trimmed to Home / Services / Industries / Process
/ Blog / About / FAQ / Contact.

1. **`/work` retired.** Its 7-project grid and LIVE/DEMO legend already
   overlapped the homepage's own portfolio section (`WorkSection.tsx`), which
   showed only 5 of the 7. The 2 missing projects (Chaubandi Boutique, Route
   126 Exotic Puppies) were added to `src/data/work-showcase.ts` so the
   homepage now shows all 7, and the homepage's "See all projects" button
   (which pointed at `/work`) was removed since there's nowhere left to link
   to. `src/components/work/WorkHero.tsx`, `LegendStrip.tsx`, `CaseBlocks.tsx`,
   and `EighthSlot.tsx` were deleted; `WorkShowcaseGrid`/`WorkShowcaseCard`
   stayed, since the homepage depends on them.
2. **`/pricing` and its 3 sub-pages retired**, folded into an expanded
   `/services`. Their data files (`pricing-page.ts`, `website-cost-guide.ts`,
   `seo-packages.ts`, `social-packages.ts`) stayed in the repo as source data
   for the new Services pillars, no longer route-backed.
3. **Services grew from 3 pillars to 6**: Website Design & Development, SEO,
   E-commerce, Google Ads & PPC, Social Media Management, and AI Automation —
   one page, six anchor-linked sections, same `SystemStrip` card pattern
   extended to 6 cards. **E-commerce copy is drafted, not sourced** — no
   existing material existed anywhere in the codebase for it; flagged in
   `src/data/services.ts` for Srii's review before treating it as final.
4. **Contact grew from two doors to four**: Talk to a Human, Free Site Review
   (both pre-existing), plus new Request a Quote (`QuoteForm.tsx`, posts to
   new `/api/quote`) and Refer & Earn (`ReferEarn.tsx`, deliberately generic
   placeholder copy — no referral reward/terms exist yet, and none were
   invented). A **"Book a Slot" scheduling option was deliberately left out**
   — no real booking link exists, and CLAUDE.md rule 10 forbids linking a
   placeholder one. Add it once a real link exists.
5. **Card hover/click pass**: Industries' 4 audience cards now link to
   `/contact` with the `SystemStrip` hover-border treatment (previously
   static, non-clickable). New Social Media pricing-tier cards on Services
   got the same treatment.
6. **Two dangling links fixed** as a side effect of the routes above:
   `src/data/process.ts`'s "See pricing" CTA and the homepage's
   `PricingPreview.tsx` CTA both pointed at the now-gone `/pricing` — both
   repointed to `/services`.

**Known pre-existing issue, not touched by this pass:** the homepage's
`WORK.legend`/lede text in `src/data/home.ts` says "three live, two demos,"
which was already stale before this change (the data has always had more
than 2 non-live entries) and is now more visibly wrong with 7 tiles instead
of 5. Worth a copy pass.

---

## Changed on 2026-11-20

**Blog cut from 132 posts to 53.** The 132 were rewrites of other sites'
articles, which Google's spam policy (scraping / scaled content) targets, and
most were generic explainers that AI Overviews now answer on the results page.
Kept: posts that support a page we sell (service pages, industry hubs,
pricing, process, FAQ) plus Srii's picks. Retired: 79.

1. Retired markdown moved to `content/blog-retired/` — not built, not deleted.
2. Each retired URL 308-redirects (permanent) to the closest kept post or its
   category page. The map is `src/data/retired-posts.ts`, read by
   `next.config.ts`; `retired-posts.test.ts` fails if a target stops existing.
3. To restore a post: move it back to `content/blog/` and delete its entry.
4. Next: Deepa adds "Related guides" blocks linking service/industry pages to
   their posts; kept posts get rewritten in Srii's voice over time; n8n refresh
   drafts go through a PR, never straight to `main`.

---

## Changed on 2026-11-10

**Mobile animation timing (below `lg`).**

1. **Stage phones retimed.** `StagePhone` now scrubs from `start 70%` to
   `end 45%`, with no spring. The old window finished before the phone was
   fully on screen at 375x667, and the spring kept it moving about 0.8s after
   scrolling stopped.
2. **Proof tiles start only once their screenshot is decoded.** On a slow
   connection the transition could end before the image arrived.
3. **Proof window is 20rem below `lg`** (500px on desktop). At phone width
   Master Tile had only 39px to travel in a 500px window.

---

## Changed on 2026-11-09

**Footer social buttons added** for Instagram, Facebook and LinkedIn. URLs live
in `SOCIAL` in `src/data/site.ts`, which drives both the footer
(`SocialLinks.tsx`) and the `sameAs` list in the `ProfessionalService` schema.
Icons are inline SVG because `lucide-react` 1.x has no brand icons.

**Mobile motion pass (below `lg`).**

1. **Animated phones on mobile.** Each stage now has an inline `StagePhone`
   running the same scenes as the desktop pinned phone, scrubbed by its own
   trip up the viewport. Stage 01 gained a phone. The static `PhoneMock.tsx`
   is deleted.
2. **Process section is a swipe track below `lg`.** Cards were all taller than
   the visible area, so the pinned stack covered their bottoms before they
   could be read. CSS scroll-snap plus a `view(inline)` timeline. Desktop keeps
   the sticky stack. Homepage at 375px went from 31,318px to 27,667px.
3. **Reveal travels 32px below `lg`** via `--reveal-y` (16px on desktop), and
   "What we build" items stagger in.
4. **Work tiles on touch** now trigger from the frame, not the clipped image,
   so they start when the tile arrives rather than when it is almost centred.

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
| **Real pricing** | Still `$X,XXX` placeholders, now surfaced on `/services` (Web Design pillar) via `src/data/services.ts`'s `PILLAR_WEB_DESIGN.packages`, sourced from `pricing-page.ts`. Needs real numbers from Srii. |
| **E-commerce copy** | `PILLAR_ECOMMERCE` in `src/data/services.ts` is drafted, not sourced — no existing material existed for this topic anywhere in the codebase. Needs Srii's review. |
| **Referral program terms** | `ReferEarn.tsx` on `/contact` runs deliberately generic, non-numeric copy — no reward amount, discount, or conditions have been set. Needs Srii's decision before it can say anything specific. |
| **Resend domain verification** | Leads send from `onboarding@resend.dev`, which **only delivers to the account address**. Verify `mgrtechsolutionsinc.com` in Resend so leads arrive from a branded address. Highest-value open item — it affects whether leads land. This now also covers the new `/api/quote` route. |
| **Testimonial permission** | Two quotes run as disclosed placeholders. |
| **Calendly / booking link** | No URL exists. "Book a Slot" was deliberately left off the 2026-09-13 Contact rebuild for this reason — add it once a real link exists (spec §11). |
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

## Services scroll scenes (branch `feature/scroll-scenes`)

`/services` now renders six pinned, scroll-driven scenes from
`src/components/services/scroll-scenes/`, fed from `src/data/services.ts`
(first four checklist items), each followed by a `ServiceDetails` block with
the specs, packages, tiers and timeline. Section ids are unchanged. Scene
mock colours are `--color-sc-*` tokens in `@theme`. Scene text (competitor
names, review counts, "25 leads", "$60 per lead", "7 calls") is illustrative
placeholder. Copy rewritten in plain language (4 scene checks per service, EXAMPLE label on scenes). OPEN: confirm launch time (15 days vs 5 weeks) before stating it. Each service shows 3 article cards below its scene (no pricing or spec content on this page). Not yet checked in a real browser: Lenis rewind and anchor jumps,
reduced motion, 390px.

Overview cards on /services have drawn-on line icons (ServiceIcon.tsx, all six draw together, static under reduced motion); hero paragraph widened to max-w-3xl.

## Service page and footer changes (2026-11-11)

- **Section bar** (`SectionBar.tsx`, all six service pages; replaces the right-edge dot rail): fixed at the TOP. Hidden at the very top of the page (navbar only). Once scrolled past 80px it shows: scrolling down hides the navbar and the bar sits at the top; scrolling up brings the navbar back with the bar directly under it (`html[data-nav]` set by SectionBar, `[data-site-header]` on `ui/navbar-mgrtech.tsx` slides away). At 1100px and up a centred pill with the current section name and one 26px dot per section (name below a dot on hover or focus); under 1100px five text links, 48px tall, with top safe-area padding. A section jump keeps the navbar hidden so the heading lands clear. Reduced motion: no transitions. Note: `env(safe-area-inset-top)` only has an effect on iPhones if the page sets `viewport-fit=cover`, which the site does not; left alone because it is site-wide.
- **Problem cards slowed** (`website-design.css`, `WdProblems.tsx`, `SpProblems.tsx`): flex .9s, colours .6s, content fade .6s after a .3s delay, 150ms hover delay (cancelled on leave, clicks and keys open at once, timer cleared on unmount). The open card's heading re-wraps once as it opens; that is the only text shift.
- **Footer rebuilt** (`Footer.tsx`, client leaf `FooterPhone.tsx`, styles in `globals.css`): call line, very large one-line number (scales to the row down to 375px, digits appear in sequence once), Call anytime, email, free review link, four columns (Services with direct links to all six pages, Industries, Company, Guides), bottom row with the copyright (double period fixed) and Ashland, MA · Serving MetroWest.
- **Per-page hero backgrounds**: SEO prototype is an artifact (https://claude.ai/artifact/44dgMLNi3wKbRpX9xJ8STY). Nothing in the site code yet; the shared wireframe ball is still used until the SEO one is approved, then the other five follow.

## Hero backdrop on the six service pages

Every service hero (Website Design, SEO, E-commerce, Google Ads, Social Media, AI Automation) uses the home page hero's animation unchanged behind the title: the same `WireframeBall` with its default settings plus the same soft green glow. (Per-service line drawings and a dimmed, resized ball were tried first and removed.) An optional darkened photo can sit under it, like Stambaugh. Code: `HeroBackdrop.tsx`, `src/lib/hero-photo.ts`, CSS appended to `website-design.css` (`wd-bd-*`). The ball pauses off screen and shows one still frame under reduced motion. **To add a photo:** drop `public/hero/<slug>.webp` (slugs: website-design, seo, ecommerce, google-ads, social-media, ai-automation; about 2400 by 1200, under 250 KB, subject on the right) and rebuild; it is picked up automatically. No street addresses, plates or customers' faces. Existing animations were not changed.

## The combined /services page is removed

There is no hub page any more. `/services` redirects (307, temporary) to `/services/website-design` via `next.config.ts`. The navbar Services dropdown links each name to its own page; the Services label itself still points at `/services` (so it stays highlighted on every service page) and lands on Website Design. Deleted with the page: `ServicesHero`, `SystemStrip`, `ServiceCard`, `ServiceIcon`, `ServiceDetails`, `ServicesClose`, `scroll-scenes/services.tsx`. Kept: `src/data/services.ts` (pillar data, still tested) and the scene components. Links that pointed at the old page were repointed (home pricing button and process close go to `/services/website-design#pricing`; the Website Design page's Related links go to the real service pages). If a hub comes back, remove the redirect and re-add `/services` to the sitemap.

## Per-service pages: `/services/website-design` (first of six)

New route `app/services/website-design/page.tsx`, built from the approved
prototype. Copy lives in `src/data/website-design.ts`; components in
`src/components/services/website-design/` (Wd*.tsx, styled by the ported prototype stylesheet `website-design.css`, every class prefixed `wd-`, colours from @theme tokens). Section sizes were checked against the prototype and match within a few pixels except Guides and Comparison (real post titles and reworded freelancer line). Sections, in order: Hero,
Problem (expanding panels), Our approach (reuses the existing pinned
`WebsiteSection` scene), four commitments, What's included (vertical card
deck, 8 areas), How it works (scroll-filled rail), Pricing (Starter /
Standard / Custom), Timeline (15-day to-scale bar), What success looks like
(tickable checklist), Comparison, Who it's for, Industries, Guides, FAQ (11 Qs,
FAQPage JSON-LD), Related services, Close. A desktop-only dot rail
(`WdSectionRail`) shows where you are; section bands alternate plain / tint
(`--color-cream-200`) / dark. Linked from the `/services` Web Design card and a
"See the full Website Design page" link under its scene; added to the sitemap.

**OPEN, needs Srii:**
- All prices are `****` (`PRICE_MASK`). No real amounts exist yet.
- Items marked `CONFIRM` in `website-design.ts` are standard deliverables that
  the live site's tier lists do not state (hand-written code, image
  compression, Core Web Vitals check, rebuild audit and redirects, "no ticket
  system", local pickup or delivery).
- Timeline is the live site's 15 days. `src/data/process.ts` still says five
  weeks and `pricing-page.ts` still says The Site / The System / The Rebuild.
- The other five services (SEO, E-commerce, Google Ads, Social Media,
  Automation) still live only on `/services`. The 12-section template is ready
  to copy. Not yet checked: Lenis rewind of the pinned scene on this route,
  reduced-motion pass, and a screen-reader pass of the deck.

## Per-service pages: the other five (SEO, E-commerce, Google Ads, Social Media, AI Automation)

Routes `/services/seo`, `/services/ecommerce`, `/services/google-ads`, `/services/social-media`, `/services/ai-automation`. Each is a thin `app/services/<slug>/page.tsx` that renders the shared template `src/components/services/service-page/ServicePage.tsx` with one data file from `src/data/service-pages/<slug>.ts` (type: `types.ts`). Same twelve sections, same order, same look as Website Design (it reuses `website-design.css` and the `WdBits` / `ScrollRail` pieces; the Website Design page and its own components were left unchanged). The approach scene on each page is the existing scene for that service (`SeoScene`, `ShopScene`, `AdsScene`, `SocialScene`, `AutoScene`) on the dark band. Hub cards, article rows, navbar dropdown and sitemap link to the new pages. `src/data/service-pages/service-pages.test.ts` checks every page: same section shape, every blog slug resolves, no real prices, no em dashes, no company-size claims.

Pricing shapes follow how each service is sold, with every amount shown as `****`: SEO two monthly plans (Standard, Premium), Google Ads one management plan (ad spend separate, no markup), Social three tiers (Basic, Standard, Growth), AI Automation and E-commerce one "quoted on the call" plan.

**OPEN, needs Srii:** all prices; every line marked `CONFIRM` in the data files; AI Automation has no price or package source in the repo; **E-commerce is drafted** (not on the live site, no source material; platform, timeline and price shape are proposals); timeline phases on every page are proposals (SEO follows our own blog post, not a promise). Competitor research was structure-only; vendor statistics were left out. The live site appears to list website prices; the Website Design page still shows `****` as requested.

Overview cards: hover lift, icon redraw and idle loops, pointer glow, slide-in "See how it works" arrow (ServiceCard.tsx). Hero second line reads "to get more calls, with one point of contact."

## Hero backgrounds (2026-11-11)
- Each service page has its own animated hero drawing (canvas, `service-page/hero-art/painters.ts`, run by `HeroArt.tsx`, chosen in `HeroBackdrop.tsx`). Approved from the HTML previews: SEO = map contours with a pin and ripple; Website Design = a phone that rings; Google Ads = a radar whose blips ring; Social Media = a tilted tile wall with hearts; E-commerce = orders at every hour; AI Automation = messages in, a reply typed at the gate, replies out. They replace the shared wireframe ball.
- The canvas sits above the facts strip (bottom inset in `website-design.css`), fades out toward the title on wide screens, is 60% strength on phones, pauses off screen, and paints one still frame under reduced motion. Colour is read from `--color-accent` at runtime; the mono font from `--font-geist-mono`.

## Phone number on service pages (2026-11-11)
- The number now shows only in the navbar button, the hero button and the big footer number. The FAQ side button is now "Ask a question" (jumps to the closing section); the closing button says "Call us" (tap to call, aria-label keeps the number); the "Phone: ... Email: ..." line is now just the email.

## Section list pilot on Website Design (2026-11-12)
- Pilot on /services/website-design only (SectionBar variant="rail", classes scoped under .wd-rail-on): at 1100px and up an always-open list of all 14 sections on the left (current one highlighted, Pricing and FAQ bold, progress line, a Get a free review button); content is shifted right to stay clear of it. Under 1100px a top strip of swipeable chips (current one auto-centred). The navbar still shows only when scrolling up. The other five service pages keep the top bar. Roll out by passing variant="rail" and adding wd-rail-on to a page.

## Section navigation comparison on the other five pages (2026-11-12)
- Website Design keeps the left-list pilot. SEO = merged header (one slim bar: logo, current section dropdown, Call, Menu; replaces the navbar after the top). Google Ads = collapsible left list on wide screens, a Sections dropdown bar on phones. Social Media = Jump to Pricing / How it works / FAQ / Free review pills in the hero plus the existing top bar. E-commerce and AI Automation unchanged. Chosen per page in NAV_STYLE in ServicePage.tsx; styles in service-page-nav.css; logic in useSectionNav.ts and SectionNav.tsx.
- Website Design phone hero: ripple period is the 5.2 in painters.ts (web, "rings from the call button"); smaller = faster.

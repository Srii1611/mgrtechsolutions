# Next steps and blockers

## Shipped
- All prices come from `src/data/prices.ts`. A test fails if a `$` plus digits appears anywhere else in `app/` or `src/`.
- Contradictions removed: 15 days vs about 5 weeks, hosting in Care plans, SEO and social kept separate.
- Contact page: three options, Cal.com booking, optional phone on both forms, new call hours and reply-time copy, Refer & Earn removed.
- Related guides blocks, a slug-validity test, and optional `updated:` dates on posts.

## Blocker
**The `/pricing` page and "Build your plan" estimator are not built.**
Srii has to choose a phone layout first:
- **A, Steps:** three big-tile steps, one question at a time, total bar pinned at the bottom.
- **B, Receipt:** one scrolling page of switches, live receipt that docks at the bottom and opens on tap.

Mockups: `idea-a-steps.png` and `idea-b-receipt.png` (session scratchpad; ask to re-export if needed).

Until it exists, the "Plan this in the estimator" links on service pages and the home pricing CTA go to `/pricing`, which will 404.

## Questions for Srii
1. Is the Ads Jumpstart ($375) charged per platform, so "both platforms" adds two (2 x $375)? Built this way for now.
2. Does Commerce care ($149/mo) include hosting? Assumed yes.
3. Real "what's included" text for each package. Only facts from the brief are used today (marked `TODO(Srii)`).
4. Social post counts and Website Design package details still come from the old sheet. Confirm or replace.
5. Blog markdown has third-party price examples (for example "$500 website"). They are not our prices and were left alone. Confirm that is fine.

## Remaining work (after Srii picks A or B)
- Build `app/pricing/page.tsx` and the estimator component (NumberFlow, URL state, quoted-items list, monthly/yearly toggle, tap-to-expand includes, website compare view, sticky mobile total bar, Cal link and phone under totals).
- Add the sitemap entry (`sitemap-routes.ts` and its test) and a footer link.
- Check at 375px and 1440px, and confirm reduced motion disables number animation and transitions.
- Check the Cal embed at 375px once a date is picked (inner scrolling not yet verified).

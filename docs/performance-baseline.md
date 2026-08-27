# Performance Baseline — Phase 8

Recorded 2026-08-27, branch `performance`, against a production build
(`npm run build && PORT=3111 npm run start`) on Windows 11, Chrome
(headless, desktop preset, Lighthouse via `npx lighthouse`).

## Image optimization (Task 1)

Source PNGs converted to WebP at quality 85 (dimensions preserved). Quality
was verified by cropping the top 200px of `emanuel-blueboard.png` at native
resolution: the browser-chrome URL bar text, tab title, and nav labels
(HOME / SERVICES / GALLERY / ABOUT / PROCESS / GET A QUOTE) were sharp with
no visible mushiness or ringing. q85 was kept — no need to raise to q90.

`logo-mark.png` was re-encoded in place (`compressionLevel: 9, palette: true`)
and kept only because the result was both smaller and still had an alpha
channel; path and format are unchanged (it's referenced in `src/lib/schema.ts`
three times and in `Header.tsx`).

| File | Before | After | Saved |
|---|---:|---:|---:|
| work/emanuel-blueboard | 1,371,030 B | 60,674 B | 95.6% |
| work/master-tile | 725,238 B | 74,350 B | 89.7% |
| work/lj-landscaping | 1,797,929 B | 179,006 B | 90.0% |
| work/chaubandi-boutique | 674,923 B | 49,098 B | 92.7% |
| work/eurotech-motorsports | 1,570,822 B | 131,624 B | 91.6% |
| work/route126-puppies | 996,386 B | 58,516 B | 94.1% |
| work/fortes-parts | 1,133,872 B | 152,106 B | 86.6% |
| about-portrait | 2,107,736 B | 148,242 B | 93.0% |
| brand/logo-mark.png (in place) | 158,182 B | 49,615 B | 68.6% |
| **Total** | **10,536,118 B** | **903,231 B** | **91.4%** |

`public/` directory total: **11 MB → 922 KB** (`du -sh public`).

All nine images (7 work screenshots, portrait, logo) verified to return
HTTP 200 against a local production server on port 3111.

## Output formats (Task 2)

`next.config.ts` now declares:

```ts
images: {
  formats: ['image/avif', 'image/webp'],
}
```

`unoptimized` is not set, so `next/image` continues to run the built-in
optimizer and will negotiate AVIF where the requesting browser supports it,
falling back to WebP otherwise.

### AboutHero `priority` — kept as-is

`src/components/about/AboutHero.tsx` marks the portrait `<Image priority>`.
The Lighthouse `lcp-breakdown-insight` audit for `/about` identifies the
LCP element directly:

```
selector: div.container-page > div.mt-14 > div.relative > img.w-full
nodeLabel: "The MGRTECH Solutions studio in Ashland, MA"
```

i.e. the portrait `<img>` is the actual LCP element on `/about`, not the
`<h1>`. LCP on that page measured 0.7s with a breakdown of TTFB 5ms +
load delay 7.6ms + **load duration 247.7ms** + render delay 16.3ms — the
image's network fetch is the dominant cost, exactly what `priority`
(which preloads it) is meant to shorten. Removing `priority` would only
add back scheduling delay before the browser even discovers the request.
No change was made to `AboutHero.tsx`.

## Lighthouse — production build, desktop preset

Run against `http://127.0.0.1:3111` (a server started specifically for
this baseline, not the port-3000 instance the site owner was browsing).

| Page | Perf | A11y | Best Practices | SEO | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|
| `/` | 98 | 100 | 100 | 100 | 1.1 s | 0 | 0 ms |
| `/work` | 100 | 100 | 100 | 100 | 0.6 s | 0 | 0 ms |
| `/blog/local-seo-101` | 100 | 94 | 100 | 100 | 0.6 s | 0 | 0 ms |

(`/about` was also run to determine the LCP element for the `priority`
question above: perf 100, LCP 0.7 s.)

### Audits scoring below 0.9

**`/` (home) — perf 98:**
- `unused-javascript` (score 0) — "Reduce unused JavaScript" — est. savings 100 KiB
- `forced-reflow-insight` (score 0) — "Forced reflow" (informational insight, no numeric savings reported)
- `legacy-javascript-insight` (score 0.5) — "Legacy JavaScript" — est. savings 13 KiB
- `network-dependency-tree-insight` (score 0) — "Network dependency tree" (informational)
- `render-blocking-insight` (score 0.5) — "Render-blocking requests" — est. savings 20 ms

**`/work` — perf 100 (informational audits still flagged):**
- `unused-javascript` (score 0) — "Reduce unused JavaScript" — est. savings 119 KiB
- `forced-reflow-insight` (score 0) — "Forced reflow"
- `legacy-javascript-insight` (score 0) — "Legacy JavaScript" — est. savings 13 KiB
- `network-dependency-tree-insight` (score 0) — "Network dependency tree"
- `render-blocking-insight` (score 0.5) — "Render-blocking requests"

**`/blog/local-seo-101` — a11y 94:**
- `label` (score 0) — "Form elements do not have associated labels" — a real accessibility finding worth fixing (a form control on this page, likely the newsletter/contact form in a shared layout component, has no associated `<label>`)
- `unused-javascript` (score 0) — "Reduce unused JavaScript" — est. savings 128 KiB
- `legacy-javascript-insight` (score 0) — "Legacy JavaScript" — est. savings 13 KiB
- `network-dependency-tree-insight` (score 0) — "Network dependency tree"
- `render-blocking-insight` (score 0.5) — "Render-blocking requests"

The `unused-javascript`, `legacy-javascript-insight`,
`network-dependency-tree-insight`, `forced-reflow-insight`, and
`render-blocking-insight` items are Lighthouse "Insights" — informational/
diagnostic audits that always report a low score when there is any
measurable estimate, independent of the numeric category score. They are
noted here as-is per the reporting requirement; none blocked a 90+
category score. The one actionable accessibility finding is the missing
form label on the blog post page — recommended as a Phase 9 fix.

## Notes for Phase 9

- This baseline used a server on port 3111 specifically to avoid disturbing
  the production instance already running on port 3000.
- Lighthouse's own temp-directory cleanup threw a non-fatal `EPERM` on
  Windows after each run (removing `%LOCALAPPDATA%\Temp\lighthouse.*`); the
  JSON report was written successfully before that cleanup step in every
  run, so the numbers above are real measurements, not estimates.

# Image Optimisation and Performance Plan (Phase 8)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Get 11 MB of source images down to well under 1 MB with no visible quality loss, then measure the result with a real Lighthouse run — closing the last technical gap on a site that sells site performance.

**Architecture:** A one-shot conversion script turns the eight heavy PNGs into WebP, references are updated, and `next.config.ts` declares modern output formats. Lighthouse runs against the production build via the Chrome already installed on this machine.

**Tech Stack:** Next.js 16.3, sharp (already a devDependency), Lighthouse via `npx`, Chrome at `C:\Program Files\Google\Chrome\Application\chrome.exe`.

**Spec:** `docs/superpowers/specs/2026-08-25-mgrtech-site-rebuild-design.md`

## Why this phase exists

The spec's §1 lists "16MB of unoptimized images" as one of four defects that made the prior site unshippable. The current repo carries 11 MB, concentrated in eight files. A studio whose pitch is "loads in under 2 seconds, mobile" cannot ship that.

## Measured baseline — validated by the controller before this plan was written

| File | Size |
|---|---|
| `public/about-portrait.png` | 2058 KB |
| `public/work/lj-landscaping.png` | 1756 KB |
| `public/work/eurotech-motorsports.png` | 1534 KB |
| `public/work/emanuel-blueboard.png` | 1339 KB |
| `public/work/fortes-parts.png` | 1107 KB |
| `public/work/route126-puppies.png` | 973 KB |
| `public/work/master-tile.png` | 708 KB |
| `public/work/chaubandi-boutique.png` | 659 KB |
| `public/brand/logo-mark.png` | 155 KB |
| **Total `public/`** | **11 MB** |

Conversion measured on `emanuel-blueboard.png` (1339 KB): **WebP q85 → 59 KB, a 96% reduction.** The controller cropped the top 200px — the browser chrome, URL bar, and nav text, which is the finest text in the set — and confirmed at full magnification that WebP q85 is visually indistinguishable from the PNG. **q85 is the chosen quality; do not go lower without re-checking text legibility.**

## Global Constraints

- **Do not degrade the screenshots visually.** They are portfolio pieces showing client work. The browser chrome and URL bar are deliberate composition — the URL is implicit proof the site is live. Any artefacting on that text is a defect.
- **Image containers are `aspect-[3/2]`** matching the 1536×1024 sources. Do not change them.
- Phone `774-460-1116` via `SITE`; `508-306-1802` nowhere.
- No page asserts a headcount of one.
- No hex in components; `accent-ink` on cream, `accent` on forest.
- Server Components by default.
- `prefers-reduced-motion` disables transforms and transitions.
- All 112 tests keep passing.

## Existing interfaces

- `@/data/home` → `WORK.projects[].image` — the seven `/work/*.png` paths
- `@/data/about` → the portrait path and its alt text
- `src/components/home/WorkSection.tsx`, `src/components/work/CaseBlocks.tsx` — render work images via `next/image` with `fill`, `sizes="(min-width: 768px) 50vw, 100vw"`, `object-cover`
- `src/components/about/AboutHero.tsx` — renders the portrait, currently marked `priority`
- `src/lib/schema.ts` — references `/brand/logo-mark.png` in three places (`image`, `logo`, `publisher.logo.url`)
- `src/components/layout/Header.tsx` — renders `/brand/logo-mark.png` at 32px
- `app/icon.png` (98 KB) and `app/apple-icon.png` (20 KB) are Next file-convention icons — **leave both alone**, they are already small and renaming them breaks the convention

---

### Task 1: Convert the images

**Files:**
- Create: `scripts/optimize-images.mjs`
- Create: `public/work/*.webp` (7), `public/about-portrait.webp`
- Delete: the eight source PNGs they replace
- Modify: `src/data/home.ts`, `src/data/about.ts` (paths), `public/brand/logo-mark.png` (in place)

**Interfaces:**
- Produces: WebP assets and updated paths. No component API changes.

**RULING — WebP replaces the PNGs; `logo-mark.png` stays a PNG.**
The seven work screenshots and the portrait convert to `.webp` and their PNGs are deleted (git history retains the originals). `logo-mark.png` keeps its path and format: it is referenced in three schema fields, and churning those for 155 KB is not worth the risk. Optimise it in place instead.

- [ ] **Step 1: Write the conversion script**

`scripts/optimize-images.mjs` must:
1. Convert each of the seven `public/work/*.png` to `.webp` at quality 85, preserving dimensions.
2. Convert `public/about-portrait.png` to `.webp` at quality 85.
3. Re-encode `public/brand/logo-mark.png` in place as an optimised PNG (`compressionLevel: 9`, `palette: true`) — **but only keep the result if it is smaller AND still has an alpha channel**, since the header sets it on a cream chip and a flattened logo would show a box.
4. Print a per-file before/after table with the percentage saved, and a total.
5. Exit non-zero if any output is larger than its input, or if any conversion fails.

Do NOT delete the source PNGs from inside the script — do that as an explicit step after verifying the output.

- [ ] **Step 2: Run it and report the real numbers**

```bash
node scripts/optimize-images.mjs
```

Paste the full table. Expected total for the eight converted files: roughly 400–600 KB, down from ~10 MB.

- [ ] **Step 3: Verify quality on the finest text before deleting anything**

The screenshots' smallest text is the browser URL bar and nav. Check it survived:

```bash
node -e "
const sharp=require('sharp');
(async()=>{
  await sharp('public/work/emanuel-blueboard.webp')
    .extract({left:0,top:0,width:1536,height:200}).png().toFile('.tmp-check.png');
  console.log('wrote .tmp-check.png');
})();
"
```

Open `.tmp-check.png` and confirm the URL text, tab title, and nav items are sharp with no mushiness or ringing. **If they are not, raise quality to 90 and re-run.** Delete `.tmp-check.png` afterwards. Report what you observed.

- [ ] **Step 4: Update the references**

In `src/data/home.ts`, change the seven `WORK.projects[].image` values from `/work/<name>.png` to `/work/<name>.webp`. In `src/data/about.ts`, change the portrait path to `.webp`. Then:

```bash
grep -rn "work/.*\.png\|about-portrait\.png" src/ app/ || echo "no stale png references"
```

Must print `no stale png references`.

- [ ] **Step 5: Delete the replaced PNGs**

```bash
rm public/work/*.png public/about-portrait.png
ls public/work/
du -sh public
```

- [ ] **Step 6: Verify**

```bash
npx tsc --noEmit && npm run verify:copy && npm test && npm run build
```

All must pass, 112 tests.

Then confirm every image actually resolves on the live server — a 404 here means a broken portfolio:

```bash
npm run start &
sleep 6
for f in emanuel-blueboard master-tile lj-landscaping chaubandi-boutique eurotech-motorsports route126-puppies fortes-parts; do
  echo "$f: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3000/work/$f.webp)"
done
echo "portrait: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3000/about-portrait.webp)"
echo "logo: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3000/brand/logo-mark.png)"
```

All nine must return `200`. Use `127.0.0.1`, not `localhost`. Stop the server afterward.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Convert work screenshots and portrait to WebP

Eleven megabytes of source images down to under a megabyte at quality 85,
verified against the finest text in the set. The logo keeps its PNG path
because three schema fields reference it."
```

---

### Task 2: Output formats and a real Lighthouse run

**Files:**
- Modify: `next.config.ts`, `src/components/about/AboutHero.tsx`
- Create: `docs/performance-baseline.md`

**Interfaces:**
- No API changes.

- [ ] **Step 1: Declare modern output formats**

In `next.config.ts`, add an `images` block declaring `formats: ['image/avif', 'image/webp']` so `next/image` negotiates AVIF where the browser supports it and falls back to WebP. Leave everything else at defaults — do NOT set `unoptimized`.

- [ ] **Step 2: Fix the portrait's LCP priority**

`src/components/about/AboutHero.tsx` marks the portrait `priority`. That was reasonable when it was the page's hero image; verify whether it is genuinely the Largest Contentful Paint element on `/about`. If the `<h1>` is the LCP element (likely — it is large display text above the fold), `priority` on the portrait forces an eager preload that competes with it. Decide based on the Lighthouse run in Step 3, and report your reasoning either way.

- [ ] **Step 3: Run Lighthouse for real**

Chrome is installed at `C:\Program Files\Google\Chrome\Application\chrome.exe`. Run against the **production** build, not dev — dev builds are not representative.

```bash
npm run build
npm run start &
sleep 6
export CHROME_PATH="/c/Program Files/Google/Chrome/Application/chrome.exe"
npx --yes lighthouse http://127.0.0.1:3000/ \
  --only-categories=performance,accessibility,best-practices,seo \
  --preset=desktop --quiet --chrome-flags="--headless=new --no-sandbox" \
  --output=json --output-path=./lh-home.json
```

Repeat for `/work` (the heaviest page) and `/blog/local-seo-101` (a representative article). Then extract and report the four category scores plus LCP, CLS, and TBT for each:

```bash
node -e "
const fs=require('fs');
for (const f of ['lh-home.json','lh-work.json','lh-post.json']) {
  if (!fs.existsSync(f)) continue;
  const r = JSON.parse(fs.readFileSync(f,'utf8'));
  const c = r.categories, a = r.audits;
  console.log(f);
  console.log('  perf', Math.round(c.performance.score*100),
              '| a11y', Math.round(c.accessibility.score*100),
              '| best-practices', Math.round(c['best-practices'].score*100),
              '| seo', Math.round(c.seo.score*100));
  console.log('  LCP', a['largest-contentful-paint'].displayValue,
              '| CLS', a['cumulative-layout-shift'].displayValue,
              '| TBT', a['total-blocking-time'].displayValue);
}
"
```

If Lighthouse cannot run in this environment, say so plainly and report what you measured instead (transferred bytes per page via curl, build output sizes) — do NOT invent scores.

- [ ] **Step 4: Record the baseline**

Write `docs/performance-baseline.md` with: the image before/after table, the Lighthouse scores and metrics for all three pages, and any audit scoring below 0.9 with its actual message. This is the record Phase 9 compares against after deployment.

**Do not chase a perfect score.** Report honestly. If accessibility or SEO is below 100, list exactly which audits failed — those are real findings worth acting on.

- [ ] **Step 5: Clean up and verify**

```bash
rm -f lh-*.json
npx tsc --noEmit && npm run verify:copy && npm test && npm run build
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Declare AVIF/WebP output and record a performance baseline

Real Lighthouse run against the production build, with the numbers
recorded so phase 9 has something to compare against."
```

---

## Definition of Done

- [ ] `public/` total is under 1.5 MB
- [ ] No `.png` remains under `public/work/`, and no stale `.png` reference anywhere in `src/` or `app/`
- [ ] All seven work images, the portrait, and the logo return 200 on the live server
- [ ] The finest text in the screenshots is visually unchanged — checked, not assumed
- [ ] `npm test` passes (112), `npm run build` passes, `verify:copy` and `tsc` clean
- [ ] `next.config.ts` declares `formats: ['image/avif', 'image/webp']` and does NOT set `unoptimized`
- [ ] A real Lighthouse run completed, or its failure stated plainly — no invented scores
- [ ] `docs/performance-baseline.md` records the numbers, including every audit below 0.9
- [ ] `app/icon.png` and `app/apple-icon.png` are untouched

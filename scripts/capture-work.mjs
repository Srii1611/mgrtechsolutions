/**
 * Throwaway: capture full-page screenshots of client sites into public/work/.
 *
 * NOT part of the app bundle. Nothing in src/ or app/ imports this. Run it by
 * hand when a client site changes:
 *
 *   node scripts/capture-work.mjs            # capture every slug with a url
 *   node scripts/capture-work.mjs master-tile  # just one
 *
 * Playwright is the only dependency, and it is a devDependency.
 *
 * WebP encoding is done by Chromium itself via canvas.toDataURL, because
 * Playwright screenshots are PNG or JPEG only and adding an image library
 * would mean a second dependency for one call.
 */
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync, statSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * The capture table. A row with a null `url` is skipped and its existing
 * image is left alone — this script never guesses a URL.
 */
const TARGETS = [
  { slug: 'emanuel-blueboard', url: 'https://www.emanuelblueboardcorp.com/' },
  { slug: 'master-tile', url: 'https://www.mastertileinstallation.com/' },
  { slug: 'lj-landscaping', url: 'https://www.landjlandscapingma.com/' },
  { slug: 'eurotech-motorsports', url: 'https://eurotech-demo.vercel.app/' },
  { slug: 'fortes-parts', url: 'https://site-omega-inky-73.vercel.app/' },
];

const OUT_DIR = 'public/work';
const VIEWPORT_WIDTH = 1920;
const VIEWPORT_HEIGHT = 1080;
const WEBP_QUALITY = 0.76;
const SCROLL_STEP = 800;
const SCROLL_WAIT = 350;
const NAV_TIMEOUT = 60_000;

/** Cookie-consent dismissal. Best effort — a miss must not fail the run. */
const CONSENT_SELECTORS = [
  '#onetrust-accept-btn-handler',
  '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll',
  'button[aria-label="Accept all"]',
  'button[aria-label="Accept"]',
  '[data-testid="accept-all"]',
  '.cc-allow',
  '.cookie-accept',
  'button:has-text("Accept all")',
  'button:has-text("Accept All")',
  'button:has-text("Allow all")',
  'button:has-text("I agree")',
  'button:has-text("Got it")',
  'button:has-text("Accept")',
];

async function dismissConsent(page) {
  for (const selector of CONSENT_SELECTORS) {
    try {
      const el = page.locator(selector).first();
      if (await el.isVisible({ timeout: 400 })) {
        await el.click({ timeout: 1500 });
        await page.waitForTimeout(400);
        return selector;
      }
    } catch {
      // Selector absent, detached, or not clickable. Try the next one.
    }
  }
  return null;
}

/**
 * Full-page capture does not trigger lazy images or scroll-reveal animations
 * on its own — it stitches without ever firing a scroll event, so the tall
 * image comes back as a column of blank placeholders. Walking to the bottom
 * and back is what actually loads the page.
 */
async function scrollThroughPage(page) {
  await page.evaluate(
    async ([step, wait]) => {
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      const height = () =>
        Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
        );

      for (let y = 0; y < height(); y += step) {
        window.scrollTo(0, y);
        await sleep(wait);
      }
      window.scrollTo(0, height());
      await sleep(wait * 2);
      window.scrollTo(0, 0);
      await sleep(wait);
    },
    [SCROLL_STEP, SCROLL_WAIT],
  );

  // Let any image that started decoding on the way down actually finish.
  try {
    await page.waitForLoadState('networkidle', { timeout: 15_000 });
  } catch {
    // A site with a polling widget never reaches networkidle. Not fatal.
  }
}

/**
 * Fixed and sticky elements repeat down a stitched full-page screenshot. The
 * top header is pinned once at the document top so the shot still looks like
 * the real site; everything else fixed — chat bubbles, back-to-top buttons,
 * cookie bars that survived dismissal — is removed.
 */
async function freezeStickyElements(page) {
  return page.evaluate(() => {
    let pinned = 0;
    let hidden = 0;

    for (const el of Array.from(document.querySelectorAll('body *'))) {
      const style = getComputedStyle(el);
      if (style.position !== 'fixed' && style.position !== 'sticky') continue;

      const rect = el.getBoundingClientRect();
      const isTopBar = rect.top <= 200 && rect.height < 400;

      if (isTopBar) {
        el.style.setProperty('position', 'absolute', 'important');
        el.style.setProperty('top', '0px', 'important');
        pinned += 1;
      } else {
        el.style.setProperty('display', 'none', 'important');
        hidden += 1;
      }
    }
    return { pinned, hidden };
  });
}

/** Encode a PNG buffer to WebP using Chromium's own canvas encoder. */
async function encodeWebp(browser, pngBuffer, quality) {
  const page = await browser.newPage();
  try {
    const dataUrl = await page.evaluate(
      async ([b64, q]) => {
        const img = new Image();
        img.src = 'data:image/png;base64,' + b64;
        await img.decode();

        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.getContext('2d').drawImage(img, 0, 0);
        return canvas.toDataURL('image/webp', q);
      },
      [pngBuffer.toString('base64'), quality],
    );

    if (!dataUrl.startsWith('data:image/webp')) {
      throw new Error('Chromium refused to encode WebP');
    }
    return Buffer.from(dataUrl.split(',')[1], 'base64');
  } finally {
    await page.close();
  }
}

/** Read intrinsic dimensions straight out of the WebP header. */
function webpDimensions(buf) {
  const fourcc = buf.toString('ascii', 12, 16);
  const p = 20;
  if (fourcc === 'VP8X') {
    return {
      width: (buf[p + 4] | (buf[p + 5] << 8) | (buf[p + 6] << 16)) + 1,
      height: (buf[p + 7] | (buf[p + 8] << 8) | (buf[p + 9] << 16)) + 1,
    };
  }
  if (fourcc === 'VP8L') {
    const b = buf.readUInt32LE(p + 1);
    return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
  }
  return {
    width: buf.readUInt16LE(p + 6) & 0x3fff,
    height: buf.readUInt16LE(p + 8) & 0x3fff,
  };
}

async function capture(browser, target) {
  const context = await browser.newContext({
    viewport: { width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  try {
    await page.goto(target.url, {
      waitUntil: 'domcontentloaded',
      timeout: NAV_TIMEOUT,
    });

    /*
      Refuse to overwrite a good image with a bad capture. A protected Vercel
      preview answers 200 and then redirects to vercel.com/login, and an auth
      wall is exactly viewport-height — so a naive run silently replaces a
      real screenshot with a picture of a login form. Check the host we
      actually landed on, and that the document is taller than the viewport.
    */
    const landedHost = new URL(page.url()).host;
    const wantedHost = new URL(target.url).host;
    if (landedHost !== wantedHost) {
      throw new Error(`redirected offsite to ${landedHost} — auth wall?`);
    }

    const consent = await dismissConsent(page);
    await scrollThroughPage(page);

    const docHeight = await page.evaluate(() =>
      Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
    );
    if (docHeight <= VIEWPORT_HEIGHT) {
      throw new Error(
        `page is ${docHeight}px, not taller than the ${VIEWPORT_HEIGHT}px viewport — blank or blocked`,
      );
    }

    const frozen = await freezeStickyElements(page);
    await page.waitForTimeout(300);

    const png = await page.screenshot({ fullPage: true, type: 'png' });
    const webp = await encodeWebp(browser, png, WEBP_QUALITY);

    const outPath = join(OUT_DIR, `${target.slug}.webp`);
    writeFileSync(outPath, webp);

    const { width, height } = webpDimensions(readFileSync(outPath));
    const bytes = statSync(outPath).size;

    console.log(
      `  ${target.slug.padEnd(24)} ${width}x${height}  ` +
        `${(bytes / 1024).toFixed(1)} KB  ` +
        `[pinned ${frozen.pinned}, hid ${frozen.hidden}` +
        `${consent ? `, consent via ${consent}` : ''}]`,
    );

    return { slug: target.slug, width, height, bytes };
  } finally {
    await context.close();
  }
}

async function main() {
  const only = process.argv.slice(2);
  const rows = only.length
    ? TARGETS.filter((t) => only.includes(t.slug))
    : TARGETS;

  const withUrl = rows.filter((t) => t.url);
  const skipped = rows.filter((t) => !t.url).map((t) => t.slug);

  mkdirSync(OUT_DIR, { recursive: true });

  if (!withUrl.length) {
    console.log('No targets have a url. Nothing captured.');
    if (skipped.length) console.log('Skipped: ' + skipped.join(', '));
    console.log('\nFill in the `url` fields in TARGETS and re-run.');
    return;
  }

  const browser = await chromium.launch();
  const results = [];
  const failed = [];

  console.log(`Capturing ${withUrl.length} site(s) at ${VIEWPORT_WIDTH}px:\n`);
  try {
    for (const target of withUrl) {
      try {
        results.push(await capture(browser, target));
      } catch (err) {
        failed.push({ slug: target.slug, message: err.message });
        console.log(`  ${target.slug.padEnd(24)} FAILED — ${err.message}`);
      }
    }
  } finally {
    await browser.close();
  }

  if (skipped.length) console.log('\nSkipped (no url): ' + skipped.join(', '));
  if (failed.length) {
    console.log('Failed: ' + failed.map((f) => f.slug).join(', '));
  }

  if (results.length) {
    const total = results.reduce((sum, r) => sum + r.bytes, 0);
    console.log(`\nTotal: ${(total / 1024).toFixed(1)} KB`);
    console.log('\nPaste into src/data/work-showcase.ts:\n');
    for (const r of results) {
      console.log(`  ${r.slug}: width: ${r.width}, height: ${r.height},`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

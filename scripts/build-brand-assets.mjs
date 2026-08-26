#!/usr/bin/env node
/**
 * Derives the site's brand assets from the source logo.
 *
 * The source is a JPEG on a solid white background, so it cannot sit on the
 * forest header without showing a white box. This knocks the white out to
 * transparency, trims to the artwork's real bounds, and emits the sizes
 * Next.js and the browsers want.
 *
 * Run: node scripts/build-brand-assets.mjs
 * This is a one-shot generator, not part of the build. Re-run it only when
 * the source logo changes.
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SOURCE = process.argv[2] ?? 'C:/Clients/mgrtech-site/public/MGRTECH_LOGO.jpg';
const CREAM = { r: 0xfa, g: 0xf6, b: 0xec, alpha: 1 };

/** Pixels at or above this on every channel are treated as background. */
const WHITE_CUTOFF = 238;
/** Below this, the pixel is fully opaque artwork. Between the two we ramp. */
const SOLID_CUTOFF = 200;

async function knockOutWhite(file) {
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const px = Buffer.from(data);
  for (let i = 0; i < px.length; i += info.channels) {
    const r = px[i];
    const g = px[i + 1];
    const b = px[i + 2];
    const lightest = Math.min(r, g, b);

    if (lightest >= WHITE_CUTOFF) {
      px[i + 3] = 0;
    } else if (lightest > SOLID_CUTOFF) {
      // Ramp the alpha across the antialiased edge so it does not look cut out.
      const t = (lightest - SOLID_CUTOFF) / (WHITE_CUTOFF - SOLID_CUTOFF);
      px[i + 3] = Math.round(255 * (1 - t));
    }
  }

  return sharp(px, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
    .png()
    .toBuffer();
}

/** Pads an image to a square canvas with the given background. */
function square(input, size, background, padRatio) {
  const inner = Math.round(size * (1 - padRatio * 2));
  return sharp(input)
    .trim()
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: Math.round((size - inner) / 2),
      bottom: Math.round((size - inner) / 2),
      left: Math.round((size - inner) / 2),
      right: Math.round((size - inner) / 2),
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    // Composite onto a solid tile. A transparent favicon disappears into
    // whatever colour the browser paints its tab strip.
    .flatten({ background })
    .png();
}

async function main() {
  mkdirSync('public/brand', { recursive: true });

  const transparent = await knockOutWhite(SOURCE);

  // The mark itself, transparent, trimmed. Used in the header and footer.
  const trimmed = await sharp(transparent).trim().png().toBuffer();
  const meta = await sharp(trimmed).metadata();
  await sharp(trimmed)
    .resize({ height: 512, fit: 'inside' })
    .png({ compressionLevel: 9 })
    .toFile('public/brand/logo-mark.png');

  // Favicon: the mark on cream. The logo's G and R are near-black and vanish
  // on forest, so the tile matches the light ground the mark was drawn for.
  await square(trimmed, 512, CREAM, 0.10).toFile('app/icon.png');
  await square(trimmed, 180, CREAM, 0.08).toFile('app/apple-icon.png');

  console.log('source artwork bounds:', meta.width + 'x' + meta.height);
  console.log('wrote public/brand/logo-mark.png (transparent)');
  console.log('wrote app/icon.png (512, cream tile)');
  console.log('wrote app/apple-icon.png (180, cream tile)');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

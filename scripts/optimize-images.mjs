// Phase 8 Task 1: convert work screenshots + portrait to WebP (q85),
// re-encode the logo PNG in place only if smaller AND alpha survives.
import sharp from 'sharp';
import { readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const WEBP_QUALITY = 85;

const workFiles = [
  'emanuel-blueboard',
  'master-tile',
  'lj-landscaping',
  'chaubandi-boutique',
  'eurotech-motorsports',
  'route126-puppies',
  'fortes-parts',
].map((name) => `public/work/${name}.png`);

const portraitFile = 'public/about-portrait.png';
const logoFile = 'public/brand/logo-mark.png';

const results = [];
let hadFailure = false;

async function convertToWebp(pngPath) {
  const outPath = pngPath.replace(/\.png$/, '.webp');
  const before = statSync(pngPath).size;
  try {
    const img = sharp(pngPath);
    const meta = await img.metadata();
    await sharp(pngPath).webp({ quality: WEBP_QUALITY }).toFile(outPath);
    const after = statSync(outPath).size;
    const ok = after <= before;
    if (!ok) hadFailure = true;
    results.push({
      file: pngPath,
      out: outPath,
      before,
      after,
      pct: (((before - after) / before) * 100).toFixed(1),
      dims: `${meta.width}x${meta.height}`,
      ok,
    });
  } catch (err) {
    hadFailure = true;
    results.push({ file: pngPath, out: outPath, error: String(err) });
  }
}

async function reencodeLogo(pngPath) {
  const before = statSync(pngPath).size;
  const tmpPath = pngPath + '.tmp-optimized.png';
  try {
    const img = sharp(pngPath);
    const meta = await img.metadata();
    await sharp(pngPath)
      .png({ compressionLevel: 9, palette: true })
      .toFile(tmpPath);
    const afterMeta = await sharp(tmpPath).metadata();
    const after = statSync(tmpPath).size;
    const stillHasAlpha = !!afterMeta.hasAlpha;
    const smaller = after < before;

    if (smaller && stillHasAlpha) {
      const { renameSync } = await import('node:fs');
      renameSync(tmpPath, pngPath);
      results.push({
        file: pngPath,
        out: pngPath,
        before,
        after,
        pct: (((before - after) / before) * 100).toFixed(1),
        dims: `${meta.width}x${meta.height}`,
        ok: true,
        note: 'in-place PNG re-encode kept (smaller + alpha retained)',
      });
    } else {
      const { unlinkSync } = await import('node:fs');
      unlinkSync(tmpPath);
      results.push({
        file: pngPath,
        out: pngPath,
        before,
        after,
        pct: '0.0',
        dims: `${meta.width}x${meta.height}`,
        ok: true,
        note: `re-encode discarded (smaller=${smaller}, hasAlpha=${stillHasAlpha}) — original kept`,
      });
    }
  } catch (err) {
    hadFailure = true;
    results.push({ file: pngPath, out: pngPath, error: String(err) });
  }
}

async function main() {
  for (const f of workFiles) {
    await convertToWebp(f);
  }
  await convertToWebp(portraitFile);
  await reencodeLogo(logoFile);

  console.log('\nFile'.padEnd(38) + 'Before'.padStart(10) + 'After'.padStart(10) + 'Saved'.padStart(10));
  let totalBefore = 0;
  let totalAfter = 0;
  for (const r of results) {
    if (r.error) {
      console.log(`${r.file.padEnd(38)}  ERROR: ${r.error}`);
      continue;
    }
    totalBefore += r.before;
    totalAfter += r.after;
    console.log(
      `${path.basename(r.out).padEnd(38)}${String(r.before).padStart(10)}${String(r.after).padStart(10)}${(r.pct + '%').padStart(10)}${r.note ? '  ' + r.note : ''}`
    );
  }
  const totalPct = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1);
  console.log('-'.repeat(68));
  console.log(`${'TOTAL'.padEnd(38)}${String(totalBefore).padStart(10)}${String(totalAfter).padStart(10)}${(totalPct + '%').padStart(10)}`);

  if (hadFailure) {
    console.error('\nOne or more conversions failed or grew in size.');
    process.exit(1);
  }
}

main();

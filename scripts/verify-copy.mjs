#!/usr/bin/env node
/**
 * Fails on copy that violates the spec's Global Constraints:
 *   - the retired phone number
 *   - any claim that the company is one person (spec §4)
 *
 * Scans app/ and src/ only. content/ is exempt: the 132 articles say
 * "one person" as advice to the reader about their own business, which
 * is not a claim about MGRTECH.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOTS = ['app', 'src'];
const EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.css', '.mdx']);

const RULES = [
  {
    name: 'retired phone number',
    re: /\+?1?[-.\s]?508[-.\s]?306[-.\s]?1802/i,
    fix: 'Use SITE.phone / SITE.phoneHref from @/data/site (774-460-1116).',
  },
  {
    name: 'solo-studio positioning',
    re: /\bone[-\s]person\b|\bone person\b|\bsolo\s+(studio|shop|operator)\b|PERSON ON THE PHONE/i,
    fix: 'Sell one point of contact and no handoffs, never company size. See spec §4.',
  },
];

function walk(dir) {
  let out = [];
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (entry === 'node_modules' || entry === '.next') continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out = out.concat(walk(full));
    else if (EXTS.has(extname(full))) out.push(full);
  }
  return out;
}

const violations = [];
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const lines = readFileSync(file, 'utf8').split(/\r?\n/);
    lines.forEach((line, i) => {
      for (const rule of RULES) {
        if (rule.re.test(line)) {
          violations.push({ file, line: i + 1, rule, text: line.trim() });
        }
      }
    });
  }
}

/**
 * Unsourced statistics.
 *
 * On 2 Sep 2026 the homepage published fifteen figures with no attribution,
 * two of which did not survive being traced (a Drift number measured on B2B
 * SaaS companies, and a survey finding that had been restated into a claim it
 * never made). Both had been on the live site for months. This is the guard
 * that stops it happening twice.
 *
 * Scope is deliberately narrow, because the cost of a false positive here is
 * an ignored linter:
 *   - Only `src/data/*.ts`, where the copy lives.
 *   - Only prose. A claim is a string of 60+ characters containing a percentage
 *     or an "N times more likely" construction. Short labels are exempt, which
 *     is what keeps "100% YOURS" and "20% deposit secures the start date" out.
 *   - Satisfied by ANY `sources`/`proofSource` key in the same `export const`
 *     block. It checks that attribution exists, not that it is correct — no
 *     linter can do the second part. That is a reading job.
 *
 * Warns rather than fails: a missing citation is a research task, not a broken
 * build, and blocking a deploy on it would get the rule deleted.
 */
const STAT_PROSE = /(\d{1,3}(?:\.\d+)?\s?%|\b\d{1,3}\s?(?:times|x)\s+more\s+likely)/i;
const MIN_PROSE = 60;
const warnings = [];

for (const file of walk('src/data')) {
  const src = readFileSync(file, 'utf8');
  // Split on top-level `export const NAME =` so a claim is checked against the
  // sources of its own block, not a neighbour's.
  const blocks = src.split(/^export const /m);
  let offset = 0;

  for (const [b, block] of blocks.entries()) {
    const startLine = src.slice(0, offset).split(/\r?\n/).length;
    offset += block.length + (b === 0 ? 0 : 'export const '.length);
    if (b === 0) continue;

    const name = block.match(/^(\w+)/)?.[1] ?? '(anonymous)';
    if (/\bsources\s*:|\bproofSource\s*:/.test(block)) continue;

    block.split(/\r?\n/).forEach((line, i) => {
      // String literals only, and only ones long enough to be a sentence.
      for (const [, lit] of line.matchAll(/['"`]([^'"`]{60,})['"`]/g)) {
        if (lit.length >= MIN_PROSE && STAT_PROSE.test(lit)) {
          warnings.push({
            file,
            line: startLine + i,
            block: name,
            text: lit.slice(0, 96) + (lit.length > 96 ? '…' : ''),
          });
        }
      }
    });
  }
}

if (warnings.length > 0) {
  console.warn(`\n⚠ ${warnings.length} statistic(s) published without a source:\n`);
  for (const w of warnings) {
    console.warn(`  ${w.file}:${w.line}  [${w.block}]`);
    console.warn(`    ${w.text}`);
  }
  console.warn(
    `\n  → Trace each figure to its primary source, then add a 'sources' array\n` +
      `    to that block. Cite the study, not the blog that relayed it — the\n` +
      `    lead-response numbers alone circulate under four different names.\n`,
  );
}

if (violations.length > 0) {
  console.error(`\n✖ ${violations.length} copy violation(s):\n`);
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}  [${v.rule.name}]`);
    console.error(`    ${v.text}`);
    console.error(`    → ${v.rule.fix}\n`);
  }
  process.exit(1);
}

console.log(
  warnings.length > 0
    ? `✓ copy checks passed (${warnings.length} unsourced stat warning(s) above)`
    : '✓ copy checks passed',
);

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
    re: /508[-.\s]?306[-.\s]?1802|\+?15083061802/i,
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

if (violations.length > 0) {
  console.error(`\n✖ ${violations.length} copy violation(s):\n`);
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}  [${v.rule.name}]`);
    console.error(`    ${v.text}`);
    console.error(`    → ${v.rule.fix}\n`);
  }
  process.exit(1);
}

console.log('✓ copy checks passed');

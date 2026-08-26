#!/usr/bin/env node
// Ports the 132 finished articles from Site Information into content/blog/
// with frontmatter (title, category, categorySlug). Article prose is
// otherwise untouched; only the leading H1 line is removed.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const SRC_DIR = 'C:/Clients/Site Information/app/src/content/blog';
const BRIEFS_PATH = 'C:/Clients/Site Information/briefs.json';
const OUT_DIR = path.join(repoRoot, 'content', 'blog');

// The source filename slug and the briefs.json slug disagree for exactly
// one article (filename dropped "webiq"); this file:slug map fixes only
// that one file and does not alter the port's fail-loudly behavior for
// any other unmatched slug.
const FILENAME_SLUG_OVERRIDES = {
  'what-to-expect-website-build-process': 'what-to-expect-webiq-website-build-process',
};

const CATEGORY_NAME_TO_SLUG = {
  'AI & Search': 'ai-search',
  'Business Growth': 'business-growth',
  'Content Marketing': 'content-marketing',
  'Lead Generation': 'lead-generation',
  'Local SEO': 'local-seo',
  'Website Performance': 'website-performance',
};

function fail(msg) {
  console.error(`ERROR: ${msg}`);
  process.exit(1);
}

function escapeDoubleQuotes(s) {
  return s.replace(/"/g, '\\"');
}

function main() {
  if (!fs.existsSync(BRIEFS_PATH)) fail(`briefs.json not found at ${BRIEFS_PATH}`);
  const briefs = JSON.parse(fs.readFileSync(BRIEFS_PATH, 'utf8'));
  const slugToCategory = new Map();
  for (const b of briefs) {
    if (!b.slug || !b.category) fail(`briefs.json entry missing slug/category: ${JSON.stringify(b)}`);
    slugToCategory.set(b.slug, b.category);
  }

  if (!fs.existsSync(SRC_DIR)) fail(`source directory not found: ${SRC_DIR}`);
  const files = fs.readdirSync(SRC_DIR).filter((f) => f.endsWith('.md'));
  if (files.length === 0) fail('no .md files found in source directory');

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const counts = new Map();
  let written = 0;

  for (const file of files) {
    const slug = path.basename(file, '.md');
    const srcPath = path.join(SRC_DIR, file);
    const raw = fs.readFileSync(srcPath, 'utf8');

    const lines = raw.split(/\r?\n/);
    let h1Index = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().length === 0) continue;
      if (lines[i].startsWith('# ')) {
        h1Index = i;
      }
      break;
    }
    if (h1Index === -1) fail(`no leading H1 found in ${file}`);

    const title = lines[h1Index].replace(/^#\s+/, '').trim();
    if (!title) fail(`empty title extracted from ${file}`);

    const briefSlug = FILENAME_SLUG_OVERRIDES[slug] ?? slug;
    const category = slugToCategory.get(briefSlug);
    if (!category) fail(`no brief entry (category) found for slug "${slug}" (file ${file})`);

    const categorySlug = CATEGORY_NAME_TO_SLUG[category];
    if (!categorySlug) fail(`unmapped category name "${category}" for slug "${slug}"`);

    // Remove the H1 line and any immediately following blank lines.
    let bodyLines = lines.slice(h1Index + 1);
    while (bodyLines.length > 0 && bodyLines[0].trim() === '') {
      bodyLines.shift();
    }
    const body = bodyLines.join('\n').replace(/\s+$/, '') + '\n';

    const frontmatter = [
      '---',
      `title: "${escapeDoubleQuotes(title)}"`,
      `category: "${escapeDoubleQuotes(category)}"`,
      `categorySlug: "${categorySlug}"`,
      '---',
      '',
    ].join('\n');

    const outPath = path.join(OUT_DIR, `${slug}.md`);
    fs.writeFileSync(outPath, frontmatter + body, 'utf8');

    counts.set(category, (counts.get(category) ?? 0) + 1);
    written += 1;
  }

  console.log(`Wrote ${written} files to ${path.relative(repoRoot, OUT_DIR)}`);
  console.log('Per-category counts:');
  for (const [cat, count] of counts) {
    console.log(`${cat}: ${count}`);
  }
}

main();

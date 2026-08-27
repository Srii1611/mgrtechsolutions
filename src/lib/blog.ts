import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type BlogHeading = { depth: 2 | 3; text: string; id: string };

export type Post = {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  excerpt: string;
  readTime: number;
  headings: BlogHeading[];
  body: string;
  seoTitle: string;
  metaDescription: string;
  datePublished?: string;
};

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');
const WORDS_PER_MINUTE = 225;
const EXCERPT_MAX_LENGTH = 280;
const SEO_TITLE_MAX = 60;
const META_DESCRIPTION_MAX = 155;

export function truncateAtWordBoundary(text: string, max: number): string {
  if (text.length <= max) return text;
  const truncated = text.slice(0, max);
  const lastSpace = truncated.lastIndexOf(' ');
  const boundary = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated;
  return `${boundary.replace(/[.,;:!?-]+$/, '')}…`;
}

const SEO_TITLE_STOP_WORDS = new Set([
  'to',
  'and',
  'the',
  'a',
  'an',
  'or',
  'of',
  'for',
  'in',
  'on',
  'with',
  'that',
  'how',
  'is',
  'are',
  'can',
  'but',
  'as',
  'at',
  'by',
  'from',
  'your',
  'its',
  'it',
  '—',
  '–',
  '&',
]);

function trimStopWords(s: string): string {
  const words = s.split(/\s+/).filter(Boolean);
  while (
    words.length > 1 &&
    SEO_TITLE_STOP_WORDS.has(words[words.length - 1].toLowerCase().replace(/[^a-z—–&]/g, ''))
  ) {
    words.pop();
  }
  return words.join(' ').replace(/[\s:;,—–-]+$/, '');
}

function truncateSeoSegment(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const sp = cut.lastIndexOf(' ');
  const base = sp > 15 ? cut.slice(0, sp) : cut;
  return `${trimStopWords(base)}…`;
}

function deriveSeoTitle(title: string): string {
  if (title.length <= SEO_TITLE_MAX) return title;

  const colonIndex = title.indexOf(': ');
  if (colonIndex > 0) {
    const segment = title.slice(0, colonIndex);
    const rest = title.slice(colonIndex + 2);
    if (segment.length >= 25 && segment.length <= SEO_TITLE_MAX) {
      return segment;
    }
    if (segment.length >= 10) {
      const room = SEO_TITLE_MAX - segment.length - 2;
      if (room >= 12) {
        return `${segment}: ${truncateSeoSegment(rest, room)}`;
      }
      return truncateSeoSegment(title, SEO_TITLE_MAX);
    }
  }

  return truncateSeoSegment(title, SEO_TITLE_MAX);
}

function deriveMetaDescription(excerpt: string): string {
  return truncateAtWordBoundary(excerpt, META_DESCRIPTION_MAX - 1);
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Strips fenced code blocks (``` or ~~~ fences) so their contents are
 * never mistaken for headings. */
function stripCodeFences(body: string): string {
  return body
    .replace(/```[\s\S]*?```/g, (match) => match.replace(/[^\n]/g, ' '))
    .replace(/~~~[\s\S]*?~~~/g, (match) => match.replace(/[^\n]/g, ' '));
}

function extractHeadings(body: string): BlogHeading[] {
  const withoutFences = stripCodeFences(body);
  const lines = withoutFences.split(/\r?\n/);
  const headings: BlogHeading[] = [];
  const idCounts = new Map<string, number>();

  for (const line of lines) {
    const match = /^(##|###)\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const depth = (match[1].length === 2 ? 2 : 3) as 2 | 3;
    const text = match[2].trim();
    if (!text) continue;

    let id = slugifyHeading(text);
    const count = idCounts.get(id) ?? 0;
    idCounts.set(id, count + 1);
    if (count > 0) {
      id = `${id}-${count + 1}`;
    }

    headings.push({ depth, text, id });
  }

  return headings;
}

export function stripEmphasis(text: string): string {
  return text
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\*\*([^*]*)\*\*/g, '$1')
    .replace(/\*([^*]*)\*/g, '$1')
    .replace(/__([^_]*)__/g, '$1')
    .replace(/_([^_]*)_/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .trim();
}

function extractExcerpt(body: string): string {
  const withoutFences = stripCodeFences(body);
  const paragraphs = withoutFences.split(/\r?\n\s*\r?\n/);

  let firstParagraph = '';
  for (const para of paragraphs) {
    const trimmed = para.trim();
    if (!trimmed) continue;
    if (/^#{1,6}\s/.test(trimmed)) continue; // skip headings
    firstParagraph = trimmed;
    break;
  }

  const cleaned = stripEmphasis(firstParagraph.replace(/\s+/g, ' '));

  if (cleaned.length <= EXCERPT_MAX_LENGTH) return cleaned;

  const truncated = cleaned.slice(0, EXCERPT_MAX_LENGTH);
  const lastSpace = truncated.lastIndexOf(' ');
  const boundary = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated;
  return `${boundary}...`;
}

function countWords(text: string): number {
  const stripped = stripCodeFences(text);
  const words = stripped.trim().split(/\s+/).filter(Boolean);
  return words.length;
}

function loadPosts(): Post[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));

  const posts: Post[] = files.map((file) => {
    const slug = path.basename(file, '.md');
    const filePath = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);

    if (!data.title || typeof data.title !== 'string') {
      throw new Error(`Blog post "${file}" is missing required frontmatter field "title"`);
    }
    if (!data.categorySlug || typeof data.categorySlug !== 'string') {
      throw new Error(
        `Blog post "${file}" is missing required frontmatter field "categorySlug"`,
      );
    }

    const body = content.trim() + '\n';
    const excerpt = extractExcerpt(body);

    return {
      slug,
      title: data.title,
      category: typeof data.category === 'string' ? data.category : '',
      categorySlug: data.categorySlug,
      excerpt,
      readTime: Math.max(1, Math.round(countWords(body) / WORDS_PER_MINUTE)),
      headings: extractHeadings(body),
      body,
      seoTitle: deriveSeoTitle(data.title),
      metaDescription: deriveMetaDescription(excerpt),
      datePublished: typeof data.datePublished === 'string' ? data.datePublished : undefined,
    };
  });

  posts.sort((a, b) => a.title.localeCompare(b.title));
  return posts;
}

let cachedPosts: Post[] | null = null;

function getCachedPosts(): Post[] {
  if (!cachedPosts) {
    cachedPosts = loadPosts();
  }
  return cachedPosts;
}

export function getAllPosts(): Post[] {
  return getCachedPosts();
}

export function getPost(slug: string): Post | undefined {
  return getCachedPosts().find((p) => p.slug === slug);
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return getCachedPosts().filter((p) => p.categorySlug === categorySlug);
}

export function getRelatedPosts(post: Post, n = 3): Post[] {
  const categoryPosts = getCachedPosts().filter((p) => p.categorySlug === post.categorySlug);
  const currentIndex = categoryPosts.findIndex((p) => p.slug === post.slug);
  if (currentIndex === -1) return [];

  const related: Post[] = [];
  for (let offset = 1; offset <= categoryPosts.length - 1 && related.length < n; offset++) {
    related.push(categoryPosts[(currentIndex + offset) % categoryPosts.length]);
  }
  return related;
}

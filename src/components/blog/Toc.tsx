import type { BlogHeading } from '@/lib/blog';

/**
 * Table of contents built from the post's extracted headings.
 * `showLabel` is disabled when this is nested inside a `<details>` whose
 * `<summary>` already announces "On this page" (the mobile layout).
 */
export default function Toc({
  headings,
  showLabel = true,
}: {
  headings: BlogHeading[];
  showLabel?: boolean;
}) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page" className="lg:sticky lg:top-24">
      {showLabel ? <p className="eyebrow text-ink-soft">On this page</p> : null}
      <ul className="mt-4 space-y-2 border-l border-cream-300 pl-4 text-[0.9375rem]">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.depth === 3 ? 'pl-4' : undefined}>
            <a href={`#${heading.id}`} className="text-ink-soft transition-colors hover:text-accent-ink">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

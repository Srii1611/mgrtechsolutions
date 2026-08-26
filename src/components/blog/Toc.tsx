import type { BlogHeading } from '@/lib/blog';

/** Table of contents built from the post's extracted headings. */
export default function Toc({ headings }: { headings: BlogHeading[] }) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page" className="lg:sticky lg:top-24">
      <p className="eyebrow text-ink-soft">On this page</p>
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

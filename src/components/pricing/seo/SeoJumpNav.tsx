import { SEO_SECTIONS } from '@/data/seo-packages';

/** Jump strip, same pattern as the FAQ page's group nav. */
export default function SeoJumpNav() {
  return (
    <nav
      aria-label="Jump to a section"
      className="border-b border-cream-300 bg-cream-100 py-6"
    >
      <div className="container-page flex flex-wrap gap-3">
        {SEO_SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="eyebrow rounded-full border border-cream-300 px-4 py-2 text-ink-soft transition-colors hover:border-accent-ink hover:text-accent-ink"
          >
            {section.navLabel}
          </a>
        ))}
      </div>
    </nav>
  );
}

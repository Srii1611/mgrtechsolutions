import Link from 'next/link';
import { getPost } from '@/lib/blog';
import { RELATED_GUIDES, type GuidePage } from '@/data/related-guides';

const COLS: Record<number, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

/**
 * "Related guides": a few article cards for one page, from the mapping in
 * src/data/related-guides.ts. Server component (it reads the blog). `stack`
 * puts the cards in one column and drops the excerpt, for narrow spaces such
 * as an industries panel.
 */
export default function RelatedGuides({
  page,
  heading = 'Related guides',
  stack = false,
}: {
  page: GuidePage;
  heading?: string;
  stack?: boolean;
}) {
  const posts = RELATED_GUIDES[page].map((slug) => getPost(slug)).filter((p) => p !== undefined);
  if (posts.length === 0) return null;

  return (
    <div className="related-guides">
      <h3 className="eyebrow text-ink-soft">{heading}</h3>
      <ul className={`mt-4 grid list-none gap-4 p-0 ${stack ? 'grid-cols-1' : `grid-cols-1 ${COLS[Math.min(posts.length, 4)]}`}`}>
        {posts.map((post) => (
          <li key={post.slug}>
            <article className="h-full rounded-2xl border border-cream-300 bg-cream-100 p-5 transition-transform hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
              <p className="eyebrow text-accent-ink">{post.category}</p>
              <h4 className="mt-2 text-[1.0625rem] font-medium leading-snug text-forest-950">
                <Link
                  href={`/blog/${post.slug}`}
                  className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
                >
                  {post.title}
                </Link>
              </h4>
              {!stack && <p className="mt-2 line-clamp-3 text-[0.9375rem] leading-[1.6] text-ink-soft">{post.excerpt}</p>}
              <p className="eyebrow mt-3 text-ink-soft">{post.readTime} min read</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

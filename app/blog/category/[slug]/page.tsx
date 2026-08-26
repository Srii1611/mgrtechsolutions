import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleCard from '@/components/blog/ArticleCard';
import { getPostsByCategory } from '@/lib/blog';
import { CATEGORIES, CATEGORY_BY_SLUG } from '@/data/blog-categories';

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORY_BY_SLUG.get(slug);
  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/blog/category/${category.slug}` },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = CATEGORY_BY_SLUG.get(slug);
  if (!category) notFound();

  const posts = getPostsByCategory(category.slug);

  return (
    <>
      <section className="bg-cream-50 pb-16 pt-24 md:pt-28">
        <div className="container-page">
          <nav aria-label="Breadcrumb" className="eyebrow text-ink-soft">
            <Link href="/" className="transition-colors hover:text-accent-ink">
              HOME
            </Link>
            <span className="mx-2 text-cream-300" aria-hidden="true">
              /
            </span>
            <Link href="/blog" className="transition-colors hover:text-accent-ink">
              BLOG
            </Link>
          </nav>

          <p className="eyebrow mt-8 text-accent-ink">{posts.length} articles</p>
          <h1 className="h1-page mt-4 max-w-3xl font-medium text-forest-950">{category.name}</h1>
          <p className="lede mt-6 max-w-xl text-ink-soft">{category.tagline}</p>
          <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.7] text-ink-soft">
            {category.description}
          </p>
        </div>
      </section>

      <section className="bg-cream-100 py-16 md:py-20">
        <div className="container-page">
          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-[1.0625rem] text-ink-soft">
              No articles in this category yet — check back soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

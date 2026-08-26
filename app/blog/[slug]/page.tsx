import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleCard from '@/components/blog/ArticleCard';
import ArticleBody from '@/components/blog/ArticleBody';
import Toc from '@/components/blog/Toc';
import CtaBand from '@/components/blog/CtaBand';
import { getAllPosts, getPost, getRelatedPosts } from '@/lib/blog';
import { CATEGORY_BY_SLUG } from '@/data/blog-categories';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const category = CATEGORY_BY_SLUG.get(post.categorySlug);
  const related = getRelatedPosts(post, 3);

  return (
    <>
      <section className="bg-cream-50 pb-10 pt-24 md:pt-28">
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
            <span className="mx-2 text-cream-300" aria-hidden="true">
              /
            </span>
            {category ? (
              <Link
                href={`/blog/category/${category.slug}`}
                className="transition-colors hover:text-accent-ink"
              >
                {category.name.toUpperCase()}
              </Link>
            ) : (
              <span>{post.category.toUpperCase()}</span>
            )}
          </nav>

          <p className="eyebrow mt-8 text-accent-ink">{post.category}</p>
          <h1 className="h1-page mt-4 max-w-3xl font-medium text-forest-950">{post.title}</h1>
          <p className="eyebrow mt-6 text-ink-soft">{post.readTime} min read</p>
        </div>
      </section>

      <section className="bg-cream-50 pb-20 md:pb-28">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
          {post.headings.length > 0 ? (
            <details className="rounded-xl border border-cream-300 bg-cream-100 p-4 lg:hidden">
              <summary className="eyebrow cursor-pointer text-ink-soft">On this page</summary>
              <div className="mt-4">
                <Toc headings={post.headings} showLabel={false} />
              </div>
            </details>
          ) : null}

          <article className="min-w-0 lg:order-1">
            <ArticleBody markdown={post.body} />
          </article>

          <aside className="hidden lg:order-2 lg:block">
            <Toc headings={post.headings} />
          </aside>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="bg-cream-100 py-16 md:py-20">
          <div className="container-page">
            <h2 className="h2-section font-medium text-forest-950">Related articles</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((relatedPost) => (
                <ArticleCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand
        eyebrow="Ready to start?"
        heading="Let's build a site that works as hard as you do."
        body="Call and talk through what you need, or send your details and we'll follow up within a day."
      />
    </>
  );
}

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import BlogFilter from '@/components/blog/BlogFilter';
import { getAllPosts, getPostsByCategory } from '@/lib/blog';
import { CATEGORIES } from '@/data/blog-categories';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Plain-English guidance on local SEO, AI search, content marketing, lead generation, website performance, and growing a local service business.',
  alternates: { canonical: '/blog' },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="bg-cream-50 pb-16 pt-24 md:pt-28">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-accent-ink">— BLOG</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="h1-page mt-4 max-w-3xl font-medium text-forest-950">
              Straight answers for local business owners.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede mt-6 max-w-xl text-ink-soft">
              {posts.length} articles on getting found, getting chosen, and getting the phone to
              ring — no jargon, no fluff.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-100 py-16 md:py-20">
        <div className="container-page">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((category, i) => {
              const count = getPostsByCategory(category.slug).length;
              return (
                <Reveal key={category.slug} delay={i * 0.05}>
                  <Link
                    href={`/blog/category/${category.slug}`}
                    className="flex h-full items-start gap-4 rounded-2xl border border-cream-300 bg-cream-50 p-6 transition-transform hover:-translate-y-1"
                  >
                    <Image
                      src={category.icon}
                      alt=""
                      width={32}
                      height={32}
                      aria-hidden="true"
                    />
                    <div>
                      <h2 className="h3-card font-medium text-forest-950">{category.name}</h2>
                      <p className="mt-1 text-[0.9375rem] text-ink-soft">{category.tagline}</p>
                      <p className="eyebrow mt-3 text-accent-ink">{count} articles</p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-cream-50 py-16 md:py-20">
        <div className="container-page">
          <BlogFilter posts={posts} />
        </div>
      </section>
    </>
  );
}

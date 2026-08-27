import { SITE } from '@/data/site';

const METROWEST_TOWNS = [
  'Ashland',
  'Framingham',
  'Natick',
  'Hopkinton',
  'Holliston',
  'Marlborough',
  'Southborough',
  'Westborough',
];

const HEADLINE_MAX = 110;

export function buildLocalBusiness(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.legalName,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    description: SITE.tagline,
    image: `${SITE.url}/brand/logo-mark.png`,
    logo: `${SITE.url}/brand/logo-mark.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ashland',
      addressRegion: 'MA',
      addressCountry: 'US',
    },
    areaServed: METROWEST_TOWNS.map((name) => ({
      '@type': 'City',
      name,
    })),
  };
}

export function buildWebSite(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
  };
}

export function buildArticle(post: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  datePublished?: string;
}): object {
  const headline =
    post.title.length > HEADLINE_MAX ? post.title.slice(0, HEADLINE_MAX) : post.title;

  const article: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description: post.excerpt,
    author: {
      '@type': 'Organization',
      name: SITE.legalName,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.legalName,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE.url}/brand/logo-mark.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE.url}/blog/${post.slug}`,
    },
    articleSection: post.category,
  };

  if (post.datePublished) {
    article.datePublished = post.datePublished;
  }

  return article;
}

export function buildBreadcrumbs(items: { name: string; url: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE.url}${item.url}`,
    })),
  };
}

export function buildFaqPage(items: { q: string; a: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

import type { Metadata } from 'next';
import SeoHero from '@/components/pricing/seo/SeoHero';
import SeoJumpNav from '@/components/pricing/seo/SeoJumpNav';
import SeoBody from '@/components/pricing/seo/SeoBody';
import SeoFaq from '@/components/pricing/seo/SeoFaq';
import CtaBand from '@/components/blog/CtaBand';
import JsonLd from '@/components/JsonLd';
import { buildBreadcrumbs, buildFaqPage } from '@/lib/schema';
import { SEO_CLOSE, SEO_FAQ } from '@/data/seo-packages';

export const metadata: Metadata = {
  title: 'SEO & Marketing Packages',
  description:
    'Two monthly marketing tiers with the price on the page: $500/mo for full SEO and social media management, $999/mo adding Google Ads and Meta Ads management. Ad spend is separate.',
  alternates: { canonical: '/pricing/seo' },
};

const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Packages', url: '/pricing' },
  { name: 'SEO & Marketing', url: '/pricing/seo' },
];

export default function SeoPackagesPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbs(breadcrumbItems)} />
      <JsonLd data={buildFaqPage([...SEO_FAQ.faqs])} />
      <SeoHero />
      <SeoJumpNav />
      <SeoBody />
      <SeoFaq />
      <CtaBand
        eyebrow={SEO_CLOSE.eyebrow}
        heading={SEO_CLOSE.heading}
        body={SEO_CLOSE.body}
      />
    </>
  );
}

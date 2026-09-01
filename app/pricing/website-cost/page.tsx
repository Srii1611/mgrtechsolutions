import type { Metadata } from 'next';
import CostHero from '@/components/pricing/cost/CostHero';
import CostJumpNav from '@/components/pricing/cost/CostJumpNav';
import CostTiers from '@/components/pricing/cost/CostTiers';
import CostBody from '@/components/pricing/cost/CostBody';
import CostFaq from '@/components/pricing/cost/CostFaq';
import CtaBand from '@/components/blog/CtaBand';
import JsonLd from '@/components/JsonLd';
import { buildBreadcrumbs, buildFaqPage } from '@/lib/schema';
import { COST_CLOSE, COST_FAQ } from '@/data/website-cost-guide';

export const metadata: Metadata = {
  title: 'Website Pricing',
  description:
    'What a website actually costs for a trades business, and why: what moves the price, what gets left off the invoice, and which of the three MGRTECH build tiers fits.',
  alternates: { canonical: '/pricing/website-cost' },
};

const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Packages', url: '/pricing' },
  { name: 'Website Pricing', url: '/pricing/website-cost' },
];

export default function WebsiteCostGuidePage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbs(breadcrumbItems)} />
      <JsonLd data={buildFaqPage([...COST_FAQ.faqs])} />
      <CostHero />
      <CostJumpNav />
      <CostTiers />
      <CostBody />
      <CostFaq />
      <CtaBand
        eyebrow={COST_CLOSE.eyebrow}
        heading={COST_CLOSE.heading}
        body={COST_CLOSE.body}
      />
    </>
  );
}

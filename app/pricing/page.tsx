import type { Metadata } from 'next';
import PricingHero from '@/components/pricing/PricingHero';
import Packages from '@/components/pricing/Packages';
import ValueAnchor from '@/components/pricing/ValueAnchor';
import AlwaysIncluded from '@/components/pricing/AlwaysIncluded';
import PricingFaq from '@/components/pricing/PricingFaq';
import CtaBand from '@/components/blog/CtaBand';
import { PRICING_CLOSE } from '@/data/pricing-page';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Starting prices in writing, with exactly what is included — no hourly meters, no surprise invoices. Your final quote is locked in writing after one call.',
  alternates: { canonical: '/pricing' },
};

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <Packages />
      <ValueAnchor />
      <AlwaysIncluded />
      <PricingFaq />
      <CtaBand
        eyebrow={PRICING_CLOSE.eyebrow}
        heading={PRICING_CLOSE.heading}
        body={PRICING_CLOSE.body}
      />
    </>
  );
}

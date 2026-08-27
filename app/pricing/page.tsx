import type { Metadata } from 'next';
import PricingHero from '@/components/pricing/PricingHero';
import Packages from '@/components/pricing/Packages';
import ValueAnchor from '@/components/pricing/ValueAnchor';
import AlwaysIncluded from '@/components/pricing/AlwaysIncluded';
import PricingFaq from '@/components/pricing/PricingFaq';

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
    </>
  );
}

import type { Metadata } from 'next';
import IndustriesHero from '@/components/industries/IndustriesHero';
import AudienceSegments from '@/components/industries/AudienceSegments';
import IndustriesClose from '@/components/industries/IndustriesClose';
import RelatedGuides from '@/components/blog/RelatedGuides';

export const metadata: Metadata = {
  title: 'Industries',
  description:
    'Trades and contractors, auto and motorsports, retail and e-commerce, local services: the businesses I build websites, content, and AI follow-up for.',
  alternates: { canonical: '/industries' },
};

export default function IndustriesPage() {
  return (
    <>
      <IndustriesHero />
      <AudienceSegments
        guides={{
          'trades-contractors': <RelatedGuides page="industries-trades" stack />,
          'auto-motorsports': <RelatedGuides page="industries-auto" stack />,
          'local-services': <RelatedGuides page="industries-local" stack />,
        }}
      />
      <IndustriesClose />
    </>
  );
}

import type { Metadata } from 'next';
import FaqHero from '@/components/faq/FaqHero';
import FaqAccordion from '@/components/faq/FaqAccordion';
import CtaBand from '@/components/blog/CtaBand';
import JsonLd from '@/components/JsonLd';
import RelatedGuides from '@/components/blog/RelatedGuides';
import { buildFaqPage } from '@/lib/schema';
import { FAQ_CLOSE, FAQ_GROUPS } from '@/data/faq';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Twelve questions I hear on almost every first call: cost, timeline, ownership, and what happens after launch, answered straight.',
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  const items = FAQ_GROUPS.flatMap((group) => group.items);

  return (
    <>
      <JsonLd data={buildFaqPage(items)} />
      <FaqHero />
      <FaqAccordion />
      <section className="bg-cream-50 py-16 md:py-20" aria-label="Related guides">
        <div className="container-page">
          <RelatedGuides page="faq" />
        </div>
      </section>
      <CtaBand
        eyebrow={FAQ_CLOSE.eyebrow}
        heading={FAQ_CLOSE.heading}
        body={FAQ_CLOSE.body}
      />
    </>
  );
}

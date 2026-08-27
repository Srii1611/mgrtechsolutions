import type { Metadata } from 'next';
import FaqHero from '@/components/faq/FaqHero';
import FaqAccordion from '@/components/faq/FaqAccordion';
import CtaBand from '@/components/blog/CtaBand';
import { FAQ_CLOSE } from '@/data/faq';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Twelve questions I hear on almost every first call — cost, timeline, ownership, and what happens after launch — answered straight.',
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  return (
    <>
      <FaqHero />
      <FaqAccordion />
      <CtaBand
        eyebrow={FAQ_CLOSE.eyebrow}
        heading={FAQ_CLOSE.heading}
        body={FAQ_CLOSE.body}
      />
    </>
  );
}

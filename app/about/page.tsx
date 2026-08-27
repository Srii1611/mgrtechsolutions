import type { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import Story from '@/components/about/Story';
import Values from '@/components/about/Values';
import ServiceArea from '@/components/about/ServiceArea';
import CtaBand from '@/components/blog/CtaBand';
import { ABOUT } from '@/data/about';

export const metadata: Metadata = {
  title: 'About',
  description:
    'MGRTECH Solutions is a web studio in Ashland, Massachusetts. When you call, you reach the person responsible for your project — not a switchboard.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Story />
      <Values />
      <ServiceArea />
      <CtaBand
        eyebrow={ABOUT.serviceArea.eyebrow}
        heading={ABOUT.serviceArea.footnote}
        body={ABOUT.story.pullQuote}
      />
    </>
  );
}

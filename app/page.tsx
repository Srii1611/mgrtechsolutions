import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import Band from '@/components/home/Band';
import Stages from '@/components/home/Stages';
import WorkSection from '@/components/home/WorkSection';
import Objections from '@/components/home/Objections';
import ProcessSection from '@/components/home/ProcessSection';
import Comparison from '@/components/home/Comparison';
import PricingPreview from '@/components/home/PricingPreview';
import DualClose from '@/components/home/DualClose';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Band><Stages /></Band>
      <Band dark><WorkSection /></Band>
      <Band><Objections /></Band>
      <Band dark><ProcessSection /></Band>
      <Band><Comparison /></Band>
      <Band dark><PricingPreview /></Band>
      <Band dark><DualClose /></Band>
    </>
  );
}

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
import { BANDS } from '@/data/home';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Band label={BANDS[0]}><Stages /></Band>
      <Band label={BANDS[1]} dark><WorkSection /></Band>
      <Band label={BANDS[2]}><Objections /></Band>
      <Band label={BANDS[3]} dark><ProcessSection /></Band>
      <Band label={BANDS[4]}><Comparison /></Band>
      <Band label={BANDS[5]} dark><PricingPreview /></Band>
      <Band label={BANDS[6]} dark><DualClose /></Band>
    </>
  );
}

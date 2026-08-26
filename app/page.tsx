import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import Band from '@/components/home/Band';
import Framework from '@/components/home/Framework';
import WorkSection from '@/components/home/WorkSection';
import PainSection from '@/components/home/PainSection';
import AIShift from '@/components/home/AIShift';
import SystemSection from '@/components/home/SystemSection';
import MechanismChain from '@/components/home/MechanismChain';
import StatsSection from '@/components/home/StatsSection';
import ProcessSection from '@/components/home/ProcessSection';
import Comparison from '@/components/home/Comparison';
import PricingPreview from '@/components/home/PricingPreview';
import FaqTeaser from '@/components/home/FaqTeaser';
import DualClose from '@/components/home/DualClose';
import { BANDS } from '@/data/home';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Band label={BANDS[0]}><Framework /></Band>
      <Band label={BANDS[1]} dark><WorkSection /></Band>
      <Band label={BANDS[2]}><PainSection /></Band>
      <Band label={BANDS[3]} dark><AIShift /></Band>
      <Band label={BANDS[4]}><SystemSection /></Band>
      <Band label={BANDS[5]} dark><MechanismChain /></Band>
      <Band label={BANDS[6]}><StatsSection /></Band>
      <Band label={BANDS[7]} dark><ProcessSection /></Band>
      <Band label={BANDS[8]}><Comparison /></Band>
      <Band label={BANDS[9]} dark><PricingPreview /></Band>
      <Band label={BANDS[10]}><FaqTeaser /></Band>
      <Band label={BANDS[11]} dark><DualClose /></Band>
    </>
  );
}

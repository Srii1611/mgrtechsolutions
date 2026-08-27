import type { Metadata } from 'next';
import WorkHero from '@/components/work/WorkHero';
import LegendStrip from '@/components/work/LegendStrip';
import CaseBlocks from '@/components/work/CaseBlocks';
import EighthSlot from '@/components/work/EighthSlot';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Three live client sites and four demos built to show the approach — every project on this page is honestly labeled LIVE or DEMO, no exceptions.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <>
      <WorkHero />
      <LegendStrip />
      <CaseBlocks />
      <EighthSlot />
    </>
  );
}

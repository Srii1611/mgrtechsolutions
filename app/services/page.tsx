import type { Metadata } from 'next';
import ServicesHero from '@/components/services/ServicesHero';
import SystemStrip from '@/components/services/SystemStrip';
import PillarWebsites from '@/components/services/PillarWebsites';
import Connector from '@/components/services/Connector';
import PillarContent from '@/components/services/PillarContent';
import PillarAutomation from '@/components/services/PillarAutomation';
import WhoItsFor from '@/components/services/WhoItsFor';
import ServicesClose from '@/components/services/ServicesClose';
import { SERVICES } from '@/data/services';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'One system, three parts: a hand-coded website, content that builds trust, and AI follow-up that catches every inquiry — built together by the person who answers the phone.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <SystemStrip />
      <PillarWebsites />
      <Connector text={SERVICES.connector1.text} dark={SERVICES.connector1.dark} />
      <PillarContent />
      <Connector text={SERVICES.connector2.text} dark={SERVICES.connector2.dark} />
      <PillarAutomation />
      <WhoItsFor />
      <ServicesClose />
    </>
  );
}

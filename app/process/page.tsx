import type { Metadata } from 'next';
import ProcessHero from '@/components/process/ProcessHero';
import WeekTimeline from '@/components/process/WeekTimeline';
import EffortLedger from '@/components/process/EffortLedger';
import HomeworkList from '@/components/process/HomeworkList';
import ProcessClose from '@/components/process/ProcessClose';
import RelatedGuides from '@/components/blog/RelatedGuides';

export const metadata: Metadata = {
  title: 'Process',
  description:
    'Two paths: 15 days for The Site and The System, about 5 weeks for Rebuild / Custom and stores. Your total time investment is about 90 minutes: everything else is ours to run.',
  alternates: { canonical: '/process' },
};

export default function ProcessPage() {
  return (
    <>
      <ProcessHero />
      <WeekTimeline />
      <EffortLedger />
      <HomeworkList />
      <section className="bg-cream-50 py-16 md:py-20" aria-label="Related guides">
        <div className="container-page">
          <RelatedGuides page="process" />
        </div>
      </section>
      <ProcessClose />
    </>
  );
}

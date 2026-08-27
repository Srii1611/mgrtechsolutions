import type { Metadata } from 'next';
import ProcessHero from '@/components/process/ProcessHero';
import WeekTimeline from '@/components/process/WeekTimeline';
import EffortLedger from '@/components/process/EffortLedger';
import HomeworkList from '@/components/process/HomeworkList';
import ProcessClose from '@/components/process/ProcessClose';

export const metadata: Metadata = {
  title: 'Process',
  description:
    'A five-week process where your total time investment is one phone call and one design review — everything else is ours to run.',
  alternates: { canonical: '/process' },
};

export default function ProcessPage() {
  return (
    <>
      <ProcessHero />
      <WeekTimeline />
      <EffortLedger />
      <HomeworkList />
      <ProcessClose />
    </>
  );
}

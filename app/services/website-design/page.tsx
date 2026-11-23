import type { Metadata } from 'next';
import '@/components/services/website-design/website-design.css';
import JsonLd from '@/components/JsonLd';
import { buildFaqPage } from '@/lib/schema';
import WdApproach from '@/components/services/website-design/WdApproach';
import WdHero from '@/components/services/website-design/WdHero';
import WdProblems from '@/components/services/website-design/WdProblems';
import WdCommitments from '@/components/services/website-design/WdCommitments';
import WdIncluded from '@/components/services/website-design/WdIncluded';
import WdHow from '@/components/services/website-design/WdHow';
import WdPricing from '@/components/services/website-design/WdPricing';
import WdTimeline from '@/components/services/website-design/WdTimeline';
import WdSuccess from '@/components/services/website-design/WdSuccess';
import WdCompare from '@/components/services/website-design/WdCompare';
import WdFit from '@/components/services/website-design/WdFit';
import WdIndustries from '@/components/services/website-design/WdIndustries';
import WdGuides from '@/components/services/website-design/WdGuides';
import WdFaq from '@/components/services/website-design/WdFaq';
import WdRelated from '@/components/services/website-design/WdRelated';
import WdClose from '@/components/services/website-design/WdClose';
import '@/components/services/service-page/service-page.css';
import '@/components/services/service-page/service-page-nav.css';
import PageNav from '@/components/services/service-page/SectionNav';
import { Band, SectionHead } from '@/components/services/website-design/WdBits';
import {
  WD_FAQ,
  WD_INCLUDED,
  WD_INDUSTRIES,
  WD_META,
  WD_PROBLEM,
  WD_SUCCESS,
} from '@/data/website-design';

export const metadata: Metadata = {
  title: WD_META.title,
  description: WD_META.description,
  alternates: { canonical: '/services/website-design' },
};

export default function WebsiteDesignPage() {
  return (
    <div className="wd wd-nav-list">
      <JsonLd data={buildFaqPage(WD_FAQ.items.map((f) => ({ q: f.q, a: f.a })))} />
      <PageNav />
      <WdHero />

      <Band id="problem" labelledBy="wd-problem-heading">
        <SectionHead id="wd-problem-heading" eyebrow={WD_PROBLEM.eyebrow} heading={WD_PROBLEM.heading} lede={WD_PROBLEM.lede} />
        <WdProblems />
      </Band>

      <WdApproach />
      <WdCommitments />

      <Band id="included" tone="tint" labelledBy="wd-included-heading">
        <SectionHead id="wd-included-heading" eyebrow={WD_INCLUDED.eyebrow} heading={WD_INCLUDED.heading} lede={WD_INCLUDED.lede} />
        <WdIncluded />
        <p className="wd-note">
          <b style={{ fontWeight: 500, color: 'var(--ink)' }}>{WD_INCLUDED.noteLead}</b> {WD_INCLUDED.note}
        </p>
      </Band>

      <WdHow />
      <WdPricing />
      <WdTimeline />

      <Band id="success" labelledBy="wd-success-heading">
        <SectionHead id="wd-success-heading" eyebrow={WD_SUCCESS.eyebrow} heading={WD_SUCCESS.heading} lede={WD_SUCCESS.lede} />
        <WdSuccess />
      </Band>

      <WdCompare />
      <WdFit />

      <Band id="industries" tone="tint" labelledBy="wd-industries-heading">
        <SectionHead id="wd-industries-heading" eyebrow={WD_INDUSTRIES.eyebrow} heading={WD_INDUSTRIES.heading} lede={WD_INDUSTRIES.lede} />
        <WdIndustries />
      </Band>

      <WdGuides />
      <WdFaq />
      <WdRelated />
      <WdClose />
    </div>
  );
}

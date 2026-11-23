import '@/components/services/website-design/website-design.css';
import '@/components/services/service-page/service-page.css';
import JsonLd from '@/components/JsonLd';
import { buildFaqPage } from '@/lib/schema';
import type { ServicePageData } from '@/data/service-pages/types';
import { Band, SectionHead } from '@/components/services/website-design/WdBits';
import SpApproach from '@/components/services/service-page/SpApproach';
import SpIncluded from '@/components/services/service-page/SpIncluded';
import SpIndustries from '@/components/services/service-page/SpIndustries';
import SpProblems from '@/components/services/service-page/SpProblems';
import '@/components/services/service-page/service-page-nav.css';
import PageNav from '@/components/services/service-page/SectionNav';
import SpSuccess from '@/components/services/service-page/SpSuccess';
import {
  SpClose,
  SpCommitments,
  SpCompare,
  SpFaq,
  SpFit,
  SpGuides,
  SpHero,
  SpHow,
  SpPricing,
  SpRelated,
  SpTimeline,
} from '@/components/services/service-page/SpSections';

/**
 * One per-service page: the same twelve sections in the same order for every
 * service, with the copy supplied as data. See src/data/service-pages/types.ts.
 */
export default function ServicePage({ data }: { data: ServicePageData }) {
  return (
    <div className="wd wd-nav-list">
      <JsonLd data={buildFaqPage(data.faq.items.map((f) => ({ q: f.q, a: f.a })))} />
      <PageNav />
      <SpHero data={data.hero} serviceName={data.meta.title} slug={data.slug} />

      <Band id="problem" labelledBy="sp-problem-heading">
        <SectionHead id="sp-problem-heading" eyebrow={data.problem.eyebrow} heading={data.problem.heading} lede={data.problem.lede} />
        <SpProblems items={data.problem.items} />
      </Band>

      <SpApproach data={data.approach} />
      <SpCommitments data={data.commitments} />

      <Band id="included" tone="tint" labelledBy="sp-included-heading">
        <SectionHead id="sp-included-heading" eyebrow={data.included.eyebrow} heading={data.included.heading} lede={data.included.lede} />
        <SpIncluded data={data.included} />
        <p className="wd-note">
          <b style={{ fontWeight: 500, color: 'var(--ink)' }}>{data.included.noteLead}</b> {data.included.note}
        </p>
      </Band>

      <SpHow data={data.how} />
      <SpPricing data={data.pricing} />
      <SpTimeline data={data.timeline} />

      <Band id="success" labelledBy="sp-success-heading">
        <SectionHead id="sp-success-heading" eyebrow={data.success.eyebrow} heading={data.success.heading} lede={data.success.lede} />
        <SpSuccess data={data.success} />
      </Band>

      <SpCompare data={data.compare} />
      <SpFit data={data.fit} />

      <Band id="industries" tone="tint" labelledBy="sp-industries-heading">
        <SectionHead id="sp-industries-heading" eyebrow={data.industries.eyebrow} heading={data.industries.heading} lede={data.industries.lede} />
        <SpIndustries data={data.industries} />
      </Band>

      <SpGuides data={data.guides} slug={data.slug} />
      <SpFaq data={data.faq} />
      <SpRelated data={data.related} />
      <SpClose data={data.close} />
    </div>
  );
}

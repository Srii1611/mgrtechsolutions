import Reveal from '@/components/motion/Reveal';
import RelatedGuides from '@/components/blog/RelatedGuides';
import { WD_GUIDES } from '@/data/website-design';
import { Band, SectionHead } from '@/components/services/website-design/WdBits';

/** Related guides for the Website Design page (cards, from src/data/related-guides.ts). */
export default function WdGuides() {
  return (
    <Band id="guides" labelledBy="wd-guides-heading">
      <SectionHead id="wd-guides-heading" eyebrow={WD_GUIDES.eyebrow} heading={WD_GUIDES.heading} lede={WD_GUIDES.lede} />
      <Reveal>
        <RelatedGuides page="website-design" heading="Related guides" />
      </Reveal>
    </Band>
  );
}

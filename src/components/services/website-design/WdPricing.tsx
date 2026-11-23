import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import { WD_PRICING } from '@/data/website-design';
import PriceTiers from '@/components/services/service-page/PriceTiers';
import { Band, Bullets, SectionHead } from '@/components/services/website-design/WdBits';

/** The price cards (from src/data/prices.ts) and the three facts under them. */
export default function WdPricing() {
  return (
    <Band id="pricing" tone="tint" labelledBy="wd-pricing-heading">
      <SectionHead id="wd-pricing-heading" eyebrow={WD_PRICING.eyebrow} heading={WD_PRICING.heading} lede={WD_PRICING.lede} />

      <PriceTiers service={WD_PRICING.service} alsoShow={WD_PRICING.alsoShow} />

      <Reveal>
        <div className="wd-facts3">
          {WD_PRICING.facts.map((f) => (
            <div key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
              <Bullets items={f.items} x={f.kind === 'x'} />
            </div>
          ))}
        </div>
      </Reveal>

      <p className="wd-note">
        {WD_PRICING.readLead}{' '}
        {WD_PRICING.reads.map((r, i) => (
          <span key={r.slug}>
            {i > 0 && ' and '}
            <Link className="wd-lk" href={`/blog/${r.slug}`}>
              {r.label}
            </Link>
          </span>
        ))}
        .
      </p>
    </Band>
  );
}

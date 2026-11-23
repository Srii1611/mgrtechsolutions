import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import { Bullets } from '@/components/services/website-design/WdBits';
import {
  HOURLY_LINE,
  PRICES,
  TIERS,
  estimatorHref,
  money,
  priceParts,
  type PriceTier,
  type ServiceKey,
} from '@/data/prices';

const GROUP_HEADING: Partial<Record<ServiceKey, string>> = {
  care: 'Care plans, billed monthly. Hosting is included.',
};

/** A line under a group that explains a fee that sits outside the tiers. */
function groupNote(service: ServiceKey): string | null {
  if (service === 'seo') return `Every plan starts with a one-time ${money(PRICES.seo.setup)} setup.`;
  if (service === 'ads')
    return `Each platform starts with a one-time ${money(PRICES.ads.jumpstart)} Jumpstart. Ad spend is always paid to Google and Meta directly.`;
  return null;
}

function TierCard({ service, tier }: { service: ServiceKey; tier: PriceTier }) {
  const { lead, main, sub } = priceParts(tier);
  const required = service === 'commerce' && tier.id === PRICES.commerce.care.id;
  return (
    <article className={`wd-plan${tier.featured ? ' wd-hl' : ''}`}>
      {tier.featured && <span className="wd-badge">Featured</span>}
      <span className="wd-ptag">{tier.name}</span>
      {lead && <p className="wd-pnote wd-plead-from">{lead}</p>}
      <p className={main.length > 7 ? 'wd-price wd-price-long' : 'wd-price'}>{main}</p>
      <p className="wd-pnote">{sub}</p>
      <Bullets items={tier.includes} />
      {!required && (
        <Link className="wd-tier-link" href={estimatorHref(service, tier.id)}>
          Plan this in the estimator <span aria-hidden="true">&rarr;</span>
        </Link>
      )}
    </article>
  );
}

function TierGrid({ service, heading }: { service: ServiceKey; heading?: string }) {
  // A store always comes with Commerce care, so it sits beside the two packages.
  const tiers: readonly PriceTier[] = service === 'commerce' ? [...TIERS.commerce, PRICES.commerce.care] : TIERS[service];
  const note = groupNote(service);
  return (
    <div className="wd-tiergroup">
      {heading && <h3 className="wd-tiers-h">{heading}</h3>}
      <div className={`wd-plans sp-plans-${tiers.length}`}>
        {tiers.map((t) => (
          <TierCard key={t.id} service={service} tier={t} />
        ))}
      </div>
      {note && <p className="wd-note wd-tiers-note">{note}</p>}
    </div>
  );
}

/**
 * The price cards for a service, read straight from src/data/prices.ts: the
 * featured tier is raised and dark, each card links into the estimator with
 * that tier pre-selected, and work outside the agreed scope is always quoted first.
 */
export default function PriceTiers({ service, alsoShow = [] }: { service: ServiceKey; alsoShow?: readonly ServiceKey[] }) {
  const groups = [service, ...alsoShow];
  return (
    <Reveal>
      {groups.map((g) => (
        <TierGrid key={g} service={g} heading={groups.length > 1 ? GROUP_HEADING[g] ?? PRICES[g].label : undefined} />
      ))}
      <p className="wd-note wd-hourly">
        Work outside what we agreed is always quoted first, at {HOURLY_LINE}.
      </p>
    </Reveal>
  );
}

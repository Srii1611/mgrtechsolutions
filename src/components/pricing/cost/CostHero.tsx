import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { COST_HERO } from '@/data/website-cost-guide';

/**
 * S1 — Cost guide hero (dark), with the price strip *inside* it.
 *
 * The strip lives in the hero rather than as the first body section
 * because the brief makes "prices visible without scrolling" a hard
 * requirement — putting it below the hero would let the headline and lede
 * push it off a 375px screen.
 *
 * The strip is a real <table> on md+ and stacked cards below that; the
 * same rows drive both, so there is no duplicated copy.
 */
export default function CostHero() {
  const { strip } = COST_HERO;

  return (
    <section className="dot-grid on-dark bg-forest-950 pb-14 pt-24">
      <div className="container-page">
        <nav aria-label="Breadcrumb" className="eyebrow text-mist">
          <Link href="/" className="transition-colors hover:text-accent">
            HOME
          </Link>
          <span className="mx-2 text-forest-700" aria-hidden="true">
            /
          </span>
          <Link href="/pricing" className="transition-colors hover:text-accent">
            PACKAGES
          </Link>
          <span className="mx-2 text-forest-700" aria-hidden="true">
            /
          </span>
          <span className="text-accent">{COST_HERO.breadcrumb}</span>
        </nav>

        <p className="eyebrow mt-8 text-accent">{COST_HERO.eyebrow}</p>

        <h1 className="h1-page mt-4 max-w-4xl font-medium text-cream-50">
          {COST_HERO.headline}
          <span className="mt-1 block text-accent">{COST_HERO.headlineAccent}</span>
        </h1>

        <p className="lede mt-5 max-w-xl text-mist">{COST_HERO.lede}</p>

        {/* Price strip — desktop table */}
        <div className="mt-10 hidden overflow-hidden rounded-2xl border border-forest-700 md:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{strip.caption}</caption>
            <thead>
              <tr className="bg-forest-900">
                {strip.columns.map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="eyebrow border-b border-forest-700 px-5 py-3 text-mist"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {strip.rows.map((row) => (
                <tr key={row.tier} className="border-b border-forest-700 last:border-b-0">
                  <th
                    scope="row"
                    className="px-5 py-4 align-top text-[1.0625rem] font-medium text-cream-50"
                  >
                    {row.tier}
                  </th>
                  <td className="px-5 py-4 align-top text-[1.0625rem] font-medium text-accent">
                    {row.price}
                  </td>
                  <td className="px-5 py-4 align-top text-[0.9375rem] leading-[1.6] text-mist">
                    {row.bestFor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Price strip — mobile cards */}
        <ul className="mt-8 space-y-3 md:hidden">
          {strip.rows.map((row) => (
            <li key={row.tier} className="rounded-xl border border-forest-700 bg-forest-900 p-5">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-[1.0625rem] font-medium text-cream-50">{row.tier}</p>
                <p className="text-[1.0625rem] font-medium text-accent">{row.price}</p>
              </div>
              <p className="mt-2 text-[0.9375rem] leading-[1.6] text-mist">{row.bestFor}</p>
            </li>
          ))}
        </ul>

        {/* On-page anchor, so a plain <a> rather than next/link. */}
        <a
          href={strip.linkHref}
          className="mt-8 inline-flex items-center gap-2 font-medium text-accent underline underline-offset-4"
        >
          {strip.linkLabel}
          <ArrowDown className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

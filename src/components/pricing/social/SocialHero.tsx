import Link from 'next/link';
import { ArrowDown, Info } from 'lucide-react';
import { SOCIAL_HERO } from '@/data/social-packages';

/**
 * S1 — Social retainer hero (dark), carrying the price strip and the
 * scope caveat.
 *
 * Same shape as the other two pricing heroes: prices land above the fold,
 * and the caveat that qualifies them sits in the same glance rather than
 * further down the page.
 */
export default function SocialHero() {
  const { strip } = SOCIAL_HERO;

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
          <span className="text-accent">{SOCIAL_HERO.breadcrumb}</span>
        </nav>

        <p className="eyebrow mt-8 text-accent">{SOCIAL_HERO.eyebrow}</p>

        <h1 className="h1-page mt-4 max-w-4xl font-medium text-cream-50">
          {SOCIAL_HERO.headline}
          <span className="mt-1 block text-accent">{SOCIAL_HERO.headlineAccent}</span>
        </h1>

        <p className="lede mt-5 max-w-xl text-mist">{SOCIAL_HERO.lede}</p>

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
                    {row.covers}
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
              <p className="mt-2 text-[0.9375rem] leading-[1.6] text-mist">{row.covers}</p>
            </li>
          ))}
        </ul>

        {/* The caveat sits immediately under the strip, by requirement. */}
        <p className="mt-5 flex max-w-3xl items-start gap-3 rounded-xl border border-forest-700 bg-forest-900 p-4 text-[0.9375rem] leading-[1.6] text-mist">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2} aria-hidden="true" />
          {strip.caveat}
        </p>

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

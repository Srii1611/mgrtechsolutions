import Reveal from '@/components/motion/Reveal';
import PricingSection from '@/components/pricing/PricingSection';
import { COST_COMPARISON } from '@/data/website-cost-guide';

/**
 * S6 — DIY / freelancer / MGRTECH comparison.
 *
 * Table on md+, stacked per-option cards below that. Both read the same
 * rows, so the two layouts can't drift apart. Table styling matches
 * ArticleBody's markdown table renderer.
 */
export default function CostComparison() {
  const { columns, rows, outro } = COST_COMPARISON;

  return (
    <PricingSection id={COST_COMPARISON.id} heading={COST_COMPARISON.heading} tone="raised">
      {/* Desktop — real table */}
      <Reveal>
        <div className="hidden overflow-x-auto rounded-xl border border-cream-300 md:block">
          <table className="w-full border-collapse text-left text-[0.95rem] text-ink-soft">
            <caption className="sr-only">{COST_COMPARISON.heading}</caption>
            <thead>
              <tr>
                <th scope="col" className="border-b border-cream-300 bg-cream-50 px-4 py-3">
                  <span className="sr-only">Comparison point</span>
                </th>
                {columns.map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="border-b border-cream-300 bg-cream-50 px-4 py-3 font-medium text-forest-950"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <th
                    scope="row"
                    className="border-b border-cream-300 px-4 py-3 text-left align-top font-medium text-forest-950"
                  >
                    {row.label}
                  </th>
                  {row.values.map((value, i) => (
                    <td
                      key={columns[i]}
                      className="border-b border-cream-300 px-4 py-3 align-top"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      {/* Mobile — one card per option */}
      <div className="space-y-4 md:hidden">
        {columns.map((col, colIndex) => (
          <Reveal key={col} delay={colIndex * 0.05}>
            <div className="rounded-xl border border-cream-300 bg-cream-50 p-5">
              <p className="h3-card font-medium text-forest-950">{col}</p>
              <dl className="mt-4 space-y-3">
                {rows.map((row) => (
                  <div key={row.label}>
                    <dt className="eyebrow text-ink-soft">{row.label}</dt>
                    <dd className="mt-1 text-[0.9375rem] leading-[1.6] text-forest-950">
                      {row.values[colIndex]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-8 max-w-3xl text-[1.0625rem] leading-[1.7] text-ink-soft">{outro}</p>
      </Reveal>
    </PricingSection>
  );
}

import Reveal from '@/components/motion/Reveal';
import { VALUE_ANCHOR } from '@/data/pricing-page';

/** S3 — The Value Anchor: itemized "receipt" of the à-la-carte route (dark). */
export default function ValueAnchor() {
  return (
    <section className="on-dark bg-forest-950 py-20 md:py-28" aria-labelledby="value-anchor-heading">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent">{VALUE_ANCHOR.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="value-anchor-heading" className="h2-section mt-4 max-w-2xl font-medium text-cream-50">
            {VALUE_ANCHOR.headline}
            <span className="mt-1 block text-accent">{VALUE_ANCHOR.headlineAccent}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="lede mt-6 max-w-xl text-mist">{VALUE_ANCHOR.body}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 max-w-xl overflow-x-auto rounded-2xl border border-forest-700">
            <table className="w-full min-w-[420px] border-collapse text-left">
              <thead>
                <tr className="border-b border-forest-700">
                  <th scope="col" className="p-4 text-sm font-medium text-mist">
                    {VALUE_ANCHOR.receiptLabel}
                  </th>
                  <th scope="col" className="p-4 text-sm font-medium text-mist">
                    &nbsp;
                  </th>
                </tr>
              </thead>
              <tbody>
                {VALUE_ANCHOR.rows.map((row) => (
                  <tr key={row.label} className="border-b border-forest-700 last:border-0">
                    <th scope="row" className="p-4 text-sm font-medium text-cream-50">
                      {row.label}
                    </th>
                    <td className="p-4 text-sm text-mist">{row.price}</td>
                  </tr>
                ))}
                <tr className="bg-forest-900/50">
                  <th scope="row" className="p-4 text-sm font-medium text-cream-50">
                    {VALUE_ANCHOR.totalLabel}
                  </th>
                  <td className="p-4 text-sm font-medium text-accent">{VALUE_ANCHOR.totalPrice}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import Reveal from '@/components/motion/Reveal';
import { EFFORT_LEDGER } from '@/data/process';

/** S3 — The effort ledger (dark). Invoice-style comparison table. */
export default function EffortLedger() {
  return (
    <section className="on-dark bg-forest-950 py-20 md:py-28" aria-labelledby="effort-ledger-heading">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent">{EFFORT_LEDGER.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="effort-ledger-heading" className="h2-section mt-4 max-w-2xl font-medium text-cream-50">
            {EFFORT_LEDGER.headline}
            <span className="mt-1 block text-accent">{EFFORT_LEDGER.headlineAccent}</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-forest-700">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-forest-700">
                  {EFFORT_LEDGER.columns.map((col) => (
                    <th key={col} scope="col" className="p-4 text-sm font-medium text-mist">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EFFORT_LEDGER.rows.map((row) => (
                  <tr key={row[0]} className="border-b border-forest-700 last:border-0">
                    <th scope="row" className="p-4 text-sm font-medium text-cream-50">
                      {row[0]}
                    </th>
                    <td className="p-4 text-sm text-mist">{row[1]}</td>
                    <td className="p-4 text-sm font-medium text-accent">{row[2]}</td>
                  </tr>
                ))}
                <tr className="bg-forest-900/50">
                  <th scope="row" className="p-4 text-sm font-medium text-cream-50">
                    {EFFORT_LEDGER.totals.label}
                  </th>
                  <td className="p-4 text-sm text-mist">{EFFORT_LEDGER.totals.agency}</td>
                  <td className="p-4 text-sm font-medium text-accent">{EFFORT_LEDGER.totals.mine}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

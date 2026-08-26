import Reveal from '@/components/motion/Reveal';
import { COMPARISON } from '@/data/home';

/** SECTION 10 — Honest comparison (light). */
export default function Comparison() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent-ink">{COMPARISON.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="lede mt-6 max-w-2xl text-ink-soft">{COMPARISON.lede}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="eyebrow mt-6 text-ink-soft md:hidden">{COMPARISON.swipeHint}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-cream-300">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-cream-300 bg-cream-100">
                  <th scope="col" className="p-4 text-sm font-medium text-ink-soft">
                    &nbsp;
                  </th>
                  {COMPARISON.columns.map((col) => {
                    const isOwn = col === 'MGRTECH';
                    return (
                      <th
                        key={col}
                        scope="col"
                        className={
                          isOwn
                            ? 'relative bg-forest-950 p-4 text-sm font-medium text-cream-50'
                            : 'p-4 text-sm font-medium text-forest-950'
                        }
                      >
                        {col}
                        {isOwn && (
                          <span className="eyebrow ml-2 rounded-full bg-accent px-2 py-0.5 text-[0.625rem] text-forest-950">
                            {COMPARISON.ownColumnLabel}
                          </span>
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.rows.map((row) => (
                  <tr key={row.criteria} className="border-b border-cream-300 last:border-0">
                    <th
                      scope="row"
                      className="bg-cream-100 p-4 text-sm font-medium text-forest-950"
                    >
                      {row.criteria}
                    </th>
                    {row.cells.map((cell, i) => {
                      const isOwn = COMPARISON.columns[i] === 'MGRTECH';
                      return (
                        <td
                          key={i}
                          className={
                            isOwn
                              ? 'bg-forest-950/[0.04] p-4 text-sm font-medium text-forest-950'
                              : 'p-4 text-sm text-ink-soft'
                          }
                        >
                          {cell}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

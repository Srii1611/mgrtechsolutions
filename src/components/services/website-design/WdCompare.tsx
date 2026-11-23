import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import { WD_COMPARE } from '@/data/website-design';
import { Band, SectionHead } from '@/components/services/website-design/WdBits';

/** Comparison matrix. MGRTECH's column is the dark one. Scrolls sideways on a phone. */
export default function WdCompare() {
  const c = WD_COMPARE;
  return (
    <Band id="compare" tone="tint" labelledBy="wd-compare-heading">
      <SectionHead id="wd-compare-heading" eyebrow={c.eyebrow} heading={c.heading} lede={c.lede} />
      <Reveal>
        <div className="wd-mtx" tabIndex={0} role="region" aria-label="Comparison table">
          <table>
            <caption className="sr-only">{c.heading}</caption>
            <thead>
              <tr>
                <th scope="col"><span className="sr-only">Compared on</span></th>
                {c.columns.map((col) => (
                  <th key={col.name} scope="col">
                    {col.name}
                    <small>{col.sub}</small>
                  </th>
                ))}
                <th scope="col" className="wd-us-c">
                  {c.us.name}
                  <small>{c.us.sub}</small>
                </th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  {r.cells.map((cell, i) => (
                    <td key={i}>{cell}</td>
                  ))}
                  <td className="wd-us-c">{r.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
      <p className="wd-note">
        {c.note}{' '}
        {c.reads.map((r, i) => (
          <span key={r.label}>
            {i > 0 && ', '}
            {'href' in r ? (
              <a className="wd-lk" href={r.href}>{r.label}</a>
            ) : (
              <Link className="wd-lk" href={`/blog/${r.slug}`}>{r.label}</Link>
            )}
          </span>
        ))}
        .
      </p>
    </Band>
  );
}

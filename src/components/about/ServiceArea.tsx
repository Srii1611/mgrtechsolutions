import Reveal from '@/components/motion/Reveal';
import { SERVICE_AREA } from '@/data/about';
import { SITE } from '@/data/site';

/** S4 — Service Area + Contact Facts (dark). Phone/email read from SITE. */
export default function ServiceArea() {
  return (
    <section className="on-dark bg-forest-950 py-20 md:py-28" aria-labelledby="service-area-heading">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow text-accent">{SERVICE_AREA.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="service-area-heading" className="h2-section mt-4 font-medium text-cream-50">
              {SERVICE_AREA.headline}
              <span className="mt-1 block text-accent">{SERVICE_AREA.headlineAccent}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede mt-6 max-w-xl text-mist">{SERVICE_AREA.body}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="mt-8 flex flex-wrap gap-3">
              {SERVICE_AREA.towns.map((town) => (
                <li
                  key={town}
                  className="eyebrow rounded-full border border-forest-700 px-4 py-2 text-cream-50"
                >
                  {town}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="eyebrow mt-8 text-mist">{SERVICE_AREA.footnote}</p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-forest-700 p-8">
            <p className="eyebrow text-mist">{SERVICE_AREA.factsLabel}</p>
            <dl className="mt-6 space-y-5">
              {SERVICE_AREA.facts.map((fact) => {
                let value: string;
                let href: string | undefined;
                if ('fromSite' in fact && fact.fromSite === 'phone') {
                  value = SITE.phone;
                  href = SITE.phoneHref;
                } else if ('fromSite' in fact && fact.fromSite === 'email') {
                  value = SITE.email;
                  href = `mailto:${SITE.email}`;
                } else {
                  value = 'value' in fact ? fact.value : '';
                }
                return (
                  <div key={fact.label} className="border-b border-forest-700 pb-5 last:border-0 last:pb-0">
                    <dt className="eyebrow text-mist">{fact.label}</dt>
                    <dd className="mt-1 text-[1.0625rem] font-medium text-cream-50">
                      {href ? (
                        <a href={href} className="transition-colors hover:text-accent">
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

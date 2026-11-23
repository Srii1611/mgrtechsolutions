import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import { getPost } from '@/lib/blog';
import { SITE } from '@/data/site';
import PriceTiers from '@/components/services/service-page/PriceTiers';
import RelatedGuides from '@/components/blog/RelatedGuides';
import type { GuidePage } from '@/data/related-guides';
import type { ServicePageData } from '@/data/service-pages/types';
import { Band, Bullets, SectionHead } from '@/components/services/website-design/WdBits';
import ScrollRail from '@/components/services/website-design/ScrollRail';
import SpDayBar from '@/components/services/service-page/SpDayBar';
import HeroBackdrop from '@/components/services/service-page/HeroBackdrop';

/** Hero (dark): promise, two actions, and four quick facts. */
export function SpHero({ data, serviceName, slug }: { data: ServicePageData['hero']; serviceName: string; slug: string }) {
  return (
    <section id="overview" className="wd-night wd-hero" aria-labelledby="sp-hero-heading">
      <HeroBackdrop slug={slug} />
      <div className="wd-wrap">
        <nav aria-label="Breadcrumb" className="wd-crumbs">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>Services</span>
          <span aria-hidden="true">/</span>
          <span>{data.breadcrumb}</span>
        </nav>
        <h1 id="sp-hero-heading">
          {data.headline}
          <em>{data.headlineAccent}</em>
        </h1>
        <p className="wd-lede">{data.lede}</p>
        <div className="wd-btnrow">
          <a className="wd-btn wd-btn-primary" href={SITE.phoneHref}>
            Call <span className="wd-tel">{SITE.phone}</span>
          </a>
          <a className="wd-btn wd-btn-ghost" href="#contact">{data.secondaryCta}</a>
        </div>
        <small>{SITE.location}</small>
        <div className="wd-strip" aria-label={`${serviceName} at a glance`}>
          {data.facts.map((f) => (
            <div key={f.title}>
              <b>{f.title}</b>
              {f.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** The four commitments, as editorial rows: label and title, a sentence, then the details. */
export function SpCommitments({ data }: { data: ServicePageData['commitments'] }) {
  return (
    <Band labelledBy="sp-commit-heading">
      <SectionHead id="sp-commit-heading" heading={data.heading} lede={data.lede} />
      <div className="wd-rows">
        {data.rows.map((r, i) => (
          <Reveal key={r.title} delay={i * 0.05}>
            <div className="wd-row">
              <div>
                <span className="wd-tag">{r.tag}</span>
                <h3>{r.title}</h3>
              </div>
              <p>{r.text}</p>
              <Bullets items={r.points} />
            </div>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}

/** Steps on a vertical rail, each with We do / You do / You get. */
export function SpHow({ data }: { data: ServicePageData['how'] }) {
  return (
    <Band id="how" labelledBy="sp-how-heading">
      <SectionHead id="sp-how-heading" eyebrow={data.eyebrow} heading={data.heading} lede={data.lede} />
      <ScrollRail>
        {data.steps.map((s) => (
          <Reveal key={s.title}>
            <div className="wd-stp">
              <div className="wd-head">
                <h3>{s.title}</h3>
              </div>
              <p>{s.text}</p>
              <div className="wd-trio">
                <div>
                  <h4>We do</h4>
                  <Bullets items={s.we} />
                </div>
                <div>
                  <h4>You do</h4>
                  <Bullets items={s.you} />
                </div>
                <div>
                  <h4>You get</h4>
                  <Bullets items={s.get} />
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </ScrollRail>
      <p className="wd-note">
        {data.readLead}{' '}
        <Link className="wd-lk" href={`/blog/${data.read.slug}`}>
          {data.read.label}
        </Link>
        .
      </p>
    </Band>
  );
}

/** The price cards, read from src/data/prices.ts, and the facts under them. */
export function SpPricing({ data }: { data: ServicePageData['pricing'] }) {
  return (
    <Band id="pricing" tone="tint" labelledBy="sp-pricing-heading">
      <SectionHead id="sp-pricing-heading" eyebrow={data.eyebrow} heading={data.heading} lede={data.lede} />

      <PriceTiers service={data.service} alsoShow={data.alsoShow} />

      <Reveal>
        <div className="wd-facts3">
          {data.facts.map((f) => (
            <div key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
              <Bullets items={f.items} x={f.kind === 'x'} />
            </div>
          ))}
        </div>
      </Reveal>

      <p className="wd-note">
        {data.readLead}{' '}
        {data.reads.map((r, i) => (
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

/** The build as a to-scale bar, then a row per phase with the owner's time. */
export function SpTimeline({ data }: { data: ServicePageData['timeline'] }) {
  return (
    <Band id="timeline" tone="dark" className="wd-tl" labelledBy="sp-timeline-heading">
      <SectionHead id="sp-timeline-heading" eyebrow={data.eyebrow} heading={data.heading} lede={data.lede} dark />
      <SpDayBar phases={data.phases} label={`${data.heading} Drawn to scale.`} />
      <Reveal>
        <div className="wd-phases">
          {data.phases.map((p, i) => (
            <div key={p.key} className="wd-ph">
              <div className="wd-d">
                <i className={`wd-c${i + 1}`} />
                {p.days}
              </div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <div className="wd-yt">{p.time}</div>
            </div>
          ))}
          <div className="wd-ph">
            <div className="wd-d">
              <i style={{ border: '1.5px dashed var(--mist)' }} />
              {data.after.days}
            </div>
            <h3>{data.after.title}</h3>
            <p>{data.after.text}</p>
            <div className="wd-yt">{data.after.time}</div>
          </div>
        </div>
      </Reveal>
      <Reveal>
        <p className="wd-callout">
          <b>{data.callout.lead}</b> {data.callout.text}
        </p>
      </Reveal>
    </Band>
  );
}

/** Comparison matrix. MGRTECH's column is the dark one. Scrolls sideways on a phone. */
export function SpCompare({ data }: { data: ServicePageData['compare'] }) {
  return (
    <Band id="compare" tone="tint" labelledBy="sp-compare-heading">
      <SectionHead id="sp-compare-heading" eyebrow={data.eyebrow} heading={data.heading} lede={data.lede} />
      <Reveal>
        <div className="wd-mtx" tabIndex={0} role="region" aria-label="Comparison table">
          <table>
            <caption className="sr-only">{data.heading}</caption>
            <thead>
              <tr>
                <th scope="col"><span className="sr-only">Compared on</span></th>
                {data.columns.map((col) => (
                  <th key={col.name} scope="col">
                    {col.name}
                    <small>{col.sub}</small>
                  </th>
                ))}
                <th scope="col" className="wd-us-c">
                  {data.us.name}
                  <small>{data.us.sub}</small>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.rows.map((r) => (
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
        {data.note}{' '}
        {data.reads.map((r, i) => (
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

/** Split panels: who it suits (light) and who it doesn't (dark). */
export function SpFit({ data }: { data: ServicePageData['fit'] }) {
  return (
    <Band id="fit" labelledBy="sp-fit-heading">
      <SectionHead id="sp-fit-heading" eyebrow={data.eyebrow} heading={data.heading} lede={data.lede} />
      <Reveal>
        <div className="wd-split">
          <div className="wd-yes">
            <h3>{data.yesTitle}</h3>
            <Bullets items={data.yes} />
          </div>
          <div className="wd-no wd-night">
            <h3>{data.noTitle}</h3>
            <Bullets items={data.no} x />
          </div>
        </div>
      </Reveal>
    </Band>
  );
}

/**
 * Related guides for the page (cards, from src/data/related-guides.ts). A page with no
 * entry there yet (e-commerce) keeps its featured guide plus grouped links.
 */
export function SpGuides({ data, slug }: { data: ServicePageData['guides']; slug: string }) {
  if (!data.featured || !data.groups) {
    return (
      <Band id="guides" labelledBy="sp-guides-heading">
        <SectionHead id="sp-guides-heading" eyebrow={data.eyebrow} heading={data.heading} lede={data.lede} />
        <Reveal>
          <RelatedGuides page={slug as GuidePage} heading="Related guides" />
        </Reveal>
      </Band>
    );
  }
  const feat = getPost(data.featured.slug);
  return (
    <Band id="guides" labelledBy="sp-guides-heading">
      <SectionHead id="sp-guides-heading" eyebrow={data.eyebrow} heading={data.heading} lede={data.lede} />
      <div className="wd-gd">
        {feat && (
          <Reveal>
            <Link className="wd-feat" href={`/blog/${feat.slug}`}>
              <span>{data.featured.kicker}</span>
              <b>{feat.title}</b>
              <p>{data.featured.blurb}</p>
              <em>Read the guide &rarr;</em>
            </Link>
          </Reveal>
        )}
        <Reveal delay={0.08}>
          <div className="wd-glist">
            {data.groups.map((g) => (
              <section key={g.title} aria-label={g.title}>
                <h3>{g.title}</h3>
                {g.slugs.map((slug) => {
                  const post = getPost(slug);
                  return post ? (
                    <Link key={slug} href={`/blog/${slug}`}>
                      {post.title}
                    </Link>
                  ) : null;
                })}
              </section>
            ))}
          </div>
        </Reveal>
      </div>
    </Band>
  );
}

/** FAQ: sticky side column beside native accordions (no JS needed). */
export function SpFaq({ data }: { data: ServicePageData['faq'] }) {
  return (
    <section id="faq" aria-labelledby="sp-faq-heading" className="wd-band wd-alt">
      <div className="wd-wrap wd-faqw">
        <Reveal>
          <div className="wd-faqside">
            <p className="wd-eyebrow">{data.eyebrow}</p>
            <h2 id="sp-faq-heading">{data.heading}</h2>
            <p className="wd-lede" style={{ fontSize: '1rem' }}>{data.lede}</p>
            <div className="wd-btnrow" style={{ marginTop: 22 }}>
              <a className="wd-btn wd-btn-ghost" href="#contact">Ask a question</a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div>
            {data.items.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <p>
                  {f.a}
                  {f.read && (
                    <>
                      {' '}
                      See{' '}
                      <Link className="wd-lk" href={`/blog/${f.read.slug}`}>
                        {f.read.label}
                      </Link>
                      .
                    </>
                  )}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Link rows to the other services. */
export function SpRelated({ data }: { data: ServicePageData['related'] }) {
  return (
    <Band labelledBy="sp-related-heading">
      <SectionHead id="sp-related-heading" eyebrow={data.eyebrow} heading={data.heading} lede={data.lede} />
      <Reveal>
        <div className="wd-lrows">
          {data.items.map((r) => (
            <Link key={r.title} className="wd-lrow" href={r.href}>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
              <i aria-hidden="true">&rarr;</i>
            </Link>
          ))}
        </div>
      </Reveal>
    </Band>
  );
}

/** Closing call to action (dark): free site review by phone or email. */
export function SpClose({ data }: { data: ServicePageData['close'] }) {
  return (
    <section id="contact" aria-labelledby="sp-close-heading" className="wd-night wd-band wd-close">
      <div className="wd-wrap">
        <Reveal>
          <p className="wd-eyebrow wd-eyebrow-accent">{data.eyebrow}</p>
          <h2 id="sp-close-heading">
            {data.heading} <span>{data.accent}</span>
          </h2>
          <p className="wd-lede">{data.body}</p>
          <div className="wd-btnrow">
            <a className="wd-btn wd-btn-primary" href={SITE.phoneHref} aria-label={`Call ${SITE.name} at ${SITE.phone}`}>
              Call us
            </a>
            <a className="wd-btn wd-btn-ghost" href={`mailto:${SITE.email}`}>{data.emailCta}</a>
          </div>
          <p className="wd-reach">
            Email: <b>{SITE.email}</b>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

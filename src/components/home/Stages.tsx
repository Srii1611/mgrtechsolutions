import { MapPin, MousePointerClick, PhoneCall, Check } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import StageBeam from '@/components/motion/StageBeam';
import { STAGES } from '@/data/home';
import { SITE } from '@/data/site';

const ICONS = { MapPin, MousePointerClick, PhoneCall } as const;

/**
 * SECTION 02 — How the work actually works (light).
 *
 * A Server Component. The stage headings stick with plain CSS `position:
 * sticky`, so the only client code in the whole section is the progress beam.
 * That matters here more than anywhere else on the page: this section carries
 * the most copy, and it all has to arrive in the server HTML.
 *
 * Below `lg` the sticky behaviour and the two-column rail both collapse to a
 * plain stacked list — the sticky-scroll pattern is where this design would
 * most likely stutter on a mid-range phone, so it simply does not run there.
 */
export default function Stages() {
  return (
    <section className="bg-cream-50 py-20 md:py-28" aria-labelledby="stages-heading">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent-ink">{STAGES.eyebrow}</p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2
            id="stages-heading"
            className="h2-section mt-6 max-w-4xl font-medium text-forest-950"
          >
            {STAGES.headline}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="lede mt-8 max-w-3xl text-ink-soft">{STAGES.intro}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-5 max-w-3xl text-[1.0625rem] leading-[1.7] text-ink-soft">
            {STAGES.introSecondary}
          </p>
        </Reveal>
      </div>

      <StageBeamGroup />
    </section>
  );
}

function StageBeamGroup() {
  const [one, two, three] = STAGES.stages;

  return (
    <div className="mt-20">
      {/*
        `container-page` is applied to the stage groups rather than to the
        whole beam, so the hinge band is full-bleed simply by being outside a
        container. The previous version escaped with `left-1/2 w-screen
        -translate-x-1/2`, but 100vw includes the vertical scrollbar, which
        forced a horizontal scrollbar on every page view.
      */}
      <StageBeam>
        <div className="container-page">
          <Stage stage={one} />
          <Stage stage={two} />
        </div>

        <Hinge />

        <div className="container-page">
          <Stage stage={three} emphasis />
        </div>
      </StageBeam>

      <div className="container-page">
        <Closer />
      </div>
    </div>
  );
}

function Stage({
  stage,
  emphasis = false,
}: {
  stage: (typeof STAGES.stages)[number];
  emphasis?: boolean;
}) {
  const Icon = ICONS[stage.icon];

  return (
    <article className="relative grid gap-6 pb-24 lg:grid-cols-[88px_1fr] lg:gap-10">
      {/*
        Left rail — the node marker and the ghosted numeral.

        The column is 88px and the numeral is 3.75rem with `tabular-nums`, so
        two digits measure ~66px and sit INSIDE the track. At 4.5rem in a 64px
        column they overflowed by ~16px into the gutter, which is the kind of
        near-miss that becomes a visible overlap under a fallback font.

        Sticky on desktop only, and bounded by this <article>, so a stage's
        numeral can never travel into the next stage's copy.
      */}
      <div className="lg:sticky lg:top-40 lg:self-start">
        <span
          aria-hidden="true"
          className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-accent-ink ring-4 ring-cream-50 lg:h-[22px] lg:w-[22px]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cream-50" />
        </span>

        <span
          aria-hidden="true"
          className="mt-4 hidden text-[3.75rem] font-semibold leading-none tracking-tight tabular-nums text-cream-300 lg:block"
        >
          {stage.index}
        </span>
      </div>

      <div className="pl-8 lg:pl-0">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-accent-ink">
            <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            <span className="lg:hidden">{stage.index} — </span>
            {stage.label}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h3 className="h3-card mt-4 max-w-2xl font-medium text-forest-950">
            {stage.headline}
          </h3>
        </Reveal>

        {stage.body.map((para, i) => (
          <Reveal key={i} delay={0.1 + i * 0.04}>
            <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.7] text-ink-soft">
              {para}
            </p>
          </Reveal>
        ))}

        {/* Stage 03 is the differentiator, so its build list gets the dark
            treatment rather than the light card the first two use. */}
        <Reveal delay={0.2}>
          <div
            className={
              emphasis
                ? 'on-dark mt-10 max-w-2xl rounded-2xl border-2 border-accent bg-forest-950 p-8'
                : 'mt-10 max-w-2xl rounded-2xl border border-cream-300 bg-cream-100 p-8'
            }
          >
            <p className={`eyebrow ${emphasis ? 'text-accent' : 'text-ink-soft'}`}>
              {stage.buildLabel}
            </p>

            <ul className="mt-5 space-y-3">
              {stage.build.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check
                    className={`mt-1 h-4 w-4 shrink-0 ${emphasis ? 'text-accent' : 'text-accent-ink'}`}
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                  <span
                    className={`text-[1.0625rem] leading-[1.6] ${emphasis ? 'text-cream-100' : 'text-forest-950'}`}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-6 max-w-2xl border-l-2 border-accent-ink pl-5 text-[1.0625rem] leading-[1.7] text-ink-soft">
            <span className="font-medium text-forest-950">{stage.costLabel}: </span>
            {stage.cost}
          </p>
        </Reveal>
      </div>
    </article>
  );
}

/**
 * The hinge. Sits between stages 02 and 03 — that placement is the point, so
 * it must not move. Full-bleed by construction: it lives outside the
 * `container-page` wrappers rather than escaping one with a viewport hack.
 */
function Hinge() {
  return (
    <Reveal className="relative z-10 mb-24 bg-accent py-20 md:py-24">
      <p className="container-page text-center text-[clamp(1.75rem,4.2vw,3rem)] font-medium leading-[1.15] text-forest-950">
        {STAGES.hinge.line1}
        <br />
        {STAGES.hinge.line2}
      </p>
    </Reveal>
  );
}

function Closer() {
  return (
    <div className="mt-4 max-w-3xl">
      {STAGES.closer.map((para, i) => (
        <Reveal key={i} delay={i * 0.05}>
          <p className="mt-5 text-[1.0625rem] leading-[1.7] text-ink-soft">{para}</p>
        </Reveal>
      ))}

      <Reveal delay={0.15}>
        <div className="mt-10">
          <p className="max-w-2xl text-[1.0625rem] leading-[1.7] text-forest-950">
            {STAGES.cta}
          </p>
          <a
            href={SITE.phoneHref}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-forest-950 transition hover:bg-accent-strong"
          >
            <PhoneCall className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            Call {SITE.phone}
          </a>
        </div>
      </Reveal>
    </div>
  );
}

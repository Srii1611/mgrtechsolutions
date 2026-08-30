'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { OBJECTIONS } from '@/data/home';

/**
 * SECTION 04 — The questions people actually ask (light).
 *
 * A grid of question cards; clicking one opens its answer in a full-width
 * panel directly beneath that card's row. The pattern is a DISCLOSURE ROW —
 * the same shape Google Images and Apple's product grids use.
 *
 * Why the answer is not expanded inside the card's own cell: growing one
 * cell in a CSS grid stretches its row-mates to match and reflows everything
 * below it. Eleven answers of two to three paragraphs would also be crushed
 * into a ~350px column. The full-width panel keeps the grid rigid and gives
 * the prose the container's whole width.
 *
 * Why this is not cult-ui's <ExpandableCard>, which the layout was modelled
 * on: that component sizes itself from fixed pixel `collapsedSize` and
 * `expandedSize`. These answers vary in length, so a fixed expanded size
 * would clip the long ones and leave dead space under the short ones. It
 * also needs shadcn (`cn`, badge, button, tooltip, avatar) and `motion/react`
 * — none of which this repo has, and none of which one section justifies.
 * The interaction is ported; the dependency is not.
 *
 * Accessibility is unchanged from the accordion this replaces: every card is
 * a real <button> with aria-expanded/aria-controls, so it works by click, by
 * keyboard and under a screen reader, and motion is gated on
 * prefers-reduced-motion.
 *
 * Colours come from @theme tokens (hard rule 4).
 */

/** Desktop column count. The tablet and mobile steps are derived from it. */
const COLUMNS = 3;

/**
 * Which breakpoint is live, as a column count.
 *
 * The panel has to be inserted after the last card of the clicked card's ROW,
 * and what counts as a row changes with the breakpoint — so this one fact
 * cannot be left to CSS. It starts at the desktop value and corrects on
 * mount; nothing is open on first paint, so the pre-hydration value is never
 * visible.
 */
function useColumns(): number {
  const [columns, setColumns] = useState(COLUMNS);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const tablet = window.matchMedia('(min-width: 640px)');

    const sync = () => setColumns(desktop.matches ? COLUMNS : tablet.matches ? 2 : 1);

    sync();
    desktop.addEventListener('change', sync);
    tablet.addEventListener('change', sync);
    return () => {
      desktop.removeEventListener('change', sync);
      tablet.removeEventListener('change', sync);
    };
  }, []);

  return columns;
}

export default function Objections() {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const columns = useColumns();

  const items = OBJECTIONS.items;

  // Chunk into rows so the answer panel can be emitted after the row that
  // holds the open card rather than after the card itself.
  const rows: number[][] = [];
  for (let i = 0; i < items.length; i += columns) {
    rows.push(items.map((_, index) => index).slice(i, i + columns));
  }

  return (
    <section className="py-20 md:py-28" aria-labelledby="objections-heading">
      <div className="container-page">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="eyebrow text-center text-accent-ink">{OBJECTIONS.eyebrow}</p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2
              id="objections-heading"
              className="h2-section mt-6 text-center font-medium text-forest-950"
            >
              {OBJECTIONS.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-center text-[1.0625rem] leading-[1.7] text-ink-soft">
              {OBJECTIONS.lede}
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rows.map((row) => {
              const openIndex = open;
              const openInRow = openIndex !== null && row.includes(openIndex);

              return (
                <div key={row[0]} className="contents">
                  {row.map((index) => (
                    <Card
                      key={items[index].q}
                      index={index}
                      item={items[index]}
                      isOpen={open === index}
                      onToggle={() => setOpen(open === index ? null : index)}
                    />
                  ))}

                  <AnimatePresence initial={false}>
                    {openInRow && openIndex !== null && (
                      <Panel
                        index={openIndex}
                        item={items[openIndex]}
                        caretOffset={
                          columns > 1 ? ((row.indexOf(openIndex) + 0.5) / columns) * 100 : null
                        }
                        reduce={!!reduce}
                      />
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <Reveal delay={0.1}>
            <p className="mt-12 text-center text-[1.0625rem] leading-[1.7] text-ink-soft">
              {OBJECTIONS.closing}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Card({
  index,
  item,
  isOpen,
  onToggle,
}: {
  index: number;
  item: (typeof OBJECTIONS.items)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const number = String(index + 1).padStart(2, '0');

  // The <h3> is the grid item and the button fills it, rather than the
  // heading being `display: contents`. That property has a long history of
  // dropping the element from the accessibility tree, and the heading is what
  // makes this a navigable list of questions.
  return (
    <h3 className="h-full">
      <button
        id={`objection-${index}-trigger`}
        type="button"
        aria-expanded={isOpen}
        aria-controls={`objection-${index}-panel`}
        onClick={onToggle}
        className={`flex h-full w-full items-start gap-3 rounded-xl px-5 py-4 text-left transition-colors ${
          isOpen
            ? 'bg-accent/20 text-accent-ink ring-1 ring-accent-ink/30'
            : 'bg-cream-100 text-forest-950 hover:bg-cream-300'
        }`}
      >
        <span
          aria-hidden="true"
          className={`mt-0.5 text-[0.75rem] font-semibold tabular-nums ${
            isOpen ? 'text-accent-ink' : 'text-ink-soft'
          }`}
        >
          {number}
        </span>

        <span className="flex-1 font-medium leading-[1.45]">{item.q}</span>

        <span
          aria-hidden="true"
          className={`mt-0.5 shrink-0 transition-colors ${
            isOpen ? 'text-accent-ink' : 'text-ink-soft'
          }`}
        >
          {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        </span>
      </button>
    </h3>
  );
}

/**
 * The answer, spanning every column of the grid.
 *
 * `caretOffset` is the horizontal centre of the card that opened it, as a
 * percentage of the grid's width — the one thing that ties an answer to its
 * question once the panel is wider than the card. It is null in the
 * single-column layout, where the panel already sits directly under its card.
 */
function Panel({
  index,
  item,
  caretOffset,
  reduce,
}: {
  index: number;
  item: (typeof OBJECTIONS.items)[number];
  caretOffset: number | null;
  reduce: boolean;
}) {
  return (
    <motion.div
      id={`objection-${index}-panel`}
      role="region"
      aria-labelledby={`objection-${index}-trigger`}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={reduce ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="col-span-full overflow-hidden"
    >
      <div className="relative mt-1">
        {caretOffset !== null && (
          <span
            aria-hidden="true"
            style={{ left: `${caretOffset}%` }}
            className="absolute -top-[7px] h-4 w-4 -translate-x-1/2 rotate-45 rounded-[3px] bg-accent-ink"
          />
        )}

        <div className="relative rounded-2xl bg-accent-ink px-6 py-5 text-cream-50">
          <div className="max-w-3xl">
            {item.a.map((para) => (
              <p key={para} className="text-[1rem] leading-[1.65] [&+p]:mt-3">
                {para}
              </p>
            ))}

            {/* Attribution. These answers lean on specific figures, so the
                sources are shown rather than buried. */}
            <p className="mt-4 border-t border-cream-50/20 pt-3 text-[0.75rem] leading-relaxed text-cream-100/80">
              <span className="font-semibold text-accent">Source: </span>
              {item.sources.join(' · ')}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

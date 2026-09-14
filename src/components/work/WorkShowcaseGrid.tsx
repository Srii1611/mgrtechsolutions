import Reveal from '@/components/motion/Reveal';
import WorkShowcaseCard from '@/components/work/WorkShowcaseCard';
import { WORK_SHOWCASE } from '@/data/work-showcase';

/**
 * The portfolio showcase grid.
 *
 * A Server Component. Only the tile is a client leaf, and only because the
 * touch path needs an IntersectionObserver — the markup and every image URL
 * ship in the server HTML.
 */
export default function WorkShowcaseGrid() {
  return (
    // `grid-cols-1` is minmax(0, 1fr), not the implicit `auto` track: an auto
    // track can't shrink below the card's chrome bar (domain + badge), which
    // pushed the page ~20px wider than a 375px phone.
    <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {WORK_SHOWCASE.map((item, i) => (
        <li key={item.slug}>
          <Reveal delay={i * 0.06}>
            <WorkShowcaseCard item={item} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

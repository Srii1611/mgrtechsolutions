/**
 * Headline entrance: each letter draws in as an accent outline, then the
 * solid fill wipes down through it.
 *
 * Deliberately a SERVER COMPONENT (spec §3, hard rule 6). The animation is
 * pure CSS in globals.css, so:
 *  - the full headline ships in the server HTML (the SEO fix in spec §3)
 *  - nothing waits on hydration, so there is no flash of unstyled text
 *  - prefers-reduced-motion is handled by CSS, not by a script that has to
 *    download first (hard rule 5)
 *
 * The visible letters are aria-hidden and the real sentence is exposed once
 * via an sr-only span, so assistive tech reads "Your competitors aren't
 * better." rather than spelling it out letter by letter (hard rule 9).
 */
export default function StrokeText({
  text,
  className = '',
  /** Offset into the stagger, so a second line continues the first's cascade. */
  startIndex = 0,
}: {
  text: string;
  className?: string;
  startIndex?: number;
}) {
  const words = text.split(' ');
  let i = startIndex;

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>

      <span aria-hidden="true">
        {words.map((word, wi) => (
          <span key={wi}>
            {/* Each word is one inline-block so lines break between words,
                never mid-word, even though the letters are separate spans. */}
            <span className="inline-block whitespace-nowrap">
              {Array.from(word).map((ch, ci) => {
                const index = i++;
                return (
                  <span
                    key={ci}
                    className="stroke-char"
                    style={{ '--i': index } as React.CSSProperties}
                  >
                    <span className="stroke-char__fill">{ch}</span>
                    <span className="stroke-char__outline">{ch}</span>
                  </span>
                );
              })}
            </span>
            {wi < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </span>
    </span>
  );
}

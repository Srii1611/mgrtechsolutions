import Reveal from '@/components/motion/Reveal';

const OPTIONS = [
  {
    index: '01',
    name: 'Talk to a Human',
    line: 'Call or email, one point of contact, no handoffs.',
    target: '#talk',
    featured: true,
  },
  {
    index: '02',
    name: 'Free Site Review',
    line: 'Send your URL, get the 3 things costing you calls.',
    target: '#review',
    featured: false,
  },
  {
    index: '03',
    name: 'Request a Quote / Book a Call',
    line: 'Tell me what you need, or pick a time for a free 15-minute call.',
    target: '#quote',
    featured: false,
  },
] as const;

/** Contact page: the three ways to start. "Talk to a Human" comes first and is the largest. */
export default function ContactOptions() {
  return (
    <section className="bg-cream-50 py-16" aria-labelledby="contact-options-heading">
      <div className="container-page">
        <h2 id="contact-options-heading" className="sr-only">
          Three ways to start
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          {OPTIONS.map((option, i) => (
            <Reveal key={option.index} delay={i * 0.08} className={option.featured ? 'md:col-span-2 lg:col-span-1' : undefined}>
              <a
                href={option.target}
                className={
                  option.featured
                    ? 'block h-full rounded-2xl border-2 border-accent-ink bg-forest-950 p-8 text-cream-50 transition-colors hover:border-accent md:p-10'
                    : 'block h-full rounded-2xl border border-cream-300 bg-cream-100 p-8 transition-colors hover:border-accent-ink'
                }
              >
                <p className={option.featured ? 'eyebrow text-accent' : 'eyebrow text-accent-ink'}>{option.index}</p>
                <p className={`${option.featured ? 'h2-section text-cream-50' : 'h3-card text-forest-950'} mt-4 font-medium`}>
                  {option.name}
                </p>
                <p
                  className={`mt-3 text-[1.0625rem] leading-[1.7] ${option.featured ? 'text-mist' : 'text-ink-soft'}`}
                >
                  {option.line}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

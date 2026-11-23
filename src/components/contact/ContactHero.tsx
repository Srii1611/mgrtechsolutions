import Link from 'next/link';

export default function ContactHero() {
  return (
    <section className="dot-grid on-dark bg-forest-950 pb-16 pt-24">
      <div className="container-page">
        <nav aria-label="Breadcrumb" className="eyebrow text-mist">
          <Link href="/" className="transition-colors hover:text-accent">
            HOME
          </Link>
          <span className="mx-2 text-forest-700" aria-hidden="true">
            /
          </span>
          <span className="text-accent">CONTACT</span>
        </nav>

        <h1 className="h1-page mt-10 max-w-4xl font-medium text-cream-50">
          Three ways to start.
          <span className="mt-1 block text-accent">Pick whichever fits.</span>
        </h1>

        <p className="lede mt-8 max-w-xl text-mist">
          Already have a website? Start with the free review. Don&rsquo;t have one yet? Request a
          quote or book a call. Either way, you can just call.
        </p>

        <p className="lede mt-4 max-w-xl text-mist">
          No drip campaigns, no sales sequence, no pressure either way.
        </p>
      </div>
    </section>
  );
}

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

        <p className="eyebrow mt-8 text-accent">— CONTACT</p>

        <h1 className="h1-page mt-4 max-w-4xl font-medium text-white">
          Two ways to start.
          <span className="mt-1 block text-accent">
            Neither is a form you&rsquo;ll regret.
          </span>
        </h1>

        <p className="lede mt-8 max-w-xl text-mist">
          Call and talk to the person who&rsquo;d build your site — or send your URL and get an
          honest, free review first. No drip campaigns, no sales sequence, no pressure either way.
        </p>
      </div>
    </section>
  );
}

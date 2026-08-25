import Link from 'next/link';
import { SITE, NAV, FOOTER_CATEGORIES } from '@/data/site';

export default function Footer() {
  return (
    <footer className="on-dark bg-forest-950 py-16 text-mist">
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="eyebrow text-accent">{SITE.name}</p>
            <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed">
              {SITE.tagline}
            </p>
            <p className="mt-6 text-[0.9375rem]">{SITE.location}</p>
            <a
              href={SITE.phoneHref}
              className="mt-4 block text-lg font-semibold text-white transition-colors hover:text-accent"
            >
              {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-1 block text-[0.9375rem] transition-colors hover:text-accent"
            >
              {SITE.email}
            </a>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow text-white">Pages</p>
            <ul className="mt-4 space-y-2">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Blog categories">
            <p className="eyebrow text-white">Topics</p>
            <ul className="mt-4 space-y-2">
              {FOOTER_CATEGORIES.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-[0.9375rem] transition-colors hover:text-accent"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 border-t border-forest-700 pt-8">
          <p className="text-[0.8125rem]">
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

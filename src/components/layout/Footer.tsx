import Link from 'next/link';
import { SITE, FOOTER_CATEGORIES } from '@/data/site';
import FooterPhone from '@/components/layout/FooterPhone';
import SocialLinks from '@/components/layout/SocialLinks';

/** Each service page, linked directly. /services redirects to Website Design, so it is not linked. */
const SERVICE_LINKS = [
  { href: '/services/website-design', label: 'Website Design & Development' },
  { href: '/services/seo', label: 'SEO' },
  { href: '/services/google-ads', label: 'Google Ads & PPC' },
  { href: '/services/social-media', label: 'Social Media Management' },
  { href: '/services/ecommerce', label: 'E-commerce' },
  { href: '/services/ai-automation', label: 'AI Automation' },
] as const;

const INDUSTRY_LINKS = [
  { href: '/industries#trades-contractors', label: 'Trades & Contractors' },
  { href: '/industries#auto-motorsports', label: 'Auto & Motorsports' },
  { href: '/industries#retail-ecommerce', label: 'Retail & E-commerce' },
  { href: '/industries#local-services', label: 'Local Services' },
] as const;

const COMPANY_LINKS = [
  { href: '/process', label: 'Process' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
] as const;

function Column({ heading, links }: { heading: string; links: readonly { href: string; label: string }[] }) {
  return (
    <nav aria-label={heading}>
      <h2 className="text-[0.9375rem] font-medium text-cream-50">{heading}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[0.9375rem] transition-colors hover:text-accent">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="on-dark bg-forest-950 pb-10 pt-16 text-mist md:pt-24">
      <div className="container-page">
        {/* The one thing we want people to do: call. */}
        <div className="footer-call">
          <p className="text-[1rem] text-cream-50 md:text-[1.125rem]">One call. One point of contact. No handoffs.</p>
          <FooterPhone phone={SITE.phone} href={SITE.phoneHref} label={`Call ${SITE.name} at ${SITE.phone}`} />
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-[1rem]">
            <span className="text-cream-50">Call anytime</span>
            <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-accent">
              {SITE.email}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-forest-950 transition-transform hover:-translate-y-0.5"
            >
              Get a free site review <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="mt-6">
            <SocialLinks />
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-forest-700 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <Column heading="Services" links={SERVICE_LINKS} />
          <Column heading="Industries" links={INDUSTRY_LINKS} />
          <Column heading="Company" links={COMPANY_LINKS} />
          <Column heading="Guides" links={FOOTER_CATEGORIES} />
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-forest-700 pt-8 text-[0.8125rem]">
          {/* legalName already ends in "Inc.", so no extra full stop here. */}
          <p>
            © {new Date().getFullYear()} {SITE.legalName} All rights reserved.
          </p>
          <p>{SITE.location}</p>
        </div>
      </div>
    </footer>
  );
}

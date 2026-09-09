import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Coming Soon',
  description: 'The MGRTECH Solutions site is being finalized.',
  robots: { index: false, follow: false },
};

export default function ComingSoon() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
      <Image
        src="/brand/logo-mark.png"
        alt="MGRTECH Solutions"
        width={72}
        height={72}
        priority
        className="h-16 w-auto"
      />
      <p className="eyebrow mt-8 text-accent-ink">MGRTECH Solutions</p>
      <h1 className="mt-4 text-forest-950">We&rsquo;re finalizing the site</h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-soft">
        The full MGRTECH Solutions website is being finalized. In the meantime,
        reach out directly and you&rsquo;ll hear back from the person who&rsquo;d
        do the work.
      </p>
      <a
        href={`mailto:${SITE.email}`}
        className="mt-8 text-lg font-semibold text-forest-950 underline underline-offset-4"
      >
        {SITE.email}
      </a>
      <Link href="/" className="mt-10 eyebrow text-accent-ink underline underline-offset-4">
        Back home
      </Link>
    </section>
  );
}

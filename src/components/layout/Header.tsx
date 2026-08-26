'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE, NAV } from '@/data/site';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="on-dark sticky top-0 z-50 bg-forest-950">
      <div className="container-page flex h-20 items-center justify-between">
        {/*
          The mark's G and R are near-black and disappear on forest, so it sits
          in a cream chip — the light ground it was drawn for.
        */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${SITE.name} — home`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-50">
            <Image
              src="/brand/logo-mark.png"
              alt=""
              aria-hidden="true"
              width={32}
              height={32}
              priority
              className="h-8 w-auto"
            />
          </span>
          <span className="eyebrow text-white">MGRTECH</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.9375rem] text-mist transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={SITE.phoneHref}
            className="rounded-full bg-accent px-5 py-2.5 text-[0.9375rem] font-semibold text-forest-950 transition hover:bg-accent-strong"
          >
            Call {SITE.phone}
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="text-white lg:hidden"
        >
          <span aria-hidden="true" className="text-2xl leading-none">
            {open ? '×' : '≡'}
          </span>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-forest-700 bg-forest-950 lg:hidden"
        >
          <div className="container-page flex flex-col gap-1 py-6">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2 text-lg text-mist transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={SITE.phoneHref}
              className="mt-4 rounded-full bg-accent px-5 py-3 text-center font-semibold text-forest-950"
            >
              Call {SITE.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

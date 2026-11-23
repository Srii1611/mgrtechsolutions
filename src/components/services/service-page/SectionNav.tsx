'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE, NAV } from '@/data/site';
import { KEY_IDS, SECTIONS, useSectionNav } from './useSectionNav';

const SERVICES = [
  { href: '/services/website-design', label: 'Website Design' },
  { href: '/services/seo', label: 'SEO' },
  { href: '/services/google-ads', label: 'Google Ads' },
  { href: '/services/social-media', label: 'Social Media' },
  { href: '/services/ecommerce', label: 'E-commerce' },
  { href: '/services/ai-automation', label: 'AI Automation' },
] as const;

/** Close a popup on Escape or a press outside it, and put focus back on its button. */
function usePopup(open: boolean, close: () => void, boxRef: React.RefObject<HTMLElement | null>, btnRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        btnRef.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (boxRef.current?.contains(t) || btnRef.current?.contains(t)) return;
      close();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open, close, boxRef, btnRef]);
}

/** The full list of sections, as a dropdown sheet. */
function SectionsSheet({
  id, open, current, onJump, boxRef,
}: {
  id: string; open: boolean; current: number; onJump: (id: string) => (e: React.MouseEvent) => void; boxRef: React.RefObject<HTMLElement | null>;
}) {
  return (
    <nav id={id} ref={boxRef as React.RefObject<HTMLElement>} aria-label="All sections" className="sn-sheet" hidden={!open}>
      <ol>
        {SECTIONS.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={onJump(s.id)}
              className={KEY_IDS.includes(s.id) ? 'sn-key' : undefined}
              aria-current={i === current ? 'true' : undefined}
            >
              <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              {s.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Section navigation for every service page.
 *  - 1100px and up: an always-open list of every section on the left (collapsible
 *    to a strip of numbers); the site navbar behaves as everywhere else.
 *  - Under 1100px: ONE slim bar instead of a navbar plus a section bar. Past the
 *    top of the page it shows the logo, the current section (tap to open the list
 *    of all sections), a Call button and a Menu button holding the site links.
 * Both read from a single scroll-spy.
 */
export default function PageNav() {
  const [openRaw, setOpen] = useState<'sections' | 'menu' | null>(null);
  const { current, scrolled, jump } = useSectionNav({ offset: () => 0 });
  const open = scrolled ? openRaw : null; // popups never stay open back at the top of the page
  const secBtn = useRef<HTMLButtonElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const secBox = useRef<HTMLElement>(null);
  const menuBox = useRef<HTMLElement>(null);
  const close = () => setOpen(null);
  usePopup(open === 'sections', close, secBox, secBtn);
  usePopup(open === 'menu', close, menuBox, menuBtn);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.snCollapsed = 'false'; // always starts open; closing it lasts until the page reloads
    return () => { delete root.dataset.snCollapsed; };
  }, []);
  const toggle = () => {
    const root = document.documentElement;
    root.dataset.snCollapsed = root.dataset.snCollapsed === 'true' ? 'false' : 'true';
  };
  const currentId = SECTIONS[current].id;

  return (
    <>
    <div className="sn-merged" data-show={scrolled ? 'true' : 'false'}>
      <div className="sn-bar">
        <Link href="/" className="sn-mark" aria-label={`${SITE.name} home`}>
          <span><Image src="/brand/logo-mark.png" alt="" width={537} height={512} className="sn-mark-img" /></span>
        </Link>
        <button
          ref={secBtn}
          type="button"
          className="sn-current"
          aria-expanded={open === 'sections'}
          aria-controls="sn-sections"
          onClick={() => setOpen(open === 'sections' ? null : 'sections')}
        >
          <span aria-hidden="true" className="sn-num">{String(current + 1).padStart(2, '0')}</span>
          <span className="sn-name">{SECTIONS[current].label}</span>
          <span className="sn-label">On this page</span>
          <i aria-hidden="true" />
        </button>
        <div className="sn-right">
          <a className="sn-call" href={SITE.phoneHref} aria-label={`Call ${SITE.name} at ${SITE.phone}`}>
            Call<span className="sn-tel"> {SITE.phone}</span>
          </a>
          <button
            ref={menuBtn}
            type="button"
            className="sn-menu"
            aria-expanded={open === 'menu'}
            aria-controls="sn-menu"
            onClick={() => setOpen(open === 'menu' ? null : 'menu')}
          >
            Menu
          </button>
        </div>
      </div>
      <SectionsSheet id="sn-sections" open={open === 'sections'} current={current} onJump={(id) => jump(id, close)} boxRef={secBox} />
      <nav id="sn-menu" ref={menuBox} aria-label="Site" className="sn-sheet sn-site" hidden={open !== 'menu'}>
        <ul>
          {NAV.filter((n) => n.href !== '/services').map((n) => (
            <li key={n.href}><Link href={n.href} onClick={close}>{n.label}</Link></li>
          ))}
        </ul>
        <p className="sn-sub">Services</p>
        <ul>
          {SERVICES.map((s) => (
            <li key={s.href}><Link href={s.href} onClick={close}>{s.label}</Link></li>
          ))}
        </ul>
      </nav>
    </div>

      <nav aria-label="Page sections" className="sn-list">
        <div className="sn-prog" aria-hidden="true"><i /></div>
        <div className="sn-list-head">
          <p>On this page</p>
          <button type="button" onClick={toggle} aria-label="Collapse or expand the section list">
            <i aria-hidden="true" />
          </button>
        </div>
        <ol>
          {SECTIONS.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={jump(s.id)}
                aria-label={s.label}
                data-label={s.label}
                className={KEY_IDS.includes(s.id) ? 'sn-key' : undefined}
                aria-current={s.id === currentId ? 'true' : undefined}
              >
                <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <b>{s.label}</b>
              </a>
            </li>
          ))}
        </ol>
        <a className="sn-cta" href="#contact" onClick={jump('contact')}>Get a free review</a>
      </nav>
    </>
  );
}

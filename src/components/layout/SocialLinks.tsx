import type { ReactNode } from 'react';
import { SITE, SOCIAL } from '@/data/site';

type Network = (typeof SOCIAL)[number]['network'];

/**
 * lucide-react 1.x ships no brand icons, so these are drawn inline on the
 * same 24×24 outline grid as the rest of the site's icons.
 */
const ICONS: Record<Network, ReactNode> = {
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
  facebook: (
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
};

export default function SocialLinks() {
  return (
    <ul aria-label="Social media" className="mt-6 flex gap-3">
      {SOCIAL.map((profile) => (
        <li key={profile.network}>
          <a
            href={profile.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${SITE.name} on ${profile.label} (opens in a new tab)`}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-forest-700 text-cream-50 transition-colors hover:border-accent hover:text-accent"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {ICONS[profile.network]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { MotionConfig } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/motion/SmoothScroll';
import JsonLd from '@/components/JsonLd';
import { buildLocalBusiness, buildWebSite } from '@/lib/schema';
import { SITE } from '@/data/site';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description:
    'Hand-coded websites, content systems, and AI automation for local businesses across MetroWest Massachusetts.',
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    url: SITE.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <JsonLd data={buildLocalBusiness()} />
        <JsonLd data={buildWebSite()} />
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <MotionConfig reducedMotion="user">
          <SmoothScroll />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}

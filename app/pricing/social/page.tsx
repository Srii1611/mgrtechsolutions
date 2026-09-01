import type { Metadata } from 'next';
import SocialHero from '@/components/pricing/social/SocialHero';
import SocialJumpNav from '@/components/pricing/social/SocialJumpNav';
import SocialBody from '@/components/pricing/social/SocialBody';
import CtaBand from '@/components/blog/CtaBand';
import JsonLd from '@/components/JsonLd';
import { buildBreadcrumbs } from '@/lib/schema';
import { SOCIAL_CLOSE } from '@/data/social-packages';

export const metadata: Metadata = {
  title: 'Social Media Packages',
  description:
    'Done-for-you social content for trades businesses: on-site shoots, video and image posts, captions, scheduling, and community management. Three tiers from $499/mo.',
  alternates: { canonical: '/pricing/social' },
};

const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Packages', url: '/pricing' },
  { name: 'Social Media', url: '/pricing/social' },
];

export default function SocialPackagesPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbs(breadcrumbItems)} />
      <SocialHero />
      <SocialJumpNav />
      <SocialBody />
      <CtaBand
        eyebrow={SOCIAL_CLOSE.eyebrow}
        heading={SOCIAL_CLOSE.heading}
        body={SOCIAL_CLOSE.body}
      />
    </>
  );
}

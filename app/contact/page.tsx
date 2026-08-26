import type { Metadata } from 'next';
import ContactHero from '@/components/contact/ContactHero';
import DirectDoor from '@/components/contact/DirectDoor';
import ReviewForm from '@/components/contact/ReviewForm';
import Reassurance from '@/components/contact/Reassurance';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Call and talk to the person who would build your site, or send your URL for a free, honest review of the three things most likely costing you phone calls.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <section className="bg-cream-50 py-20 md:py-28">
        <div className="container-page grid gap-16 lg:grid-cols-2 lg:gap-20">
          <DirectDoor />
          <ReviewForm />
        </div>
      </section>
      <Reassurance />
    </>
  );
}

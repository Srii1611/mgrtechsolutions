import type { Metadata } from 'next';
import ContactHero from '@/components/contact/ContactHero';
import ContactOptions from '@/components/contact/ContactOptions';
import DirectDoor from '@/components/contact/DirectDoor';
import ReviewForm from '@/components/contact/ReviewForm';
import QuoteForm from '@/components/contact/QuoteForm';
import CalBooking from '@/components/contact/CalBooking';
import Reassurance from '@/components/contact/Reassurance';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Call and talk to the person who would build your site, send your URL for a free review, request a straight-number quote, or book a free 15-minute call.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactOptions />
      <section className="bg-cream-50 py-20 md:py-28">
        <div className="container-page grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div id="talk" className="scroll-mt-24">
            <DirectDoor />
          </div>
          <div id="review" className="scroll-mt-24">
            <ReviewForm />
          </div>
        </div>
      </section>
      <section className="bg-cream-100 py-20 md:py-28">
        <div className="container-page grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div id="quote" className="scroll-mt-24">
            <QuoteForm />
          </div>
          <div id="book" className="scroll-mt-24">
            <p className="eyebrow text-accent-ink">OR BOOK A CALL</p>
            <h2 className="h3-card mt-3 font-medium text-forest-950">Pick a time for a free 15-minute call.</h2>
            <p className="mt-5 max-w-md text-[1.0625rem] leading-[1.7] text-ink-soft">
              Choose a slot that suits you and we talk it through. No forms, no pressure.
            </p>
            <div className="mt-8">
              <CalBooking />
            </div>
          </div>
        </div>
      </section>
      <Reassurance />
    </>
  );
}

import Reveal from '@/components/motion/Reveal';

/** S4 / S6 — Connector statement between pillars. */
export default function Connector({ text, dark }: { text: string; dark: boolean }) {
  return (
    <section className={dark ? 'on-dark bg-forest-950 py-14' : 'bg-cream-50 py-14'}>
      <div className="container-page">
        <Reveal>
          <p className={`eyebrow text-center ${dark ? 'text-accent' : 'text-accent-ink'}`}>{text}</p>
        </Reveal>
      </div>
    </section>
  );
}

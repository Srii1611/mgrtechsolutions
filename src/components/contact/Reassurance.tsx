import { SITE } from '@/data/site';

const COLUMNS = [
  {
    label: 'WHAT HAPPENS NEXT',
    body: 'I review your site myself and reply within two business days.',
  },
  {
    label: "WHAT DOESN'T",
    body: "No cold calls. No sequence. No 'just bumping this to the top of your inbox.'",
  },
] as const;

export default function Reassurance() {
  return (
    <section className="dot-grid on-dark bg-forest-950 py-16">
      <div className="container-page grid gap-10 md:grid-cols-3">
        {COLUMNS.map((col) => (
          <div key={col.label}>
            <p className="eyebrow text-accent">{col.label}</p>
            <p className="mt-3 text-[0.9375rem] leading-[1.65] text-mist">{col.body}</p>
          </div>
        ))}
        <div>
          <p className="eyebrow text-accent">THE OTHER OPTION</p>
          <p className="mt-3 text-[0.9375rem] leading-[1.65] text-mist">
            Prefer to skip the queue?{' '}
            <a href={SITE.phoneHref} className="text-accent underline-offset-4 hover:underline">
              {SITE.phone}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

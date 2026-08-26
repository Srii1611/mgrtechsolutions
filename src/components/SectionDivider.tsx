export default function SectionDivider({
  label,
  dark = false,
}: {
  label: string;
  dark?: boolean;
}) {
  return (
    <div className="container-page">
      <div
        className={`flex items-center gap-4 border-t pt-4 ${
          dark ? 'border-forest-700' : 'border-cream-300'
        }`}
      >
        <span className={`eyebrow ${dark ? 'text-mist' : 'text-ink-soft'}`}>{label}</span>
      </div>
    </div>
  );
}

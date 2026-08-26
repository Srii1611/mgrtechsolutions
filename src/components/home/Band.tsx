import type { ReactNode } from 'react';
import SectionDivider from '@/components/SectionDivider';

export default function Band({
  label,
  dark = false,
  children,
}: {
  label: string;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={dark ? 'on-dark bg-forest-950' : 'bg-cream-50'}>
      <SectionDivider label={label} dark={dark} />
      {children}
    </div>
  );
}

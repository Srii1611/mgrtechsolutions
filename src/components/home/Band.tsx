import type { ReactNode } from 'react';

export default function Band({
  dark = false,
  children,
}: {
  dark?: boolean;
  children: ReactNode;
}) {
  return <div className={dark ? 'on-dark bg-forest-950' : 'bg-cream-50'}>{children}</div>;
}

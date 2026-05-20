import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cheap 100% Secure Shared Server Licenses',
  description:
    'Affordable software licenses for cPanel, Plesk, LiteSpeed, and CloudLinux. Instant activation, auto-renewal, and up to 40% savings. Buy cheap hosting licenses.',
  openGraph: {
    title: 'Cheap 100% Secure Shared Server Licenses',
    description:
      'Affordable software licenses for cPanel, Plesk, LiteSpeed, and CloudLinux. Instant activation, auto-renewal, and up to 40% savings. Buy cheap hosting licenses.',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

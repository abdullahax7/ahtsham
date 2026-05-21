import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Read the Qazi.Host terms of service covering account use, billing, refunds, and acceptable use of our DMCA ignored hosting, VPS, dedicated servers, and licenses.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service — Qazi.Host',
    description: 'Account use, billing, refunds, and acceptable use policies for Qazi.Host services.',
    url: 'https://qazi.host/terms',
    type: 'website',
    siteName: 'Qazi.Host',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

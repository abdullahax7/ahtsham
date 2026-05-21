import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fair Usage Policy',
  description:
    'The Qazi.Host fair usage policy — how unlimited resources, shared hosting, and reseller plans are governed to keep our servers fast and reliable for everyone.',
  alternates: { canonical: '/fair-usage-policy' },
  openGraph: {
    title: 'Fair Usage Policy — Qazi.Host',
    description: 'How Qazi.Host governs unlimited resources on shared and reseller plans.',
    url: 'https://qazi.host/fair-usage-policy',
    type: 'website',
    siteName: 'Qazi.Host',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

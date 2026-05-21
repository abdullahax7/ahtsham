import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cheap Imunify360 License — Server Security at Discount Prices',
  description:
    'Buy a cheap Imunify360 license from Qazi.Host with instant activation. Six-layer server security: malware scanning, WAF, intrusion detection, and proactive defense.',
  alternates: { canonical: '/imunify360' },
  keywords: ['imunify360 license', 'cheap imunify360', 'server security license', 'imunify360 reseller'],
  openGraph: {
    title: 'Cheap Imunify360 License — Qazi.Host',
    description: 'Instant Imunify360 license activation. Six-layer server security at discount prices.',
    url: 'https://qazi.host/imunify360',
    type: 'website',
    siteName: 'Qazi.Host',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

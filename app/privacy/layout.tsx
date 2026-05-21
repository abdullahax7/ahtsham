import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read the Qazi.Host privacy policy to understand how we collect, use, and protect your personal data when you use our DMCA ignored hosting and licensing services.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy — Qazi.Host',
    description: 'How Qazi.Host collects, uses, and protects your personal data.',
    url: 'https://qazi.host/privacy',
    type: 'website',
    siteName: 'Qazi.Host',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

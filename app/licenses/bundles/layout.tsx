import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'License Bundles — cPanel, LiteSpeed, CloudLinux & More',
  description:
    'Save up to 40% on bundled licenses from Qazi.Host. Combine cPanel, LiteSpeed, CloudLinux, Imunify360, JetBackup, and Softaculous for the best discount.',
  alternates: { canonical: '/licenses/bundles' },
  keywords: ['license bundle', 'cpanel litespeed bundle', 'hosting license discount', 'cheap server license bundle'],
  openGraph: {
    title: 'License Bundles — Qazi.Host',
    description: 'Save up to 40% on bundled cPanel, LiteSpeed, CloudLinux, and add-on licenses.',
    url: 'https://qazi.host/licenses/bundles',
    type: 'website',
    siteName: 'Qazi.Host',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

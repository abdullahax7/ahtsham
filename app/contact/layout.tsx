import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — Qazi.Host',
  description: 'Get in touch with Qazi.Host for 100% DMCA ignored hosting, server licenses, and support.',
  openGraph: {
    title: 'Contact Us — Qazi.Host',
    description: 'Get in touch with Qazi.Host for 100% DMCA ignored hosting, server licenses, and support.',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

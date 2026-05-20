import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '100% DMCA Ignored Shared Hosting From 499 PKR',
  description:
    'Affordable shared hosting with free SSL, SSD storage, and Mon-Fri Support. Perfect for personal websites, blogs, and small businesses. Instant setup with cPanel.',
  openGraph: {
    title: '100% DMCA Ignored Shared Hosting From 499 PKR',
    description:
      'Affordable shared hosting with free SSL, SSD storage, and Mon-Fri Support. Starting at just $1.99/month.',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

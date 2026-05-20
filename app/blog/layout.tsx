import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Qazi.Host',
  description: 'Read the latest news, tutorials, and hosting tips directly from our experts to help you grow your web hosting business.',
  alternates: { canonical: '/blog' },
  keywords: ['web hosting blog', 'hosting tips', 'reseller server tutorials', 'cPanel guide'],
  openGraph: { title: 'Blog — Qazi.Host', description: 'Latest news and tutorials on web hosting.', url: 'https://qazi.host/blog', type: 'website', siteName: 'Qazi.Host', images: ['/logo.webp'] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

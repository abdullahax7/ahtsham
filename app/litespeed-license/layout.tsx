import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '100% Safe Cheap Litespeed Shared License',
  description:
    'High-performance LiteSpeed web server licenses with built-in caching, HTTP/3 support, and instant activation. Boost your website speed today.',
  openGraph: {
    title: '100% Safe Cheap Litespeed Shared License',
    description:
      'High-performance LiteSpeed web server licenses with built-in caching, HTTP/3 support, and instant activation. Boost your website speed today.',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '100% Safe Cheap Plesk Shared License',
  description:
    'Affordable Plesk panel licenses with WordPress toolkit, instant activation, and auto-renewal. Web Admin, Web Pro, and Web Host editions available.',
  openGraph: {
    title: '100% Safe Cheap Plesk Shared License',
    description:
      'Affordable Plesk panel licenses with WordPress toolkit, instant activation, and auto-renewal. Web Admin, Web Pro, and Web Host editions available.',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

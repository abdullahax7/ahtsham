import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '100% Safe Cheap OSM Shared License',
  description: 'Affordable OSM licenses for server performance optimization.',
  openGraph: { title: '100% Safe Cheap OSM Shared License', description: 'Affordable OSM licenses for server performance optimization.', url: 'https://qazi.host/osm', type: 'website', siteName: 'Qazi.Host', images: ['/logo.webp'] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

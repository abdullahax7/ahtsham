import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '100% Safe Cheap CloudLinux Shared License',
  description:
    'CloudLinux OS licenses for shared hosting environments. Isolate accounts, limit resource usage, and improve server stability with CageFS and LVE.',
  openGraph: {
    title: '100% Safe Cheap CloudLinux Shared License',
    description:
      'CloudLinux OS licenses for shared hosting environments. Isolate accounts, limit resource usage, and improve server stability with CageFS and LVE.',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

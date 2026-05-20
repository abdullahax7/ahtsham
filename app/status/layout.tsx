import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Network Status | Qazi.Host System Dashboard',
  description: 'Check the real-time operational status of Qazi.Host node servers, licensing clusters, and API architecture completely transparently.',
  keywords: 'qazi host status, server uptime, licensing api status, hosting network status'
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

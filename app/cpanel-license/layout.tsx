import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cheapest Safe WHM/cPanel License Unlimited Accounts',
  description:
    'Affordable cPanel/WHM licenses with instant activation and auto-renewal. Save up to 40% compared to direct pricing. Mon-Fri Support included.',
  openGraph: {
    title: 'Cheapest Safe WHM/cPanel License Unlimited Accounts',
    description:
      'Affordable cPanel/WHM licenses with instant activation and auto-renewal. Save up to 40% compared to direct pricing. Mon-Fri Support included.',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

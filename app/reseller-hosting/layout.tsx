import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Super Fast DMCA Ignored Offshore Hosting',
  description:
    'White-label reseller hosting with free WHMCS, WHM/cPanel access, and unlimited bandwidth. Launch your own web hosting business with Qazi.Host.',
  openGraph: {
    title: 'Super Fast DMCA Ignored Offshore Hosting',
    description:
      'White-label reseller hosting with free WHMCS, WHM/cPanel access, and unlimited bandwidth. Launch your own web hosting business with Qazi.Host.',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

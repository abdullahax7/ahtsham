import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Development Partner — Webxoo | Qazi.Host',
  description: 'Qazi.Host is proudly partnered with Webxoo — a leading web development agency offering custom websites, web apps, WordPress solutions, and UI/UX design. Get professional development services at competitive prices.',
  alternates: {
    canonical: '/partner',
  },
  keywords: [
    'web development partner Pakistan',
    'Webxoo web development',
    'custom website development Lahore',
    'web design agency Pakistan',
    'WordPress development Pakistan',
    'Qazi.Host partner',
    'affordable web development',
  ],
  openGraph: {
    title: 'Web Development Partner — Webxoo | Qazi.Host',
    description: 'Qazi.Host is partnered with Webxoo for professional web development, UI/UX design, and WordPress solutions.',
    url: 'https://qazi.host/partner',
    type: 'website',
    siteName: 'Qazi.Host',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Development Partner — Webxoo | Qazi.Host',
    description: 'Qazi.Host is partnered with Webxoo for professional web development and design services.',
    images: ['/logo.webp'],
  },
};

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return children;
}

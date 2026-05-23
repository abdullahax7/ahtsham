import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { getAllSiteSettings, getSiteSetting } from '../lib/db/repos';

type CustomCodeBlock = {
  id: string;
  name: string;
  placement: 'head' | 'body_end';
  code: string;
  enabled: boolean;
};

async function getCustomCodeBlocks(): Promise<CustomCodeBlock[]> {
  const raw = await getSiteSetting('custom_code_blocks', '[]').catch(() => '[]');
  try {
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr
      .filter((b: any) => b && typeof b === 'object' && b.enabled !== false && typeof b.code === 'string' && b.code.trim())
      .map((b: any) => ({
        id: String(b.id ?? ''),
        name: String(b.name ?? ''),
        placement: b.placement === 'body_end' ? 'body_end' : 'head',
        code: String(b.code),
        enabled: true,
      }));
  } catch {
    return [];
  }
}



const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f1117',
};

// Strip a full <meta ... content="X" .../> snippet down to just the content
// value, so admins can paste either the bare token from Search Console or
// the whole tag they copy out of the verification screen.
function parseVerificationToken(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return '';
  const match = trimmed.match(/content\s*=\s*["']([^"']+)["']/i);
  return match ? match[1] : trimmed;
}

export async function generateMetadata(): Promise<Metadata> {
  const all = await getAllSiteSettings().catch(() => ({} as Record<string, { value: string }>));
  const verification = parseVerificationToken(all['google_site_verification']?.value ?? '');

  return {
    metadataBase: new URL('https://qazi.host'),
    title: {
      default: "Pakistan's #1 DMCA Ignored Cheap Offshore Hosting",
      template: '%s | Qazi.Host',
    },
    description: 'Affordable DMCA ignored hosting, shared licenses, and SEO tools to supercharge your online presence. Instant setup and Mon-Fri WhatsApp support.',
    keywords: [
      'web hosting',
      'dmca ignored hosting',
      'offshore hosting',
      'cheap cpanel license',
      'litespeed license',
      'plesk license',
      'cloudlinux license',
      'reseller hosting',
      'vps hosting',
      'dedicated server',
      'qazihost',
      'qazi host',
      'cheap hosting pakistan',
    ],
    applicationName: 'Qazi.Host',
    authors: [{ name: 'Qazi.Host' }],
    creator: 'Qazi.Host',
    publisher: 'Qazi.Host',
    referrer: 'origin-when-cross-origin',
    formatDetection: { email: false, address: false, telephone: false },
    alternates: { canonical: '/' },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title: "Pakistan's #1 DMCA Ignored Cheap Offshore Hosting",
      description: 'Affordable DMCA ignored hosting, shared licenses, and SEO tools.',
      images: [{ url: '/logo.webp', width: 1200, height: 630, alt: 'Qazi.Host' }],
      type: 'website',
      url: 'https://qazi.host',
      siteName: 'Qazi.Host',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Pakistan's #1 DMCA Ignored Cheap Offshore Hosting",
      description: 'Affordable DMCA ignored hosting, shared licenses, and SEO tools to supercharge your online presence. Instant setup and Mon-Fri WhatsApp support.',
      images: ['/logo.webp'],
      creator: '@qazihost',
      site: '@qazihost',
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/logo.webp',
    },
    category: 'web hosting',
    verification: verification ? { google: verification } : undefined,
  };
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Qazi.Host',
  alternateName: 'QaziHost',
  url: 'https://qazi.host',
  logo: 'https://qazi.host/logo.webp',
  description: "Pakistan's #1 DMCA ignored cheap offshore hosting, shared licenses, and SEO tools.",
  sameAs: [
    'https://facebook.com/qazi.host',
    'https://instagram.com/qazi.host',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    telephone: '+92-304-3126626',
    availableLanguage: ['English', 'Urdu'],
    areaServed: 'Worldwide',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Qazi.Host',
  url: 'https://qazi.host',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://qazi.host/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

import { ToastProvider } from './components/Toast';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const blocks = await getCustomCodeBlocks();
  const headBlocks = blocks.filter((b) => b.placement === 'head');
  const bodyBlocks = blocks.filter((b) => b.placement === 'body_end');

  return (
    <html lang="en" className={plusJakartaSans.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {headBlocks.length > 0 && (
          // Inject custom head HTML via a bootstrap script. Plain HTML inserted
          // via innerHTML won't auto-execute <script> tags, so we walk the
          // parsed fragment and re-create script nodes so external + inline
          // scripts both run. This covers analytics, pixels, chat widgets, etc.
          // For SEO meta verification that must be in the SSR response, use
          // the dedicated google_site_verification field in Site Settings.
          <script
            data-custom-code-bootstrap="head"
            dangerouslySetInnerHTML={{
              __html: `(function(){var blocks=${JSON.stringify(
                headBlocks.map((b) => b.code),
              )};var head=document.head;blocks.forEach(function(html){var tpl=document.createElement('template');tpl.innerHTML=html;Array.prototype.slice.call(tpl.content.childNodes).forEach(function(n){if(n.nodeType===1&&n.tagName==='SCRIPT'){var s=document.createElement('script');Array.prototype.forEach.call(n.attributes,function(a){s.setAttribute(a.name,a.value);});s.text=n.textContent;head.appendChild(s);}else{head.appendChild(n);}});});})();`,
            }}
          />
        )}
      </head>
      <body>
          <ToastProvider>
            {children}
            <a className="wa-float" href="https://wa.me/923043126626?text=Hi%20Qazi.Host%2C%20I'm%20interested%20in%20your%20services%20and%20have%20some%20questions." target="_blank" rel="noopener noreferrer" title="Chat with us">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            </a>
          </ToastProvider>
          {bodyBlocks.map((b) => (
            <div
              key={b.id}
              data-custom-code={b.name || b.id}
              style={{ display: 'contents' }}
              dangerouslySetInnerHTML={{ __html: b.code }}
            />
          ))}
      </body>
    </html>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const DEFAULT_LOGO_URL = "https://ezmdqfujhwjlnhnncyes.supabase.co/storage/v1/object/sign/logos/logo.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lNTBiOTNmYy05NTkxLTQ1NjMtYjAzYy1jOTRmMzYwZjBlY2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvcy9sb2dvLndlYnAiLCJpYXQiOjE3NzQ4ODk4MzcsImV4cCI6NDkyODQ4OTgzN30.4pZItOynf6zIbZSyooOBCpBjzJSrPznB522kz5Rb-n0";

const DEFAULT_ABOUT = "Your trusted partner for premium DMCA Ignored hosting and shared licenses. Powering thousands of websites with industrial-grade infrastructure.";

const DEFAULT_PAYMENTS = [
  { name: 'JazzCash' },
  { name: 'EasyPaisa' },
  { name: 'Bank Transfer' },
  { name: 'Crypto' },
  { name: 'SadaPay' },
  { name: 'NayaPay' },
];

function BankSvg() {
  return (
    <svg viewBox="0 0 64 64" width="40" height="40">
      <polygon points="32,4 2,22 62,22" fill="#5c6b81" />
      <rect x="2" y="22" width="60" height="4" rx="1" fill="#4B5563" />
      <rect x="8" y="26" width="6" height="26" rx="1" fill="#5c6b81" />
      <rect x="20" y="26" width="6" height="26" rx="1" fill="#5c6b81" />
      <rect x="38" y="26" width="6" height="26" rx="1" fill="#5c6b81" />
      <rect x="50" y="26" width="6" height="26" rx="1" fill="#5c6b81" />
      <rect x="2" y="52" width="60" height="6" rx="2" fill="#4B5563" />
    </svg>
  );
}

function CryptoSvg() {
  return (
    <svg viewBox="0 0 64 64" width="40" height="40">
      <circle cx="32" cy="32" r="30" fill="#f7931a" />
      <path d="M43.5 27.2c.6-4-2.5-6.2-6.7-7.6l1.4-5.5-3.3-.8-1.3 5.4c-.9-.2-1.8-.4-2.7-.6l1.3-5.4-3.3-.8-1.4 5.5c-.7-.2-1.4-.3-2.1-.5l-4.5-1.1-.9 3.5s2.5.6 2.4.6c1.3.3 1.6 1.2 1.5 1.9l-1.5 6.2c.1 0 .2 0 .3.1h-.3l-2.2 8.7c-.2.4-.6 1-1.5.8 0 0-2.4-.6-2.4-.6l-1.7 3.8 4.3 1.1c.8.2 1.6.4 2.4.6l-1.4 5.6 3.3.8 1.4-5.5c.9.2 1.8.5 2.7.7l-1.4 5.5 3.3.8 1.4-5.6c5.8 1.1 10.2.7 12-4.6 1.5-4.3-.1-6.7-3.1-8.3 2.2-.5 3.9-2 4.3-5zm-7.7 10.8c-1.1 4.3-8.3 2-10.6 1.4l1.9-7.5c2.4.6 9.9 1.7 8.7 6.1zm1.1-10.9c-1 3.9-7 1.9-8.9 1.4l1.7-6.8c2 .5 8.3 1.4 7.2 5.4z" fill="#fff" />
    </svg>
  );
}

type PaymentMethod = { id?: number; name: string; image_url?: string | null };

export default function Footer() {
  const [logoUrl, setLogoUrl] = useState(DEFAULT_LOGO_URL);
  const [aboutText, setAboutText] = useState(DEFAULT_ABOUT);
  const [supportHours, setSupportHours] = useState('Mon-Fri: 12PM - 12AM PST');
  const [copyrightSuffix, setCopyrightSuffix] = useState("Pakistan's #1 DMCA Ignored Hosting.");
  const [payments, setPayments] = useState<PaymentMethod[]>(DEFAULT_PAYMENTS);

  useEffect(() => {
    let alive = true;
    fetch('/api/public/site-settings')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!alive || !data) return;
        if (data.logo_url) setLogoUrl(data.logo_url);
        if (data.footer_about) setAboutText(data.footer_about);
        if (data.support_hours) setSupportHours(data.support_hours);
        if (data.footer_copyright_suffix) setCopyrightSuffix(data.footer_copyright_suffix);
      })
      .catch(() => {});

    fetch('/api/public/payments')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (alive && Array.isArray(data) && data.length) setPayments(data);
      })
      .catch(() => {});

    return () => {
      alive = false;
    };
  }, []);

  return (
    <footer>
      <div className="container">
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
          <div className="footer-brand">
            <Link href="/" className="logo">
              <Image src={logoUrl} alt="Qazi.Host Logo" width={180} height={40} unoptimized />
            </Link>
            <p style={{ marginTop: '20px', color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{aboutText}</p>
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="https://wa.me/923043126626?text=Hi%20Qazi.Host%2C%20I'm%20interested%20in%20your%20services%20and%20have%20some%20questions." target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontSize: '1.2rem', textDecoration: 'none' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>WhatsApp Support →</span>
              </a>
              <p style={{ fontSize: '0.75rem', color: 'var(--muted)', margin: 0 }}>{supportHours}</p>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px', color: '#fff' }}>Hosting Services</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '12px' }}><Link href="/shared-hosting" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Shared Hosting</Link></li>
              <li style={{ marginBottom: '12px' }}><Link href="/reseller-hosting" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Reseller Hosting</Link></li>
              <li style={{ marginBottom: '12px' }}><Link href="/vps" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem' }}>VPS</Link></li>
              <li style={{ marginBottom: '12px' }}><Link href="/dedicated-servers" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Dedicated Servers</Link></li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px', color: '#fff' }}>Software Licenses</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '12px' }}><Link href="/cpanel-license" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem' }}>cPanel/WHM</Link></li>
              <li style={{ marginBottom: '12px' }}><Link href="/litespeed-license" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem' }}>LiteSpeed</Link></li>
              <li style={{ marginBottom: '12px' }}><Link href="/imunify360" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Imunify360</Link></li>
              <li style={{ marginBottom: '12px' }}><Link href="/cloudlinux-license" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem' }}>CloudLinux</Link></li>
              <li style={{ marginBottom: '12px' }}><Link href="/licenses" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem' }}>View All Licenses</Link></li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px', color: '#fff' }}>Company & Support</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '12px' }}><Link href="/blog" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Our Blog</Link></li>
              <li style={{ marginBottom: '12px' }}><Link href="/status" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Network Status</Link></li>
              <li style={{ marginBottom: '12px' }}><Link href="/terms" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Terms of Service</Link></li>
              <li style={{ marginBottom: '12px' }}><Link href="/privacy" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy Policy</Link></li>
              <li style={{ marginBottom: '12px' }}><Link href="/fair-usage-policy" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Fair Usage Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom" style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '40px', marginTop: '64px' }}>
          <div className="payment-methods" style={{ display: 'flex', gap: '24px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px', width: '100%', textAlign: 'center' }}>Supported Payment Hubs</span>
            {payments.map((p, idx) => (
              <div key={p.id ?? idx} className="payment-icon-hover" style={{ height: '32px', display: 'flex', alignItems: 'center', position: 'relative', opacity: 0.6, transition: 'opacity 0.3s, filter 0.3s, transform 0.3s', filter: 'grayscale(1)', cursor: 'pointer' }} title={p.name}>
                {p.image_url ? (
                  <Image src={p.image_url} alt={p.name} width={80} height={32} unoptimized style={{ objectFit: 'contain', height: '100%', width: 'auto' }} />
                ) : p.name.toLowerCase().includes('bank') ? (
                  <BankSvg />
                ) : p.name.toLowerCase().includes('crypto') ? (
                  <CryptoSvg />
                ) : (
                  <span style={{ color: '#9ca3af', fontSize: '0.85rem', fontWeight: 600 }}>{p.name}</span>
                )}
              </div>
            ))}
          </div>
          <style jsx>{`
            li a { transition: color 0.3s ease, transform 0.3s ease; display: inline-block; }
            li a:hover { color: var(--accent) !important; transform: translateX(5px); }
            .payment-icon-hover:hover { filter: grayscale(0) !important; opacity: 1 !important; }
          `}</style>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', color: 'var(--muted)', fontSize: '0.9rem' }}>
            <p>© {new Date().getFullYear()} Qazi.Host — {copyrightSuffix}</p>
            <p>Built with 🧡 by <a href="https://webxoo.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600, transition: 'color 0.3s ease' }}>Webxoo</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}

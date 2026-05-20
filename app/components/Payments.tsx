'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type PaymentMethod = { id?: number; name: string; image_url?: string | null };

const FALLBACK: PaymentMethod[] = [
  { name: 'EasyPaisa' },
  { name: 'JazzCash' },
  { name: 'Bank Transfer' },
  { name: 'Crypto' },
  { name: 'SadaPay' },
  { name: 'NayaPay' },
];

function BankSvg() {
  return (
    <svg viewBox="0 0 64 64" width="48" height="48">
      <polygon points="32,4 2,22 62,22" fill="#1e3a5f" />
      <rect x="2" y="22" width="60" height="4" rx="1" fill="#2563eb" />
      <rect x="8" y="26" width="6" height="26" rx="1" fill="#1e3a5f" />
      <rect x="20" y="26" width="6" height="26" rx="1" fill="#1e3a5f" />
      <rect x="38" y="26" width="6" height="26" rx="1" fill="#1e3a5f" />
      <rect x="50" y="26" width="6" height="26" rx="1" fill="#1e3a5f" />
      <rect x="2" y="52" width="60" height="6" rx="2" fill="#2563eb" />
      <circle cx="32" cy="14" r="5" fill="#fff" opacity="0.3" />
    </svg>
  );
}

function CryptoSvg() {
  return (
    <svg viewBox="0 0 64 64" width="48" height="48">
      <circle cx="32" cy="32" r="30" fill="#f7931a" />
      <path d="M43.5 27.2c.6-4-2.5-6.2-6.7-7.6l1.4-5.5-3.3-.8-1.3 5.4c-.9-.2-1.8-.4-2.7-.6l1.3-5.4-3.3-.8-1.4 5.5c-.7-.2-1.4-.3-2.1-.5l-4.5-1.1-.9 3.5s2.5.6 2.4.6c1.3.3 1.6 1.2 1.5 1.9l-1.5 6.2c.1 0 .2 0 .3.1h-.3l-2.2 8.7c-.2.4-.6 1-1.5.8 0 0-2.4-.6-2.4-.6l-1.7 3.8 4.3 1.1c.8.2 1.6.4 2.4.6l-1.4 5.6 3.3.8 1.4-5.5c.9.2 1.8.5 2.7.7l-1.4 5.5 3.3.8 1.4-5.6c5.8 1.1 10.2.7 12-4.6 1.5-4.3-.1-6.7-3.1-8.3 2.2-.5 3.9-2 4.3-5zm-7.7 10.8c-1.1 4.3-8.3 2-10.6 1.4l1.9-7.5c2.4.6 9.9 1.7 8.7 6.1zm1.1-10.9c-1 3.9-7 1.9-8.9 1.4l1.7-6.8c2 .5 8.3 1.4 7.2 5.4z" fill="#fff" />
    </svg>
  );
}

export default function Payments() {
  const [methods, setMethods] = useState<PaymentMethod[]>(FALLBACK);

  useEffect(() => {
    let alive = true;
    fetch('/api/public/payments')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (alive && Array.isArray(data) && data.length) setMethods(data);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="payments-section">
      <div className="container">
        <div className="section-head fade-up" style={{ textAlign: 'center' }}>
          <div className="section-label">Secure Payments</div>
          <h2 className="section-title">Payment Methods We Accept</h2>
          <p className="section-sub" style={{ margin: '0 auto', maxWidth: '600px' }}>Fast, secure, and flexible. Choose the payment method that works best for you.</p>
        </div>
        <div className="payments-grid fade-up">
          {methods.map((m, idx) => (
            <div className="payment-card hover-card" key={m.id ?? `${m.name}-${idx}`}>
              <div className="payment-logo-wrap" style={{ height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {m.image_url ? (
                  <Image src={m.image_url} alt={m.name} width={120} height={40} style={{ objectFit: 'contain' }} unoptimized />
                ) : m.name.toLowerCase().includes('bank') ? (
                  <BankSvg />
                ) : m.name.toLowerCase().includes('crypto') ? (
                  <CryptoSvg />
                ) : (
                  <div style={{ width: 48, height: 48, borderRadius: 10, background: 'linear-gradient(135deg, #f85727, #ff8c00)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                    {m.name.charAt(0)}
                  </div>
                )}
              </div>
              <span>{m.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

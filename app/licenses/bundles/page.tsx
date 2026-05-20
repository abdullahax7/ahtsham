'use client';

import dynamic from 'next/dynamic';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HeroParticles from '../../components/HeroParticles';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import Link from 'next/link';

const PremiumGuarantees = dynamic(() => import('../../components/PremiumGuarantees'), {
  loading: () => <LoadingSkeleton height="400px" />,
  ssr: false
});
const RelatedBlogs = dynamic(() => import('../../components/RelatedBlogs'), {
  loading: () => <LoadingSkeleton height="500px" />,
  ssr: false
});

const bundles = [
  {
    name: 'Starter Bundle',
    badge: 'Most Popular',
    badgeColor: 'rgba(248,87,39,0.9)',
    glow: 'rgba(248,87,39,0.35)',
    border: 'rgba(248,87,39,0.4)',
    accentColor: '#f85727',
    includes: [
      { name: 'cPanel/WHM', desc: 'Industry-standard hosting control panel' },
      { name: 'Softaculous', desc: 'Auto-installer with 400+ scripts' },
      { name: 'JetBackup', desc: 'Incremental enterprise backup solution' },
    ],
    original: 1900,
    price: 1599,
    discount: 16,
    highlight: false,
    waText: 'Starter%20Bundle%20(cPanel%20%2B%20Softaculous%20%2B%20JetBackup)',
  },
  {
    name: 'Security Bundle',
    badge: 'Best Value',
    badgeColor: 'rgba(79,70,229,0.9)',
    glow: 'rgba(79,70,229,0.35)',
    border: 'rgba(79,70,229,0.4)',
    accentColor: '#4f46e5',
    includes: [
      { name: 'Imunify360', desc: 'Automated security for web servers' },
      { name: 'cpGuard', desc: 'Malware scanning for cPanel' },
      { name: 'CloudLinux', desc: 'Secure OS for shared hosting' },
    ],
    original: 2600,
    price: 2099,
    discount: 19,
    highlight: false,
    waText: 'Security%20Bundle%20(Imunify360%20%2B%20cpGuard%20%2B%20CloudLinux)',
  },
  {
    name: 'Performance Bundle',
    badge: 'Speed Boost',
    badgeColor: 'rgba(16,185,129,0.9)',
    glow: 'rgba(16,185,129,0.35)',
    border: 'rgba(16,185,129,0.4)',
    accentColor: '#10b981',
    includes: [
      { name: 'LiteSpeed', desc: 'High-performance web server with caching' },
      { name: 'CloudLinux', desc: 'Secure OS for shared hosting' },
      { name: 'OSM', desc: 'Performance & security server management' },
    ],
    original: 4200,
    price: 3399,
    discount: 19,
    highlight: false,
    waText: 'Performance%20Bundle%20(LiteSpeed%20%2B%20CloudLinux%20%2B%20OSM)',
  },
  {
    name: 'Pro Hosting Bundle',
    badge: 'Recommended',
    badgeColor: 'rgba(59,130,246,0.9)',
    glow: 'rgba(59,130,246,0.45)',
    border: 'rgba(59,130,246,0.5)',
    accentColor: '#3b82f6',
    includes: [
      { name: 'cPanel/WHM', desc: 'Industry-standard hosting control panel' },
      { name: 'LiteSpeed', desc: 'High-performance web server with caching' },
      { name: 'Imunify360', desc: 'Automated security for web servers' },
      { name: 'Softaculous', desc: 'Auto-installer with 400+ scripts' },
    ],
    original: 3650,
    price: 2999,
    discount: 18,
    highlight: true,
    waText: 'Pro%20Hosting%20Bundle%20(cPanel%20%2B%20LiteSpeed%20%2B%20Imunify360%20%2B%20Softaculous)',
  },
  {
    name: 'VPS Master Bundle',
    badge: 'For VPS',
    badgeColor: 'rgba(139,92,246,0.9)',
    glow: 'rgba(139,92,246,0.35)',
    border: 'rgba(139,92,246,0.4)',
    accentColor: '#8b5cf6',
    includes: [
      { name: 'Virtualizor', desc: 'Multi-hypervisor VPS control panel' },
      { name: 'CloudLinux', desc: 'Secure OS for shared hosting' },
      { name: 'LiteSpeed', desc: 'High-performance web server with caching' },
      { name: 'JetBackup', desc: 'Incremental enterprise backup solution' },
    ],
    original: 4350,
    price: 3499,
    discount: 20,
    highlight: false,
    waText: 'VPS%20Master%20Bundle%20(Virtualizor%20%2B%20CloudLinux%20%2B%20LiteSpeed%20%2B%20JetBackup)',
  },
  {
    name: 'Ultimate Stack',
    badge: 'Best Deal',
    badgeColor: 'rgba(245,158,11,0.9)',
    glow: 'rgba(245,158,11,0.35)',
    border: 'rgba(245,158,11,0.4)',
    accentColor: '#f59e0b',
    includes: [
      { name: 'cPanel/WHM', desc: 'Industry-standard hosting control panel' },
      { name: 'LiteSpeed', desc: 'High-performance web server with caching' },
      { name: 'CloudLinux', desc: 'Secure OS for shared hosting' },
      { name: 'Imunify360', desc: 'Automated security for web servers' },
      { name: 'JetBackup', desc: 'Incremental enterprise backup solution' },
      { name: 'Softaculous', desc: 'Auto-installer with 400+ scripts' },
    ],
    original: 5500,
    price: 4299,
    discount: 22,
    highlight: false,
    waText: 'Ultimate%20Stack%20Bundle%20(cPanel%20%2B%20LiteSpeed%20%2B%20CloudLinux%20%2B%20Imunify360%20%2B%20JetBackup%20%2B%20Softaculous)',
  },
];

export default function BundlesPage() {
  return (
    <main>
      <Header />

      <section className="page-hero blur-in visible">
        <HeroParticles glowColor="rgba(248, 87, 39, 0.4)" />
        <div className="page-hero-content">
          <div className="hero-text" style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(248,87,39,0.12)', border: '1px solid rgba(248,87,39,0.3)',
              borderRadius: '32px', padding: '6px 18px', marginBottom: '20px',
              color: '#f85727', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em',
            }}>
              SAVE UP TO 22%
            </div>
            <h1 className="delay-1">License Bundle Deals</h1>
            <p className="delay-2">
              Handpicked combinations of our most popular licenses — get more, pay less. All bundles include instant activation.
            </p>
            <div style={{ marginTop: '24px' }}>
              <Link href="/licenses" style={{ color: 'var(--muted)', fontSize: '0.9rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                View individual licenses
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '28px',
          }}>
            {bundles.map((bundle, i) => (
              <div
                key={i}
                className="fade-up hover-card"
                style={{
                  position: 'relative',
                  background: bundle.highlight
                    ? `linear-gradient(145deg, rgba(59,130,246,0.1), rgba(59,130,246,0.04))`
                    : 'var(--card-bg)',
                  border: `1px solid ${bundle.border}`,
                  borderRadius: '24px',
                  padding: '36px 28px 28px',
                  boxShadow: bundle.highlight
                    ? `0 0 48px ${bundle.glow}, 0 8px 40px rgba(0,0,0,0.3)`
                    : `0 0 28px ${bundle.glow}, 0 4px 20px rgba(0,0,0,0.2)`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  transition: 'transform 0.25s, box-shadow 0.25s',
                }}
              >
                {/* Top badge */}
                <div style={{
                  position: 'absolute', top: '-13px', left: '24px',
                  background: bundle.badgeColor,
                  color: '#fff', fontSize: '0.7rem', fontWeight: 700,
                  letterSpacing: '0.08em', padding: '4px 14px', borderRadius: '20px',
                  textTransform: 'uppercase',
                }}>
                  {bundle.badge}
                </div>

                {/* Discount pill */}
                <div style={{
                  position: 'absolute', top: '22px', right: '22px',
                  background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)',
                  color: '#10b981', fontSize: '0.76rem', fontWeight: 700,
                  padding: '3px 10px', borderRadius: '20px',
                }}>
                  -{bundle.discount}% OFF
                </div>

                {/* Bundle name */}
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, paddingTop: '4px' }}>
                  {bundle.name}
                </h3>

                {/* Includes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Includes
                  </p>
                  {bundle.includes.map((item, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{
                        width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0, marginTop: '1px',
                        background: `rgba(${bundle.accentColor === '#f85727' ? '248,87,39' : bundle.accentColor === '#4f46e5' ? '79,70,229' : bundle.accentColor === '#10b981' ? '16,185,129' : bundle.accentColor === '#3b82f6' ? '59,130,246' : bundle.accentColor === '#8b5cf6' ? '139,92,246' : '245,158,11'},0.15)`,
                        border: `1px solid ${bundle.border}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: bundle.accentColor, fontSize: '0.7rem', fontWeight: 700,
                      }}>
                        ✓
                      </span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{item.name}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

                {/* Pricing */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 800, color: bundle.accentColor, lineHeight: 1 }}>
                    PKR {bundle.price.toLocaleString()}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--muted)', textDecoration: 'line-through' }}>
                    PKR {bundle.original.toLocaleString()}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>/mo</span>
                </div>

                <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '-10px' }}>
                  You save PKR {(bundle.original - bundle.price).toLocaleString()} every month
                </div>

                {/* CTA */}
                <a
                  href={`https://wa.me/923043126626?text=Hi%2C%20I%20want%20to%20order%20the%20${bundle.waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    background: bundle.highlight
                      ? 'linear-gradient(90deg, #3b82f6, #2563eb)'
                      : `${bundle.accentColor}`,
                    color: '#fff', fontWeight: 700, fontSize: '0.95rem',
                    padding: '13px 20px', borderRadius: '12px',
                    textDecoration: 'none', letterSpacing: '0.02em',
                    boxShadow: `0 4px 20px ${bundle.glow}`,
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Order on WhatsApp
                </a>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{
            marginTop: '64px', textAlign: 'center',
            background: 'var(--card-bg)', border: '1px solid var(--border)',
            borderRadius: '20px', padding: '40px 32px',
          }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '1.3rem', fontWeight: 700 }}>
              Need a custom bundle?
            </h3>
            <p style={{ color: 'var(--muted)', margin: '0 0 24px', fontSize: '0.95rem' }}>
              Contact us on WhatsApp and we&apos;ll build a bundle tailored to your setup.
            </p>
            <a
              href="https://wa.me/923043126626?text=Hi%2C%20I%20need%20help%20choosing%20a%20custom%20license%20bundle"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'transparent', border: '1px solid var(--border)',
                color: 'var(--text)', fontWeight: 600, fontSize: '0.9rem',
                padding: '11px 24px', borderRadius: '10px', textDecoration: 'none',
                transition: 'border-color 0.2s',
              }}
            >
              Chat with us
            </a>
          </div>
        </div>
      </section>

      <PremiumGuarantees />

      <RelatedBlogs title="Related Licensing Guides" />

      <Footer />
    </main>
  );
}

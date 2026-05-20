'use client';

import dynamic from 'next/dynamic';
import ProductSchema from '../components/ProductSchema';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingSkeleton from '../components/LoadingSkeleton';
import Link from 'next/link';
import LicenseLogo from '../components/LicenseLogo';

const PremiumGuarantees = dynamic(() => import('../components/PremiumGuarantees'), {
  loading: () => <LoadingSkeleton height="400px" />,
  ssr: false
});
const RelatedBlogs = dynamic(() => import('../components/RelatedBlogs'), {
  loading: () => <LoadingSkeleton height="500px" />,
  ssr: false
});
import HeroParticles from '../components/HeroParticles';

export default function Licenses() {
  const licenses = [
    { name: 'cPanel/WHM', price: 'PKR 1,200', type: 'cpanel', glow: 'rgba(248, 87, 39, 0.4)', desc: 'Industry-standard control panel for web hosting management.', link: '/cpanel-license' },
    { name: 'Plesk Panel', price: 'PKR 700', type: 'plesk', glow: 'rgba(59, 130, 246, 0.4)', desc: 'Powerful hosting platform with WordPress toolkit included.', link: '/plesk-license' },
    { name: 'LiteSpeed', price: 'PKR 1,500', type: 'litespeed', glow: 'rgba(16, 185, 129, 0.4)', desc: 'High-performance web server with built-in caching.', link: '/litespeed-license' },
    { name: 'CloudLinux', price: 'PKR 1,500', type: 'cloudlinux', glow: 'rgba(100, 116, 139, 0.4)', desc: 'Secure OS designed for shared hosting environments.', link: '/cloudlinux-license' },
    { name: 'Imunify360', price: 'PKR 600', type: 'imunify360', glow: 'rgba(79, 70, 229, 0.4)', desc: 'Automated security solution for web servers.', link: '/imunify360' },
    { name: 'cpGuard', price: 'PKR 500', type: 'cpguard', glow: 'rgba(34, 197, 94, 0.4)', desc: 'Security solution with malware scanning for cPanel.', link: '/cpguard' },
    { name: 'OSM', price: 'PKR 1,200', type: 'osm', glow: 'rgba(56, 189, 248, 0.4)', desc: 'Performance and security server management.', link: '/osm' },
    { name: 'Virtualizor', price: 'PKR 1,000', type: 'virtualizor', glow: 'rgba(139, 92, 246, 0.4)', desc: 'Powerful multi-hypervisor VPS control panel.', link: '/virtualizor' },
    { name: 'WHMSonic', price: 'PKR 350', type: 'whmsonic', glow: 'rgba(239, 68, 68, 0.4)', desc: 'Shoutcast streaming and AutoDJ hosting panel.', link: '/whmsonic' },
    { name: 'DAReseller', price: 'PKR 350', type: 'dareseller', glow: 'rgba(245, 158, 11, 0.4)', desc: 'DirectAdmin reseller module for sub-resellers.', link: '/dareseller' },
    { name: 'DirectAdmin', price: 'PKR 350', type: 'directadmin', glow: 'rgba(6, 182, 212, 0.4)', desc: 'Lightweight web hosting control panel.', link: '/directadmin' },
    { name: 'WHMReseller', price: 'PKR 750', type: 'whmreseller', glow: 'rgba(59, 130, 246, 0.4)', desc: 'Master & Alpha reseller plugin for cPanel/WHM.', link: '/whmreseller' },
    { name: 'JetBackup', price: 'PKR 350', type: 'jetbackup', glow: 'rgba(99, 102, 241, 0.4)', desc: 'Incremental enterprise backup solution.', link: '/jetbackup' },
    { name: 'Softaculous', price: 'PKR 350', type: 'softaculous', glow: 'rgba(236, 72, 153, 0.4)', desc: 'Leading auto-installer with 400+ scripts.', link: '/softaculous' },
    { name: 'SitePad', price: 'PKR 450', type: 'sitepad', glow: 'rgba(244, 63, 94, 0.4)', desc: 'Drag-and-drop website builder with 800+ themes.', link: '/sitepad' },
  ];

  return (
    <main>
      <Header />

      <ProductSchema
        name="Software Licenses"
        url="https://qazi.host/licenses"
        currency="PKR"
        plans={licenses}
      />

      <section className="page-hero blur-in visible">
        <HeroParticles glowColor="rgba(248, 87, 39, 0.4)" />
        <div className="page-hero-content page-hero-content--split">
          <div className="hero-text">
            <h1 className="delay-1">Software Licenses</h1>
            <p className="delay-2">Affordable, instant-activation licenses for cPanel, Plesk, LiteSpeed, and more. Save up to 40% compared to direct pricing.</p>
          </div>
          <div className="hero-logo-side">
            <LicenseLogo type="all-licenses" glowColor="rgba(248, 87, 39, 0.4)" />
          </div>
        </div>
      </section>

      {/* Explore Bundles Banner */}
      <section style={{ padding: '40px 0 0' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, rgba(248,87,39,0.12) 0%, rgba(245,158,11,0.08) 100%)',
            border: '1px solid rgba(248,87,39,0.3)',
            borderRadius: '20px',
            padding: '32px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            flexWrap: 'wrap',
          }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: 'rgba(248,87,39,0.15)', borderRadius: '20px',
                padding: '3px 12px', marginBottom: '10px',
                color: '#f85727', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.05em',
              }}>
                SAVE UP TO 22%
              </div>
              <h2 style={{ margin: '0 0 6px', fontSize: '1.4rem', fontWeight: 800 }}>
                Better value with License Bundles
              </h2>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.95rem' }}>
                Get multiple licenses together at one discounted price — handpicked combos for every use case.
              </p>
            </div>
            <Link
              href="/licenses/bundles"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'linear-gradient(90deg, #f85727, #f59e0b)',
                color: '#fff', fontWeight: 700, fontSize: '0.95rem',
                padding: '13px 28px', borderRadius: '12px',
                textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0,
                boxShadow: '0 4px 20px rgba(248,87,39,0.35)',
              }}
            >
              Explore Bundles
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="pricing-section">
        <div className="container">
          <div className="types-grid">
            {licenses.map((lic, i) => (
              <Link href={lic.link} key={i} className="type-card hover-card fade-up">
                <div className="type-icon">
                  <LicenseLogo type={lic.type} glowColor={lic.glow} variant="icon" />
                </div>
                <h3>{lic.name}</h3>
                <p>{lic.desc}</p>
                <div style={{ marginTop: '16px', fontWeight: 700, color: 'var(--accent)', fontSize: '1.5rem' }}>
                  {lic.price}<span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>/month</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PremiumGuarantees />

      <RelatedBlogs title="Related Licensing Guides" />

      <Footer />
    </main>
  );
}

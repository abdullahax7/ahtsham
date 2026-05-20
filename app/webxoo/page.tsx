'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingSkeleton from '../components/LoadingSkeleton';

const PremiumGuarantees = dynamic(() => import('../components/PremiumGuarantees'), {
  loading: () => <LoadingSkeleton height="400px" />,
  ssr: false
});

const WEBXOO = 'https://webxoo.com';

const services = [
  {
    title: 'Custom Web Development',
    desc: 'Bespoke websites and applications using React, Next.js, and modern tech stacks.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  },
  {
    title: 'UI/UX Design',
    desc: 'Pixel-perfect, conversion-focused wireframes and front-end designs.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
  },
  {
    title: 'SEO & Performance',
    desc: 'Technical SEO audits, speed optimizations, and Core Web Vitals improvements.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  },
  {
    title: 'WordPress Solutions',
    desc: 'Custom themes, plugins, and scalable WordPress deployments.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
  },
  {
    title: 'E-Commerce',
    desc: 'High-converting Shopify, WooCommerce, or custom checkout paths.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  },
  {
    title: 'Ongoing Maintenance',
    desc: 'Security patches, regular updates, and monthly technical reporting.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  }
];

export default function WebxooPage() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="page-hero blur-in visible" style={{ padding: '120px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg)', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)', zIndex: 0 }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="webxoo-hero-grid" style={{ display: 'grid', gap: '64px', alignItems: 'center' }}>
            <div className="hero-text-content">
              <div className="fade-up delay-1" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', padding: '6px 16px', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '20px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}></span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '1px' }}>Official Development Partner</span>
              </div>
              
              <h1 className="fade-up delay-2" style={{ fontSize: '4rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px' }}>
                Build  Your Vision <br /><span style={{ background: 'linear-gradient(90deg, #fff, var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Without Limits</span>
              </h1>
              
              <p className="fade-up delay-3" style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '40px', maxWidth: '500px' }}>
                Qazi.Host is proudly partnered with <strong>Webxoo</strong>, a top-tier digital agency. Get highly optimized Next.js websites, brilliant UI/UX, and seamless hosting integration.
              </p>
              
              <div className="fade-up delay-4" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href={WEBXOO} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '14px 36px', fontSize: '1rem', borderRadius: '8px' }}>
                  Start Building →
                </a>
                <a href={WEBXOO} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '14px 36px', fontSize: '1rem', borderRadius: '8px' }}>
                  View Portfolio
                </a>
              </div>
            </div>

            <div className="fade-up delay-3" style={{ position: 'relative' }}>
              <div style={{ padding: '48px', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', textAlign: 'center' }}>
                <img src="https://www.webxoo.com/webxoo.webp" alt="Webxoo Logo" className="webxoo-logo-page" style={{ height: '80px', objectFit: 'contain', marginBottom: '24px', filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.1))' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Enterprise Quality Development</h3>
                <p style={{ color: 'var(--text-muted)' }}>From startups to scale-ups, Webxoo executes seamlessly on Qazi.Host infrastructure.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={{ padding: '80px 0', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-head" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="section-label">Core Capabilities</div>
            <h2 className="section-title">What Webxoo Delivers</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {services.map((s, i) => (
              <a key={i} href={WEBXOO} target="_blank" rel="noopener noreferrer" className="hover-card fade-up" style={{ 
                background: 'var(--card-bg)', 
                border: '1px solid var(--border)', 
                borderRadius: '20px', 
                padding: '40px 32px', 
                textDecoration: 'none', 
                color: 'inherit',
                display: 'block'
              }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', color: 'var(--accent)' }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '12px' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, fontSize: '0.95rem' }}>{s.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 0', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="hover-card fade-up" style={{
            background: 'linear-gradient(145deg, var(--card-bg), rgba(34, 211, 238, 0.03))',
            border: '1px solid var(--border)',
            borderRadius: '24px',
            padding: '64px 40px',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '16px' }}>Ready to Elevate Your Web Presence?</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 32px', lineHeight: 1.6 }}>
              Get a free consultation and personalized quote from the experts at Webxoo. Experience premium development paired perfectly with Qazi.Host performance.
            </p>
            <a href={WEBXOO} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '1.05rem', borderRadius: '8px' }}>
              Deploy With Webxoo
            </a>
          </div>
        </div>
      </section>

      <PremiumGuarantees />
      <Footer />
      <style dangerouslySetInnerHTML={{__html: `
        .webxoo-hero-grid {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 900px) {
          .webxoo-hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .webxoo-hero-grid .hero-text-content {
            align-items: center;
            display: flex;
            flex-direction: column;
          }
          .webxoo-hero-grid h1 {
            font-size: 2.5rem !important;
          }
          .webxoo-hero-grid .fade-up.delay-4 {
            justify-content: center;
          }
          .webxoo-logo-page {
            height: 50px !important;
          }
        }
        @media (max-width: 600px) {
          .webxoo-hero-grid h1 {
            font-size: 2rem !important;
          }
        }
      `}} />
    </main>
  );
}

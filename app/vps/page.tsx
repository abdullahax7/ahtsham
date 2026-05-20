'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingAd from '../components/FloatingAd';
import LoadingSkeleton from '../components/LoadingSkeleton';

const PremiumGuarantees = dynamic(() => import('../components/PremiumGuarantees'), {
  loading: () => <LoadingSkeleton height="400px" />,
  ssr: false
});
const RelatedBlogs = dynamic(() => import('../components/RelatedBlogs'), {
  loading: () => <LoadingSkeleton height="500px" />,
  ssr: false
});
import HeroParticles from '../components/HeroParticles';
import LicenseLogo from '../components/LicenseLogo';

type Plan = {
  name: string;
  price: string;
  setup?: string;
  popular?: boolean;
  orderLink?: string;
  specs: { label: string; value: string }[];
};

// VPS currently has no published plans — keep an empty fallback so the page
// shows the "Coming Soon" block until the admin populates plans in the DB.
const FALLBACK_PLANS: Plan[] = [];
const FALLBACK_HERO_TITLE = 'VPS';
const FALLBACK_HERO_SUBTITLE = 'Powerful virtual private servers with dedicated resources, full root access, and enterprise-grade performance.';

export default function VPS() {
  const [plans, setPlans] = useState<Plan[]>(FALLBACK_PLANS);
  const [heroTitle, setHeroTitle] = useState<string>(FALLBACK_HERO_TITLE);
  const [heroSubtitle, setHeroSubtitle] = useState<string>(FALLBACK_HERO_SUBTITLE);

  useEffect(() => {
    let alive = true;
    fetch('/api/public/product/vps')
      .then((r) => (r.ok ? r.json() : null))
      .then((p) => {
        if (!alive || !p) return;
        if (Array.isArray(p.plans) && p.plans.length) setPlans(p.plans);
        if (p.page_content?.hero_title) setHeroTitle(p.page_content.hero_title);
        if (p.page_content?.hero_subtitle) setHeroSubtitle(p.page_content.hero_subtitle);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return (
    <main>
      <Header />

      <section className="page-hero blur-in visible">
        <HeroParticles glowColor="rgba(59, 130, 246, 0.4)" />
        <div className="page-hero-content page-hero-content--split">
          <div className="hero-text">
            <h1 className="delay-1">{heroTitle}</h1>
            <p className="delay-2">{heroSubtitle}</p>
          </div>
          <div className="hero-logo-side">
            <LicenseLogo type="vps" glowColor="rgba(59, 130, 246, 0.4)" />
          </div>
        </div>

      </section>

      <section className="pricing-section">
        <div className="container">

          {plans.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '64px' }}>
              {plans.map((plan, i) => (
                <div key={i} className="hover-card" style={{
                  background: plan.popular ? 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(248,87,39,0.08))' : 'var(--surface)',
                  border: plan.popular ? '2px solid rgba(59,130,246,0.5)' : '1px solid var(--border)',
                  borderRadius: '20px',
                  padding: '40px 32px',
                  position: 'relative',
                  boxShadow: plan.popular ? '0 8px 32px rgba(59,130,246,0.15)' : '0 4px 16px rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center'
                }}>
                  {plan.popular && (
                    <div style={{
                      position: 'absolute',
                      top: '-14px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(90deg,#3b82f6,#60a5fa)',
                      color: '#fff',
                      padding: '4px 20px',
                      borderRadius: '32px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      whiteSpace: 'nowrap'
                    }}>Most Popular</div>
                  )}
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>{plan.name}</h3>
                  <div style={{ marginBottom: plan.setup ? '4px' : '24px' }}>
                    <span style={{ fontSize: '2rem', fontWeight: 800, color: plan.popular ? '#60a5fa' : '#fff' }}>{plan.price}</span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--muted)', marginLeft: '4px' }}>/month</span>
                  </div>
                  {plan.setup && <div style={{ fontSize: '0.8rem', color: '#f59e0b', marginBottom: '24px' }}>{plan.setup}</div>}
                  <div style={{ flex: 1 }}>
                    {plan.specs.map((spec, j) => (
                      <div key={j} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        gap: '8px'
                      }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{spec.label}</span>
                        <span style={{
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          color: spec.value === 'Yes' ? '#22c55e' : spec.value === 'Free' ? '#60a5fa' : '#fff',
                          textAlign: 'right'
                        }}>{spec.value}</span>
                      </div>
                    ))}
                  </div>
                  {plan.orderLink && (
                    <a
                      href={plan.orderLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ width: '100%', textAlign: 'center', marginTop: '24px', display: 'block' }}
                    >
                      Order Now
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {plans.length === 0 && (
          /* Coming Soon Block */
          <div className="hover-card" style={{ textAlign: 'center', padding: '80px 24px', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '16px', marginBottom: '64px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>Coming Soon</h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 32px', lineHeight: 1.6 }}>
              We are currently provisioning next-generation enterprise VPS nodes. High-performance Virtual Private Servers will be available for order very shortly. Please check back soon or contact us for early access.
            </p>
            <a
              href="https://wa.me/923043126626?text=Hi%2C%20I%20am%20interested%20in%20VPS%20early%20access"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ padding: '14px 32px', fontSize: '1rem' }}
            >
              Request Early Access
            </a>
          </div>
          )}

          {/* Notes */}
          <div className="warnings-container" style={{ marginTop: '64px', marginBottom: '80px' }}>
            <div className="warning-box warning-info">
              <strong>Why Choose Qazi.Host VPS?</strong> Dedicated resources, full root access, NVMe SSD storage, and KVM virtualization. Ideal for growing websites, web applications, game servers, and development environments.
            </div>
            <div className="warning-box warning-info">
              <strong>Fully Managed Option:</strong> Don&apos;t want to manage your server? Our team can handle OS updates, security patches, monitoring, and optimization so you can focus on your business.
            </div>
            <div className="warning-box warning-info">
              <strong>Instant Provisioning:</strong> Your VPS will be deployed within minutes of payment confirmation. Full root SSH access and optional cPanel/WHM or Plesk control panel available.
            </div>
            <div className="warning-box warning-danger">
              <strong>STRICTLY PROHIBITED:</strong> Spamming / Phishing / Bruteforce / Floods / Attacks / Scanning / Pornography / Open Proxy / Malware Distribution / Botnets / Terrorist activities / Crypto Mining is STRICTLY NOT allowed. If found involved, your services will be suspended immediately with NO refund.
            </div>
          </div>

          {/* FAQ Section */}
          <div style={{ marginTop: '80px' }}>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '56px' }}>Frequently Asked Questions</h2>
            <div>
              <div className="faq-item open">
                <div className="faq-q" style={{ cursor: 'default' }}>What is VPS?</div>
                <div className="faq-a" style={{ display: 'block' }}>VPS (Virtual Private Server) gives you dedicated resources (CPU, RAM, storage) on a virtualized server. It offers more power and control than shared hosting, with guaranteed resources that are never shared with others.</div>
              </div>
              <div className="faq-item open">
                <div className="faq-q" style={{ cursor: 'default' }}>Will I get full root access?</div>
                <div className="faq-a" style={{ display: 'block' }}>Yes, all VPS plans will include full root SSH access. You will have complete control over your server environment, software installations, and configurations.</div>
              </div>
              <div className="faq-item open">
                <div className="faq-q" style={{ cursor: 'default' }}>Which operating systems will be supported?</div>
                <div className="faq-a" style={{ display: 'block' }}>We plan to support CentOS, Ubuntu, Debian, AlmaLinux, and Rocky Linux out of the box. Custom OS installations will be available upon request.</div>
              </div>
              <div className="faq-item open">
                <div className="faq-q" style={{ cursor: 'default' }}>Will VPS plans be managed or unmanaged?</div>
                <div className="faq-a" style={{ display: 'block' }}>VPS plans will be unmanaged by default, giving you full control. Managed VPS support will be available as an optional add-on for server administration and maintenance.</div>
              </div>
              <div className="faq-item open">
                <div className="faq-q" style={{ cursor: 'default' }}>Can I scale VPS resources later?</div>
                <div className="faq-a" style={{ display: 'block' }}>Yes, you will be able to upgrade your CPU, RAM, and storage at any time. Upgrades are applied with minimal downtime to keep your services running smoothly.</div>
              </div>
              <div className="faq-item open">
                <div className="faq-q" style={{ cursor: 'default' }}>When will VPS be available?</div>
                <div className="faq-a" style={{ display: 'block' }}>We are actively working on setting up our VPS infrastructure. You can contact us on WhatsApp to be notified as soon as plans are live, or to request early access.</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <PremiumGuarantees />

      <RelatedBlogs productSlug="vps" title="Related Guides for VPS" />
      <FloatingAd 
        message="We also offer high-performance VPS licenses. Click here to explore our plans!" 
        link="/licenses" 
      />
      <Footer />
    </main>
  );
}

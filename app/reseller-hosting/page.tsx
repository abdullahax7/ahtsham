'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import ProductSchema from '../components/ProductSchema';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { 
  ShieldCheck, 
  Zap, 
  HardDrive, 
  Lock, 
  Package, 
  LayoutDashboard, 
  Globe, 
  MessageSquare 
} from 'lucide-react';

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

const FALLBACK_HERO_TITLE = 'Cheap Reseller Hosting Plans';
const FALLBACK_HERO_SUBTITLE = "Welcome to Qazi.Host, your one-stop shop for cheap and super-fast 100% DMCA Ignored reseller hosting. Our fast reseller hosting plans are designed to meet your website's need for speed, with top-of-the-line hardware and software configurations. And don't worry about breaking the bank - our cheap hosting prices won't hurt your wallet. Plus, we're proud to offer DMCA-friendly reseller hosting, so you can focus on growing your business without legal hassles. With our expert support team available Mon-Fri, you can count on us to keep your website running at lightning speed. Join us at Qazi Host and experience the power of affordable, super-fast, and DMCA-friendly reseller hosting.";

const FALLBACK_PLANS: Plan[] = [
  {
    name: 'Reseller 0',
    price: 'PKR 999.00',
    setup: 'PKR 100.00 Setup Fee',
    popular: false,
    orderLink: 'https://qazi.host/cart.php?a=add&pid=55',
    specs: [
      { label: 'Websites', value: '1' },
      { label: 'NVMe Storage', value: '2560 MB' },
      { label: 'Bandwidth', value: 'Unlimited' },
      { label: 'FTP Accounts', value: 'Unlimited' },
      { label: 'SSL Certificate', value: 'Free' },
      { label: 'Daily Backups', value: 'Free' },
      { label: 'Softaculous', value: 'Free' },
      { label: 'Powered By', value: 'LiteSpeed' },
      { label: 'Control Panel', value: 'cPanel' },
      { label: 'DMCA Ignored', value: 'Yes' },
      { label: 'Support', value: 'Standard' },
    ]
  },
  {
    name: 'Reseller 1',
    price: 'PKR 1499.00',
    setup: 'PKR 100.00 Setup Fee',
    popular: false,
    orderLink: 'https://qazi.host/cart.php?a=add&pid=2',
    specs: [
      { label: 'Websites', value: '2' },
      { label: 'NVMe Storage', value: '5120 MB' },
      { label: 'Bandwidth', value: 'Unlimited' },
      { label: 'FTP Accounts', value: 'Unlimited' },
      { label: 'SSL Certificate', value: 'Free' },
      { label: 'Daily Backups', value: 'Free' },
      { label: 'Softaculous', value: 'Free' },
      { label: 'Powered By', value: 'LiteSpeed' },
      { label: 'Control Panel', value: 'cPanel' },
      { label: 'DMCA Ignored', value: 'Yes' },
      { label: 'Support', value: 'Standard' },
    ]
  },
  {
    name: 'Reseller 2',
    price: 'PKR 2999.00',
    setup: 'PKR 100.00 Setup Fee',
    popular: false,
    orderLink: 'https://qazi.host/cart.php?a=add&pid=3',
    specs: [
      { label: 'Websites', value: '5' },
      { label: 'NVMe Storage', value: '10240 MB' },
      { label: 'Bandwidth', value: 'Unlimited' },
      { label: 'FTP Accounts', value: 'Unlimited' },
      { label: 'SSL Certificate', value: 'Free' },
      { label: 'Daily Backups', value: 'Free' },
      { label: 'Softaculous', value: 'Free' },
      { label: 'Powered By', value: 'LiteSpeed' },
      { label: 'Control Panel', value: 'cPanel' },
      { label: 'DMCA Ignored', value: 'Yes' },
      { label: 'Support', value: 'Standard' },
    ]
  },
  {
    name: 'Reseller 3',
    price: 'PKR 4999.00',
    setup: 'PKR 100.00 Setup Fee',
    popular: true,
    orderLink: 'https://qazi.host/cart.php?a=add&pid=5',
    specs: [
      { label: 'Websites', value: '10' },
      { label: 'NVMe Storage', value: '10GB/Site' },
      { label: 'Bandwidth', value: 'Unlimited' },
      { label: 'FTP Accounts', value: 'Unlimited' },
      { label: 'SSL Certificate', value: 'Free' },
      { label: 'Daily Backups', value: 'Free' },
      { label: 'Softaculous', value: 'Free' },
      { label: 'Powered By', value: 'LiteSpeed' },
      { label: 'Control Panel', value: 'cPanel' },
      { label: 'DMCA Ignored', value: 'Yes' },
      { label: 'Support', value: 'Standard' },
    ]
  },
  {
    name: 'Reseller 4',
    price: 'PKR 6999.00',
    setup: 'PKR 100.00 Setup Fee',
    popular: false,
    orderLink: 'https://qazi.host/cart.php?a=add&pid=63',
    specs: [
      { label: 'Websites', value: '15' },
      { label: 'NVMe Storage', value: '10GB/Site' },
      { label: 'Bandwidth', value: 'Unlimited' },
      { label: 'FTP Accounts', value: 'Unlimited' },
      { label: 'SSL Certificate', value: 'Free' },
      { label: 'Daily Backups', value: 'Free' },
      { label: 'Softaculous', value: 'Free' },
      { label: 'Powered By', value: 'LiteSpeed' },
      { label: 'Control Panel', value: 'cPanel' },
      { label: 'DMCA Ignored', value: 'Yes' },
      { label: 'Support', value: 'Standard' },
    ]
  },
  {
    name: 'Reseller 5',
    price: 'PKR 9999.00',
    setup: 'PKR 50.00 Setup Fee',
    popular: false,
    orderLink: 'https://qazi.host/cart.php?a=add&pid=64',
    specs: [
      { label: 'Websites', value: '25' },
      { label: 'NVMe Storage', value: '15GB/Site' },
      { label: 'Bandwidth', value: 'Unlimited' },
      { label: 'FTP Accounts', value: 'Unlimited' },
      { label: 'SSL Certificate', value: 'Free' },
      { label: 'Daily Backups', value: 'Free' },
      { label: 'Softaculous', value: 'Free' },
      { label: 'Powered By', value: 'LiteSpeed' },
      { label: 'Control Panel', value: 'cPanel' },
      { label: 'DMCA Ignored', value: 'Yes' },
      { label: 'Support', value: 'Standard' },
    ]
  },
  {
    name: 'Reseller 6',
    price: 'PKR 11999.00',
    setup: '',
    popular: false,
    orderLink: 'https://qazi.host/cart.php?a=add&pid=69',
    specs: [
      { label: 'Websites', value: '40' },
      { label: 'NVMe Storage', value: '15GB/Site' },
      { label: 'Bandwidth', value: 'Unlimited' },
      { label: 'FTP Accounts', value: 'Unlimited' },
      { label: 'SSL Certificate', value: 'Free' },
      { label: 'Daily Backups', value: 'Free' },
      { label: 'Softaculous', value: 'Free' },
      { label: 'Powered By', value: 'LiteSpeed' },
      { label: 'Control Panel', value: 'cPanel' },
      { label: 'DMCA Ignored', value: 'Yes' },
      { label: 'Support', value: 'Standard' },
    ]
  },
  {
    name: 'Reseller 7',
    price: 'PKR 16999.00',
    setup: '',
    popular: false,
    orderLink: 'https://qazi.host/cart.php?a=add&pid=74',
    specs: [
      { label: 'Websites', value: '60' },
      { label: 'NVMe Storage', value: '15GB/Site' },
      { label: 'Bandwidth', value: 'Unlimited' },
      { label: 'FTP Accounts', value: 'Unlimited' },
      { label: 'SSL Certificate', value: 'Free' },
      { label: 'Daily Backups', value: 'Free' },
      { label: 'Softaculous', value: 'Free' },
      { label: 'Powered By', value: 'LiteSpeed' },
      { label: 'Control Panel', value: 'cPanel' },
      { label: 'DMCA Ignored', value: 'Yes' },
      { label: 'Support', value: 'Standard' },
    ]
  },
  {
    name: 'Reseller 8',
    price: 'PKR 20999.00',
    setup: '',
    popular: false,
    orderLink: 'https://qazi.host/cart.php?a=add&pid=75',
    specs: [
      { label: 'Websites', value: '80' },
      { label: 'NVMe Storage', value: '15GB/Site' },
      { label: 'Bandwidth', value: 'Unlimited' },
      { label: 'FTP Accounts', value: 'Unlimited' },
      { label: 'SSL Certificate', value: 'Free' },
      { label: 'Daily Backups', value: 'Free' },
      { label: 'Softaculous', value: 'Free' },
      { label: 'Powered By', value: 'LiteSpeed' },
      { label: 'Control Panel', value: 'cPanel' },
      { label: 'DMCA Ignored', value: 'Yes' },
      { label: 'Support', value: 'Standard' },
    ]
  },
];

export default function ResellerHosting() {
  const [plans, setPlans] = useState<Plan[]>(FALLBACK_PLANS);
  const [heroTitle, setHeroTitle] = useState<string>(FALLBACK_HERO_TITLE);
  const [heroSubtitle, setHeroSubtitle] = useState<string>(FALLBACK_HERO_SUBTITLE);

  useEffect(() => {
    let alive = true;
    fetch('/api/public/product/reseller-hosting')
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

      {/* Schema.org for Pricing */}
      <ProductSchema
        name="Reseller Hosting"
        url="https://qazi.host/reseller-hosting"
        currency="PKR"
        plans={plans}
      />


      <section className="page-hero blur-in visible">
        <HeroParticles glowColor="rgba(139, 92, 246, 0.4)" />
        <div className="page-hero-content page-hero-content--split">
          <div className="hero-text">
            <h1 className="delay-1">{heroTitle}</h1>
            <p className="delay-2">{heroSubtitle}</p>
          </div>
          <div className="hero-logo-side">
            <LicenseLogo type="reseller" glowColor="rgba(139, 92, 246, 0.4)" />
          </div>
        </div>

      </section>

      <section className="pricing-section">
        <div className="container">

          {/* Pricing Grid */}
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
                  }}>Best Buy</div>
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

                <a
                  href={plan.orderLink} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ width: '100%', textAlign: 'center', marginTop: '24px', display: 'block' }}
                >
                  Order Now
                </a>
              </div>
            ))}
          </div>

          {/* Included with every plan */}
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '48px 40px', marginBottom: '48px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '40px' }}>Included With Every Plan</h2>
            <div className="features-grid-custom" style={{ 
              display: 'grid', 
              gap: '24px' 
            }}>
              {[
                { icon: <Lock size={32} />, label: 'Free SSL Certificate' },
                { icon: <HardDrive size={32} />, label: 'Daily Backups' },
                { icon: <Zap size={32} />, label: 'NVMe SSD Storage' },
                { icon: <ShieldCheck size={32} />, label: 'DMCA Ignored Hosting' },
                { icon: <Package size={32} />, label: 'Softaculous (400+ Apps)' },
                { icon: <LayoutDashboard size={32} />, label: 'cPanel Control Panel' },
                { icon: <Globe size={32} />, label: '99.9% Uptime SLA' },
                { icon: <MessageSquare size={32} />, label: 'Mon-Fri Support' },
              ].map((item, i) => (
                <div key={i} style={{ 
                  padding: '24px', 
                  background: 'rgba(255,255,255,0.02)', 
                  borderRadius: '16px', 
                  border: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }} className="hover-card">
                  <div style={{ 
                    color: '#f85727', 
                    marginBottom: '16px',
                    padding: '12px',
                    background: 'rgba(248,87,39,0.1)',
                    borderRadius: '12px'
                  }}>{item.icon}</div>
                  <div style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 600 }}>{item.label}</div>
                </div>
              ))}
            </div>
            <style dangerouslySetInnerHTML={{__html: `
              .features-grid-custom {
                grid-template-columns: repeat(4, 1fr);
              }
              @media (max-width: 1024px) {
                .features-grid-custom { grid-template-columns: repeat(2, 1fr); }
              }
              @media (max-width: 640px) {
                .features-grid-custom { grid-template-columns: 1fr; }
              }
            `}} />
          </div>

          <div className="warnings-container" style={{ marginBottom: '80px' }}>
            <div className="warning-box warning-info">
              <strong>Why Choose Qazi.Host Reseller Hosting?</strong> Our reseller hosting plans come with free white-label branding, full WHM/cPanel access, and LiteSpeed web server — everything you need to launch your own hosting business. We handle the server management so you can focus on growing your client base.
            </div>
            <div className="warning-box warning-info">
              <strong>Scalable &amp; Reliable:</strong> All reseller plans run on high-performance NVMe SSD storage with 99.9% uptime guarantee. Easily upgrade your plan as your business grows. Each account is isolated for security and performance.
            </div>
            <div className="warning-box warning-info">
              <strong>Full Control:</strong> Create custom hosting packages, set your own pricing, and manage all your clients from a single WHM dashboard. Free SSL certificates, daily backups, and DDoS protection included with every plan.
            </div>
            <div className="warning-box warning-danger">
              <strong>STRICTLY PROHIBITED:</strong> Spamming / Phishing / Bruteforce / Floods / Attacks / Scanning / Pornography / Open Proxy / Malware Distribution / Botnets / Terrorist activities / Crypto Mining is STRICTLY NOT allowed. If found involved in such activities, your services will be suspended immediately with NO refund.
            </div>
          </div>
        </div>
      </section>


      <PremiumGuarantees />

      <RelatedBlogs productSlug="reseller" title="Related Guides for Reseller Hosting" />

      <Footer />
    </main>
  );
}

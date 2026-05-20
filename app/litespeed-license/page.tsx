'use client';

import dynamic from 'next/dynamic';
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
import SetupGuide from '../components/SetupGuide';

const plans = [
  {
    name: 'LiteSpeed 2 Workers',
    price: 'PKR 1500.00',
    setup: 'PKR 100.00 Setup Fee',
    popular: false,
    orderLink: 'https://qazi.host/cart.php?a=add&pid=31',
    specs: [
      { label: 'Official Updates', value: 'Yes' },
      { label: 'IP Changeable', value: 'Yes' },
      { label: 'Replace Normal License', value: 'Yes' },
      { label: 'Free Installation', value: 'Yes' },
      { label: 'Support', value: 'Standard' },
    ]
  },
  {
    name: 'Litespeed 4 Workers',
    price: 'PKR 1700.00',
    setup: 'PKR 100.00 Setup Fee',
    popular: true,
    orderLink: 'https://qazi.host/cart.php?a=add&pid=77',
    specs: [
      { label: 'Official Updates', value: 'Yes' },
      { label: 'IP Changeable', value: 'Yes' },
      { label: 'Replace Normal License', value: 'Yes' },
      { label: 'Free Installation', value: 'Yes' },
      { label: 'Support', value: 'Standard' },
    ]
  },
  {
    name: 'Litespeed 8 Workers',
    price: 'PKR 1900.00',
    setup: 'PKR 100.00 Setup Fee',
    popular: false,
    orderLink: 'https://qazi.host/cart.php?a=add&pid=78',
    specs: [
      { label: 'Official Updates', value: 'Yes' },
      { label: 'IP Changeable', value: 'Yes' },
      { label: 'Replace Normal License', value: 'Yes' },
      { label: 'Free Installation', value: 'Yes' },
      { label: 'Support', value: 'Standard' },
    ]
  },
  {
    name: 'Litespeed X Workers',
    price: 'PKR 2100.00',
    setup: 'PKR 100.00 Setup Fee',
    popular: false,
    orderLink: 'https://qazi.host/cart.php?a=add&pid=76',
    specs: [
      { label: 'Official Updates', value: 'Yes' },
      { label: 'IP Changeable', value: 'Yes' },
      { label: 'Replace Normal License', value: 'Yes' },
      { label: 'Free Installation', value: 'Yes' },
      { label: 'Support', value: 'Standard' },
    ]
  },
];

export default function LitespeedLicense() {
  return (
    <main>
      <Header />

      {/* Schema.org for Pricing */}
      <ProductSchema 
        name="LiteSpeed Web Server License" 
        url="https://qazi.host/litespeed-license" 
        currency="PKR"
        plans={plans} 
      />
      

      <section className="page-hero blur-in visible">
        <HeroParticles glowColor="rgba(16, 185, 129, 0.4)" />
        <div className="page-hero-content page-hero-content--split">
          <div className="hero-text">
            <h1 className="delay-1">LiteSpeed Web Server License</h1>
            <p className="delay-2">LiteSpeed is a high-performance, high-scalability web server designed to handle high-traffic websites efficiently while offering superior built-in caching and security.</p>
          </div>
          <div className="hero-logo-side">
            <LicenseLogo type="litespeed" glowColor="rgba(16, 185, 129, 0.4)" />
          </div>
        </div>

      </section>

      <SetupGuide type="litespeed" />

      <section className="pricing-section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '64px' }}>
            {plans.map((plan, i) => (
              <div key={i} className="hover-card" style={{
                background: plan.popular ? 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(248,87,39,0.08))' : 'var(--surface)',
                border: plan.popular ? '2px solid rgba(59,130,246,0.5)' : '1px solid var(--border)',
                borderRadius: '20px',
                padding: '40px 32px',
                position: 'relative',
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
                  }}>Best Buy</div>
                )}
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>{plan.name}</h3>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: plan.popular ? '#60a5fa' : '#fff' }}>{plan.price}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '4px' }}>/month</div>
                {plan.setup && <div style={{ fontSize: '0.8rem', color: '#f59e0b', marginBottom: '24px' }}>{plan.setup}</div>}
                
                <div style={{ flex: 1 }}>
                  {plan.specs.map((spec, j) => (
                    <div key={j} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{spec.label}</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{spec.value}</span>
                    </div>
                  ))}
                </div>

                <a href={plan.orderLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: '24px' }}>Order Now</a>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '48px 40px', marginBottom: '48px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '40px' }}>Included With Every License</h2>
            <div className="features-grid-custom" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              {[
                { icon: <Lock size={32} />, label: 'Genuine Updates' },
                { icon: <Zap size={32} />, label: 'Instant Setup' },
                { icon: <HardDrive size={32} />, label: 'IP Changeable' },
                { icon: <ShieldCheck size={32} />, label: 'High Security' },
                { icon: <Package size={32} />, label: 'Full Performance' },
                { icon: <LayoutDashboard size={32} />, label: 'Easy Commands' },
                { icon: <Globe size={32} />, label: 'Global Availability' },
                { icon: <MessageSquare size={32} />, label: 'Mon-Fri Support' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }} className="hover-card">
                  <div style={{ color: '#f85727', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                  <div style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>{item.label}</div>
                </div>
              ))}
            </div>
            <style dangerouslySetInnerHTML={{__html: `
              @media (max-width: 1024px) {
                .features-grid-custom { grid-template-columns: repeat(2, 1fr) !important; }
              }
              @media (max-width: 640px) {
                .features-grid-custom { grid-template-columns: 1fr !important; }
              }
            `}} />
          </div>
        </div>
      </section>

      <PremiumGuarantees />
      <RelatedBlogs productSlug="litespeed" title="Related Guides for LiteSpeed" />
      <Footer />
    </main>
  );
}

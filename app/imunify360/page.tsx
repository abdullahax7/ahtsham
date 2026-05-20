'use client';

import { useEffect, useState } from 'react';
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

type Plan = {
  name: string;
  price: string;
  setup?: string;
  popular?: boolean;
  orderLink?: string;
  specs: Array<{ label: string; value: string }>;
};

const FALLBACK_PLANS: Plan[] = [
  {
    name: 'Imunify360',
    price: 'PKR 550.00',
    setup: 'PKR 100.00 Setup Fee',
    popular: true,
    orderLink: 'https://qazi.host/cart.php?a=add&pid=33',
    specs: [
      { label: 'Official Updates', value: 'Yes' },
      { label: 'IP Changeable', value: 'Yes' },
      { label: 'Replace Normal License', value: 'Yes' },
      { label: 'Free Installation', value: 'Yes' },
      { label: 'Support', value: 'Standard' },
    ]
  },
];

const FALLBACK_HERO_TITLE = 'Imunify360 Security License';
const FALLBACK_HERO_SUBTITLE = 'Imunify360 is an automated security solution for web servers that uses an advanced firewall and malware scanning for multi-layered protection.';

export default function Imunify360License() {
  const [plans, setPlans] = useState<Plan[]>(FALLBACK_PLANS);
  const [heroTitle, setHeroTitle] = useState<string>(FALLBACK_HERO_TITLE);
  const [heroSubtitle, setHeroSubtitle] = useState<string>(FALLBACK_HERO_SUBTITLE);

  useEffect(() => {
    let alive = true;
    fetch('/api/public/product/imunify360')
      .then((r) => (r.ok ? r.json() : null))
      .then((p) => {
        if (!alive || !p) return;
        if (Array.isArray(p.plans) && p.plans.length) setPlans(p.plans);
        if (p.page_content?.hero_title) setHeroTitle(p.page_content.hero_title);
        if (p.page_content?.hero_subtitle) setHeroSubtitle(p.page_content.hero_subtitle);
      })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  return (
    <main>
      <Header />

      {/* Schema.org for Pricing */}
      <ProductSchema
        name="Imunify360 Security License"
        url="https://qazi.host/imunify360"
        currency="PKR"
        plans={plans}
      />


      <section className="page-hero blur-in visible">
        <HeroParticles glowColor="rgba(79, 70, 229, 0.4)" />
        <div className="page-hero-content page-hero-content--split">
          <div className="hero-text">
            <h1 className="delay-1">{heroTitle}</h1>
            <p className="delay-2">{heroSubtitle}</p>
          </div>
          <div className="hero-logo-side">
            <LicenseLogo type="imunify360" glowColor="rgba(79, 70, 229, 0.4)" />
          </div>
        </div>

      </section>

      <SetupGuide type="imunify360" />

      <section className="pricing-section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '64px', maxWidth: '400px', margin: '0 auto 64px' }}>
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
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>{plan.name}</h3>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: plan.popular ? '#60a5fa' : '#fff' }}>{plan.price}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '4px' }}>/month</div>
                {plan.setup && <div style={{ fontSize: '0.8rem', color: '#f59e0b', marginBottom: '24px' }}>{plan.setup}</div>}
                
                <div style={{ flex: 1 }}>
                  {plan.specs.map((spec, j) => (
                    <div key={j} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
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
      <RelatedBlogs productSlug="imunify360" title="Related Guides for Imunify360" />
      <Footer />
    </main>
  );
}

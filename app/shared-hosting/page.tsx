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
  MessageSquare,
  ArrowRight,
  Check
} from 'lucide-react';

// Lazy-loaded components
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

const plans = [
  {
    name: 'Shared 0',
    price: 'Rs. 499',
    setup: 'Rs. 50 Setup Fee',
    popular: false,
    orderLink: 'https://qazi.host/cart.php?a=add&pid=67',
    specs: [
      { label: 'Domains', value: '1' },
      { label: 'NVMe Storage', value: '1024 MB (1 GB)' },
      { label: 'Bandwidth', value: '5120 MB (5 GB)' },
      { label: 'FTPs', value: 'Unlimited' },
      { label: 'SSL', value: 'Free' },
      { label: 'Backups', value: 'Free' },
      { label: 'Softaculous', value: 'Free' },
      { label: 'Control Panel', value: 'cPanel' },
      { label: 'DMCA Ignored', value: 'Yes' },
      { label: 'Support', value: 'Basic' },
    ]
  },
  {
    name: 'Shared 1',
    price: 'Rs. 999',
    setup: 'Rs. 50 Setup Fee',
    popular: false,
    orderLink: 'https://qazi.host/cart.php?a=add&pid=6',
    specs: [
      { label: 'Domains', value: '3' },
      { label: 'NVMe Storage', value: '5120 MB (5 GB)' },
      { label: 'Bandwidth', value: '15360 MB (15 GB)' },
      { label: 'FTPs', value: 'Unlimited' },
      { label: 'SSL', value: 'Free' },
      { label: 'Backups', value: 'Free' },
      { label: 'Softaculous', value: 'Free' },
      { label: 'Control Panel', value: 'cPanel' },
      { label: 'DMCA Ignored', value: 'Yes' },
      { label: 'Support', value: 'Basic' },
    ]
  },
  {
    name: 'Shared 2',
    price: 'Rs. 1,799',
    setup: 'Rs. 50 Setup Fee',
    popular: true,
    orderLink: 'https://qazi.host/cart.php?a=add&pid=8',
    specs: [
      { label: 'Domains', value: '5' },
      { label: 'NVMe Storage', value: '10240 MB (10 GB)' },
      { label: 'Bandwidth', value: '20480 MB (20 GB)' },
      { label: 'FTPs', value: 'Unlimited' },
      { label: 'SSL', value: 'Free' },
      { label: 'Backups', value: 'Free' },
      { label: 'Softaculous', value: 'Free' },
      { label: 'Control Panel', value: 'cPanel' },
      { label: 'DMCA Ignored', value: 'Yes' },
      { label: 'Support', value: 'Basic' },
    ]
  },
  {
    name: 'Shared 3',
    price: 'Rs. 2,999',
    setup: 'Rs. 50 Setup Fee',
    popular: false,
    orderLink: 'https://qazi.host/cart.php?a=add&pid=9',
    specs: [
      { label: 'Domains', value: '10' },
      { label: 'NVMe Storage', value: '10240 MB (10 GB)' },
      { label: 'Bandwidth', value: 'Unlimited' },
      { label: 'FTPs', value: 'Unlimited' },
      { label: 'SSL', value: 'Free' },
      { label: 'Backups', value: 'Free' },
      { label: 'Softaculous', value: 'Free' },
      { label: 'Control Panel', value: 'cPanel' },
      { label: 'DMCA Ignored', value: 'Yes' },
      { label: 'Support', value: 'Basic' },
    ]
  },
  {
    name: 'Shared 4',
    price: 'Rs. 3,999',
    setup: 'Rs. 50 Setup Fee',
    popular: false,
    orderLink: 'https://qazi.host/cart.php?a=add&pid=65',
    specs: [
      { label: 'Domains', value: '15' },
      { label: 'NVMe Storage', value: '15360 MB (15 GB)' },
      { label: 'Bandwidth', value: 'Unlimited' },
      { label: 'FTPs', value: 'Unlimited' },
      { label: 'SSL', value: 'Free' },
      { label: 'Backups', value: 'Free' },
      { label: 'Softaculous', value: 'Free' },
      { label: 'Control Panel', value: 'cPanel' },
      { label: 'DMCA Ignored', value: 'Yes' },
      { label: 'Support', value: 'Basic' },
    ]
  },
  {
    name: 'Shared 5',
    price: 'Rs. 4,999',
    setup: 'Rs. 50 Setup Fee',
    popular: false,
    orderLink: 'https://qazi.host/cart.php?a=add&pid=66',
    specs: [
      { label: 'Domains', value: '20' },
      { label: 'NVMe Storage', value: 'Unlimited' },
      { label: 'Bandwidth', value: 'Unlimited' },
      { label: 'FTPs', value: 'Unlimited' },
      { label: 'SSL', value: 'Free' },
      { label: 'Backups', value: 'Free' },
      { label: 'Softaculous', value: 'Free' },
      { label: 'Control Panel', value: 'cPanel' },
      { label: 'DMCA Ignored', value: 'Yes' },
      { label: 'Support', value: 'Basic' },
    ]
  },
];

export default function SharedHosting() {
  const [livePlans, setLivePlans] = useState<typeof plans | null>(null);
  useEffect(() => {
    let alive = true;
    fetch('/api/public/product/shared-hosting')
      .then((r) => (r.ok ? r.json() : null))
      .then((p) => {
        if (alive && p?.plans?.length) setLivePlans(p.plans);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  const renderedPlans = livePlans && livePlans.length > 0 ? livePlans : plans;

  return (
    <main>
      <Header />

      {/* Schema.org for Pricing */}
      <ProductSchema
        name="Shared Hosting"
        url="https://qazi.host/shared-hosting"
        currency="PKR"
        plans={renderedPlans}
      />
      

      <section className="page-hero blur-in visible">
        <HeroParticles glowColor="rgba(16, 185, 129, 0.4)" />
        <div className="page-hero-content page-hero-content--split">
          <div className="hero-text">
            <h1 className="delay-1">Cheap Shared Hosting Plans</h1>
            <p className="delay-2">Welcome to QaziHost&apos;s 100% DMCA Ignored Shared Hosting! Our cheap shared hosting plans are perfect for newbies starting their online businesses. With affordable prices and easy-to-use features, our plans provide everything you need to get your website up and running quickly.</p>
          </div>
          <div className="hero-logo-side">
            <LicenseLogo type="shared" glowColor="rgba(16, 185, 129, 0.4)" />
          </div>
        </div>

      </section>

      <section className="pricing-section">
        <div className="container">

          {/* Pricing Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '64px' }}>
            {renderedPlans.map((plan, i) => (
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

                <div style={{ marginBottom: '4px' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 800, color: plan.popular ? '#60a5fa' : '#fff' }}>{plan.price}</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--muted)', marginLeft: '4px' }}>/month</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#f59e0b', marginBottom: '24px' }}>{plan.setup}</div>

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
            <style dangerouslySetInnerHTML={{
              __html: `
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

          {/* Notes */}
          <div className="warnings-container" style={{ marginBottom: '80px' }}>
            <div className="warning-box warning-info">
              <strong>Why Choose Qazi.Host Shared Hosting?</strong> NVMe SSD storage, free SSL certificates, cPanel control panel, one-click WordPress installer via Softaculous. Perfect for beginners, bloggers, and small businesses. With our 99.9% uptime guarantee and reliable customer support, you can trust that your website will be in good hands!
            </div>
            <div className="warning-box warning-info">
              <strong>Free Migration Service:</strong> Moving from another host? We offer free website migration with zero downtime. Our team handles everything including databases, emails, and DNS configuration.
            </div>
            <div className="warning-box warning-info">
              <strong>DMCA Ignored:</strong> All our shared hosting plans are 100% DMCA Ignored — your content, your rules. Perfect for content-rich websites and digital creators who need maximum freedom.
            </div>
            <div className="warning-box warning-danger">
              <strong>STRICTLY PROHIBITED:</strong> Spamming / Phishing / Bruteforce / Floods / Attacks / Scanning / Pornography / Open Proxy / Malware Distribution / Botnets / Terrorist activities / Crypto Mining is STRICTLY NOT allowed. If found involved in such activities, your services will be suspended immediately with NO refund.
            </div>
          </div>

          {/* FAQ */}
          <div style={{ marginTop: '80px' }}>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '56px' }}>Frequently Asked Questions</h2>
            <div>
              <div className="faq-item open">
                <div className="faq-q" style={{ cursor: 'default' }}>What is shared hosting?</div>
                <div className="faq-a" style={{ display: 'block' }}>Shared hosting is a type of web hosting where multiple websites share a single server&apos;s resources. It&apos;s the most affordable option, perfect for personal websites, blogs, and small businesses.</div>
              </div>
              <div className="faq-item open">
                <div className="faq-q" style={{ cursor: 'default' }}>Can I upgrade my plan later?</div>
                <div className="faq-a" style={{ display: 'block' }}>Yes, you can upgrade your shared hosting plan anytime by contacting us on WhatsApp. The upgrade is instant with zero downtime and we calculate the pro-rated difference.</div>
              </div>
              <div className="faq-item open">
                <div className="faq-q" style={{ cursor: 'default' }}>What does &quot;DMCA Ignored&quot; mean?</div>
                <div className="faq-a" style={{ display: 'block' }}>DMCA Ignored means we do not take your website down based on DMCA copyright complaints. Your content stays online with no interruptions or takedowns.</div>
              </div>
              <div className="faq-item open">
                <div className="faq-q" style={{ cursor: 'default' }}>Is WordPress pre-installed?</div>
                <div className="faq-a" style={{ display: 'block' }}>We offer one-click WordPress installation through Softaculous in cPanel. You can install WordPress, Joomla, Drupal, and 400+ other apps instantly at no extra cost.</div>
              </div>
              <div className="faq-item open">
                <div className="faq-q" style={{ cursor: 'default' }}>Do you provide free SSL?</div>
                <div className="faq-a" style={{ display: 'block' }}>Yes, all shared hosting plans include free Let&apos;s Encrypt SSL certificates that auto-renew. Your website will be secured with HTTPS at no extra cost.</div>
              </div>
              <div className="faq-item open">
                <div className="faq-q" style={{ cursor: 'default' }}>What payment methods do you accept?</div>
                <div className="faq-a" style={{ display: 'block' }}>We accept EasyPaisa, JazzCash, Bank Transfer (HBL, UBL, Meezan), SadaPay, NayaPay, and Cryptocurrency (USDT). Contact us on WhatsApp to place your order.</div>
              </div>
            </div>
          </div>

        </div>
      </section>


      <PremiumGuarantees />
      <RelatedBlogs productSlug="shared" title="Related Guides for Shared Hosting" />
      <Footer />
    </main>
  );
}


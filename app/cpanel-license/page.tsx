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
    name: 'cPanel License (VPS)',
    price: 'PKR 1,200.00',
    setup: 'PKR 100.00 Setup Fee',
    popular: false,
    orderLink: 'https://qazi.host/cart.php?a=add&pid=13',
    specs: [
      { label: 'cPanel Accounts', value: 'Unlimited' },
      { label: 'SitePad', value: 'Free' },
      { label: 'SSL Certificate', value: 'FleetSSL Free' },
      { label: 'Softaculous', value: 'Free' },
      { label: 'Support', value: 'Ticket/Live Chat' },
    ]
  },
  {
    name: 'cPanel License (Dedicated Server)',
    price: 'PKR 1,500.00',
    setup: 'PKR 100.00 Setup Fee',
    popular: true,
    orderLink: 'https://qazi.host/cart.php?a=add&pid=14',
    specs: [
      { label: 'cPanel Accounts', value: 'Unlimited' },
      { label: 'SitePad', value: 'Free' },
      { label: 'SSL Certificate', value: 'FleetSSL Free' },
      { label: 'Softaculous', value: 'Free' },
      { label: 'Support', value: 'Ticket/Live Chat' },
    ]
  },
];

export default function CpanelLicense() {
  return (
    <main>
      <Header />

      {/* Schema.org for Pricing */}
      <ProductSchema 
        name="cPanel/WHM License" 
        url="https://qazi.host/cpanel-license" 
        currency="PKR"
        plans={plans} 
      />
      

      <section className="page-hero blur-in visible">
        <HeroParticles glowColor="rgba(248, 87, 39, 0.4)" />
        <div className="page-hero-content page-hero-content--split">
          <div className="hero-text">
            <h1 className="delay-1">cPanel/WHM License</h1>
            <p className="delay-2">cPanel & WHM is the industry-standard web hosting control panel that provides a graphical interface and automation tools designed to simplify the process of hosting and managing websites.</p>
          </div>
          <div className="hero-logo-side">
            <LicenseLogo type="cpanel" glowColor="rgba(248, 87, 39, 0.4)" />
          </div>
        </div>

      </section>

      <SetupGuide type="cpanel" />

      <section className="pricing-section">
        <div className="container">

          {/* Pricing Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '64px', maxWidth: '800px', margin: '0 auto 64px' }}>
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
                  }}>Best Value</div>
                )}

                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>{plan.name}</h3>

                <div style={{ marginBottom: plan.setup ? '4px' : '24px' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: plan.popular ? '#60a5fa' : '#fff' }}>{plan.price}</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--muted)', marginLeft: '4px' }}>/month</span>
                </div>
                {plan.setup && <div style={{ fontSize: '0.8rem', color: '#f59e0b', marginBottom: '24px' }}>{plan.setup}</div>}

                <div style={{ flex: 1 }}>
                  {plan.specs.map((spec, j) => (
                    <div key={j} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      gap: '8px'
                    }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{spec.label}</span>
                      <span style={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: spec.value === 'Yes' || spec.value.includes('Free') ? '#60a5fa' : '#fff',
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
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '40px' }}>Included With Every License</h2>
            <div className="features-grid-custom" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '24px' 
            }}>
              {[
                { icon: <Lock size={32} />, label: 'FleetSSL Included' },
                { icon: <Zap size={32} />, label: 'Instant Activation' },
                { icon: <HardDrive size={32} />, label: 'Unlimited Accounts' },
                { icon: <ShieldCheck size={32} />, label: 'Standard Integration' },
                { icon: <Package size={32} />, label: 'Softaculous Apps' },
                { icon: <LayoutDashboard size={32} />, label: 'SitePad Builder' },
                { icon: <Globe size={32} />, label: 'Global Availability' },
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

          <div className="warnings-container" style={{ marginBottom: '80px' }}>
            <div className="warning-box warning-info">
              <strong>Why Choose Our Shared cPanel Licenses?</strong> Our shared licenses offer a 100% stable experience with the same features as original licenses but at a fraction of the cost. Perfect for resellers and server administrators looking to optimize their overhead.
            </div>
            <div className="warning-box warning-info">
              <strong>Hassle-Free IP Changes:</strong> Need to move your server? We offer free and unlimited IP changes for all our cPanel licenses. Simply reach out on WhatsApp and we&apos;ll update it in seconds.
            </div>
            <div className="warning-box warning-warning">
              <strong>Activation Note:</strong> All licenses are activated on your server IP instantly after the payment is confirmed. No complex commands or scripts needed — we handle everything through our licensing proxy.
            </div>
          </div>

          {/* FAQ Section */}
          <div style={{ marginTop: '80px' }}>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '56px' }}>Frequently Asked Questions</h2>
            <div>
              <div className="faq-item open">
                <div className="faq-q" style={{ cursor: 'default' }}>What is a shared cPanel license?</div>
                <div className="faq-a" style={{ display: 'block' }}>A shared license allows multiple users to utilize a licensing proxy, significantly reducing costs while maintaining all cPanel/WHM features and stability.</div>
              </div>
              <div className="faq-item open">
                <div className="faq-q" style={{ cursor: 'default' }}>Is it stable for production?</div>
                <div className="faq-a" style={{ display: 'block' }}>Yes, our licensing architecture is built for 100% uptime and stability. Thousands of servers globally use our system without issues.</div>
              </div>
              <div className="faq-item open">
                <div className="faq-q" style={{ cursor: 'default' }}>How many accounts can I create?</div>
                <div className="faq-a" style={{ display: 'block' }}>All our shared licenses include unlimited account creation, unlike the official cPanel tiers that limit accounts.</div>
              </div>
              <div className="faq-item open">
                <div className="faq-q" style={{ cursor: 'default' }}>Do I get official support?</div>
                <div className="faq-a" style={{ display: 'block' }}>While you won&apos;t get direct support from cPanel Inc., our expert technical team provides full support for your licensing and control panel issues during business hours.</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <PremiumGuarantees />

      <RelatedBlogs productSlug="cpanel" title="Related Guides for cPanel Licenses" />

      <Footer />
    </main>
  );
}

'use client';

import dynamic from 'next/dynamic';
import ProductSchema from '../components/ProductSchema';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingSkeleton from '../components/LoadingSkeleton';
import PriceDisplay from '../components/PriceDisplay';
import FloatingAd from '../components/FloatingAd';

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

export default function DedicatedServers() {
  const plans = [
    { 
      name: 'DEDI 1', 
      price: '€59', 
      pkr: 'PKR 18,200', 
      features: [
        'Dual E5-2620 v3', 
        '12 Cores / 24 Threads', 
        '64 GB DDR4 RAM', 
        '500 GB SSD Disk', 
        '100TB @ 1GBPS',
        'Netherlands Datacenter',
        'DMCA Ignored (Optional)',
        'Free Setup',
        'Mon-Fri Support'
      ] 
    },
    { 
      name: 'DEDI 2', 
      price: '€69', 
      pkr: 'PKR 21,300', 
      features: [
        'E5-2630 v3', 
        '16 Cores / 32 Threads', 
        '64 GB DDR4 RAM', 
        '500 GB SSD Disk', 
        '100TB @ 1GBPS',
        'Netherlands Datacenter',
        'DMCA Ignored (Optional)',
        'Free Setup',
        'Mon-Fri Support'
      ], 
      popular: true 
    },
    { 
      name: 'DEDI 3', 
      price: '€110', 
      pkr: 'PKR 33,900', 
      features: [
        'Gold 6150 CPU', 
        '18 Cores / 36 Threads', 
        '128 GB DDR4 RAM', 
        '1 TB NVMe SSD Disk', 
        'Unmetered @ 1GBPS',
        'Netherlands Datacenter',
        'DMCA Ignored (Optional)',
        'Free Setup',
        'Mon-Fri Support'
      ] 
    },
  ];

  return (
    <main>
      <Header />

      {/* Schema.org for Pricing */}
      <ProductSchema 
        name="Dedicated Servers" 
        url="https://qazi.host/dedicated-servers" 
        currency="EUR"
        plans={plans} 
      />
      

      <section className="page-hero blur-in visible">
        <HeroParticles glowColor="rgba(245, 158, 11, 0.4)" />
        <div className="page-hero-content page-hero-content--split">
          <div className="hero-text">
            <h1 className="delay-1">Dedicated Servers</h1>
            <p className="delay-2">Enterprise-grade bare metal servers with maximum performance, 100% DMCA Ignored, and unmetered bandwidth in Netherlands.</p>
          </div>
          <div className="hero-logo-side">
            <LicenseLogo type="dedicated" glowColor="rgba(245, 158, 11, 0.4)" />
          </div>
        </div>

      </section>

      <section className="pricing-section">
        <div className="container">
          <div className="pricing-grid">
            {plans.map((plan, i) => (
              <div key={i} className={`pricing-card hover-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-badge">Best Value</div>}
                <h3>{plan.name}</h3>
                <PriceDisplay usd={plan.price} pkr={plan.pkr} period="/month" />
                <ul className="pricing-features">{plan.features.map((f, j) => <li key={j}>{f}</li>)}</ul>
                <a href={`https://wa.me/923043126626?text=Hi%2C%20I%20want%20to%20order%20the%20Dedicated%20Server%20${plan.name}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', textAlign: 'center', display: 'block' }}>Order Now</a>
              </div>
            ))}
          </div>

          <div className="warnings-container" style={{ marginTop: '64px', marginBottom: '80px' }}>
            <div className="warning-box warning-info">
              <strong>DMCA Ignored Privacy:</strong> Our Netherlands-based servers provide a high level of privacy and are 100% DMCA ignored. We protect your content from automated takedown requests.
            </div>
            <div className="warning-box warning-info">
              <strong>Enterprise Hardware:</strong> AMD EPYC and Intel Xeon processors, DDR4 ECC RAM, and NVMe SSD storage in RAID configuration for maximum reliability.
            </div>
          </div>

          <div style={{ marginTop: '80px' }}>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '56px' }}>Frequently Asked Questions</h2>
            <div>
              <div className="faq-item open">
                <div className="faq-q" style={{ cursor: 'default' }}>Why choose Netherlands for dedicated servers?</div>
                <div className="faq-a" style={{ display: 'block' }}>The Netherlands is one of the world&apos;s best hosting hubs, offering exceptional global connectivity and a strong legal framework that supports content freedom.</div>
              </div>
              <div className="faq-item open">
                <div className="faq-q" style={{ cursor: 'default' }}>What is the average setup time?</div>
                <div className="faq-a" style={{ display: 'block' }}>Most dedicated servers are provisioned and delivered within 6 to 24 hours after payment confirmation.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PremiumGuarantees />
      <RelatedBlogs productSlug="dedicated" title="Related Guides for Dedicated Servers" />
      <FloatingAd 
        message="Get up to 40% discount on software licenses for your dedicated server!" 
        link="/licenses" 
      />
      <Footer />
    </main>
  );
}

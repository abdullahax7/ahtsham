import React from 'react';

export default function PremiumGuarantees() {
  const guarantees = [
    {
      icon: '⚡',
      title: 'Instant Delivery',
      desc: 'All software licenses and hosting services are activated within seconds of payment confirmation automatically.'
    },
    {
      icon: '🛡️',
      title: 'Enterprise Security',
      desc: 'Bank-grade encryption, automated DDoS protections, and advanced firewall setups keep your data fortress-locked.'
    },
    {
      icon: '👨‍💻',
      title: 'Expert Support',
      desc: 'Reach out on WhatsApp or Support Tickets anytime. Our specialized server engineers resolve issues in minutes.'
    },
    {
      icon: '💎',
      title: 'Lowest Price Guarantee',
      desc: 'We buy in massive bulk to offer you rates up to 40% cheaper than buying directly from the main vendors.'
    }
  ];

  return (
    <section className="premium-guarantees" style={{ marginTop: '100px', padding: '80px 48px', background: 'linear-gradient(135deg, #0f1117 0%, #151821 100%)', borderTop: '1px solid var(--border)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
            Why Choose Qazi.Host?
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Join thousands of resellers, developers, and businesses who trust us for maximum reliability and minimum overhead.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
          {guarantees.map((item, idx) => (
            <div key={idx} style={{ background: 'var(--surface)', padding: '32px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', transition: 'transform 0.3s ease' }} className="guarantee-card">
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(248,87,39,0.1)', border: '1px solid rgba(248,87,39,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: '24px' }}>
                {item.icon}
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>{item.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .guarantee-card:hover { transform: translateY(-8px); border-color: rgba(248,87,39,0.3) !important; box-shadow: 0 16px 48px rgba(0,0,0,0.4) !important; }
      `}} />
    </section>
  );
}

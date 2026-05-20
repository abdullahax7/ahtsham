'use client';

export default function WhatMakesUsSpecial() {
  const cards = [
    {
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>,
      title: '100% DMCA Friendly',
      description: 'We believe in protecting your content. Instead of instant suspensions, we work closely with you to resolve copyright issues. Your freedom and privacy are our top priorities.',
      className: 'bento-large',
      iconBg: 'rgba(248,87,39,0.15)',
      visual: <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
    },
    {
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
      title: 'Unbeatable Prices',
      description: 'Enterprise-grade hosting shouldn\'t break the bank. Get LiteSpeed power and NVMe speed at the most competitive rates in the market.',
      className: 'bento-small',
      iconBg: 'rgba(34,197,94,0.1)',
      visual: <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    },
    {
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
      title: 'Hardened Security',
      description: 'Your data is fortified with advanced firewalls, real-time malware scanning, and free daily automatic backups. We take security personally so you can focus on growth.',
      className: 'bento-medium',
      iconBg: 'rgba(59,130,246,0.1)',
      visual: <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
    },
    {
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
      title: 'Trusted by Thousands',
      description: 'Over 5,000+ happy clients rely on QaziHost. Our commitment to reliability and transparency has made us a leader in the hosting industry.',
      className: 'bento-small',
      iconBg: 'rgba(236,72,153,0.1)',
      visual: <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
    }
  ];

  return (
    <section className="special-section" id="special">
      <div className="container">
        <div className="section-head fade-up" style={{ textAlign: 'center' }}>
          <div className="section-label">Superior value</div>
          <h2 className="section-title">What Makes Us Special?</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>Beyond just hosting, we provide a foundation for your digital success with features that put you first.</p>
        </div>

        <div className="feature-showcase-grid">
          {cards.map((card, i) => (
            <div key={i} className={`feature-showcase-item fade-up ${i % 2 !== 0 ? 'reverse' : ''}`}>
              <div className="feature-showcase-content">
                <div className="feature-showcase-label">{card.title.split(' ')[0]} Priority</div>
                <h3 className="feature-showcase-title">{card.title}</h3>
                <p className="feature-showcase-desc">{card.description}</p>
                <div className="showcase-icon-wrap">
                  {card.icon}
                </div>
              </div>
              
              <div className="feature-showcase-visual">
                <div className="feature-showcase-icon-bg" style={{ background: card.iconBg }}></div>
                <div className="floating-deco">
                  <svg width="200" height="200" viewBox="0 0 240 240" fill="none" opacity="0.4">
                    <circle cx="120" cy="120" r="100" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="10 15" />
                    <circle cx="120" cy="120" r="70" stroke="var(--accent)" strokeWidth="0.3" />
                    <path d="M120 20 L120 40 M120 200 L120 220 M20 120 L40 120 M200 120 L220 120" stroke="var(--accent)" strokeWidth="1" />
                    <rect x="110" y="110" width="20" height="20" rx="4" fill="var(--accent)" opacity="0.2" />
                  </svg>
                </div>
                <div style={{ position: 'absolute', color: 'var(--accent)', filter: 'drop-shadow(0 0 20px var(--glow))' }}>
                  {/* Larger version of the icon for the visual side */}
                  {card.visual}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

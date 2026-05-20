'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSkeleton from './components/LoadingSkeleton';
// import { searchData } from './lib/searchData'; // Moved to dynamic lazy loading


// Lazy-loaded components
const TechStack = dynamic(() => import('./components/TechStack'), {
  loading: () => <LoadingSkeleton height="120px" />,
  ssr: false
});
const PriceDisplay = dynamic(() => import('./components/PriceDisplay'), {
  loading: () => <LoadingSkeleton height="600px" />,
  ssr: false
});
const RecentBlogs = dynamic(() => import('./components/RecentBlogs'), {
  loading: () => <LoadingSkeleton height="500px" />,
  ssr: false
});
const WhatMakesUsSpecial = dynamic(() => import('./components/WhatMakesUsSpecial'), {
  loading: () => <LoadingSkeleton height="700px" />,
  ssr: false
});
const Testimonials = dynamic(() => import('./components/Testimonials'), {
  loading: () => <LoadingSkeleton height="400px" />,
  ssr: false
});
const FAQ = dynamic(() => import('./components/FAQ'), {
  loading: () => <LoadingSkeleton height="500px" />,
  ssr: false
});
const Payments = dynamic(() => import('./components/Payments'), {
  loading: () => <LoadingSkeleton height="400px" />,
  ssr: false
});
const HeroParticles = dynamic(() => import('./components/HeroParticles'), {
  ssr: false
});


export default function Home() {
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const [countersStarted, setCountersStarted] = useState(false);
  const [counts, setCounts] = useState({ clients: 0, uptime: 0, support: 0, locations: 0 });
  const [targets, setTargets] = useState({ clients: 5000, uptime: 99.9, support: 100, locations: 6000 });
  const [siteCopy, setSiteCopy] = useState<Record<string, string>>({});
  const [query, setQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dynamicSearchData, setDynamicSearchData] = useState<any[]>([]);

  // Load dynamic homepage stats and copy from SQLite-backed API.
  useEffect(() => {
    let alive = true;
    fetch('/api/public/stats')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (alive && data) setTargets(data);
      })
      .catch(() => {});
    fetch('/api/public/site-settings')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (alive && data) setSiteCopy(data);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  // Lazy load search data when user interacts with search
  const loadSearchData = async () => {
    if (dynamicSearchData.length > 0) return;
    const { searchData } = await import('./lib/searchData');
    setDynamicSearchData(searchData);
  };

  const results = query.trim() === ''
    ? dynamicSearchData.filter(item => ['Shared Hosting', 'Reseller Hosting', 'VPS Hosting', 'Dedicated Servers', 'cPanel License', 'LiteSpeed License'].includes(item.title))
    : dynamicSearchData
      .map(item => {
        const q = query.toLowerCase();
        const title = item.title.toLowerCase();
        let score = 0;
        if (title === q) score = 100;
        else if (title.startsWith(q)) score = 80;
        else if (title.includes(q)) score = 60;
        else if (item.category.toLowerCase().includes(q)) score = 40;
        else if (item.description.toLowerCase().includes(q)) score = 20;
        return { ...item, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleResultSelect(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      setIsSearchOpen(false);
    }
  };

  const handleResultSelect = (item: any) => {
    if (item.isDirectOrder && item.whatsappMessage) {
      window.open(`https://wa.me/${siteCopy.whatsapp_number || '923043126626'}?text=${encodeURIComponent(item.whatsappMessage)}`, '_blank');
    } else {
      router.push(item.url);
    }
    setIsSearchOpen(false);
  };

  useEffect(() => {
    // Counter animation observer
    const counterObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !countersStarted) {
            setCountersStarted(true);
          }
        });
      },
      { threshold: 0.5 }
    );
    if (statsRef.current) counterObs.observe(statsRef.current);

    return () => {
      counterObs.disconnect();
    };
  }, [countersStarted]);

  // Counting animation effect
  useEffect(() => {
    if (!countersStarted) return;

    const duration = 2000;
    const startTime = performance.now();

    // Use interval for more consistent, lower-frequency updates to prevent layout thrashing
    const interval = setInterval(() => {
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts({
        clients: Math.floor(easeOut * targets.clients),
        uptime: Math.round(easeOut * targets.uptime * 10) / 10,
        support: Math.floor(easeOut * targets.support),
        locations: Math.floor(easeOut * targets.locations),
      });

      if (progress >= 1) clearInterval(interval);
    }, 50); // 20fps is plenty for counters and much better for performance

    return () => clearInterval(interval);
  }, [countersStarted, targets]);

  const orderNow = (product: string, price: string, sku: string) => {
    // Redirect to external website for checkout
    const message = `Hi, I want to order ${product} (${price}) - SKU: ${sku}`;
    window.open(`https://wa.me/${siteCopy.whatsapp_number || '923043126626'}?text=${encodeURIComponent(message)}`, '_blank');
  };






  return (
    <main>
      <div className="status-bar">
        <div className="status-bar-inner">
          <span className="status-dot"></span>
          <span>{siteCopy.status_bar_text || 'All Systems Operational'}</span>
          <span className="status-separator">|</span>
          <span className="status-uptime">{siteCopy.status_bar_uptime || 'Uptime: 99.9%'}</span>
          <span className="status-separator">|</span>
          <span className="status-servers">{siteCopy.status_bar_servers || '12 Servers Online'}</span>
        </div>
      </div>
      <Header />

      <section className="hero" id="home">
        <HeroParticles />
        <div className="hero-bg"></div>
        <div className="hero-grid"></div>
        <div className="hero-inner blur-in visible">
          <h1>
            {siteCopy.hero_title_pre || 'Get Super Fast,'} <br />
            <span className="grad hero-title-span">{siteCopy.hero_title_grad || 'DMCA Ignored Hosting'}</span> <br />
            {siteCopy.hero_title_post || 'at Cheap Prices'}
          </h1>
          <p className="delay-2">{siteCopy.hero_subtitle || "Welcome to QaziHost. Jump into super-fast hosting without emptying your bank wallet! Our Cheap DMCA Ignored Hosting isn't just about speed and prices, it's like having friendly superheroes ready to help with anything, anytime. No website problem is too tricky for our team. Get ready for a smooth ride with hosting that's easy on your wallet and support that's always there for you!"}</p>
          <div className="hero-search" ref={searchRef}>
            <div className="search-box">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>
              <input
                type="text"
                placeholder={siteCopy.search_placeholder || 'Search for hosting, servers, licenses...'}
                className="search-input"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsSearchOpen(true);
                  setSelectedIndex(0);
                  loadSearchData();
                }}
                onFocus={() => {
                  setIsSearchOpen(true);
                  loadSearchData();
                }}
                onKeyDown={handleSearchKeyDown}
              />
              <button
                className="search-btn"
                onClick={() => {
                  if (results.length > 0) {
                    handleResultSelect(results[selectedIndex]);
                  }
                }}
              >
                Search
              </button>
            </div>

            {isSearchOpen && (
              <div className="hero-search-dropdown-menu">
                {results.length > 0 ? (
                  <>
                    {query.trim() === '' && <div className="hero-search-suggestion-title">Popular Products</div>}
                    <ul className="hero-search-list">
                      {results.map((item, idx) => {
                        const getCategoryColor = (cat: string) => {
                          if (cat.includes('Plan')) return '#f59e0b'; // Amber for Plans
                          if (cat === 'Licenses') return '#3b82f6'; // Blue for Licenses
                          if (cat === 'Hosting' || cat === 'Servers') return '#10b981'; // Green for General
                          return 'var(--muted)'; // Gray for Pages
                        };
                        return (
                          <li
                            key={idx}
                            className={`hero-search-item ${idx === selectedIndex ? 'selected' : ''}`}
                            onClick={() => handleResultSelect(item)}
                            onMouseEnter={() => setSelectedIndex(idx)}
                          >
                            <div className="hs-cat" style={{ color: getCategoryColor(item.category) }}>{item.category}</div>
                            <div className="hs-title">{item.title}</div>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                ) : (
                  <div className="hero-search-empty">No results found.</div>
                )}
              </div>
            )}
          </div>
          <div className="hero-btns">
            <Link href="#featured" className="btn btn-primary">{siteCopy.hero_cta_label || 'View Featured Plans'}</Link>
          </div>
          <div className="hero-stats scale-up visible delay-4" ref={statsRef}>
            <div className="stat hover-card"><div className="stat-num">{counts.clients.toLocaleString()}+</div><div className="stat-label">Happy Clients</div></div>
            <div className="stat hover-card"><div className="stat-num">{counts.uptime}%</div><div className="stat-label">Uptime SLA</div></div>
            <div className="stat hover-card"><div className="stat-num">{counts.support}%</div><div className="stat-label">DMCA Ignored</div></div>
            <div className="stat hover-card"><div className="stat-num">{counts.locations.toLocaleString()}+</div><div className="stat-label">Active Licenses</div></div>
          </div>
        </div>
      </section>

      <section id="featured" className="featured-section alt-bg">
        <div className="container">
          <div className="section-head fade-up" style={{ textAlign: 'center' }}>
            <div className="section-label">{siteCopy.featured_section_label || 'DMCA Ignored'}</div>
            <h2 className="section-title">{siteCopy.featured_section_title || 'DMCA Ignored Hostings & Cheap Shared Licenses'}</h2>
            <p className="section-sub" style={{ margin: '0 auto', maxWidth: '800px' }}>
              {siteCopy.featured_section_desc || "Welcome to our rebel's corner – DMCA Ignored Shared Hosting! No copyright drama here, just a space where your website can kick back, relax, and do its thing. Perfect for newbies or those rocking a single page sites with less traffic. Your content, your rules. Now let's talk about our DMCA Ignored Reseller Hosting plan – your content's safe heaven with no copyright headaches! Ideal for content-rich sites with lots of traffic, because here, your website rules the internet kingdom worry-free."}
            </p>
          </div>

          <div className="pricing-grid">
            <div className="pricing-card hover-card fade-up delay-1">
              <div className="card-tag tag-selling">{siteCopy.shared_card_tag || 'Most Selling'}</div>
              <h3>{siteCopy.shared_card_title || 'Shared Hosting'}</h3>
              <div className="pricing-starting">Starting from</div>
              <PriceDisplay usd="$1.99" pkr="499 PKR" />
              <p className="card-desc">{siteCopy.shared_card_desc || 'Perfect for personal websites, blogs, and small businesses. NVMe SSD, free SSL, and cPanel included.'}</p>
              <ul className="pricing-features">
                <li>Up to Unlimited Websites</li>
                <li>NVMe SSD Storage</li>
                <li>Free SSL Certificate</li>
                <li>cPanel Control Panel</li>
                <li>Support: Mon-Fri: 12PM-12AM PST (8PM-8AM UTC)</li>
              </ul>
              <Link href="/shared-hosting" className="btn btn-primary" style={{ width: '100%' }}>View Shared Hosting Plans</Link>
            </div>

            <div className="pricing-card hover-card fade-up delay-2">
              <div className="card-tag tag-offer">{siteCopy.reseller_card_tag || 'Best Offer'}</div>
              <h3>{siteCopy.reseller_card_title || 'Reseller Hosting'}</h3>
              <div className="pricing-starting">Starting from</div>
              <PriceDisplay usd="$9.99" pkr="999 PKR" />
              <p className="card-desc">{siteCopy.reseller_card_desc || 'Start your own hosting business with WHM/cPanel, free WHMCS, and white-label branding.'}</p>
              <ul className="pricing-features">
                <li>Free WHMCS License</li>
                <li>WHM/cPanel Access</li>
                <li>White-Label Branding</li>
                <li>Unlimited Bandwidth</li>
                <li>Priority Support</li>
              </ul>
              <Link href="/reseller-hosting" className="btn btn-primary" style={{ width: '100%' }}>View Reseller Hosting Plans</Link>
            </div>

            <div className="pricing-card hover-card fade-up delay-3">
              <div className="card-tag tag-new">{siteCopy.licenses_card_tag || 'Instant Activation'}</div>
              <h3>{siteCopy.licenses_card_title || 'Licenses'}</h3>
              <div className="pricing-starting">Starting from</div>
              <PriceDisplay usd="$8" pkr="PKR 350" />
              <p className="card-desc">{siteCopy.licenses_card_desc || 'cPanel, Plesk, LiteSpeed, and CloudLinux licenses at up to 40% off direct pricing.'}</p>
              <ul className="pricing-features">
                <li>cPanel/WHM from $12/mo</li>
                <li>LiteSpeed from $8/mo</li>
                <li>Plesk from $10/mo</li>
                <li>CloudLinux from $12/mo</li>
                <li>Instant Activation</li>
              </ul>
              <Link href="/licenses" className="btn btn-primary" style={{ width: '100%' }}>View All Software Licenses</Link>
            </div>
          </div>

          <div className="view-all-bar fade-up">
            <Link href="/licenses" className="btn btn-outline">View All Licenses</Link>
          </div>
        </div>
      </section>



      <section className="dmca-section">
        <div className="container">
          <div className="section-head fade-up" style={{ textAlign: 'center' }}>
            <div className="section-label">{siteCopy.dedicated_section_label || 'Enterprise Solutions'}</div>
            <h2 className="section-title">{siteCopy.dedicated_section_title || '100% DMCA Ignored Dedicated Servers'}</h2>
          </div>

          <div className="dedicated-ad-banner fade-up">
            <div className="dedicated-ad-content">
              <p className="dedicated-ad-text">
                {siteCopy.dedicated_section_desc || "QaziHost's 100% DMCA Ignored Dedicated Servers with Unbeatable Discounts on Server Licenses! Experience high-performance servers at remarkably affordable prices. Unlock the full potential of your hosting with our robust servers, and take advantage of exclusive discounts on server licenses for a cost-effective solution tailored to your needs."}
              </p>
              <div className="dedicated-ad-btns">
                <Link href="/dedicated-servers" className="btn btn-primary" style={{ padding: '14px 32px' }}>Explore Dedicated Servers →</Link>
                <a href={`https://wa.me/${siteCopy.whatsapp_number || '923043126626'}?text=${encodeURIComponent('Hi, I need a custom dedicated server')}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '14px 32px' }}>Custom Quote</a>
              </div>
            </div>
            <div className="dedicated-ad-visual">
              <div className="dedicated-visual-orb"></div>
              <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))' }}>
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
              </svg>
            </div>
          </div>

          <div className="view-all-bar fade-up">
            <Link href="/dedicated-servers" className="btn btn-outline">View All Servers</Link>
            <Link href="/licenses" className="btn btn-outline" style={{ marginLeft: '12px' }}>Discounted Licenses</Link>
          </div>

          <div className="warnings-container fade-up">
            <div className="warning-box warning-info">
              <span dangerouslySetInnerHTML={{ __html: siteCopy.custom_packages_text || `<strong>Custom Packages:</strong> Need a custom server configuration? Contact us at <a href="https://wa.me/${siteCopy.whatsapp_number || '923043126626'}?text=Hi%2C%20I%20need%20a%20custom%20package" target="_blank" rel="noopener noreferrer" style="color: var(--green); text-decoration: underline; font-weight: 600;">WhatsApp</a> and we will create it for you at reasonable prices.` }} />
            </div>
            <div className="warning-box warning-danger">
              <span dangerouslySetInnerHTML={{ __html: siteCopy.prohibited_text || '<strong>STRICTLY PROHIBITED:</strong> Spamming / Phishing / Bruteforce / Floods / Attacks / Scanning / Pornography / Open Proxy / Malware Distribution / Botnets / Terrorist activities / Crypto Mining is STRICTLY NOT allowed. If found involved in such activities, your services will be suspended immediately with NO refund.' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="ceo-promise-section">
        <div className="container">
          <div className="hover-card fade-up ceo-card">
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at top right, rgba(34,211,238,0.05) 0%, rgba(0,0,0,0) 60%)', zIndex: 0, pointerEvents: 'none' }}></div>

            <div className="ceo-card-image-wrapper">
              <div className="ceo-card-image-box" style={{ width: '240px', height: '350px', borderRadius: '24px', background: 'linear-gradient(135deg, rgba(34,211,238,0.2), rgba(34,211,238,0.05))', border: '1px solid rgba(34,211,238,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 10px 30px rgba(34,211,238,0.2)' }}>
                <img src={siteCopy.ceo_photo || 'https://lh3.googleusercontent.com/p/AF1QipMD0XNvQEk75V9wTQ6hjeqpPIR9xLtr07dtDfo-=w243-h304-n-k-no-nu'} alt="CEO QaziHost" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

            <div className="ceo-card-content">
              <div className="section-label" style={{ marginBottom: '16px', }}>{siteCopy.ceo_promise_label || 'Commitment to Privacy'}</div>
              <h2 className="ceo-card-title">{siteCopy.ceo_promise_title || "CEO's Promise"}</h2>
              <p className="ceo-card-description">
                {siteCopy.ceo_promise_text || "At QaziHost, your privacy means everything to us, your data is 100% safe here. We don't peek, sell, or share your sensitive info with anyone. Our team works on strict, minimal access, only what's absolutely necessary, nothing more. Your privacy stays locked deep in the CEO's mind, and it's never going anywhere. Thanks for trusting us and helping make QaziHost the #1 DMCA Ignored hosting company in Pakistan. You focus on growing your sites, we'll handle the privacy & security part."}
              </p>

              <div className="ceo-social-links">
                <a href={`https://wa.me/${siteCopy.whatsapp_number || '923043126626'}`} target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', transition: 'transform 0.3s ease', margin: '3px' }} title="03043126626">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </a>
                <a href="https://facebook.com/qazi.host" target="_blank" rel="noopener noreferrer" style={{ color: '#1877F2', transition: 'transform 0.3s ease', margin: '3px' }} title="@qazi.host">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="https://instagram.com/qazi.host" target="_blank" rel="noopener noreferrer" style={{ color: '#E4405F', transition: 'transform 0.3s ease', margin: '3px' }} title="@qazi.host">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how">
        <div className="container">
          <div className="section-head fade-up" style={{ textAlign: 'center', margin: '0 auto 56px', maxWidth: '600px' }}>
            <div className="section-label">{siteCopy.process_section_label || 'Simple Process'}</div>
            <h2 className="section-title">{siteCopy.process_section_title || 'Get Started in Minutes'}</h2>
            <p className="section-sub" style={{ maxWidth: '100%' }}>{siteCopy.process_section_desc || 'No complicated forms. Browse our plans, choose what you need, and complete your order via WhatsApp.'}</p>
          </div>
          <div className="process">
            <div className="step hover-card fade-up delay-1">
              <div className="step-num">1</div><h3>Browse Plans</h3><p>Explore our hosting, servers, and license offerings to find the perfect fit.</p>
            </div>
            <div className="step hover-card fade-up delay-2">
              <div className="step-num">2</div><h3>Choose Plan</h3><p>Select from our featured products or browse all hosting, servers, and licenses.</p>
            </div>
            <div className="step hover-card fade-up delay-3">
              <div className="step-num">3</div><h3>Secure Checkout</h3><p>Review your order and confirm via WhatsApp for instant activation.</p>
            </div>
            <div className="step hover-card fade-up delay-4">
              <div className="step-num">4</div><h3>Go Live</h3><p>We provision your service immediately. Average setup time: under 1 hour.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech Stack Infinite Slider ── */}
      <section className="tech-slider-section">
        <div className="container" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="section-label">{siteCopy.tech_section_label || 'Powered By'}</div>
          <h2 className="section-title">{siteCopy.tech_section_title || 'Technologies We Support'}</h2>
        </div>
        <div className="tech-slider-wrapper">
          <div className="tech-slider-track">
            {[...Array(2)].map((_, setIndex) => (
              <div className="tech-slider-set" key={setIndex} aria-hidden={setIndex === 1}>
                <TechStack />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Webxoo Partner Promo */}
      <section className="promo-section" style={{ padding: '80px 0', background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="hover-card fade-up webxoo-promo-card" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderRadius: '24px',
            padding: '56px 64px',
            gap: '48px',
            flexWrap: 'wrap',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '50%', background: 'radial-gradient(ellipse at right, rgba(34,211,238,0.08) 0%, rgba(0,0,0,0) 70%)', zIndex: 0, pointerEvents: 'none' }}></div>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}></div>

            <div className="webxoo-promo-content" style={{ flex: '1', zIndex: 1, minWidth: '320px', }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5"><polygon points="12 2 22 8 22 16 12 22 2 16 2 8 12 2"></polygon></svg>
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase' }}>Official Design Partner</div>
              </div>

              <h2 style={{ fontSize: '2.8rem', fontWeight: 700, marginBottom: '20px', lineHeight: 1.15, color: '#fff' }}>
                Need a website that <span style={{ background: 'linear-gradient(90deg, #fff, #67e8f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>actually converts?</span>
              </h2>

              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '32px', maxWidth: '500px' }}>
                Get a stunning, high-performance website built with Next.js. Fast, modern, and fully SEO-optimized by our premium development partner.
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                <Link href="/webxoo" className="btn btn-primary" style={{ padding: '14px 32px', borderRadius: '8px', fontSize: '1.05rem', fontWeight: 600 }}>Start Your Project →</Link>
              </div>
            </div>

            <div className="webxoo-promo-logo-wrapper scale-up delay-2" style={{ flex: '0 0 auto', zIndex: 1, position: 'relative' }}>
              <div style={{ padding: '32px', borderRadius: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5), 0 10px 40px rgba(0,0,0,0.2)' }}>
                <img src="https://www.webxoo.com/webxoo.webp" alt="Webxoo Agency" className="webxoo-logo-homepage" style={{ height: '60px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 20px rgba(34,211,238,0.2))' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 768px) {
          .webxoo-logo-homepage {
            height: 40px !important;
          }
          .webxoo-promo-card {
            padding: 40px 24px !important;
            text-align: center;
            justify-content: center !important;
          }
          .webxoo-promo-content {
            min-width: 100% !important;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .webxoo-promo-content h2 {
            font-size: 2rem !important;
          }
          .webxoo-promo-content p {
            max-width: 100% !important;
          }
          .webxoo-promo-logo-wrapper {
            width: 100%;
            display: flex;
            justify-content: center;
          }
        }
      `}</style>





      <WhatMakesUsSpecial />
      <RecentBlogs />
      <Testimonials />
      <FAQ />
      <Payments />

      <section style={{ padding: '40px 48px 100px' }}>
        <div className="container">
          <div className="cta-band fade-up">
            <div className="cta-grid" aria-hidden="true"></div>
            <div className="cta-star cta-star-1" aria-hidden="true"></div>
            <div className="cta-star cta-star-2" aria-hidden="true"></div>
            <div className="cta-star cta-star-3" aria-hidden="true"></div>
            <div className="cta-star cta-star-4" aria-hidden="true"></div>
            <div className="cta-star cta-star-5" aria-hidden="true"></div>
            <div className="cta-star cta-star-6" aria-hidden="true"></div>
            <div className="cta-deco cta-deco-left" aria-hidden="true">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none"><circle cx="60" cy="60" r="50" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" strokeDasharray="8 6" /><circle cx="60" cy="60" r="30" stroke="rgba(59,130,246,0.2)" strokeWidth="1" /><circle cx="60" cy="60" r="8" fill="rgba(248,87,39,0.2)" /></svg>
            </div>
            <div className="cta-deco cta-deco-right" aria-hidden="true">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none"><rect x="10" y="10" width="80" height="80" rx="16" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" strokeDasharray="6 4" transform="rotate(15 50 50)" /><rect x="30" y="30" width="40" height="40" rx="8" stroke="rgba(248,87,39,0.2)" strokeWidth="1" /></svg>
            </div>
            <h2>{siteCopy.final_cta_title || 'Ready to Launch?'}</h2>
            <p>{siteCopy.final_cta_subtitle || 'Join 5,000+ professionals who trust Qazi.Host for their infrastructure needs.'}</p>
            <div className="cta-btns">
              <a href={`https://wa.me/${siteCopy.whatsapp_number || '923043126626'}?text=${encodeURIComponent(siteCopy.whatsapp_default_message || "Hi Qazi.Host, I'm interested in your services and have some questions.")}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }}>{siteCopy.final_cta_primary_label || 'Get Started'}</a>
              <a href={`https://wa.me/${siteCopy.whatsapp_number || '923043126626'}?text=${encodeURIComponent(siteCopy.whatsapp_default_message || "Hi Qazi.Host, I'm interested in your services and have some questions.")}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '14px 32px', fontSize: '1rem' }}>{siteCopy.final_cta_secondary_label || 'Chat on WhatsApp'}</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

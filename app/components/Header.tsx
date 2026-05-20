'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const DEFAULT_LOGO_URL = "https://ezmdqfujhwjlnhnncyes.supabase.co/storage/v1/object/sign/logos/logo.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lNTBiOTNmYy05NTkxLTQ1NjMtYjAzYy1jOTRmMzYwZjBlY2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvcy9sb2dvLndlYnAiLCJpYXQiOjE3NzQ4ODk4MzcsImV4cCI6NDkyODQ4OTgzN30.4pZItOynf6zIbZSyooOBCpBjzJSrPznB522kz5Rb-n0";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [statusColor, setStatusColor] = useState('#22c55e');
  const [statusBoxShadow, setStatusBoxShadow] = useState('0 0 6px rgba(34,197,94,0.7)');
  const [logoUrl, setLogoUrl] = useState(DEFAULT_LOGO_URL);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    async function fetchStatus() {
      try {
        const res = await fetch('/api/public/settings');
        if (!res.ok) return;
        const data = await res.json();
        if (data?.dashboard_note) {
          const upperNote = (data.dashboard_note as string).toUpperCase();
          if (upperNote.includes('[RED]')) {
            setStatusColor('#ef4444');
            setStatusBoxShadow('0 0 6px rgba(239,68,68,0.7)');
          } else if (upperNote.includes('[YELLOW]')) {
            setStatusColor('#f59e0b');
            setStatusBoxShadow('0 0 6px rgba(245,158,11,0.7)');
          } else {
            setStatusColor('#22c55e');
            setStatusBoxShadow('0 0 6px rgba(34,197,94,0.7)');
          }
        }
      } catch {}
    }
    fetchStatus();

    fetch('/api/public/site-settings')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.logo_url) setLogoUrl(data.logo_url);
      })
      .catch(() => {});

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileOpen(false);

  return (
    <header>
      <nav className={`${scrolled ? 'scrolled' : ''} ${mobileOpen ? 'mobile-open' : ''}`} style={{ top: 0 }}>
        <Link href="/" className="logo" onClick={closeMenu}>
          <Image src={logoUrl} alt="Qazi.Host Logo" width={180} height={40} priority unoptimized />
        </Link>
        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle Menu">
          {mobileOpen ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        <div className="nav-content">
          <ul className="nav-links">
            <li className="has-dropdown">
              <span className="dropdown-toggle">Hosting</span>
              <ul className="dropdown">
                <li><Link href="/shared-hosting" onClick={closeMenu}><span className="dd-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg></span> Shared Hosting</Link></li>
                <li><Link href="/reseller-hosting" onClick={closeMenu}><span className="dd-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg></span> Reseller Hosting</Link></li>
              </ul>
            </li>
            <li className="has-dropdown">
              <Link href="#" onClick={(e) => e.preventDefault()}>Servers</Link>
              <ul className="dropdown">
                <li><Link href="/vps" onClick={closeMenu}><span className="dd-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg></span> VPS</Link></li>
                <li><Link href="/dedicated-servers" onClick={closeMenu}><span className="dd-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg></span> Dedicated Servers </Link></li>
              </ul>
            </li>
            <li className="has-dropdown">
              <Link href="/licenses" onClick={closeMenu}>Licenses</Link>
              <ul className="dropdown dropdown-2col">
                <li style={{ gridColumn: '1 / -1' }}>
                  <Link href="/licenses/bundles" onClick={closeMenu} style={{ background: 'rgba(248,87,39,0.08)', border: '1px solid rgba(248,87,39,0.25)', borderRadius: '10px' }}>
                    <span className="dd-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                    </span>
                    <span style={{ color: '#f85727', fontWeight: 700 }}>Bundle Deals</span>
                    <span style={{ marginLeft: 'auto', background: 'rgba(248,87,39,0.15)', color: '#f85727', fontSize: '0.65rem', fontWeight: 700, padding: '2px 7px', borderRadius: '10px', letterSpacing: '0.04em' }}>SAVE 22%</span>
                  </Link>
                </li>
                <li><Link href="/cpanel-license" onClick={closeMenu}><span className="dd-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></span> cPanel</Link></li>
                <li><Link href="/litespeed-license" onClick={closeMenu}><span className="dd-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg></span> LiteSpeed</Link></li>
                <li><Link href="/plesk-license" onClick={closeMenu}><span className="dd-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg></span> Plesk</Link></li>
                <li><Link href="/cloudlinux-license" onClick={closeMenu}><span className="dd-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span> CloudLinux</Link></li>
                <li><Link href="/virtualizor" onClick={closeMenu}><span className="dd-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg></span> Virtualizor</Link></li>
                <li><Link href="/directadmin" onClick={closeMenu}><span className="dd-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg></span> DirectAdmin</Link></li>
                <li><Link href="/jetbackup" onClick={closeMenu}><span className="dd-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg></span> JetBackup</Link></li>
                <li><Link href="/softaculous" onClick={closeMenu}><span className="dd-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg></span> Softaculous</Link></li>
                <li><Link href="/sitepad" onClick={closeMenu}><span className="dd-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg></span> SitePad</Link></li>
                <li><Link href="/whmsonic" onClick={closeMenu}><span className="dd-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"></circle><path d="M16 12a4 4 0 0 1-8 0"></path><path d="M20 12a8 8 0 0 1-16 0"></path></svg></span> WHMSonic</Link></li>
                <li><Link href="/whmreseller" onClick={closeMenu}><span className="dd-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.53-11.85l5.67 5.67"></path></svg></span> WHMReseller</Link></li>
                <li><Link href="/dareseller" onClick={closeMenu}><span className="dd-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></span> DAReseller</Link></li>
                <li><Link href="/imunify360" onClick={closeMenu}><span className="dd-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span> Imunify360</Link></li>
                <li><Link href="/cpguard" onClick={closeMenu}><span className="dd-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span> CPGuard</Link></li>
                <li><Link href="/osm" onClick={closeMenu}><span className="dd-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg></span> OSM</Link></li>
              </ul>
            </li>

            <li><Link href="/blog" onClick={closeMenu}>Blog</Link></li>
            <li>
              <Link href="/status" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: statusColor, boxShadow: statusBoxShadow, flexShrink: 0 }}></span>
                Status
              </Link>
            </li>
            <li><Link href="/contact" onClick={closeMenu}>Contact</Link></li>
          </ul>

          <div className="nav-cta">
            <a href="https://qazi.host/login" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Sign In</a>
            <a href="https://qazi.host/register.php" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Sign Up</a>
          </div>
        </div>
      </nav>
    </header>
  );
}

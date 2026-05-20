'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroParticles from '../components/HeroParticles';
import { 
  ShieldCheck, 
  Zap, 
  Lock, 
  HelpCircle, 
  AlertCircle, 
  Database, 
  RefreshCcw, 
  Server, 
  FileText,
  BadgeCheck,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const sections = [
  { id: 'hosting', title: 'Hosting Terms', icon: <Server size={20} /> },
  { id: 'support', title: 'Support & Uptime', icon: <HelpCircle size={20} /> },
  { id: 'content', title: 'Content Responsibility', icon: <ShieldCheck size={20} /> },
  { id: 'prohibited', title: 'Prohibited Content', icon: <XCircle size={20} /> },
  { id: 'resources', title: 'Resource Policy', icon: <Database size={20} /> },
  { id: 'licenses', title: 'License Terms', icon: <BadgeCheck size={20} /> },
];

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState('hosting');

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <main style={{ background: '#020617', color: '#f8fafc' }}>
      <Header />

      {/* --- Standard Page Hero --- */}
      <section className="page-hero">
        <HeroParticles glowColor="rgba(59, 130, 246, 0.4)" />
        <div className="page-hero-content">
          <h1 style={{ marginBottom: '24px' }}>Terms & Conditions</h1>
          <p style={{ 
            fontSize: '1.2rem', 
            lineHeight: 1.6, 
            maxWidth: '1000px', 
            margin: '0 auto', 
            fontWeight: 500,
            color: '#e2e8f0'
          }}>
            At QaziHost, we take our terms and conditions very seriously and want our clients to do the same. When you agree to our terms and conditions, you enter into a legal agreement with our company. This agreement outlines the rules and guidelines you must follow when using our services. It&apos;s important to read and understand these terms and conditions, as failure to abide by them could result in account suspension or other penalties.
          </p>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span style={{ opacity: 0.6 }}>Last Updated:</span>
            <span style={{ color: '#fff', fontWeight: 600, padding: '4px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>January 1, 2024</span>
          </div>
        </div>
      </section>

      {/* --- Main Content Section --- */}
      <section style={{ padding: '80px 0 140px' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            gap: '80px', 
            position: 'relative',
            alignItems: 'start'
          }} className="policy-layout">
            
            {/* Sidebar Navigation */}
            <aside style={{ 
              position: 'sticky', 
              top: '120px', 
              height: 'fit-content',
              zIndex: 50,
              flexShrink: 0,
              width: '280px'
            }} className="policy-sidebar">
              <div style={{ 
                background: '#0f172a', 
                border: '1px solid rgba(255,255,255,0.15)', 
                borderRadius: '24px', 
                padding: '32px 20px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                display: 'block'
              }}>
                <div style={{ 
                  fontSize: '0.7rem', 
                  fontWeight: 900, 
                  textTransform: 'uppercase', 
                  color: '#64748b', 
                  letterSpacing: '0.2em', 
                  marginBottom: '24px', 
                  display: 'block',
                  textAlign: 'center',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  paddingBottom: '16px'
                }}>On this page</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {sections.map((s) => (
                    <button 
                      key={s.id}
                      onClick={() => scrollTo(s.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '14px 16px',
                        borderRadius: '12px',
                        background: activeSection === s.id ? 'rgba(59,130,246,0.1)' : 'transparent',
                        color: activeSection === s.id ? '#3b82f6' : '#94a3b8',
                        border: activeSection === s.id ? '1px solid rgba(59,130,246,0.2)' : '1px solid transparent',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: activeSection === s.id ? 700 : 500,
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        width: '100%',
                        position: 'relative'
                      }}
                    >
                      <span style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: activeSection === s.id ? 1 : 0.6,
                        minWidth: '24px'
                      }}>{s.icon}</span>
                      <span style={{ flex: 1 }}>{s.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Content Area */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', minWidth: 0 }}>

              {/* Hosting Terms - Section 1 */}
              <div id="hosting" style={{ scrollMarginTop: '120px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(59,130,246,0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Server size={24}/></div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Things To Keep In Mind Before Placing An Order!</h2>
                </div>
                <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', lineHeight: 1.8 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                      'To cancel or downgrade a service, you must submit a request at least 7 days before the due date.',
                      'We Can\'t provide support for custom CMS or Scripts. You have to contact with your developer for this.',
                      'We strive to provide 99.99% uptime. However, if downtime occurs due to a data center issue beyond our control, we can only wait for their updates. In such cases, refunds will not be provided.',
                      'We do not host websites that create high server loads due to theme or plugin issues, such as themes that fetch content from other sites. These can strain server resources due to scrapers, and such websites will be suspended. In particular, modded versions of the Dooplay theme are strictly prohibited.',
                      'If we receive a legal court notice from the data center to take down a website, we will remove it. Even if you have a dedicated server, you must remove the website within the given time. Otherwise, your service will be suspended without a refund.',
                      'You can not host files for downloading like APK, XAPK, ZIP, TAR.GZ on hosting servers.'
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                        <CheckCircle2 size={18} style={{ color: '#3b82f6', marginTop: '4px', flexShrink: 0 }} />
                        <span style={{ color: '#cbd5e1' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Support & Uptime - Section 2 */}
              <div id="support" style={{ scrollMarginTop: '120px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(16,185,129,0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RefreshCcw size={24}/></div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Support & Uptime</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                   <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#fff' }}>What Type of Support the QaziHost Offers?</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7 }}>At QaziHost, we offer comprehensive support to our customers that sets us apart from other hosting providers in the industry. Unlike other companies that only provide support for issues related to server-side problems, we offer dedicated support for each website hosted on our server. If you&apos;re facing any issues with your website, our support team will assist you in resolving the problem without any additional charges.</p>
                  </div>
                  <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#fff' }}>Does QaziHost provide a guarantee of uptime for its web hosting services?</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7 }}>Yes, QaziHost provides a guarantee of uptime for its web hosting services. However, it is important to note that there may be instances where the server experiences downtime due to factors beyond our control, such as issues with the parent company&apos;s servers or during scheduled maintenance durations. In such cases, we work diligently to restore service as quickly as possible and keep our customers informed throughout the process.</p>
                  </div>
                  <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#fff' }}>Does QaziHost provide technical support for its web hosting services?</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7 }}>Yes, QaziHost provides technical support for its web hosting services through its support ticket system, live chat & WhatsApp.</p>
                  </div>
                </div>
              </div>

              {/* Responsibility - Section 3 */}
              <div id="content" style={{ scrollMarginTop: '120px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(248,87,39,0.1)', color: '#f85727', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShieldCheck size={24}/></div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Content Responsibility</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ padding: '40px', background: 'rgba(15,23,42,0.4)', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)', lineHeight: 1.8 }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#fff' }}>Who is responsible for the content hosted on QaziHost&apos;s web hosting servers?</h3>
                    <p style={{ color: '#cbd5e1' }}>If you use QaziHost&apos;s web hosting services, it&apos;s crucial to know that you&apos;re in charge of whatever you put on your website. QaziHost isn&apos;t responsible for how accurate, legal, or appropriate your content is.</p>
                    <p style={{ color: '#cbd5e1', marginTop: '16px' }}>If your website has malware or phishing scripts, or if hackers upload content due to weak security or passwords, it&apos;s your responsibility. Make sure to regularly scan your content. If you notice anything suspicious, like changes in behavior or unknown files, contact us right away before data centers detect it. Once we&apos;re informed, we won&apos;t allow hosting for that website until it&apos;s cleaned. After cleaning, you can host the site again.</p>
                  </div>
                  <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#fff' }}>Is QaziHost Provides DMCA-Ignored Hosting?</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7 }}>Yes we provide 100% DMCA Ignored services. But in very rare cases we have to change IPs of your domains. You will get prior notice when we have to take any step to provide you best service. Rest assured your data will always be protected with us. Please keep in mind we are DMCA Ignored hosting provider, but we will take very strict action again serious activities which badly effect on our server&apos;s performance and securities. It includes, but not limited to Spamming / Phishing / Bruteforce / Floods / Attacks / Scanning / Pornography / Open Proxy / Malware Distribution / Botnets / Terrorist activities / Crypto Mining.</p>
                  </div>
                  <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#fff' }}>Can customers transfer their web hosting account to another provider?</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7 }}>Yes, customers can transfer their web hosting account to another provider, but they must comply with QaziHost&apos;s terms and conditions and ensure that they have backups of their web hosting content.</p>
                  </div>
                </div>
              </div>

              {/* Prohibited Content - Section 4 */}
              <div id="prohibited" style={{ scrollMarginTop: '120px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><XCircle size={24}/></div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Strictly Prohibited Content</h2>
                </div>
                <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', lineHeight: 1.8 }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#fff' }}>Which type of content is strictly prohibited at QaziHost?</h3>
                  <p style={{ color: '#cbd5e1', marginBottom: '16px' }}>Certain material is unacceptable and not allowed for all websites hosted with QaziHost, including but not limited to the following:</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                    {[
                      'Spamming / Phishing / Floods / Attacks / Scanning / Pornography / Open Proxy / Malware Distribution / Botnets / Terrorist activities / Crypto Mining',
                      'Data scrapper content ( Use of RSS Feed to scrap content)',
                      'Anonymous or Bulk SMS Gateways',
                      'AutoSurf/PTC/PTS/PPC sites',
                      'Bank Debentures/Bank Debenture Trading Programs',
                      'Broadcast or Streaming of Live Sporting Events (UFC, NASCAR, FIFA, NFL, MLB, NBA, WWE, WWF, etc.)',
                      'Brute force Programs/Scripts/Applications',
                      'Cryptocurrency Miners',
                      'Escrow/Bank Debentures',
                      'File Dump/Mirror Scripts (similar to RapidShare)',
                      'Forums or websites that distribute or link to warez/pirated/illegal content',
                      'Fraudulent Sites (Including but not limited to sites listed at aa419.org & escrow-fraud.com)',
                      'Hacker focused sites/archives/programs.',
                      'High-Yield Interest Programs (HYIP) or Related Sites',
                      'Image Hosting Scripts (similar to Photobucket or Tinypic)',
                      'Investment Sites (FOREX, E-Gold Exchange, Second Line/Linden Exchange, Ponzi, MLM/Pyramid Scheme)',
                      'IP Scanners',
                      'IRC Scripts/Bots',
                      'IRCD (IRC servers)'
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <XCircle size={16} style={{ color: '#ef4444', marginTop: '4px', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px' }}>
                      <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '8px' }}>Are customers allowed to install custom software or applications on QaziHost&apos;s web hosting servers?</h4>
                      <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Yes, customers can install custom software or applications on QaziHost&apos;s web hosting servers as long as they do not violate QaziHost&apos;s terms and conditions.</p>
                    </div>
                    <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px' }}>
                      <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '8px' }}>Are customers allowed to use cron jobs on QaziHost&apos;s web hosting servers?</h4>
                      <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Yes, customers can use cron jobs on QaziHost&apos;s web hosting servers as long as they do not violate QaziHost&apos;s terms and conditions.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resources - Section 5 */}
              <div id="resources" style={{ scrollMarginTop: '120px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(59,130,246,0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Database size={24}/></div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Resource Policy</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#fff' }}>What does mean by Unlimited resources?</h3>
                    <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7 }}>As a universal truth, nothing can be totally unlimited. A fair normal website at reseller & shared hosting plans, can go upto maximum 100GB Storage, and 500GB. But we provide 500GB NVMe Disk and 1024 GB bandwidth. As per our past experience no one could reached till then, so we lable these as &quot;Unlimited&quot;. In special cases, if your website needs extra resources than allocated, You should contact support to get specific resources, or try upgrading to VPS or Dedicated Servers.</p>
                  </div>
                  <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#fff' }}>What happens if a customer exceeds their allocated disk space or bandwidth?</h3>
                    <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7 }}>If a customer exceeds their allocated disk space or bandwidth, QaziHost may either charge them for additional usage or suspend their web hosting account until the issue is resolved.</p>
                  </div>
                  <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#fff' }}>Does QaziHost provide SSL certificates for its web hosting services?</h3>
                    <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7 }}>Yes, QaziHost provides SSL certificates for its web hosting services, but customers may also use third-party SSL certificates if they prefer.</p>
                  </div>
                  <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#fff' }}>Can customers resell their web hosting services from QaziHost?</h3>
                    <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7 }}>Yes, customers can resell their web hosting services from QaziHost, but they are responsible for their customers&apos; activities and must comply with QaziHost&apos;s terms and conditions.</p>
                  </div>
                  <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#fff' }}>Can customers upgrade or downgrade their web hosting plans?</h3>
                    <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7 }}>Yes, customers can upgrade or downgrade their web hosting plans at any time through QaziHost&apos;s client area or by contacting support.</p>
                  </div>
                  <div style={{ padding: '32px', background: 'rgba(239,68,68,0.05)', borderRadius: '24px', border: '1px solid rgba(239,68,68,0.1)' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: '#fff' }}>Does QaziHost&apos;s web hosting services can be used as storage solution?</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>You may not use your hosting account as a backup solution. Our Services are designed to host your website only and may not be used as a data repository. Please note that you also can&apos;t use it for storing files for downloading links (i.e APK, xapk, obb or exe file storage and downloading solutions) QaziHost reserves the right to remove backups from your hosting account with or without notice.</p>
                  </div>
                  <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#fff' }}>Is QaziHost responsible for any loss of data or content due to server crashes?</h3>
                    <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7 }}>While QaziHost takes great measures to ensure the stability and reliability of our servers, there may still be instances where a server crash could occur due to factors beyond our control. These can include natural disasters, power outages, hardware failures, software bugs, cyber-attacks, and other unforeseen circumstances. We have backup systems in place to minimize the impact of such incidents, but it is important to note that we cannot guarantee the complete safety and availability of your data at all times. Therefore, we strongly recommend that you maintain your own backups of all web hosting content to ensure the safety and security of your data.</p>
                  </div>
                </div>
              </div>

              {/* Licenses - Section 6 */}
              <div id="licenses" style={{ scrollMarginTop: '120px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(139,92,246,0.1)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BadgeCheck size={24}/></div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Licenses Terms</h2>
                </div>
                <div style={{ display: 'grid', gap: '20px' }}>
                  {[
                    { q: 'Do you offer free license installation?', a: 'Yes, we do offer free license installation for certain products. However, in order for us to install the license, you will need to provide us with root access to your server. It is important to note that while we will install the license for free, if you require additional support or want us to properly configure the settings of the product, there may be additional charges. For further assistance, please contact our support team through WhatsApp.' },
                    { q: 'Do you offer refunds at licenses in case of wrong order?', a: 'At QaziHost, we have a strict policy of not offering refunds for license purchases, even in the event of a wrong order. This is because the licenses we provide are digital products that cannot be returned or exchanged once they have been activated (In case of wrong IP, it can be changed anytime for multiple time for free). Therefore, we strongly recommend that our customers take the time to review their order details before making a purchase to ensure they are selecting the correct product and licensing option. In the event that you are unsure about which product or licensing option to choose, our customer support team is always available to provide assistance and answer any questions you may have. We encourage you to reach out to us before completing your purchase to ensure that you are making the right decision for your needs. We understand that mistakes can happen, but unfortunately, we cannot provide refunds for license purchases due to our policy and the nature of digital products. We appreciate your understanding and cooperation in this matter.' },
                    { q: 'Can we really change IP for unlimited times?', a: 'Yes, you can change the license IP address multiple times, but please note that this should not be done for spamming purposes. Changing the license IP address too frequently may also result in suspicion from the software vendor or license provider. It\'s important to use this feature responsibly and only when necessary, and to ensure that you are following the terms and conditions set by the software vendor or license provider.' },
                    { q: 'Do you offer official licenses?', a: 'At QaziHost, we do not offer official licenses. Instead, we provide shared licenses that come with full access. We want to assure our customers that our licenses are not nulled or cracked and are 100% safe to use. While our licenses are not official, we guarantee their authenticity and reliability.' },
                    { q: 'Can we get official support for licenses?', a: 'No, QaziHost will provide support for the licenses purchased through us. We do not offer official licenses, but our licenses are guaranteed to be safe and not nulled or cracked. Any support related to the licensed products can be obtained from QaziHost only, as official websites will not provide support for our licenses.' },
                    { q: 'Is it possible to perform regular updates on a product with a shared license?', a: 'Regular updates are fully supported for all our shared licenses. You can update your products through relevant commands or through the control panel as normal without any issues or restrictions.' }
                  ].map((faq, i) => (
                    <div key={i} style={{ padding: '24px 32px', background: 'rgba(15,23,42,0.4)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '12px' }}>{faq.q}</h4>
                      <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0, lineHeight: 1.7 }}>{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1024px) {
          .policy-layout { grid-template-columns: 1fr !important; }
          .policy-sidebar { display: none !important; }
        }
      `}} />
    </main>
  );
}

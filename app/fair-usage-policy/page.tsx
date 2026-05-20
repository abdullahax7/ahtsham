'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroParticles from '../components/HeroParticles';
import { 
  ShieldAlert, 
  Zap, 
  Lock, 
  ShieldCheck, 
  Trash2, 
  AlertTriangle, 
  Mail, 
  HardDrive,
  UserX,
  FileWarning
} from 'lucide-react';

const sections = [
  { id: 'prohibited', title: 'Prohibited Uses', icon: <UserX size={20} /> },
  { id: 'resources', title: 'Resource Abuse', icon: <Zap size={20} /> },
  { id: 'system', title: 'System Access', icon: <Lock size={20} /> },
  { id: 'backups', title: 'Backup Storage', icon: <HardDrive size={20} /> },
  { id: 'spam', title: 'Spam Policy', icon: <Mail size={20} /> },
  { id: 'reporting', title: 'Reporting', icon: <FileWarning size={20} /> },
];

export default function FairUsagePolicy() {
  const [activeSection, setActiveSection] = useState('prohibited');

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
          <h1 style={{ marginBottom: '24px' }}>Fair Usage Policy</h1>
          <p style={{ 
            fontSize: '1.2rem', 
            lineHeight: 1.6, 
            maxWidth: '1000px', 
            margin: '0 auto', 
            fontWeight: 500,
            color: '#e2e8f0'
          }}>
            At QaziHost, we take our Fair Usage Policy very seriously and want our clients to do the same. When you agree to our Fair Usage terms and conditions, you enter into a legal agreement with our company. This agreement outlines the rules and guidelines you must follow when using our services. It&apos;s important to read and understand these terms and conditions, as failure to abide by them could result in account suspension or other penalties.
          </p>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span style={{ opacity: 0.6 }}>Last Revision:</span>
            <span style={{ color: '#fff', fontWeight: 600, padding: '4px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>1st April 2023</span>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', minWidth: 0 }}>
              
              <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)', padding: '48px', backdropFilter: 'blur(5px)' }}>
                <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#94a3b8', margin: 0 }}>
                  This Fair Usage Policy (&quot;FUP&quot;) governs your use of the Services and is incorporated by reference into QaziHost&apos;s Terms of Service. Unless otherwise stated, defined terms in this FUP have the same meaning as provided in the Terms of Service. QaziHost may modify this FUP at any time without notice.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#94a3b8', margin: '20px 0 0' }}>
                  The Services provided by QaziHost may only be used for lawful purposes. You agree to comply with all applicable laws, rules and regulations in connection with your use of the Services. QaziHost reserves the right to refuse service to anyone at our sole discretion. Any material or conduct that in our judgment violates this FUP in any manner may result in suspension or termination of the Services or removal of content with or without notice.
                </p>
              </div>
 
              {/* Prohibited Uses */}
              <div id="prohibited" style={{ scrollMarginTop: '120px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(248,87,39,0.1)', color: '#f85727', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><UserX size={24}/></div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Prohibited Uses</h2>
                </div>
                <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', lineHeight: 1.8 }}>
                  <p style={{ marginBottom: '24px', color: '#cbd5e1' }}>You may not directly or indirectly use the Services in connection with any of the following, as determined in QaziHost&apos;s sole discretion:</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                      'Disclosing sensitive personal information about others;',
                      'Storing personal or sensitive information, including without limitation, "Protected Health Information" as defined under the U.S. Health Insurance Portability and Accountability Act (“HIPAA”);',
                      'Phishing or engaging in identity theft;',
                      'Distributing computer viruses, worms, Trojan horses or other malicious code;',
                      'Promoting or facilitating prostitution or sex trafficking;',
                      'Hosting ponzi or pyramid schemes, or websites that engage in unlawful or deceptive marketing practices;',
                      'Hosting, distributing or linking to child sexual abuse material (CSAM) or content that is harmful to minors (CSAM will be suspended immediately without notice and reported to law enforcement or the National Center for Missing and Exploited Children);',
                      'Engaging in the unlawful distribution of controlled substances, drug contraband or prescription medications (including without limitation, promotion, marketing, or sale of prescription medications without a valid prescription);',
                      'Gambling;',
                      'Promoting or facilitating violence or terrorist activities; or',
                      'Infringing the intellectual property or other proprietary rights of others.'
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                        <ShieldAlert size={18} style={{ color: '#ef4444', marginTop: '4px', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.95rem', color: '#cbd5e1' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
 
              {/* Resource Abuse */}
              <div id="resources" style={{ scrollMarginTop: '120px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(59,130,246,0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Zap size={24}/></div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Resource & Network Abuse</h2>
                </div>
                <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', lineHeight: 1.8 }}>
                  <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>You may not consume excessive amounts of server or network resources or use the Services in any way which results in server performance issues or which interrupts service for other customers. Prohibited activities that contribute to excessive use, include without limitation:</p>
                  <ul style={{ paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      'Hosting or linking to an anonymous proxy server;',
                      'Operating a file sharing site;',
                      'Hosting scripts or processes that adversely impact our systems; or',
                      'Utilizing software that interfaces with an Internet Relay Chat (IRC) network.'
                    ].map((item, i) => (
                      <li key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <AlertTriangle size={18} style={{ color: '#f59e0b' }} />
                        <span style={{ color: '#cbd5e1' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
 
              {/* System Access */}
              <div id="system" style={{ scrollMarginTop: '120px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(139,92,246,0.1)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Lock size={24}/></div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Unauthorized System Access</h2>
                </div>
                <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', lineHeight: 1.8 }}>
                  <p style={{ color: '#94a3b8', marginBottom: '20px' }}>You may not directly or indirectly use the Services to gain access to any network or system without permission, including without limitation:</p>
                  <ul style={{ paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      'Accessing another network without permission, including to probe or scan for vulnerabilities or breach security or authentication measures;',
                      'Attacking other networks (e.g., utilizing botnets or other means to launch Denial of Service (DoS) or other attacks);',
                      'Intercepting or monitoring data without permission; or',
                      'Using any deep-link, page-scrape, robot, crawl, index, spider, offline reader, click spam, macro programs, internet agent, or other automatic device, program, algorithm or methodology, to use, access, copy, index, acquire information, generate impressions or clicks, input information, store information, search, generate searches, or monitor any portion of QaziHost\'s website or servers for any unauthorized purpose.'
                    ].map((item, i) => (
                      <li key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '12px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <ShieldAlert size={18} style={{ color: '#ef4444', marginTop: '4px' }} />
                        <span style={{ color: '#cbd5e1' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
 
              {/* Backups */}
              <div id="backups" style={{ scrollMarginTop: '120px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(16,185,129,0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><HardDrive size={24}/></div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Storage of Backups</h2>
                </div>
                <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', lineHeight: 1.8 }}>
                  <p style={{ color: '#fff', marginBottom: '16px', fontWeight: 700 }}>You may not use your hosting account as a backup solution.</p>
                  <p style={{ color: '#cbd5e1' }}>Our Services are designed to host your website only and may not be used as a data repository. QaziHost reserves the right to remove backups from your hosting account with or without notice.</p>
                </div>
              </div>
 
              {/* Spam Policy */}
              <div id="spam" style={{ scrollMarginTop: '120px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Mail size={24}/></div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Zero Tolerance Spam Policy</h2>
                </div>
                <div style={{ padding: '40px', background: 'rgba(239,68,68,0.05)', borderRadius: '28px', border: '1px solid rgba(239,68,68,0.1)', borderLeft: '8px solid #ef4444' }}>
                  <ul style={{ paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                      'Any user account which causes or results in our IP space being blacklisted will be immediately suspended and/or terminated.',
                      'Forging or misrepresenting message headers is prohibited.',
                      'Websites advertised via spam (i.e. "Spamvertised") may not be hosted on our servers.',
                      'You may not use the Services to sell contact lists or send email to any purchased lists (i.e. “Safe Lists”).',
                      'You may not use the Services to send spam or bulk unsolicited messages. We may terminate with or without notice the account of any user who sends spam.'
                    ].map((item, i) => (
                      <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <Mail size={18} style={{ color: '#ef4444', marginTop: '4px' }} />
                        <span style={{ color: '#cbd5e1', fontSize: '1rem' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
 
              {/* Reporting */}
              <div id="reporting" style={{ scrollMarginTop: '120px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--accent-glow)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileWarning size={24}/></div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Enforcement & Reporting</h2>
                </div>
                <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', lineHeight: 1.7 }}>
                  <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>Your Services may be suspended or terminated with or without notice upon any violation of this FUP. Any violations may result in the immediate suspension or termination of your account.</p>
                  <p style={{ color: '#94a3b8', marginBottom: '20px' }}>A failure to respond to an email from our abuse team within forty-eight (48) hours, or as otherwise specified in the communication to you, may result in the suspension or termination of your Services.</p>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '32px' }}>Websites hosted on QaziHost&apos;s servers in the U.S. are generally governed by U.S. law. As a web host, QaziHost is not the publisher of user generated content and we are not in a position to investigate the veracity of individual defamation claims. Rather, we rely on the legal system and courts to determine whether or not material is defamatory.</p>
                  
                  <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a href="mailto:abuse@qazi.host" style={{ 
                      padding: '16px 32px', 
                      background: 'rgba(255,255,255,0.05)', 
                      borderRadius: '16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px', 
                      textDecoration: 'none',
                      color: '#fff',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <div style={{ color: '#ef4444' }}><Mail size={20}/></div>
                      <span>abuse@qazi.host</span>
                    </a>
                    <a href="mailto:dmca@qazi.host" style={{ 
                      padding: '16px 32px', 
                      background: 'rgba(255,255,255,0.05)', 
                      borderRadius: '16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px', 
                      textDecoration: 'none',
                      color: '#fff',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <div style={{ color: '#3b82f6' }}><ShieldCheck size={20}/></div>
                      <span>dmca@qazi.host</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Reporting */}
              <div id="reporting" style={{ scrollMarginTop: '120px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--accent-glow)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileWarning size={24}/></div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Reporting Violations</h2>
                </div>
                <div style={{ padding: '40px', background: 'var(--surface)', borderRadius: '24px', border: '1px solid var(--border)', textAlign: 'center' }}>
                  <p style={{ fontSize: '1.1rem', color: '#cbd5e1', marginBottom: '32px' }}>Please contact us immediately if you witness any activity violating our FUP.</p>
                  <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a href="mailto:abuse@qazi.host" style={{ 
                      padding: '16px 32px', 
                      background: 'rgba(255,255,255,0.05)', 
                      borderRadius: '16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px', 
                      textDecoration: 'none',
                      color: '#fff',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <div style={{ color: '#ef4444' }}><Mail size={20}/></div>
                      <span>abuse@qazi.host</span>
                    </a>
                    <a href="mailto:dmca@qazi.host" style={{ 
                      padding: '16px 32px', 
                      background: 'rgba(255,255,255,0.05)', 
                      borderRadius: '16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px', 
                      textDecoration: 'none',
                      color: '#fff',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <div style={{ color: '#3b82f6' }}><ShieldCheck size={20}/></div>
                      <span>dmca@qazi.host</span>
                    </a>
                  </div>
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
        .nav-item-hover:hover {
          background: rgba(248,87,39,0.05) !important;
          color: #fff !important;
        }
      `}} />
    </main>
  );
}

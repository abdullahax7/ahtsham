'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroParticles from '../components/HeroParticles';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Eye, 
  CreditCard, 
  Bell, 
  UserPlus, 
  Database,
  Search,
  EyeOff,
  UserCheck
} from 'lucide-react';

const sections = [
  { id: 'sharing', title: 'Data Sharing', icon: <EyeOff size={20} /> },
  { id: 'usage', title: 'Data Usage', icon: <UserPlus size={20} /> },
  { id: 'payments', title: 'Payment Security', icon: <CreditCard size={20} /> },
  { id: 'protection', title: 'Site Security', icon: <Lock size={20} /> },
  { id: 'rights', title: 'My Rights', icon: <UserCheck size={20} /> },
  { id: 'notification', title: 'Notifications', icon: <Bell size={20} /> },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('sharing');

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
          <h1 style={{ marginBottom: '24px' }}>Privacy Policy</h1>
          <p style={{ 
            fontSize: '1.2rem', 
            lineHeight: 1.6, 
            maxWidth: '1000px', 
            margin: '0 auto', 
            fontWeight: 500,
            color: '#e2e8f0'
          }}>
            At QaziHost, we take our privacy policy very seriously and want our clients to do the same. When you agree to our privacy policy, you enter into a legal agreement with our company. This agreement outlines the rules and guidelines you must follow when using our services. It&apos;s important to read and understand these terms and conditions, as failure to abide by them could result in account suspension or other penalties.
          </p>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span style={{ opacity: 0.6 }}>Last Updated:</span>
            <span style={{ color: '#fff', fontWeight: 600, padding: '4px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>1st January 2024</span>
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
              {/* Data Sharing */}
              <div id="sharing" style={{ scrollMarginTop: '120px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(59,130,246,0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><EyeOff size={24}/></div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Will my information be shared?</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', lineHeight: 1.8 }}>
                    <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '16px' }}>Will my personal information be shared with third parties?</h3>
                    <p style={{ color: '#94a3b8', margin: 0 }}>No, we do not share your personal information with any third parties. Your privacy is our priority.</p>
                  </div>
                  <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', lineHeight: 1.8 }}>
                    <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '16px' }}>Do you sell or rent customer information?</h3>
                    <p style={{ color: '#94a3b8', margin: 0 }}>No, we do not sell or rent any customer information. Your data is strictly used for the purposes outlined in our privacy policy.</p>
                  </div>
                </div>
              </div>
 
              {/* Data Usage */}
              <div id="usage" style={{ scrollMarginTop: '120px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(16,185,129,0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><UserPlus size={24}/></div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Data Usage</h2>
                </div>
                <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', lineHeight: 1.8 }}>
                  <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '16px' }}>How is my personal information used by your company?</h3>
                  <p style={{ color: '#cbd5e1', margin: 0 }}>We only use your personal information for the purposes specified in our privacy policy. This typically includes providing and improving our services and ensuring the security of your account.</p>
                </div>
              </div>
 
              {/* Payment Security */}
              <div id="payments" style={{ scrollMarginTop: '120px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(139,92,246,0.1)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CreditCard size={24}/></div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Payment Security</h2>
                </div>
                <div style={{ padding: '40px', background: 'rgba(139,92,246,0.05)', borderRadius: '32px', border: '1px solid rgba(139,92,246,0.1)', borderLeft: '8px solid #8b5cf6' }}>
                  <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '16px' }}>Are my payment details safe and secure?</h3>
                  <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.8, margin: 0 }}>
                    Yes, your payment details are treated with the utmost confidentiality. We use secure and encrypted methods to process payments, and we do not store your payment information.
                  </p>
                </div>
              </div>
 
              {/* Site Security */}
              <div id="protection" style={{ scrollMarginTop: '120px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(59,130,246,0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Lock size={24}/></div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Security Measures</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', lineHeight: 1.8 }}>
                    <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '16px' }}>How do you protect my personal information from unauthorized access?</h3>
                    <p style={{ color: '#94a3b8', margin: 0 }}>We employ industry-standard security measures to safeguard your personal information from unauthorized access, disclosure, alteration, and destruction. Our commitment is to ensure the confidentiality and integrity of your data.</p>
                  </div>
                  <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', lineHeight: 1.8 }}>
                    <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '16px' }}>Is my information stored securely?</h3>
                    <p style={{ color: '#94a3b8', margin: 0 }}>Absolutely. We take measures to ensure that your personal information is stored securely, and access is restricted to authorized personnel only.</p>
                  </div>
                  <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', lineHeight: 1.8 }}>
                    <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '16px' }}>Can I trust that my privacy is a priority for your company?</h3>
                    <p style={{ color: '#94a3b8', margin: 0 }}>Yes, your privacy is our primary priority and we are committed to maintaining the highest levels of confidentiality and security for all our users.</p>
                  </div>
                </div>
              </div>
 
              {/* My Rights */}
              <div id="rights" style={{ scrollMarginTop: '120px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(248,87,39,0.1)', color: '#f85727', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><UserCheck size={24}/></div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>My Rights</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                  <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: '#fff' }}>How can I access or update my personal information?</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>You can typically access and update your personal information through your account settings. Refer to our privacy policy for specific details on managing your data.</p>
                  </div>
                  <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: '#fff' }}>Can I opt-out of any data collection?</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Yes, you may have the option to opt-out of certain data collection activities. Check our privacy policy to understand your choices and how to exercise them.</p>
                  </div>
                </div>
              </div>
 
              {/* Notification */}
              <div id="notification" style={{ scrollMarginTop: '120px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--accent-glow)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Bell size={24}/></div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Policy Notifications</h2>
                </div>
                <div style={{ padding: '32px', background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                   <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '16px' }}>Will I be notified of any changes to the privacy policy?</h3>
                  <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
                    Yes, we will notify you of any significant changes to our privacy policy. It&apos;s important to stay informed about how your personal information is handled.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

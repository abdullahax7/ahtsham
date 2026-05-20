'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import dynamic from 'next/dynamic';
import LoadingSkeleton from '../components/LoadingSkeleton';

const HeroParticles = dynamic(() => import('../components/HeroParticles'), {
  ssr: false
});

export default function Contact() {
  return (
    <main>
      <Header />

      <section className="page-hero blur-in visible" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <HeroParticles glowColor="rgba(59, 130, 246, 0.4)" />
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(0,0,0,0) 70%)', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(37,211,102,0.1) 0%, rgba(0,0,0,0) 70%)', zIndex: 0 }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="page-hero-content" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', paddingTop: '80px' }}>
            <div className="section-label delay-1" style={{ marginBottom: '16px', display: 'inline-block' }}>Get In Touch</div>
            <h1 className="delay-2" style={{ fontSize: '3.5rem', marginBottom: '24px', background: 'linear-gradient(135deg, #fff 0%, #a5b4fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              We're Here to Help
            </h1>
            <p className="delay-3" style={{ color: 'var(--muted)', fontSize: '1.25rem', lineHeight: 1.7 }}>
              Whether you need assistance with an existing service, a custom dedicated server quote, or just have a general question, our team is directly available.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 120px', position: 'relative', zIndex: 1, marginTop: '-50px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', maxWidth: '1000px', margin: '0 auto' }}>
            
            {/* WhatsApp Premium Card */}
            <a href="https://wa.me/923043126626" target="_blank" rel="noopener noreferrer" className="contact-card-premium fade-up delay-1" style={{ textDecoration: 'none' }}>
              <div className="contact-card-inner" style={{
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '24px',
                padding: '48px 40px',
                textAlign: 'left',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}>
                <div className="card-bg-glow" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at top right, rgba(37,211,102,0.15) 0%, rgba(0,0,0,0) 70%)', opacity: 0, transition: 'opacity 0.4s ease' }}></div>
                
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.2), rgba(37, 211, 102, 0.05))', border: '1px solid rgba(37, 211, 102, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px', position: 'relative', zIndex: 2, boxShadow: '0 8px 24px rgba(37, 211, 102, 0.2)' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </div>
                
                <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '16px', color: '#fff', position: 'relative', zIndex: 2 }}>WhatsApp Support</h3>
                <p style={{ color: 'var(--muted)', marginBottom: '32px', fontSize: '1.05rem', position: 'relative', zIndex: 2, lineHeight: 1.6, flex: 1 }}>Instant replies and premium assistance for sales, configurations, and technical support.</p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative', zIndex: 2 }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', letterSpacing: '0.5px' }}>0304 312 6626</span>
                  <span className="card-arrow" style={{ color: '#25D366', display: 'flex', alignItems: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                  </span>
                </div>
              </div>
            </a>

            {/* Email Premium Card */}
            <a href="mailto:support@qazi.host" className="contact-card-premium fade-up delay-2" style={{ textDecoration: 'none' }}>
              <div className="contact-card-inner" style={{
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '24px',
                padding: '48px 40px',
                textAlign: 'left',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}>
                <div className="card-bg-glow" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at top right, rgba(59,130,246,0.15) 0%, rgba(0,0,0,0) 70%)', opacity: 0, transition: 'opacity 0.4s ease' }}></div>

                <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.05))', border: '1px solid rgba(59, 130, 246, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px', position: 'relative', zIndex: 2, boxShadow: '0 8px 24px rgba(59, 130, 246, 0.2)' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                
                <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '16px', color: '#fff', position: 'relative', zIndex: 2 }}>Email Inquiries</h3>
                <p style={{ color: 'var(--muted)', marginBottom: '32px', fontSize: '1.05rem', position: 'relative', zIndex: 2, lineHeight: 1.6, flex: 1 }}>For enterprise partnership requests, billing matters, and formal communication.</p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative', zIndex: 2 }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', letterSpacing: '0.5px' }}>support@qazi.host</span>
                  <span className="card-arrow" style={{ color: '#3b82f6', display: 'flex', alignItems: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                  </span>
                </div>
              </div>
            </a>

          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .contact-card-premium:hover .contact-card-inner {
            transform: translateY(-8px);
            border-color: rgba(255,255,255,0.15);
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          }
          .contact-card-premium:hover .card-bg-glow {
            opacity: 1 !important;
          }
        `}} />
      </section>

      {/* Support Hours Banner */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div className="fade-up delay-3" style={{ maxWidth: '800px', margin: '0 auto', background: 'linear-gradient(90deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '32px 40px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <h4 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '4px' }}>Business & Support Hours</h4>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>Our team operates standard working hours to ensure top-notch assistance.</p>
            </div>
            <div style={{ textAlign: 'right', minWidth: '200px' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>Mon-Fri: 12PM - 12AM PST</div>
              <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Weekends: Slower response</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

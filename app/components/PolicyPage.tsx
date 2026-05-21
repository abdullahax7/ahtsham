import Header from './Header';
import Footer from './Footer';
import HeroParticles from './HeroParticles';

type Props = {
  title: string;
  intro?: string;
  lastUpdated?: string;
  html: string;
};

// Server component shared by /privacy, /terms, /fair-usage-policy. The page
// body is rendered from admin-editable HTML stored in site_settings, while the
// surrounding chrome (hero, header, footer) stays consistent.
export default function PolicyPage({ title, intro, lastUpdated, html }: Props) {
  return (
    <main style={{ background: '#020617', color: '#f8fafc', minHeight: '100vh' }}>
      <Header />

      <section className="page-hero">
        <HeroParticles glowColor="rgba(59, 130, 246, 0.4)" />
        <div className="page-hero-content">
          <h1 style={{ marginBottom: '24px' }}>{title}</h1>
          {intro && (
            <p style={{ fontSize: '1.2rem', lineHeight: 1.6, maxWidth: '1000px', margin: '0 auto', fontWeight: 500, color: '#e2e8f0' }}>
              {intro}
            </p>
          )}
          {lastUpdated && (
            <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span style={{ opacity: 0.6 }}>Last Updated:</span>
              <span style={{ color: '#fff', fontWeight: 600, padding: '4px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                {lastUpdated}
              </span>
            </div>
          )}
        </div>
      </section>

      <section style={{ padding: '60px 0 140px' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div
            className="policy-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .policy-body { color: #cbd5e1; line-height: 1.8; font-size: 1.05rem; }
        .policy-body h1, .policy-body h2, .policy-body h3 { color: #fff; font-weight: 800; }
        .policy-body h2 { font-size: 1.6rem; margin: 48px 0 16px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.06); }
        .policy-body h2:first-of-type { border-top: none; padding-top: 0; margin-top: 0; }
        .policy-body h3 { font-size: 1.2rem; margin: 28px 0 12px; }
        .policy-body p { margin: 0 0 16px; }
        .policy-body ul, .policy-body ol { margin: 0 0 16px 24px; padding: 0; }
        .policy-body li { margin-bottom: 8px; }
        .policy-body strong { color: #fff; font-weight: 700; }
        .policy-body a { color: #3b82f6; text-decoration: underline; }
        .policy-body a:hover { color: #60a5fa; }
        .policy-body code { background: rgba(255,255,255,0.06); padding: 2px 8px; border-radius: 6px; font-size: 0.95em; }
      ` }} />

      <Footer />
    </main>
  );
}

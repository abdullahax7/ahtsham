import Header from '../components/Header';
import Footer from '../components/Footer';
import { getSettings, getSiteSetting } from '../../lib/db/repos';

export const runtime = 'nodejs';
export const revalidate = 60;
export const dynamic = 'force-dynamic';

export default async function StatusPage() {
  const settings = await getSettings();
  const statusHtml = settings?.status_html || '';
  const iframeUrl = await getSiteSetting('status_iframe_url', '');

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <Header />

      <section style={{ padding: '160px 24px 180px', maxWidth: '1100px', margin: '0 auto', minHeight: '70vh' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#fff', marginBottom: '16px', textAlign: 'center', letterSpacing: '-1px' }}>
          Server Status
        </h1>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.55)', maxWidth: 700, margin: '0 auto 40px', fontSize: '1.05rem' }}>
          Live uptime and incident history for every QaziHost system.
        </p>

        {iframeUrl && (
          <div style={{ marginTop: 24, width: '100%', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: '#0f1117', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
            <iframe
              src={iframeUrl}
              title="QaziHost status page"
              style={{ width: '100%', height: '85vh', border: 0, display: 'block', background: '#0f1117' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}

        {!iframeUrl && !statusHtml && (
          <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.5)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 16 }}>
            Status feed not configured. Set <code>status_iframe_url</code> in the admin panel.
          </div>
        )}

        {statusHtml && (
          <div
            style={{ marginTop: 24, width: '100%', borderRadius: 16, overflow: 'hidden' }}
            dangerouslySetInnerHTML={{ __html: statusHtml }}
          />
        )}
      </section>

      <Footer />
    </main>
  );
}

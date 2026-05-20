import Header from '../components/Header';
import Footer from '../components/Footer';
import Script from 'next/script';
import { getSettings } from '../../lib/db/repos';

export const runtime = 'nodejs';
export const revalidate = 60;

export default async function StatusPage() {
  const settings = await getSettings();
  const statusHtml = settings?.status_html || '';



  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <Header />

      <section style={{ padding: '160px 24px 180px', maxWidth: '1000px', margin: '0 auto', minHeight: '70vh' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#fff', marginBottom: '16px', textAlign: 'center', letterSpacing: '-1px' }}>
          Server Status
        </h1>


        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.min.js"
          strategy="afterInteractive"
        />



        {/* Custom HTML Widget Container */}
        {statusHtml && (
          <div 
            style={{ marginTop: '24px', width: '100%', borderRadius: '16px', overflow: 'hidden' }}
            dangerouslySetInnerHTML={{ __html: statusHtml }}
          />
        )}
      </section>



      <Footer />
    </main>
  );
}

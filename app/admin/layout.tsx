import Link from 'next/link';
import { Plus_Jakarta_Sans } from 'next/font/google';

const pjs = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'Qazi.Host Admin',
  description: 'Administration Panel',
};

const NAV: { href: string; label: string }[] = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/blogs', label: 'Blog Posts' },
  { href: '/admin/products', label: 'Products & Plans' },
  { href: '/admin/testimonials', label: 'Testimonials' },
  { href: '/admin/faqs', label: 'FAQs' },
  { href: '/admin/stats', label: 'Homepage Stats' },
  { href: '/admin/payments', label: 'Payment Methods' },
  { href: '/admin/site-settings', label: 'Site Settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={pjs.className} style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#0a0a0c', color: '#e8eaed' }}>
      <aside style={{
        width: '260px',
        flexShrink: 0,
        background: '#111218',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        overflow: 'hidden',
      }}>
        <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#fff' }}>
            Qazi.<span style={{ color: '#f85727' }}>Admin</span>
          </h2>
        </div>
        <div style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="admin-nav-link"
              style={{ display: 'block', padding: '12px 16px', borderRadius: '8px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontWeight: 600, transition: 'all 0.2s' }}>
              {item.label}
            </Link>
          ))}
        </div>
        <div style={{ padding: '24px 16px', borderTop: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
          <Link href="/" target="_blank" className="admin-nav-link"
            style={{ display: 'block', padding: '12px 16px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.9rem', borderRadius: '8px', transition: 'all 0.2s' }}>
            ← View Live Site
          </Link>
        </div>
      </aside>

      <main style={{ flex: 1, overflowY: 'auto', background: '#0a0a0c' }}>
        <div style={{ padding: '48px', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
          {children}
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .admin-nav-link:hover {
          background: rgba(255,255,255,0.05);
          color: #fff !important;
        }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        :root { --accent: #f85727; }
        .admin-input, .admin-textarea, .admin-select {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          padding: 12px;
          border-radius: 8px;
          outline: none;
          font-size: 0.95rem;
          font-family: inherit;
        }
        .admin-textarea { resize: vertical; min-height: 120px; }
        .admin-card {
          background: #111218;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        }
        .btn-accent {
          background: #f85727; color: #fff; padding: 12px 24px;
          border-radius: 8px; border: none; font-weight: 700; cursor: pointer;
        }
        .btn-danger {
          background: #ef4444; color: #fff; padding: 10px 16px;
          border-radius: 8px; border: none; font-weight: 600; cursor: pointer;
        }
        .btn-ghost {
          background: rgba(255,255,255,0.05); color: #fff; padding: 10px 16px;
          border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); font-weight: 600; cursor: pointer;
        }
      `}} />
    </div>
  );
}

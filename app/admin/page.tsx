import Link from 'next/link';
import { updateStatusHtml } from './actions';
import { countBlogs, getSettings } from '../../lib/db/repos';

export const revalidate = 0;
export const runtime = 'nodejs';

export default async function AdminDashboard() {
  const [blogsCount, settings] = await Promise.all([
    Promise.resolve(countBlogs()),
    getSettings(),
  ]);

  const statusHtml = settings?.status_html || '';

  return (
    <div>
      <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '8px', color: '#fff' }}>Dashboard Overview</h1>
      <p style={{ color: 'var(--muted)', fontSize: '1.1rem', marginBottom: '48px' }}>Welcome to the Qazi.Host control center.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <DashCard title="Total Blog Posts" value={blogsCount || 0} href="/admin/blogs" cta="Manage Blogs" />
        <DashCard title="Products" value="Catalog" href="/admin/products" cta="Manage Products" />
        <DashCard title="Testimonials" value="Reviews" href="/admin/testimonials" cta="Manage Testimonials" />
        <DashCard title="FAQs" value="Help" href="/admin/faqs" cta="Manage FAQs" />
        <DashCard title="Homepage Stats" value="Counters" href="/admin/stats" cta="Edit Stats" />
        <DashCard title="Site Settings" value="Global" href="/admin/site-settings" cta="Edit Site" />
        <DashCard title="Payment Methods" value="Hubs" href="/admin/payments" cta="Manage Payments" />
      </div>

      {/* Custom HTML Embed Editor */}
      <div style={{ marginTop: '32px', background: '#111218', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <h3 style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 700, marginBottom: '8px' }}>Custom HTML Widget</h3>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '32px' }}>
          Embed third-party iframes or custom HTML (e.g. UptimeRobot or Statuspage widgets). This will render directly on the public status page below the main banner.
        </p>
        <form action={updateStatusHtml} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <textarea
              name="status_html"
              defaultValue={statusHtml}
              placeholder="<iframe src='...' width='100%' height='400px' frameborder='0'></iframe>"
              rows={6}
              style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '1rem', outline: 'none', resize: 'vertical' }}
            />
          </div>
          <div>
            <button type="submit" style={{ background: '#f85727', color: '#fff', padding: '14px 40px', borderRadius: '8px', border: 'none', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
              Save HTML Widget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DashCard({ title, value, href, cta }: { title: string; value: string | number; href: string; cta: string }) {
  return (
    <div style={{ background: '#111218', padding: '28px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
      <h3 style={{ fontSize: '0.95rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.05em' }}>{title}</h3>
      <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>{value}</div>
      <Link href={href} style={{ color: 'var(--accent, #f85727)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>{cta} &rarr;</Link>
    </div>
  );
}

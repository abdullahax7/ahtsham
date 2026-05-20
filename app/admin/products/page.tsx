import Link from 'next/link';
import { listProducts } from '../../../lib/db/repos';

export const runtime = 'nodejs';
export const revalidate = 0;

export default async function ProductsAdminPage() {
  const products = await listProducts();
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Products & Plans</h1>
          <p style={{ color: 'var(--muted, rgba(255,255,255,0.5))', fontSize: '1.05rem' }}>Manage every product page, its plans, features and visibility.</p>
        </div>
        <Link href="/admin/products/edit/new" className="btn-accent" style={{ textDecoration: 'none' }}>+ New Product</Link>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <th style={{ padding: '16px 20px', textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Product</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Plans</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Visible</th>
              <th style={{ padding: '16px 20px', textAlign: 'right', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '18px 20px', color: '#fff' }}>
                  <div style={{ fontWeight: 700 }}>{p.name}</div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>/{p.slug}</div>
                </td>
                <td style={{ padding: '18px 20px', color: 'rgba(255,255,255,0.7)', textTransform: 'capitalize' }}>{p.category}</td>
                <td style={{ padding: '18px 20px', color: 'rgba(255,255,255,0.7)' }}>{p.plans.length}</td>
                <td style={{ padding: '18px 20px', color: p.is_visible ? '#10b981' : '#ef4444' }}>{p.is_visible ? 'Yes' : 'Hidden'}</td>
                <td style={{ padding: '18px 20px', textAlign: 'right' }}>
                  <Link href={`/admin/products/edit/${p.slug}`} style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>Edit</Link>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>No products yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

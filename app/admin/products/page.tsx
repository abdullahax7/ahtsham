import Link from 'next/link';
import { listProductsForAdmin, type ProductRow } from '../../../lib/db/repos';
import { toggleProductVisibility, toggleProductFeatured, deleteProductAction } from '../actions-content';

export const runtime = 'nodejs';
export const revalidate = 0;
export const dynamic = 'force-dynamic';

const CATEGORY_META: Record<string, { label: string; tint: string; helper: string }> = {
  hosting: { label: 'Hosting Plans', tint: '#10b981', helper: 'Shared, reseller, and VPS hosting products.' },
  dedicated: { label: 'Dedicated Servers', tint: '#3b82f6', helper: 'Bare-metal and high-end dedicated machines.' },
  license: { label: 'Licenses', tint: '#f59e0b', helper: 'cPanel, Plesk, LiteSpeed and add-on licenses.' },
  service: { label: 'Services', tint: '#a78bfa', helper: 'Custom services and one-off offerings.' },
};

const CATEGORY_ORDER = ['hosting', 'dedicated', 'license', 'service', 'other'];

function categoryKey(p: ProductRow): string {
  return CATEGORY_META[p.category] ? p.category : 'other';
}

function formatPrice(p: ProductRow): string {
  if (p.starting_price_usd && p.starting_price_pkr) return `${p.starting_price_usd} / ${p.starting_price_pkr}`;
  return p.starting_price_usd || p.starting_price_pkr || '—';
}

export default async function ProductsAdminPage() {
  const products = await listProductsForAdmin();

  // Group by category, preserving sort_order within each group.
  const groups = new Map<string, ProductRow[]>();
  for (const p of products) {
    const key = categoryKey(p);
    const list = groups.get(key) ?? [];
    list.push(p);
    groups.set(key, list);
  }

  const visibleCount = products.filter((p) => p.is_visible).length;
  const featuredCount = products.filter((p) => p.is_featured).length;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff', marginBottom: 6 }}>Products &amp; Plans</h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem' }}>
            Manage every product page, its plans, pricing, and visibility. Products are grouped by category below.
          </p>
        </div>
        <Link href="/admin/products/edit/new" className="btn-accent" style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}>
          + New Product
        </Link>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 28 }}>
        <SummaryStat label="Total products" value={String(products.length)} tint="#22d3ee" />
        <SummaryStat label="Visible on site" value={`${visibleCount} / ${products.length}`} tint="#10b981" />
        <SummaryStat label="Featured" value={String(featuredCount)} tint="#f59e0b" />
        <SummaryStat label="Categories" value={String(groups.size)} tint="#a78bfa" />
      </div>

      {/* Empty state */}
      {products.length === 0 && (
        <div className="admin-card" style={{ padding: 40, textAlign: 'center' }}>
          <div style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>No products yet.</div>
          <Link href="/admin/products/edit/new" className="btn-accent" style={{ textDecoration: 'none' }}>Create your first product</Link>
        </div>
      )}

      {/* Grouped product cards */}
      {CATEGORY_ORDER.map((key) => {
        const rows = groups.get(key);
        if (!rows || rows.length === 0) return null;
        const meta = CATEGORY_META[key] ?? { label: 'Other', tint: '#94a3b8', helper: 'Uncategorized products.' };

        return (
          <section key={key} style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: meta.tint, boxShadow: `0 0 12px ${meta.tint}80` }} />
                <h2 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{meta.label}</h2>
                <span style={{ padding: '2px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontWeight: 600 }}>{rows.length}</span>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>{meta.helper}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12 }}>
              {rows.map((p) => (
                <ProductRowCard key={p.id} p={p} accent={meta.tint} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function SummaryStat({ label, value, tint }: { label: string; value: string; tint: string }) {
  return (
    <div className="admin-card" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
      <span style={{ color: tint, fontSize: '1.6rem', fontWeight: 800 }}>{value}</span>
    </div>
  );
}

function ProductRowCard({ p, accent }: { p: ProductRow; accent: string }) {
  return (
    <div className="admin-card" style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 12, borderLeft: `3px solid ${p.is_visible ? accent : 'rgba(239,68,68,0.5)'}` }}>
      {/* Title row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.2 }}>{p.name}</div>
          <a href={`/${p.slug}`} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>
            /{p.slug} ↗
          </a>
        </div>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          {p.is_featured && <Badge color="#f59e0b">Featured</Badge>}
          {!p.is_visible && <Badge color="#ef4444">Hidden</Badge>}
        </div>
      </div>

      {/* Meta row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: '0.85rem' }}>
        <Meta label="Price" value={formatPrice(p)} />
        <Meta label="Plans" value={String(p.plans.length)} />
        <Meta label="Features" value={String(p.features.length)} />
        <Meta label="Sort" value={String(p.sort_order)} />
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 10 }}>
        <Link href={`/admin/products/edit/${p.slug}`} className="btn-accent" style={{ textDecoration: 'none', padding: '6px 14px', fontSize: '0.85rem' }}>
          Edit
        </Link>
        <form action={toggleProductVisibility}>
          <input type="hidden" name="slug" value={p.slug} />
          <input type="hidden" name="next" value={p.is_visible ? 'false' : 'true'} />
          <button type="submit" style={miniBtn(p.is_visible ? '#94a3b8' : '#10b981')}>
            {p.is_visible ? 'Hide' : 'Show'}
          </button>
        </form>
        <form action={toggleProductFeatured}>
          <input type="hidden" name="slug" value={p.slug} />
          <input type="hidden" name="next" value={p.is_featured ? 'false' : 'true'} />
          <button type="submit" style={miniBtn(p.is_featured ? '#94a3b8' : '#f59e0b')}>
            {p.is_featured ? 'Unfeature' : 'Feature'}
          </button>
        </form>
        <form action={deleteProductAction} style={{ marginLeft: 'auto' }}>
          <input type="hidden" name="slug" value={p.slug} />
          <button type="submit" style={miniBtn('#ef4444')}>Delete</button>
        </form>
      </div>
    </div>
  );
}

function Badge({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span style={{ padding: '3px 8px', borderRadius: 6, background: `${color}22`, color, fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
      {children}
    </span>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
      <span style={{ color: '#fff', fontWeight: 600 }}>{value}</span>
    </div>
  );
}

function miniBtn(color: string): React.CSSProperties {
  return {
    padding: '6px 12px',
    borderRadius: 6,
    background: `${color}15`,
    color,
    border: `1px solid ${color}40`,
    fontWeight: 600,
    fontSize: '0.8rem',
    cursor: 'pointer',
  };
}

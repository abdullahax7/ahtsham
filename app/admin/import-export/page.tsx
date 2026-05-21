import { sqlite } from '../../../lib/db';
import { importTable } from '../actions-data';

export const runtime = 'nodejs';
export const revalidate = 0;
export const dynamic = 'force-dynamic';

type TableMeta = {
  key: string;
  label: string;
  description: string;
  tint: string;
};

const TABLES: TableMeta[] = [
  { key: 'products', label: 'Products & Plans', tint: '#10b981', description: 'Every product page (shared, reseller, VPS, licenses) with its plans, features, pricing, and category. Round-trip safe.' },
  { key: 'blogs', label: 'Blog Posts', tint: '#3b82f6', description: 'All blog posts including content HTML, featured image, related products, and code snippets.' },
  { key: 'faqs', label: 'FAQs', tint: '#a78bfa', description: 'Homepage FAQ list — questions, answers, ordering, visibility.' },
  { key: 'testimonials', label: 'Testimonials', tint: '#f59e0b', description: 'Customer testimonials shown on the homepage carousel.' },
  { key: 'payment_methods', label: 'Payment Methods', tint: '#ec4899', description: 'Payment provider logos shown on the homepage and checkout.' },
  { key: 'site_settings', label: 'Site Settings', tint: '#22d3ee', description: 'Every editable site copy field — hero text, CEO promise, footer, status bar, legal page bodies, etc.' },
];

function countRows(table: string): number {
  try {
    const row = sqlite.prepare(`SELECT COUNT(*) AS c FROM ${table}`).get() as any;
    return Number(row?.c ?? 0);
  } catch {
    return 0;
  }
}

export default function ImportExportPage({ searchParams }: { searchParams: { ok?: string; table?: string; inserted?: string; updated?: string } }) {
  const flash = searchParams?.ok === '1' && searchParams.table
    ? { table: searchParams.table, inserted: Number(searchParams.inserted ?? 0), updated: Number(searchParams.updated ?? 0) }
    : null;

  return (
    <div>
      <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff', marginBottom: 8 }}>Import / Export</h1>
      <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: 24, fontSize: '1rem', lineHeight: 1.6 }}>
        Back up or migrate any table by downloading its JSON snapshot. Re-import the same JSON to restore on another deployment — imports
        are <strong style={{ color: '#fff' }}>upserts</strong>, never destructive: existing rows are matched by their natural key
        (<code style={codeStyle}>slug</code> for products and blogs, <code style={codeStyle}>id</code> or <code style={codeStyle}>question</code>/<code style={codeStyle}>name</code> for others)
        and updated in place. New rows are inserted.
      </p>

      {flash && (
        <div style={{ marginBottom: 24, padding: '14px 18px', borderRadius: 12, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', fontWeight: 600 }}>
          ✓ Imported <strong>{flash.table}</strong> — {flash.inserted} inserted, {flash.updated} updated.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 16 }}>
        {TABLES.map((t) => (
          <TableCard key={t.key} table={t} count={countRows(t.key)} />
        ))}
      </div>

      <div style={{ marginTop: 32 }} className="admin-card">
        <h2 style={{ color: '#fff', fontWeight: 700, marginBottom: 8 }}>File format</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 12 }}>
          Exported files use a versioned envelope so future schema changes stay backwards-compatible. Bare JSON arrays of rows are also
          accepted for hand-crafted imports.
        </p>
        <pre style={{ background: '#0a0a0c', color: '#cbd5e1', padding: 16, borderRadius: 10, overflow: 'auto', fontSize: '0.85rem', border: '1px solid rgba(255,255,255,0.05)' }}>{`{
  "schema_version": 1,
  "exported_at": "2026-05-21T10:30:00.000Z",
  "table": "products",
  "count": 22,
  "rows": [ { "slug": "shared-hosting", "name": "Shared Hosting", ... } ]
}`}</pre>
      </div>
    </div>
  );
}

function TableCard({ table, count }: { table: TableMeta; count: number }) {
  return (
    <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: 14, borderTop: `3px solid ${table.tint}` }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1.15rem', margin: 0 }}>{table.label}</h2>
          <span style={{ color: table.tint, fontWeight: 700, padding: '4px 12px', borderRadius: 999, background: `${table.tint}15`, fontSize: '0.85rem' }}>
            {count} {count === 1 ? 'row' : 'rows'}
          </span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', lineHeight: 1.5, marginTop: 6 }}>{table.description}</p>
      </div>

      {/* Export */}
      <a
        href={`/api/admin/export/${table.key}`}
        download
        className="btn-ghost"
        style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
      >
        ⤓ Export {table.label} as JSON
      </a>

      {/* Import */}
      <form action={importTable} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: 8, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 14 }}>
        <input type="hidden" name="table" value={table.key} />
        <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 600 }}>Upload JSON file</label>
        <input type="file" name="file" accept="application/json,.json" className="admin-input" style={{ padding: '8px 10px', fontSize: '0.85rem' }} />
        <details style={{ marginTop: 4 }}>
          <summary style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', cursor: 'pointer' }}>or paste JSON directly</summary>
          <textarea
            name="json"
            placeholder='{"schema_version":1,"table":"products","rows":[...]}'
            className="admin-textarea"
            style={{ marginTop: 8, fontFamily: 'monospace', fontSize: '0.8rem', minHeight: 100 }}
          />
        </details>
        <button type="submit" className="btn-accent" style={{ marginTop: 4 }}>
          Import into {table.label}
        </button>
      </form>
    </div>
  );
}

const codeStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  padding: '1px 6px',
  borderRadius: 4,
  fontSize: '0.85em',
  color: '#fff',
};

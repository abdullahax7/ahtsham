import { saveBlog, deleteBlog } from './actions';
import Link from 'next/link';
import { ClientWysiwyg } from './ClientWysiwyg';
import { ClientProductCheckboxes } from './ClientProductCheckboxes';
import { getBlogBySlug } from '../../../../../lib/db/repos';

export const runtime = 'nodejs';

export default async function EditBlogPage({ params }: { params: { slug: string } }) {
  const isNew = params.slug === 'new';
  let blog: any = null;

  if (!isNew) {
    blog = await getBlogBySlug(params.slug);
    if (!blog) {
      return <div style={{ color: '#fff' }}>Blog not found.</div>;
    }
  }

  const staticProducts = [
    { sku: 'shared', name: 'Shared Hosting', category: 'Hosting' },
    { sku: 'reseller', name: 'Reseller Hosting', category: 'Hosting' },
    { sku: 'vps', name: 'VPS Hosting', category: 'Hosting' },
    { sku: 'dedicated', name: 'Dedicated Server', category: 'Hosting' },
    { sku: 'cpanel', name: 'cPanel License', category: 'Licenses' },
    { sku: 'cloudlinux', name: 'Cloudlinux License', category: 'Licenses' },
    { sku: 'directadmin', name: 'DirectAdmin License', category: 'Licenses' },
    { sku: 'virtualizor', name: 'Virtualizor License', category: 'Licenses' },
    { sku: 'whmsonic', name: 'WHMSonic License', category: 'Licenses' },
    { sku: 'whmreseller', name: 'WHMReseller License', category: 'Licenses' },
    { sku: 'dareseller', name: 'DAReseller License', category: 'Licenses' },
    { sku: 'jetbackup', name: 'JetBackup License', category: 'Licenses' },
    { sku: 'plesk', name: 'Plesk License', category: 'Licenses' },
    { sku: 'softaculous', name: 'Softaculous License', category: 'Licenses' },
    { sku: 'sitepad', name: 'SitePad License', category: 'Licenses' },
    { sku: 'litespeed', name: 'LiteSpeed License', category: 'Licenses' },
    { sku: 'imunify360', name: 'Imunify360 License', category: 'Licenses' },
    { sku: 'cpguard', name: 'CPGuard License', category: 'Licenses' },
    { sku: 'osm', name: 'OSM License', category: 'Licenses' }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <Link href="/admin/blogs" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '8px', display: 'inline-block' }}>&larr; Back to Blogs</Link>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '8px', color: '#fff' }}>
            {isNew ? 'Create New Post' : `Edit: ${blog.title}`}
          </h1>
        </div>
        {!isNew && (
          <form action={deleteBlog}>
            <input type="hidden" name="slug" value={blog.slug} />
            <button type="submit" style={{ background: '#ef4444', color: '#fff', padding: '10px 16px', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
              Delete Post
            </button>
          </form>
        )}
      </div>

      <div style={{ background: '#111218', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
        <form action={saveBlog} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <input type="hidden" name="isNew" value={String(isNew)} />
          <input type="hidden" name="originalSlug" value={blog?.slug || ''} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', color: '#fff', fontWeight: 600, marginBottom: '8px' }}>Title</label>
              <input name="title" required defaultValue={blog?.title || ''} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '12px', borderRadius: '8px', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#fff', fontWeight: 600, marginBottom: '8px' }}>Slug (URL)</label>
              <input name="slug" required defaultValue={blog?.slug || ''} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '12px', borderRadius: '8px', outline: 'none' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', color: '#fff', fontWeight: 600, marginBottom: '8px' }}>Date</label>
              <input name="date" required defaultValue={blog?.date || ''} placeholder="March 20, 2026" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '12px', borderRadius: '8px', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#fff', fontWeight: 600, marginBottom: '8px' }}>Tag / Category</label>
              <input name="tag" required defaultValue={blog?.tag || ''} placeholder="Hosting Tips" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '12px', borderRadius: '8px', outline: 'none' }} />
            </div>
          </div>

          <div>
            <textarea name="excerpt" required rows={2} defaultValue={blog?.excerpt || ''} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '12px', borderRadius: '8px', outline: 'none', resize: 'vertical' }} />
          </div>

          <div>
            <label style={{ display: 'block', color: '#fff', fontWeight: 600, marginBottom: '8px' }}>Featured Image URL</label>
            <input name="featured_image" defaultValue={blog?.featured_image || ''} placeholder="https://example.com/image.jpg" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '12px', borderRadius: '8px', outline: 'none' }} />
          </div>

          <div>
            <label style={{ display: 'block', color: '#fff', fontWeight: 600, marginBottom: '8px' }}>Content</label>
            <ClientWysiwyg initialContent={blog?.content || ''} />
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '16px 0' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', color: '#fff', fontWeight: 600, marginBottom: '8px' }}>YouTube ID (Optional)</label>
              <input name="youtube_id" defaultValue={blog?.youtube_id || ''} placeholder="dQw4w9WgXcQ" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '12px', borderRadius: '8px', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#fff', fontWeight: 600, marginBottom: '8px' }}>Highlight Note Text (Optional)</label>
              <input name="note_text" defaultValue={blog?.note_text || ''} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '12px', borderRadius: '8px', outline: 'none' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', color: '#fff', fontWeight: 600, marginBottom: '8px' }}>Related Promoted Products</label>
            <ClientProductCheckboxes allProducts={staticProducts} initialSelectedSkus={blog?.related_products || []} />
          </div>

          <div style={{ paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" style={{ background: '#f85727', color: '#fff', padding: '12px 32px', borderRadius: '8px', border: 'none', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', transition: 'background 0.2s' }}>
              Save Blog Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

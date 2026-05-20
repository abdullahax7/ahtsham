import { listAllTestimonials } from '../../../lib/db/repos';
import { saveTestimonial, deleteTestimonialAction } from '../actions-content';

export const runtime = 'nodejs';
export const revalidate = 0;

export default async function TestimonialsAdminPage() {
  const items = await listAllTestimonials();
  return (
    <div>
      <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Testimonials</h1>
      <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>Manage the testimonials shown on the homepage.</p>

      <div className="admin-card" style={{ marginBottom: 24 }}>
        <h2 style={{ color: '#fff', fontWeight: 700, marginBottom: 16 }}>Add Testimonial</h2>
        <form action={saveTestimonial} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px', gap: 12 }}>
            <input className="admin-input" name="author" placeholder="Author" required />
            <input className="admin-input" name="role" placeholder="Role" />
            <input className="admin-input" name="stars" type="number" min={1} max={5} defaultValue={5} />
          </div>
          <textarea className="admin-textarea" name="text" placeholder="Review text" required rows={3} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: 12 }}>
            <input className="admin-input" name="avatar" placeholder="Avatar URL (optional)" />
            <input className="admin-input" name="sort_order" type="number" defaultValue={items.length} title="Sort order" />
          </div>
          <button type="submit" className="btn-accent" style={{ alignSelf: 'flex-start' }}>Add Testimonial</button>
        </form>
      </div>

      <div className="admin-card">
        <h2 style={{ color: '#fff', fontWeight: 700, marginBottom: 16 }}>Existing ({items.length})</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {items.map((t) => (
            <details key={t.id} style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 16, background: 'rgba(255,255,255,0.02)' }}>
              <summary style={{ cursor: 'pointer', color: '#fff', fontWeight: 700 }}>
                {t.author} — <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>{t.role}</span>
                {!t.is_visible && <span style={{ marginLeft: 12, color: '#ef4444', fontSize: '0.8rem' }}>(hidden)</span>}
              </summary>
              <form action={saveTestimonial} style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input type="hidden" name="id" value={t.id} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px', gap: 12 }}>
                  <input className="admin-input" name="author" defaultValue={t.author} required />
                  <input className="admin-input" name="role" defaultValue={t.role} />
                  <input className="admin-input" name="stars" type="number" min={1} max={5} defaultValue={t.stars} />
                </div>
                <textarea className="admin-textarea" name="text" defaultValue={t.text} required rows={3} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px auto', gap: 12, alignItems: 'center' }}>
                  <input className="admin-input" name="avatar" defaultValue={t.avatar ?? ''} placeholder="Avatar URL" />
                  <input className="admin-input" name="sort_order" type="number" defaultValue={t.sort_order} />
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fff' }}>
                    <input type="checkbox" name="hide" defaultChecked={!t.is_visible} /> Hide
                  </label>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button type="submit" className="btn-accent">Save</button>
                </div>
              </form>
              <form action={deleteTestimonialAction} style={{ marginTop: 12 }}>
                <input type="hidden" name="id" value={t.id} />
                <button type="submit" className="btn-danger">Delete</button>
              </form>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

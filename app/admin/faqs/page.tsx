import { listAllFaqs } from '../../../lib/db/repos';
import { saveFaq, deleteFaqAction } from '../actions-content';

export const runtime = 'nodejs';
export const revalidate = 0;

export default async function FaqsAdminPage() {
  const items = await listAllFaqs();
  return (
    <div>
      <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>FAQs</h1>
      <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>Manage the FAQ section on the homepage.</p>

      <div className="admin-card" style={{ marginBottom: 24 }}>
        <h2 style={{ color: '#fff', fontWeight: 700, marginBottom: 16 }}>Add FAQ</h2>
        <form action={saveFaq} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input className="admin-input" name="question" placeholder="Question" required />
          <textarea className="admin-textarea" name="answer" placeholder="Answer" required rows={3} />
          <div style={{ display: 'grid', gridTemplateColumns: '120px auto', gap: 12, alignItems: 'center' }}>
            <input className="admin-input" name="sort_order" type="number" defaultValue={items.length} />
            <button type="submit" className="btn-accent" style={{ justifySelf: 'start' }}>Add FAQ</button>
          </div>
        </form>
      </div>

      <div className="admin-card">
        <h2 style={{ color: '#fff', fontWeight: 700, marginBottom: 16 }}>Existing ({items.length})</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {items.map((f) => (
            <details key={f.id} style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 16, background: 'rgba(255,255,255,0.02)' }}>
              <summary style={{ cursor: 'pointer', color: '#fff', fontWeight: 700 }}>
                {f.question}
                {!f.is_visible && <span style={{ marginLeft: 12, color: '#ef4444', fontSize: '0.8rem' }}>(hidden)</span>}
              </summary>
              <form action={saveFaq} style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input type="hidden" name="id" value={f.id} />
                <input className="admin-input" name="question" defaultValue={f.question} required />
                <textarea className="admin-textarea" name="answer" defaultValue={f.answer} required rows={3} />
                <div style={{ display: 'grid', gridTemplateColumns: '120px auto auto', gap: 12, alignItems: 'center' }}>
                  <input className="admin-input" name="sort_order" type="number" defaultValue={f.sort_order} />
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fff' }}>
                    <input type="checkbox" name="hide" defaultChecked={!f.is_visible} /> Hide
                  </label>
                  <button type="submit" className="btn-accent">Save</button>
                </div>
              </form>
              <form action={deleteFaqAction} style={{ marginTop: 12 }}>
                <input type="hidden" name="id" value={f.id} />
                <button type="submit" className="btn-danger">Delete</button>
              </form>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

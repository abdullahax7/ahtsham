import { listAllPaymentMethods } from '../../../lib/db/repos';
import { savePaymentMethod, deletePaymentMethodAction } from '../actions-content';

export const runtime = 'nodejs';
export const revalidate = 0;

export default async function PaymentsAdminPage() {
  const items = await listAllPaymentMethods();
  return (
    <div>
      <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Payment Methods</h1>
      <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>Manage the payment hubs shown in the footer and on the payments section.</p>

      <div className="admin-card" style={{ marginBottom: 24 }}>
        <h2 style={{ color: '#fff', fontWeight: 700, marginBottom: 16 }}>Add Method</h2>
        <form action={savePaymentMethod} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 100px auto', gap: 12, alignItems: 'center' }}>
          <input className="admin-input" name="name" placeholder="Name" required />
          <input className="admin-input" name="image_url" placeholder="Image URL (optional)" />
          <input className="admin-input" name="sort_order" type="number" defaultValue={items.length} />
          <button type="submit" className="btn-accent">Add</button>
        </form>
      </div>

      <div className="admin-card">
        <h2 style={{ color: '#fff', fontWeight: 700, marginBottom: 16 }}>Existing ({items.length})</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map((p) => (
            <form key={p.id} action={savePaymentMethod} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 100px auto auto', gap: 12, alignItems: 'center', padding: 12, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, background: 'rgba(255,255,255,0.02)' }}>
              <input type="hidden" name="id" value={p.id} />
              <input className="admin-input" name="name" defaultValue={p.name} required />
              <input className="admin-input" name="image_url" defaultValue={p.image_url ?? ''} />
              <input className="admin-input" name="sort_order" type="number" defaultValue={p.sort_order} />
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fff' }}>
                <input type="checkbox" name="hide" defaultChecked={!p.is_visible} /> Hide
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="submit" className="btn-accent" style={{ padding: '8px 14px' }}>Save</button>
              </div>
            </form>
          ))}
          {items.map((p) => (
            <form key={`del-${p.id}`} action={deletePaymentMethodAction} style={{ display: 'none' }}>
              <input type="hidden" name="id" value={p.id} />
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}

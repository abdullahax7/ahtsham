import { getHomepageStats } from '../../../lib/db/repos';
import { saveHomepageStats } from '../actions-content';

export const runtime = 'nodejs';
export const revalidate = 0;

export default async function StatsAdminPage() {
  const stats = await getHomepageStats();
  return (
    <div>
      <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Homepage Stats</h1>
      <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>Edit the counter values shown on the hero section.</p>

      <form action={saveHomepageStats} className="admin-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        <Field label="Happy Clients">
          <input className="admin-input" name="clients" type="number" defaultValue={stats.clients} />
        </Field>
        <Field label="Uptime SLA (%)">
          <input className="admin-input" name="uptime" type="number" step="0.1" defaultValue={stats.uptime} />
        </Field>
        <Field label="DMCA Ignored (%)">
          <input className="admin-input" name="support" type="number" defaultValue={stats.support} />
        </Field>
        <Field label="Active Licenses">
          <input className="admin-input" name="locations" type="number" defaultValue={stats.locations} />
        </Field>
        <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn-accent">Save Stats</button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', color: '#fff', fontWeight: 600, marginBottom: 8 }}>{label}</label>
      {children}
    </div>
  );
}

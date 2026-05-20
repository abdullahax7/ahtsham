import { getAllSiteSettings } from '../../../lib/db/repos';
import { saveSiteSettings } from '../actions-content';

export const runtime = 'nodejs';
export const revalidate = 0;

type Group = { title: string; description?: string; fields: { key: string; label: string; type?: 'text' | 'textarea' | 'image' | 'url' }[] };

const GROUPS: Group[] = [
  {
    title: 'Branding',
    description: 'Logo and global site identity.',
    fields: [
      { key: 'site_name', label: 'Site Name' },
      { key: 'logo_url', label: 'Logo URL', type: 'url' },
    ],
  },
  {
    title: 'Hero Section',
    fields: [
      { key: 'hero_title_pre', label: 'Hero Title (Line 1)' },
      { key: 'hero_title_grad', label: 'Hero Title (Highlighted)' },
      { key: 'hero_title_post', label: 'Hero Title (Line 3)' },
      { key: 'hero_subtitle', label: 'Hero Subtitle', type: 'textarea' },
    ],
  },
  {
    title: 'CEO Promise',
    fields: [
      { key: 'ceo_promise_label', label: 'Section Label' },
      { key: 'ceo_promise_title', label: 'Title' },
      { key: 'ceo_promise_text', label: 'Body Text', type: 'textarea' },
      { key: 'ceo_photo', label: 'CEO Photo URL', type: 'url' },
    ],
  },
  {
    title: 'Contact / WhatsApp',
    fields: [
      { key: 'whatsapp_number', label: 'WhatsApp Number (no +)' },
      { key: 'whatsapp_default_message', label: 'Default WhatsApp Message', type: 'textarea' },
      { key: 'support_hours', label: 'Support Hours' },
    ],
  },
  {
    title: 'Footer',
    fields: [
      { key: 'footer_about', label: 'About Blurb', type: 'textarea' },
      { key: 'footer_copyright_suffix', label: 'Copyright Suffix' },
    ],
  },
];

export default async function SiteSettingsAdminPage() {
  const map = await getAllSiteSettings();

  return (
    <div>
      <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Site Settings</h1>
      <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>Edit global copy and links that appear across the site.</p>

      <form action={saveSiteSettings} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {GROUPS.map((g) => (
          <div key={g.title} className="admin-card">
            <h2 style={{ color: '#fff', fontWeight: 700, marginBottom: 4 }}>{g.title}</h2>
            {g.description && <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 16, fontSize: '0.9rem' }}>{g.description}</p>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {g.fields.map((f) => {
                const val = map.get(f.key)?.value ?? '';
                if (f.type === 'textarea') {
                  return (
                    <div key={f.key}>
                      <label style={{ display: 'block', color: '#fff', fontWeight: 600, marginBottom: 8 }}>{f.label}</label>
                      <textarea className="admin-textarea" name={`s_${f.key}`} defaultValue={val} rows={4} />
                    </div>
                  );
                }
                return (
                  <div key={f.key}>
                    <label style={{ display: 'block', color: '#fff', fontWeight: 600, marginBottom: 8 }}>{f.label}</label>
                    <input className="admin-input" name={`s_${f.key}`} defaultValue={val} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn-accent">Save Settings</button>
        </div>
      </form>
    </div>
  );
}

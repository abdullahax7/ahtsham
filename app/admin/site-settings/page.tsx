import { getAllSiteSettings } from '../../../lib/db/repos';
import { saveSiteSettings } from '../actions-content';

export const runtime = 'nodejs';
export const revalidate = 0;

type Group = { title: string; description?: string; fields: { key: string; label: string; type?: 'text' | 'textarea' | 'image' | 'url' | 'html' }[] };

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
    title: 'Status bar & Status Page',
    description: 'Top status strip shown above the header, and the iframe used on the /status page. The status bar is clickable and points to the link below.',
    fields: [
      { key: 'status_bar_text', label: 'Status Text' },
      { key: 'status_bar_uptime', label: 'Uptime Text' },
      { key: 'status_bar_servers', label: 'Servers Text' },
      { key: 'status_page_link', label: 'Status Bar Link (where clicking the top bar takes visitors — usually /status or your external status page URL)', type: 'url' },
      { key: 'status_iframe_url', label: 'Status Page Iframe URL (embedded on /status)', type: 'url' },
    ],
  },
  {
    title: 'Legal — Privacy Policy',
    description: 'Content for /privacy. The body field accepts HTML — paste copy, headings, lists, links. Headings (h2, h3) are styled automatically.',
    fields: [
      { key: 'privacy_intro', label: 'Hero Intro Paragraph', type: 'textarea' },
      { key: 'privacy_last_updated', label: 'Last Updated Label' },
      { key: 'privacy_html', label: 'Privacy Policy Body (HTML)', type: 'html' },
    ],
  },
  {
    title: 'Legal — Terms & Conditions',
    description: 'Content for /terms.',
    fields: [
      { key: 'terms_intro', label: 'Hero Intro Paragraph', type: 'textarea' },
      { key: 'terms_last_updated', label: 'Last Updated Label' },
      { key: 'terms_html', label: 'Terms Body (HTML)', type: 'html' },
    ],
  },
  {
    title: 'Legal — Fair Usage Policy',
    description: 'Content for /fair-usage-policy.',
    fields: [
      { key: 'fair_usage_intro', label: 'Hero Intro Paragraph', type: 'textarea' },
      { key: 'fair_usage_last_updated', label: 'Last Updated Label' },
      { key: 'fair_usage_html', label: 'Fair Usage Body (HTML)', type: 'html' },
    ],
  },
  {
    title: 'Homepage search & hero CTA',
    fields: [
      { key: 'search_placeholder', label: 'Search Placeholder' },
      { key: 'hero_cta_label', label: 'Hero CTA Button Label' },
    ],
  },
  {
    title: 'Homepage — Featured Section',
    description: 'The "DMCA Ignored Hostings & Cheap Shared Licenses" block and its three product cards.',
    fields: [
      { key: 'featured_section_label', label: 'Section Label' },
      { key: 'featured_section_title', label: 'Section Title' },
      { key: 'featured_section_desc', label: 'Section Description', type: 'textarea' },
      { key: 'shared_card_tag', label: 'Shared Hosting Card — Tag' },
      { key: 'shared_card_title', label: 'Shared Hosting Card — Title' },
      { key: 'shared_card_desc', label: 'Shared Hosting Card — Description', type: 'textarea' },
      { key: 'reseller_card_tag', label: 'Reseller Hosting Card — Tag' },
      { key: 'reseller_card_title', label: 'Reseller Hosting Card — Title' },
      { key: 'reseller_card_desc', label: 'Reseller Hosting Card — Description', type: 'textarea' },
      { key: 'licenses_card_tag', label: 'Licenses Card — Tag' },
      { key: 'licenses_card_title', label: 'Licenses Card — Title' },
      { key: 'licenses_card_desc', label: 'Licenses Card — Description', type: 'textarea' },
    ],
  },
  {
    title: 'Homepage — Dedicated / DMCA',
    description: 'Dedicated servers ad banner and warning notices. HTML allowed in the two warning blocks.',
    fields: [
      { key: 'dedicated_section_label', label: 'Section Label' },
      { key: 'dedicated_section_title', label: 'Section Title' },
      { key: 'dedicated_section_desc', label: 'Section Description', type: 'textarea' },
      { key: 'custom_packages_text', label: 'Custom Packages Notice (HTML)', type: 'html' },
      { key: 'prohibited_text', label: 'Strictly Prohibited Notice (HTML)', type: 'html' },
    ],
  },
  {
    title: 'Homepage — Process',
    fields: [
      { key: 'process_section_label', label: 'Section Label' },
      { key: 'process_section_title', label: 'Section Title' },
      { key: 'process_section_desc', label: 'Section Description', type: 'textarea' },
    ],
  },
  {
    title: 'Homepage — Tech',
    fields: [
      { key: 'tech_section_label', label: 'Section Label' },
      { key: 'tech_section_title', label: 'Section Title' },
    ],
  },
  {
    title: 'Homepage — Final CTA',
    description: 'The bottom "Ready to Launch?" call-to-action band.',
    fields: [
      { key: 'final_cta_title', label: 'Title' },
      { key: 'final_cta_subtitle', label: 'Subtitle', type: 'textarea' },
      { key: 'final_cta_primary_label', label: 'Primary Button Label' },
      { key: 'final_cta_secondary_label', label: 'Secondary Button Label' },
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
  {
    title: 'SEO / Verification',
    description: 'Google Search Console verification. Paste either just the token (e.g. "abc123...") or the full <meta> tag Google gives you — the system will extract the token automatically. Renders on every page as <meta name="google-site-verification" content="…" /> in the document head.',
    fields: [
      { key: 'google_site_verification', label: 'Google Site Verification Token' },
    ],
  },
];

export default async function SiteSettingsAdminPage() {
  const map = await getAllSiteSettings();
  // map is a plain Record<string, { value, type, updated_at }>.

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
                const val = map[f.key]?.value ?? '';
                if (f.type === 'textarea' || f.type === 'html') {
                  return (
                    <div key={f.key}>
                      <label style={{ display: 'block', color: '#fff', fontWeight: 600, marginBottom: 8 }}>{f.label}</label>
                      <textarea className="admin-textarea" name={`s_${f.key}`} defaultValue={val} rows={f.type === 'html' ? 6 : 4} />
                      {f.type === 'html' && (
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginTop: 4 }}>
                          HTML is rendered as-is on the homepage. Edit carefully.
                        </p>
                      )}
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

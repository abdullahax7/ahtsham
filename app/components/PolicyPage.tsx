import Header from './Header';
import Footer from './Footer';
import HeroParticles from './HeroParticles';
import PolicySidebar from './PolicySidebar';

type Props = {
  title: string;
  intro?: string;
  lastUpdated?: string;
  html: string;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/&[a-z]+;/g, ' ')
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

// Walk through every <h2> in the body HTML, give it an id, and collect the
// inner text so we can render a floating sidebar table of contents on the
// legal pages. Done server-side so the markup stays cacheable.
function injectHeadingIds(html: string): { html: string; toc: { id: string; text: string }[] } {
  const toc: { id: string; text: string }[] = [];
  const seen = new Map<string, number>();

  const rewritten = html.replace(/<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/gi, (_match, attrs: string | undefined, inner: string) => {
    const text = inner.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    if (!text) return _match;

    let base = slugify(text) || `section-${toc.length + 1}`;
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    const id = n === 0 ? base : `${base}-${n + 1}`;

    toc.push({ id, text });

    // If author already set an id attribute, preserve it instead of overriding.
    const existingId = attrs && /id\s*=\s*["'][^"']+["']/i.test(attrs);
    if (existingId) {
      const m = attrs!.match(/id\s*=\s*["']([^"']+)["']/i);
      if (m) {
        toc[toc.length - 1].id = m[1];
        return `<h2${attrs}>${inner}</h2>`;
      }
    }

    const extra = attrs ?? '';
    return `<h2${extra} id="${id}">${inner}</h2>`;
  });

  return { html: rewritten, toc };
}

// Server component shared by /privacy, /terms, /fair-usage-policy. The page
// body is rendered from admin-editable HTML stored in site_settings, while the
// surrounding chrome (hero, header, footer) stays consistent.
export default function PolicyPage({ title, intro, lastUpdated, html }: Props) {
  const { html: bodyHtml, toc } = injectHeadingIds(html ?? '');

  return (
    <main style={{ background: '#020617', color: '#f8fafc', minHeight: '100vh' }}>
      <Header />

      <section className="page-hero">
        <HeroParticles glowColor="rgba(59, 130, 246, 0.4)" />
        <div className="page-hero-content">
          <h1 style={{ marginBottom: '24px' }}>{title}</h1>
          {intro && (
            <p style={{ fontSize: '1.2rem', lineHeight: 1.6, maxWidth: '1000px', margin: '0 auto', fontWeight: 500, color: '#e2e8f0' }}>
              {intro}
            </p>
          )}
          {lastUpdated && (
            <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span style={{ opacity: 0.6 }}>Last Updated:</span>
              <span style={{ color: '#fff', fontWeight: 600, padding: '4px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                {lastUpdated}
              </span>
            </div>
          )}
        </div>
      </section>

      <section style={{ padding: '60px 0 140px' }}>
        <div className="policy-layout">
          <PolicySidebar items={toc} />
          <div className="policy-content">
            <div
              className="policy-body"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .policy-layout {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          gap: 48px;
          align-items: flex-start;
        }
        .policy-content {
          flex: 1;
          min-width: 0;
          max-width: 820px;
        }
        @media (max-width: 1024px) {
          .policy-layout {
            flex-direction: column;
          }
          .policy-sidebar { display: none !important; }
        }
        .policy-body { color: #cbd5e1; line-height: 1.8; font-size: 1.05rem; }
        .policy-body h1, .policy-body h2, .policy-body h3 { color: #fff; font-weight: 800; }
        .policy-body h2 { font-size: 1.6rem; margin: 48px 0 16px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.06); scroll-margin-top: 110px; }
        .policy-body h2:first-of-type { border-top: none; padding-top: 0; margin-top: 0; }
        .policy-body h3 { font-size: 1.2rem; margin: 28px 0 12px; }
        .policy-body p { margin: 0 0 16px; }
        .policy-body ul, .policy-body ol { margin: 0 0 16px 24px; padding: 0; }
        .policy-body li { margin-bottom: 8px; }
        .policy-body strong { color: #fff; font-weight: 700; }
        .policy-body a { color: #3b82f6; text-decoration: underline; }
        .policy-body a:hover { color: #60a5fa; }
        .policy-body code { background: rgba(255,255,255,0.06); padding: 2px 8px; border-radius: 6px; font-size: 0.95em; }
      ` }} />

      <Footer />
    </main>
  );
}

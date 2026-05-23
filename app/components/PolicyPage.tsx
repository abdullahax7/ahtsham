import Header from './Header';
import Footer from './Footer';
import HeroParticles from './HeroParticles';
import PolicySidebar from './PolicySidebar';
import {
  Cpu, HardDrive, Wifi, Mail, AlertTriangle, Info,
  Shield, Lock, FileText, Share2, Cookie, UserCheck,
  Scale, CreditCard, User, Ban, Handshake, RefreshCw,
  Server, type LucideIcon,
} from 'lucide-react';

type Props = {
  title: string;
  intro?: string;
  lastUpdated?: string;
  html: string;
};

type Section = {
  id: string;
  title: string;
  contentHtml: string;
  flavor: 'default' | 'danger';
  Icon: LucideIcon;
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

// Pick a topic-appropriate icon from the section title. Falls back to Info so
// any unmatched section still gets a visual anchor instead of an empty slot.
function iconForTitle(title: string): LucideIcon {
  const t = title.toLowerCase();
  if (/cpu|memor|ram|process/.test(t)) return Cpu;
  if (/inode|disk|storage|file/.test(t)) return HardDrive;
  if (/bandwidth|network|traffic/.test(t)) return Wifi;
  if (/email|mail|smtp|messag/.test(t)) return Mail;
  if (/prohibit|forbid|not allowed|illegal|ban/.test(t)) return Ban;
  if (/exceed|violat|suspend|warning|happens/.test(t)) return AlertTriangle;
  if (/cookie/.test(t)) return Cookie;
  if (/security|protect|encrypt|safeguard/.test(t)) return Lock;
  if (/shar|disclos|third[- ]?part/.test(t)) return Share2;
  if (/right|access|opt[ -]?out|consent/.test(t)) return UserCheck;
  if (/payment|billing|refund|charge|fee/.test(t)) return CreditCard;
  if (/acceptance|agreement|accept/.test(t)) return Handshake;
  if (/govern|jurisdiction|law|legal/.test(t)) return Scale;
  if (/contact|reach|support/.test(t)) return Mail;
  if (/account|user|customer/.test(t)) return User;
  if (/change|update|revision/.test(t)) return RefreshCw;
  if (/warranty|liability|disclaimer/.test(t)) return Shield;
  if (/server|infrastructure|host/.test(t)) return Server;
  if (/collect|information|data we/.test(t)) return FileText;
  if (/what is|overview|introduction|about|fair usage/.test(t)) return Info;
  return Info;
}

// Split admin-edited HTML into discrete sections at every <h2>. Anything before
// the first <h2> becomes an unnumbered preamble that flows above the timeline.
function splitSections(html: string): Section[] {
  if (!html) return [];

  const re = /<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/gi;
  const matches: { start: number; end: number; title: string; idFromAttr: string | null }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const title = (m[2] || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    if (!title) continue;
    const attrs = m[1] ?? '';
    const idMatch = attrs.match(/id\s*=\s*["']([^"']+)["']/i);
    matches.push({
      start: m.index,
      end: m.index + m[0].length,
      title,
      idFromAttr: idMatch ? idMatch[1] : null,
    });
  }

  if (matches.length === 0) {
    return [{ id: 'content', title: '', contentHtml: html, flavor: 'default', Icon: Info }];
  }

  const sections: Section[] = [];
  const preamble = html.slice(0, matches[0].start).trim();
  if (preamble) {
    sections.push({ id: 'overview', title: '', contentHtml: preamble, flavor: 'default', Icon: Info });
  }

  const seen = new Map<string, number>();
  for (let i = 0; i < matches.length; i++) {
    const cur = matches[i];
    const next = matches[i + 1];
    const body = html.slice(cur.end, next ? next.start : html.length).trim();

    let id = cur.idFromAttr || slugify(cur.title) || `section-${i + 1}`;
    if (!cur.idFromAttr) {
      const n = seen.get(id) ?? 0;
      seen.set(id, n + 1);
      if (n > 0) id = `${id}-${n + 1}`;
    }

    const lower = (cur.title + ' ' + body).toLowerCase();
    const flavor: Section['flavor'] =
      lower.includes('strictly prohibited') ||
      lower.includes('prohibited content') ||
      lower.includes('not allowed')
        ? 'danger'
        : 'default';

    sections.push({
      id,
      title: cur.title,
      contentHtml: body,
      flavor,
      Icon: iconForTitle(cur.title),
    });
  }

  return sections;
}

export default function PolicyPage({ title, intro, lastUpdated, html }: Props) {
  const sections = splitSections(html ?? '');
  const tocItems = sections.filter((s) => s.title).map((s) => ({ id: s.id, text: s.title }));
  let numbered = 0;

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
          <PolicySidebar items={tocItems} />

          <div className="policy-content">
            {sections.map((s) => {
              const isTitled = !!s.title;
              const idx = isTitled ? ++numbered : 0;
              const Icon = s.Icon;
              return (
                <article
                  key={s.id}
                  id={s.id}
                  className={`policy-section policy-section--${s.flavor}${isTitled ? '' : ' policy-section--plain'}`}
                >
                  <div className="policy-section-marker" aria-hidden>
                    {isTitled && (
                      <span className="policy-section-num">{String(idx).padStart(2, '0')}</span>
                    )}
                  </div>
                  <div className="policy-section-main">
                    {isTitled && (
                      <header className="policy-section-head">
                        <span className="policy-section-icon">
                          <Icon size={18} strokeWidth={2.2} />
                        </span>
                        <h2 className="policy-section-title">{s.title}</h2>
                      </header>
                    )}
                    <div
                      className="policy-section-body"
                      dangerouslySetInnerHTML={{ __html: s.contentHtml }}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .policy-layout {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          gap: 56px;
          /* Do NOT use align-items: flex-start — that shrinks the sidebar
             to its content height and breaks position: sticky inside it. */
          align-items: stretch;
        }
        .policy-content {
          position: relative;
          flex: 1;
          min-width: 0;
          max-width: 820px;
          display: flex;
          flex-direction: column;
        }
        /* Continuous vertical rail that visually threads every numbered node. */
        .policy-content::before {
          content: '';
          position: absolute;
          left: 29px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg,
            rgba(96, 165, 250, 0) 0%,
            rgba(96, 165, 250, 0) 3%,
            rgba(96, 165, 250, 0.5) 10%,
            rgba(96, 165, 250, 0.18) 92%,
            rgba(96, 165, 250, 0) 100%);
          pointer-events: none;
        }
        @media (max-width: 1024px) {
          .policy-layout { flex-direction: column; }
          .policy-sidebar { display: none !important; }
        }

        .policy-section {
          position: relative;
          display: grid;
          grid-template-columns: 80px 1fr;
          column-gap: 26px;
          padding: 28px 0 28px;
          scroll-margin-top: 110px;
        }
        .policy-section + .policy-section { padding-top: 8px; }

        .policy-section-marker {
          grid-column: 1;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 4px;
        }
        .policy-section-num {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #050b1d;
          border: 1px solid rgba(96, 165, 250, 0.35);
          color: #93c5fd;
          font-weight: 800;
          font-size: 1.05rem;
          letter-spacing: 0.5px;
          font-variant-numeric: tabular-nums;
          box-shadow:
            0 0 0 6px #020617,
            0 0 24px -6px rgba(96, 165, 250, 0.4),
            inset 0 0 0 1px rgba(255, 255, 255, 0.03);
          transition: border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
        }
        .policy-section:hover .policy-section-num {
          border-color: rgba(96, 165, 250, 0.75);
          color: #fff;
          transform: scale(1.04);
          box-shadow:
            0 0 0 6px #020617,
            0 0 32px -4px rgba(96, 165, 250, 0.65),
            inset 0 0 0 1px rgba(255, 255, 255, 0.08);
        }
        .policy-section--danger .policy-section-num {
          border-color: rgba(248, 113, 113, 0.45);
          color: #fca5a5;
          box-shadow:
            0 0 0 6px #020617,
            0 0 24px -6px rgba(248, 113, 113, 0.45);
        }
        .policy-section--danger:hover .policy-section-num {
          border-color: rgba(248, 113, 113, 0.8);
          color: #fff;
          box-shadow:
            0 0 0 6px #020617,
            0 0 32px -4px rgba(248, 113, 113, 0.6);
        }

        .policy-section-main { grid-column: 2; min-width: 0; }

        /* Preamble (anything before the first h2) skips the number but keeps
           the same column geometry so the rail stays straight. */
        .policy-section--plain .policy-section-num { display: none; }

        .policy-section-head {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
        }
        .policy-section-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(96, 165, 250, 0.18), rgba(59, 130, 246, 0.04));
          border: 1px solid rgba(96, 165, 250, 0.22);
          color: #93c5fd;
          flex-shrink: 0;
        }
        .policy-section--danger .policy-section-icon {
          background: linear-gradient(135deg, rgba(248, 113, 113, 0.2), rgba(220, 38, 38, 0.05));
          border-color: rgba(248, 113, 113, 0.3);
          color: #fca5a5;
        }
        .policy-section-title {
          margin: 0;
          font-size: 1.6rem;
          line-height: 1.2;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.015em;
        }

        /* Body typography — restyles whatever the admin pasted as HTML. */
        .policy-section-body { color: #cbd5e1; line-height: 1.75; font-size: 1.02rem; }
        .policy-section-body > *:first-child { margin-top: 0; }
        .policy-section-body > *:last-child  { margin-bottom: 0; }
        /* Lead paragraph treatment for the first paragraph of each section. */
        .policy-section-body > p:first-child {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #e2e8f0;
          margin-bottom: 18px;
        }
        .policy-section-body p { margin: 0 0 16px; }
        .policy-section-body h3 {
          color: #fff;
          font-size: 1.1rem;
          font-weight: 700;
          margin: 28px 0 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .policy-section-body h3::before {
          content: '';
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #60a5fa;
          box-shadow: 0 0 12px rgba(96, 165, 250, 0.6);
          flex-shrink: 0;
        }
        .policy-section--danger .policy-section-body h3::before {
          background: #f87171;
          box-shadow: 0 0 12px rgba(248, 113, 113, 0.6);
        }
        .policy-section-body ul,
        .policy-section-body ol {
          margin: 0 0 18px 0;
          padding: 0;
          list-style: none;
        }
        .policy-section-body li {
          position: relative;
          padding: 4px 0 4px 26px;
        }
        .policy-section-body ul li::before {
          content: '';
          position: absolute;
          left: 6px;
          top: 14px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #60a5fa;
          box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.12);
        }
        .policy-section--danger .policy-section-body ul li::before {
          background: #f87171;
          box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.12);
        }
        .policy-section-body ol { counter-reset: olcount; }
        .policy-section-body ol li { counter-increment: olcount; }
        .policy-section-body ol li::before {
          content: counter(olcount, decimal-leading-zero);
          position: absolute;
          left: 0;
          top: 5px;
          font-size: 0.72rem;
          font-weight: 800;
          color: #60a5fa;
          letter-spacing: 0.5px;
          font-variant-numeric: tabular-nums;
        }
        .policy-section--danger .policy-section-body ol li::before { color: #fca5a5; }
        .policy-section-body strong { color: #fff; font-weight: 700; }
        .policy-section--danger .policy-section-body strong { color: #fecaca; }
        .policy-section-body em { color: #e2e8f0; font-style: italic; }
        .policy-section-body a {
          color: #93c5fd;
          text-decoration: none;
          border-bottom: 1px solid rgba(96, 165, 250, 0.4);
          transition: color 0.15s ease, border-color 0.15s ease;
        }
        .policy-section-body a:hover { color: #fff; border-bottom-color: #fff; }
        .policy-section-body code {
          background: rgba(255, 255, 255, 0.06);
          padding: 1px 7px;
          border-radius: 5px;
          font-size: 0.92em;
          color: #f1f5f9;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .policy-section-body blockquote {
          margin: 18px 0;
          padding: 14px 20px;
          border-left: 2px solid #60a5fa;
          background: rgba(96, 165, 250, 0.05);
          border-radius: 0 10px 10px 0;
          color: #e2e8f0;
        }

        @media (max-width: 640px) {
          .policy-section { grid-template-columns: 56px 1fr; column-gap: 18px; padding: 22px 0 22px; }
          .policy-section-num {
            width: 44px;
            height: 44px;
            font-size: 0.92rem;
            box-shadow: 0 0 0 5px #020617, 0 0 18px -4px rgba(96, 165, 250, 0.35);
          }
          .policy-section-title { font-size: 1.25rem; }
          .policy-content::before { left: 21px; }
        }
      ` }} />

      <Footer />
    </main>
  );
}

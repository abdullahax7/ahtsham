'use client';

import { useEffect, useState } from 'react';

type TocItem = { id: string; text: string };

export default function PolicySidebar({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (items.length === 0) return;

    function onScroll() {
      const offset = 140;
      let current = items[0].id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - offset <= 0) current = item.id;
      }
      setActiveId(current);

      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? Math.min(100, Math.max(0, (window.scrollY / docH) * 100)) : 0;
      setProgress(pct);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [items]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (items.length === 0) return null;

  const activeIndex = Math.max(0, items.findIndex((it) => it.id === activeId));

  return (
    <aside className="policy-sidebar" aria-label="Table of contents">
      <div className="policy-sidebar-inner">
        <div className="policy-sidebar-header">
          <div className="policy-sidebar-eyebrow">
            <span className="dot-pulse" aria-hidden />
            On this page
          </div>
          <div className="policy-sidebar-progress" aria-hidden>
            <div className="bar">
              <div className="bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="bar-label">{Math.round(progress)}%</span>
          </div>
        </div>

        <ol className="policy-sidebar-list">
          {items.map((it, idx) => {
            const isActive = it.id === activeId;
            const isPast = idx < activeIndex;
            return (
              <li key={it.id} className={isActive ? 'is-active' : isPast ? 'is-past' : ''}>
                <button type="button" onClick={() => scrollTo(it.id)}>
                  <span className="rail" aria-hidden />
                  <span className="num">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="label">{it.text}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <button type="button" className="policy-sidebar-top" onClick={scrollToTop}>
          <span aria-hidden>↑</span> Back to top
        </button>
      </div>

      <style jsx>{`
        .policy-sidebar {
          width: 300px;
          flex-shrink: 0;
          /* The actual stickiness lives on the inner element. */
        }
        .policy-sidebar-inner {
          position: sticky;
          top: 110px;
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(2, 6, 23, 0.95) 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 24px 20px;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.04) inset,
            0 24px 48px -16px rgba(0, 0, 0, 0.6);
          max-height: calc(100vh - 140px);
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
        }
        .policy-sidebar-inner::-webkit-scrollbar {
          width: 5px;
        }
        .policy-sidebar-inner::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 4px;
        }

        .policy-sidebar-header {
          padding-bottom: 18px;
          margin-bottom: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .policy-sidebar-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #94a3b8;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .dot-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #60a5fa;
          box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.7);
          animation: pulse 1.8s ease-out infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.7); }
          70% { box-shadow: 0 0 0 8px rgba(96, 165, 250, 0); }
          100% { box-shadow: 0 0 0 0 rgba(96, 165, 250, 0); }
        }

        .policy-sidebar-progress {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .bar {
          flex: 1;
          height: 4px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 999px;
          overflow: hidden;
        }
        .bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 50%, #93c5fd 100%);
          border-radius: 999px;
          transition: width 0.15s ease-out;
        }
        .bar-label {
          font-size: 0.7rem;
          font-weight: 700;
          color: #60a5fa;
          font-variant-numeric: tabular-nums;
          min-width: 32px;
          text-align: right;
        }

        .policy-sidebar-list {
          list-style: none;
          padding: 0;
          margin: 0;
          counter-reset: toc;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .policy-sidebar-list li {
          position: relative;
        }
        .policy-sidebar-list button {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 0.9rem;
          font-weight: 500;
          padding: 11px 12px 11px 14px;
          width: 100%;
          text-align: left;
          cursor: pointer;
          border-radius: 10px;
          display: grid;
          grid-template-columns: 3px 28px 1fr;
          align-items: center;
          gap: 10px;
          line-height: 1.4;
          transition: background 0.18s ease, color 0.18s ease, transform 0.18s ease;
          font-family: inherit;
          position: relative;
        }
        .policy-sidebar-list button:hover {
          background: rgba(255, 255, 255, 0.04);
          color: #fff;
        }
        .policy-sidebar-list .rail {
          width: 3px;
          height: 18px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.08);
          transition: background 0.18s ease, height 0.18s ease;
        }
        .policy-sidebar-list .num {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.5px;
          color: #64748b;
          font-variant-numeric: tabular-nums;
          transition: color 0.18s ease;
        }
        .policy-sidebar-list .label {
          font-size: 0.9rem;
        }
        .policy-sidebar-list li.is-past button {
          color: #cbd5e1;
        }
        .policy-sidebar-list li.is-past .rail {
          background: rgba(96, 165, 250, 0.4);
        }
        .policy-sidebar-list li.is-past .num {
          color: #93c5fd;
        }
        .policy-sidebar-list li.is-active button {
          background: linear-gradient(90deg, rgba(59, 130, 246, 0.14) 0%, rgba(59, 130, 246, 0) 100%);
          color: #fff;
          font-weight: 700;
        }
        .policy-sidebar-list li.is-active .rail {
          background: linear-gradient(180deg, #3b82f6, #60a5fa);
          height: 24px;
          box-shadow: 0 0 12px rgba(96, 165, 250, 0.5);
        }
        .policy-sidebar-list li.is-active .num {
          color: #60a5fa;
        }

        .policy-sidebar-top {
          margin-top: 18px;
          padding: 11px 14px;
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          color: #94a3b8;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease;
          font-family: inherit;
        }
        .policy-sidebar-top:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #fff;
          border-color: rgba(255, 255, 255, 0.12);
        }
      `}</style>
    </aside>
  );
}

'use client';

import { useEffect, useState } from 'react';

type TocItem = { id: string; text: string };

export default function PolicySidebar({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');

  useEffect(() => {
    if (items.length === 0) return;

    function onScroll() {
      const offset = 140; // header height + breathing room
      let current = items[0].id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - offset <= 0) current = item.id;
      }
      setActiveId(current);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [items]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  if (items.length === 0) return null;

  return (
    <aside className="policy-sidebar" aria-label="Table of contents">
      <div className="policy-sidebar-inner">
        <div className="policy-sidebar-label">On this page</div>
        <ul>
          {items.map((it) => (
            <li key={it.id}>
              <button
                type="button"
                onClick={() => scrollTo(it.id)}
                className={activeId === it.id ? 'is-active' : ''}
              >
                <span className="dot" aria-hidden />
                <span className="text">{it.text}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .policy-sidebar {
          width: 260px;
          flex-shrink: 0;
        }
        .policy-sidebar-inner {
          position: sticky;
          top: 110px;
          background: rgba(15, 17, 23, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 20px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
          max-height: calc(100vh - 140px);
          overflow-y: auto;
        }
        .policy-sidebar-label {
          color: #94a3b8;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        button {
          background: transparent;
          border: none;
          color: #cbd5e1;
          font-size: 0.92rem;
          font-weight: 500;
          padding: 10px 12px;
          width: 100%;
          text-align: left;
          cursor: pointer;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
          line-height: 1.4;
          transition: background 0.15s ease, color 0.15s ease;
        }
        button:hover {
          background: rgba(255, 255, 255, 0.04);
          color: #fff;
        }
        button.is-active {
          background: rgba(59, 130, 246, 0.12);
          color: #60a5fa;
          font-weight: 700;
        }
        .dot {
          flex-shrink: 0;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transition: background 0.15s ease, transform 0.15s ease;
        }
        button.is-active .dot {
          background: #60a5fa;
          transform: scale(1.4);
          box-shadow: 0 0 8px rgba(96, 165, 250, 0.6);
        }
        .text {
          flex: 1;
        }
      `}</style>
    </aside>
  );
}

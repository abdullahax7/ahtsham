'use client';

import dynamic from 'next/dynamic';
import { useState, useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false, loading: () => <p style={{color: 'var(--muted)'}}>Loading Editor...</p> });

type Tab = 'visual' | 'html';

export function ClientWysiwyg({ initialContent }: { initialContent: string }) {
  const [content, setContent] = useState(initialContent);
  const [tab, setTab] = useState<Tab>('visual');

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image', 'video', 'blockquote', 'code-block'],
      ['clean']
    ]
  }), []);

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'link', 'image', 'video', 'blockquote', 'code-block'
  ];

  const handleTabSwitch = (newTab: Tab) => {
    setTab(newTab);
  };

  return (
    <div>
      <input type="hidden" name="content" value={content} />

      {/* Tab Switcher */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <button
          type="button"
          onClick={() => handleTabSwitch('visual')}
          style={{
            padding: '10px 20px',
            background: tab === 'visual' ? '#1a1b23' : 'transparent',
            color: tab === 'visual' ? '#fff' : 'rgba(255,255,255,0.5)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderBottom: tab === 'visual' ? '1px solid #1a1b23' : '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px 0 0 0',
            cursor: 'pointer',
            fontWeight: tab === 'visual' ? 700 : 400,
            fontSize: '0.9rem',
            transition: 'all 0.15s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          Visual
        </button>
        <button
          type="button"
          onClick={() => handleTabSwitch('html')}
          style={{
            padding: '10px 20px',
            background: tab === 'html' ? '#1a1b23' : 'transparent',
            color: tab === 'html' ? '#fff' : 'rgba(255,255,255,0.5)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderLeft: 'none',
            borderBottom: tab === 'html' ? '1px solid #1a1b23' : '1px solid rgba(255,255,255,0.1)',
            borderRadius: '0 8px 0 0',
            cursor: 'pointer',
            fontWeight: tab === 'html' ? 700 : 400,
            fontSize: '0.9rem',
            transition: 'all 0.15s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          HTML
        </button>
      </div>

      {/* Visual Editor */}
      {tab === 'visual' && (
        <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '0 0 8px 8px' }}>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
          />
        </div>
      )}

      {/* HTML Editor */}
      {tab === 'html' && (
        <div style={{ position: 'relative' }}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={18}
            spellCheck={false}
            style={{
              width: '100%',
              padding: '16px',
              background: '#0d0e16',
              border: '1px solid rgba(255,255,255,0.1)',
              borderTop: 'none',
              borderRadius: '0 0 8px 8px',
              color: '#7ec8a4',
              fontSize: '0.875rem',
              fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
              lineHeight: 1.7,
              outline: 'none',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
            placeholder="<p>Write your HTML content here...</p>"
          />
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.3)',
            fontFamily: 'monospace',
            pointerEvents: 'none'
          }}>
            HTML
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .ql-toolbar {
          background: #1a1b23;
          border-color: rgba(255,255,255,0.1) !important;
          border-top: none !important;
        }
        .ql-container {
          border-radius: 0 0 8px 8px;
          border-color: rgba(255,255,255,0.1) !important;
          min-height: 300px;
          font-size: 1rem;
          color: #fff;
        }
        .ql-stroke { stroke: #e8eaed !important; }
        .ql-fill { fill: #e8eaed !important; }
        .ql-picker { color: #e8eaed !important; }
        .ql-editor p { margin-bottom: 12px; }
        .ql-editor.ql-blank::before { color: rgba(255,255,255,0.4) !important; left: 15px; }
        .ql-picker-options { background: #1a1b23 !important; border-color: rgba(255,255,255,0.1) !important; }
        .ql-picker-item { color: #e8eaed !important; }
        .ql-picker-item:hover { color: #fff !important; background: rgba(255,255,255,0.05) !important; }
      `}} />
    </div>
  );
}

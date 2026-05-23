'use client';

import { useState } from 'react';

export type CodeBlock = {
  id: string;
  name: string;
  placement: 'head' | 'body_end';
  code: string;
  enabled: boolean;
};

function newBlock(): CodeBlock {
  return {
    id: typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2, 10),
    name: 'New snippet',
    placement: 'head',
    code: '',
    enabled: true,
  };
}

export default function CustomCodeEditor({
  initialBlocks,
  saveAction,
}: {
  initialBlocks: CodeBlock[];
  saveAction: (fd: FormData) => Promise<void>;
}) {
  const [blocks, setBlocks] = useState<CodeBlock[]>(initialBlocks);

  function update(id: string, patch: Partial<CodeBlock>) {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  }
  function remove(id: string) {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  }
  function add() {
    setBlocks((prev) => [...prev, newBlock()]);
  }

  return (
    <form action={saveAction} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <input type="hidden" name="blocks" value={JSON.stringify(blocks)} />

      {blocks.length === 0 && (
        <div className="admin-card" style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '40px 20px' }}>
          No custom code snippets yet. Click <strong>Add Snippet</strong> below to add Google Analytics, Meta Pixel,
          Tag Manager, custom &lt;script&gt; or &lt;meta&gt; tags, etc.
        </div>
      )}

      {blocks.map((b) => (
        <div key={b.id} className="admin-card">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto', gap: 12, marginBottom: 12, alignItems: 'end' }}>
            <div>
              <label style={{ display: 'block', color: '#fff', fontWeight: 600, marginBottom: 8, fontSize: '0.9rem' }}>
                Name (for your reference)
              </label>
              <input
                className="admin-input"
                value={b.name}
                onChange={(e) => update(b.id, { name: e.target.value })}
                placeholder="e.g. Google Analytics"
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#fff', fontWeight: 600, marginBottom: 8, fontSize: '0.9rem' }}>
                Placement
              </label>
              <select
                className="admin-select"
                value={b.placement}
                onChange={(e) => update(b.id, { placement: e.target.value as CodeBlock['placement'] })}
              >
                <option value="head">Header (&lt;head&gt;)</option>
                <option value="body_end">Footer (before &lt;/body&gt;)</option>
              </select>
            </div>
            <button
              type="button"
              onClick={() => remove(b.id)}
              className="btn-danger"
              style={{ height: 44 }}
            >
              Delete
            </button>
          </div>

          <label style={{ display: 'block', color: '#fff', fontWeight: 600, marginBottom: 8, fontSize: '0.9rem' }}>
            HTML / Script Code
          </label>
          <textarea
            className="admin-textarea"
            value={b.code}
            onChange={(e) => update(b.id, { code: e.target.value })}
            rows={8}
            placeholder={'<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXX"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag(\'js\', new Date());\n  gtag(\'config\', \'G-XXXX\');\n</script>'}
            style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
          />

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, color: '#fff', fontWeight: 600 }}>
            <input
              type="checkbox"
              checked={b.enabled}
              onChange={(e) => update(b.id, { enabled: e.target.checked })}
            />
            Enabled (uncheck to temporarily disable without deleting)
          </label>
        </div>
      ))}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8 }}>
        <button type="button" onClick={add} className="btn-ghost">+ Add Snippet</button>
        <button type="submit" className="btn-accent">Save All Snippets</button>
      </div>
    </form>
  );
}

import { getSiteSetting } from '../../../lib/db/repos';
import { saveCustomCodeBlocks } from '../actions-content';
import CustomCodeEditor, { type CodeBlock } from './CustomCodeEditor';

export const runtime = 'nodejs';
export const revalidate = 0;

function parseBlocks(raw: string): CodeBlock[] {
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr
      .filter((b) => b && typeof b === 'object')
      .map((b: any) => ({
        id: String(b.id ?? Math.random().toString(36).slice(2)),
        name: String(b.name ?? ''),
        placement: b.placement === 'body_end' ? 'body_end' : 'head',
        code: String(b.code ?? ''),
        enabled: b.enabled !== false,
      }));
  } catch {
    return [];
  }
}

export default async function CustomCodePage() {
  const raw = await getSiteSetting('custom_code_blocks', '[]');
  const blocks = parseBlocks(raw);

  return (
    <div>
      <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Custom Header & Footer Code</h1>
      <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 32, maxWidth: 760 }}>
        Add HTML snippets (analytics, pixels, chat widgets, verification tags, custom &lt;script&gt; or &lt;style&gt;) that
        will be injected into every page on the site. Choose <strong>Header</strong> to render inside &lt;head&gt;,
        or <strong>Footer</strong> to render just before &lt;/body&gt;.
      </p>

      <CustomCodeEditor initialBlocks={blocks} saveAction={saveCustomCodeBlocks} />
    </div>
  );
}

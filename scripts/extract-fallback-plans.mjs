// One-off extraction tool: reads every product page's FALLBACK_PLANS array
// and writes the parsed JSON to lib/db/fallback-plans.json so seed.ts can
// backfill the DB. Run with: `node scripts/extract-fallback-plans.mjs`
//
// We use the TypeScript compiler to parse each file and then evaluate the
// FALLBACK_PLANS literal in an isolated VM with a minimal sandbox. The
// literal contains plain objects only — no expressions to worry about.

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const APP = path.join(ROOT, 'app');

const ENTRIES = [
  { slug: 'shared-hosting', dir: 'shared-hosting' },
  { slug: 'reseller-hosting', dir: 'reseller-hosting' },
  { slug: 'vps', dir: 'vps' },
  { slug: 'dedicated-servers', dir: 'dedicated-servers' },
  { slug: 'cpanel-license', dir: 'cpanel-license' },
  { slug: 'plesk-license', dir: 'plesk-license' },
  { slug: 'litespeed-license', dir: 'litespeed-license' },
  { slug: 'cloudlinux-license', dir: 'cloudlinux-license' },
  { slug: 'virtualizor', dir: 'virtualizor' },
  { slug: 'directadmin', dir: 'directadmin' },
  { slug: 'jetbackup', dir: 'jetbackup' },
  { slug: 'softaculous', dir: 'softaculous' },
  { slug: 'sitepad', dir: 'sitepad' },
  { slug: 'whmsonic', dir: 'whmsonic' },
  { slug: 'whmreseller', dir: 'whmreseller' },
  { slug: 'dareseller', dir: 'dareseller' },
  { slug: 'imunify360', dir: 'imunify360' },
  { slug: 'cpguard', dir: 'cpguard' },
  { slug: 'osm', dir: 'osm' },
];

// Pull the literal between `const FALLBACK_PLANS: Plan[] = [` and the matching
// closing `];`. We count brackets to find the right close bracket.
function extractLiteral(source) {
  // Match either `Plan[]` (regular product pages) or `FallbackPlan[]`
  // (dedicated-servers uses a different shape — we'll normalise after eval).
  const re = /const\s+FALLBACK_PLANS\s*:\s*(?:Plan|FallbackPlan)\[\]\s*=\s*(\[)/;
  const m = re.exec(source);
  if (!m) return null;
  const start = m.index + m[0].length - 1; // position of the `[`
  let depth = 0;
  for (let i = start; i < source.length; i++) {
    const ch = source[i];
    if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0) {
        return source.slice(start, i + 1);
      }
    }
  }
  return null;
}

function evalLiteral(literal) {
  // The literal is a JS array of object literals. Object property names are
  // bare identifiers, so JSON.parse will not work — eval it in a fresh VM.
  const code = `result = ${literal}`;
  const ctx = { result: undefined };
  vm.createContext(ctx);
  vm.runInContext(code, ctx, { timeout: 1000 });
  return ctx.result;
}

const out = {};
for (const e of ENTRIES) {
  const file = path.join(APP, e.dir, 'page.tsx');
  if (!fs.existsSync(file)) {
    console.warn('skip (missing):', e.slug);
    continue;
  }
  const src = fs.readFileSync(file, 'utf8');
  const literal = extractLiteral(src);
  if (!literal) {
    console.warn('skip (no literal):', e.slug);
    continue;
  }
  try {
    const plans = evalLiteral(literal);
    if (!Array.isArray(plans) || plans.length === 0) {
      console.warn(`empty array for ${e.slug}`);
      continue;
    }
    // Normalise: dedicated-servers uses { name, price, pkr, features[], popular }
    // but the DB plan shape is { name, price, setup, popular, orderLink, specs[] }.
    // Fold its features into specs so the renderer keeps working.
    const normalised = plans.map((p) => {
      if (Array.isArray(p.specs)) return p;
      const specs = Array.isArray(p.features)
        ? p.features.map((f) => ({ label: '', value: String(f) }))
        : [];
      return {
        name: p.name,
        price: p.price ?? '',
        setup: p.setup ?? (p.pkr ? `${p.pkr}` : ''),
        popular: !!p.popular,
        orderLink: p.orderLink ?? '',
        specs,
      };
    });
    out[e.slug] = normalised;
    console.log(`✓ ${e.slug}: ${normalised.length} plans`);
  } catch (err) {
    console.error(`failed to eval ${e.slug}:`, err.message);
  }
}

const outPath = path.join(ROOT, 'lib', 'db', 'fallback-plans.json');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n', 'utf8');
console.log(`\nWrote ${Object.keys(out).length} slugs to ${path.relative(ROOT, outPath)}`);

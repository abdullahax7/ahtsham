'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sqlite } from '../../lib/db';
import { bust, TAGS } from '../../lib/db/repos';

// Import/export server actions. Each importer accepts the same envelope the
// export endpoint produces:
//
//   { schema_version: 1, table: "<name>", rows: [...] }
//
// To keep imports forgiving we also accept a bare array. We never delete
// existing rows — imports are upserts keyed by the natural identifier
// (slug for blogs/products, id otherwise).

type Envelope<T = Record<string, any>> = {
  schema_version?: number;
  table?: string;
  rows: T[];
};

function parsePayload(raw: string, fallbackTable: string): Envelope {
  let parsed: any;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    throw new Error('Could not parse JSON file. Make sure you uploaded a valid export.');
  }
  // Bare array form
  if (Array.isArray(parsed)) {
    return { table: fallbackTable, rows: parsed };
  }
  // Envelope form
  if (parsed && Array.isArray(parsed.rows)) {
    return { schema_version: parsed.schema_version, table: parsed.table ?? fallbackTable, rows: parsed.rows };
  }
  throw new Error('Unrecognised file format. Expected an object with a "rows" array.');
}

function asString(v: unknown, fallback = ''): string {
  if (v === null || v === undefined) return fallback;
  return String(v);
}

function asNullableString(v: unknown): string | null {
  if (v === null || v === undefined) return null;
  return String(v);
}

function asBool(v: unknown, fallback = false): number {
  if (v === undefined || v === null) return fallback ? 1 : 0;
  if (typeof v === 'number') return v ? 1 : 0;
  if (typeof v === 'boolean') return v ? 1 : 0;
  const s = String(v).toLowerCase();
  return s === '1' || s === 'true' || s === 'on' ? 1 : 0;
}

function asInt(v: unknown, fallback = 0): number {
  const n = Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
}

function asJsonString(v: unknown, fallback: string): string {
  if (typeof v === 'string') return v; // already serialized
  if (v === null || v === undefined) return fallback;
  try {
    return JSON.stringify(v);
  } catch {
    return fallback;
  }
}

// ---------- Blogs ----------
function importBlogs(rows: any[]): { inserted: number; updated: number } {
  const findBySlug = sqlite.prepare('SELECT id FROM blogs WHERE slug = ?');
  const insert = sqlite.prepare(`
    INSERT INTO blogs (slug, title, excerpt, content, date, tag, youtube_id, note_text, featured_image, related_products, code_snippets, created_at, updated_at)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,COALESCE(?, strftime('%Y-%m-%dT%H:%M:%fZ','now')), COALESCE(?, strftime('%Y-%m-%dT%H:%M:%fZ','now')))
  `);
  const update = sqlite.prepare(`
    UPDATE blogs SET title=?, excerpt=?, content=?, date=?, tag=?, youtube_id=?, note_text=?, featured_image=?, related_products=?, code_snippets=?, updated_at=COALESCE(?, strftime('%Y-%m-%dT%H:%M:%fZ','now'))
    WHERE slug = ?
  `);
  let inserted = 0;
  let updated = 0;
  const tx = sqlite.transaction((items: any[]) => {
    for (const r of items) {
      const slug = asString(r.slug).trim();
      if (!slug) continue;
      const existing = findBySlug.get(slug) as any;
      const values = {
        title: asString(r.title, slug),
        excerpt: asNullableString(r.excerpt),
        content: asString(r.content),
        date: asNullableString(r.date),
        tag: asNullableString(r.tag),
        youtube_id: asNullableString(r.youtube_id),
        note_text: asNullableString(r.note_text),
        featured_image: asNullableString(r.featured_image),
        related_products: asJsonString(r.related_products, '[]'),
        code_snippets: asJsonString(r.code_snippets, '[]'),
        created_at: asNullableString(r.created_at),
        updated_at: asNullableString(r.updated_at),
      };
      if (existing) {
        update.run(
          values.title, values.excerpt, values.content, values.date, values.tag,
          values.youtube_id, values.note_text, values.featured_image,
          values.related_products, values.code_snippets, values.updated_at, slug,
        );
        updated++;
      } else {
        insert.run(
          slug, values.title, values.excerpt, values.content, values.date, values.tag,
          values.youtube_id, values.note_text, values.featured_image,
          values.related_products, values.code_snippets, values.created_at, values.updated_at,
        );
        inserted++;
      }
    }
  });
  tx.immediate(rows);
  return { inserted, updated };
}

// ---------- Products ----------
function importProducts(rows: any[]): { inserted: number; updated: number } {
  const findBySlug = sqlite.prepare('SELECT id FROM products WHERE slug = ?');
  const insert = sqlite.prepare(`
    INSERT INTO products (slug, name, category, short_description, long_description, icon, starting_price_usd, starting_price_pkr, order_url, is_featured, is_visible, sort_order, features, plans, page_content, updated_at)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, COALESCE(?, strftime('%Y-%m-%dT%H:%M:%fZ','now')))
  `);
  const update = sqlite.prepare(`
    UPDATE products SET name=?, category=?, short_description=?, long_description=?, icon=?, starting_price_usd=?, starting_price_pkr=?, order_url=?, is_featured=?, is_visible=?, sort_order=?, features=?, plans=?, page_content=?, updated_at=COALESCE(?, strftime('%Y-%m-%dT%H:%M:%fZ','now'))
    WHERE slug = ?
  `);
  let inserted = 0;
  let updated = 0;
  const tx = sqlite.transaction((items: any[]) => {
    for (const r of items) {
      const slug = asString(r.slug).trim();
      if (!slug) continue;
      const existing = findBySlug.get(slug) as any;
      const values = {
        name: asString(r.name, slug),
        category: asString(r.category, 'hosting'),
        short_description: asString(r.short_description),
        long_description: asString(r.long_description),
        icon: asNullableString(r.icon),
        starting_price_usd: asNullableString(r.starting_price_usd),
        starting_price_pkr: asNullableString(r.starting_price_pkr),
        order_url: asNullableString(r.order_url),
        is_featured: asBool(r.is_featured, false),
        is_visible: r.is_visible === undefined || r.is_visible === null ? 1 : asBool(r.is_visible, true),
        sort_order: asInt(r.sort_order, 0),
        features: asJsonString(r.features, '[]'),
        plans: asJsonString(r.plans, '[]'),
        page_content: asJsonString(r.page_content, '{}'),
        updated_at: asNullableString(r.updated_at),
      };
      if (existing) {
        update.run(
          values.name, values.category, values.short_description, values.long_description,
          values.icon, values.starting_price_usd, values.starting_price_pkr, values.order_url,
          values.is_featured, values.is_visible, values.sort_order,
          values.features, values.plans, values.page_content, values.updated_at, slug,
        );
        updated++;
      } else {
        insert.run(
          slug, values.name, values.category, values.short_description, values.long_description,
          values.icon, values.starting_price_usd, values.starting_price_pkr, values.order_url,
          values.is_featured, values.is_visible, values.sort_order,
          values.features, values.plans, values.page_content, values.updated_at,
        );
        inserted++;
      }
    }
  });
  tx.immediate(rows);
  return { inserted, updated };
}

// ---------- FAQs ----------
function importFaqs(rows: any[]): { inserted: number; updated: number } {
  const findById = sqlite.prepare('SELECT id FROM faqs WHERE id = ?');
  const findByQ = sqlite.prepare('SELECT id FROM faqs WHERE question = ?');
  const insert = sqlite.prepare(`
    INSERT INTO faqs (question, answer, sort_order, is_visible) VALUES (?,?,?,?)
  `);
  const updateById = sqlite.prepare(`
    UPDATE faqs SET question=?, answer=?, sort_order=?, is_visible=? WHERE id = ?
  `);
  let inserted = 0;
  let updated = 0;
  const tx = sqlite.transaction((items: any[]) => {
    for (const r of items) {
      const question = asString(r.question).trim();
      const answer = asString(r.answer);
      if (!question) continue;
      const values = [
        question,
        answer,
        asInt(r.sort_order, 0),
        r.is_visible === undefined || r.is_visible === null ? 1 : asBool(r.is_visible, true),
      ];
      const id = r.id != null ? asInt(r.id, 0) : 0;
      let existing = id ? (findById.get(id) as any) : null;
      if (!existing) existing = findByQ.get(question) as any;
      if (existing) {
        updateById.run(values[0], values[1], values[2], values[3], existing.id);
        updated++;
      } else {
        insert.run(values[0], values[1], values[2], values[3]);
        inserted++;
      }
    }
  });
  tx.immediate(rows);
  return { inserted, updated };
}

// ---------- Testimonials ----------
function importTestimonials(rows: any[]): { inserted: number; updated: number } {
  const findById = sqlite.prepare('SELECT id FROM testimonials WHERE id = ?');
  const insert = sqlite.prepare(`
    INSERT INTO testimonials (author, role, text, stars, avatar, sort_order, is_visible) VALUES (?,?,?,?,?,?,?)
  `);
  const updateById = sqlite.prepare(`
    UPDATE testimonials SET author=?, role=?, text=?, stars=?, avatar=?, sort_order=?, is_visible=? WHERE id = ?
  `);
  let inserted = 0;
  let updated = 0;
  const tx = sqlite.transaction((items: any[]) => {
    for (const r of items) {
      const author = asString(r.author).trim();
      const text = asString(r.text);
      if (!author || !text) continue;
      const values = [
        author,
        asString(r.role),
        text,
        asInt(r.stars, 5),
        asNullableString(r.avatar),
        asInt(r.sort_order, 0),
        r.is_visible === undefined || r.is_visible === null ? 1 : asBool(r.is_visible, true),
      ];
      const id = r.id != null ? asInt(r.id, 0) : 0;
      const existing = id ? (findById.get(id) as any) : null;
      if (existing) {
        updateById.run(values[0], values[1], values[2], values[3], values[4], values[5], values[6], existing.id);
        updated++;
      } else {
        insert.run(values[0], values[1], values[2], values[3], values[4], values[5], values[6]);
        inserted++;
      }
    }
  });
  tx.immediate(rows);
  return { inserted, updated };
}

// ---------- Payment methods ----------
function importPaymentMethods(rows: any[]): { inserted: number; updated: number } {
  const findById = sqlite.prepare('SELECT id FROM payment_methods WHERE id = ?');
  const findByName = sqlite.prepare('SELECT id FROM payment_methods WHERE name = ?');
  const insert = sqlite.prepare(`
    INSERT INTO payment_methods (name, image_url, sort_order, is_visible) VALUES (?,?,?,?)
  `);
  const updateById = sqlite.prepare(`
    UPDATE payment_methods SET name=?, image_url=?, sort_order=?, is_visible=? WHERE id = ?
  `);
  let inserted = 0;
  let updated = 0;
  const tx = sqlite.transaction((items: any[]) => {
    for (const r of items) {
      const name = asString(r.name).trim();
      if (!name) continue;
      const values = [
        name,
        asNullableString(r.image_url),
        asInt(r.sort_order, 0),
        r.is_visible === undefined || r.is_visible === null ? 1 : asBool(r.is_visible, true),
      ];
      const id = r.id != null ? asInt(r.id, 0) : 0;
      let existing = id ? (findById.get(id) as any) : null;
      if (!existing) existing = findByName.get(name) as any;
      if (existing) {
        updateById.run(values[0], values[1], values[2], values[3], existing.id);
        updated++;
      } else {
        insert.run(values[0], values[1], values[2], values[3]);
        inserted++;
      }
    }
  });
  tx.immediate(rows);
  return { inserted, updated };
}

// ---------- Site settings ----------
function importSiteSettings(rows: any[]): { inserted: number; updated: number } {
  const upsert = sqlite.prepare(`
    INSERT INTO site_settings (key, value, type) VALUES (?,?,?)
    ON CONFLICT(key) DO UPDATE SET value=excluded.value, type=excluded.type, updated_at=strftime('%Y-%m-%dT%H:%M:%fZ','now')
  `);
  const find = sqlite.prepare('SELECT key FROM site_settings WHERE key = ?');
  let inserted = 0;
  let updated = 0;
  const tx = sqlite.transaction((items: any[]) => {
    for (const r of items) {
      const key = asString(r.key).trim();
      if (!key) continue;
      const existing = find.get(key);
      upsert.run(key, asString(r.value), asString(r.type, 'text'));
      if (existing) updated++; else inserted++;
    }
  });
  tx.immediate(rows);
  return { inserted, updated };
}

const IMPORTERS: Record<string, (rows: any[]) => { inserted: number; updated: number }> = {
  blogs: importBlogs,
  products: importProducts,
  faqs: importFaqs,
  testimonials: importTestimonials,
  payment_methods: importPaymentMethods,
  site_settings: importSiteSettings,
};

const TAG_FOR_TABLE: Record<string, string[]> = {
  blogs: [TAGS.blogs],
  products: [TAGS.products],
  faqs: [TAGS.faqs],
  testimonials: [TAGS.testimonials],
  payment_methods: [TAGS.payments],
  site_settings: [TAGS.siteSettings],
};

export async function importTable(formData: FormData) {
  const table = asString(formData.get('table')).trim();
  const importer = IMPORTERS[table];
  if (!importer) throw new Error(`Unknown table: ${table}`);

  // Two input modes: file upload OR pasted JSON. File takes precedence.
  let raw = '';
  const file = formData.get('file');
  if (file && typeof file === 'object' && 'arrayBuffer' in file) {
    const blob = file as File;
    if (blob.size > 0) {
      raw = Buffer.from(await blob.arrayBuffer()).toString('utf-8');
    }
  }
  if (!raw) {
    raw = asString(formData.get('json')).trim();
  }
  if (!raw) {
    throw new Error('Provide a JSON file or paste the JSON contents.');
  }

  const envelope = parsePayload(raw, table);
  if (envelope.table && envelope.table !== table) {
    throw new Error(`File is for table "${envelope.table}" but you tried to import into "${table}".`);
  }

  const { inserted, updated } = importer(envelope.rows);

  for (const tag of TAG_FOR_TABLE[table] ?? []) bust(tag);
  revalidatePath('/admin/import-export');
  revalidatePath('/');

  const params = new URLSearchParams({ ok: '1', table, inserted: String(inserted), updated: String(updated) });
  redirect(`/admin/import-export?${params.toString()}`);
}

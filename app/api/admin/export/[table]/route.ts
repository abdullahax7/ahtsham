import { NextResponse } from 'next/server';
import { db } from '../../../../../lib/db';
import * as t from '../../../../../lib/db/schema';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TABLES = {
  blogs: t.blogs,
  products: t.products,
  faqs: t.faqs,
  testimonials: t.testimonials,
  payment_methods: t.payment_methods,
  site_settings: t.site_settings,
  homepage_stats: t.homepage_stats,
  settings: t.settings,
  nav_links: t.nav_links,
} as const;

type TableName = keyof typeof TABLES;

export async function GET(_req: Request, { params }: { params: { table: string } }) {
  const tableName = params.table as TableName;
  const table = TABLES[tableName];
  if (!table) {
    return NextResponse.json({ error: `Unknown table: ${params.table}` }, { status: 400 });
  }

  const rows = await (db as any).select().from(table).all();

  const payload = {
    // Versioned envelope so future migrations can reshape the file.
    schema_version: 1,
    exported_at: new Date().toISOString(),
    table: tableName,
    count: rows.length,
    rows,
  };

  const json = JSON.stringify(payload, null, 2);
  const stamp = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').slice(0, 19);
  return new NextResponse(json, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': `attachment; filename="qazihost_${tableName}_${stamp}.json"`,
      'Cache-Control': 'no-store',
    },
  });
}

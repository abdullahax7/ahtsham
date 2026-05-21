import type { MetadataRoute } from 'next';
import { db } from '../lib/db';
import * as t from '../lib/db/schema';
import { eq, desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

const BASE_URL = 'https://qazi.host';

type Entry = {
  url: string;
  lastModified?: Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
};

// Routes whose page files live in app/ but are not DB-driven products.
// Keep this list in sync with the actual app/<route>/page.tsx files.
const STATIC_ROUTES: Entry[] = [
  { url: '/', changeFrequency: 'daily', priority: 1.0 },
  { url: '/shared-hosting', changeFrequency: 'weekly', priority: 0.9 },
  { url: '/reseller-hosting', changeFrequency: 'weekly', priority: 0.9 },
  { url: '/vps', changeFrequency: 'weekly', priority: 0.9 },
  { url: '/dedicated-servers', changeFrequency: 'weekly', priority: 0.9 },
  { url: '/licenses', changeFrequency: 'weekly', priority: 0.9 },
  { url: '/licenses/bundles', changeFrequency: 'weekly', priority: 0.8 },
  { url: '/cpanel-license', changeFrequency: 'monthly', priority: 0.8 },
  { url: '/plesk-license', changeFrequency: 'monthly', priority: 0.8 },
  { url: '/litespeed-license', changeFrequency: 'monthly', priority: 0.8 },
  { url: '/cloudlinux-license', changeFrequency: 'monthly', priority: 0.8 },
  { url: '/directadmin', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/cpguard', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/imunify360', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/jetbackup', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/softaculous', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/sitepad', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/virtualizor', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/whmsonic', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/whmreseller', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/dareseller', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/osm', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/webxoo', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/blog', changeFrequency: 'daily', priority: 0.9 },
  { url: '/contact', changeFrequency: 'monthly', priority: 0.6 },
  { url: '/status', changeFrequency: 'daily', priority: 0.5 },
  { url: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { url: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  { url: '/fair-usage-policy', changeFrequency: 'yearly', priority: 0.3 },
];

function parseDate(value: string | null | undefined): Date | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static, hard-coded routes
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${BASE_URL}${r.url}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Blog posts — every published post, even brand-new ones.
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const rows = db
      .select({ slug: t.blogs.slug, updated_at: t.blogs.updated_at, created_at: t.blogs.created_at })
      .from(t.blogs)
      .orderBy(desc(t.blogs.updated_at))
      .all();
    blogEntries = rows.map((row) => ({
      url: `${BASE_URL}/blog/${row.slug}`,
      lastModified: parseDate(row.updated_at) ?? parseDate(row.created_at) ?? now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch {
    // DB might not be reachable at build time — return what we have.
  }

  // Visible products — keeps DB-driven product pages in the sitemap even if
  // someone forgets to add the slug to STATIC_ROUTES above.
  let productEntries: MetadataRoute.Sitemap = [];
  try {
    const rows = db
      .select({ slug: t.products.slug, updated_at: t.products.updated_at })
      .from(t.products)
      .where(eq(t.products.is_visible, true))
      .all();
    productEntries = rows.map((row) => ({
      url: `${BASE_URL}/${row.slug}`,
      lastModified: parseDate(row.updated_at) ?? now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch {
    // ignore — fall back to static entries
  }

  // Dedupe by URL — static routes win over dynamic where they overlap so we
  // keep the higher curated priority.
  const seen = new Set<string>();
  const merged: MetadataRoute.Sitemap = [];
  for (const e of [...staticEntries, ...blogEntries, ...productEntries]) {
    if (seen.has(e.url)) continue;
    seen.add(e.url);
    merged.push(e);
  }
  return merged;
}

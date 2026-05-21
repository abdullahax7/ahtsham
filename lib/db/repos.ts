import "server-only";
import { unstable_cache as cache, revalidateTag } from "next/cache";
import { db, sqlite } from "./index";
import * as t from "./schema";
import { eq, sql, like, and, desc, asc, inArray, count } from "drizzle-orm";

// =============================================================================
// Cache tags
// =============================================================================
export const TAGS = {
  blogs: "blogs",
  blog: (slug: string) => `blog:${slug}`,
  settings: "settings",
  siteSettings: "site_settings",
  products: "products",
  product: (slug: string) => `product:${slug}`,
  testimonials: "testimonials",
  faqs: "faqs",
  navLinks: "nav_links",
  payments: "payment_methods",
  stats: "homepage_stats",
} as const;

export function bust(...tags: string[]) {
  for (const t of tags) revalidateTag(t);
}

// =============================================================================
// JSON helpers
// =============================================================================
function safeJson<T>(value: unknown, fallback: T): T {
  if (typeof value !== "string") return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

// =============================================================================
// Blogs
// =============================================================================
export type BlogRow = Omit<t.Blog, "related_products" | "code_snippets"> & {
  related_products: string[];
  code_snippets: { title?: string; language?: string; code: string }[];
};

function hydrateBlog(row: t.Blog | undefined): BlogRow | null {
  if (!row) return null;
  return {
    ...row,
    related_products: safeJson<string[]>(row.related_products, []),
    code_snippets: safeJson(row.code_snippets, []),
  };
}

export const getBlogBySlug = (slug: string) =>
  cache(
    async () => {
      const row = db.select().from(t.blogs).where(eq(t.blogs.slug, slug)).get();
      return hydrateBlog(row);
    },
    ["blog-by-slug", slug],
    { tags: [TAGS.blogs, TAGS.blog(slug)] },
  )();

export const listBlogSlugs = cache(
  async () => {
    return db.select({ slug: t.blogs.slug }).from(t.blogs).all();
  },
  ["blog-slugs"],
  { tags: [TAGS.blogs] },
);

export type BlogListOptions = {
  query?: string;
  tag?: string;
  productSku?: string;
  sort?: "newest" | "oldest" | "alphabetical";
  page?: number;
  perPage?: number;
};

export async function listBlogs(opts: BlogListOptions = {}) {
  const { query = "", tag, productSku, sort = "newest", page = 1, perPage = 9 } = opts;

  const where: any[] = [];
  if (query.trim()) {
    where.push(
      sql`(lower(${t.blogs.title}) LIKE ${"%" + query.toLowerCase() + "%"} OR lower(coalesce(${t.blogs.excerpt}, '')) LIKE ${"%" + query.toLowerCase() + "%"})`,
    );
  }
  if (tag && tag !== "All") where.push(eq(t.blogs.tag, tag));
  if (productSku) {
    where.push(sql`EXISTS (SELECT 1 FROM json_each(${t.blogs.related_products}) WHERE value = ${productSku})`);
  }

  const whereExpr = where.length ? and(...where) : undefined;

  const order =
    sort === "oldest" ? asc(t.blogs.created_at) : sort === "alphabetical" ? asc(t.blogs.title) : desc(t.blogs.created_at);

  const total = (
    await db.select({ c: count() }).from(t.blogs).where(whereExpr as any).all()
  )[0]?.c ?? 0;

  const rows = await db
    .select()
    .from(t.blogs)
    .where(whereExpr as any)
    .orderBy(order)
    .limit(perPage)
    .offset((page - 1) * perPage)
    .all();

  return { rows: rows.map((r) => hydrateBlog(r)!), total };
}

export async function listBlogsForAdmin(sortField: "created_at" | "title" | "tag" = "created_at", direction: "asc" | "desc" = "desc") {
  const col = sortField === "title" ? t.blogs.title : sortField === "tag" ? t.blogs.tag : t.blogs.created_at;
  const rows = await db.select().from(t.blogs).orderBy(direction === "asc" ? asc(col) : desc(col)).all();
  return rows.map((r) => hydrateBlog(r)!);
}

export function countBlogs() {
  return (sqlite.prepare("SELECT COUNT(*) AS c FROM blogs").get() as any).c as number;
}

export type SaveBlogPayload = {
  slug: string;
  title: string;
  excerpt?: string | null;
  content: string;
  date?: string | null;
  tag?: string | null;
  youtube_id?: string | null;
  note_text?: string | null;
  featured_image?: string | null;
  related_products?: string[];
  code_snippets?: any[];
};

export function insertBlog(p: SaveBlogPayload) {
  return db
    .insert(t.blogs)
    .values({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt ?? null,
      content: p.content ?? "",
      date: p.date ?? null,
      tag: p.tag ?? null,
      youtube_id: p.youtube_id ?? null,
      note_text: p.note_text ?? null,
      featured_image: p.featured_image ?? null,
      related_products: JSON.stringify(p.related_products ?? []),
      code_snippets: JSON.stringify(p.code_snippets ?? []),
    })
    .run();
}

export function updateBlogBySlug(originalSlug: string, p: SaveBlogPayload) {
  return db
    .update(t.blogs)
    .set({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt ?? null,
      content: p.content ?? "",
      date: p.date ?? null,
      tag: p.tag ?? null,
      youtube_id: p.youtube_id ?? null,
      note_text: p.note_text ?? null,
      featured_image: p.featured_image ?? null,
      related_products: JSON.stringify(p.related_products ?? []),
      code_snippets: JSON.stringify(p.code_snippets ?? []),
      updated_at: sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`,
    })
    .where(eq(t.blogs.slug, originalSlug))
    .run();
}

export function deleteBlogsBySlugs(slugs: string[]) {
  if (slugs.length === 0) return;
  return db.delete(t.blogs).where(inArray(t.blogs.slug, slugs)).run();
}

// =============================================================================
// Settings (status_html / dashboard_note)
// =============================================================================
export const getSettings = cache(
  async () => {
    const row = db.select().from(t.settings).limit(1).get();
    return row ?? { id: 0, status_html: "", dashboard_note: "", updated_at: "" };
  },
  ["settings"],
  { tags: [TAGS.settings] },
);

export function updateSettings(values: Partial<{ status_html: string; dashboard_note: string }>) {
  const row = db.select().from(t.settings).limit(1).get();
  if (!row) {
    db.insert(t.settings).values({ status_html: values.status_html ?? "", dashboard_note: values.dashboard_note ?? "" }).run();
  } else {
    db.update(t.settings).set({ ...values, updated_at: sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))` }).where(eq(t.settings.id, row.id)).run();
  }
}

// =============================================================================
// Site settings (key/value)
// =============================================================================
export type SiteSettingsRecord = Record<string, { value: string; type: string; updated_at: string }>;

export const getAllSiteSettings = cache(
  async (): Promise<SiteSettingsRecord> => {
    const rows = await db.select().from(t.site_settings).all();
    const obj: SiteSettingsRecord = {};
    for (const r of rows) obj[r.key] = { value: r.value, type: r.type, updated_at: r.updated_at };
    return obj;
  },
  ["site_settings_map"],
  { tags: [TAGS.siteSettings] },
);

export async function getSiteSetting(key: string, fallback = ""): Promise<string> {
  const obj = await getAllSiteSettings();
  return obj[key]?.value ?? fallback;
}

export function upsertSiteSetting(key: string, value: string, type: string = "text") {
  const stmt = sqlite.prepare(
    "INSERT INTO site_settings (key, value, type) VALUES (?,?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value, type=excluded.type, updated_at=strftime('%Y-%m-%dT%H:%M:%fZ','now')",
  );
  stmt.run(key, value, type);
}

// =============================================================================
// Homepage stats
// =============================================================================
export const getHomepageStats = cache(
  async () => {
    const row = db.select().from(t.homepage_stats).limit(1).get();
    if (!row) return { clients: 5000, uptime: 99.9, support: 100, locations: 6000 };
    return {
      clients: row.clients,
      uptime: row.uptime / 10,
      support: row.support,
      locations: row.locations,
    };
  },
  ["homepage_stats"],
  { tags: [TAGS.stats] },
);

export function updateHomepageStats(values: { clients: number; uptime: number; support: number; locations: number }) {
  const row = db.select().from(t.homepage_stats).limit(1).get();
  const data = {
    clients: values.clients,
    uptime: Math.round(values.uptime * 10),
    support: values.support,
    locations: values.locations,
    updated_at: sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))` as any,
  };
  if (!row) db.insert(t.homepage_stats).values(data).run();
  else db.update(t.homepage_stats).set(data).where(eq(t.homepage_stats.id, row.id)).run();
}

// =============================================================================
// Products
// =============================================================================
export type ProductPlan = {
  name: string;
  price: string;
  setup?: string;
  popular?: boolean;
  orderLink?: string;
  specs: { label: string; value: string }[];
};

export type ProductRow = Omit<t.Product, "features" | "plans" | "page_content"> & {
  features: string[];
  plans: ProductPlan[];
  page_content: Record<string, any>;
};

function hydrateProduct(row: t.Product | undefined): ProductRow | null {
  if (!row) return null;
  return {
    ...row,
    features: safeJson<string[]>(row.features, []),
    plans: safeJson<ProductPlan[]>(row.plans, []),
    page_content: safeJson<Record<string, any>>(row.page_content, {}),
  };
}

export const getProductBySlug = (slug: string) =>
  cache(
    async () => hydrateProduct(db.select().from(t.products).where(eq(t.products.slug, slug)).get()),
    ["product-by-slug", slug],
    { tags: [TAGS.products, TAGS.product(slug)] },
  )();

export const listProducts = cache(
  async () => {
    const rows = await db.select().from(t.products).orderBy(asc(t.products.sort_order)).all();
    return rows.map((r) => hydrateProduct(r)!);
  },
  ["products-all"],
  { tags: [TAGS.products] },
);

// Non-cached read used by the admin UI so newly-created/edited products
// always show up immediately without waiting on `unstable_cache` to bust.
export async function listProductsForAdmin() {
  const rows = await db.select().from(t.products).orderBy(asc(t.products.sort_order)).all();
  return rows.map((r) => hydrateProduct(r)!);
}

export const listFeaturedProducts = cache(
  async () => {
    const rows = await db.select().from(t.products).where(eq(t.products.is_featured, true)).orderBy(asc(t.products.sort_order)).all();
    return rows.map((r) => hydrateProduct(r)!);
  },
  ["products-featured"],
  { tags: [TAGS.products] },
);

export type ProductPayload = {
  slug: string;
  name: string;
  category: string;
  short_description?: string;
  long_description?: string;
  icon?: string | null;
  starting_price_usd?: string | null;
  starting_price_pkr?: string | null;
  order_url?: string | null;
  is_featured?: boolean;
  is_visible?: boolean;
  sort_order?: number;
  features?: string[];
  plans?: ProductPlan[];
  page_content?: Record<string, any>;
};

export function upsertProduct(p: ProductPayload, originalSlug?: string) {
  const existing = db
    .select()
    .from(t.products)
    .where(eq(t.products.slug, originalSlug ?? p.slug))
    .get();
  const values = {
    slug: p.slug,
    name: p.name,
    category: p.category,
    short_description: p.short_description ?? "",
    long_description: p.long_description ?? "",
    icon: p.icon ?? null,
    starting_price_usd: p.starting_price_usd ?? null,
    starting_price_pkr: p.starting_price_pkr ?? null,
    order_url: p.order_url ?? null,
    is_featured: !!p.is_featured,
    is_visible: p.is_visible ?? true,
    sort_order: p.sort_order ?? 0,
    features: JSON.stringify(p.features ?? []),
    plans: JSON.stringify(p.plans ?? []),
    page_content: JSON.stringify(p.page_content ?? {}),
    updated_at: sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))` as any,
  };
  if (existing) {
    db.update(t.products).set(values).where(eq(t.products.id, existing.id)).run();
  } else {
    db.insert(t.products).values(values).run();
  }
}

export function deleteProduct(slug: string) {
  db.delete(t.products).where(eq(t.products.slug, slug)).run();
}

// =============================================================================
// Testimonials
// =============================================================================
export const listTestimonials = cache(
  async () => {
    return db
      .select()
      .from(t.testimonials)
      .where(eq(t.testimonials.is_visible, true))
      .orderBy(asc(t.testimonials.sort_order))
      .all();
  },
  ["testimonials"],
  { tags: [TAGS.testimonials] },
);

export const listAllTestimonials = cache(
  async () => db.select().from(t.testimonials).orderBy(asc(t.testimonials.sort_order)).all(),
  ["testimonials-all"],
  { tags: [TAGS.testimonials] },
);

export function upsertTestimonial(values: { id?: number; author: string; role: string; text: string; stars: number; avatar?: string | null; sort_order?: number; is_visible?: boolean }) {
  const data = {
    author: values.author,
    role: values.role,
    text: values.text,
    stars: values.stars,
    avatar: values.avatar ?? null,
    sort_order: values.sort_order ?? 0,
    is_visible: values.is_visible ?? true,
    updated_at: sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))` as any,
  };
  if (values.id) db.update(t.testimonials).set(data).where(eq(t.testimonials.id, values.id)).run();
  else db.insert(t.testimonials).values(data).run();
}

export function deleteTestimonial(id: number) {
  db.delete(t.testimonials).where(eq(t.testimonials.id, id)).run();
}

// =============================================================================
// FAQs
// =============================================================================
export const listFaqs = cache(
  async () => db.select().from(t.faqs).where(eq(t.faqs.is_visible, true)).orderBy(asc(t.faqs.sort_order)).all(),
  ["faqs"],
  { tags: [TAGS.faqs] },
);

export const listAllFaqs = cache(
  async () => db.select().from(t.faqs).orderBy(asc(t.faqs.sort_order)).all(),
  ["faqs-all"],
  { tags: [TAGS.faqs] },
);

export function upsertFaq(values: { id?: number; question: string; answer: string; sort_order?: number; is_visible?: boolean }) {
  const data = {
    question: values.question,
    answer: values.answer,
    sort_order: values.sort_order ?? 0,
    is_visible: values.is_visible ?? true,
    updated_at: sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))` as any,
  };
  if (values.id) db.update(t.faqs).set(data).where(eq(t.faqs.id, values.id)).run();
  else db.insert(t.faqs).values(data).run();
}

export function deleteFaq(id: number) {
  db.delete(t.faqs).where(eq(t.faqs.id, id)).run();
}

// =============================================================================
// Payment methods
// =============================================================================
export const listPaymentMethods = cache(
  async () => db.select().from(t.payment_methods).where(eq(t.payment_methods.is_visible, true)).orderBy(asc(t.payment_methods.sort_order)).all(),
  ["payment-methods"],
  { tags: [TAGS.payments] },
);

export const listAllPaymentMethods = cache(
  async () => db.select().from(t.payment_methods).orderBy(asc(t.payment_methods.sort_order)).all(),
  ["payment-methods-all"],
  { tags: [TAGS.payments] },
);

export function upsertPaymentMethod(values: { id?: number; name: string; image_url?: string | null; sort_order?: number; is_visible?: boolean }) {
  const data = {
    name: values.name,
    image_url: values.image_url ?? null,
    sort_order: values.sort_order ?? 0,
    is_visible: values.is_visible ?? true,
    updated_at: sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))` as any,
  };
  if (values.id) db.update(t.payment_methods).set(data).where(eq(t.payment_methods.id, values.id)).run();
  else db.insert(t.payment_methods).values(data).run();
}

export function deletePaymentMethod(id: number) {
  db.delete(t.payment_methods).where(eq(t.payment_methods.id, id)).run();
}

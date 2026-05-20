import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, uniqueIndex, index } from "drizzle-orm/sqlite-core";

// ------------------------------ blogs ------------------------------
// Matches the Supabase `blogs` table the existing code expects.
export const blogs = sqliteTable(
  "blogs",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    excerpt: text("excerpt"),
    content: text("content").notNull().default(""),
    date: text("date"),
    tag: text("tag"),
    youtube_id: text("youtube_id"),
    note_text: text("note_text"),
    featured_image: text("featured_image"),
    related_products: text("related_products").notNull().default("[]"), // JSON array
    code_snippets: text("code_snippets").notNull().default("[]"), // JSON array
    created_at: text("created_at").notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
    updated_at: text("updated_at").notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
  },
  (t) => ({
    slugIdx: uniqueIndex("blogs_slug_idx").on(t.slug),
    tagIdx: index("blogs_tag_idx").on(t.tag),
    createdIdx: index("blogs_created_idx").on(t.created_at),
  }),
);

// ------------------------------ settings ------------------------------
// Single-row settings table — matches the Supabase shape used by the app.
export const settings = sqliteTable("settings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  status_html: text("status_html").notNull().default(""),
  dashboard_note: text("dashboard_note").notNull().default(""),
  updated_at: text("updated_at").notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
});

// ------------------------------ site_settings (key/value) ------------------------------
// Flexible store for header, footer, CEO promise, hero copy, payment hubs, etc.
export const site_settings = sqliteTable(
  "site_settings",
  {
    key: text("key").primaryKey(),
    value: text("value").notNull().default(""), // free-form text (often JSON-encoded)
    type: text("type").notNull().default("text"), // text | html | json | image
    updated_at: text("updated_at").notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
  },
);

// ------------------------------ homepage_stats ------------------------------
export const homepage_stats = sqliteTable("homepage_stats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  clients: integer("clients").notNull().default(5000),
  uptime: integer("uptime_x10").notNull().default(999), // store * 10 to keep int math
  support: integer("support").notNull().default(100),
  locations: integer("locations").notNull().default(6000),
  updated_at: text("updated_at").notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
});

// ------------------------------ products ------------------------------
// Each product corresponds to a page (slug) — shared-hosting, cpanel-license, etc.
// Plans are stored as JSON for fast hydrate; admin UI edits the JSON via a structured form.
export const products = sqliteTable(
  "products",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull().unique(), // matches /:slug url
    name: text("name").notNull(),
    category: text("category").notNull().default("hosting"), // hosting | dedicated | license | service
    short_description: text("short_description").notNull().default(""),
    long_description: text("long_description").notNull().default(""),
    icon: text("icon"),
    starting_price_usd: text("starting_price_usd"),
    starting_price_pkr: text("starting_price_pkr"),
    order_url: text("order_url"),
    is_featured: integer("is_featured", { mode: "boolean" }).notNull().default(false),
    is_visible: integer("is_visible", { mode: "boolean" }).notNull().default(true),
    sort_order: integer("sort_order").notNull().default(0),
    features: text("features").notNull().default("[]"), // JSON array of strings
    plans: text("plans").notNull().default("[]"), // JSON array of plan objects
    page_content: text("page_content").notNull().default("{}"), // JSON for hero/CTA blocks
    updated_at: text("updated_at").notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
  },
  (t) => ({
    slugIdx: uniqueIndex("products_slug_idx").on(t.slug),
    catIdx: index("products_cat_idx").on(t.category),
  }),
);

// ------------------------------ testimonials ------------------------------
export const testimonials = sqliteTable("testimonials", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  author: text("author").notNull(),
  role: text("role").notNull().default(""),
  text: text("text").notNull(),
  stars: integer("stars").notNull().default(5),
  avatar: text("avatar"),
  sort_order: integer("sort_order").notNull().default(0),
  is_visible: integer("is_visible", { mode: "boolean" }).notNull().default(true),
  updated_at: text("updated_at").notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
});

// ------------------------------ faqs ------------------------------
export const faqs = sqliteTable("faqs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  sort_order: integer("sort_order").notNull().default(0),
  is_visible: integer("is_visible", { mode: "boolean" }).notNull().default(true),
  updated_at: text("updated_at").notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
});

// ------------------------------ nav_links ------------------------------
// Hierarchical nav (parent_id null = top-level).
export const nav_links = sqliteTable(
  "nav_links",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    label: text("label").notNull(),
    url: text("url").notNull(),
    parent_id: integer("parent_id"),
    icon: text("icon"),
    description: text("description"),
    sort_order: integer("sort_order").notNull().default(0),
    is_visible: integer("is_visible", { mode: "boolean" }).notNull().default(true),
    location: text("location").notNull().default("header"), // header | footer
    updated_at: text("updated_at").notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
  },
  (t) => ({
    parentIdx: index("nav_parent_idx").on(t.parent_id),
    locationIdx: index("nav_loc_idx").on(t.location),
  }),
);

// ------------------------------ payment_methods ------------------------------
export const payment_methods = sqliteTable("payment_methods", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  image_url: text("image_url"),
  sort_order: integer("sort_order").notNull().default(0),
  is_visible: integer("is_visible", { mode: "boolean" }).notNull().default(true),
  updated_at: text("updated_at").notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
});

export type Blog = typeof blogs.$inferSelect;
export type BlogInsert = typeof blogs.$inferInsert;
export type Product = typeof products.$inferSelect;
export type ProductInsert = typeof products.$inferInsert;
export type SiteSetting = typeof site_settings.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type Faq = typeof faqs.$inferSelect;
export type NavLink = typeof nav_links.$inferSelect;
export type PaymentMethod = typeof payment_methods.$inferSelect;

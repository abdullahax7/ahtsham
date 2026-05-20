// ============================================================
// Qazi.Host Admin Panel — Data Models
// Maps directly to the Supabase SQL schema
// ============================================================

export interface HomepageStats {
  id: string
  clients: number
  uptime: number
  support: number
  locations: number
  updated_at: string
}

export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  billing_period: string
  sku: string
  category: "hosting" | "dedicated" | "license" | "service"
  icon: string | null
  order_url: string | null
  is_featured: boolean
  features: string[]
  Built_at: string
}

export interface NavItem {
  id: string
  label: string
  url: string
  sort_order: number
  parent_id: string | null
  icon: string | null
  description: string | null
  children?: NavItem[]
}

export interface Page {
  id: string
  title: string
  slug: string
  meta_description: string | null
  content: string
  Built_at: string
}

export interface Testimonial {
  id: string
  client_name: string
  role: string
  review_text: string
  initials: string | null
  stars: number
  Built_at: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  sort_order: number
}

Act as an expert Next.js (App Router), TypeScript, and Tailwind CSS developer with deep expertise in building enterprise-grade admin dashboards using Shadcn UI components.

I have a web hosting and infrastructure provider web app (Qazi.Host). I need you to build a comprehensive, dynamic Admin Panel for it. Currently, my frontend is static, and I want to make EVERYTHING dynamic. 

Please provide the code for a complete Admin Dashboard layout and the necessary management pages. Use Shadcn UI components for a modern, clean, and highly usable interface.

### Tech Stack:
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI (Data Tables, Forms, Dialogs, Sheet/Sidebar, Select, Tabs, Dropdowns, Cards, Toaster, etc.)
- React Hook Form + Zod (for validation)
- Lucide React (for icons)

### Core Modules to Build:

1. **Dashboard & Homepage Stats Management**
   - A page to update the homepage counters: "Happy Clients" (e.g., 5000+), "Uptime SLA" (99.9%), "WhatsApp Support" (24/7), and "Global Locations" (10+).

2. **Product & Features Management (CRUD)**
   - Ability to create, read, update, and delete products (Hosting, Dedicated Servers, Licenses, Services).
   - Fields: Name, Description, Price, Billing Period (e.g., /mo), SKU, Category/Type, Icon, Order URL (external link for checkout).
   - Dynamic Features List: Ability to add/remove bullet points for a product.
   - **Featured Products**: A toggle/checkbox to mark a product as "Featured" or "Best Value" to dynamically display it on the homepage's Featured Products section.

3. **Navigation & Header Builder**
   - A structured interface to manage the frontend Header/Nav.
   - Ability to create Main Menu Items (e.g., "Hosting", "Licenses").
   - Ability to add/edit/delete Dropdown Items under main links (Fields: Label, URL, SVG Icon path, Description).

4. **Page Builder (CMS)**
   - A module to create entirely new custom pages.
   - Fields: Page Title, Slug (URL), Meta Description, and a rich text or markdown content area.

5. **Testimonials & FAQ Management**
   - Testimonials: Client name, role, review text, initials/avatar.
   - FAQs: Question and Answer pairs to dynamically feed the homepage FAQ accordion.

### Layout & UI Requirements:
- **Admin Layout**: A persistent sidebar navigation (using Shadcn components or a customized standard sidebar) and a top header containing breadcrumbs and a user profile dropdown.
- **Data Tables**: Use Shadcn Data Table (TanStack Table) with pagination, sorting, and row actions (Edit/Delete).
- **Forms**: Use Shadcn Form + Zod for adding/editing items (e.g., a slide-out Sheet or a Dialog for editing products).

### Instructions for your output:
1. First, provide the **TypeScript Interfaces/Types** or Prisma/Mongoose schema (as mock data structures) so I understand how the data is modeled.
2. Second, provide the code for the **Admin Layout component** (`app/admin/layout.tsx`) including the Sidebar and Header.
3. Third, provide the code for the **Product Management Page** (`app/admin/products/page.tsx`) showing the Data Table and the "Add/Edit Product" Form inside a Shadcn Dialog or Sheet. 
4. Fourth, provide the code for the **Navigation Builder Page** (`app/admin/navigation/page.tsx`) to show how I can dynamically build the header links and dropdowns.
5. Provide instructions on which Shadcn components I need to install via the CLI (e.g., `npx shadcn-ui@latest add button table form...`).

Please write clean, modular, and well-commented code. Prioritize the UI structure and state management assuming we will wire it up to an API later.













Act as an expert Next.js (App Router) and Supabase developer. 

I need to build the backend for my Qazi.Host web app and Admin Panel using Supabase. I want to use supabase with Next.js Server Actions for  (CRUD) and data fetching.

Here is the exact SQL Schema I have executed in my Supabase SQL Editor. 

```sql
-- 1. Homepage Stats (Singleton table)
CREATE TABLE homepage_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clients INTEGER NOT NULL DEFAULT 5000,
    uptime DECIMAL(4,2) NOT NULL DEFAULT 99.9,
    support INTEGER NOT NULL DEFAULT 24,
    locations INTEGER NOT NULL DEFAULT 10,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Products
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    billing_period TEXT DEFAULT '/mo',
    sku TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    icon TEXT,
    order_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    features TEXT[] DEFAULT '{}',
    Built_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Navigation Builder (Self-referencing for Dropdowns)
CREATE TABLE nav_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label TEXT NOT NULL,
    url TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    parent_id UUID REFERENCES nav_items(id) ON DELETE CASCADE,
    icon TEXT,
    description TEXT
);

-- 4. Custom Pages (CMS)
CREATE TABLE pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    meta_description TEXT,
    content TEXT NOT NULL,
    Built_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. Testimonials
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    role TEXT NOT NULL,
    review_text TEXT NOT NULL,
    initials TEXT,
    stars INTEGER DEFAULT 5,
    Built_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. FAQs
CREATE TABLE faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
);

import "server-only";
import { sqlite } from "./client";
import fallbackPlans from "./fallback-plans.json";

// Seeds initial data only when tables are empty. Safe to call on every boot.

type Plan = {
  name: string;
  price: string;
  setup?: string;
  popular?: boolean;
  orderLink?: string;
  specs: { label: string; value: string }[];
};

type ProductSeed = {
  slug: string;
  name: string;
  category: "hosting" | "dedicated" | "license" | "service";
  short_description: string;
  long_description?: string;
  icon?: string;
  starting_price_usd?: string;
  starting_price_pkr?: string;
  order_url?: string;
  is_featured?: boolean;
  sort_order?: number;
  features?: string[];
  plans?: Plan[];
  page_content?: Record<string, unknown>;
};

const PRODUCTS: ProductSeed[] = [
  {
    slug: "shared-hosting",
    name: "Shared Hosting",
    category: "hosting",
    short_description: "Affordable hosting for websites and blogs.",
    starting_price_usd: "$1.99",
    starting_price_pkr: "499 PKR",
    icon: "Server",
    is_featured: true,
    sort_order: 0,
    features: [
      "Up to Unlimited Websites",
      "NVMe SSD Storage",
      "Free SSL Certificate",
      "cPanel Control Panel",
      "Mon-Fri WhatsApp Support",
    ],
    plans: [
      { name: "Shared 0", price: "Rs. 499", setup: "Rs. 50 Setup Fee", popular: false, orderLink: "https://qazi.host/cart.php?a=add&pid=67", specs: [
        { label: "Domains", value: "1" }, { label: "NVMe Storage", value: "1024 MB (1 GB)" }, { label: "Bandwidth", value: "5120 MB (5 GB)" }, { label: "FTPs", value: "Unlimited" }, { label: "SSL", value: "Free" }, { label: "Backups", value: "Free" }, { label: "Softaculous", value: "Free" }, { label: "Control Panel", value: "cPanel" }, { label: "DMCA Ignored", value: "Yes" }, { label: "Support", value: "Basic" },
      ] },
      { name: "Shared 1", price: "Rs. 999", setup: "Rs. 50 Setup Fee", popular: false, orderLink: "https://qazi.host/cart.php?a=add&pid=6", specs: [
        { label: "Domains", value: "3" }, { label: "NVMe Storage", value: "5120 MB (5 GB)" }, { label: "Bandwidth", value: "15360 MB (15 GB)" }, { label: "FTPs", value: "Unlimited" }, { label: "SSL", value: "Free" }, { label: "Backups", value: "Free" }, { label: "Softaculous", value: "Free" }, { label: "Control Panel", value: "cPanel" }, { label: "DMCA Ignored", value: "Yes" }, { label: "Support", value: "Basic" },
      ] },
      { name: "Shared 2", price: "Rs. 1,799", setup: "Rs. 50 Setup Fee", popular: true, orderLink: "https://qazi.host/cart.php?a=add&pid=8", specs: [
        { label: "Domains", value: "5" }, { label: "NVMe Storage", value: "10240 MB (10 GB)" }, { label: "Bandwidth", value: "20480 MB (20 GB)" }, { label: "FTPs", value: "Unlimited" }, { label: "SSL", value: "Free" }, { label: "Backups", value: "Free" }, { label: "Softaculous", value: "Free" }, { label: "Control Panel", value: "cPanel" }, { label: "DMCA Ignored", value: "Yes" }, { label: "Support", value: "Basic" },
      ] },
      { name: "Shared 3", price: "Rs. 2,999", setup: "Rs. 50 Setup Fee", popular: false, orderLink: "https://qazi.host/cart.php?a=add&pid=9", specs: [
        { label: "Domains", value: "10" }, { label: "NVMe Storage", value: "10240 MB (10 GB)" }, { label: "Bandwidth", value: "Unlimited" }, { label: "FTPs", value: "Unlimited" }, { label: "SSL", value: "Free" }, { label: "Backups", value: "Free" }, { label: "Softaculous", value: "Free" }, { label: "Control Panel", value: "cPanel" }, { label: "DMCA Ignored", value: "Yes" }, { label: "Support", value: "Priority" },
      ] },
    ],
    page_content: {
      hero_title: "DMCA Ignored Shared Hosting",
      hero_subtitle: "NVMe powered cPanel hosting with full DMCA protection and instant activation.",
    },
  },
  {
    slug: "reseller-hosting",
    name: "Reseller Hosting",
    category: "hosting",
    short_description: "Start your own hosting business with WHM/cPanel and white-label branding.",
    starting_price_usd: "$9.99",
    starting_price_pkr: "999 PKR",
    icon: "Users",
    is_featured: true,
    sort_order: 1,
    features: ["Free WHMCS License", "WHM/cPanel Access", "White-Label Branding", "Unlimited Bandwidth", "Priority Support"],
    plans: [],
  },
  {
    slug: "vps",
    name: "VPS Hosting",
    category: "hosting",
    short_description: "Virtual private servers with full root access.",
    icon: "Cloud",
    sort_order: 2,
    plans: [],
  },
  {
    slug: "dedicated-servers",
    name: "Dedicated Servers",
    category: "dedicated",
    short_description: "100% DMCA Ignored Dedicated Servers.",
    icon: "HardDrive",
    is_featured: true,
    sort_order: 3,
    plans: [],
  },
  { slug: "cpanel-license", name: "cPanel License", category: "license", short_description: "Official cPanel/WHM license.", icon: "KeyRound", starting_price_usd: "$12", sort_order: 10, plans: [] },
  { slug: "plesk-license", name: "Plesk License", category: "license", short_description: "Plesk Obsidian license.", icon: "KeyRound", starting_price_usd: "$10", sort_order: 11, plans: [] },
  { slug: "litespeed-license", name: "LiteSpeed License", category: "license", short_description: "LiteSpeed Web Server license.", icon: "Zap", starting_price_usd: "$8", sort_order: 12, plans: [] },
  { slug: "cloudlinux-license", name: "CloudLinux License", category: "license", short_description: "CloudLinux OS license.", icon: "Shield", starting_price_usd: "$12", sort_order: 13, plans: [] },
  { slug: "virtualizor", name: "Virtualizor License", category: "license", short_description: "Virtualizor VPS control panel.", icon: "KeyRound", sort_order: 14, plans: [] },
  { slug: "directadmin", name: "DirectAdmin License", category: "license", short_description: "DirectAdmin control panel license.", icon: "KeyRound", sort_order: 15, plans: [] },
  { slug: "jetbackup", name: "JetBackup License", category: "license", short_description: "JetBackup backup solution.", icon: "KeyRound", sort_order: 16, plans: [] },
  { slug: "softaculous", name: "Softaculous License", category: "license", short_description: "1-click installer for hundreds of apps.", icon: "KeyRound", sort_order: 17, plans: [] },
  { slug: "sitepad", name: "SitePad License", category: "license", short_description: "Drag-and-drop site builder.", icon: "KeyRound", sort_order: 18, plans: [] },
  { slug: "whmsonic", name: "WHMSonic License", category: "license", short_description: "SHOUTcast/Icecast streaming control panel.", icon: "KeyRound", sort_order: 19, plans: [] },
  { slug: "whmreseller", name: "WHMReseller License", category: "license", short_description: "WHMReseller automation.", icon: "KeyRound", sort_order: 20, plans: [] },
  { slug: "dareseller", name: "DAReseller License", category: "license", short_description: "DAReseller automation for DirectAdmin.", icon: "KeyRound", sort_order: 21, plans: [] },
  { slug: "imunify360", name: "Imunify360 License", category: "license", short_description: "Imunify360 server security suite.", icon: "Shield", sort_order: 22, plans: [] },
  { slug: "cpguard", name: "CPGuard License", category: "license", short_description: "Server security and malware scanning.", icon: "Shield", sort_order: 23, plans: [] },
  { slug: "osm", name: "OSM License", category: "license", short_description: "Outgoing Spam Monitor.", icon: "Shield", sort_order: 24, plans: [] },
];

const TESTIMONIALS: { author: string; role: string; text: string; stars: number; avatar?: string }[] = [
  { author: "Sohail Sardar", role: "Trainer / Senior Blogger", text: "As a professional blogger and trainer, I personally recommend QaziHost's services. Their support is just awesome. You will also love their services.", stars: 5, avatar: "https://i.imgur.com/2fq5q25.jpg" },
  { author: "Muhammad Faheem", role: "Senior Blogger", text: "If you are stucked at some techincal point in blogging, just call the QaziHost support, they will rescue you like 1122. Highly Recommended!", stars: 5, avatar: "https://i.imgur.com/Ghs00O4.jpg" },
  { author: "Rao Irfan", role: "Senior Blogger", text: "In 2022, when Copyright strikes were resulting as server suspension... Then I decided to try QaziHost DMCA Ignored service. performance is rocking up!", stars: 5, avatar: "https://i.imgur.com/GUORUhh.jpg" },
  { author: "Fatima Ijaz", role: "Blogger", text: "Qazi.Host deserves a solid five-star rating for its exceptional web hosting services. They are life saver. Their service is always up. I just love em ❤", stars: 5 },
  { author: "Muhammad Ali", role: "Blogger", text: "I recently switched to Qazi Host. The migration process was seamless. The team at Qazi Host took care of everything without any downtime.", stars: 5, avatar: "https://i.imgur.com/cPAJyOx.jpg" },
  { author: "Rana Shumail", role: " R.I.P. 💔", text: "My experience has been fantastic, and I look forward to a long and successful partnership with Qazi Host for my website hosting needs.", stars: 5, avatar: "https://i.imgur.com/XXDlrRu.jpg" },
  { author: "Muhammad Rizwan", role: "Pro Blogger", text: "I've been with Qazi Host for over a year now, and I'm extremely satisfied. The user-friendly control panel makes it easy to manage.", stars: 5, avatar: "https://i.imgur.com/ni1rMO4.png" },
  { author: "Qistas Khan", role: "Pro Blogger", text: "Choosing Qazi Host was one of the best decisions for my online business. Their plans are feature-rich and competitively priced.", stars: 5, avatar: "https://i.imgur.com/ReiTgwj.jpg" },
  { author: "Khawar Aman Khan", role: "Blogger / Designer", text: "I've tried several hosting providers, but Qazi.host stands out. Their customer support has been top-notch – responsive and knowledgeable.", stars: 5, avatar: "https://i.imgur.com/I1IXKDI.jpg" },
  { author: "Muhammad Aqeel", role: "Senior Blogger", text: "Choosing QaziHost was one of the best decisions for my business. The technical support team is not only knowledgeable but also friendly.", stars: 5, avatar: "https://i.imgur.com/foRMgX1.jpeg" },
  { author: "Webxoo Team", role: "Infrastructure Partners", text: "As the agency behind Webxoo, we choose QaziHost for all our high-traffic client projects. Their NVMe speed and Mon-Fri WhatsApp support are truly industrial-grade. Highly recommended for professionals.", stars: 5 },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How does the WhatsApp checkout work?", a: "When you click 'Order Now', we redirect you to a secure checkout page where you can review your order. Once confirmed, a pre-filled WhatsApp message opens with your order details." },
  { q: "Do I need an account to place an order?", a: "No account is required on this website. You can place orders directly via WhatsApp and manage your services through our partner portal." },
  { q: "What payment methods do you accept?", a: "We accept bank transfers (HBL, UBL, Meezan), EasyPaisa, JazzCash, Payoneer, and cryptocurrency (USDT)." },
  { q: "How fast is the provisioning?", a: "Shared hosting and licenses are activated within 1 hour of payment confirmation. Dedicated servers are provisioned within 6-24 hours." },
  { q: "Can I upgrade my plan later?", a: "Absolutely! You can upgrade at any time through your account dashboard or by messaging us on WhatsApp. We calculate pro-rated differences." },
];

const PAYMENTS: { name: string; image_url?: string }[] = [
  { name: "EasyPaisa", image_url: "https://ezmdqfujhwjlnhnncyes.supabase.co/storage/v1/object/sign/logos/easypaisa.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lNTBiOTNmYy05NTkxLTQ1NjMtYjAzYy1jOTRmMzYwZjBlY2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvcy9lYXN5cGFpc2Eud2VicCIsImlhdCI6MTc3NDg4OTg3MiwiZXhwIjo0OTI4NDg5ODcyfQ.1-43hT3wm8hBFVu0NbFMHhb8vDybuTzbJxm9GU4EUmw" },
  { name: "JazzCash", image_url: "https://ezmdqfujhwjlnhnncyes.supabase.co/storage/v1/object/sign/logos/jazzcash.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lNTBiOTNmYy05NTkxLTQ1NjMtYjAzYy1jOTRmMzYwZjBlY2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvcy9qYXp6Y2FzaC53ZWJwIiwiaWF0IjoxNzc0ODg5ODkxLCJleHAiOjQ5Mjg0ODk4OTF9.oAp6h_vKVln0W-YmTHQw-Ot8FdUuxCnPYASJ2DPIpH0" },
  { name: "Bank Transfer" },
  { name: "Crypto" },
  { name: "SadaPay", image_url: "https://ezmdqfujhwjlnhnncyes.supabase.co/storage/v1/object/sign/logos/sadapay.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lNTBiOTNmYy05NTkxLTQ1NjMtYjAzYy1jOTRmMzYwZjBlY2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvcy9zYWRhcGF5LndlYnAiLCJpYXQiOjE3NzQ4ODk5MjUsImV4cCI6NDkyODQ4OTkyNX0.TkmjIIMiRVDnEsy__1X38YaFW2iu828iTI0FTSzKCN0" },
  { name: "NayaPay", image_url: "https://ezmdqfujhwjlnhnncyes.supabase.co/storage/v1/object/sign/logos/nayapay.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lNTBiOTNmYy05NTkxLTQ1NjMtYjAzYy1jOTRmMzYwZjBlY2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvcy9uYXlhcGF5LndlYnAiLCJpYXQiOjE3NzQ4ODk5MDgsImV4cCI6NDkyODQ4OTkwOH0.EqvulFMQw0nqoXnTifbDEsS9TTt2txa0gLc-reQzIS8" },
];

const SITE_SETTINGS: { key: string; value: string; type?: string }[] = [
  { key: "logo_url", value: "https://ezmdqfujhwjlnhnncyes.supabase.co/storage/v1/object/sign/logos/logo.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lNTBiOTNmYy05NTkxLTQ1NjMtYjAzYy1jOTRmMzYwZjBlY2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvcy9sb2dvLndlYnAiLCJpYXQiOjE3NzQ4ODk4MzcsImV4cCI6NDkyODQ4OTgzN30.4pZItOynf6zIbZSyooOBCpBjzJSrPznB522kz5Rb-n0", type: "image" },
  { key: "site_name", value: "Qazi.Host" },
  { key: "whatsapp_number", value: "923043126626" },
  { key: "whatsapp_default_message", value: "Hi Qazi.Host, I'm interested in your services and have some questions." },
  { key: "hero_title_pre", value: "Get Super Fast," },
  { key: "hero_title_grad", value: "DMCA Ignored Hosting" },
  { key: "hero_title_post", value: "at Cheap Prices" },
  { key: "hero_subtitle", value: "Welcome to QaziHost. Jump into super-fast hosting without emptying your bank wallet! Our Cheap DMCA Ignored Hosting isn't just about speed and prices, it's like having friendly superheroes ready to help with anything, anytime. No website problem is too tricky for our team. Get ready for a smooth ride with hosting that's easy on your wallet and support that's always there for you!", type: "text" },
  { key: "ceo_promise_title", value: "CEO's Promise" },
  { key: "ceo_promise_label", value: "Commitment to Privacy" },
  { key: "ceo_promise_text", value: "At QaziHost, your privacy means everything to us, your data is 100% safe here. We don't peek, sell, or share your sensitive info with anyone. Our team works on strict, minimal access, only what's absolutely necessary, nothing more. Your privacy stays locked deep in the CEO's mind, and it's never going anywhere. Thanks for trusting us and helping make QaziHost the #1 DMCA Ignored hosting company in Pakistan. You focus on growing your sites, we'll handle the privacy & security part.", type: "text" },
  { key: "ceo_photo", value: "https://lh3.googleusercontent.com/p/AF1QipMD0XNvQEk75V9wTQ6hjeqpPIR9xLtr07dtDfo-=w243-h304-n-k-no-nu", type: "image" },
  { key: "footer_about", value: "Your trusted partner for premium DMCA Ignored hosting and shared licenses. Powering thousands of websites with industrial-grade infrastructure.", type: "text" },
  { key: "footer_copyright_suffix", value: "Pakistan's #1 DMCA Ignored Hosting." },
  { key: "support_hours", value: "Mon-Fri: 12PM - 12AM PST" },
  // Status bar
  { key: "status_bar_text", value: "All Systems Operational" },
  { key: "status_bar_uptime", value: "Uptime: 99.9%" },
  { key: "status_bar_servers", value: "12 Servers Online" },
  // Homepage search & hero CTA
  { key: "search_placeholder", value: "Search for hosting, servers, licenses..." },
  { key: "hero_cta_label", value: "View Featured Plans" },
  // Homepage — Featured Section
  { key: "featured_section_label", value: "DMCA Ignored" },
  { key: "featured_section_title", value: "DMCA Ignored Hostings & Cheap Shared Licenses" },
  { key: "featured_section_desc", value: "Welcome to our rebel's corner – DMCA Ignored Shared Hosting! No copyright drama here, just a space where your website can kick back, relax, and do its thing. Perfect for newbies or those rocking a single page sites with less traffic. Your content, your rules. Now let's talk about our DMCA Ignored Reseller Hosting plan – your content's safe heaven with no copyright headaches! Ideal for content-rich sites with lots of traffic, because here, your website rules the internet kingdom worry-free.", type: "textarea" },
  // Homepage — Featured Cards
  { key: "shared_card_tag", value: "Most Selling" },
  { key: "shared_card_title", value: "Shared Hosting" },
  { key: "shared_card_desc", value: "Perfect for personal websites, blogs, and small businesses. NVMe SSD, free SSL, and cPanel included.", type: "textarea" },
  { key: "reseller_card_tag", value: "Best Offer" },
  { key: "reseller_card_title", value: "Reseller Hosting" },
  { key: "reseller_card_desc", value: "Start your own hosting business with WHM/cPanel, free WHMCS, and white-label branding.", type: "textarea" },
  { key: "licenses_card_tag", value: "Instant Activation" },
  { key: "licenses_card_title", value: "Licenses" },
  { key: "licenses_card_desc", value: "cPanel, Plesk, LiteSpeed, and CloudLinux licenses at up to 40% off direct pricing.", type: "textarea" },
  // Homepage — Dedicated / DMCA
  { key: "dedicated_section_label", value: "Enterprise Solutions" },
  { key: "dedicated_section_title", value: "100% DMCA Ignored Dedicated Servers" },
  { key: "dedicated_section_desc", value: "QaziHost's 100% DMCA Ignored Dedicated Servers with Unbeatable Discounts on Server Licenses! Experience high-performance servers at remarkably affordable prices. Unlock the full potential of your hosting with our robust servers, and take advantage of exclusive discounts on server licenses for a cost-effective solution tailored to your needs.", type: "textarea" },
  { key: "custom_packages_text", value: "<strong>Custom Packages:</strong> Need a custom server configuration? Contact us at <a href=\"https://wa.me/923043126626?text=Hi%2C%20I%20need%20a%20custom%20package\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: var(--green); text-decoration: underline; font-weight: 600;\">WhatsApp</a> and we will create it for you at reasonable prices.", type: "html" },
  { key: "prohibited_text", value: "<strong>STRICTLY PROHIBITED:</strong> Spamming / Phishing / Bruteforce / Floods / Attacks / Scanning / Pornography / Open Proxy / Malware Distribution / Botnets / Terrorist activities / Crypto Mining is STRICTLY NOT allowed. If found involved in such activities, your services will be suspended immediately with NO refund.", type: "html" },
  // Homepage — Process
  { key: "process_section_label", value: "Simple Process" },
  { key: "process_section_title", value: "Get Started in Minutes" },
  { key: "process_section_desc", value: "No complicated forms. Browse our plans, choose what you need, and complete your order via WhatsApp.", type: "textarea" },
  // Homepage — Tech
  { key: "tech_section_label", value: "Powered By" },
  { key: "tech_section_title", value: "Technologies We Support" },
  // Homepage — Final CTA
  { key: "final_cta_title", value: "Ready to Launch?" },
  { key: "final_cta_subtitle", value: "Join 5,000+ professionals who trust Qazi.Host for their infrastructure needs.", type: "textarea" },
  { key: "final_cta_primary_label", value: "Get Started" },
  { key: "final_cta_secondary_label", value: "Chat on WhatsApp" },
  // SEO / Verification
  { key: "google_site_verification", value: "" },
  // Status page iframe
  { key: "status_iframe_url", value: "https://status.qazi.host/", type: "url" },
  { key: "status_page_link", value: "/status", type: "url" },
  // Legal pages — admin-editable HTML bodies. Keep these as text/html so
  // pasted markup renders directly.
  {
    key: "privacy_html",
    type: "html",
    value: `
<h2>Will my information be shared?</h2>
<p><strong>Will my personal information be shared with third parties?</strong> No, we do not share your personal information with any third parties. Your privacy is our priority.</p>
<p><strong>Do you sell or rent customer information?</strong> No, we do not sell or rent any customer information. Your data is strictly used for the purposes outlined in our privacy policy.</p>

<h2>Data Usage</h2>
<p><strong>How is my personal information used by your company?</strong> We only use your personal information for the purposes specified in our privacy policy. This typically includes providing and improving our services and ensuring the security of your account.</p>

<h2>Payment Security</h2>
<p><strong>Are my payment details safe and secure?</strong> Yes, your payment details are treated with the utmost confidentiality. We use secure and encrypted methods to process payments, and we do not store your payment information.</p>

<h2>Site Security</h2>
<p><strong>How do you protect my personal information from unauthorized access?</strong> We employ industry-standard security measures to safeguard your personal information from unauthorized access, disclosure, alteration, and destruction.</p>
<p><strong>Is my information stored securely?</strong> Absolutely. We take measures to ensure that your personal information is stored securely, and access is restricted to authorized personnel only.</p>

<h2>My Rights</h2>
<p><strong>How can I access or update my personal information?</strong> You can typically access and update your personal information through your account settings. Refer to our privacy policy for specific details on managing your data.</p>
<p><strong>Can I opt-out of any data collection?</strong> Yes, you may have the option to opt-out of certain data collection activities. Check our privacy policy to understand your choices and how to exercise them.</p>

<h2>Notifications</h2>
<p><strong>Will I be notified of any changes to the privacy policy?</strong> Yes, we will notify you of any significant changes to our privacy policy. It's important to stay informed about how your personal information is handled.</p>
`.trim(),
  },
  {
    key: "terms_html",
    type: "html",
    value: `
<h2>Hosting Terms</h2>
<p>By using QaziHost services, you agree to abide by our hosting terms. Accounts are provisioned for legitimate use only; abuse, fraud, or chargebacks may result in immediate suspension.</p>

<h2>Support &amp; Uptime</h2>
<p>We target 99.9% uptime on shared and reseller hosting. Support is available Mon-Fri via WhatsApp during posted hours. Best-effort assistance is provided outside those hours.</p>

<h2>Content Responsibility</h2>
<p>You are solely responsible for the content hosted on your account. QaziHost is not liable for client content. Hosting illegal material will result in immediate termination without refund.</p>

<h2>Prohibited Content</h2>
<p><strong>Strictly prohibited:</strong> spamming, phishing, brute-force, floods, attacks, scanning, pornography, open proxy, malware distribution, botnets, terrorist activities and crypto mining. Violations result in suspension with no refund.</p>

<h2>Resource Policy</h2>
<p>Unlimited plans are governed by our Fair Usage Policy. Sustained excessive CPU, RAM, or I/O usage that degrades server performance for other tenants will result in throttling or required upgrade.</p>

<h2>License Terms</h2>
<p>Shared licenses (cPanel, LiteSpeed, CloudLinux, etc.) are bound to the activated IP. Misuse, resale outside our reseller program, or attempts to extract license keys will result in immediate revocation without refund.</p>

<h2>Refund Policy</h2>
<p>Hosting plans include a 7-day money-back guarantee for new customers. Licenses, domains and setup fees are non-refundable once activated.</p>
`.trim(),
  },
  {
    key: "fair_usage_html",
    type: "html",
    value: `
<h2>What is Fair Usage?</h2>
<p>Our shared and reseller hosting plans advertise "unlimited" resources. That term reflects the absence of a hard quota on bandwidth or storage, not a license to consume infinite server capacity. The Fair Usage Policy keeps our servers fast and reliable for every tenant.</p>

<h2>CPU &amp; Memory</h2>
<p>A single account on shared hosting may use up to 1 vCPU and 1024 MB RAM in bursts. Sustained usage above these limits over a 10-minute window will be throttled. Repeated violations will be flagged and the account asked to upgrade to a VPS.</p>

<h2>Inodes &amp; Disk I/O</h2>
<p>Each account is limited to 500,000 inodes (files). Heavy disk I/O — for example unbounded log writes or backup loops — will be rate-limited to protect the shared SSD array.</p>

<h2>Bandwidth</h2>
<p>Bandwidth is unmetered for legitimate website traffic. Hot-linking, file-sharing nodes, or using the account as a download mirror are not legitimate uses and will be suspended.</p>

<h2>Email</h2>
<p>Outgoing email is capped at 200 messages per hour per account. Bulk newsletters must be sent through a dedicated email service such as Mailgun or SendGrid.</p>

<h2>What Happens If I Exceed?</h2>
<p>We will reach out via WhatsApp or email with the relevant logs and ask you to optimize or upgrade. Accounts that repeatedly impact other tenants without remediation will be suspended pending upgrade.</p>
`.trim(),
  },
];

export function runSeed() {
  const tx = sqlite.transaction(() => {
    // settings (single-row)
    const settingsCount = (sqlite.prepare("SELECT COUNT(*) AS c FROM settings").get() as any).c;
    if (settingsCount === 0) {
      sqlite.prepare("INSERT INTO settings (status_html, dashboard_note) VALUES (?, ?)").run("", "");
    }

    // homepage_stats (single-row)
    const statsCount = (sqlite.prepare("SELECT COUNT(*) AS c FROM homepage_stats").get() as any).c;
    if (statsCount === 0) {
      sqlite.prepare("INSERT INTO homepage_stats (clients, uptime_x10, support, locations) VALUES (?,?,?,?)").run(5000, 999, 100, 6000);
    }

    // site_settings
    const upsertSite = sqlite.prepare("INSERT OR IGNORE INTO site_settings (key, value, type) VALUES (?,?,?)");
    for (const s of SITE_SETTINGS) upsertSite.run(s.key, s.value, s.type ?? "text");

    // products
    const productsCount = (sqlite.prepare("SELECT COUNT(*) AS c FROM products").get() as any).c;
    if (productsCount === 0) {
      const insertProduct = sqlite.prepare(
        "INSERT INTO products (slug, name, category, short_description, long_description, icon, starting_price_usd, starting_price_pkr, order_url, is_featured, is_visible, sort_order, features, plans, page_content) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      );
      for (const p of PRODUCTS) {
        insertProduct.run(
          p.slug,
          p.name,
          p.category,
          p.short_description ?? "",
          p.long_description ?? "",
          p.icon ?? null,
          p.starting_price_usd ?? null,
          p.starting_price_pkr ?? null,
          p.order_url ?? null,
          p.is_featured ? 1 : 0,
          1,
          p.sort_order ?? 0,
          JSON.stringify(p.features ?? []),
          JSON.stringify(p.plans ?? []),
          JSON.stringify(p.page_content ?? {}),
        );
      }
    }

    // testimonials
    const testimonialsCount = (sqlite.prepare("SELECT COUNT(*) AS c FROM testimonials").get() as any).c;
    if (testimonialsCount === 0) {
      const insertT = sqlite.prepare("INSERT INTO testimonials (author, role, text, stars, avatar, sort_order) VALUES (?,?,?,?,?,?)");
      TESTIMONIALS.forEach((t, i) => insertT.run(t.author, t.role, t.text, t.stars, t.avatar ?? null, i));
    }

    // faqs
    const faqCount = (sqlite.prepare("SELECT COUNT(*) AS c FROM faqs").get() as any).c;
    if (faqCount === 0) {
      const insertF = sqlite.prepare("INSERT INTO faqs (question, answer, sort_order) VALUES (?,?,?)");
      FAQS.forEach((f, i) => insertF.run(f.q, f.a, i));
    }

    // payment_methods
    const payCount = (sqlite.prepare("SELECT COUNT(*) AS c FROM payment_methods").get() as any).c;
    if (payCount === 0) {
      const insertP = sqlite.prepare("INSERT INTO payment_methods (name, image_url, sort_order) VALUES (?,?,?)");
      PAYMENTS.forEach((p, i) => insertP.run(p.name, p.image_url ?? null, i));
    }

    // products — backfill plans for any existing product whose `plans`
    // column is still empty. Each product page used to have its plans
    // hard-coded in TSX; we extract those once into fallback-plans.json
    // (see scripts/extract-fallback-plans.mjs) and copy them into the DB so
    // the admin editor and dynamic renderers both see them. This is
    // idempotent: rows already populated by an admin edit are left alone.
    const findEmpty = sqlite.prepare("SELECT slug FROM products WHERE COALESCE(plans, '[]') IN ('[]', '') AND slug = ?");
    const updatePlans = sqlite.prepare("UPDATE products SET plans = ?, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE slug = ?");
    for (const [slug, plans] of Object.entries(fallbackPlans as Record<string, unknown[]>)) {
      if (!Array.isArray(plans) || plans.length === 0) continue;
      if (!findEmpty.get(slug)) continue;
      updatePlans.run(JSON.stringify(plans), slug);
    }
  });
  // BEGIN IMMEDIATE so concurrent processes (e.g. parallel `next build`
  // workers) queue on the SQLite busy_timeout instead of failing the
  // deferred-to-write upgrade with SQLITE_BUSY.
  tx.immediate();
}

export interface SearchItem {
  title: string;
  description: string;
  url: string;
  category: string;
  isDirectOrder?: boolean;
  whatsappMessage?: string;
}

export const searchData: SearchItem[] = [
  // Landing Pages (General Searches)
  { title: "Shared Hosting", description: "Affordable shared hosting plans for personal websites and small businesses. NVMe SSD, Free SSL.", url: "/shared-hosting", category: "Hosting" },
  { title: "Reseller Hosting", description: "Start your own hosting business with WHM/cPanel and white-label branding.", url: "/reseller-hosting", category: "Hosting" },
  { title: "VPS", description: "High-performance virtual private servers with full root access and NVMe storage.", url: "/vps", category: "Hosting" },
  { title: "Dedicated Servers", description: "100% DMCA ignored dedicated servers with full privacy protection and unmetered bandwidth.", url: "/dedicated-servers", category: "Servers" },

  // Shared Hosting Plans (Direct)
  { title: "Shared 0", description: "Shared Hosting Plan: 1 Domain, 1GB NVMe SSD, 5GB Bandwidth.", url: "/shared-hosting", category: "Shared Hosting Plan", isDirectOrder: true, whatsappMessage: "Hi, I want to order Shared Hosting - Shared 0 (Rs. 499)" },
  { title: "Shared 1", description: "Shared Hosting Plan: 3 Domains, 5GB NVMe SSD, 15GB Bandwidth.", url: "/shared-hosting", category: "Shared Hosting Plan", isDirectOrder: true, whatsappMessage: "Hi, I want to order Shared Hosting - Shared 1 (Rs. 999)" },
  { title: "Shared 2", description: "Shared Hosting Plan: 5 Domains, 10GB NVMe SSD, 20GB Bandwidth.", url: "/shared-hosting", category: "Shared Hosting Plan", isDirectOrder: true, whatsappMessage: "Hi, I want to order Shared Hosting - Shared 2 (Rs. 1,799)" },
  { title: "Shared 3", description: "Shared Hosting Plan: 10 Domains, 10GB NVMe SSD, Unlimited Bandwidth.", url: "/shared-hosting", category: "Shared Hosting Plan", isDirectOrder: true, whatsappMessage: "Hi, I want to order Shared Hosting - Shared 3 (Rs. 2,999)" },
  { title: "Shared 4", description: "Shared Hosting Plan: 15 Domains, 15GB NVMe SSD, Unlimited Bandwidth.", url: "/shared-hosting", category: "Shared Hosting Plan", isDirectOrder: true, whatsappMessage: "Hi, I want to order Shared Hosting - Shared 4 (Rs. 3,999)" },
  { title: "Shared 5", description: "Shared Hosting Plan: 20 Domains, Unlimited NVMe SSD, Unlimited Bandwidth.", url: "/shared-hosting", category: "Shared Hosting Plan", isDirectOrder: true, whatsappMessage: "Hi, I want to order Shared Hosting - Shared 5 (Rs. 4,999)" },

  // Reseller Hosting Plans (Direct)
  { title: "Reseller 0", description: "Reseller Hosting Plan: 1 cPanel Account, 2.5GB NVMe SSD.", url: "/reseller-hosting", category: "Reseller Hosting Plan", isDirectOrder: true, whatsappMessage: "Hi, I want to order Reseller Hosting - Reseller 0 (PKR 999.00)" },
  { title: "Reseller 1", description: "Reseller Hosting Plan: 2 cPanel Accounts, 5GB NVMe SSD.", url: "/reseller-hosting", category: "Reseller Hosting Plan", isDirectOrder: true, whatsappMessage: "Hi, I want to order Reseller Hosting - Reseller 1 (PKR 1499.00)" },
  { title: "Reseller 2", description: "Reseller Hosting Plan: 5 cPanel Accounts, 10GB NVMe SSD.", url: "/reseller-hosting", category: "Reseller Hosting Plan", isDirectOrder: true, whatsappMessage: "Hi, I want to order Reseller Hosting - Reseller 2 (PKR 2999.00)" },
  { title: "Reseller 3", description: "Reseller Hosting Plan: 10 cPanel Accounts, 10GB/Site NVMe SSD.", url: "/reseller-hosting", category: "Reseller Hosting Plan", isDirectOrder: true, whatsappMessage: "Hi, I want to order Reseller Hosting - Reseller 3 (PKR 4999.00)" },
  { title: "Reseller 4", description: "Reseller Hosting Plan: 15 cPanel Accounts, 10GB/Site NVMe SSD.", url: "/reseller-hosting", category: "Reseller Hosting Plan", isDirectOrder: true, whatsappMessage: "Hi, I want to order Reseller Hosting - Reseller 4 (PKR 6999.00)" },
  { title: "Reseller 5", description: "Reseller Hosting Plan: 25 cPanel Accounts, 15GB/Site NVMe SSD.", url: "/reseller-hosting", category: "Reseller Hosting Plan", isDirectOrder: true, whatsappMessage: "Hi, I want to order Reseller Hosting - Reseller 5 (PKR 9999.00)" },
  { title: "Reseller 6", description: "Reseller Hosting Plan: 40 cPanel Accounts, 15GB/Site NVMe SSD.", url: "/reseller-hosting", category: "Reseller Hosting Plan", isDirectOrder: true, whatsappMessage: "Hi, I want to order Reseller Hosting - Reseller 6 (PKR 11999.00)" },
  { title: "Reseller 7", description: "Reseller Hosting Plan: 60 cPanel Accounts, 15GB/Site NVMe SSD.", url: "/reseller-hosting", category: "Reseller Hosting Plan", isDirectOrder: true, whatsappMessage: "Hi, I want to order Reseller Hosting - Reseller 7 (PKR 16999.00)" },
  { title: "Reseller 8", description: "Reseller Hosting Plan: 80 cPanel Accounts, 15GB/Site NVMe SSD.", url: "/reseller-hosting", category: "Reseller Hosting Plan", isDirectOrder: true, whatsappMessage: "Hi, I want to order Reseller Hosting - Reseller 8 (PKR 20999.00)" },

  // Dedicated Server Series (Direct)
  { title: "DS-E3", description: "Dedicated Server: Intel Xeon E3-1230, 32GB RAM, 1TB NVMe.", url: "/dedicated-servers", category: "Dedicated Servers Plan", isDirectOrder: true, whatsappMessage: "Hi, I want to order Dedicated Server - DS-E3 (PKR 24,835)" },
  { title: "DS-E5", description: "Dedicated Server: Intel Xeon E5-2670, 64GB RAM, 2TB NVMe.", url: "/dedicated-servers", category: "Dedicated Servers Plan", isDirectOrder: true, whatsappMessage: "Hi, I want to order Dedicated Server - DS-E5 (PKR 41,570)" },
  { title: "DS-Dual", description: "Dedicated Server: Dual Xeon E5-2690, 128GB RAM, 4TB NVMe RAID.", url: "/dedicated-servers", category: "Dedicated Servers Plan", isDirectOrder: true, whatsappMessage: "Hi, I want to order Dedicated Server - DS-Dual (PKR 83,420)" },

  // Licenses (General/Direct)
  { title: "cPanel License (VPS)", description: "Shared cPanel license for VPS servers. Instant activation on your IP.", url: "/cpanel-license", category: "Licenses", isDirectOrder: true, whatsappMessage: "Hi, I want to order cPanel License (VPS) - PKR 1,200.00" },
  { title: "cPanel License (DS)", description: "Shared cPanel license for Dedicated Servers. Unlimited accounts.", url: "/cpanel-license", category: "Licenses", isDirectOrder: true, whatsappMessage: "Hi, I want to order cPanel License (Dedicated Server) - PKR 1,500.00" },
  { title: "LiteSpeed License", description: "Supercharge your website speed with LiteSpeed Web Server licenses.", url: "/litespeed-license", category: "Licenses" },
  { title: "Plesk License", description: "Affordable Plesk licenses for web professionals and hosting businesses.", url: "/plesk-license", category: "Licenses" },
  { title: "CloudLinux License", description: "Improve server stability and security with CloudLinux OS.", url: "/cloudlinux-license", category: "Licenses" },
  { title: "Virtualizor License", description: "Powerful web-based VPS Control Panel to manage your servers.", url: "/virtualizor", category: "Licenses" },
  { title: "DirectAdmin License", description: "Fast, lightweight, and easy-to-use hosting control panel.", url: "/directadmin", category: "Licenses" },
  { title: "JetBackup License", description: "Leading backup solution for cPanel and DirectAdmin servers.", url: "/jetbackup", category: "Licenses" },
  { title: "Softaculous License", description: "Install hundreds of open-source applications with one click.", url: "/softaculous", category: "Licenses" },
  { title: "SitePad License", description: "Drag & drop website builder with over 500 responsive themes.", url: "/sitepad", category: "Licenses" },
  { title: "WHMSonic License", description: "Popular cPanel shoutcast / streaming media plugin.", url: "/whmsonic", category: "Licenses" },
  { title: "WHMReseller License", description: "Master reseller addon for cPanel/WHM functionality.", url: "/whmreseller", category: "Licenses" },
  { title: "DAReseller License", description: "Master reseller addon for DirectAdmin functionality.", url: "/dareseller", category: "Licenses" },
  { title: "Imunify360 License", description: "Next-gen security solution for Linux web servers.", url: "/imunify360", category: "Licenses" },
  { title: "CPGuard License", description: "Powerful cPanel security and malware protection.", url: "/cpguard", category: "Licenses" },
  { title: "OSM License", description: "On-site management licenses for various hosting stacks.", url: "/osm", category: "Licenses" },

  // Pages
  { title: "Partner Program", description: "Join our partner program to earn rewards and grow with us.", url: "/partner", category: "Pages" },
  { title: "Blog", description: "Read the latest news, tutorials, and hosting tips directly from our experts.", url: "/blog", category: "Pages" },
  { title: "Status Page", description: "Check real-time status of our network and servers.", url: "/status", category: "Pages" },
];

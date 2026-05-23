// Maps the short SKU used by the blog admin checkboxes (e.g. "shared")
// to the product slug stored in the products table (e.g. "shared-hosting"),
// which also matches the public page URL.
export const SKU_TO_PRODUCT_SLUG: Record<string, string> = {
  shared: "shared-hosting",
  reseller: "reseller-hosting",
  vps: "vps",
  dedicated: "dedicated-servers",
  cpanel: "cpanel-license",
  cloudlinux: "cloudlinux-license",
  directadmin: "directadmin",
  virtualizor: "virtualizor",
  whmsonic: "whmsonic",
  whmreseller: "whmreseller",
  dareseller: "dareseller",
  jetbackup: "jetbackup",
  plesk: "plesk-license",
  softaculous: "softaculous",
  sitepad: "sitepad",
  litespeed: "litespeed-license",
  imunify360: "imunify360",
  cpguard: "cpguard",
  osm: "osm",
};

export function skuToProductSlug(sku: string): string {
  return SKU_TO_PRODUCT_SLUG[sku] ?? sku;
}

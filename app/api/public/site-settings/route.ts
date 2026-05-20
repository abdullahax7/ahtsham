import { NextResponse } from "next/server";
import { getAllSiteSettings } from "../../../../lib/db/repos";

export const runtime = "nodejs";
export const revalidate = 60;

export async function GET() {
  const map = await getAllSiteSettings();
  const obj: Record<string, string> = {};
  map.forEach((v, k) => { obj[k] = v.value; });
  return NextResponse.json(obj, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}

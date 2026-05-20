import { NextResponse } from "next/server";
import { getAllSiteSettings } from "../../../../lib/db/repos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const all = await getAllSiteSettings();
  const obj: Record<string, string> = {};
  for (const [k, v] of Object.entries(all)) obj[k] = v.value;
  return NextResponse.json(obj);
}

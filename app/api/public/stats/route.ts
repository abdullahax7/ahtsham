import { NextResponse } from "next/server";
import { getHomepageStats } from "../../../../lib/db/repos";

export const runtime = "nodejs";
export const revalidate = 60;

export async function GET() {
  const s = await getHomepageStats();
  return NextResponse.json(s, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}

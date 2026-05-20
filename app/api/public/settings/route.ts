import { NextResponse } from "next/server";
import { getSettings } from "../../../../lib/db/repos";

export const runtime = "nodejs";
export const revalidate = 60;

export async function GET() {
  const s = await getSettings();
  return NextResponse.json(
    { status_html: s.status_html, dashboard_note: s.dashboard_note },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } },
  );
}

import { NextResponse } from "next/server";
import { getSettings } from "../../../../lib/db/repos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const s = await getSettings();
  return NextResponse.json({ status_html: s.status_html, dashboard_note: s.dashboard_note });
}

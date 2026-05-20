import { NextResponse } from "next/server";
import { getHomepageStats } from "../../../../lib/db/repos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const s = await getHomepageStats();
  return NextResponse.json(s);
}

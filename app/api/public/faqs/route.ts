import { NextResponse } from "next/server";
import { listFaqs } from "../../../../lib/db/repos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await listFaqs();
  return NextResponse.json(rows);
}

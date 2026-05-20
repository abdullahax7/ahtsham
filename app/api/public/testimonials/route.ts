import { NextResponse } from "next/server";
import { listTestimonials } from "../../../../lib/db/repos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await listTestimonials();
  return NextResponse.json(rows);
}

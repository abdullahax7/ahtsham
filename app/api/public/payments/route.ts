import { NextResponse } from "next/server";
import { listPaymentMethods } from "../../../../lib/db/repos";

export const runtime = "nodejs";
export const revalidate = 60;

export async function GET() {
  const rows = await listPaymentMethods();
  return NextResponse.json(rows, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}

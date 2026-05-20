import { NextResponse } from "next/server";
import { listPaymentMethods } from "../../../../lib/db/repos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await listPaymentMethods();
  return NextResponse.json(rows);
}

import { NextResponse } from "next/server";
import { listBlogs } from "../../../../../lib/db/repos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productSku = searchParams.get("product") ?? undefined;
  const limit = Number(searchParams.get("limit") ?? "3");
  const { rows } = await listBlogs({ productSku, sort: "newest", page: 1, perPage: limit });
  return NextResponse.json(rows);
}

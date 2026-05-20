import { NextResponse } from "next/server";
import { listBlogs } from "../../../../lib/db/repos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") ?? "";
  const tag = searchParams.get("tag") ?? undefined;
  const productSku = searchParams.get("product") ?? undefined;
  const sort = (searchParams.get("sort") as any) ?? "newest";
  const page = Number(searchParams.get("page") ?? "1");
  const perPage = Number(searchParams.get("perPage") ?? "9");

  const { rows, total } = await listBlogs({ query, tag, productSku, sort, page, perPage });

  return NextResponse.json({ rows, total });
}

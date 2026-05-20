import { NextResponse } from "next/server";
import { getProductBySlug } from "../../../../../lib/db/repos";

export const runtime = "nodejs";
export const revalidate = 60;

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json(product, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}

import { readList } from "@/lib/schema/articles";
import { db } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: number } }
) {
  const param = await params;
  const { id } = param;
  try {
    const savedArticle = await db
      .select()
      .from(readList)
      .where(eq(readList.articleId, id));

    return NextResponse.json(savedArticle);
  } catch (err) {
    return Response.json({ error: "Failed fetching articles" });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: number } }
) {
  const { id } = await params;
  const res = await req.json();

  const result = await db
    .select({ count: readList.id })
    .from(readList)
    .where(eq(readList.articleId, id));

  const exists = (result[0]?.count ?? 0) > 0;

  if (!exists) {
    const response = await db
      .insert(readList)
      .values({ ownerId: res.ownerId, articleId: id })
      .returning({ ownerId: readList.ownerId });
    return NextResponse.json(response);
  } else {
    const response = await db
      .delete(readList)
      .where(eq(readList.articleId, id));
    return NextResponse.json(response);
  }
}

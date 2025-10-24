import { articles } from "@/drizzle/schema";
import { db } from "@/lib/schema/schema";
import { and, eq, ne } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { category: string; id: number } }
) {
  const { category, id } = await params;

  try {
    const response = await db
      .select()
      .from(articles)
      .where(and(eq(articles.category, category), ne(articles.id, id)))
      .limit(3);
    return NextResponse.json(response);
  } catch (err) {
    Response.json({ error: "Failed fetching articles" });
  }
}

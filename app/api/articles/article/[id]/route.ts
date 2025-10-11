import { articles } from "@/lib/schema/articles";
import { db } from "@/lib/schema/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: number } }
) {
  const id = params.id;

  try {
    // if (id) {
    const article = await db.select().from(articles).where(eq(articles.id, id));

    if (!article.length) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(article);
    // }
  } catch (err) {
    console.log("Error fetching articles:", err);
    Response.json({ error: "Failed fetching articles" });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: number } }
) {
  const id = params.id;

  try {
    await db
      .update(articles)
      .set({ views: sql`${articles.views} + 1` })
      .where(eq(articles.id, id));
    return NextResponse.json({ message: "View count incremented" });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

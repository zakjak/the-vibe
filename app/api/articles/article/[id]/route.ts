import { articles, comments } from "@/lib/schema/articles";
import { db, users } from "@/lib/schema/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: number } }
) {
  const { searchParams } = new URL(req.url);
  const param = await params;
  const { id } = param;

  const page = Number(searchParams.get("page")) || 1;

  const nextPage = page * 5;

  try {
    if (id) {
      const article = await db
        .select()
        .from(articles)
        .where(eq(articles.id, id));

      const articleComments = await db
        .select()
        .from(comments)
        .where(eq(comments.postId, id))
        .leftJoin(users, eq(comments.ownerId, users.id))
        .limit(nextPage);

      const lastComment = await db
        .select()
        .from(comments)
        .orderBy(sql`${comments.id}`)
        .limit(1);

      return NextResponse.json({ article, articleComments, lastComment });
    } else {
      return NextResponse.json(
        { error: "Article does not exists" },
        { status: 404 }
      );
    }
  } catch (err) {
    console.log("Error fetching articles:", err);
    return Response.json({ error: "Failed fetching articles" });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: number } }
) {
  const { id } = await params;

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

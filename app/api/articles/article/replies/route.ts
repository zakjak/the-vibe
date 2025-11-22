import { comments } from "@/lib/schema/articles";
import { db, users } from "@/lib/schema/schema";
import { asc, desc, eq, sql } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const parentId = Number(searchParams.get("parentId"));
  const limit = Number(searchParams.get("limit")) || 5;
  const offset = Number(searchParams.get("offset")) || 0;

  const replies = await db
    .select()
    .from(comments)
    .where(eq(comments.parentId, parentId))
    .leftJoin(users, eq(comments.ownerId, users.id))
    .orderBy(desc(comments.date))
    .limit(limit)
    .offset(offset);

  const lastComment = await db
    .select()
    .from(comments)
    .where(eq(comments.parentId, parentId))
    .orderBy(asc(sql`${comments.id}`))
    .limit(1);

  return Response.json({ replies, lastComment });
}

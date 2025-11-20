import { comments } from "@/lib/schema/articles";
import { db, users } from "@/lib/schema/schema";
import { desc, eq } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const parentid = Number(searchParams.get("parentId"));
  const limit = Number(searchParams.get("limit")) || 5;
  const offset = Number(searchParams.get("offset")) || 0;

  const replies = await db
    .select()
    .from(comments)
    .where(eq(comments.parentId, parentid))
    .leftJoin(users, eq(comments.ownerId, users.id))
    .orderBy(desc(comments.date))
    .limit(limit)
    .offset(offset);

  return Response.json(replies);
}

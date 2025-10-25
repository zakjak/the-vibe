import { articles } from "@/drizzle/schema";
import { db } from "@/lib/schema/schema";
import { count, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  try {
    const page = Number(searchParams.get("page")) || 1;
    const q = String(searchParams.get("q"));
    const query = q.replaceAll("+", " ");

    const calculatePageNumber = (page - 1) * 10;

    const countRows = await db.select({ count: count() }).from(articles)
      .where(sql`(
        setweight(to_tsvector('english', ${articles.title}), 'A') ||
        setweight(to_tsvector('english', ${articles.story}), 'B')) ||
        setweight(to_tsvector('english', ${articles.author}), 'C') ||
        setweight(to_tsvector('english', ${articles.category}), 'D')
        @@ plainto_tsquery('english', ${query}
      )`);
    const pageNumber = Math.ceil(countRows[0].count / 10);

    const search = await db
      .select()
      .from(articles)
      .where(
        sql`(
        setweight(to_tsvector('english', ${articles.title}), 'A') ||
        setweight(to_tsvector('english', ${articles.story}), 'B') ||
        setweight(to_tsvector('english', ${articles.author}), 'C') ||
        setweight(to_tsvector('english', ${articles.category}), 'D')) 
        @@ plainto_tsquery('english', ${query}
      )`
      )
      .limit(10)
      .offset(calculatePageNumber);

    return NextResponse.json({ search, pageNumber, countRows });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server failed. Try again!!!");
  }
}

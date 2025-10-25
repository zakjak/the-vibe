import { articles } from "@/drizzle/schema";
import { db } from "@/lib/schema/schema";
import { count, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  try {
    const page = Number(searchParams.get("page")) || 1;

    const calculatePageNumber = (page - 1) * 10;
    const countRows = await db
      .select({ count: count() })
      .from(articles)
      .where(eq(articles.category, "sports"));
    const pageNumber = Math.ceil(countRows[0].count / 10);
    const response = await db
      .select()
      .from(articles)
      .where(eq(articles.category, "sports"))
      .limit(10)
      .offset(calculatePageNumber);

    return NextResponse.json({ response, pageNumber });
  } catch (err) {
    console.log("Error fetching articles:", err);
    return NextResponse.json({ error: "Failed fetching articles" });
  }
}

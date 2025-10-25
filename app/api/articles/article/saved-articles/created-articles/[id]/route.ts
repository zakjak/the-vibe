import { articles } from "@/lib/schema/articles";
import { db } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const param = await params;
  const { id } = param;
  const { searchParams } = new URL(req.url);
  try {
    try {
      const page = Number(searchParams.get("page")) || 1;
      const calculatePageNumber = (page - 1) * 10;

      const createdArticles = await db
        .select()
        .from(articles)
        .where(eq(articles?.ownerId, id))
        .limit(10)
        .offset(calculatePageNumber);

      return NextResponse.json(createdArticles);
    } catch (err) {
      console.log("Error fetching articles:", err);
      NextResponse.json({ error: "Failed fetching articles" });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Failed fetching articles" });
  }
}

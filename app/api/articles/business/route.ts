import { articles } from "@/drizzle/schema";
import { db } from "@/lib/schema/schema";
import { count, eq } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  try {
    const page = Number(searchParams.get("page")) || 1;

    const calculatePageNumber = (page - 1) * 10;
    const countRows = await db
      .select({ count: count() })
      .from(articles)
      .where(eq(articles.category, "business"));
    const pageNumber = Math.ceil(countRows[0].count / 10);
    const response = await db
      .select()
      .from(articles)
      .where(eq(articles.category, "business"))
      .limit(10)
      .offset(calculatePageNumber);

    return Response.json({ response, pageNumber });
  } catch (err) {
    console.log("Error fetching articles:", err);
    Response.json({ error: "Failed fetching articles" });
  }
}

import { articles } from "@/drizzle/schema";
import { db } from "@/lib/schema/schema";
import { eq, sql } from "drizzle-orm";

export async function GET(req: Request, res: Response) {
  try {
    const [allPolitics, allSports, allBusiness, allEntertainment] =
      await Promise.all([
        db
          .select()
          .from(articles)
          .where(eq(articles.category, "politics"))
          .limit(1),
        db
          .select()
          .from(articles)
          .where(eq(articles.category, "sports"))
          .limit(1),
        db
          .select()
          .from(articles)
          .where(eq(articles.category, "business"))
          .limit(1),
        db
          .select()
          .from(articles)
          .where(eq(articles.category, "entertainment"))
          .limit(1),
      ]);
    const topOtherStories = [...allSports, ...allBusiness, ...allEntertainment];
    return Response.json({
      allPolitics,
      topOtherStories,
    });
  } catch (err) {
    console.log("Error fetching articles:", err);
    Response.json({ error: "Failed fetching articles" });
  }
}

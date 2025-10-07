import { articles } from "@/drizzle/schema";
import { db } from "@/lib/schema/schema";
import { eq, sql } from "drizzle-orm";

export async function GET(req: Request, res: Response) {
  try {
    const [latestPolitics, latestSports, latestBusiness, latestEntertainment] =
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

    const [
      topPolitics,
      topSports,
      topBusiness,
      topEntertainment,
      topInnovation,
      topCulture,
      topTechnology,
    ] = await Promise.all([
      db
        .select()
        .from(articles)
        .where(eq(articles.category, "politics"))
        .limit(6),
      db
        .select()
        .from(articles)
        .where(eq(articles.category, "sports"))
        .limit(6),
      db
        .select()
        .from(articles)
        .where(eq(articles.category, "business"))
        .limit(6),
      db
        .select()
        .from(articles)
        .where(eq(articles.category, "entertainment"))
        .limit(6),
      db
        .select()
        .from(articles)
        .where(eq(articles.category, "innovation"))
        .limit(6),
      db
        .select()
        .from(articles)
        .where(eq(articles.category, "culture"))
        .limit(6),
      db
        .select()
        .from(articles)
        .where(eq(articles.category, "technology"))
        .limit(6),
    ]);

    const topOtherStories = [
      ...latestSports,
      ...latestBusiness,
      ...latestEntertainment,
    ];
    return Response.json({
      latestPolitics,
      topOtherStories,
      topBusiness,
      topCulture,
      topEntertainment,
      topSports,
      topPolitics,
      topInnovation,
      topTechnology,
    });
  } catch (err) {
    console.log("Error fetching articles:", err);
    Response.json({ error: "Failed fetching articles" });
  }
}

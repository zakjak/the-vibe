import { articles } from "@/lib/schema/articles";
import { db } from "@/lib/schema/schema";
import { and, eq, ne } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const [
      latestNews,
      latestPolitics,
      latestSports,
      latestBusiness,
      latestTechnology,
      latestCulture,
      latestEntertainment,
    ] = await Promise.all([
      db
        .select()
        .from(articles)
        .where(
          and(eq(articles.isDraft, false), eq(articles.category, "politics"))
        )
        .limit(1),
      db
        .select()
        .from(articles)
        .where(
          and(eq(articles.isDraft, false), eq(articles.category, "politics"))
        )
        .limit(2),
      db
        .select()
        .from(articles)
        .where(
          and(eq(articles.isDraft, false), eq(articles.category, "sports"))
        )
        .limit(1),
      db
        .select()
        .from(articles)
        .where(
          and(eq(articles.isDraft, false), eq(articles.category, "business"))
        )
        .limit(1),
      db
        .select()
        .from(articles)
        .where(
          and(eq(articles.isDraft, false), eq(articles.category, "technology"))
        )
        .limit(1),
      db
        .select()
        .from(articles)
        .where(
          and(eq(articles.isDraft, false), eq(articles.category, "culture"))
        )
        .limit(1),
      db
        .select()
        .from(articles)
        .where(
          and(
            eq(articles.isDraft, false),
            eq(articles.category, "entertainment")
          )
        )
        .limit(1),
    ]);

    function categoryQuery(cat: string, latest?: any[]) {
      const conditions = [
        eq(articles.isDraft, false),
        eq(articles.category, cat),
      ];

      if (latest && latest[0]) {
        conditions.push(ne(articles.id, latest[0]?.id));
      }

      return db
        .select()
        .from(articles)
        .where(and(...conditions))
        .limit(6);
    }

    const [
      topPolitics,
      topSports,
      topBusiness,
      topEntertainment,
      topTechnology,
      topCulture,
    ] = await Promise.all([
      categoryQuery("politics", latestPolitics),
      categoryQuery("sports", latestSports),
      categoryQuery("business", latestBusiness),
      categoryQuery("entertainment", latestEntertainment),
      categoryQuery("technology"),
      categoryQuery("culture"),
    ]);

    const topRightStories = [
      ...latestSports,
      ...latestBusiness,
      ...latestEntertainment,
    ];

    const topLeftStories = [
      ...latestCulture,
      ...latestTechnology,
      ...latestPolitics,
    ];

    return NextResponse.json({
      latestNews,
      latestPolitics,
      topRightStories,
      topLeftStories,
      topBusiness,
      topCulture,
      topEntertainment,
      topSports,
      topPolitics,
      topTechnology,
    });
  } catch (err) {
    console.log("Error fetching articles:", err);
    return NextResponse.json({ error: "Failed fetching articles" });
  }
}

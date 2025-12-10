import { articles } from "@/lib/schema/articles";
import { db } from "@/lib/schema/schema";
import { and, eq, ne } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const [latestPolitics, latestSports, latestBusiness, latestEntertainment] =
      await Promise.all([
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
            and(
              eq(articles.isDraft, false),
              eq(articles.category, "entertainment")
            )
          )
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
        .where(
          and(
            eq(articles.isDraft, false),
            eq(articles.category, "politics"),
            ne(articles.id, latestPolitics[0].id)
          )
        )
        .limit(6),
      db
        .select()
        .from(articles)
        .where(
          and(
            eq(articles.isDraft, false),
            eq(articles.category, "sports"),
            ne(articles.id, latestSports[0].id)
          )
        )
        .limit(6),
      db
        .select()
        .from(articles)
        .where(
          and(
            eq(articles.isDraft, false),
            eq(articles.category, "business"),
            ne(articles.id, latestBusiness[0].id)
          )
        )
        .limit(6),
      db
        .select()
        .from(articles)
        .where(
          and(
            eq(articles.isDraft, false),
            eq(articles.category, "entertainment"),
            ne(articles.id, latestEntertainment[0].id)
          )
        )
        .limit(6),
      db
        .select()
        .from(articles)
        .where(
          and(eq(articles.isDraft, false), eq(articles.category, "innovation"))
        )
        .limit(6),
      db
        .select()
        .from(articles)
        .where(
          and(eq(articles.isDraft, false), eq(articles.category, "culture"))
        )
        .limit(6),
      db,
    ]);

    const topOtherStories = [
      ...latestSports,
      ...latestBusiness,
      ...latestEntertainment,
    ];
    return NextResponse.json({
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
    return NextResponse.json({ error: "Failed fetching articles" });
  }
}

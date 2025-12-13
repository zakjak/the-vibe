import { articles } from "@/lib/schema/articles";
import { db } from "@/lib/schema/schema";
import { and, desc, eq, ne } from "drizzle-orm";
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
        .select({
          id: articles.id,
          image: articles.image,
          imageTitle: articles.imageTitle,
          date: articles.date,
          title: articles.title,
          category: articles.category,
        })
        .from(articles)
        .where(
          and(eq(articles.isDraft, false), eq(articles.category, "politics"))
        )
        .limit(1)
        .orderBy(desc(articles.date)),
      db
        .select()
        .from(articles)
        .where(
          and(eq(articles.isDraft, false), eq(articles.category, "politics"))
        )
        .orderBy(desc(articles.date))
        .limit(1)
        .offset(1),
      db
        .select({
          id: articles.id,
          image: articles.image,
          imageTitle: articles.imageTitle,
          date: articles.date,
          title: articles.title,
          category: articles.category,
        })
        .from(articles)
        .where(
          and(eq(articles.isDraft, false), eq(articles.category, "sports"))
        )
        .orderBy(desc(articles.date))
        .limit(1),
      db
        .select()
        .from(articles)
        .where(
          and(eq(articles.isDraft, false), eq(articles.category, "business"))
        )
        .orderBy(desc(articles.date))
        .limit(1),
      db
        .select()
        .from(articles)
        .where(
          and(eq(articles.isDraft, false), eq(articles.category, "technology"))
        )
        .orderBy(desc(articles.date))
        .limit(1),
      db
        .select({
          id: articles.id,
          image: articles.image,
          imageTitle: articles.imageTitle,
          date: articles.date,
          title: articles.title,
          category: articles.category,
        })
        .from(articles)
        .where(
          and(eq(articles.isDraft, false), eq(articles.category, "culture"))
        )
        .limit(1),
      db
        .select({
          id: articles.id,
          date: articles.date,
          title: articles.title,
          category: articles.category,
        })
        .from(articles)
        .where(
          and(
            eq(articles.isDraft, false),
            eq(articles.category, "entertainment")
          )
        )
        .orderBy(desc(articles.date))
        .limit(1),
    ]);

    function categoryQuery(cat: string, latest: any[], latestNews?: any[]) {
      const conditions = [
        eq(articles.isDraft, false),
        eq(articles.category, cat),
      ];

      if (latest && latest[0]) {
        conditions.push(ne(articles.id, latest[0]?.id));
      }

      if (latestNews && latestNews[0]) {
        conditions.push(ne(articles.id, latestNews[0]?.id));
      }

      return db
        .select({
          id: articles.id,
          title: articles.title,
          category: articles.category,
          date: articles.date,
          image: articles.image,
          imageTitle: articles.imageTitle,
        })
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
      categoryQuery("politics", latestPolitics, latestNews),
      categoryQuery("sports", latestSports),
      categoryQuery("business", latestBusiness),
      categoryQuery("entertainment", latestEntertainment),
      categoryQuery("technology", latestTechnology),
      categoryQuery("culture", latestCulture),
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

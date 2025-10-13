import { articles } from "@/drizzle/schema";
import { db } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { category: string } }
) {
  const { category } = await params;

  try {
    const response = await db
      .select()
      .from(articles)
      .where(eq(articles.category, category))
      .limit(3);
    return NextResponse.json(response);
  } catch (err) {
    console.log("Error fetching articles:", err);
    Response.json({ error: "Failed fetching articles" });
  }
}

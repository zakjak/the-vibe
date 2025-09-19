import { articles } from "@/drizzle/schema";
import { db } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: number } }
) {
  const id = params.id;

  try {
    const response = await db
      .select()
      .from(articles)
      .where(eq(articles.id, id));
    return NextResponse.json(response);
  } catch (err) {
    console.log("Error fetching articles:", err);
    Response.json({ error: "Failed fetching articles" });
  }
}

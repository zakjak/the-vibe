import { articles } from "@/drizzle/schema";
import { db } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request, res: Response) {
  try {
    const response = await db
      .select()
      .from(articles)
      .where(eq(articles.category, "business"))
      .limit(6);
    return Response.json(response);
  } catch (err) {
    console.log("Error fetching articles:", err);
    Response.json({ error: "Failed fetching articles" });
  }
}

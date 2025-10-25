import { articles } from "@/drizzle/schema";
import { db } from "@/lib/schema/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    title,
    image,
    images,
    imageCredit,
    story,
    author,
    category,
    tags,
    ownerId,
  } = body;

  console.log(body);

  try {
    const response = await db
      .insert(articles)
      .values({
        title,
        story,
        image,
        category,
        tags,
        author,
        images,
        imageCredit,
        ownerId,
      })
      .returning();

    return NextResponse.json(response);
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server error, try again");
  }
}

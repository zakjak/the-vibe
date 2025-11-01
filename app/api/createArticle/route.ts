import { articles } from "@/drizzle/schema";
import { db } from "@/lib/schema/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    title,
    image,
    imageTitle,
    images,
    imagesTitle,
    imageCredit,
    story,
    authors,
    category,
    tags,
    ownerId,
  } = body;

  try {
    const response = await db
      .insert(articles)
      .values({
        title,
        image,
        imageCredit,
        category,
        story,
        tags,
        images,
        authorsId: authors,
        ownersId: ownerId,
        imageTitle,
        imagesTitle,
      })
      .returning();

    return NextResponse.json(response);
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server error, try again");
  }
}

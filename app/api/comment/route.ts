import { comments } from "@/drizzle/schema";
import { db } from "@/lib/schema/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { comment, postId, ownerId } = body;

  try {
    const response = await db
      .insert(comments)
      .values({
        comment,
        postId,
        ownerId,
      })
      .returning();

    return NextResponse.json(response);
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server error", { status: 500 });
  }
}

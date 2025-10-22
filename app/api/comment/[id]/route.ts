import { comments } from "@/lib/schema/articles";
import { db } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: number } }
) {
  const param = await params;
  const { id } = param;

  try {
    const res = await db.delete(comments).where(eq(comments.id, id));

    return NextResponse.json("Successfully deleted comment");
  } catch (err) {
    return NextResponse.json({ error: "Try again, Failed to delete" });
  }
}

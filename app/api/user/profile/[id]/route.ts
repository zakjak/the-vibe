import { about, db, users } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const writerBio = await db
      .select()
      .from(about)
      .where(eq(about.ownerId, id));

    const userInfo = await db.select().from(users).where(eq(users.id, id));

    return NextResponse.json({ writerBio, userInfo });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server error");
  }

  return NextResponse.json("");
}

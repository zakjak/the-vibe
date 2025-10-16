import { db, users } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await req.json();
  const { profileImage } = body;

  try {
    const userProfile = await db
      .update(users)
      .set({ profilePicture: profileImage })
      .where(eq(users.id, id));
    return NextResponse.json(userProfile);
  } catch (err) {
    return NextResponse.json("Server Error", { status: 500 });
  }
}

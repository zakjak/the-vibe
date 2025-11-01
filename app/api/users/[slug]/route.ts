import { db, users } from "@/lib/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const name = slug.replaceAll("-", " ");

  console.log(name);

  try {
    const user = await db.select().from(users).where(eq(users.name, name));

    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server Error", { status: 500 });
  }
}

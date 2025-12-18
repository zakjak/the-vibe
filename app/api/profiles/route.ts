import { users } from "@/drizzle/schema";
import { db } from "@/lib/schema/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  try {
    const page = Number(searchParams.get("page")) || 1;
    const isLeader = searchParams.get("isLeader");
    const calculatePageNumber = (page - 1) * 10;

    const res = await db
      .select()
      .from(users)
      .where(
        isLeader === "true"
          ? and(eq(users.isAdmin, true), eq(users.isLeader, Boolean(isLeader)))
          : eq(users.isAdmin, true)
      )
      .limit(10)
      .offset(calculatePageNumber);

    return NextResponse.json(res);
  } catch (err) {
    console.log("Error fetching articles:", err);
    return NextResponse.json("Server error");
  }
}

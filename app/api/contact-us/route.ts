import { emails } from "@/drizzle/schema";
import { db } from "@/lib/schema/schema";
import { count, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  try {
    const page = Number(searchParams.get("page")) || 1;

    const countRows = await db.select({ count: count() }).from(emails);

    const calculatePageNumber = (page - 1) * 10;

    const pageNumber = Math.ceil(countRows[0].count / 10);

    const [totalMessages] = await db.select({ count: count() }).from(emails);
    const [totalNew] = await db
      .select({ count: count() })
      .from(emails)
      .where(eq(emails.status, "new"));
    const [totalReviewing] = await db
      .select({ count: count() })
      .from(emails)
      .where(eq(emails.status, "reviewing"));
    const [totalAwaiting] = await db
      .select({ count: count() })
      .from(emails)
      .where(eq(emails.status, "awaiting_client"));
    const [totalArchived] = await db
      .select({ count: count() })
      .from(emails)
      .where(eq(emails.status, "archived"));
    const [totalContacted] = await db
      .select({ count: count() })
      .from(emails)
      .where(eq(emails.status, "contacted"));
    const [totalCompleted] = await db
      .select({ count: count() })
      .from(emails)
      .where(eq(emails.status, "completed"));

    const res = await db
      .select()
      .from(emails)
      .limit(10)
      .offset(calculatePageNumber);

    return NextResponse.json({
      messages: res,
      totalMessages,
      totalNew,
      totalArchived,
      totalAwaiting,
      totalCompleted,
      totalContacted,
      totalReviewing,
      pageNumber,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server error");
  }
}

export async function POST(req: Request) {
  const {
    company,
    website,
    industry,
    name,
    message,
    email,
    address,
    phone,
    country,
    state,
    city,
    title,
    zipCode,
  } = await req.json();

  try {
    await db.insert(emails).values({
      company,
      website,
      industry,
      name,
      message,
      email,
      address,
      phone,
      country,
      city,
      title,
      state,
      zipcode: zipCode,
    });

    if (message.error) {
      console.log("error");
      return NextResponse.json("Error submitting email");
    }

    return NextResponse.json("success");
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server error");
  }
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);

  const status = searchParams.get("status");
  const messageId = Number(searchParams.get("messageId"));

  try {
    const res = await db
      .update(emails)
      .set({ status })
      .where(eq(emails.id, messageId))
      .returning();

    return NextResponse.json(res);
  } catch (err) {
    console.log(err);
    return NextResponse.json("Server error");
  }
}

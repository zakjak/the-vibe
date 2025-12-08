import { and, asc, count, desc, eq, gte, like } from "drizzle-orm";
import { db } from "@/lib/schema/schema";
import { NextResponse } from "next/server";
import { startOfMonth, startOfWeek } from "../utils/helpers";
import { emails } from "@/lib/schema/contacts";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const date = searchParams.get("date_range");
  const page = Number(searchParams.get("page")) || 1;

  try {
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

    const filteredClauses = [];

    if (status && status !== "all") {
      filteredClauses.push(eq(emails.status, status));
    }

    if (date && date !== "all_time") {
      const now = new Date();

      if (date === "today") {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        filteredClauses.push(gte(emails.date, start));
      }

      if (date === "this_week") {
        const weekAgo = startOfWeek();
        filteredClauses.push(gte(emails.date, weekAgo));
      }

      if (date === "this_month") {
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        filteredClauses.push(gte(emails.date, monthAgo));
      }
    }

    const filteredMessages = await db
      .select()
      .from(emails)
      .where(filteredClauses.length ? and(...filteredClauses) : undefined);

    const res = await db
      .select()
      .from(emails)
      .limit(10)
      .offset(calculatePageNumber);

    return NextResponse.json({
      messages: date || status ? filteredMessages : res,
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

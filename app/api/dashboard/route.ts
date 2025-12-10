import { and, asc, count, desc, eq, gte, sql } from "drizzle-orm";
import { db } from "@/lib/schema/schema";
import { NextResponse } from "next/server";
import { startOfMonth, startOfToday, startOfWeekLocal } from "../utils/helpers";
import { emails } from "@/lib/schema/contacts";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const date = searchParams.get("date_range");

  const limit = Number(searchParams.get("limit")) || 10;
  const offset = Number(searchParams.get("offset")) || 0;

  try {
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

    if (date && date !== "all_time") {
      if (date === "today") {
        const today = startOfToday();
        filteredClauses.push(gte(emails.date, today));
      }

      if (date === "this_week") {
        filteredClauses.push(gte(emails.date, startOfWeekLocal()));
      }

      if (date === "this_month") {
        const monthAgo = startOfMonth();
        filteredClauses.push(gte(emails.date, monthAgo));
      }
    }

    if (status) {
      filteredClauses.push(eq(emails.status, status));
    }

    const filteredMessages = await db
      .select()
      .from(emails)
      .where(filteredClauses.length ? and(...filteredClauses) : undefined)
      .orderBy(asc(emails.id));

    const lastFilteredMessages = await db
      .select()
      .from(emails)
      .where(filteredClauses.length ? and(...filteredClauses) : undefined)
      .orderBy(asc(sql`${emails.id}`))
      .limit(1);

    const res = await db
      .select()
      .from(emails)
      .orderBy(desc(sql`${emails.date}`))
      .limit(limit)
      .offset(offset);

    const lastMessage = await db
      .select()
      .from(emails)
      .orderBy(asc(sql`${emails.date}`))
      .limit(1);

    return NextResponse.json({
      messages: date || status ? filteredMessages : res,
      lastMessage: date || status ? lastFilteredMessages : lastMessage,
      totalMessages,
      totalNew,
      totalArchived,
      totalAwaiting,
      totalCompleted,
      totalContacted,
      totalReviewing,
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

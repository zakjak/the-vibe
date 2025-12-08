import { emails } from "@/drizzle/schema";
import { db } from "@/lib/schema/schema";
import { NextResponse } from "next/server";

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

import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const email = table("emails", {
  id: t.serial("id").primaryKey(),
  company: t.varchar("company", { length: 300 }),
  website: t.text(),
  industry: t.text(),
  contactName: t.text("name"),
  message: t.text(),
  email: t.text("email"),
  address: t.text("address"),
  phone: t.text("phone"),
  country: t.text("country"),
  state: t.text("state"),
  city: t.text("city"),
  zipCode: t.text("zipcode"),
  status: t.text("status").default("new"),
  date: t.timestamp().notNull().defaultNow(),
});

import { pgTable as table } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { users } from "./schema";

export const articlies = table("articles", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  title: t.varchar({ length: 250 }),
  image: t.text().notNull(),
  category: t.varchar({ length: 100 }),
  date: t.timestamp().notNull().defaultNow(),
  imageCredit: t.varchar({ length: 250 }).notNull(),
  story: t.text().notNull(),
  tags: t
    .text()
    .array()
    .default(sql`'{}'::text[]`),
  images: t
    .text()
    .array()
    .default(sql`'{}'::text[]`),
  author: t.varchar({ length: 250 }),
  ownerId: t.text("owner_id").references(() => users.id),
});

export const comments = table("comments", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  comment: t.text(),
  postId: t.integer("post_id").references(() => articlies.id),
  ownerId: t.integer("owner_id").references(() => users.id),
});

export const replies = table("replies", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  reply: t.text(),
  commentId: t.integer("comment_id").references(() => comments.id),
  ownerId: t.integer("owner_id").references(() => users.id),
});

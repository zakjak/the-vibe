import { pgTable as table } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { users } from "./schema";

export const articles = table(
  "articles",
  {
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
    views: t.integer().default(0),
    ownerId: t.text("owner_id").references(() => users.id),
  },
  (table) => [
    t.index("search_index").using(
      "gin",
      sql`(
          setweight(to_tsvector('english', ${table.title}), 'A') ||
          setweight(to_tsvector('english', ${table.story}), 'B') ||
          setweight(to_tsvector('english', ${table.author}), 'C') ||
          setweight(to_tsvector('english', ${table.category}), 'D')
      )`
    ),
  ]
);

export const readList = table("readlist", {
  id: t.serial("id").primaryKey(),
  ownerId: t.text("owner_id").references(() => users.id),
  articleId: t.integer("articleId").references(() => articles.id, {
    onDelete: "cascade",
  }),
});

export const articlesRelations = relations(articles, ({ many }) => ({
  readLists: many(readList),
}));

export const readListRelations = relations(readList, ({ one }) => ({
  article: one(articles, {
    fields: [readList.articleId],
    references: [articles.id],
  }),
}));

export const comments = table("comments", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  comment: t.text(),
  postId: t.integer("post_id").references(() => articles.id),
  ownerId: t.integer("owner_id").references(() => users.id),
});

export const replies = table("replies", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  reply: t.text(),
  commentId: t.integer("comment_id").references(() => comments.id),
  ownerId: t.integer("owner_id").references(() => users.id),
});

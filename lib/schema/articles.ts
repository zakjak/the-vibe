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
    imageTitle: t.text("image_title"),
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
    imagesTitle: t
      .text("images_title")
      .array()
      .default(sql`'{}'::text[]`),
    authors: t
      .uuid("authors_id")
      .array()
      .default(sql`'{}'::uuid[]`)
      .references(() => users.id),
    views: t.integer().default(0),
  },
  (table) => [
    t.index("search_index").using(
      "gin",
      sql`(
          setweight(to_tsvector('english', ${table.title}), 'A') ||
          setweight(to_tsvector('english', ${table.story}), 'B') ||
          setweight(to_tsvector('english', ${table.authors}), 'C') ||
          setweight(to_tsvector('english', ${table.category}), 'D')
      )`
    ),
  ]
);

export const readList = table("readlist", {
  id: t.serial("id").primaryKey(),
  ownerId: t
    .uuid("owner_id")
    .references(() => users.id, { onDelete: "cascade" }),
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
  id: t.serial("id").primaryKey(),
  comment: t.text(),
  postId: t.integer("post_id").references(() => articles.id),
  ownerId: t.text("owner_id").references(() => users.id),
  parentId: t.integer("parent_id"),
  date: t.timestamp().notNull().defaultNow(),
});

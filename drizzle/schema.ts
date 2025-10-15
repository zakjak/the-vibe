import { pgTable, text, timestamp, foreignKey, integer, unique, boolean, serial, varchar } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const verificationToken = pgTable("verificationToken", {
	identifier: text().notNull(),
	token: text().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
});

export const account = pgTable("account", {
	userId: text().notNull(),
	type: text().notNull(),
	provider: text().notNull(),
	providerAccountId: text().notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text(),
	idToken: text("id_token"),
	sessionState: text("session_state"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "account_userId_users_id_fk"
		}).onDelete("cascade"),
]);

export const authenticator = pgTable("authenticator", {
	credentialId: text().notNull(),
	userId: text().notNull(),
	providerAccountId: text().notNull(),
	credentialPublicKey: text().notNull(),
	counter: integer().notNull(),
	credentialDeviceType: text().notNull(),
	credentialBackedUp: boolean().notNull(),
	transports: text(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "authenticator_userId_users_id_fk"
		}).onDelete("cascade"),
	unique("authenticator_credentialID_unique").on(table.credentialId),
]);

export const session = pgTable("session", {
	sessionToken: text().primaryKey().notNull(),
	userId: text().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "session_userId_users_id_fk"
		}).onDelete("cascade"),
]);

export const users = pgTable("users", {
	id: text().primaryKey().notNull(),
	name: text(),
	email: text(),
	emailVerified: timestamp({ mode: 'string' }),
	isAdmin: boolean().default(false),
	profilePicture: text(),
});

export const readlist = pgTable("readlist", {
	id: serial().primaryKey().notNull(),
	articleId: integer(),
	ownerId: text("owner_id"),
}, (table) => [
	foreignKey({
			columns: [table.articleId],
			foreignColumns: [articles.id],
			name: "readlist_articleId_articles_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.ownerId],
			foreignColumns: [users.id],
			name: "readlist_owner_id_users_id_fk"
		}),
]);

export const articles = pgTable("articles", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "articles_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	title: varchar({ length: 250 }),
	image: text().notNull(),
	category: varchar({ length: 100 }),
	date: timestamp({ mode: 'string' }).defaultNow().notNull(),
	imageCredit: varchar({ length: 250 }).notNull(),
	story: text().notNull(),
	tags: text().array().default([""]),
	images: text().array().default([""]),
	author: varchar({ length: 250 }),
	ownerId: text("owner_id"),
	views: integer().default(0),
}, (table) => [
	foreignKey({
			columns: [table.ownerId],
			foreignColumns: [users.id],
			name: "articles_owner_id_users_id_fk"
		}),
]);

export const replies = pgTable("replies", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "replies_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	reply: text(),
	commentId: integer("comment_id"),
	ownerId: integer("owner_id"),
}, (table) => [
	foreignKey({
			columns: [table.commentId],
			foreignColumns: [comments.id],
			name: "replies_comment_id_comments_id_fk"
		}),
]);

export const comments = pgTable("comments", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "comments_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	comment: text(),
	postId: integer("post_id"),
	ownerId: integer("owner_id"),
}, (table) => [
	foreignKey({
			columns: [table.postId],
			foreignColumns: [articles.id],
			name: "comments_post_id_articles_id_fk"
		}),
]);

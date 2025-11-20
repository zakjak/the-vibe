import { pgTable, text, timestamp, foreignKey, integer, unique, boolean, serial, uuid, varchar } from "drizzle-orm/pg-core"
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
	image: text(),
});

export const comment = pgTable("comment", {
	id: serial().primaryKey().notNull(),
	comment: text(),
	postId: integer("post_id"),
	ownerId: text("owner_id"),
	parentId: integer("parent_id"),
	date: timestamp({ mode: 'string' }).defaultNow().notNull(),
});

export const readlist = pgTable("readlist", {
	id: serial().primaryKey().notNull(),
	articleId: integer(),
	ownerId: text("owner_id"),
});

export const commentVotes = pgTable("comment_votes", {
	id: serial().primaryKey().notNull(),
	commentId: integer("comment_id").notNull(),
	userId: uuid("user_id").notNull(),
	vote: integer().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("comment_votes_comment_id_user_id_unique").on(table.commentId, table.userId),
]);

export const articles = pgTable("articles", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "articles_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	title: varchar({ length: 250 }),
	image: text().notNull(),
	imageTitle: text("image_title"),
	category: varchar({ length: 100 }),
	date: timestamp({ mode: 'string' }).defaultNow().notNull(),
	imageCredit: varchar({ length: 250 }).notNull(),
	story: text().notNull(),
	tags: text().array().default([""]),
	images: text().array().default([""]),
	imagesTitle: text("images_title").array().default([""]),
	authorsId: uuid("authors_id").array().default([""]),
	views: integer().default(0),
});

export const about = pgTable("about", {
	id: text().primaryKey().notNull(),
	position: text(),
	bio: text(),
	fb: text(),
	twitter: text(),
	linkedIn: text(),
	ownerId: uuid("owner_id"),
});

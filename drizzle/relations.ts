import { relations } from "drizzle-orm/relations";
import { users, account, authenticator, session, articles, comments } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(users, {
		fields: [account.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	accounts: many(account),
	authenticators: many(authenticator),
	sessions: many(session),
	articles: many(articles),
}));

export const authenticatorRelations = relations(authenticator, ({one}) => ({
	user: one(users, {
		fields: [authenticator.userId],
		references: [users.id]
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(users, {
		fields: [session.userId],
		references: [users.id]
	}),
}));

export const articlesRelations = relations(articles, ({one, many}) => ({
	user: one(users, {
		fields: [articles.ownerId],
		references: [users.id]
	}),
	comments: many(comments),
}));

export const commentsRelations = relations(comments, ({one}) => ({
	article: one(articles, {
		fields: [comments.postId],
		references: [articles.id]
	}),
}));
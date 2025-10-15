import { relations } from "drizzle-orm/relations";
import { users, account, authenticator, session, articles, readlist, comments, replies } from "./schema";

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
	readlists: many(readlist),
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

export const readlistRelations = relations(readlist, ({one}) => ({
	article: one(articles, {
		fields: [readlist.articleId],
		references: [articles.id]
	}),
	user: one(users, {
		fields: [readlist.ownerId],
		references: [users.id]
	}),
}));

export const articlesRelations = relations(articles, ({one, many}) => ({
	readlists: many(readlist),
	user: one(users, {
		fields: [articles.ownerId],
		references: [users.id]
	}),
	comments: many(comments),
}));

export const repliesRelations = relations(replies, ({one}) => ({
	comment: one(comments, {
		fields: [replies.commentId],
		references: [comments.id]
	}),
}));

export const commentsRelations = relations(comments, ({one, many}) => ({
	replies: many(replies),
	article: one(articles, {
		fields: [comments.postId],
		references: [articles.id]
	}),
}));
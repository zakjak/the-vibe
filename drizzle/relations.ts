import { relations } from "drizzle-orm/relations";
import { users, account, authenticator, session, readlist, comments, replies } from "./schema";

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
	comments: many(comments),
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
	user: one(users, {
		fields: [readlist.ownerId],
		references: [users.id]
	}),
}));

export const repliesRelations = relations(replies, ({one}) => ({
	comment: one(comments, {
		fields: [replies.commentId],
		references: [comments.id]
	}),
}));

export const commentsRelations = relations(comments, ({one, many}) => ({
	replies: many(replies),
	user: one(users, {
		fields: [comments.ownerId],
		references: [users.id]
	}),
}));
import { relations } from "drizzle-orm/relations";
import { users, authenticator, comments, replies, session, account } from "./schema";

export const authenticatorRelations = relations(authenticator, ({one}) => ({
	user: one(users, {
		fields: [authenticator.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	authenticators: many(authenticator),
	comments: many(comments),
	sessions: many(session),
	accounts: many(account),
}));

export const commentsRelations = relations(comments, ({one, many}) => ({
	user: one(users, {
		fields: [comments.ownerId],
		references: [users.id]
	}),
	replies: many(replies),
}));

export const repliesRelations = relations(replies, ({one}) => ({
	comment: one(comments, {
		fields: [replies.commentId],
		references: [comments.id]
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(users, {
		fields: [session.userId],
		references: [users.id]
	}),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(users, {
		fields: [account.userId],
		references: [users.id]
	}),
}));
import { relations } from "drizzle-orm/relations";
import { users, authenticator, comments, session, account } from "./schema";

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

export const commentsRelations = relations(comments, ({one}) => ({
	user: one(users, {
		fields: [comments.ownerId],
		references: [users.id]
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
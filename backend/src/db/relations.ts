import { relations } from "drizzle-orm/relations";
import { admins, refreshTokens, blogs, comments } from "./schema";

export const refreshTokensRelations = relations(refreshTokens, ({one}) => ({
	admin: one(admins, {
		fields: [refreshTokens.adminId],
		references: [admins.id]
	}),
}));

export const adminsRelations = relations(admins, ({many}) => ({
	refreshTokens: many(refreshTokens),
}));

export const commentsRelations = relations(comments, ({one}) => ({
	blog: one(blogs, {
		fields: [comments.blogId],
		references: [blogs.id]
	}),
}));

export const blogsRelations = relations(blogs, ({many}) => ({
	comments: many(comments),
}));
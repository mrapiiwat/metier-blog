import { relations } from "drizzle-orm/relations";
import { admins, blogs, comments, refreshTokens } from "./schema";

export const refreshTokensRelations = relations(refreshTokens, ({ one }) => ({
	admin: one(admins, {
		fields: [refreshTokens.adminId],
		references: [admins.id],
	}),
}));

export const adminsRelations = relations(admins, ({ many }) => ({
	refreshTokens: many(refreshTokens),
	blogs: many(blogs),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
	blog: one(blogs, {
		fields: [comments.blogId],
		references: [blogs.id],
	}),
}));

export const blogsRelations = relations(blogs, ({ many, one }) => ({
	admin: one(admins, {
		fields: [blogs.adminId],
		references: [admins.id],
	}),
	comments: many(comments),
}));

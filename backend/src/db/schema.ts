import {
	boolean,
	foreignKey,
	index,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
	unique,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

export const commentStatus = pgEnum("comment_status", [
	"pending",
	"approved",
	"rejected",
]);

export const admins = pgTable(
	"admins",
	{
		id: uuid().defaultRandom().primaryKey().notNull(),
		username: varchar({ length: 100 }).notNull(),
		passwordHash: text("password_hash").notNull(),
		createdAt: timestamp("created_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
		updatedAt: timestamp("updated_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
	},
	(table) => [unique("admins_username_key").on(table.username)],
);

export const refreshTokens = pgTable(
	"refresh_tokens",
	{
		id: uuid().defaultRandom().primaryKey().notNull(),
		token: text().notNull(),
		revoked: boolean().default(false).notNull(),
		adminId: uuid("admin_id").notNull(),
		expiresAt: timestamp("expires_at", {
			withTimezone: true,
			mode: "string",
		}).notNull(),
		createdAt: timestamp("created_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
	},
	(table) => [
		index("idx_refresh_tokens_admin_id").using(
			"btree",
			table.adminId.asc().nullsLast().op("uuid_ops"),
		),
		index("idx_refresh_tokens_token").using(
			"btree",
			table.token.asc().nullsLast().op("text_ops"),
		),
		foreignKey({
			columns: [table.adminId],
			foreignColumns: [admins.id],
			name: "refresh_tokens_admin_id_fkey",
		}).onDelete("cascade"),
		unique("refresh_tokens_token_key").on(table.token),
	],
);

export const blogs = pgTable(
	"blogs",
	{
		id: uuid().defaultRandom().primaryKey().notNull(),
		slug: varchar({ length: 255 }).notNull(),
		title: varchar({ length: 255 }).notNull(),
		summary: text().notNull(),
		content: text().notNull(),
		coverImage: text("cover_image").notNull(),
		additionalImages: text("additional_images").array().default([""]),
		isPublished: boolean("is_published").default(false),
		viewCount: integer("view_count").default(0),
		publishedAt: timestamp("published_at", {
			withTimezone: true,
			mode: "string",
		}),
		createdAt: timestamp("created_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
		updatedAt: timestamp("updated_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
	},
	(table) => [
		index("idx_blogs_is_published").using(
			"btree",
			table.isPublished.asc().nullsLast().op("bool_ops"),
		),
		index("idx_blogs_published_at").using(
			"btree",
			table.publishedAt.desc().nullsFirst().op("timestamptz_ops"),
		),
		index("idx_blogs_title").using(
			"btree",
			table.title.asc().nullsLast().op("text_ops"),
		),
		unique("blogs_slug_key").on(table.slug),
	],
);

export const comments = pgTable(
	"comments",
	{
		id: uuid().defaultRandom().primaryKey().notNull(),
		blogId: uuid("blog_id").notNull(),
		senderName: varchar("sender_name", { length: 100 }).notNull(),
		message: text().notNull(),
		status: commentStatus().default("pending"),
		createdAt: timestamp("created_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
		updatedAt: timestamp("updated_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
	},
	(table) => [
		index("idx_comments_blog_id_status").using(
			"btree",
			table.blogId.asc().nullsLast().op("uuid_ops"),
			table.status.asc().nullsLast().op("uuid_ops"),
		),
		foreignKey({
			columns: [table.blogId],
			foreignColumns: [blogs.id],
			name: "comments_blog_id_fkey",
		}).onDelete("cascade"),
	],
);

import { type Static, t } from "elysia";

export const createCommentSchema = t.Object({
	blogId: t.String({
		format: "uuid",
		error: "Blog ID is required and must be a valid UUID",
	}),
	senderName: t.String({
		minLength: 1,
		maxLength: 100,
		error: "Sender name is required and cannot exceed 100 characters",
	}),
	message: t.String({
		minLength: 1,
		pattern: "^[ก-๙0-9\\s]+$",
		error: "ข้อความต้องประกอบด้วยภาษาไทย ตัวเลข และช่องว่างเท่านั้น",
	}),
});

export type CreateComment = Static<typeof createCommentSchema>;

export const paramsIdSchema = t.Object({
	id: t.String({
		format: "uuid",
		error: "Invalid Comment ID",
	}),
});

export const updateStatusBodySchema = t.Object({
	status: t.Union(
		[t.Literal("approved"), t.Literal("rejected"), t.Literal("pending")],
		{ error: "Status must be 'approved', 'rejected', or 'pending'" },
	),
});

export type UpdateStatusBody = Static<typeof updateStatusBodySchema>;

export const adminGetCommentsQuerySchema = t.Object({
	page: t.Optional(t.Numeric({ default: 1, error: "Page must be a number" })),
	limit: t.Optional(
		t.Numeric({ default: 10, error: "Limit must be a number" }),
	),
	status: t.Optional(
		t.Union(
			[t.Literal("approved"), t.Literal("rejected"), t.Literal("pending")],
			{
				error: "Status must be approved, rejected, or pending",
			},
		),
	),
	blogId: t.Optional(
		t.String({ format: "uuid", error: "Invalid Blog ID format" }),
	),
	search: t.Optional(t.String()),
});

export type AdminGetCommentsQuery = Static<typeof adminGetCommentsQuerySchema>;

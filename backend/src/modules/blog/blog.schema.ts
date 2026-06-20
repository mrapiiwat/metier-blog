import { type Static, t } from "elysia";

export const create = t.Object({
	slug: t.String({
		minLength: 1,
		maxLength: 255,
		error: "Slug is required and cannot exceed 255 characters",
	}),
	title: t.String({
		minLength: 1,
		maxLength: 255,
		error: "Title is required",
	}),
	content: t.String({
		minLength: 1,
		error: "Content is required",
	}),

	coverImage: t.File({
		maxSize: 5 * 1024 * 1024,
		error: "Cover image is required and must be less than 5MB",
	}),
	additionalImages: t.Optional(
		t.Files({
			maxSize: 5 * 1024 * 1024,
			error: "Additional images must be valid files under 5MB",
		}),
	),
	isPublished: t.BooleanString(),
});

export type create = Static<typeof create>;

export const query = t.Object({
	page: t.Optional(t.Numeric({ default: 1 })),
	search: t.Optional(t.String()),
});

export const update = t.Partial(
	t.Object({
		slug: t.String({ minLength: 1, maxLength: 255 }),
		title: t.String({ minLength: 1, maxLength: 255 }),
		content: t.String({ minLength: 1 }),
		coverImage: t.Optional(
			t.File({
				maxSize: 5 * 1024 * 1024,
				error: "Cover image must be less than 5MB",
			}),
		),
		additionalImages: t.Optional(
			t.Files({
				maxSize: 5 * 1024 * 1024,
				error: "Additional images must be valid files under 5MB",
			}),
		),
		isPublished: t.Optional(t.BooleanString()),
	}),
);

export type update = Static<typeof update>;

export const param = t.Object({
	id: t.String({ format: "uuid", error: "Invalid Blog ID" }),
});

export const replaceImage = t.Object({
	image: t.File({
		maxSize: 5 * 1024 * 1024,
		error: "Image must be less than 5MB",
	}),
});

export const params = t.Object({
	id: t.String({ format: "uuid", error: "Invalid Blog ID" }),
	slot: t.Numeric({ error: "Slot must be a number" }),
});

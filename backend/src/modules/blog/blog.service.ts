import {
	DeleteObjectCommand,
	GetObjectCommand,
	PutObjectCommand,
} from "@aws-sdk/client-s3";
import { and, count, desc, eq, ilike, sql } from "drizzle-orm";
import { BUCKET_NAME, s3Client } from "@/common/config/s3";
import { BadRequestError, NotFoundError } from "@/common/exceptions";
import { db } from "@/db";
import { blogs } from "@/db/schema";
import type * as blogSchema from "./blog.schema";

export class BlogService {
	private async uploadImageToMinIO(
		file: File,
		folder: string,
	): Promise<string> {
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const fileExtension = file.name.split(".").pop();
		const fileName = `${folder}/${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;

		const command = new PutObjectCommand({
			Bucket: BUCKET_NAME,
			Key: fileName,
			Body: buffer,
			ContentType: file.type,
		});

		await s3Client.send(command);

		return fileName;
	}

	private async deleteImageFromMinIO(objectKey: string): Promise<void> {
		try {
			if (!objectKey) return;

			const command = new DeleteObjectCommand({
				Bucket: BUCKET_NAME,
				Key: objectKey,
			});
			await s3Client.send(command);
		} catch (error) {
			console.error(`Failed to delete image ${objectKey}:`, error);
		}
	}

	async createBlog(userId: string, data: blogSchema.create) {
		const existingBlog = await db.query.blogs.findFirst({
			where: eq(blogs.slug, data.slug),
		});

		if (existingBlog) {
			throw new BadRequestError("Blog with this slug already exists");
		}

		const coverImageUrl = await this.uploadImageToMinIO(
			data.coverImage,
			`blogs/covers`,
		);

		const additionalImageUrls: string[] = [];
		if (data.additionalImages && data.additionalImages.length > 0) {
			if (data.additionalImages.length > 6) {
				throw new BadRequestError(
					"You can upload a maximum of 6 additional images",
				);
			}
			for (const imageFile of data.additionalImages) {
				const imageUrl = await this.uploadImageToMinIO(
					imageFile,
					"blogs/additional",
				);
				additionalImageUrls.push(imageUrl);
			}
		}

		const isPublished = data.isPublished === true;
		const publishedAt = isPublished ? new Date().toISOString() : null;

		const [newBlog] = await db
			.insert(blogs)
			.values({
				adminId: userId,
				slug: data.slug,
				title: data.title,
				content: data.content,
				coverImage: coverImageUrl,
				additionalImages:
					additionalImageUrls.length > 0 ? additionalImageUrls : undefined,
				isPublished: isPublished,
				publishedAt: publishedAt,
			})
			.returning();

		return newBlog;
	}

	async getImage(objectKey: string) {
		const command = new GetObjectCommand({
			Bucket: BUCKET_NAME,
			Key: objectKey,
		});

		const response = await s3Client.send(command);
		return response;
	}

	async getBlogs(page: number, search?: string, isPublic?: boolean) {
		const limit = 10;
		const offset = (page - 1) * limit;

		const conditions = [];

		if (search) {
			conditions.push(ilike(blogs.title, `%${search}%`));
		}

		if (isPublic !== undefined) {
			conditions.push(eq(blogs.isPublished, isPublic));
		}

		const whereCondition =
			conditions.length > 0 ? and(...conditions) : undefined;

		const rawData = await db.query.blogs.findMany({
			limit: limit,
			offset: offset,
			orderBy: [desc(blogs.createdAt)],
			where: whereCondition,
			columns: { additionalImages: false },
			with: {
				admin: { columns: { name: true } },
			},
		});

		const data = rawData.map((blog) => {
			const { adminId, admin, ...restData } = blog;
			return { author: admin?.name || "Unknown", ...restData };
		});

		const totalResult = await db
			.select({ value: count() })
			.from(blogs)
			.where(whereCondition);

		const total = totalResult[0].value;

		return {
			data: data,
			meta: {
				page: page,
				limit: limit,
				totalItems: total,
				totalPages: Math.ceil(total / limit) || 1,
			},
		};
	}

	async getBlogById(blogId: string) {
		const rawData = await db.query.blogs.findFirst({
			where: eq(blogs.id, blogId),
			with: {
				admin: {
					columns: {
						name: true,
					},
				},
			},
		});

		if (!rawData) {
			throw new NotFoundError("Blog not found");
		}

		const { adminId, admin, ...restData } = rawData;
		return {
			author: admin?.name || "Unknown",
			...restData,
		};
	}

	async getBlogBySlug(slug: string) {
		const rawData = await db.query.blogs.findFirst({
			where: eq(blogs.slug, slug),
			with: {
				admin: {
					columns: {
						name: true,
					},
				},
			},
		});

		if (!rawData) {
			throw new NotFoundError("Blog not found");
		}

		const { adminId, admin, ...restData } = rawData;
		return {
			author: admin?.name || "Unknown",
			...restData,
		};
	}

	async incrementViewCount(blogId: string) {
		await db
			.update(blogs)
			.set({
				viewCount: sql`${blogs.viewCount} + 1`,
			})
			.where(eq(blogs.id, blogId));
	}

	async updateBlog(blogId: string, data: blogSchema.update) {
		const existingBlog = await db.query.blogs.findFirst({
			where: eq(blogs.id, blogId),
		});

		if (!existingBlog) {
			throw new NotFoundError("Blog not found");
		}

		if (data.slug && data.slug !== existingBlog.slug) {
			const duplicateSlug = await db.query.blogs.findFirst({
				where: eq(blogs.slug, data.slug),
			});

			if (duplicateSlug) {
				throw new BadRequestError("Blog with this slug already exists");
			}
		}

		const updateData: Partial<typeof blogs.$inferInsert> = {
			updatedAt: new Date().toISOString(),
		};

		if (data.slug) updateData.slug = data.slug;
		if (data.title) updateData.title = data.title;
		if (data.content) updateData.content = data.content;

		if (data.coverImage) {
			updateData.coverImage = await this.uploadImageToMinIO(
				data.coverImage,
				`blogs/covers`,
			);
		}

		if (data.additionalImages && data.additionalImages.length > 0) {
			if (data.additionalImages.length > 6) {
				throw new BadRequestError(
					"You can upload a maximum of 6 additional images",
				);
			}
			const additionalImageUrls: string[] = [];
			for (const imageFile of data.additionalImages) {
				const imageUrl = await this.uploadImageToMinIO(
					imageFile,
					"blogs/additional",
				);
				additionalImageUrls.push(imageUrl);
			}
			updateData.additionalImages = additionalImageUrls;
		}

		if (data.isPublished !== undefined) {
			updateData.isPublished = data.isPublished;

			if (data.isPublished && !existingBlog.isPublished) {
				updateData.publishedAt = new Date().toISOString();
			} else if (!data.isPublished) {
				updateData.publishedAt = null;
			}
		}

		const [updatedBlog] = await db
			.update(blogs)
			.set(updateData)
			.where(eq(blogs.id, blogId))
			.returning();

		return updatedBlog;
	}

	async replaceAdditionalImage(blogId: string, slot: number, newImage: File) {
		const existingBlog = await db.query.blogs.findFirst({
			where: eq(blogs.id, blogId),
		});

		if (!existingBlog) {
			throw new NotFoundError("Blog not found");
		}

		if (slot < 1 || slot > 6) {
			throw new BadRequestError("Invalid image slot. Must be between 1 and 6.");
		}

		const currentImages = existingBlog.additionalImages || [];
		while (currentImages.length < 6) {
			currentImages.push("");
		}

		const targetIndex = slot - 1;

		const oldImageUrl = currentImages[targetIndex];

		if (oldImageUrl && oldImageUrl !== "") {
			await this.deleteImageFromMinIO(oldImageUrl);
		}

		const newImageUrl = await this.uploadImageToMinIO(
			newImage,
			"blogs/additional",
		);

		currentImages[targetIndex] = newImageUrl;

		const [updatedBlog] = await db
			.update(blogs)
			.set({
				additionalImages: currentImages,
				updatedAt: new Date().toISOString(),
			})
			.where(eq(blogs.id, blogId))
			.returning();

		return updatedBlog;
	}

	async deleteBlog(blogId: string) {
		const existingBlog = await db.query.blogs.findFirst({
			where: eq(blogs.id, blogId),
		});

		if (!existingBlog) {
			throw new NotFoundError("Blog not found");
		}

		if (existingBlog.coverImage) {
			await this.deleteImageFromMinIO(existingBlog.coverImage);
		}

		if (
			existingBlog.additionalImages &&
			existingBlog.additionalImages.length > 0
		) {
			const deletePromises = existingBlog.additionalImages
				.filter((imageUrl) => imageUrl && imageUrl !== "")
				.map((imageUrl) => this.deleteImageFromMinIO(imageUrl));

			await Promise.all(deletePromises);
		}

		await db.delete(blogs).where(eq(blogs.id, blogId));

		return { message: "Blog and associated images deleted successfully" };
	}
}

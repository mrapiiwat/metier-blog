import { and, count, eq } from "drizzle-orm";
import { NotFoundError } from "@/common/exceptions";
import { db } from "@/db";
import { admins, blogs, comments } from "@/db/schema";

export class UserService {
	async me(userId: string) {
		const userRecord = await db.query.admins.findFirst({
			where: and(eq(admins.id, userId)),
		});

		if (!userRecord) throw new NotFoundError("Not found");

		const response = {
			id: userRecord.id,
			username: userRecord.username,
			name: userRecord.name,
		};

		return response;
	}

	async getStats() {
		const [
			totalArticlesResult,
			publishedArticlesResult,
			pendingCommentsResult,
		] = await Promise.all([
			db.select({ value: count() }).from(blogs),

			db
				.select({ value: count() })
				.from(blogs)
				.where(eq(blogs.isPublished, true)),

			db
				.select({ value: count() })
				.from(comments)
				.where(eq(comments.status, "pending")),
		]);

		return {
			totalArticles: totalArticlesResult[0].value,
			publishedArticles: publishedArticlesResult[0].value,
			pendingComments: pendingCommentsResult[0].value,
		};
	}
}

import { and, count, desc, eq, ilike, sql } from "drizzle-orm";
import { openai } from "@/common/config/openai";
import { NotFoundError } from "@/common/exceptions";
import { db } from "@/db";
import { comments } from "@/db/schema";
import type * as commentSchema from "./comment.schema";

export class CommentService {
	async create(payload: commentSchema.CreateComment) {
		let aiSuggestion: "approve" | "reject" | "flagged" | "pending" = "pending";
		let aiReason: string | null = null;

		try {
			if (!Bun.env.MODEL_NAME)
				throw new Error("Missing required environment variables in .env file");

			const aiResponse = await openai.chat.completions.create({
				model: Bun.env.MODEL_NAME,
				response_format: { type: "json_object" },
				messages: [
					{
						role: "system",
						content: `You are an expert AI moderator for a Thai blog comment section. 
                            Your task is to analyze the user's comment and provide a moderation suggestion along with a brief reason in Thai.
                            
                            Evaluation Criteria:
                            1. Suggest "approve" if the comment is:
                               - Polite, positive, or neutral.
                               - Constructive criticism, respectful disagreement, or sharing personal opinions relevant to a blog.
                               - Reason examples: "เชิงบวกและสุภาพ", "แสดงความคิดเห็นทั่วไป", "แลกเปลี่ยนมุมมองอย่างสุภาพ"
                            
                            2. Suggest "reject" if the comment contains:
                               - Spam, direct advertising, MLM, or irrelevant self-promotion.
                               - Offensive language, profanity, hate speech, bullying, or harassment.
                               - Nonsense/gibberish (e.g., "asdasd", "555555" without context).
                               - Reason examples: "ตรวจพบสแปม/โฆษณาแฝง", "เนื้อหาไม่เหมาะสม/คำหยาบคาย", "ขยะ/พิมพ์ข้อความไม่มีความหมาย"
                            
                            3. Suggest "flagged" if the comment needs human review:
                               - Contains external URLs/links that might be phishing or unverified.
                               - Highly controversial, passive-aggressive, or ambiguous phrasing.
                               - Reason examples: "มีแนบลิงก์ภายนอก", "เนื้อหากำกวม/อาจก่อให้เกิดความขัดแย้ง", "ต้องตรวจสอบเจตนาเพิ่มเติม"
                            
                            Output FORMAT:
                            You must respond ONLY with a valid JSON object using this exact structure: 
                            { "suggestion": "approve" | "reject" | "flagged", "reason": "string (in Thai only)" }`,
					},
					{
						role: "user",
						content: payload.message,
					},
				],
			});

			const result = JSON.parse(aiResponse.choices[0].message.content || "{}");

			if (["approve", "reject", "flagged"].includes(result.suggestion)) {
				aiSuggestion = result.suggestion;
				aiReason = result.reason || null;
			}
		} catch (aiError) {
			console.error("AI Moderation failed:", aiError);
		}

		const [newComment] = await db
			.insert(comments)
			.values({
				blogId: payload.blogId,
				senderName: payload.senderName,
				message: payload.message,
				status: "pending",
				aiSuggestion: aiSuggestion,
				aiReason: aiReason,
			})
			.returning();

		return newComment;
	}

	async updateStatus(id: string, status: "pending" | "approved" | "rejected") {
		const [updatedComment] = await db
			.update(comments)
			.set({
				status,
				updatedAt: sql`now()`,
			})
			.where(eq(comments.id, id))
			.returning();

		if (!updatedComment) {
			throw new NotFoundError("Comment not found");
		}

		return updatedComment;
	}

	async getAllForAdmin(query: commentSchema.AdminGetCommentsQuery) {
		const page = query.page || 1;
		const limit = query.limit || 10;
		const offset = (page - 1) * limit;

		const whereClauses = [];

		if (query.status) {
			whereClauses.push(eq(comments.status, query.status));
		}
		if (query.blogId) {
			whereClauses.push(eq(comments.blogId, query.blogId));
		}
		if (query.search) {
			whereClauses.push(ilike(comments.message, `%${query.search}%`));
		}

		const conditions =
			whereClauses.length > 0 ? and(...whereClauses) : undefined;

		const data = await db
			.select()
			.from(comments)
			.where(conditions)
			.orderBy(desc(comments.createdAt))
			.limit(limit)
			.offset(offset);

		const [{ total }] = await db
			.select({ total: count() })
			.from(comments)
			.where(conditions);

		return {
			data,
			meta: {
				total,
				page,
				limit,
				totalPages: Math.ceil(total / limit),
			},
		};
	}

	async delete(id: string) {
		const [deletedComment] = await db
			.delete(comments)
			.where(eq(comments.id, id))
			.returning();

		if (!deletedComment) {
			throw new NotFoundError("Comment not found");
		}

		return "Comment deleted successfully";
	}
}

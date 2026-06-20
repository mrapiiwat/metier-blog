import { Elysia } from "elysia";
import { StatusCodes } from "http-status-codes";
import { authenticateJWT } from "@/common/middlewares/auth.middleware";
import * as commentSchema from "./comment.schema";
import { CommentService } from "./comment.service";

const commentService = new CommentService();

export const commentConroller = new Elysia({
	prefix: "/comment",
	tags: ["COMMENT"],
})

	.post(
		"/",
		async ({ body, set }) => {
			const response = commentService.create(body);

			set.status = StatusCodes.CREATED;
			return response;
		},
		{
			body: commentSchema.createCommentSchema,
		},
	)

	.use(authenticateJWT)
	.guard(
		{
			detail: {
				security: [{ JwtAuth: [] }],
			},
		},
		(app) =>
			app
				.put(
					"/:id/status",
					async ({ params, body: { status }, set }) => {
						const id = params.id;
						const response = await commentService.updateStatus(id, status);

						set.status = StatusCodes.OK;
						return response;
					},
					{
						params: commentSchema.paramsIdSchema,
						body: commentSchema.updateStatusBodySchema,
					},
				)

				.get(
					"/",
					async ({ query }) => {
						const response = await commentService.getAllForAdmin(query);
						return response;
					},
					{
						query: commentSchema.adminGetCommentsQuerySchema,
					},
				)

				.delete(
					"/:id",
					async ({ params: { id }, set }) => {
						const response = await commentService.delete(id);

						set.status = StatusCodes.OK;
						return response;
					},
					{
						params: commentSchema.paramsIdSchema,
					},
				),
	);

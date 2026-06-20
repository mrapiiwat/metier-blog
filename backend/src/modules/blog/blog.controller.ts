import { Elysia } from "elysia";
import { StatusCodes } from "http-status-codes";
import { authenticateJWT } from "@/common/middlewares/auth.middleware";
import * as blogSchema from "./blog.schema";
import { BlogService } from "./blog.service";

const blogService = new BlogService();

export const blogController = new Elysia({ prefix: "/blog", tags: ["BLOG"] })

	.get(
		"/",
		async ({ query, set }) => {
			const page = query.page || 1;
			const search = query.search;
			const isPublic = query.isPublic;
			const response = await blogService.getBlogs(page, search, isPublic);

			set.status = StatusCodes.OK;

			return response;
		},
		{
			query: blogSchema.query,
		},
	)

	.get(
		"/:id",
		async ({ params, set }) => {
			const blogId = params.id;
			const response = await blogService.getBlogById(blogId);

			set.status = StatusCodes.OK;
			return response;
		},
		{
			params: blogSchema.param,
		},
	)

	.get(
		"/popular/:top",
		async ({ params, set }) => {
			const top = Number(params.top);
			const response = await blogService.getPopularBlogs(top);

			set.status = StatusCodes.OK;
			return response;
		},
		{
			params: blogSchema.top,
		},
	)

	.get(
		"/slug/:slug",
		async ({ params, set }) => {
			const slug = params.slug;
			const response = await blogService.getBlogBySlug(slug);

			set.status = StatusCodes.OK;
			return response;
		},
		{
			params: blogSchema.slug,
		},
	)

	.post(
		"/:id/view",
		async ({ params }) => {
			await blogService.incrementViewCount(params.id);
			return { message: "View count incremented" };
		},
		{
			params: blogSchema.param,
		},
	)

	.get("/image/*", async ({ params, set }) => {
		const objectKey = params["*"];

		try {
			const response = await blogService.getImage(objectKey);

			set.headers["Content-Type"] = response.ContentType || "image/jpeg";
			set.headers["Cache-Control"] = "public, max-age=31536000";
			set.status = StatusCodes.OK;

			return response.Body;
		} catch (_error) {
			set.status = StatusCodes.NOT_FOUND;
			return { message: "Image not found" };
		}
	})

	.use(authenticateJWT)
	.guard(
		{
			detail: {
				security: [{ JwtAuth: [] }],
			},
		},
		(app) =>
			app
				.post(
					"/",
					async ({ set, user, body }) => {
						const userId = user.id;
						const response = await blogService.createBlog(userId, body);

						set.status = StatusCodes.CREATED;

						return response;
					},
					{
						body: blogSchema.create,
					},
				)

				.put(
					"/:id",
					async ({ params, body, set }) => {
						const blogId = params.id;
						const response = await blogService.updateBlog(blogId, body);

						set.status = StatusCodes.OK;

						return response;
					},
					{
						params: blogSchema.param,
						body: blogSchema.update,
					},
				)

				.put(
					"/:id/image/:slot",
					async ({ params, body, set }) => {
						const blogId = params.id;
						const slotNumber = params.slot;

						const response = await blogService.replaceAdditionalImage(
							blogId,
							slotNumber,
							body.image,
						);

						set.status = StatusCodes.OK;

						return response;
					},
					{
						params: blogSchema.params,
						body: blogSchema.replaceImage,
					},
				)
				.delete(
					"/:id",
					async ({ params, set }) => {
						const blogId = params.id;
						const result = await blogService.deleteBlog(blogId);

						set.status = StatusCodes.OK;
						return result;
					},
					{
						params: blogSchema.param,
					},
				),
	);

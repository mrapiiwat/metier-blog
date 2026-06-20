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
			detail: {
				summary: "ดึงรายการบทความ",
				description: "ดึงรายการบทความทั้งหมดแบบแบ่งหน้า (หน้าละ 10 รายการ)",
			},
		},
	)

	.get(
		"/:id",
		async ({ params, set }) => {
			const blogId = params.id;
			const result = await blogService.getBlogById(blogId);

			set.status = StatusCodes.OK;
			return result;
		},
		{
			params: blogSchema.param,
			detail: {
				summary: "ดึงข้อมูลบทความ (ตาม ID)",
				description: "ดึงรายละเอียดของบทความ 1 รายการ พร้อมชื่อผู้เขียน",
			},
		},
	)
	.get(
		"/slug/:slug",
		async ({ params, set }) => {
			const slug = params.slug;
			const result = await blogService.getBlogBySlug(slug);

			set.status = StatusCodes.OK;
			return result;
		},
		{
			params: blogSchema.slug,
			detail: {
				summary: "ดึงข้อมูลบทความ (ตาม Slug)",
				description: "ดึงรายละเอียดของบทความ 1 รายการ พร้อมชื่อผู้เขียน",
			},
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
			detail: {
				summary: "นับจำนวนผู้เข้าชม",
				description: "เรียก API นี้เมื่อผู้ใช้เปิดอ่านบทความเพื่อเพิ่มยอดวิว",
			},
		},
	)

	.get(
		"/image/*",
		async ({ params, set }) => {
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
		},
		{
			detail: {
				summary: "ดึงรูปภาพบทความ",
				description:
					"ดึงรูปภาพหน้าปก (Cover) และรูปภาพประกอบอื่นๆ ของบทความจาก MinIO (เส้นนี้เป็นแบบสาธารณะ ไม่ต้องใช้ Token)",
			},
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
						detail: {
							summary: "สร้างบทความใหม่",
							description:
								"สร้างบทความใหม่ลงในระบบ พร้อมอัปโหลดรูปภาพหน้าปก (Cover) และรูปภาพประกอบ (สูงสุด 6 รูป)",
						},
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
						detail: {
							summary: "แก้ไขบทความ",
							description: "แก้ไขข้อมูลบทความ เฉพาะฟิลด์ที่ส่งมา",
						},
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
						detail: {
							summary: "เปลี่ยนรูปประกอบ (ตามช่อง)",
							description: "แทนที่รูปภาพประกอบบทความในช่องที่กำหนด (1-6)",
						},
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
						detail: {
							summary: "ลบบทความ",
							description:
								"ลบบทความและเคลียร์รูปภาพทั้งหมดออกจาก MinIO แบบถอนรากถอนโคน",
						},
					},
				),
	);

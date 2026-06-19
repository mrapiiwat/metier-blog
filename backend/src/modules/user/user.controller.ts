import { Elysia } from "elysia";
import { StatusCodes } from "http-status-codes";
import { authenticateJWT } from "@/common/middlewares/auth.middleware";
import { UserService } from "./user.service";

const userService = new UserService();

export const userController = new Elysia({ tags: ["USER"] })
	.use(authenticateJWT)
	.guard(
		{
			detail: {
				security: [{ JwtAuth: [] }],
			},
		},
		(app) =>
			app.get(
				"/me",
				async ({ user, set }) => {
					const userId = String(user.id);
					const result = userService.me(userId);

					set.status = StatusCodes.OK;

					return result;
				},
				{
					detail: {
						summary: "ดึงข้อมูลส่วนตัวของผู้ใช้งาน",
						description: "ดึงข้อมูลโปรไฟล์ของผู้ใช้งานที่กำลังเข้าสู่ระบบอยู่",
					},
				},
			),
	);

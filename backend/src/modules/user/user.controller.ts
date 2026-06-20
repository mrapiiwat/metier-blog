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
			app
				.get("/me", async ({ user, set }) => {
					const userId = String(user.id);
					const response = userService.me(userId);

					set.status = StatusCodes.OK;

					return response;
				})
				.get("/dash", async ({ set }) => {
					const response = userService.getStats();

					set.status = StatusCodes.OK;
					return response;
				}),
	);

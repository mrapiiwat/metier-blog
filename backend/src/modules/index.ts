import { Elysia } from "elysia";
import { authController } from "./auth/auth.controller";
import { userController } from "./user/user.controller";

const modules = new Elysia({ prefix: "/api" })
	.get("/ping", () => {
		return "pong";
	})
	.use(authController)
	.use(userController);

export default modules;

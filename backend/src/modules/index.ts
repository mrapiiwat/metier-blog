import { Elysia } from "elysia";
import { authController } from "./auth/auth.controller";
import { blogController } from "./blog/blog.controller";
import { commentConroller } from "./comment/comment.controller";
import { userController } from "./user/user.controller";

const modules = new Elysia({ prefix: "/api" })
	.get("/ping", () => {
		return "pong";
	})
	.use(authController)
	.use(blogController)
	.use(userController)
	.use(commentConroller);

export default modules;

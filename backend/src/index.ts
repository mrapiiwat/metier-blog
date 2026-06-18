import { Elysia } from "elysia";
import modules from "@/modules";

const PORT = Bun.env.PORT ? parseInt(Bun.env.PORT, 10) : 8080;
const app = new Elysia()
	.use(modules)
	.listen(PORT)

console.log(
	`Server is running at http://${app.server?.hostname}/${app.server?.port}`
);

import { jwt as JWT } from "@elysiajs/jwt";
import { Elysia } from "elysia";

if (!Bun.env.JWT_SECRET) {
	throw new Error("Missing JWT_SECRET in environment variables");
}

export const jwt = new Elysia({ name: "setup" }).use(
	JWT({
		name: "jwt",
		secret: Bun.env.JWT_SECRET,
		exp: Bun.env.ACCESS_TOKEN_EXPIRES,
	}),
);

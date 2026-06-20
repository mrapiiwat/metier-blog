import type { Elysia } from "elysia";
import { UnauthorizedError } from "@/common/exceptions";
import { jwt } from "@/common/plugins/jwt";

export interface JwtPayload {
	id: string;
}

export const authenticateJWT = (app: Elysia) =>
	app.use(jwt).derive(async ({ jwt, headers, cookie: { token } }) => {
		const authHeader = headers.authorization;

		const tokenValue = authHeader?.startsWith("Bearer ")
			? authHeader.split(" ")[1]
			: token?.value;

		if (!tokenValue) {
			throw new UnauthorizedError("No token");
		}

		const decoded = (await jwt.verify(tokenValue as string)) as
			| JwtPayload
			| false;

		if (!decoded) {
			throw new UnauthorizedError("Invalid or expired access token");
		}

		return {
			user: decoded,
		};
	});

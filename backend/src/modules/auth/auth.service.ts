import { eq } from "drizzle-orm";
import { UnauthorizedError } from "@/common/exceptions";
import {
	findRefreshTokenByRaw,
	revokeRefreshTokenByRaw,
	rotateRefreshToken,
} from "@/common/utils/token";
import { db } from "@/db";
import { admins } from "@/db/schema";
import type * as authSchema from "./auth.schema";

export class AuthService {
	async login(data: authSchema.loginSchema) {
		const [users] = await db
			.select()
			.from(admins)
			.where(eq(admins.username, data.username.toLocaleLowerCase().trim()))
			.limit(1);

		if (!users?.passwordHash) {
			throw new UnauthorizedError("Invalid credentials");
		}

		const isPasswordValid = await Bun.password.verify(
			data.password,
			users.passwordHash,
		);
		if (!isPasswordValid) {
			throw new UnauthorizedError("email or password is incorrect");
		}

		return { userId: users.id };
	}

	async refreshToken(rawToken: string) {
		const tokenInDb = await findRefreshTokenByRaw(rawToken);

		if (
			!tokenInDb ||
			tokenInDb.revoked ||
			new Date(tokenInDb.expiresAt).getTime() < Date.now()
		) {
			throw new UnauthorizedError("Invalid refresh token");
		}

		const newRaw = await rotateRefreshToken(rawToken, tokenInDb.adminId);

		return {
			adminId: tokenInDb.adminId,
			newRefreshToken: newRaw,
		};
	}

	async logout(rawToken: string) {
		if (!rawToken) return;

		await revokeRefreshTokenByRaw(rawToken);
	}
}

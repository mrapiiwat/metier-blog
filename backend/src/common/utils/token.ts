import { createHash, randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { refreshTokens } from "@/db/schema";

const REFRESH_EXPIRES_DAYS = Number(Bun.env.REFRESH_EXPIRES_DAYS) || 30;

export function hashToken(token: string): string {
	return createHash("sha256").update(token).digest("hex");
}

export const createRefreshToken = async (adminId: string) => {
	const raw = randomBytes(48).toString("hex");
	const token = hashToken(raw);

	const expiresAt = new Date();
	expiresAt.setDate(expiresAt.getDate() + REFRESH_EXPIRES_DAYS);

	await db.insert(refreshTokens).values({
		token: token,
		revoked: false,
		adminId: adminId,
		expiresAt: expiresAt.toISOString(),
	});

	return raw;
};

export const findRefreshTokenByRaw = async (raw: string) => {
	const tokenHash = hashToken(raw);
	const [token] = await db
		.select()
		.from(refreshTokens)
		.where(eq(refreshTokens.token, tokenHash))
		.limit(1);

	return token;
};

export const revokeRefreshTokenByRaw = async (raw: string) => {
	const tokenHash = hashToken(raw);

	return db
		.update(refreshTokens)
		.set({ revoked: true })
		.where(eq(refreshTokens.token, tokenHash));
};

export const rotateRefreshToken = async (oldRaw: string, adminId: string) => {
	await revokeRefreshTokenByRaw(oldRaw);
	return createRefreshToken(adminId);
};

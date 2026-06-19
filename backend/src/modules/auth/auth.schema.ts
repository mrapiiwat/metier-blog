import { type Static, t } from "elysia";

export const loginSchema = t.Object({
	username: t.String(),
	password: t.String(),
});

export type loginSchema = Static<typeof loginSchema>;

export const cookie = t.Object({
	refreshToken: t.String(),
});

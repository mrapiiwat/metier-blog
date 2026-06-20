import { Elysia } from "elysia";
import { StatusCodes } from "http-status-codes";
import { authenticateJWT } from "@/common/middlewares/auth.middleware";
import { jwt } from "@/common/plugins/jwt";
import { createRefreshToken } from "@/common/utils/token";
import * as authSchema from "./auth.schema";
import { AuthService } from "./auth.service";

const authService = new AuthService();

export const authController = new Elysia({ tags: ["AUTH"] })
	.use(jwt)
	.post(
		"/login",
		async ({ body, set, jwt, cookie: { refreshToken } }) => {
			const response = await authService.login(body);
			const accessToken = await jwt.sign({
				id: response.userId,
			});
			const refreshRaw = await createRefreshToken(response.userId);
			refreshToken.set({
				value: refreshRaw,
				httpOnly: false,
				secure: Bun.env.NODE_ENV === "production",
				sameSite: "lax",
				maxAge: Number(Bun.env.REFRESH_EXPIRES_DAYS || 30) * 86400,
				path: "/",
			});
			set.status = StatusCodes.OK;
			return {
				message: "Login successful",
				accessToken: accessToken,
			};
		},
		{
			body: authSchema.loginSchema,
		},
	)

	.get("/refreshToken", async ({ cookie: { refreshToken }, set, jwt }) => {
		const raw = refreshToken.value;
		if (!raw) {
			set.status = StatusCodes.UNAUTHORIZED;
			return { error: "No refresh token" };
		}

		const { adminId, newRefreshToken } = await authService.refreshToken(
			raw as string,
		);

		const accessToken = await jwt.sign({ id: adminId });

		refreshToken.set({
			value: newRefreshToken,
			httpOnly: false,
			secure: Bun.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: Number(Bun.env.REFRESH_EXPIRES_DAYS || 30) * 86400,
			path: "/",
		});

		set.status = StatusCodes.OK;

		return { accessToken };
	})

	.use(authenticateJWT)
	.guard(
		{
			detail: {
				security: [{ JwtAuth: [] }],
			},
		},
		(app) =>
			app.post(
				"/logout",
				async ({ cookie: { refreshToken }, set }) => {
					const rawRefreshToken = refreshToken?.value;

					if (rawRefreshToken) {
						await authService.logout(rawRefreshToken);
					}

					refreshToken.set({
						value: "",
						expires: new Date(0),
						path: "/",
					});

					set.status = StatusCodes.OK;
					return { message: "Logged out" };
				},
				{
					cookie: authSchema.cookie,
				},
			),
	);

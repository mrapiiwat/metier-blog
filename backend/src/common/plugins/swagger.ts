import { swagger } from "@elysiajs/swagger";

const swaggerConfig = swagger({
	path: "/api/docs",
	documentation: {
		info: {
			title: "Blog API Documentation",
			version: "1.0.0",
			description: "API Documentation สำหรับระบบ Blog",
		},
		components: {
			securitySchemes: {
				JwtAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
	},
	scalarConfig: {
		spec: {
			url: "/api/docs/json",
		},
	},
});

export default swaggerConfig;

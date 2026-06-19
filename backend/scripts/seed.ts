import bcrypt from "bcrypt";
import postgres from "postgres";
import { db } from "@/db";
import { admins } from "@/db/schema";

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) throw new Error("DATABASE_URL is missing in .env");

const queryClient = postgres(DB_URL);

async function seed() {
	const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
	const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "123";

	const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

	try {
		await db
			.insert(admins)
			.values({
				username: ADMIN_USERNAME,
				passwordHash: passwordHash,
			})
			.onConflictDoUpdate({
				target: admins.username,
				set: { passwordHash: passwordHash },
			});
	} catch (err) {
		console.error("Error seeding:", err);
	} finally {
		await queryClient.end();
	}
}

seed();

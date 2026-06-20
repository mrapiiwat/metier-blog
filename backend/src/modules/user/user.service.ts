import { and, eq } from "drizzle-orm";
import { NotFoundError } from "@/common/exceptions";
import { db } from "@/db";
import { admins } from "@/db/schema";

export class UserService {
	async me(userId: string) {
		const userRecord = await db.query.admins.findFirst({
			where: and(eq(admins.id, userId)),
		});

		if (!userRecord) throw new NotFoundError("Not found");

		const response = {
			id: userRecord.id,
			username: userRecord.username,
			name: userRecord.name,
		};

		return response;
	}
}

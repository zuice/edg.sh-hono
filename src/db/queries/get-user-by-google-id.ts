import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";

export async function getUserByGoogleId(googleId: string) {
	const [result] = await db
		.select({ id: users.id, googleId: users.googleId })
		.from(users)
		.where(eq(users.googleId, googleId))
		.limit(1)
		.execute();

	return result;
}

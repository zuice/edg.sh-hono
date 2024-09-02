import { db } from "@/db";
import { users } from "@/db/schema";

export async function insertUser({
	id,
	name,
	email,
	googleId,
}: typeof users.$inferInsert) {
	const result = await db.insert(users).values({
		id,
		name,
		email,
		googleId,
	});

	return result;
}

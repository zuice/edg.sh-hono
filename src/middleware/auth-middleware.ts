import type { Context, Next } from "hono";
import { getCookie } from "hono/cookie";

import { lucia } from "@/lib/lucia";
import { getUserById } from "@/db/queries/get-user-by-id";

export async function authMiddleware(c: Context, next: Next) {
	const cookie = getCookie(c, "session");

	if (cookie) {
		const readCookie = lucia.readSessionCookie(cookie);

		if (readCookie) {
			const { session, user: sessionUser } =
				await lucia.validateSession(readCookie);

			if (session && sessionUser) {
				const user = await getUserById(sessionUser.id);

				c.set("session", session);
				c.set("user", user);
			}
		}
	}

	return next();
}

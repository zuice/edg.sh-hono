import { OAuth2RequestError } from "arctic";
import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";

import { getUserByGoogleId } from "@/db/queries/get-user-by-google-id";
import { type GoogleUser, google } from "@/lib/google";
import { lucia } from "@/lib/lucia";
import { generateIdFromEntropySize } from "lucia";
import { insertUser } from "@/db/queries/insert-user";

export const callbacksRouter = new Hono();

callbacksRouter.get("/google", async (c) => {
	const code = c.req.query("code");
	const state = c.req.query("state");
	const storedStateCookie = getCookie(c, "google_oauth_state");
	const storedState = storedStateCookie?.split(",")[0];
	const storedCodeVerifier = storedStateCookie?.split(",")[1];

	if (
		!code ||
		!state ||
		!storedState ||
		!storedCodeVerifier ||
		state !== storedState
	) {
		return c.newResponse("Could not process your request", 400);
	}

	try {
		const tokens = await google.validateAuthorizationCode(
			code,
			storedCodeVerifier,
		);
		const googleUserResponse = await fetch(
			"https://openidconnect.googleapis.com/v1/userinfo",
			{
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`,
				},
			},
		);
		const googleUser = (await googleUserResponse.json()) satisfies GoogleUser;
		const existingUser = await getUserByGoogleId(googleUser.sub);

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});

			setCookie(
				c,
				"session",
				lucia.createSessionCookie(session.id).serialize(),
			);

			return c.redirect("/");
		}

		const id = generateIdFromEntropySize(10);

		await insertUser({
			id,
			name: googleUser.name,
			email: googleUser.email,
			googleId: googleUser.sub,
		});

		setCookie(c, "session", lucia.createSessionCookie(id).serialize());

		return c.redirect("/");
	} catch (e) {
		if (e instanceof OAuth2RequestError) {
			console.error(e);

			return c.newResponse(e.message, 400);
		}
	}
});

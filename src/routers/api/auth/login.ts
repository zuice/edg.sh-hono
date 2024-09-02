import { google, scopes } from "@/lib/google";
import { env } from "@/utils/env";
import { generateCodeVerifier, generateState } from "arctic";
import { Hono } from "hono";
import { setCookie } from "hono/cookie";

export const loginRouter = new Hono();

loginRouter.get("/google", async (c) => {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();
	const url = await google.createAuthorizationURL(state, codeVerifier, {
		scopes,
	});

	setCookie(c, "google_oauth_state", [state, codeVerifier].join(","), {
		path: "/",
		secure: env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax",
	});

	return c.redirect(url.toString());
});

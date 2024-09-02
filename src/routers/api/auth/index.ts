import { Hono } from "hono";

import type { MyContext } from "@/types/MyContext";
import { callbacksRouter } from "@/routers/api/auth/callbacks";
import { loginRouter } from "@/routers/api/auth/login";
import { lucia } from "@/lib/lucia";

export const authRouter = new Hono<{ Variables: MyContext }>();

authRouter.route("/callbacks", callbacksRouter);
authRouter.route("/login", loginRouter);
authRouter.get("/logout", (c) => {
	const session = c.get("session");

	if (session) {
		lucia.invalidateSession(session.id);
	}

	return c.redirect("/");
});

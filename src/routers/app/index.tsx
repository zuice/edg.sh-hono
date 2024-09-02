import { Hono } from "hono";

import type { MyContext } from "@/types/MyContext";
import { Title } from "@/components/Title";
import { BaseHtml } from "@/components/BaseHtml";

export const appRouter = new Hono<{ Variables: MyContext }>();

appRouter.get("/", (c) => {
	const isLoggedIn = !!c.get("user");

	return c.html(
		<BaseHtml title="Home">
			<div>
				<Title>Edg.sh</Title>
				<p>Hello, {c.get("user")?.name ?? "World"}!</p>
				{isLoggedIn && (
					<p>
						You are logged in! <a href="/api/auth/logout">Logout</a>
					</p>
				)}
				{!isLoggedIn && (
					<p>
						You are not logged in! <a href="/api/auth/login/google">Login</a>
					</p>
				)}
			</div>
		</BaseHtml>,
	);
});

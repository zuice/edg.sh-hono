import { Hono } from "hono";

import type { MyContext } from "./types/MyContext";
import { env } from "@/utils/env";
import { apiRouter } from "@/routers/api";
import { appRouter } from "@/routers/app";
import { authMiddleware } from "@/middleware/auth-middleware";

const app = new Hono<{ Variables: MyContext }>();

app.use(authMiddleware);
app.route("/api", apiRouter);
// where we are going to store our jsx routes
app.route("/", appRouter);

console.log(`🚀 Edg.sh is running on port: ${env.PORT}`);

export default {
	port: env.PORT,
	fetch: app.fetch,
};

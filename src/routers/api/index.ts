import { Hono } from "hono";

import { authRouter } from "@/routers/api/auth";

export const apiRouter = new Hono();

apiRouter.route("/auth", authRouter);

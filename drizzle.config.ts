import { defineConfig } from "drizzle-kit";

import { env } from "@/utils/env";

export default defineConfig({
	schema: "./src/db/schema/*",
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	verbose: true,
	strict: true,
});

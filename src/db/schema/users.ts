import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

import { urls } from "@/db/schema";

export const users = pgTable("users", {
	id: text("id").primaryKey(),
	email: text("email").notNull(),
	name: text("name").notNull(),
	bio: text("bio"),
	avatar: text("avatar"),
	googleId: text("google_id").notNull().unique(),
	createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
	updatedAt: timestamp("updatedAt", { mode: "string" })
		.defaultNow()
		.$onUpdate(() => sql`now()`),
});

export const usersRelations = relations(users, ({ many }) => ({
	urls: many(urls),
}));

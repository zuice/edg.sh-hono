import { generateUlid } from "@/utils/generate-ulid";
import { relations, sql } from "drizzle-orm";
import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

import { users } from "@/db/schema";

export const urls = pgTable("urls", {
	id: generateUlid(),
	url: text("url").notNull(),
	slug: text("slug").notNull().unique(),
	clicks: integer("clicks").notNull().default(0),
	name: text("name").notNull(),
	description: text("description"),
	userId: text("user_id")
		.notNull()
		.references(() => users.id),
	createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
	updatedAt: timestamp("updatedAt", { mode: "string" })
		.defaultNow()
		.$onUpdate(() => sql`now()`),
});

export const urlsRelations = relations(urls, ({ one }) => ({
	user: one(users, { fields: [urls.userId], references: [users.id] }),
}));

import type { sessions, users } from "@/db/schema";

export interface MyContext {
	session: typeof sessions.$inferSelect;
	user: typeof users.$inferSelect;
}

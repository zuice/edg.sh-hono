import { text } from "drizzle-orm/pg-core";
import { ulid } from "ulid";

export const generateUlid = () =>
	text("id")
		.primaryKey()
		.$defaultFn(() => ulid());

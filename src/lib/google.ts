import { Google } from "arctic";

import { env } from "@/utils/env";

export interface GoogleUser {
	sub: string;
	picture: string;
	name: string;
	given_name: string;
	family_name: string;
	email: string;
	email_verified: true;
	hd: string;
}

const BASE_URL =
	env.NODE_ENV === "production" ? "https://edg.sh" : "http://localhost:3000";

export const scopes = ["openid", "email", "profile"];
export const google = new Google(
	env.GOOGLE_CLIENT_ID,
	env.GOOGLE_CLIENT_SECRET,
	`${BASE_URL}/api/auth/callbacks/google`,
);

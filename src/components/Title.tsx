import type { PropsWithChildren } from "hono/jsx";

export function Title({ children }: PropsWithChildren) {
	return <h1>{children}</h1>;
}

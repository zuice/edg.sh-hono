import type { PropsWithChildren } from "hono/jsx";

interface Props {
	title: string;
}

export function BaseHtml({ title, children }: PropsWithChildren<Props>) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
				<title>{title} | Edg.sh</title>
			</head>
			<body>{children}</body>
		</html>
	);
}

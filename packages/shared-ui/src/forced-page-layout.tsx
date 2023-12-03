import type { FC, HTMLProps } from "react";
import type { SharedRootLayoutProps } from "./root-layout";

interface ForcedPageLayoutProps extends SharedRootLayoutProps {
	scope: "forcedColorScheme" | "forcedTheme";
}

export function ForcedPageLayout({ LinkElement, scope, children }: ForcedPageLayoutProps) {
	const Link = LinkElement as FC<{ to?: string } & HTMLProps<HTMLAnchorElement>>;
	return (
		<div>
			<h1>
				<Link href="/" style={{ display: "inline" }} to="/">
					🔙🏡
				</Link>{" "}
				Example page showing <code>{scope}</code>
			</h1>
			{children}
		</div>
	);
}

import "./globals.css";
import "react18-themes/src/styles.css";
import { ColorSwitch, ThemeSwitcher } from "react18-themes";
import { ForkMe } from "@mayank1513/fork-me/server/index.js"; // import directory not supported in remix
import type { HTMLProps } from "react";
import type { PageNavigatorCardProps } from "./cards/page-navigator-card";
import styles from "./root-layout.module.css";
import { ThemeController } from "./theme-controller/theme-controller";
import { Cards } from "./cards";
import { Description } from "./root/description";
import { Hero } from "./root/hero";
import { Footer } from "./root/footer";

export type SharedRootLayoutProps = HTMLProps<HTMLElement> & PageNavigatorCardProps;

export function SharedRootLayout({ children, className = "", LinkElement, ...props }: SharedRootLayoutProps) {
	return (
		<>
			<ThemeSwitcher />
			<main className={`${styles.main} ${className}`} {...props}>
				<Description />
				{children}
				<Hero />
				<ColorSwitch />
				<ThemeController />
				<Cards LinkElement={LinkElement} />
			</main>
			<Footer />
			<ForkMe
				bgColor="var(--text-color)"
				gitHubUrl="https://github.com/react18-tools/react18-themes"
				textColor="var(--bg-color)"
			/>
		</>
	);
}

import "./globals.css";
import "react18-themes/styles.css";
import { ThemeSwitcher } from "react18-themes";
import { ForkMe } from "@mayank1513/fork-me/server"; // todo: import directory not supported in remix
import type { HTMLProps } from "react";
import styles from "./root-layout.module.css";
import { Cards } from "./cards";
import { Description } from "./root/description";
import { Hero } from "./root/hero";
import { Footer } from "./root/footer";

export type SharedRootLayoutProps = HTMLProps<HTMLElement>;

export function SharedRootLayout({ children, className = "", ...props }: SharedRootLayoutProps) {
	return (
		<>
			<ThemeSwitcher />
			<main className={`${styles.main} ${className}`} {...props}>
				<Description />
				{children}
				<Hero />
				<Cards />
			</main>
			<Footer />
			<ForkMe
				bgColor="var(--text-color)"
				gitHubUrl="https://github.com/react18-tools/turborepo-template"
				textColor="var(--bg-color)"
			/>
		</>
	);
}

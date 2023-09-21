import { ForkMe } from "@mayank1513/fork-me/server";
import "./globals.css";
import { ThemeSwitcher } from "nextjs-themes";
import { ServerSideWrapper } from "nextjs-themes/server/nextjs";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ServerSideWrapper lang="en">
			<body>
				<ThemeSwitcher />
				<div className="container">{children}</div>
				<footer>
					with 💖 by{" "}
					<a href="https://mayank-chaudhari.vercel.app" target="_blank" rel="noopener noreferrer">
						Mayank Chaudhari
					</a>
				</footer>
				<ForkMe
					bgColor="var(--text-color)"
					gitHubUrl="https://github.com/mayank1513/turbo-template"
					noAutoFork
					text="Use this Template"
					textColor="var(--bg-color)"
				/>
			</body>
		</ServerSideWrapper>
	);
}

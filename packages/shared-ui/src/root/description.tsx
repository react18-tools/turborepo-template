import type { HTMLProps } from "react";
import { Logo } from "../common/logo";
import styles from "../root-layout.module.css";

export function Description() {
	return (
		<div className={styles.description}>
			<a
				className={styles.logo}
				href="https://github.com/react18-tools/react18-themes"
				rel="noopener noreferrer"
				target="_blank">
				<p>
					<Logo className={styles.code} />
				</p>
			</a>
			<div>
				<a href="https://mayank-chaudhari.vercel.app" rel="noopener noreferrer" target="_blank">
					By Mayank
				</a>
			</div>
		</div>
	);
}

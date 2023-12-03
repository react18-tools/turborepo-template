import { ColorSwitch } from "react18-themes";
import { Logo } from "../common/logo";
import styles from "../root-layout.module.css";

export function Description() {
	return (
		<div className={styles.description}>
			<a
				className={styles.logo}
				href="https://github.com/react18-tools/turborepo-template/"
				rel="noopener noreferrer"
				target="_blank">
				<p>
					<Logo className={styles.code} />
				</p>
			</a>
			<div className={styles.by}>
				<a href="https://mayank-chaudhari.vercel.app" rel="noopener noreferrer" target="_blank">
					By Mayank
				</a>
				<ColorSwitch />
			</div>
		</div>
	);
}

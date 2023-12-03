import styles from "../root-layout.module.css";
import { Logo } from "../common/logo";

export function Hero() {
	return (
		<div className={styles.center}>
			<div>
				<h1>
					Build with <Logo />
				</h1>
				<p>Unleash the power of React Server Components!</p>
			</div>
		</div>
	);
}

import styles from "./cards.module.css";

export function ExamplesCard() {
	return (
		<a
			className={styles.card}
			href="https://github.com/react18-tools/turborepo-template"
			rel="noopener noreferrer"
			target="_blank">
			<h2>
				More Examples <span>-&gt;</span>
			</h2>
			<p>Explore more examples on official GitHub Repo.</p>
		</a>
	);
}
